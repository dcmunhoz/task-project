<?php

use Source\App\Auth as Auth;
use Source\App\Task as Task;

$app->group("/api", function($group) {
    $group->post("/login", Auth::class . ":login");
    $group->post("/task", Task::class . ":create");
});

