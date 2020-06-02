<?php
declare(strict_types=1);

namespace Source\Models;

use Source\Core\Model;

class User extends Model{

    public function __construct(){
        
        parent::__construct("users", "id_user");

    }

    public function getShortName(){
        $firtName = $this->first_name;
        $splitedLastName = \explode(" ", $this->last_name);
        $lastName = $splitedLastName[count($splitedLastName) - 1];

        return $firtName . " " . $lastName;
    }
}
