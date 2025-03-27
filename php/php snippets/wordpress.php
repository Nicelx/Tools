<?php
// some id
$id = 10;

//#region carbon fields

$var = carbon_get_the_post_meta('field'); // get field value in the post 
$var2 = carbon_get_post_meta($id, 'field-2'); // get field value anywhere

// #endregion


// #region wordpress general

// get_template_part passing data
$params = ['title' => 'Хотите с нами сотрудничать?'];
get_template_part('template-parts/part-name', null, $params);

$title = $args['title'];


// disable auto-generated pages 
add_action('template_redirect', 'disable_pages');
function disable_pages() {
    if (is_author() || is_category()) {
        wp_redirect(home_url(), 301);
        exit;
    }
}


// #endregion