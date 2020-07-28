<?php

namespace Source\App;

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Source\Core\Authentication;
use Source\Models\User;
use Source\Models\Task;
use Source\Models\Situation;

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

        $dataset = [];
        $dataset["tasks_count"] = 0;
        foreach ($result as $taskmember) {
            
            $task = new Task();
            $task->findById($taskmember->id_task);

            $date = new \DateTime();
            $formatedDate = $date->format('Y-m-d');
            
            if ($task->estimated_start == $formatedDate) {
                
                $dataset['tasks_count'] += 1;
            }

        }

        $res->getBody()->write(\json_encode($dataset));
        return $res->withHeader("Content-Type", "application/json");

    }

    public function dailyTasks(Request $req, Response $res){


        $task = new Task();
        $situation = new Situation();

        
        $date = new \DateTime;
        $startDate = $date->format("Y-m-d 00:00:00");
        $endDate = $date->format("Y-m-d 23:59:59");

        $concluded = $situation->find("concluded = :concluded", ":concluded=1")->fetch();

        $newTasks = $task->raw("SELECT * FROM tasks WHERE created_at BETWEEN :dtStart and :dtEnd", [
            ":dtStart" => $startDate,
            ":dtEnd" => $endDate
        ]);

        $closedToday = $task->raw("SELECT * FROM tasks WHERE id_situation = :id_situation and updated_at BETWEEN :dtStart and :dtEnd", [
            ":id_situation" => $concluded->id_situation,
            ":dtStart" => $startDate,
            ":dtEnd" => $endDate
        ]);

        $dataset = [
            "oppened" => count($newTasks),
            "closed" => count($closedToday)
        ];


        $res->getBody()->write(\json_encode($dataset));
        return $res->withHeader("Content-Type", "application/json");

    }

}