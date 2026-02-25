<!-- CIBlockElement нужен для обработки инфоблоков -->
 <?php

// получить список  
 $resExists = CIBlockElement::GetList(
    Array(), // order 
    ['CREATED_BY' => $USER->GetID(),  
    'IBLOCK_ID' => 7], // filter
    false, 
    false, 
    [] //select
    );
 
    while($ar = $resExists->GetNext()) {
        print_r($ar); // вся инфа инфоблока с id = 7 у текущего пользователя 
    }
    // альтернатива GetNextElement() 
    while($ob = $resExists->GetNextElement()) {
        $ob->GetFields(); // только поля
        $ob->GetProperties(); // свойства
    }