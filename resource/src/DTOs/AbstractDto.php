<?php

namespace App\DTOs;
use Psr\Http\Message\ServerRequestInterface as Request;
use ReflectionClass;

abstract class AbstractDto
{
    /**
     * @throws \Exception
     */
    public static function createFromRequest(Request $request, array $args = []): static
    {
        $body = $request->getBody()->getContents();

        if ( ! empty($body)) {
            $body = json_decode($body, true);
        } else {
            $body = [];
        }

        $attributes = array_merge($body, $args);

        $reflection = new ReflectionClass(static::class);
        $constructor = $reflection->getConstructor();
        $parameters = $constructor->getParameters();

        foreach ($parameters as $parameter) {
            $name = $parameter->getName();

            if (
                ! $parameter->isOptional() &&
                ! array_key_exists($name, $attributes)
            ) {
                throw new \Exception(
                    "Missing required field '$name'",
                    400
                );
            }
        }

        $validFields = array_map(
            fn($p) => $p->getName(),
            $parameters
        );

        foreach ($attributes as $field => $_) {
            if (!in_array($field, $validFields, true)) {
                throw new \Exception(
                    "Unknown field '$field'",
                    400
                );
            }
        }

        return new static(...$attributes);
    }
}
