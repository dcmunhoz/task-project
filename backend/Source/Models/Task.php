<?php
declare(strict_types=1);

namespace Source\Models;

use Source\Core\Model;

class Task extends Model {

    public function __construct(){

        parent::__construct("tasks", "id_task");

    }

}