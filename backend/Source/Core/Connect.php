<?php
declare(strict_types=1);

namespace Source\Core;

use Psr\Http\Message\ResponseInterface as Response;

class Connect {

    private static $pdo;

    private static $options = [
        \PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8",
        \PDO::ATTR_ERRMODE => \PDO::ERRMODE_EXCEPTION,
        \PDO::ATTR_DEFAULT_FETCH_MODE => \PDO::FETCH_OBJ
    ];

    public function __construct(){
    }

    public static function getInstance(): \PDO{

        if(empty(self::$pdo)){

            try{

                self::$pdo = new \PDO("mysql:host=".DB_HOST.";dbname=".DB_NAME.";port=".DB_PORT, 
                    DB_USERNAME, 
                    DB_PASSWORD,
                    self::$options 
                );
    
            } catch(\PDOException $e){
    
                throw new \PDOException($e->getMessage());
    
            }

        }

        return self::$pdo;

    }

}