<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <title>
            Instruments' Genealogy
        </title>
<style type="text/css">
/*<![CDATA[*/
 body {
  text-align: center;
  color: #336699;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 48px;
  font-weight: bold;
}
 h2.c1 {
  color: #CC6600;
  font-size: 24px;
  font-weight: lighter;
}
 p.c2 {
  color: #CC6600;
  font-size: 13px;
  font-weight: lighter;
}
/*]]>*/
</style>
    </head>
    <body>
    <?php

        include("Config.php");
        include("Auth.php");

        $dbh = new PDO("mysql:host=89.46.111.51;dbname=Sql1140623_1", "Sql1140623", "p60660b6n3");

        $config = new PHPAuth\Config($dbh, 'SYS01_CONFIG');
        $auth   = new PHPAuth\Auth($dbh, $config);
        //$auth->login('gianmarco.laggia@gmail.com', 'manugia33@@', 0);

        /*if (!$auth->isLogged()) {
            header('HTTP/1.0 403 Forbidden');
            echo "Forbidden";
        
            exit();
        } else {
            echo('SEI LOGGATO');
        }*/
        
        

        ?>
        <script>
        var httpRequest = new XMLHttpRequest();
        httpRequest.open('POST', 'http://www.instrumentsgenealogy.com/api/api.php/auth/login');
        httpRequest.onreadystatechange = function (data) {
          // code
        }
        httpRequest.setRequestHeader('Content-Type', 'application/json');
        httpRequest.send(JSON.stringify({email: 'gianmarco.laggia@gmail.com', password: 'manugia33@@'}));
        </script>
API
</body>
</html>
