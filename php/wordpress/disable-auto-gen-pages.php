<?php
// disable auto-generated pages 
add_action('template_redirect', 'disable_pages');
function disable_pages()
{
    if (is_author() || is_category()) {
        wp_redirect(home_url(), 301);
        exit;
    }
}