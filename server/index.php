<?php define('ROOT_DIR', __DIR__);

if (isset($_SERVER['HTTP_ORIGIN'])) {
    header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
    header('Access-Control-Allow-Credentials: true');
    header('Access-Control-Max-Age: 86400');    // cache for 1 day
}

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {

    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))
        header("Access-Control-Allow-Methods: GET, POST, OPTIONS");

    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']))
        header("Access-Control-Allow-Headers: {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");

    exit(0);
}

require_once(ROOT_DIR . '/routes/Router.php');
require_once(ROOT_DIR . '/handlers/AuthHandler.php');
require_once(ROOT_DIR . '/handlers/DashboardHandler.php');

// Get the current URL
$request_uri = $_SERVER['REQUEST_URI'];

// Strip query parameters from the URL
$uri_parts = explode('?', $request_uri);
$path = $uri_parts[0];

$handler = null;

// Iterate through route groups to find a matching route
foreach ($routes as $group => $groupRoutes) {
    if (strpos($path, $group) === 0) {
        // The requested path starts with the group's base path
        $subPath = substr($path, strlen($group));
        if (array_key_exists($subPath, $groupRoutes)) {
            $handler = $groupRoutes[$subPath];
            break;
        }
    }
}

if ($handler) {
    // Call the corresponding function from the handlers file
    if (function_exists($handler)) {
        call_user_func($handler);
    } else {
        // Function not found, handle it accordingly (e.g., display a 404 page)
        echo '404 - Not Found';
    }
} else {
    // Route not found, handle it accordingly (e.g., display a 404 page)
    echo '404 - Not Found';
}
