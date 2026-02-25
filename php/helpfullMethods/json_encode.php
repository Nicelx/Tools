<?php
// преобразует массив в json
$data = [
    "success" => true,
    "id" => 123
];

print_r(json_encode($data)); // {"success":true,"id":123}