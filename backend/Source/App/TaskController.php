<?php
declare(strict_types=1);

namespace Source\App;

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Source\Models\Task;
use Source\Models\Tag;
use Source\Models\Situation;
use Source\Models\User;
use Source\Models\Message;

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

        if (!empty($body['selectedMembers'])) {

            $selectedMembers = $body['selectedMembers'];

            foreach($selectedMembers as $member){

                $task->raw("INSERT INTO taskxmembers (id_task, id_user) VALUES (:id_task, :id_user)", [
                    ":id_task" => $task->id_task,
                    ":id_user" => $member
                ]);

            }
                      
        }

        if (!empty($body['selectedTags'])) {

            $selectesTags = $body['selectedTags'];

            foreach ($selectesTags as $tag) {

                $task->raw("INSERT INTO taskxtags (id_task, id_tag) VALUES (:id_task, :id_tag)", [
                    ":id_task" => $task->id_task,
                    ":id_tag" => $tag
                ]);
            }

        }
        
        $response->getBody()->write(\json_encode($task->getData()));
        return $response->withHeader("Content-Type", "application/json");

    }

    public function list(Request $request, Response $response){

        $task = new Task();
        $tasks = $task->find()->fetch(true);

        $dataset = [];

        if (!$tasks){
            // if ($task->fail) {
            //     $response->getBody()->write(\json_encode([
            //         "error" => $task->fail
            //     ]));
            // }

            $response->getBody()->write(\json_encode($dataset));
            return $response->withHeader("Content-Type", "application/json");
        }


        foreach($tasks as $row){

            $situation = new Situation();
            $situation->findById((Int) $row->id_situation);
            $row->situation = $situation->situation;

            $requester = new User();
            $requester->findById((Int) $row->id_requester);
            $row->requester = $requester->first_name;

            $createdAt = new \DateTime($row->created_at);
            $row->creation_date = $createdAt->format("d/m/Y");
            $row->creation_time = $createdAt->format("H:i");

            $task = new Task();
            $taskxtags = $task
                ->find(
                    "tasks.id_task = :id_task", 
                    ":id_task={$row->id_task}", 
                    "taskxtags.id_task, taskxtags.id_tag"
                )
                ->join("taskxtags", "taskxtags.id_task = tasks.id_task")
                ->fetch(true); 
            $tags = [];
            if ($taskxtags) {
                
                foreach ($taskxtags as $rowTags) {
                
                    $tag = new Tag();
                    $tagData = $tag->find("id_tag = :id_tag", ":id_tag={$rowTags->id_tag}")->fetch();

                    $tags[] = $tagData;
                }

            }
            $row->tags = $tags;

            $taskxmembers = $task
                ->find(
                    "tasks.id_task = :id_task", 
                    ":id_task={$row->id_task}",
                    "taskxmembers.id_task, taskxmembers.id_user"
                )
                ->join("taskxmembers", "taskxmembers.id_task = tasks.id_task")
                ->fetch(true);
            
            $members = [];
            if ($taskxmembers) {
                foreach ($taskxmembers as $rowMember) {

                    $user = new user();
                    $user->findById((Int) $rowMember->id_user);

                    $userData = [
                        "id_user" => $user->id_user,
                        "avatar" => $user->avatar,
                        "name" => $user->getShortName()    
                    ];

                    $members[] = $userData;

                }
            }

            $row->members = $members;
            
            $dataset[] = $row;
        }

        $response->getBody()->write(\json_encode($dataset));
        return $response->withHeader("Content-Type", "application/json");

    }

    public function listBySituation(Request $request, Response $response, $args){
        
        $params = $request->getQueryParams();

        $idSituation = $params['situation_id'];

        $task = new Task();
        $tasks = $task->find("id_situation = :id_situation", ":id_situation={$idSituation}")->fetch(true);

        if (!$tasks){
            $response->getBody()->write(\json_encode([]));
            return $response->withHeader("Content-Type", "application/json");
        }

        $dataset = [];

        foreach ($tasks as $row){

            // $creationDate = new \DateTime($task->created_at);
            // $task->creationDate = $creationDate->format("d/m/Y");
            // $task->creationTime = $creationDate->format("H:i");

            // $dataset[] = $task;

            $situation = new Situation();
            $situation->findById((Int) $row->id_situation);
            $row->situation = $situation->situation;

            $requester = new User();
            $requester->findById((Int) $row->id_requester);
            $row->requester = $requester->first_name;

            $createdAt = new \DateTime($row->created_at);
            $row->creationDate = $createdAt->format("d/m/Y");
            $row->creationTime = $createdAt->format("H:i");

            $task = new Task();
            $taskxtags = $task
                ->find(
                    "tasks.id_task = :id_task", 
                    ":id_task={$row->id_task}", 
                    "taskxtags.id_task, taskxtags.id_tag"
                )
                ->join("taskxtags", "taskxtags.id_task = tasks.id_task")
                ->fetch(true); 
            $tags = [];
            if ($taskxtags) {
                
                foreach ($taskxtags as $rowTags) {
                
                    $tag = new Tag();
                    $tagData = $tag->find("id_tag = :id_tag", ":id_tag={$rowTags->id_tag}")->fetch();

                    $tags[] = $tagData;
                }

            }
            $row->tags = $tags;

            $taskxmembers = $task
                ->find(
                    "tasks.id_task = :id_task", 
                    ":id_task={$row->id_task}",
                    "taskxmembers.id_task, taskxmembers.id_user"
                )
                ->join("taskxmembers", "taskxmembers.id_task = tasks.id_task")
                ->fetch(true);
            
            $members = [];
            if ($taskxmembers) {
                foreach ($taskxmembers as $rowMember) {

                    $user = new user();
                    $user->findById((Int) $rowMember->id_user);

                    $userData = [
                        "id_user" => $user->id_user,
                        "avatar" => $user->avatar,
                        "name" => $user->getShortName()    
                    ];

                    $members[] = $userData;

                }
            }

            $row->members = $members;
            
            $dataset[] = $row;

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

        
        $taskxtags = $task
            ->find(
                "tasks.id_task = :id_task", 
                ":id_task={$task->id_task}", 
                "taskxtags.id_task, taskxtags.id_tag"
            )
            ->join("taskxtags", "taskxtags.id_task = tasks.id_task")
            ->fetch(true); 

        $tags = [];
        if ($taskxtags) {
            
            foreach ($taskxtags as $rowTags) {
            
                $tag = new Tag();
                $tagData = $tag->find("id_tag = :id_tag", ":id_tag={$rowTags->id_tag}")->fetch();

                $tags[] = $tagData;
            }

        }
        $result['tags'] = $tags;

        $taskxmembers = $task
            ->find(
                "tasks.id_task = :id_task", 
                ":id_task={$task->id_task}",
                "taskxmembers.id_task, taskxmembers.id_user"
            )
            ->join("taskxmembers", "taskxmembers.id_task = tasks.id_task")
            ->fetch(true);
        
        $members = [];
        if ($taskxmembers) {
            foreach ($taskxmembers as $rowMember) {

                $user = new user();
                $user->findById((Int) $rowMember->id_user);

                $userData = [
                    "id_user" => $user->id_user,
                    "avatar" => $user->avatar,
                    "name" => $user->getShortName()    
                ];

                $members[] = $userData;

            }
        }

        $result['members'] = $members;


        $taskxmessages = $task->raw("SELECT * FROM messages WHERE id_task = :id_task", [
            ":id_task" => $task->id_task
        ]);

        
        $result['messages'] = \array_map(function($message){

            $user = new User();
            $user->findById((Int) $message->id_user);

            $createdAt = new \DateTime($message->created_at);


            $result = new \stdClass();
            $result->id_message = $message->id_message;
            $result->message = $message->message;
            $result->user = $user->getShortName();
            $result->creation = $createdAt->format("d/m/Y H:i");
            $result->avatar = $user->avatar;

            return $result;
        }, $taskxmessages);

        $response->getBody()->write(\json_encode($result));
        return $response->withHeader("Content-Type", "application/json");
    }

    public function update(Request $request, Response $response){

        $body = $request->getParsedBody();

        $task = new Task();
        $task->findById((Int) $body['id_task']);
        $task->title = $body['title'];
        $task->id_situation = $body['situation'];
        $task->description = $body['description'];
        $task->id_requester = $body['requester']['id'];
        $task->estimated_start = $body['estimated'];

        if (!$task->save()){
            $response->getBody()->write(\json_encode([
                "error" => "Houve um erro ao tentar salvar"
            ]));

            if ($task->fail) {

                $response->getBody()->write(\json_encode([
                    "error" => $task->fail,
                    "type" => "sys"
                ]));

            }

            return $response;

        } 

        $response->getBody()->write(\json_encode($task->getData()));
        return $response;

    }

    public function addNewMessage(Request $request, Response $response){
        $body = $request->getParsedBody();

        $idUser = \filter_var($body['id_user'] ?? null, \FILTER_SANITIZE_STRING);
        $idTask = \filter_var($body['id_task'] ?? null, \FILTER_SANITIZE_STRING);
        $messageContent = \filter_var($body['message'] ?? null, \FILTER_SANITIZE_STRING);
        $conclusion = $body['conclusion'] ?? null;

        $message = new Message();
        $message->id_user = $idUser;
        $message->id_task = $idTask;
        $message->message = $messageContent;
        $message->conclusion = $conclusion;

        if (!$message->save()) {
            if ($message->fail) {
                $response->getBody()->write(\json_encode([
                    "error" => $message->fail,
                    "type" => "sys"
                ]));

                return $response;
            }

            $response->getBody()->write(\json_encode([
                "error" => "Houve um erro ao inserir a mensagem"
            ]));

            return $response;
        }

        return $response;
    }

    public function updateMessage(Request $request, Response $response){

        $body = $request->getParsedBody();
        $idMessage = $body["id_message"] ?? null;
        $messageContent = $body['message'] ?? null;

        $message = new Message();

        $message->findById((Int) $idMessage);
        $message->message = $messageContent;

        if (!$message->save()) {
            if ($message->fail) {
                $response->getBody()->write(\json_encode([
                    "error" => $message->fail,
                    "type" => "sys"
                ]));

                return $response;
            }

            $response->getBody()->write(\json_encode([
                "error" => "Houve um erro ao inserir a mensagem"
            ]));

            return $response;
        }
                
        $response->getBody()->write(\json_encode($message->getData()));
        return $response;
    }

    public function deleteMessage(Request $request, Response $response, $args){

        
        $idMessage = $args['id_message'] ?? null;

        $message = new Message();
        $message->findById((Int) $idMessage);
        $message->destroy();
        
        return $response;
        

    }

}