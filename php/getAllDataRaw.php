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

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbName", $user, $password);
    // execute the stored procedure
    $sql = 'CALL GetAllData()';
    // $sql = 'CALL GetRoomData("E371")';
    // $sql = 'CALL GetRecentRoomData("E371")';
    // call the stored procedure
    $q = $pdo->query($sql);
    $q->setFetchMode(PDO::FETCH_ASSOC);


} catch (PDOException $e) {
    die("Error occurred:" . $e->getMessage());
    echo "Failed";
}

while ($r = $q -> fetch()){
    $dbdata[]=$r;
    
}
echo json_encode($dbdata);

?>

