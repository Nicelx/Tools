<?php
// some id
$id = 10;

//#region wordpress general

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

// create simple taxonomy 
function register_headings_taxonomy()
{
    $args = [
        'label' => 'Рубрики',
        'description' => 'Рекомендованные рубрики',
        'public' => false, // Скрыть от публичного доступа
        'publicly_queryable' => false, // Не доступна через URL
        'hierarchical' => false, // Как теги (не иерархическая)
        'show_ui' => true, // Показывать интерфейс
        'show_in_menu' => true, // Показывать в меню админки
        'show_in_nav_menus' => false, // Не показывать в меню навигации
        'show_in_rest' => true, // Доступ через REST API
        'show_tagcloud' => false, // Скрыть из облака тегов
        'show_in_quick_edit' => true, // Показывать в быстром редактировании
        'show_admin_column' => true, // Колонка в списке постов
        'query_var' => false, // Отключить параметры запроса
        'rewrite' => false, // Полностью отключить ЧПУ
    ];

    register_taxonomy('headings', 'blog', $args);
}
add_action('init', 'register_headings_taxonomy');

// get all taxonomy of headings
$terms = get_terms(array(
    'taxonomy' => 'headings', // taxonomy name
    // 'hide_empty' => false, 
    'orderby' => 'name', // Сортировать по имени
    'order' => 'ASC', // По возрастанию
));

// #endregion


// #region post counter


function setPostViews($postID)
{
    $count_key = 'post_views_count';
    $count = get_post_meta($postID, $count_key, true);
    if ($count == '') {
        $count = 0;
        delete_post_meta($postID, $count_key);
        add_post_meta($postID, $count_key, '0');
    } else {
        $count++;
        update_post_meta($postID, $count_key, $count);
    }
}

function getPostViews($postID)
{
    $count_key = 'post_views_count';
    $count = get_post_meta($postID, $count_key, true);
    if ($count == '') {
        delete_post_meta($postID, $count_key);
        add_post_meta($postID, $count_key, '0');
        return "0";
    }
    return $count;
}


echo getPostViews($post->ID);
setPostViews($post->ID);
// #endregion