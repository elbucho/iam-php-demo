<?php

namespace App\DTOs;

class Widget extends AbstractDto
{
    public function __construct(
        public string $name,
        public string $type,
        public float $cost,
        public ?int $id = null,
    ) { }
}
