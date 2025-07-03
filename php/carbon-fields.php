<?php
// start file and basic theme option
use Carbon_Fields\Container;
use Carbon_Fields\Field;


// some id
$id = 10;

add_action('carbon_fields_register_fields', 'crb_attach_theme_options');
function crb_attach_theme_options()
{
    // Default theme options
    Container::make('theme_options', __('Общая информация', 'crb'))
        ->add_fields(array(
            Field::make('text', 'theme_address', 'Адрес'),
            Field::make('text', 'theme_tel', 'Телефон'),
            Field::make('text', 'theme_email', 'E-mail'),
            Field::make('text', 'theme_vk', 'VK'),
            Field::make('text', 'theme_telegram', 'Telegram'),
            Field::make('text', 'theme_whatsapp', 'WhatsApp'),
            Field::make('text', 'theme_youtube', 'YouTube'),
            Field::make('text', 'theme_rutube', 'Rutube'),
        ));
}


$var = carbon_get_the_post_meta('field'); // get field value in the post 
$var2 = carbon_get_post_meta($id, 'field-2'); // get field value anywhere
$themevar = carbon_get_theme_option('theme_reviews');

// repeater example
Field::make('complex', 'hero_numbers', "Числа")
    ->add_fields(array(
        Field::make('text', 'numbers_title', 'Число'),
        Field::make('text', 'numbers_content', 'Подпись к числу'),
    ));
$items = carbon_get_the_post_meta('hero_numbers');
foreach ($items as $item) {
    echo $item['numbers_title'];
    echo $item['numbers_content'];
}

// select
Field::make('select', 'reviews_platform', 'Платформа')
    ->set_options(array(
        '/wp-content/uploads/2025/04/doctu.webp' => 'doctu',
        '/wp-content/uploads/2025/04/prodoctorov.webp' => 'ПроДокторов',
        '/wp-content/uploads/2025/04/ym.webp' => 'Яндекс Карты',
        '/wp-content/uploads/2025/04/zoon.webp' => 'Zoon',
    ));

// img example id - default
Field::make('image', 'services_banner-img', "Изображение баннера")
    // set value hardcode valuse into cells that can make problems with migration from domains for example
    ->set_value_type('url');
$img_url = wp_get_attachment_url($id);
$img_alt = get_post_meta($id, '_wp_attachment_image_alt', true);

// help example
Field::make()
    ->set_help_text('конент для 4 серых блока-карточек');

// where exact page example
Container::make('post_meta', 'Home page')
    ->where('post_id', '=', 58);

// where custom post type example
Container::make('post_meta', 'Контент посадки услуг')
    ->where('post_type', '=', 'services');



// img helper 
function getCFimg($selector, $type, $post_id)
{
    switch ($type) {
        case "the":
            $img_id = carbon_get_the_post_meta($selector);
            break;
        case "post":
            $img_id = carbon_get_post_meta($post_id, $selector);
            break;
        case "theme":
            echo 'theme';
            break;
        default:
            echo 'no case';
    }
    $img = [
        'url' => wp_get_attachment_url($img_id),
        'alt' => get_post_meta($img_id, '_wp_attachment_image_alt', true)
    ];
    return $img;
}
// example img helper
$img = getCFimg('services_img', 'the');
echo $img['url'];