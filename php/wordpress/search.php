<?php
// simple search, then editing search.php
?>
<form role="search" method="get" action="<?php echo esc_url(home_url('/')); ?>"> 
    <input type="text" class="" name="s" placeholder="Поиск..."
        value="<?php echo get_search_query(); ?>">
    <button type="submit">Search</button>
    <input type="hidden" name="search_in_titles" value="1">
</form>
<?
