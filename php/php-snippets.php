<?php

// transform 2025-10-21 17:30:15 into 21 октября 2025
function parseDate($dateStr)
    {
        $date = DateTime::createFromFormat('Y-m-d H:i:s', $dateStr);

        if ($date === false) {
            return "Неверный формат даты";
        }

        $month_map = [
            1 => 'января',
            2 => 'февраля',
            3 => 'марта',
            4 => 'апреля',
            5 => 'мая',
            6 => 'июня',
            7 => 'июля',
            8 => 'августа',
            9 => 'сентября',
            10 => 'октября',
            11 => 'ноября',
            12 => 'декабря',
        ];

        $day = $date->format('j');
        $month = $month_map[(int) $date->format('m')];
        $year = $date->format('Y');

        return "$day $month $year";

        // usage
        parseDate("2025-10-21 17:30:15");
    }