<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity]
#[ORM\Table(name: 'group_permissions')]
class GroupPermission
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\ManyToOne(targetEntity: Group::class, inversedBy: 'groupPermissions')]
    #[ORM\JoinColumn(nullable:false)]
    private Group $group;

    #[ORM\ManyToOne(targetEntity: Permission::class, inversedBy: 'groupPermissions')]
    #[ORM\JoinColumn(nullable:false)]
    private Permission $permission;

    public function getPermission(): Permission
    {
        return $this->permission;
    }
}
