<?php

namespace App\DTOs;

class Doohickey extends AbstractDto
{
    public function __construct(
        public string $name,
        public string $foo,
        public ?int $bars = 0,
        public ?int $id = null,
    ) { }
}
