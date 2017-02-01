<?php
// Load user list
$users = json_decode(file_get_contents('data/list.json'), true);

if (isset($_GET['index'])) {
	$index = $_GET['index'];

	// Chnage username
	if (isset($_GET['new'])) {
		$username_new = $_GET['new'];
		// Remove non valid characters
		$username_new = preg_replace('/[^A-Za-z0-9_.]/', '', $username_new);
		$username_new = strtolower($username_new);
		$username_new = substr($username_new, 0, 30);
		$users[$index]['username'] = $username_new;

	// Delete user
	} else {
		unset($users[$index]);
		$users = array_values($users);
	}

	// Save json file
	file_put_contents('data/list.json', json_encode($users, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES));
}

header('Location: update.php');
?>