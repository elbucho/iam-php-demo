<?php

namespace App\Entity;

use AllowDynamicProperties;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity]
#[ORM\Table(name: 'users')]
#[ORM\HasLifecycleCallbacks]
class User
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    private ?int $id = null;

    #[ORM\Column(type: 'string', length: 255, unique: true)]
    private string $uid {
        get {
            return $this->uid;
        }
    }

    #[ORM\Column(type: 'string', length: 255, unique: true)]
    public string $email {
        get {
            return $this->email;
        }
        set {
            $this->email = $value;
        }
    }

    #[ORM\Column(type: 'string', length: 255, nullable: true)]
    public string $name {
        get {
            return $this->name;
        }
        set {
            $this->name = $value;
        }
    }

    #[ORM\Column]
    private \DateTimeImmutable $createdAt;

    #[ORM\Column]
    private \DateTimeImmutable $updatedAt;

    #[ORM\Column(nullable: true)]
    private ?\DateTimeImmutable $deletedAt;

    public function __construct(
        string $uid,
        string $email,
        string|null $name = null,
    ) {
        $this->uid = $uid;
        $this->email = $email;
        $this->name = $name;
    }

    #[ORM\PrePersist]
    public function onPrePersist(): void
    {
        $now = new \DateTimeImmutable();

        $this->createdAt = new $now;
        $this->updatedAt = new $now;
    }

    #[ORM\PreUpdate]
    public function onPreUpdate(): void
    {
        $this->updatedAt = new \DateTimeImmutable();
    }
}
