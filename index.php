<?php $users = json_decode(file_get_contents('data/list.json'), true); ?>

<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta name="theme-color" content="#fff">
	<meta property="og:title" content="InstagramStalk">
	<meta property="og:description" content="InstagramStalk">
	<meta property="og:type" content="website">
	<meta property="og:url" content="http://www.instagramstalk.tk">
	<meta property="og:image" content="http://www.instagramstalk.tk/images/og-image.jpg">
	<title>InstagramStalk Beta</title>
	<link rel="icon" type="image/png" href="images/favicon.png">
	<link type="text/css" rel="stylesheet" href="styles/main.css">
	<link type="text/css" rel="stylesheet" href="styles/mobile.css">
	<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.4/jquery.min.js"></script>
	<script type="text/javascript" src="js/options.js"></script>
	<script type="text/javascript" src="js/preview-recent.js"></script>
	<script type="text/javascript" src="js/new-posts.js"></script>
	<script type="text/javascript" src="js/search.js"></script>
	<script type="text/javascript"><?php 
		foreach ($users as $user) {
			$posts_count[] = $user['media']['count'];
		}
		echo 'var current_posts_count = '.json_encode($posts_count).';';
	?></script>
</head>

<body>
<main>
	<header>
		<div class="container">
			<a href="./">
				<img class="logo" src="images/logo.svg" width="173px" height="40px">
			</a>
			<a href="update.php">
				<img class="update" src="images/update.svg" width="30px" height="30px">
			</a>
			<input class="search" type="text" placeholder="Search">
		</div>
	</header>
	<div class="thumbs container">
	
	<?php
	$ig_base = 'https://www.instagram.com';
	
	foreach ($users as $user) {
		$username = $user['username'];
		echo
		'<div class="thumb" data-user="'.$username.'">
			<div class="profile-pic">
				<a target="_blank" href="'.$ig_base.'/_u/'.$username.'/">
					<img class="profile-pic-img" src="'.$user['profile_pic_url'].'" alt="'.$username.'">
				</a>
				<a target="_blank" href="'.str_replace('/s150x150', '', $user['profile_pic_url']).'">
					<img class="zoom-in-img" src="images/zoom-in.svg" width="20px" height="20px">
				</a>
			</div>
			<div class="opt">
				<ul>
					<li><a href="#edit">Edit</a></li>
					<li><a href="#remove">Remove</a></li>
				</ul>
			</div>
			<p class="username">
				<a href="'.$ig_base.'/_u/'.$username.'/" target="_blank">@'.$username.'</a>
			</p>
			<p class="posts-count">'.$user['media']['count'].' posts</p>
			<p class="name">'.$user['name'].'</p>
			<p class="bio">'.$user['biography'].'</p>
			<div class="media-json" data-media="'.htmlspecialchars(json_encode($user['media'], JSON_UNESCAPED_SLASHES)).'" hidden></div>'.
			(!$user['is_private'] ? '<div class="show-posts"></div>' : '').
		'</div>';
	}
	?>
	</div>
</main>
</body>

</html>