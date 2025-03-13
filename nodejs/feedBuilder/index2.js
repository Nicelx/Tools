const fs = require('fs');
const ExcelJS = require('exceljs');
const { create } = require('xmlbuilder2');

const OUTPUT_FILE = 'feedBuilder/offers.xml';
const INPUT_FILE = 'feedBuilder/data.xlsx';
const SHEET_NAME = 'shop';

async function convert() {
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(INPUT_FILE);
    const shopSheet = workbook.getWorksheet(SHEET_NAME);

   
    const name = shopSheet.getCell('B1').value;
    const company = shopSheet.getCell('B2').value;;
    const url = shopSheet.getCell('B3').value;
    const email = shopSheet.getCell('B4').value;
    const picture = shopSheet.getCell('B5').value;
    const description = shopSheet.getCell('B6').value;

    const sets = {
        set: [
            { '@id': 'cosmetolog', name: 'cosmetolog', url: 'https://erabeauty.ru/team/' },
        ]
    }
    const offers = {
        offer: [
            {
                '@id': 'vrach001', '@group_id': '90000', name: 'some name', url: 'ome url', price: {
                    '#text': 3000,
                    '@from': 'true'
                },
                currencyId: "RUR",
                sales_notes: "Первичный прием",
                'set-ids': 'cometolog',
                picture: "https://erabeauty.ru/wp-content/uploads/2021/03/logo.png",
                description: 'Владеет основными методами ультразвуковой диагностики, в том числе УЗИ брюшной полости, забрюшинного пространства, УЗИ предстательной железы, УЗИ щитовидной железы, УЗИ молочных желез и т.д. Специализируется на ультразвуковой диагностики в акушерстве и гинекологии. Обладает технологиями всех видов диагностики по патологии в акушерстве, гинекологии. Подробная информация о враче", //информативное описание врача. Его узкая специализация. SEO-текст из числа отзывов, специальностей и тп не принимается.',
                categoryId: '1',
                param: [
                    { '@name': 'Фамилия', '#text': 'Orlov' },
                    { '@name': 'Имя', '#text': 'Orlov' },
                    { '@name': 'Отчество', '#text': 'Orlov' },
                    { '@name': 'Начало карьеры', '#text': '2005-01-01' },
                    { '@name': 'Город', '#text': 'г. Воронеж' },
                    { '@name': 'Взрослый врач', '#text': 'true' },
                    { '@name': 'Детский врач', '#text': 'false' },
                    { '@name': 'Город клиники', '#text': 'г. Воронеж' },
                    { '@name': 'Название клиники', '#text': 'Эра' },
                    { '@name': 'Возможность записи', '#text': 'true' },
                    { '@name': 'Телефон для записи', '#text': 'some phone number +7 (900) 599 59 59' },
                    { '@name': 'Идентификатор организации', '#text': '1069572467' },
                ]
            }
        ]
    }

    const root = create({ version: '1.0', encoding: 'UTF-8' })
        .ele('yml_catalog', { date: "2025-03-11 07:48:17" })
        .ele('shop')
        .ele('name').txt(name).up()
        .ele('company').txt(company).up()
        .ele('url').txt(url).up()
        .ele('email').txt(email).up()
        .ele('picture').txt(picture).up()
        .ele('description').txt(description).up()
        .ele('currencies')
        .ele('currency', { id: "RUR", rate: "1" }).up().up()
        .ele('categories')
        .ele('category', { id: "1" }).txt('Врач').up().up()
        .ele('sets')
        .ele(sets).up().up()
        .ele('offers')
        .ele(offers).up().up()
        .up()
        .up();


    // Генерация XML-строки
    const xml = root.end({ prettyPrint: true });
    fs.writeFileSync(OUTPUT_FILE, xml, 'utf-8');
}

convert();




