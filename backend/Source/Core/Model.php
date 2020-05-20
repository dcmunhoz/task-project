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
    private $terms;

    /** @var array */
    private $params;

    /**
     * Model constructor
     * 
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
     * Find in database using terms or not to return specific data.
     * 
     * @param string $terms Where clause to filter results
     * @param string $param Parameters to bind on where
     * @param string $columns Columns to return from te result
     * 
     */
    public function find(?string $terms = null, ?string $params = null, string $columns = "*"): Model {

        if ($terms){
            $this->terms = "WHERE " . $terms;
            \parse_str($params, $this->params); 
        }

        $this->query = "SELECT {$columns} FROM {$this->entity}";

        return $this;

    }

    public function findById(int $id){

        $this->query = "SELECT * FROM {$this->entity}";
        $this->terms = "WHERE {$this->key} = :id";
        \parse_str(":id={$id}", $this->params);

        $result = $this->fetch();

        $this->setData($result);

    }

    public function fetch(bool $all = false) {

        $query = "{$this->query} {$this->terms}";

        $stmt = Connect::getInstance()->prepare($query);
        $stmt->execute($this->params);

        if (!$stmt->rowCount()) {

            return null;

        }

        if ($all) {
            
            return $stmt->fetchAll();

        }

        return $stmt->fetch();

    }

    public function setData($data){

        if (!empty($data)) {
            foreach($data as $key => $value){

                $this->{$key} = $value;
    
            }
        }



    }

}