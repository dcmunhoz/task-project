<?php
declare(strict_types=1);

namespace Source\Core;

use Source\Core\Connect;

abstract class Model{

    /** @var object|null */
    private $data;

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

    /** @var array */
    private $protected;

    /**
     * Model constructor
     * 
     * @param string $entity Database entity
     * @param string $key Table primary key
     */
    public function __construct(string $entity, string $key, array $protected = ["created_at", "updated_at"]){

        $this->entity = $entity;
        $this->key = $key;
        $this->protected = $protected;
        $this->protected[] = $key;

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
        }

        if ($params) {
            \parse_str($params, $this->params); 
        }

        $this->query = "SELECT {$columns} FROM {$this->entity}";

        return $this;

    }

    /**
     * @param int $id
     */
    public function findById(int $id){

        $result = $this->find("{$this->key} = $id ")->fetch();

        $this->setData($result);
    }

    /**
     * @param bool $all
     */
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

    public function create() {

        try{
            $keys = \array_keys((Array)$this->data);
            $keys = \implode(", ", $keys);
            $values = "'" . \implode("', '", (Array)$this->data) . "'";
            $stmt = Connect::getInstance()->prepare("INSERT INTO {$this->entity} ({$keys}) VALUES({$values})");
            $stmt->execute();

            return Connect::getInstance()->lastInsertId();

        }catch(\PDOException $e){

            throw new \PDOException($e->getMessage());
            

        }
    }

    public function update(string $filter = ""){
        try{
            
            foreach ((Array) $this->data as $key => $value) {

                if (!in_array($key, $this->protected)) {
                    $dataset[] = "{$key} = :{$key}";
                    $data[":" . $key] = $value;
                }

            }

            $dataset = \implode(', ', $dataset);

            $stmt = Connect::getInstance()->prepare("UPDATE {$this->entity} SET {$dataset} WHERE {$this->key} = {$this->data->{$this->key}}");
            $stmt->execute($data);

            if ($stmt->rowCount() >= 0) {
                return true;
            }

        }catch(\PDOException $e){
            throw new \PDOException($e->getMessage());
                        
        }
    }

    /**
     * @param object $data
     */
    public function setData(object $data){

        if (!empty($data)) {
            foreach($data as $key => $value){

                $this->{$key} = $value;
    
            }
        }

    }

}