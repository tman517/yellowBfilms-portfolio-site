<?php
require_once 'includes/config.php';
?>



<!DOCTYPE html>
<html lang="en" xml:lang="en" xmlns="http://www.w3.org/1999/xhtml">
	<head>
		<title><?= $DATA->head->title ?></title>

		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
		<meta name="description" content="<?= $DATA->head->meta->description ?>" />
		<meta name="keywords" content="<?= $DATA->head->meta->keywords ?>" />
		 
		<meta property="og:title" content="<?= $DATA->head->meta->og->title ?>" />
		<meta property="og:url" content="<?= $ROOT_URL ?>" />
		<meta property="og:description" content="<?= $DATA->head->meta->og->description ?>" />
		<meta property="og:image" content="<?= $ROOT_URL ?>images/share/shareImage.jpg" />

		<meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no">
	
		<link rel="canonical" href="<?= $ROOT_URL ?>" />	
		<link rel="shortcut icon" type="image/gif" href="images/sonypictures_favicon.ico" />

		<!-- FONTS -->
		<!-- font-family: 'Rubik', sans-serif; -->
		<link href="https://fonts.googleapis.com/css?family=Rubik:300,500,900,900i" rel="stylesheet">


		<!-- styles -->
		<link rel="stylesheet" type="text/css" href="scripts/libs/css/jquery.fancybox.css">
		<link rel="stylesheet" type="text/css" href="styles/font-awesome.min.css">
		<link rel="stylesheet" type="text/css" href="styles/app.css">


	</head>	


	<body>

		<h1 class="seo_title"><?= $DATA->head->title ?></h1>

		<!-- DESKTOP WRAPPER -->
		<div id="desktop_wrapper">
			<div class="bg"></div>
			<div class="home_wrapper">
				<div class="logo_wrapper">
					<div class="logoLeft"></div>
					<div class="logoCenter"></div>
					<div class="logoRight"></div>
				</div>
			</div>

		</div>

		<!-- MOBILE WRAPPER -->
		<div id="mobile_wrapper">


		</div>


		<!-- PRELOADER WRAPPER -->
		<div id="preloader_wrapper">
			<div class="loaderBar"></div>
			<div class="percentage">0%</div>
		</div>


		<!-- scripts -->
		<script type="text/javascript" src="scripts/libs/libs-bundle-min.js"></script>
		<script type="text/javascript" src="scripts/classes/all-bundle-min.js"></script>


		<!-- start site -->
		<script type="text/javascript">

			// config vars
			var __rootURL = "<?= $ROOT_URL ?>";

			// Youtube API video ID's
			var __trailerId = "<?= $DATA->video->trailerID ?>";


			// doc ready
			$(document).ready(function(){
				var site = new Site();
			});

		</script>


	</body>
</html>
