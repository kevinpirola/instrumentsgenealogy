<?php
    if (!defined('API_HEADQUARTER')) { die('Direct access not permitted'); }

    require_once("Config.php");
    require_once("Auth.php");
    require_once("Console.php");
    use Console\Console;

    class RestService {
        public static function execute(PHPAuth\Auth $auth, $endpoint, $settings) {
            extract($settings);
            $pos = strrpos($request, '/');
            $hash = $pos ? substr($request, $pos + 1) : '';
            $auth->logout($hash);
        }
        
        public static function needsAuthorization() {
            return false;
        }
    }
?>