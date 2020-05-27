<?php

namespace Source\Models;

use Source\Core\Model;

class Situation extends Model {
    public function __construct(){
        parent::__construct("situations", "id_situation");
    }
}