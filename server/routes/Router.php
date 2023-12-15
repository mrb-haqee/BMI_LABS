<?php
// Define your routes as a nested associative array for route grouping
$routes = [
    '/api/v1/auth' => [
        '/signup' => 'handleSignUp',
        '/signin' => 'handleSignIn',
    ],
    '/api/v1/dashboard' => [
        '/get' => 'handleListDataPredict',
        '/post' => 'handlePostDataPredict',
        '/users' => 'users',
    ],
];
