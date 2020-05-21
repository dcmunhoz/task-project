<?php
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

use Source\Core\Model;
use Source\Models\User;

$app->get('/', function (Request $request, Response $response, $args) {

    $user = new User();

    // $user->username = "createtest";
    // $user->password = "teste";
    // $user->email = "teste@email.com";

    // $result = $user->create();

    $user->findById(20);

    $user->username = "novouser4";
    $user->password = "senha";
    
    if ($user->update()) {
        $user->findById(20);
    }

    var_dump($user);

    die;
});