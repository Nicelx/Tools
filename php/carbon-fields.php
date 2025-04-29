<?php
// some id
$id = 10;

//#region carbon fields

$var = carbon_get_the_post_meta('field'); // get field value in the post 
$var2 = carbon_get_post_meta($id, 'field-2'); // get field value anywhere
$themevar = carbon_get_theme_option('theme_reviews');

// repeater example
Field::make('complex', 'hero_numbers', "Числа")
    ->add_fields(array(
        Field::make('text', 'numbers_title', 'Число'),
        Field::make('text', 'numbers_content', 'Подпись к числу'),
    ));

// #endregion