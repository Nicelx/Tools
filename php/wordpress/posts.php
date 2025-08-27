<?php

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