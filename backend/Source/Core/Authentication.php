<?php

namespace Source\Core;

use Source\Models\User;

class Authentication {

    public function __construct(){

    }

    /**
     * Generates a new authorization JWT Token
     * 
     * @param string $username
     * @param string $password
     * 
     * @return string
     */
    public static function auth(string $username, string $password)
    {

        $user = new User();
        $result = $user->find("username = :username and password = :password", ":username=$username&:password=$password")->fetch();
        
        if (!$result) {
            return false;
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

        $token = $header . "." . $payload . "." . $signature;

        return $token;

    }

    /**
     * Verify if is a valid JWT Token.
     * 
     * @param string $token JWT Token
     * 
     * @return bool
     */
    private static function validate(string $token): bool
    {
        
        self::isToken($token);

        $hashes = \explode(".",$token);

        $header = $hashes[0];
        $payload = $hashes[1];
        $signature = $hashes[2];

        $signature = self::base64URLDecode($signature);

        $valid = \hash_hmac('sha256', $header . "." . $payload, TOKEN_SECRET_KEY, true);

        if ($valid != $signature) {
            return false;
        }
        
        return true;

    }

    /**
     * Return JWT decoded data
     * 
     * @param string $token
     * 
     * @return array
     */
    private static function decode(string $token): array
    {

        self::isToken($token);

        $hashes = \explode(".", $token);

        $data["header"] = (Object) \json_decode(self::base64URLDecode($hashes[0]));
        $data["payload"] = (Object) \json_decode(self::base64URLDecode($hashes[1]));

        return (Object) $data;

    }

    /**
     * Verify if is a valid JWT Token template
     * 
     * @param string $token
     *  
     * @return bool 
     */
    private static function isToken(string $token): bool
    {

        $hashes = \explode(".",$token);

        if (count($hashes) < 3 || count($hashes) > 3) {

            throw new \Exception("Token invalido. O Token deve conter apenas doi pontos.");

        }

        return true;

    }

    /**
     * Encode an string to a Base64URL format
     * 
     * @param string $value
     * 
     * @return string 
     */
    private function base64URLEncode(string $value): string
    {

        $value = \base64_encode($value);
        $value = \str_replace("=", "", $value);
        $value = \str_replace("+", "-", $value);

        return $value;

    }

    /**
     * Decode an Base64URL string format
     * 
     * @param string $value
     * 
     * @return string 
     */
    private function base64URLDecode(string $value): string
    {

        $value = \str_replace("-", "+", $value);

        return \base64_decode($value);
    }


}