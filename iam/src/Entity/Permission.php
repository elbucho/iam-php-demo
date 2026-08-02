<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;

#[ORM\Entity]
#[ORM\Table(name: 'permissions')]
class Permission
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length:255, unique:true)]
    private string $name;

    #[ORM\OneToMany(targetEntity: GroupPermission::class, mappedBy: 'permission')]
    private Collection $groupPermissions;

    public function __construct()
    {
        $this->groupPermissions = new ArrayCollection();
    }

    public function getGroupPermissions(): Collection
    {
        return $this->groupPermissions;
    }

    public function getName(): string
    {
        return $this->name;
    }
}
