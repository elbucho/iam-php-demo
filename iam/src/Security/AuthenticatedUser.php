<?php

namespace App\Security;

use App\Entity\User;
use Symfony\Component\Security\Core\User\UserInterface;

readonly class AuthenticatedUser implements UserInterface
{
    public function __construct(
        private readonly User  $databaseUser,
        private readonly OktaClaims $claims
    ) { }

    public function getUserIdentifier(): string
    {
        return $this->claims->uid();
    }

    public function getRoles(): array
    {
        return ['ROLE_USER'];
    }

    public function getClaims(): OktaClaims
    {
        return $this->claims;
    }

    public function getClaim(string $name, mixed $default = null): mixed
    {
        return $this->claims->get($name, $default);
    }

    public function getDatabaseUser(): User
    {
        return $this->databaseUser;
    }
}
