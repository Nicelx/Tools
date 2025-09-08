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

// WP cheetsheet, helpfull functions
is_page( 42 ); // Код для страницы с ID=42
is_single( 15 ); // Проверяет, является ли запись (пост) записью с указанным ID.
get_queried_object_id(); // Возвращает ID текущего объекта (страницы, записи, термина таксономии)
is_singular( 'book' ); // Проверяет, является ли текущая страница записью указанного типа "book"
get_post_type( 123 ); // Возвращает тип записи с ID=123 (можно передавать вместо ид объект $post)
is_post_type_archive( 'product' ); // Проверяет, является ли текущая страница архивом указанного Custom Post Type.
is_front_page(); // Проверяет, является ли текущая страница главной.
is_home(); // Проверяет, является ли страница страницей блога (последних записей).
has_post_thumbnail( $post_id );// Проверяет, установлено ли у записи с указанным ID изображение (миниатюра).
in_array( get_post_type(), [ 'cpt1', 'cpt2' ] ); // Проверяет, принадлежит ли текущая запись к одному из указанных типов.
get_the_title( $post_id );
