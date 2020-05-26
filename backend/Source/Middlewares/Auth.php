<?php
declare(strict_types=1);

namespace Source\Middlewares;

use Psr\Http\Message\ServerRequestInterface as Request;
use Psr\Http\Server\RequestHandlerInterface;
use Slim\Psr7\Response as Response;
use Source\Core\Authentication;

class Auth {

    public function __invoke(Request $request, RequestHandlerInterface $handler): Response{
        
        $headers = $request->getHeaders();

        $response = new Response();
        if (!isset($headers['Authorization'])) {

            $response->getBody()->write(\json_encode([
                "error" => "Token de autorização não encontrado ."
            ]));

            return $response->withStatus(401);

        }

        $authorization = $headers['Authorization'][0];
        if (explode(" ", $authorization)[0] !== "Bearer") {
            $response->getBody()->write(\json_encode([
                "error" => "Bearer não foi encontrado, verifque o cabeçalho de autorização."
            ]));

            return $response->withStatus(401);

        }

        $token = \explode(" ", $authorization)[1];

        if (!Authentication::validate($token)) {

            $response->getBody()->write(\json_encode([
                "error" => "Token de autorização invalido, por favor, faça login novamente."
            ]));

            return $response->withStatus(401);

        }

        $response = $handler->handle($request);
        return $response;

    }

}