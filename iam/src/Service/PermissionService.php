<?php

namespace App\Service;
use App\Repository\GroupRepository;
use App\Repository\PermissionRepository;
use App\Security\AuthenticatedUser;

readonly class PermissionService
{
    public function __construct(
        private readonly PermissionRepository $permissionRepository,
        private readonly GroupRepository $groupRepository,
    ) { }

    public function getPermissions(AuthenticatedUser $user): array {
        $groups = $this->groupRepository->findByNames($user->getClaims()->groups());

        return $this->permissionRepository->findByGroups($groups);
    }
}
