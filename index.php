<?php
/*
Plugin Name: anchorNav
Description: 幫頁面右側加上面版指示燈
Author: 振作國際 Wakeup International
Version: 1.0.0
*/

add_shortcode('anchorNav','anchorNav');

function anchorNav()
{
	$this_url=plugins_url(plugin_basename(__DIR__));
	ob_start();
	?>
	<link rel="stylesheet" href="<?php echo $this_url; ?>/plugin/anchorNav/anchorNav.css">
	<script src="<?php echo $this_url; ?>/plugin/jqueryui/1.10.3.min.js"></script>
	<script src="<?php echo $this_url; ?>/plugin/anchorNav/anchorNav.js"></script>
	<script src="<?php echo $this_url; ?>/js/index.js"></script>
	<?php
	return ob_get_clean();
}

?>
