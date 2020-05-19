<?php
declare(stritc_types=1);

namespace Source\Core;

abstract class Model{

    /** @var object|null */
    protected $data;

    public function __construct(){

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

}