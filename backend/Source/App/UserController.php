<?php
declare(strict_types=1);

namespace Source\App;

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Source\Core\Authentication;
use Source\Models\User;
use Source\Models\Task;

class UserController {

    public function save(Request $req, Response $res){
        $body = $req->getParsedBody();
        $user = new User();
        $user->id_user = $body['id_user'] ?? null;
        $user->first_name = $body['first_name'];
        $user->last_name = $body['second_name'];
        $user->username = $body['username'];
        $user->password = $body['password'];
        $user->email = $body['email'];
        $user->id_role = $body['id_role'];
        $user->status = $body['status'];
        $user->avatar = "http://localhost/public/assets/avatars/example_avatar.jpg";

        if (!$user->save()) {
            
            if ($user->fail) {
                $res->getBody()->write(\json_encode([
                    "error" => $user->fail,
                    "type" => "sys"
                ]));
                return $res->withStatus(200);
            }

            $res->getBody()->write(\json_encode([
                "error" => "Não foi possivel cadastrar o usuário"
            ]));

            return $res->withStatus(200);

        }

        $res->getBody()->write(\json_encode($user->getData()));
        return $res->withHeader("Content-Type", "application/json");


        
    }

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

        $result = $user->find()->fetch(true);

        if (!$results){
            if ($user->fail) {
                // Tratar erros
            }
        }

        $dataset = \array_map(function($user){
            
            return $dataset[] = [
                "id" => $user->id_user,
                "name" => $user->first_name . " " . $user->last_name,
                "email" => $user->email,
                "avatar" => $user->avatar,
                "username" => $user->username,
                "status" => $user->status
            ];

        }, $result);

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
            "first_name" => $user->first_name,
            "last_name" => $user->last_name,
            "email" => $user->email,
            "username" => $user->username,
            "role" => $user->id_role,
            "status" => $user->status

        ];

        $response->getBody()->write(\json_encode($return));

        return $response->withHeader("Content-Type", "application/json");

    }

    public function removeMember(Request $request, Response $response, $args){

        $idTask = $args['idTask'];
        $idMember = $args['idMember'];

        $task = new Task();

        $result = $task->raw("DELETE FROM taskxmembers WHERE id_task = :id_task AND id_user = :id_user", [
            ":id_task" => $idTask,
            ":id_user" => $idMember
        ]);

        if ($result == 0) {
            $response->getBody()->write(\json_encode([
                "error" => "Não foi possivel desvincular o membro selecionado."
            ]));

            return $response->withHeader("Content-Type", "application/json");
        }

        $response->getBody()->write(\json_encode($result));
        return $response->withHeader("Content-Type", "application/json");

    }

    public function addMember(Request $request, Response $response, $args){

        $idTask = $args['idTask'];
        $idMember = $args['idMember'];

        $task = new Task();
        $result = $task->raw('INSERT INTO taskxmembers(id_task, id_user) VALUES(:id_task, :id_user)', [
            ":id_task" => $idTask,
            ":id_user" => $idMember
        ]);

        if (!$result) {

            if ($task->fail) {
                $response->getBody()->write(\json_encode([
                    "error" => $task->fail,
                    "type" => "sys"
                ]));
                return $response->withHeader("Content-Type", "application/json");
            }

            $response->getBody()->write(\json_encode([
                "error" => "Não foi possivel adicionar o membro selecionado."
            ]));

            return $response->withHeader("Content-Type", "application/json");
        }

        $response->getBody()->write(\json_encode($result));
        return $response->withHeader("Content-Type", "application/json");

    }

}
