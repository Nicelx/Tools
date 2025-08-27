<?php
// some id
$id = 10;

// get_template_part passing data
$params = ['title' => 'Хотите с нами сотрудничать?'];
get_template_part('template-parts/part-name', null, $params);

$title = $args['title'];

// get img url with image id
wp_get_attachment_url($id);


// define global constant
define('TEMPLATE_ASSETS', home_url() . '/wp-content/themes/theme-name');

// add <br> into text  
nl2br($title);