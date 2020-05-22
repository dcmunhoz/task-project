<?php

namespace Source\App;

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Source\Core\Authentication;

class Auth{

    public function login(Request $req, Response $res)
    {

        $body = $req->getParsedBody();

        $result = Authentication::auth($body['username'], $body['password']);

        if (isset($result["error"])){
            $res->getBody()->write(\json_encode($result));
            $response = $res->withHeader("Content-Type", "application/json");
            return $response;
        }

        $res->getBody()->write($result);        
        return $res->withHeader("Content-Type", "application/json");

    }

}