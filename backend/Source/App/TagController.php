<?php

namespace Source\App;

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Source\Models\Tag;

class TagController {

    public function list(Request $request, Response $response){

        $tag = new Tag();
        $result = $tag->find()->fetch(true);
        
        $response->getBody()->write(\json_encode($result));
        return $response->withHeader("Content-Type", "application/json");

    }

    public function show(Request $request, Response $response, $args){

        $idTag = $args['idTag'];

        $tag = new Tag();
        $tag->findById((Int) $idTag);

        if ($tag->fail) {

        }

        $data = $tag->getData();
        $response->getBody()->write(\json_encode($data));
        return $response->withHeader("Content-Type", "application/json");

    }

    public function removeTag(Request $request, Response $response, $args){

        $idTask = $args['idTask'];
        $idTag = $args['idTag'];

        $tag = new Tag();

        $result = $tag->raw("DELETE FROM taskxtags WHERE id_task = :id_task AND id_tag = :id_tag", [
            ":id_task" => $idTask,
            ":id_tag" => $idTag
        ]);

        if (!$result) {
            if ($tag->fail) {
                $response->getBody()->write(\json_encode([
                    "error" => $tag->fail,
                    "type" => "sys"
                ]));
    
                return $response->withHeader("Content-Type", "application/json");
            }
            $response->getBody()->write(\json_encode([
                "error" => "Não foi possivel desvincular a etiqueta selecionado."
            ]));
            return $response->withHeader("Content-Type", "application/json");
        }

        $response->getBody()->write(\json_encode($result));
        return $response->withHeader("Content-Type", "application/json");

    }

    public function addTag(Request $request, Response $response, $args){

        $idTask = $args['idTask'];
        $idTag = $args['idTag'];

        $tag = new Tag();

        $result = $tag->raw("INSERT INTO taskxtags(id_task, id_tag) VALUES(:id_task, :id_tag)", [
            ":id_task" => $idTask,
            ":id_tag" => $idTag
        ]);

        if (!$result) {
            if ($tag->fail) {
                $response->getBody()->write(\json_encode([
                    "error" => $tag->fail,
                    "type" => "sys"
                ]));
    
                return $response->withHeader("Content-Type", "application/json");
            }
            $response->getBody()->write(\json_encode([
                "error" => "Não foi possivel vincular a etiqueta selecionado."
            ]));
            return $response->withHeader("Content-Type", "application/json");
        }

        $response->getBody()->write(\json_encode($result));
        return $response->withHeader("Content-Type", "application/json");

    }
}