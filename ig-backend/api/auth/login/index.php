<?php
if (!defined('API_HEADQUARTER')) { die('Direct access not permitted'); }
    class RestService {
        public static function execute($endpoint, $settings) {
            echo json_encode($settings);
        }
    }
?>