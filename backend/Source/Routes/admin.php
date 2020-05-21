<?php
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

use Source\Core\Model;
use Source\Core\Authentication;

$app->get('/', function (Request $request, Response $response, $args) {

    $auth = Authentication::auth("dcmunhoz", "teste");

    die;

});