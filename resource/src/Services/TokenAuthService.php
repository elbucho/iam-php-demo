<?php

namespace App\Services;
use Elbucho\Config\Config;
use GuzzleHttp\Client;
use GuzzleHttp\Exception\GuzzleException;
use Psr\Log\LoggerInterface;

readonly class TokenAuthService
{
    public function __construct(
        private readonly Config $config,
        private readonly LoggerInterface $logger,
    ) { }

    /**
     * @throws GuzzleException
     */
    public function getPermissions(string $token): array
    {
        $client = new Client();

        $this->logger->debug("Fetching permissions");

        $response = $client->get(
            $this->config->get('permissions_uri'),
            [
                'headers' => [
                    'Authorization' => 'Bearer ' . $token,
                    'Accept'        => 'application/json',
                ]
            ]
        );

        return json_decode($response->getBody()->getContents(), true);
    }
}
