<?php

namespace Source\App;

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Source\Models\Tag;

class TagController {

    public function save(Request $request, Response $response){

        $body = $request->getParsedBody();

        $tag = new Tag();
        $tag->id_tag = $body['id_tag'] ?? null;
        $tag->title = $body['tag'];
        $tag->background_color = $body['backgroundColor'];
        $tag->foreground_color = $body['foregroundColor'];

        if (!$tag->save()) {
            if ($tag->fail) {

                $response->getBody()->write(\json_encode([
                    "error" => $tag->fail,
                    "type" => "sys"
                ]));

                return $response;

            }

            $response->getBody()->write(\json_encode([
                "error" => "Não foi possivel salvar a etiqueta."
            ]));

            return $response;
        }
        
        

        $response->getBody()->write(\json_encode($tag->getData()));
        return $response;

    }

    public function delete(Request $request, Response $response, $args){
        
        $tag = new Tag();
        $tag->id_tag = $args['id_tag'];

        if (!$tag->destroy()){
            if ($tag->fail) {
                $response->getBody()->write(\json_encode([
                    "error" => $tag->fail,
                    "type" => "sys"
                ]));
                return $response->withHeader("Content-Type", "application/json");
            }

            $response->getBody()->write(\json_encode([
                "error" => "Não foi possivel apagar a Etiqueta"
            ]));
            return $response->withHeader("Content-Type", "application/json");
        }

        $response->getBody()->write(\json_encode([
            "ok" => true
        ]));
        return $response->withHeader("Content-Type", "application/json");

    }

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
            $response->getBody()->write(\json_encode([
                "error" => "Não foi possivel localizar a etiqueta."
            ]));
            return $response->withHeader("Content-Type", "application/json");
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