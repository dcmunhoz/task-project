<?php

namespace Source\App;

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Source\Core\Authentication;
use Source\Models\User;
use Source\Models\Task;

class DashController {

    public function userTasks(Request $req, Response $res){

        $headers = $req->getHeaders();
        $token = $headers['Authorization'][0];

        $decode = Authentication::decode($token);
        $payload = $decode->payload;
        $idUser = $payload->id;

        $user = new User();
        $user->findById((Int) $idUser);

        $result = $user->raw("SELECT * FROM taskxmembers WHERE id_user = :id_user", [
            ":id_user"=> $idUser
        ]);

        if (!$result) {

            var_dump("não possui tarefas");
            die;
        }

        $dataset = [];
        foreach ($result as $taskmember) {
            
            $task = new Task();
            $task->findById($taskmember->id_task);

            $date = new \DateTime();
            $formatedDate = $date->format('Y-m-d');
            
            if ($task->estimated_start == $formatedDate) {
                \var_dump($task);
            }

        }
        die;

        $res->getBody()->write(\json_encode($result));
        return $res;

    }

}