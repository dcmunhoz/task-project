<?php

namespace Source\Core;

use Source\Models\User;

class Authentication {

    public function __construct(){

    }

    public static function auth(string $username, string $password){

        $user = new User();
        $result = $user->find("username = :username and password = :password", ":username=$username&:password=$password")->fetch();
        
        if (!$result) {
            throw new \Exception("Usuário não encontrado");
            die;
        } 

        $user->setData($result);

        $header = [
            "alg"=>"HS256",
            "typ"=>"JWT"
        ];

        $payload = [
            "name"=> $user->username,
            "admin" => false
        ];

        $header = \json_encode($header);
        $payload = \json_encode($payload);

        $header = self::base64URLEncode($header);
        $payload = self::base64URLEncode($payload);
        
        $signature = \hash_hmac('sha256', $header . "." . $payload, TOKEN_SECRET_KEY, true);
        $signature = self::base64URLEncode($signature);

        echo $header . "." . $payload . "." . $signature ;


    }

    private function base64URLEncode(string $value){

        $value = \base64_encode($value);
        $value = \str_replace("=", "", $value);
        $value = \str_replace("+", "-", $value);

        return $value;

    }

}