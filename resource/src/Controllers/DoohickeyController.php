<?php

namespace App\Controllers;
use App\DTOs\Doohickey;
use App\Services\DoohickeyService;
use Psr\Http\Message\ServerRequestInterface as Request;

class DoohickeyController extends AbstractController
{
    public function __construct(
        private readonly DoohickeyService $doohickeyService
    ) { }

    public function view(array $args = []): array
    {
        return (array_key_exists('id', $args))
            ? $this->doohickeyService->getDoohickey((int) $args['id'])
            : $this->doohickeyService->getAllDoohickeys();
    }

    public function create(Request $request, array $args = []): void
    {
        $this->doohickeyService->createDoohickey(
            Doohickey::createFromRequest($request, $args)
        );
    }

    public function update(Request $request, array $args = []): void
    {
        $this->doohickeyService->updateDoohickey(
            Doohickey::createFromRequest($request, $args)
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

        $this->doohickeyService->deleteDoohickey($args['id']);
    }
}