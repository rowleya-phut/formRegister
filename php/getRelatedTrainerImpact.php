<?php
header("Access-Control-Allow-Origin: *");
 
$database = include('config.php');

$host=$database['host'];
$user=$database['user'];
$password=$database['password'];
$dbName =$database['dbName'];

$EVALID = $_POST["EVALID"];
 
try {
    //create a PDO connection object
    $pdo = new PDO("mysql:host=$host;dbname=$dbName", $user, $password);
    //prepare a pdo statement to call a stored statement which is stored on the db under 'routines' (see on PHPMyAdmin)
    $statement = $pdo->prepare('CALL GetTrainerImpactRelated(?)');
    //execute with variable values
    $statement->execute([$room, $registerTimeMinus, $registerTime]);

} catch (PDOException $e) {
    die("Error occurred:" . $e->getMessage());
    echo "Failed";
}

while ($r = $q -> fetch()){
    $dbdata[]=$r;
    
}
echo json_encode($dbdata);

?>

