<?php

use Source\App\Auth as Auth;
use Source\App\TaskController as TaskController;
use Source\App\UserController as UserController;

$app->get("/", function(){
    require __DIR__ . '/../../build/index.html';
    die;
});

$app->group("/api", function($group) {
    $group->post("/login", Auth::class . ":login");
});

