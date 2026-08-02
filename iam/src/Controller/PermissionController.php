<?php

namespace App\Controller;

use App\Security\AuthenticatedUser;
use App\Service\PermissionService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Attribute\Route;

final class PermissionController extends AbstractController
{
    #[Route('/permissions', name: 'permissions', methods: ['GET'])]
    public function permissions(
        PermissionService $permissionService
    ): JsonResponse {
        /** @var AuthenticatedUser $user */
        $user = $this->getUser();

        return new JsonResponse([
            'permissions' => $permissionService->getPermissions($user),
        ]);
    }
}
