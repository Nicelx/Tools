const fs = require('fs');
const ExcelJS = require('exceljs');
const { create } = require('xmlbuilder2');

async function convertExcelToXml() {
    // Конфигурация
    const INPUT_FILE = 'feedBuilder/data.xlsx';
    const OUTPUT_FILE = 'feedBuilder/offers.xml';
    const SHEET_NAME = 'offers';

    // Загрузка Excel файла
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(INPUT_FILE);
    const worksheet = workbook.getWorksheet(SHEET_NAME);

    // Создание XML структуры
    const root = create({ version: '1.0', encoding: 'UTF-8' }).ele('yml_catalog', { date: "2025-03-11 07:48:17" });

    // Получение заголовков из первой строки
    const headerRow = worksheet.getRow(1);
    const headers = headerRow.values.slice(1).map(h => h.trim());

    // Обработка строк данных
    worksheet.eachRow((row, rowNumber) => {
        if (rowNumber === 1) return; // Пропускаем заголовки

        const offer = root.ele('offer');

        row.eachCell((cell, colNumber) => {
            const header = headers[colNumber - 1];
            const value = cell.text.trim();

            // Пропускаем пустые и ненужные колонки
            if (!value || [
                'price',
                'old price',
                'specialty(значения должны совпадать с sets',
                'Начало карьеры',
                'Образование'
            ].includes(header)) return;

            // Преобразование названий колонок в теги
            const tagName = header === 'годы опыта'
                ? 'experience'
                : header.toLowerCase();

            offer.ele(tagName).txt(value);
        });
    });

    // Сохранение XML
    const xml = root.end({ prettyPrint: true });
    fs.writeFileSync(OUTPUT_FILE, xml, 'utf-8');
    console.log(`XML успешно создан: ${OUTPUT_FILE}`);
}

convertExcelToXml().catch(err => console.error('Ошибка:', err));