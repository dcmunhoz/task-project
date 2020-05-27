<?php
declare(strict_types=1);

namespace Source\App;

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Source\Models\Task;
use Source\Models\Situation;

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

}