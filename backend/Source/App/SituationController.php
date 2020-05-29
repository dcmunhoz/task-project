<?php

namespace Source\App;

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

use Source\Models\Situation;

class SituationController {

    public function list(Request $request, Response $response){

        $situation = new Situation();
        $result = $situation->find()->fetch(true);



        $response->getBody()->write(\json_encode($result));
        return $response->withHeader("Content-Type", "application/json");


    }

}