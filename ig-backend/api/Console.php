<?php
namespace Console;

class Console {
    
    /**
     * Logs to the javascript console
     * @param string $message
     */
    public static function log($message) {
        echo "<script>console.log('{$message}');</script>";
    }
}
?>