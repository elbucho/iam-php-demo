<?php

namespace App\Services;
use Elbucho\Database\Database;
use App\DTOs\Widget;

readonly class WidgetService
{
    public function __construct(
        readonly private Database $database
    ) { }

    public function getWidget(int $widgetId): array
    {
        return $this->database->query(
            'SELECT * FROM widgets WHERE id = :widgetId AND deleted_at IS NULL',
            ['widgetId' => $widgetId]
        );
    }

    public function getAllWidgets(): array
    {
        return $this->database->query(
            'SELECT * FROM widgets WHERE deleted_at IS NULL',
        );
    }

    public function createWidget(Widget $widget): void
    {
        $this->database->exec("
            INSERT INTO widgets (
                name, 
                type, 
                cost, 
                created_at, 
                updated_at
            ) VALUES (
                :name,
                :type,
                :cost,
                NOW(),
                NOW()
            )
        ", [
            'name'  => $widget->name,
            'type'  => $widget->type,
            'cost'  => $widget->cost,
        ]);
    }

    public function updateWidget(Widget $widget): void
    {
        $this->database->exec("
            UPDATE widgets SET
                name = :name,
                type = :type,
                cost = :cost,
                updated_at = NOW()
            WHERE id = :id
        ", [
            'name'  => $widget->name,
            'type'  => $widget->type,
            'cost'  => $widget->cost,
            'id'    => $widget->id
        ]);
    }

    public function deleteWidget(int $widgetId): void
    {
        $this->database->exec("
            UPDATE widgets SET
                updated_at = NOW(),
                deleted_at = NOW()
            WHERE id = :id
        ", [
            'id' => $widgetId
        ]);
    }
}
