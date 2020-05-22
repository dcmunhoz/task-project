<?php

use Source\App\Auth as Auth;

$app->post("/login", Auth::class . ":login");


