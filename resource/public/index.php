<?php

use App\Middleware\JsonErrorHandler;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Psr\Http\Server\RequestHandlerInterface;
use Slim\Factory\AppFactory;
use DI\Container;
use App\Middleware\AuthenticationMiddleware;
use App\Services\TokenAuthService;
use App\Services\TokenLookupService;
use App\Controllers\WidgetController;
use App\Controllers\DoohickeyController;
use App\Services\WidgetService;
use App\Services\DoohickeyService;
use Elbucho\Config\Config;
use Elbucho\Config\Loader\DirectoryLoader;
use Elbucho\Database\Database;
use \Predis\Client as RedisClient;

require __DIR__ . '/../vendor/autoload.php';

$container = new Container();

$container->set('config', function () {
    $configDir = dirname(__DIR__) . '/config';
    $loader = new DirectoryLoader();
    return new Config($loader->load($configDir));
});

$container->set('database', function (Container $container) {
    $config = $container->get('config');
    return new Database($config->get('database'));
});

$container->set('redis', function (Container $container) {
    $config = $container->get('config');
    return new RedisClient([
        'scheme' => 'tcp',
        'host' => $config->get('redis.host', '127.0.0.1'),
        'port' => $config->get('redis.port', 6379),
    ]);
});

$container->set('token.lookup', function (Container $container) {
    return new TokenLookupService($container->get('redis'));
});

$container->set('token.auth', function (Container $container) {
    $config = $container->get('config');
    return new TokenAuthService($config->get('tokenAuth'));
});

$container->set('auth.middleware', function (Container $container) {
    return new AuthenticationMiddleware(
        $container->get('token.lookup'),
        $container->get('token.auth')
    );
});

$container->set('widget.service', function (Container $container) {
    return new WidgetService($container->get('database'));
});

$container->set('doohickey.service', function (Container $container) {
    return new DoohickeyService($container->get('database'));
});

$container->set(WidgetController::class, function (Container $container) {
    return new WidgetController($container->get('widget.service'));
});

$container->set(DoohickeyController::class, function (Container $container) {
    return new DoohickeyController($container->get('doohickey.service'));
});

$app = AppFactory::createFromContainer($container);

// Error handler
$errorMiddleware = $app->addErrorMiddleware(
    true, // displayErrorDetails
    true,        // logErrors
    true     // logErrorDetails
);

$errorHandler = $errorMiddleware->getDefaultErrorHandler();

$errorMiddleware->setDefaultErrorHandler(
    new JsonErrorHandler(
        $app->getCallableResolver(),
        $app->getResponseFactory(),
    )
);

// Strip trailing slashes off of uri
$app->add(function (Request $request, RequestHandlerInterface $handler) {
    $path = $request->getUri()->getPath();

    if (strlen($path) > 1 && str_ends_with($path, '/')) {
        $uri = $request->getUri()->withPath(
            rtrim($path, '/')
        );

        $response = new \Slim\Psr7\Response();

        return $response
            ->withHeader('Location', (string) $uri)
            ->withStatus(308);
    }

    return $handler->handle($request);
});

// Add protected routes
$app->group('', function ($group) {
    $group->any('/widgets[/{id}]', WidgetController::class);
    $group->any('/doohickeys/[{id}]', DoohickeyController::class);
})->add('auth.middleware');

$app->get('/', function (Request $request, Response $response) {
    $response->getBody()->write('Hello World!');
    return $response;
});

$app->run();
