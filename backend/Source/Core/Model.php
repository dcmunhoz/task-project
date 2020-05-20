<?php
declare(strict_types=1);

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

    /** @var string */
    private $filters;

    /** @var array */
    private $params;

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
    public function find(?string $terms = null, ?string $params = null, string $columns = "*"): Model {

        if ($terms){
            $this->terms = "WHERE " . $terms;
            \parse_str($params, $this->params); 
        }

        $this->query = "SELECT {$columns} FROM {$this->entity} {$this->terms}";

        return $this;

    }

    public function fetch(bool $all = false) {
        $stmt = Connect::getInstance()->prepare($this->query);
        $stmt->execute($this->params);

        if (!$stmt->rowCount()) {

            return null;

        }

        if ($all) {
            
            return $stmt->fetchAll();

        }

        return $stmt->fetch();

    }

}