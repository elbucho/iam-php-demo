<?php

namespace App\Repository;
use App\Entity\Permission;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

class PermissionRepository extends ServiceEntityRepository {
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Permission::class);
    }

    public function findByGroups(array $groups): array {
        $permissions = [];

        foreach ($groups as $group) {
            foreach ($group->getGroupPermissions() as $groupPermission) {
                $permissions[] = $groupPermission->getPermission()->getName();
            }
        }

        $permissions = array_unique($permissions);
        sort($permissions);

        return array_values($permissions);
    }
}
