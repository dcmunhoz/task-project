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
}