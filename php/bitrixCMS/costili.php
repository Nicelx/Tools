<?php

// *** Fill sections name in $arResult
$sectionIds = array_column($arResult["ITEMS"], "IBLOCK_SECTION_ID");
$sectionIds = array_unique(array_filter($sectionIds));

$arResult["SECTIONS"] = [];

if (!empty($sectionIds)) {
    $res = CIBlockSection::GetList(
        [],
        ["ID" => $sectionIds],
        false,
        ["ID", "NAME", "SECTION_PAGE_URL"]
    );

    while ($section = $res->GetNext()) {
        $arResult["SECTIONS"][$section["ID"]] = $section;
    }
}


