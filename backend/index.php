<?php
require __DIR__ . '/vendor/autoload.php';
use Slim\Factory\AppFactory;

$app = AppFactory::create();
$app->addBodyParsingMiddleware();

$app->addErrorMiddleware(true, false, false);

require __DIR__ . '/source/Routes/admin.php';

$app->run();