<?php
// получаем список разделов(папок) инфоблока
$res = CIBlockSection::GetList(
    [], // сортировка
    ['IBLOCK_ID' => 7], // фильтр
    false, // bIncCnt по умолчанию false (считает элементы в разделе)
    []);
    
// получаем данные в цикле как и в CIBlockElement
while($arSection = $res->GetNext()) {
    print_r($arSection);
}
