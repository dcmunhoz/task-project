<?php

namespace Source\App;

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

use Source\Models\Role;

class RoleController {
    
    public function list(Request $req, Response $res){

        $role = new Role();
        $result = $role->find()->fetch(true);

        $res->getBody()->write(\json_encode($result));
        return $res->withStatus(200);

    }

}