<?php

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