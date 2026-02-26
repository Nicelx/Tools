<?php
// Удобный логгер битрикса особенно, когда нужно логировать запросы
use Bitrix\Main\Diag\Debug;

// Примеры: 
Debug::writeToFile(
    $fields,
    "ADD ANNOUNCEMENT",
    "/local/logs/debug.log"
); // добавляет подпись 'ADD ANNOUNCEMENT' и логирует переменную $fields

Debug::writeToFile(
    "Просто текст",
    "", // можно без заголовка
    "/local/logs/debug.log"
);

Debug::writeToFile(
    [
        "USER_ID" => $USER->GetID(),
        "POST" => $_POST,
        "FILES" => $_FILES
    ],
    "ARRAY DATA", // можно без заголовка
    "/local/logs/debug.log"
);

Debug::writeToFile(
    [
        "USER_ID" => $USER->GetID(),
        "POST" => $_POST,
        "FILES" => $_FILES
    ],
    "ARRAY DATA", // можно без заголовка
    "/local/logs/debug.log"
);

Debug::writeToFile(
    $_POST,
    "",
    "/local/logs/debug.log"
);