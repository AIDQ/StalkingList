<?php
/* 
 * INSTAGRAM JSON FILES
 * https://www.instagram.com/USERNAME/?__a=1 - user profile json
 * https://www.instagram.com/USERNAME/media -  user media json
 */
// Load user list
$users = json_decode(file_get_contents('data/list.json'), true);

// Array of urls to donwload
$curl_arr = array();
$curl_multi = curl_multi_init();

for ($i = 0; $i < count($users); $i++) {
	$url = 'https://www.instagram.com/'.$users[$i]['username'].'/?__a=1';
	$curl_arr[$i] = curl_init($url);
	curl_setopt($curl_arr[$i], CURLOPT_RETURNTRANSFER, true);
	curl_setopt($curl_arr[$i], CURLOPT_SSL_VERIFYPEER, false);
	curl_multi_add_handle($curl_multi, $curl_arr[$i]);
}

// Download all urls
do {
	curl_multi_exec($curl_multi, $running);
} while ($running > 0);

// Place responses in an array $responses
for ($i = 0; $i < count($curl_arr); $i++) {
	$responses[$i] = (curl_multi_getcontent($curl_arr[$i]));
}

// Function to decode user json
function get_user($page_html) {
	$json_array = json_decode($page_html, true);
	$user = $json_array['user'];
	return $user;
}

// Update in users array
for ($i = 0; $i < count($responses); $i++) {
	$ig_user = get_user($responses[$i]);
	$username = $users[$i]['username'];
	$users[$i] = array(); // clear old values
	
	$users[$i]['username'] = $username;
	$users[$i]['name'] = $ig_user['full_name'];
	$users[$i]['profile_pic_url'] = $ig_user['profile_pic_url'];
	$users[$i]['biography'] = preg_replace("/[\n\r]/", "", $ig_user['biography']);
	$users[$i]['is_private'] = $ig_user['is_private'];
	$users[$i]['media']['count'] = $ig_user['media']['count'];
	if (!$users[$i]['is_private']) {
		// Get last 3 posts
		for ($j = 0; $j < 3; $j++) {
			$users[$i]['media']['nodes'][$j]['thumbnail_src'] = preg_replace("/jpg.+/", "jpg", $ig_user['media']['nodes'][$j]['thumbnail_src']);
			$users[$i]['media']['nodes'][$j]['code'] = $ig_user['media']['nodes'][$j]['code'];
			$users[$i]['media']['nodes'][$j]['likes_count'] = $ig_user['media']['nodes'][$j]['likes']['count'];
			$users[$i]['media']['nodes'][$j]['comments_count'] = $ig_user['media']['nodes'][$j]['comments']['count'];
		}
	}
	else {
		$users[$i]['media']['nodes'] = null;
	}
}

// Save json file
file_put_contents('data/list.json', json_encode($users, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES));

header('Location: ./');
?>