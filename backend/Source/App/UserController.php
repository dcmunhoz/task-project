<?php
declare(strict_types=1);

namespace Source\App;

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Source\Core\Authentication;
use Source\Models\User;

class UserController {

    public function authenticatedUser(Request $req, Response $res){

        $headers = $req->getHeaders();
        $authroization = $headers['Authorization'][0];

        $token = \explode(" ", $authroization)[1];
        
        $data = Authentication::decode($token);  
        
        $user = new User();
        $user->findById((Int) $data->payload->id);

        $responseData["id_user"] = $user->id_user;
        $responseData["username"] = $user->username;
        $responseData["fullname"] = $user->first_name . ' ' . $user->last_name;

        $res->getBody()->write(\json_encode($responseData));
        return $res->withHeader("Content-type", "application/json");


    }

}
