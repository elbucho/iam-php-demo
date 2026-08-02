<?php

namespace App\Service;

use Firebase\JWT\JWT;
use Firebase\JWT\CachedKeySet;
use Psr\Cache\CacheItemPoolInterface;
use Psr\Http\Client\ClientInterface;
use Psr\Http\Message\RequestFactoryInterface;

class OktaJwtService
{
    private CachedKeySet $keySet;

    public function __construct(
        ClientInterface $httpClient,
        RequestFactoryInterface $requestFactory,
        CacheItemPoolInterface $cache,
        string $issuer,
        private readonly string $audience
    ) {
        $this->keySet = new CachedKeySet(
            rtrim($issuer, '/') . '/v1/keys',
            $httpClient,
            $requestFactory,
            $cache,
            3600
        );
    }

    public function verify(string $jwt): array
    {
        $decoded = JWT::decode($jwt, $this->keySet);

        $claims = (array) $decoded;

        if ($claims['aud'] !== $this->audience) {
            throw new \RuntimeException('Invalid audience');
        }

        return $claims;
    }
}
