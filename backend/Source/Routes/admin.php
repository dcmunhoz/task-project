<?php
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

use Source\Core\Model;
use Source\Models\User;

$app->get('/', function (Request $request, Response $response, $args) {

    $user = new User();
    $user->username = "usuariot";
    $user->password = "teste";
    $user->email = "teste@1234.com";
    $user->save();
    $user->destroy();
    die;

});