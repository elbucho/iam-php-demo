<?php

namespace App\Service;

use App\Repository\UserRepository;
use App\Security\AuthenticatedUser;
use App\Security\OktaClaims;
use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;

readonly class UserProvisioningService {
    public function __construct(
        private readonly UserRepository $userRepository,
        private readonly EntityManagerInterface $entityManager
    ) { }

    public function loadUserFromClaims(OktaClaims $claims): AuthenticatedUser
    {
        $user = $this->userRepository->findOneBy(['uid' => $claims->uid()]);

        if (is_null($user)) {
            $user = new User(
                $claims->uid(),
                $claims->email(),
                $claims->name(),
            );

            $this->entityManager->persist($user);
        } else {
            $user->email = $claims->email();
            $user->name = $claims->name();
        }

        $this->entityManager->flush();

        return new AuthenticatedUser($user, $claims);
    }
}
