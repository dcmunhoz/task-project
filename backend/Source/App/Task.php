<?php
declare(strict_types=1);

namespace Source\App;

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

class Task {

    public function __construct(){

    }

    public function create(Request $request, Response $response, $args){

        $response->getBody()->write("Teste");
        return $response;

    }

}