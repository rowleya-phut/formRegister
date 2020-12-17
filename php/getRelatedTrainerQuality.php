<?php
header("Access-Control-Allow-Origin: *");
 
$database = include('config.php');

$host=$database['host'];
$user=$database['user'];
$password=$database['password'];
$dbName =$database['dbName'];

//$EVAL = 1606914474;
$EVAL = $_POST['EVALID'];

$dbdata = [];

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbName", $user, $password);
    // execute the stored procedure
    //$sql = 'CALL GetTrainerImpactRelated(1606914474)';

    $statement = $pdo->prepare('CALL GetTrainerQualityRelated(?)');
    //execute with variable values
    $statement->execute([$EVAL]);

} catch (PDOException $e) {
    die("Error occurred:" . $e->getMessage());  
    echo "Failed";
}

while ($r = $statement -> fetch()){
    $dbdata[]=$r;    
}
//return data to getFormData.js
echo json_encode($dbdata);
$dbdata = [];
?>

