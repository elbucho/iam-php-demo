<?php

namespace App\Controllers;
use App\DTOs\Widget;
use App\Services\WidgetService;
use Psr\Http\Message\ServerRequestInterface as Request;

class WidgetController extends AbstractController
{
    public function __construct(
        private readonly WidgetService $widgetService
    ) { }

    public function view(array $args = []): array
    {
        return (array_key_exists('id', $args))
            ? $this->widgetService->getWidget((int) $args['id'])
            : $this->widgetService->getAllWidgets();
    }

    public function create(Request $request, array $args = []): void
    {
        $this->widgetService->createWidget(
            Widget::createFromRequest($request, $args)
        );
    }

    public function update(Request $request, array $args = []): void
    {
        $this->widgetService->updateWidget(
            Widget::createFromRequest($request, $args)
        );
    }

    /**
     * @throws \Exception
     */
    public function delete(array $args = []): void
    {
        if ( ! array_key_exists('id', $args)) {
            throw new \Exception(
                'ID not provided',
                400
            );
        }

        $this->widgetService->deleteWidget($args['id']);
    }
}