<?php

namespace App\Middleware;

use Psr\Http\Message\ResponseInterface;
use Slim\Handlers\ErrorHandler;
use Slim\Exception\HttpException;

class JsonErrorHandler extends ErrorHandler
{
    protected function respond(): ResponseInterface
    {
        $exception = $this->exception;

        $status = 500;
        $code = 'INTERNAL_SERVER_ERROR';

        if ($exception instanceof HttpException) {
            $status = $exception->getCode() ?: 404;

            $code = match ($status) {
                400 => "BAD_REQUEST",
                401 => "UNAUTHORIZED",
                403 => "FORBIDDEN",
                404 => "NOT_FOUND",
                default => "HTTP_ERROR",
            };
        }

        $payload = [
            'success'   => false,
            'error'     => [
                'code'      => $code,
                'message'   => $exception->getMessage(),
                'trace'     => $exception->getTrace(),
            ]
        ];

        $response = $this->responseFactory->createResponse($status);

        $response->getBody()->write(
            json_encode($payload, JSON_PRETTY_PRINT)
        );

        return $response
            ->withHeader('Content-Type', 'application/json');
    }
}
