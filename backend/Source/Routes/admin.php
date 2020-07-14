<?php

use Source\App\TaskController as TaskController;
use Source\App\UserController as UserController;
use Source\App\SituationController as SituationController;
use Source\App\TagController as TagController;
use Source\App\RoleController as RoleController;

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
    $group->put("/task/{idTask}/update", TaskController::class . ":update");
    $group->delete("/task/{idTask}/member/{idMember}/remove", UserController::class . ":removeMember");
    $group->post("/task/{idTask}/member/{idMember}/add", UserController::class . ":addMember");
    $group->delete("/task/{idTask}/tag/{idTag}/remove", TagController::class . ":removeTag");
    $group->post("/task/{idTask}/tag/{idTag}/add", TagController::class . ":addTag");
    $group->post("/message/new", TaskController::class . ":addNewMessage");
    $group->put("/message/update", TaskController::class . ":updateMessage");
    $group->delete("/message/{id_message}/delete", TaskController::class . ":deleteMessage");
    $group->get("/roles", RoleController::class . ":list");
    $group->post("/user/new", UserController::class . ":save");
    $group->post("/role/new", RoleController::class . ":save");
    $group->get("/role/{id_role}", RoleController::class . ":show");
});