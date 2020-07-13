<?php


namespace Source\Models;

use Source\Core\Model;

class Role extends Model{
    
    public function __construct(){

        parent::__construct("roles", "id_role");

    }
}