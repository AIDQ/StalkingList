<?php
// Load user list
$users = json_decode(file_get_contents('data/list.json'), true);

$searchedUser = $_GET['username'];

$users[]['username'] = $searchedUser;

file_put_contents('data/list.json', json_encode($users, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES));

header('Location: update.php');
?>