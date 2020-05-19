<?php
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

use Source\Core\Model;
use Source\Models\User;

$app->get('/', function (Request $request, Response $response, $args) {
    
    $user = new User();
    $user->algumAtributo;

    var_dump($user);
    
});