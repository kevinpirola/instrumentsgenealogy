<?php
    if (!defined('API_HEADQUARTER')) { die('Direct access not permitted'); }

    require_once("Config.php");
    require_once("Auth.php");
    require_once("Console.php");
    use Console\Console;

    class RestService {
        public static function execute(PHPAuth\Auth $auth, $endpoint, $settings) {
            $headers = apache_request_headers();
            if (array_key_exists('Authorization', $headers)) {
                $hash = $headers['Authorization'];
                $hash = substr($hash, 6);
                $succ = $auth->logout($hash);
                if (!$succ) {
                    http_response_code(403);
                }
            } else {
                http_response_code(200);
            }
        }
        
        public static function needsAuthorization() {
            return false;
        }
    }
?>