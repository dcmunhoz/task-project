<?php

namespace Source\Models;

use Source\Core\Model;

class Message extends Model {

    public function __construct(){

        parent::__construct("messages", "id_message");

    }

}