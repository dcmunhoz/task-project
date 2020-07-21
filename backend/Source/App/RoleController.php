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

    public function save(Request $req, Response $res){

        $body = $req->getParsedBody();

        $role = new Role();
        $role->id_role = $body['id_role'] ?? null;
        $role->role = $body['role'];
        $role->description = $body['description'];

        if (!$role->save()) {

            if ($role->fail) {
                $res->getBody()->write(\json_encode([
                    "error" => $role->e,
                    "type" => "sys"
                ]));

                return $res;
            }

            $res->getBody()->write(\json_encode([
                "error" => "Não foi possivel cadastrar o tipo de usuário"
            ]));

            return $res;

        }

        $res->getBody()->write(\json_encode($role->getData()));
        return $res;

    }

    public function show(Request $req, Response $res, $args){

        $idRole = $args['id_role'];

        $role = new Role();
        $role->findById($idRole);

        if ($role->fail) {
            $res->getBody()->write(\json_encode([
                "error" => "Tipo de usuário não localizado."
            ]));
            return $res; 
        }

        $res->getBody()->write(\json_encode($role->getData()));
        return $res;

    }

}