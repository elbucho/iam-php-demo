<?php

namespace App\Services;
use Elbucho\Database\Database;
use App\DTOs\Doohickey;

readonly class DoohickeyService
{
    public function __construct(
        readonly private Database $database
    ) { }

    public function getDoohickey(int $doohickeyId): array
    {
        return $this->database->query(
            'SELECT * FROM doohickeys WHERE id = :doohickeyId AND deleted_at IS NULL',
            ['doohickeyId' => $doohickeyId]
        );
    }

    public function getAllDoohickeys(): array
    {
        return $this->database->query(
            'SELECT * FROM doohickeys WHERE deleted_at IS NULL',
        );
    }

    public function createDoohickey(Doohickey $doohickey): void
    {
        $this->database->exec("
            INSERT INTO doohickeys (
                name, 
                foo, 
                bars, 
                created_at, 
                updated_at
            ) VALUES (
                :name,
                :foo,
                :bars,
                NOW(),
                NOW()
            )
        ", [
            'name'  => $doohickey->name,
            'foo'   => $doohickey->foo,
            'bars'  => $doohickey->bars,
        ]);
    }

    public function updateDoohickey(Doohickey $doohickey): void
    {
        $this->database->exec("
            UPDATE doohickeys SET
                name = :name,
                foo  = :foo,
                bars = :bars,
                updated_at = NOW()
            WHERE id = :id
        ", [
            'name'  => $doohickey->name,
            'foo'   => $doohickey->foo,
            'bars'  => $doohickey->bars,
            'id'    => $doohickey->id
        ]);
    }

    public function deleteDoohickey(int $doohickeyId): void
    {
        $this->database->exec("
            UPDATE doohickeys SET
                updated_at = NOW(),
                deleted_at = NOW()
            WHERE id = :id
        ", [
            'id' => $doohickeyId
        ]);
    }
}
