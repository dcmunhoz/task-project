<?php

use Source\App\TaskController as TaskController;
use Source\App\UserController as UserController;
use Source\App\SituationController as SituationController;

$app->group("/api", function($group){
    $group->post("/task", TaskController::class . ":create");
    $group->get("/user-authenticated", UserController::class . ":authenticatedUser");
    $group->get("/users", UserController::class . ":list");
    $group->get("/task/list", TaskController::class . ":list");
    $group->get("/situations", SituationController::class . ":list");
    $group->get("/cards", TaskController::class . ":listBySituation");
});