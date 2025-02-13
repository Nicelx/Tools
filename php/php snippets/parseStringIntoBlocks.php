<? $blocks = explode('||', 'block1::block12||block21::block22');
foreach ($blocks as $block) {
    $items = explode('::', $block);

    ?>
    <div>
        <span><? echo $items[0] ?></span>
        <span> <? echo $items[1] ?> </span>
    </div>
<?
}
?>

<!-- will output 
    <div>
        <span>block1</span>
        <span>block12</span>
    </div>
    <div>
        <span>block21</span>
        <span>block22</span>
    </div>
-->