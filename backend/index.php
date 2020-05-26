<?php
require __DIR__ . '/vendor/autoload.php';
use Slim\Factory\AppFactory;

$app = AppFactory::create();
$app->addErrorMiddleware(true, false, false);
$app->addBodyParsingMiddleware();

$app->add(new Source\Middlewares\Cors());
$app->add(new Source\Middlewares\Auth());

require __DIR__ . '/source/Routes/routes.php';
require __DIR__ . '/source/Routes/admin.php';

$app->run();