<?php

namespace App\Services;
use Predis\Client as RedisClient;

readonly class TokenLookupService
{
    public function __construct(
        readonly private RedisClient $client
    ) {}

    public function find(string $key): array
    {
        $value = $this->client->get(
            'tokens.' . md5($key),
        );

        if ( ! empty($value)) {
            return json_decode($value, true);
        }

        return [];
    }

    public function save(string $key, array $values): void
    {
        $this->client->setex(
            'tokens.' . md5($key),
            15 * 60, // Set expire for 15 minutes
            json_encode($values)
        );
    }
}