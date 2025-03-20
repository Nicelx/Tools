<?php
// some id
$id = 10;

//#region carbon fields

$var = carbon_get_the_post_meta('field'); // get field value in the post 
$var2 = carbon_get_post_meta($id, 'field-2'); // get field value anywhere

// #end


// #region wordpress general

// get_template_part passing data
$params = ['title' => 'Хотите с нами сотрудничать?'];
get_template_part('template-parts/part-name', null, $params);

$title = $args['title'];

// #endregion