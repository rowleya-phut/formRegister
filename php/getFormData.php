<?php
header("Access-Control-Allow-Origin: *");
$database = include('config.php');

$host=$database['host'];
$user=$database['user'];
$password=$database['password'];
$dbName =$database['dbName'];

$registerTime = time();
// $registerTimeMinus = $registerTime - 86400; //day
$registerTimeMinus = $registerTime - 3600; //hour

$room = $_POST["room"];

//see https://phpdelusions.net/pdo for the only reasonable information on this though it's still poor
$dbdata = [];
try {
    //create a PDO connection object
    $pdo = new PDO("mysql:host=$host;dbname=$dbName", $user, $password);
    //prepare a pdo statement to call a stored statement which is stored on the db under 'routines' (see on PHPMyAdmin)
    $statement = $pdo->prepare('CALL GetRecentRoomData(?,?,?)');
    //execute with variable values
    $statement->execute([$room, $registerTimeMinus, $registerTime]);

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

