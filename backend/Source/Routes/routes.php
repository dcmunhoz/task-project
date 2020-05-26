<?php

use Source\App\Auth as Auth;
use Source\App\TaskController as TaskController;

$app->group("/api", function($group) {
    $group->post("/login", Auth::class . ":login");
    $group->post("/task", TaskController::class . ":create");
});

