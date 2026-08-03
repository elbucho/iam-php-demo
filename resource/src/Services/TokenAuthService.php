<?php

namespace App\Services;
use Elbucho\Config\Config;
use GuzzleHttp\Client;
use GuzzleHttp\Exception\GuzzleException;

readonly class TokenAuthService
{
    public function __construct(
        private readonly Config $config
    ) { }

    /**
     * @throws GuzzleException
     */
    public function getPermissions(string $token): array
    {
        $client = new Client();

        $response = $client->get(
            $this->config->get('permissions_uri'),
            [
                'headers' => [
                    'Authorization' => 'Bearer ' . $token,
                    'Accept'        => 'application/json',
                ]
            ]
        );

        $data = json_decode($response->getBody()->getContents(), true);

        if (array_key_exists('permissions', $data)) {
            return $data['permissions'];
        }

        return [];
    }
}
