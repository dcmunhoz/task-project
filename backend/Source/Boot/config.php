<?php

date_default_timezone_set('America/Sao_Paulo');

$dotenv = Dotenv\Dotenv::createImmutable(__DIR__ . './../../');
$dotenv->load();

// DATABASE
define("DB_HOST", getenv("DB_HOST"));
define("DB_NAME", getenv("DB_NAME"));
define("DB_PORT", getenv("DB_PORT"));
define("DB_USERNAME", getenv("DB_USERNAME"));
define("DB_PASSWORD", getenv("DB_PASSWORD"));

// TOKEN
define("TOKEN_SECRET_KEY", getenv("TOKEN_SECRET_KEY"));

