const axios = require('axios');
const cheerio = require('cheerio');

// Функция для получения ссылок с сайта
async function getAllLinks(url) {
    try {
        // Выполняем HTTP-запрос к сайту
        const response = await axios.get(url);
        const html = response.data;

        // Загружаем HTML в cheerio
        const $ = cheerio.load(html);

        // Собираем все теги <a> с атрибутом href
        const links = [];
        $('a[href]').each((i, element) => {
            const href = $(element).attr('href');
            if (href) {
                links.push(href);
            }
        });

        // Выводим все найденные ссылки
        console.log(`Найдено ${links.length} ссылок на сайте ${url}:`);
        links.forEach((link, index) => {
            console.log(`${index + 1}. ${link}`);
        });

        return links;
    } catch (error) {
        console.error('Ошибка при получении ссылок:', error.message);
        return [];
    }
}

// Пример использования
const targetUrl = 'https://salusmed.clinic'; // Замените на нужный URL
getAllLinks(targetUrl);