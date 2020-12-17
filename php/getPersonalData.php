<?php
header("Access-Control-Allow-Origin: *");
 
$database = include('config.php');

$host=$database['host'];
$user=$database['user'];
$password=$database['password'];
$dbName =$database['dbName'];

$dbdata = [];
// $dateFrom = 1606780800;
// $dateTo = 1608249600;
$dateFrom = $_POST['dateFrom'];
$dateTo =  $_POST['dateTo'] + 24*60*60;  //add 24hours to cover the whole of that day

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbName", $user, $password);

    // // execute the stored procedure
    // $sql = 'CALL GetPersonalData(1606780800, 1608249600)';
    // // call the stored procedure
    // $statement = $pdo->query($sql);
    // $statement->setFetchMode(PDO::FETCH_ASSOC);


    // execute the stored procedure
    $statement = $pdo->prepare('CALL GetPersonalData(?,?)');
    //execute with variable values
    $statement->setFetchMode(PDO::FETCH_ASSOC);
    $statement->execute([$dateFrom, $dateTo]);


} catch (PDOException $e) {
    die("Error occurred:" . $e->getMessage());
    echo "Failed";
}

while ($r = $statement -> fetch()){
    $dbdata[]=$r;
    
}
echo json_encode($dbdata);

?>

