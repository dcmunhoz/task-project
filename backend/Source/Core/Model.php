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
    public function __construct(string $entity, string $key, array $protected = ["created_at", "updated_at"])
    {

        $this->entity = $entity;
        $this->key = $key;
        $this->protected = $protected;
        $this->protected[] = $key;

    }

    /**
     * @param $key string
     * @param $value  
     */
    public function __set($name, $value): void
    {

        if (empty($this->data)){
            $this->data = new \stdClass();
        }

        $this->data->$name = $value;

    }

    /** @param $name string */
    public function __get(string $name): ?string
    {

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
    public function find(?string $terms = null, ?string $params = null, string $columns = "*"): Model 
    {

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
     * Set user data founded in database
     * 
     * @param int $id
     */
    public function findById(int $id): void
    {

        $result = $this->find("{$this->key} = $id ")->fetch();

        if ($result){
            $this->setData($result);
        }

    }

    /**
     * Execute database query
     * 
     * @param bool $all
     */
    public function fetch(bool $all = false): ?object 
    {

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

    /** Insert on database */
    public function create(): string
    {

        try{
            $keys = \array_keys((Array)$this->data);

            $values = ":" . \implode(", :", $keys);

            $keys = \implode(", ", $keys);

            foreach ((Array)$this->data as $key => $value) {
                $dataset[":" . $key] = $value;
            }

            $stmt = Connect::getInstance()->prepare("INSERT INTO {$this->entity} ({$keys}) VALUES({$values})");
            $stmt->execute($dataset);

            return Connect::getInstance()->lastInsertId();

        }catch(\PDOException $e){

            throw new \PDOException($e->getMessage());
            

        }
    }

    /** Update a record in database */
    public function update(string $filter = ""): bool
    {
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

        }catch(\Exception $e){
            throw new \Exception($e->getMessage());
                        
        }
    }

    /** 
     * Save the object in database based on id, 
     * if is set then update a record else create them
     */
    public function save(): void
    {

        /** CREATE */
        if (empty($this->data->{$this->key})) {

            $result = $this->create();
            $this->findById((Int) $result);

        } else { /** UPDATE */

            $this->update();
            $this->findById((Int) $this->data->{$this->key});

        }

    }

    /** Delete database record */
    public function destroy(): bool
    {
        
        $data = (Array) $this->data;

        if (isset($data[$this->key]) && !empty($data[$this->key])) {

            $stmt = Connect::getInstance()->prepare("DELETE FROM {$this->entity} WHERE {$this->key} = :{$this->key}");
            $stmt->execute([":{$this->key}" => $data[$this->key]]);
            
            if ($stmt->rowCount() >= 0) {

                return true;

            }
        }

    }
    
    /**
     * Set object data
     * 
     * @param object $data
     */
    public function setData(object $data): void
    {

        if (!empty($data)) {
            foreach($data as $key => $value){

                $this->{$key} = $value;
    
            }
        }

    }

}