<?php

use Source\App\TaskController as TaskController;
use Source\App\UserController as UserController;

$app->group("/api", function($group){
    $group->post("/task", TaskController::class . ":create");
    $group->get("/user-authenticated", UserController::class . ":authenticatedUser");
    $group->get("/users", UserController::class . ":list");
    $group->get("/task/list", TaskController::class . ":list");
});