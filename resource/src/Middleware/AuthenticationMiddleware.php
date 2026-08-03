<?php

namespace App\Middleware;
use GuzzleHttp\Exception\GuzzleException;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Psr\Http\Server\MiddlewareInterface;
use Psr\Http\Server\RequestHandlerInterface;
use Slim\Exception\HttpException;
use App\Services\TokenLookupService;
use App\Services\TokenAuthService;

readonly class AuthenticationMiddleware implements MiddlewareInterface
{
    public function __construct(
        readonly private TokenLookupService $tokenLookupService,
        readonly private TokenAuthService $tokenAuthService
    ) { }

    /**
     * @throws HttpException
     */
    public function process(ServerRequestInterface $request, RequestHandlerInterface $handler): ResponseInterface
    {
        $authHeader = $request->getHeaderLine('Authorization');

        if ( ! preg_match("/^Bearer\s+(\S+)$/", $authHeader, $matches)) {
            throw new HttpException(
                $request,
                'Missing or malformed Bearer token',
                401
            );
        }

        $permissions = $this->tokenLookupService->find($matches[1]);

        // Token lookup service failed to find the key for this token
        if (empty($permissions)) {
            try {
                $permissions = $this->tokenAuthService->getPermissions($matches[1]);
            } catch (GuzzleException $e) {
                throw new HttpException(
                    $request,
                    $e->getMessage(),
                    $e->getCode()
                );
            }

            $this->tokenLookupService->save($matches[1], $permissions);
        }

        if ($this->hasPermission($permissions, $request->getUri(), $request->getMethod())) {
            return $handler->handle($request);
        }

        throw new HttpException(
            $request,
            'User not authorized',
            401
        );
    }

    private function hasPermission(array $permissions, string $uri, string $method): bool
    {
        $resource = $this->getResource($uri);
        $map = [
            'GET'       => 'view',
            'PATCH'     => 'update',
            'POST'      => 'create',
            'DELETE'    => 'delete',
        ];

        $action = (array_key_exists(strtoupper($method), $map)) ? $map[strtoupper($method)] : 'other';

        if (array_any(
            [
                $resource,
                preg_replace("/s$/", "", $resource)     // de-pluralize resource
            ],
            fn($r) => in_array($r . ':' . $action, $permissions)
        )) {
            return true;
        }

        return false;
    }

    private function getResource(string $uri): string
    {
        preg_match("/^https?:\/\/[^\/]*(\/?[^\/]*)/", $uri, $matches);

        return preg_replace("/\//", "", $matches[1]);
    }
}