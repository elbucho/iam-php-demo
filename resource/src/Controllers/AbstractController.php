<?php

namespace App\Controllers;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Slim\Exception\HttpException;

abstract class AbstractController
{
    public function __invoke(
        Request $request,
        Response $response,
        array $args = []
    ): Response {
        return $this->handle($request, $response, $args);
    }

    public function handle(Request $request, Response $response, array $args = []): Response
    {
        try {
            $data = match ($request->getMethod()) {
                'GET'           => $this->view($args),
                'POST'          => $this->create($request, $args) ?? '',
                'PATCH', 'PUT'  => $this->update($request, $args) ?? '',
                'DELETE'        => $this->delete($args) ?? '',
                default         => '',
            };
        } catch (\Exception $e) {
            throw new HttpException(
                $request,
                $e->getMessage(),
                $e->getCode()
            );
        }

        $response->getBody()->write(
            json_encode(
                [
                    'message' => 'ok',
                    'data' => $data
                ],
                true
            )
        );

        $code = match ($request->getMethod()) {
            'POST'                          => 201,
            'PATCH', 'PUT', 'DELETE', 'GET' => 200,
            default                         => 405,
        };

        return $response->withHeader(
            'Content-Type', 'application/json'
        )->withStatus($code);
    }

    abstract public function view(array $args = []): mixed;
    abstract public function create(Request $request, array $args = []): void;
    abstract public function update(Request $request, array $args = []): void;
    abstract public function delete(array $args = []): void;
}