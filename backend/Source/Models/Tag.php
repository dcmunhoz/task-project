<?php
declare(strict_types=1);
namespace Source\Models;

use Source\Core\Model;

class Tag extends Model {

    public function __construct(){
        parent::__construct("tags", "id_tag");
    }
    
}