<?php
declare(strict_types=1);

namespace Source\App;

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Source\Models\Task;
use Source\Models\Situation;
use Source\Models\User;

class TaskController {

    public function __construct(){

    }

    public function create(Request $request, Response $response, $args){
        $body = $request->getParsedBody();

        $task = new Task();
        $task->title = \filter_var($body['title'], \FILTER_SANITIZE_STRING);
        $task->description = \filter_var($body['description'], \FILTER_SANITIZE_STRING);
        $task->id_user_creation = \filter_var($body['id_user_creation'], \FILTER_SANITIZE_NUMBER_INT);
        $task->id_requester = \filter_var($body['id_requester'], \FILTER_SANITIZE_NUMBER_INT);

        $situation = new Situation();
        $situation = $situation->find("`default` = :default", ":default=1")->fetch();
        if (!$situation){
            $response->getBody()->write(\json_encode([
                "error" => "Não foi possivel buscar a situação padrão"
            ]));

            return $response->withHeader("Content-Type", "application/json");
        }

        $task->id_situation = $situation->id_situation;

        if (!$task->save()) {
    
            $response->getBody()->write(\json_encode([
                "error"=> $task->fail,
                "type" => "sys"
            ]));
            
            return $response->withHeader("Content-Type", "application/json");
        }

        $response->getBody()->write(\json_encode($task->getData()));
        return $response->withHeader("Content-Type", "application/json");

    }

    public function list(Request $request, Response $response){

        $task = new Task();
        $tasks = $task->find()->fetch(true);

        $dataset = [];

        foreach($tasks as $task){

            $situation = new Situation();
            $situation->findById((Int) $task->id_situation);
            $task->situation = $situation->situation;

            $requester = new User();
            $requester->findById((Int) $task->id_requester);
            $task->requester = $requester->first_name;

            $createdAt = new \DateTime($task->created_at);
            $task->creation_date = $createdAt->format("d/m/Y");
            $task->creation_time = $createdAt->format("H:i");

            $dataset[] = $task;
        }

        $response->getBody()->write(\json_encode($dataset));
        return $response->withHeader("Content-Type", "application/json");

    }

    public function listBySituation(Request $request, Response $response, $args){
        
        $params = $request->getQueryParams();

        $idSituation = $params['situation_id'];

        $task = new Task();
        $result = $task->find("id_situation = :id_situation", ":id_situation={$idSituation}")->fetch(true);

        if (!$result){
            $response->getBody()->write(\json_encode([]));
            return $response->withHeader("Content-Type", "application/json");
        }

        $dataset = [];

        foreach ($result as $task){

            $creationDate = new \DateTime($task->created_at);
            $task->creationDate = $creationDate->format("d/m/Y");
            $task->creationTime = $creationDate->format("H:i");

            $dataset[] = $task;

        }

        $response->getBody()->write(\json_encode($dataset));
        return $response->withHeader("Content-Type", "application/json");
    }

    public function show(Request $request, Response $response, $args){
        $idTask = $args['idTask'];

        $task = new Task();
        $task->findById((Int) $idTask);

        if ($task->fail) {
            $response->getBody()->write(\json_encode([
                "error"=>true,
                "message" => "A tarefa requisitada não existe na base de dados"
            ]));

            return $response->withStatus(400)->withHeader("Content-Type", "application/json");
        }

        $user = new User();
        $user->findById((Int) $task->id_requester);

        $createdAt = new \DateTime($task->created_at);
        $conclusion = null; // fix

        $estimated = null;
        if ($task->estimated_start){
            $estimated = new \DateTime($task->estimated_start);
            $estimated = $estimated->format("d/m/Y");
        }

        $result = [
            "id_task" => $task->id_task,
            "title"   => $task->title,
            "situation" => $task->id_situation,
            "created_date" => $createdAt->format("d/m/Y"),
            "created_time" => $createdAt->format("H:i"),
            "estimated" => $estimated,
            "conclusion" => $conclusion,
            "description" => $task->description
        ];

        $result['requester'] = [
            "id" => $user->id_user,
            "name" => $user->getShortName(),
            "email" => $user->email
        ];

        $result['members'] = [];
        $result['tags'][] = [
            "id"=> 1,
            "label" => "teste"
        ];

        $result['messages'] = [];

        $response->getBody()->write(\json_encode($result));
        return $response->withHeader("Content-Type", "application/json");
    }

}