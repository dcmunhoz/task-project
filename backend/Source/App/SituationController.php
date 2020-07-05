<?php

namespace Source\App;

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

use Source\Models\Situation;

class SituationController {

    public function list(Request $request, Response $response){

        $situation = new Situation();
        $result = $situation->find()->fetch(true);

        $return = \array_map(function($arr){

            $newArr = new \stdClass();
            $newArr->id = $arr->id_situation;
            $newArr->label = $arr->situation;
            $newArr->conclusion = $arr->concluded;
            return $newArr;

        }, $result);

        $response->getBody()->write(\json_encode($return));
        return $response->withHeader("Content-Type", "application/json");


    }

}