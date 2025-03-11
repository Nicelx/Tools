const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const ExcelJS = require('exceljs');

// Функция для парсинга страницы
async function parsePage(url, selectors) {
    try {
        // Загружаем HTML страницы
        const { data } = await axios.get(url);

        const $ = cheerio.load(data);

        // Объект для хранения результатов
        const result = [url];

        selectors.forEach(selector => {
            const element = $(selector);

            if (element.is('img')) {
                const imageUrl = element.attr('src') || element.attr('data-src');
                result.push(imageUrl ? imageUrl.trim() : 'Изображение не найдено');
            } else {
                result.push(element.text().trim());
            }
        });

       
        console.log('parsePage result', result);
        return result;
    } catch (error) {
        console.error(`Ошибка при парсинге страницы ${url}:`, error);
        return null;
    }
}

const workbook = new ExcelJS.Workbook();
const worksheet = workbook.addWorksheet('Мой лист');


// workbook.xlsx.writeFile('parser/parsed-data.xlsx');


// Пример использования
const links = [
    'https://erabeauty.ru/team/strigina_olga_evgenevna/',
    'https://erabeauty.ru/team/popova_ekaterina_aleksandrovna/',
    'https://erabeauty.ru/team/ryaguzova_elena_nikolaevna/',
    'https://erabeauty.ru/team/zvyagina_olga_aleksandrovna/',
    'https://erabeauty.ru/team/nikolaeva_tatyana_igorevna/',
    'https://erabeauty.ru/team/belskih_svetlana_sergeevna/',
    'https://erabeauty.ru/team/gunkina_dana_faridovna/',
    'https://erabeauty.ru/team/kovaleva_tatyana_aleksandrovna/',
    'https://erabeauty.ru/team/lisicina_elena_vladimirovna/',
    'https://erabeauty.ru/team/bashkatova-svetalana-nikolaevna/',
    'https://erabeauty.ru/team/levon_olga_dmitrievna/'
    // Добавьте другие ссылки
];

const selectors = ['h1', '.elementor-element-8d1ffff p', '.elementor-element-5c50299 p', 'elementor-element-01d3e12 img'];
worksheet.addRow(['url', ...selectors]);


links.forEach(async url => {
    const parseResult = [];
    parseResult.push(await parsePage(url, selectors));
})
// parsePage(links, selectors);