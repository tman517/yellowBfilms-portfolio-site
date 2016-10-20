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
		<link rel="shortcut icon" type="image/gif" href="images/favicon.ico" />

		<!-- FONTS -->
		<!-- font-family: 'Rubik', sans-serif; -->
		<link href="https://fonts.googleapis.com/css?family=Rubik:300,500,900,900i" rel="stylesheet">


		<!-- styles -->
		<link rel="stylesheet" type="text/css" href="scripts/libs/css/jquery.fancybox.css">
		<link rel="stylesheet" type="text/css" href="scripts/libs/css/slick.css">
		<link rel="stylesheet" type="text/css" href="scripts/libs/css/slick-theme.css">
		<link rel="stylesheet" type="text/css" href="styles/font-awesome.min.css">
		<link rel="stylesheet" type="text/css" href="styles/app.css">


	</head>	


	<body>

		<h1 class="seo_title"><?= $DATA->head->title ?></h1>

		<!-- DESKTOP WRAPPER -->
		<div id="desktop_wrapper">
			<div class="bg"></div>
			<div class="home_wrapper">
				<a class="contactBtn" href="mailto:info@yellowbfilms.com">CONTACT&nbsp;&nbsp;<span class="fa fa-envelope"></span>
					<div class="email">info@yellowbfilms.com</div>
					<div class="phone"></div>
				</a>
				<div class="copyright">&copy; Copyright 2016 YellowBFilms. All rights reserved.&nbsp;&nbsp;&nbsp;</div>
				<div class="logo_wrapper">
					<div class="logoLeft"></div>
					<div class="logoCenter"></div>
					<div class="logoRight"></div>
				</div>
				<div class="content_wrapper">
					<div class="category_wrapper cars">
						<div class="thumb">
							<img src="images/home/cars/cars1.jpg" class="show" border="0" />
							<img src="images/home/cars/cars2.jpg" border="0" />
							<img src="images/home/cars/cars3.jpg" border="0" />
							<img src="images/home/cars/cars4.jpg" border="0" />
							<img src="images/home/cars/cars5.jpg" border="0" />
							<img src="images/home/cars/cars6.jpg" border="0" />
							<div class="label">CARS</div>
						</div>
					</div>
					<div class="category_wrapper commercial">
						<div class="thumb">
							<img src="images/home/commercial/commercial1.jpg" class="show" border="0" />
							<img src="images/home/commercial/commercial2.jpg" border="0" />
							<div class="label">COMMERCIAL</div>
						</div>
					</div>
					<div class="category_wrapper fashion">
						<div class="thumb">
							<img src="images/home/fashion/fashion1.jpg" class="show" border="0" />
							<img src="images/home/fashion/fashion2.jpg" border="0" />
							<img src="images/home/fashion/fashion3.jpg" border="0" />
							<div class="label">FASHION</div>
						</div>
					</div>
					<div class="category_wrapper reality">
						<div class="thumb">
							<img src="images/home/reality/reality1.jpg" class="show" border="0" />
							<img src="images/home/reality/reality2.jpg" border="0" />
							<img src="images/home/reality/reality3.jpg" border="0" />
							<img src="images/home/reality/reality4.jpg" border="0" />
							<img src="images/home/reality/reality5.jpg" border="0" />
							<div class="label">REALITY</div>
						</div>
					</div>
				</div>
			</div>

			<div class="overlay"></div>

			<div class="videoGallery_wrapper">
				<div class="closeBtn">X</div>
				<div class="video_container">
					<iframe id="vimeoIframe" src="" width="100%" height="100%" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
				</div>
				<div class="thumb_container">
					<div class="thumbs">
					</div>
				</div>
			</div>

		</div>

		<!-- MOBILE WRAPPER -->
		<div id="mobile_wrapper">
			<div class="reveal"></div>
			<div class="home_wrapper">
				<div class="logo"><img src="images/mobile/logo.png" border="0" alt="YellowBFilms" /></div>
				<div class="content_wrapper">
					<div class="category_wrapper cars">
						<div class="thumb">
							<div class="label">CARS</div>
						</div>
					</div>
					<div class="category_wrapper commercial">
						<div class="thumb">
							<div class="label">COMMERCIAL</div>
						</div>
					</div>
					<div class="category_wrapper fashion">
						<div class="thumb">
							<div class="label">FASHION</div>
						</div>
					</div>
					<div class="category_wrapper reality">
						<div class="thumb">
							<div class="label">REALITY</div>
						</div>
					</div>
				</div>
				<div class="footer">
					<div>bongfilms@yahoo.com</div>
					<div>(626) 555-5555</div>
					<div>&copy; Copyright 2016 YellowBFilms. All rights reserved.</div>
				</div>
				<div class="darkenOverlay"></div>
				<div class="videoThumb_wrapper">
					<div class="closeBtn">X</div>
					<div class="videos">
						<iframe src="//player.vimeo.com/video/42704707" width="100%" height="100%" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
						<iframe src="//player.vimeo.com/video/42704707" width="100%" height="100%" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
						<iframe src="//player.vimeo.com/video/42704707" width="100%" height="100%" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
						<iframe src="//player.vimeo.com/video/42704707" width="100%" height="100%" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
						<iframe src="//player.vimeo.com/video/42704707" width="100%" height="100%" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
					</div>
				</div>
			</div>
		</div>


		<!-- PRELOADER WRAPPER -->
		<div id="preloader_wrapper">
			<div class="bg"></div>
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
