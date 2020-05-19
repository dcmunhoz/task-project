<?php
declare(stritc_types=1);

namespace Source\Core;

use Source\Core\Connect;

abstract class Model{

    /** @var object|null */
    protected $data;

    /** @var string|null */
    private $query;

    /** @var string */
    private $entity;

    /** @var string */
    private $key;

    /**
     * Model constructor
     * @param string $entity Database entity
     * @param string $key Table primary key
     */
    public function __construct(string $entity, string $key){

        $this->entity = $entity;
        $this->key = $key;

    }

    /**
     * @param $key string
     * @param $value  
     */
    public function __set($name, $value){

        if (empty($this->data)){
            $this->data = new \stdClass();
        }

        $this->data->$name = $value;

    }

    /** @param $name string */
    public function __get(string $name){

        return $this->data->$name ?? null;

    }

    /**
     * 
     */
    public function find(string $columns = "*"): Model {

        $this->query = "SELECT {$columns} FROM {$this->entity}";
        
        return $this;

    }

    public function fetch(bool $all = false){

        $stmt = Connect::getInstance()->prepare($this->query);
        $stmt->execute();

        if ($all) {
            
            return $stmt->fetchAll();

        }

        return $stmt->fetch();

    }

}