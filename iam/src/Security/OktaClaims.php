<?php

namespace App\Security;

final readonly class OktaClaims
{
    public function __construct(
        private array $claims
    ) {
        if ( ! array_key_exists('uid', $this->claims)) {
            throw new \InvalidArgumentException(
                'Claim does not include "uid"'
            );
        }
    }

    public function all(): array
    {
        return $this->claims;
    }

    public function get(string $claim, mixed $default = null): mixed
    {
        return $this->claims[$claim] ?? $default;
    }

    public function has(string $claim): bool
    {
        return array_key_exists($claim, $this->claims);
    }

    public function toArray(): array
    {
        return $this->claims;
    }

    public function uid(): string
    {
        return $this->claims['uid'];
    }

    public function email(): ?string
    {
        return $this->claims['email'] ?? null;
    }

    public function name(): ?string
    {
        return $this->claims['name'] ?? null;
    }

    public function groups(): array
    {
        return $this->claims['groups'] ?? [];
    }
}
