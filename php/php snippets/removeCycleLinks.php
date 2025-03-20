<?php


// filter remove
function get_filtered_link($url, $class, $content)
{
    ?>
    <a <? if ($class) { ?> class="<? echo $class ?>" <?
    }
    if ($url !== get_permalink()) {
        ?> href="<? echo esc_url($url) ?>" <?
    }

    ?>>
        <? echo $content ?>
    </a>
<?
}