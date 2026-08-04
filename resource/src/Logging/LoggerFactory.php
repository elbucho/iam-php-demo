<?php

namespace App\Logging;
use Monolog\Handler\StreamHandler;
use monolog\Level;
use Monolog\Logger;

class LoggerFactory
{
    public static function create(): Logger
    {
        $logger = new Logger('resource-server');

        $logger->pushHandler(
            new StreamHandler(
                __DIR__ . '/../../logs/app.log',
                Level::Debug
            )
        );

        return $logger;
    }
}