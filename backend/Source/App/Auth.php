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

        if (!$result){
            $res->getBody()->write(\json_encode([
                "success"=>false,
                "payload"=>"Usuário ou senha incorreto."
            ]));
            return $res;
        }

        $res->getBody()->write(\json_encode([
            "success"=>true,
            "payload"=>$result
        ]));        

        return $res;

    }

}