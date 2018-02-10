<?php
    if (!defined('API_HEADQUARTER')) { die('Direct access not permitted'); }

    require_once("Config.php");
    require_once("Auth.php");
    require_once("Console.php");
    use Console\Console;

    class RestService {
        public static function execute(PHPAuth\Auth $auth, $endpoint, $settings) {
            $post = json_decode($settings['post'], true);
            $res = $auth->login($post['username'], $post['password'], 1);
            header('Content-Type: application/json; charset=utf-8');
            if ($res['error']) {
                http_response_code(401);
            } else {
                http_response_code(200);
            }
            echo json_encode($res);
        }
        
        public static function needsAuthorization() {
            return false;
        }
    }
?>