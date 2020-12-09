<?php
header("Access-Control-Allow-Origin: *");
 
$database = include('config.php');

$host=$database['host'];
$user=$database['user'];
$password=$database['password'];
$dbName =$database['dbName'];
 
try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbName", $user, $password);
    // execute the stored procedure
    $sql = '
    SELECT evaluation_tbl.EvaluationId, eval_impact_trainer_tbl.ImpactId FROM evaluation_tbl
    INNER JOIN eval_impact_trainer_tbl
    ON eval_impact_trainer_tbl.EvaluationId = evaluation_tbl.EvaluationId
    ';
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

