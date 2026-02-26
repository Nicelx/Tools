<?php
$rsEnum = CIBlockPropertyEnum::GetList(
    ["SORT" => "ASC", "VALUE" => "ASC"],
    ["IBLOCK_ID" => 7, "CODE" => 'TYPE'] // "CODE" - это код, не id
);

// good help function


function getEnumByPropertyCode($iblockId, $propertyCode) {
    $arEnums = [];
    $rsEnum = CIBlockPropertyEnum::GetList(
        ["SORT" => "ASC", "VALUE" => "ASC"],
        ["IBLOCK_ID" => $iblockId, "CODE" => $propertyCode]
    );

    while ($arEnum = $rsEnum->GetNext()) {
        $arEnums[] = [
            'ID' => $arEnum['ID'],
            'VALUE' => $arEnum['VALUE'],
            'XML_ID' => $arEnum['XML_ID'],
        ];
    }
    
    return $arEnums;
}