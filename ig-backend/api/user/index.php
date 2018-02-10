<?php
    if (!defined('API_HEADQUARTER')) { die('Direct access not permitted'); }

    require_once("Config.php");
    require_once("Auth.php");
    require_once("Console.php");
    use Console\Console;

    class RestService {
        public static function execute(PHPAuth\Auth $auth, $endpoint, $settings) {
            header('Content-Type: application/json; charset=utf-8');
            http_response_code(200);
            $headers = apache_request_headers();
            if (array_key_exists('Authorization', $headers)) {
                $hash = $headers['Authorization'];
                $hash = substr($hash, 6);
                if($auth->checkSession($hash)){
                    $suid = $auth->getSessionUID($hash);
                    $user = $auth->getUser($suid);
                    echo json_encode($user);
                } else {
                    echo '{}';
                }
            } else {
                echo '{}';
            }
        }
        
        public static function needsAuthorization() {
            return false;
        }
    }
?>