<?php

use Source\App\TaskController as TaskController;
use Source\App\UserController as UserController;
use Source\App\SituationController as SituationController;
use Source\App\TagController as TagController;

$app->group("/api", function($group){
    $group->post("/task", TaskController::class . ":create");
    $group->get("/user-authenticated", UserController::class . ":authenticatedUser");
    $group->get("/users", UserController::class . ":list");
    $group->get("/task/list", TaskController::class . ":list");
    $group->get("/situations", SituationController::class . ":list");
    $group->get("/cards", TaskController::class . ":listBySituation");
    $group->get("/task/{idTask}", TaskController::class . ":show");
    $group->get("/available-members", UserController::class . ":listMembers");
    $group->get("/available-tags", TagController::class . ":list");
    $group->get('/user/{idUser}', UserController::class . ":show");
    $group->get("/tag/{idTag}", TagController::class . ":show");
});