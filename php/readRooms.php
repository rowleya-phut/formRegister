<?php
header("Access-Control-Allow-Origin: *");
//andrewrowley.co.uk connection info
$database = include('config.php');

$host=$database['host'];
$user=$database['user'];
$password=$database['password'];
$dbName =$database['dbName'];

try {
//create a PDO connection object
$pdo = new PDO("mysql:host=$host;dbname=$dbName", $user, $password);
$statement = $pdo->query('SELECT * FROM room_tbl');

} catch (PDOException $e) {
    die("Error occurred:" . $e->getMessage());  
    echo "Failed";
}

while ($r = $statement -> fetch()){
    $dbdata[]=$r;    
}
//return data to getFormData.js
echo json_encode($dbdata);

?>