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

        $excluded = ['/api/login', '/'];

        if (!\in_array($request->getUri()->getPath(), $excluded)) {

            $response = new Response();

            if (!isset($headers['Authorization'])) {

                $response->getBody()->write(\json_encode([
                    "error" => "Token de autorização não encontrado .",
                    "type" => "sys"
                ]));

                return $response->withStatus(200)
                ->withHeader('Access-Control-Allow-Origin', '*')
                ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization, Referer, User-Agent')
                ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS')
                ->withHeader('Access-Control-Allow-Credentials', 'true')
                ->withHeader('Content-Type', "application/json");

            }

            $authorization = $headers['Authorization'][0];
            if (explode(" ", $authorization)[0] !== "Bearer") {
                $response->getBody()->write(\json_encode([
                    "error" => "Bearer não foi encontrado, verifque o cabeçalho de autorização.",
                    "type" => "sys"
                ]));

                return $response->withStatus(200)
                ->withHeader('Access-Control-Allow-Origin', '*')
                ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
                ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS')
                ->withHeader('Access-Control-Allow-Credentials', 'true')
                ->withHeader('Content-Type', "application/json");
            }

            $token = \explode(" ", $authorization)[1];

            if (!Authentication::validate($token)) {

                $response->getBody()->write(\json_encode([
                    "error" => "Token de autorização invalido, por favor, faça login novamente.",
                    "type" => "sys"
                ]));

                return $response->withStatus(200)
                ->withHeader('Access-Control-Allow-Origin', '*')
                ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
                ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS')
                ->withHeader('Access-Control-Allow-Credentials', 'true')
                ->withHeader('Content-Type', "application/json");

            }

        }

        $response = $handler->handle($request);
        return $response;

    }

}