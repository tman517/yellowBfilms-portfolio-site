<?php 

// xml data
$DATA = simplexml_load_file("data.xml");


// determine environment to set root path
$domain = $_SERVER['SERVER_NAME'];

$ROOT_URL = "";
$ENVIRONMENT = "";


switch($domain){

	case "www.yellowbfilms.com";
		$ENVIRONMENT = "live";
		$ROOT_URL = "http://yellowbfilms.com/";
		break;

	case "yellowbfilms.com";
		$ENVIRONMENT = "live";
		$ROOT_URL = "http://yellowbfilms.com/";
		break;

	default:
		$ENVIRONMENT = "local";
		$ROOT_URL = "localhost/";

}
?>