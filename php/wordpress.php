<?php
// some id
$id = 10;

// #region wordpress general

// get_template_part passing data
$params = ['title' => 'Хотите с нами сотрудничать?'];
get_template_part('template-parts/part-name', null, $params);

$title = $args['title'];


// disable auto-generated pages 
add_action('template_redirect', 'disable_pages');
function disable_pages()
{
    if (is_author() || is_category()) {
        wp_redirect(home_url(), 301);
        exit;
    }
}

// receive custom post type posts
$args = array(
    'post_type' => 'cases', // post type
    'numberposts' => -1, // Получаем все записи
    'post_status' => 'publish' // Получаем только опубликованные записи
);

$cases_posts = get_posts($args);

foreach ($cases_posts as $case) {
    echo $case->ID;
}

// get img url with image id
wp_get_attachment_url($id);


// define global constant
define('TEMPLATE_ASSETS', home_url() . '/wp-content/themes/theme-name');


// add <br> into text  
nl2br($title);


// #endregion