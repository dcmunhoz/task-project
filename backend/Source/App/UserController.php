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

    public function list(Request $req, Response $res){

        $user = new User();

        $results = $user->find(null, null, 'id_user')->fetch(true);

        if (!$results){
            if ($user->fail) {
                // Tratar erros
            }
        }

        $dataset = [];

        foreach ($results as $field) {
            
            $user = new User();
            $user->findById((Int) $field->id_user);

            $dataset[] = [
                "id" => $user->id_user,
                "name" => $user->getShortName()
            ];

        }


        $res->getBody()->write(\json_encode($dataset));
        return $res->withHeader("Content-Type", "application/json");
    }

    public function listMembers(Request $request, Response $response){
        $user = new User();
        $data = $user->find("roles.role = :role", ":role=T")
                ->join("roles", "roles.id_role = users.id_role")
                ->fetch(true);

        if (!$data){
            $response->getBody()->write(\json_encode([
                "error" => "Não foi possivel completar sua socilitação"
            ]));
            return $response->withHeader("Content-Type", "application/json");
        }


        $dataset = [];

        foreach($data as $userResult){

            $user = new User();
            $user->findById((Int) $userResult->id_user);

            $dataset[] = [
                "id" => $user->id_user,
                "name" => $user->getShortName()
            ];
        }

        $response->getBody()->write(\json_encode($dataset));
        return $response->withHeader("Content-Type", "application/json");
        
    

    }

    public function show(Request $request, Response $response, $args){

        $idUser = $args['idUser'];

        $user = new User();
        $user->findById((Int) $idUser);

        if ($user->fail) {
            $response->getBody()->write(\json_encode([
                "error" => "Usuário não encontrado na base de dados"
            ]));

            return $response->withHeader("Content-Type", "application/json");
        }

        $return = [
            "id" => $user->id_user,
            "name" => $user->getShortName(),
            "avatar" => $user->avatar,

        ];

        $response->getBody()->write(\json_encode($return));

        return $response->withHeader("Content-Type", "application/json");

    }

}
