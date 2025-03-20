// v0.01 testing

const fs = require('fs');
const ExcelJS = require('exceljs');
const { create } = require('xmlbuilder2');

const OUTPUT_FILE = 'feedBuilder/offers.xml';
const INPUT_FILE = 'feedBuilder/data.xlsx';
const SHEET_NAME = 'shop';
const OFFERS_SHEET_NAME = 'offers';

function getName(fullName) {
    const splitted = fullName.split(" ");
    return splitted;
}

const testEducationStr = 'ФГБОУ ВО Рост ГМУ Минздрава России;2007;Базовое образование;Лечебное дело||ФГБОУ ВО Рост ГМУ Минздрава России;2007;Базовое образование;Лечебное дело||ФГБОУ ВО Рост ГМУ Минздрава России;2007;Базовое образование;Лечебное дело';
function generateEducation(str) {
    if (!str) return;
    let educationCount = 1;
    let result = [];
    let educs = str.split('||');

    educs.forEach(educ => {
        const educArr = educ.split(';');

        result.push(
            { '@name': `Образование - ${educationCount}`, '@unit': 'Организация', '#text': educArr[0] }
        )
        result.push(
            { '@name': `Образование - ${educationCount}`, '@unit': 'Дата', '#text': educArr[1] }
        )
        result.push(
            { '@name': `Образование - ${educationCount}`, '@unit': 'Название', '#text': educArr[2] }
        )
        result.push(
            { '@name': `Образование - ${educationCount}`, '@unit': 'Специализация', '#text': educArr[3] }
        )
        educationCount++;
    });
    return result;
}

// generateEducation(testEducationStr);
console.log(generateEducation(testEducationStr));

async function convert() {
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(INPUT_FILE);
    const shopSheet = workbook.getWorksheet(SHEET_NAME);
    const offersSheet = workbook.getWorksheet(OFFERS_SHEET_NAME);


    const name = shopSheet.getCell('B1').value;
    const company = shopSheet.getCell('B2').value;;
    const url = shopSheet.getCell('B3').value;
    const email = shopSheet.getCell('B4').value;
    const picture = shopSheet.getCell('B5').value;
    const description = shopSheet.getCell('B6').value;
    const orgId = shopSheet.getCell('B7').value;

    const lastSetRow = shopSheet.getColumn(3).values.filter(v => v != null).length;
    const lastOffersRow = offersSheet.getColumn(1).values.filter(v => v != null).length;
    let startVrachId = 100;
    let startGroupId = 90000;

    console.log('последняя строка offers', lastOffersRow);

    const sets = {
        set: []
    }

    for (let rowNumber = 3; rowNumber <= lastSetRow; rowNumber++) {

        const rowData = {
            '@id': shopSheet.getCell(`C${rowNumber}`).value,
            name: shopSheet.getCell(`D${rowNumber}`).value,
            url: shopSheet.getCell(`E${rowNumber}`).value
        };
        sets.set.push(rowData);
    }

    const offers = {
        offer: []
    }

    for (let rowNumber = 2; rowNumber <= lastOffersRow; rowNumber++) {
        const name = offersSheet.getCell(`A${rowNumber}`).value;

        const family = getName(name)[0];
        const onlyName = getName(name)[1];
        const otchestvo = getName(name)[2];

        const educationStr = offersSheet.getCell(`J${rowNumber}`).value;
        let education;
        if (educationStr) {
            education = generateEducation(educationStr);
        }

        const offer = {
            "@id": `vrach${startVrachId++}`,
            '@group_id': `${startGroupId++}`,
            name: name,
            url: offersSheet.getCell(`B${rowNumber}`).value,
            price: {
                '#text': offersSheet.getCell(`C${rowNumber}`).value,
                '@from': 'true'
            },
            currencyId: "RUR",
            sales_notes: "Первичный прием",
            'set-ids': offersSheet.getCell(`E${rowNumber}`).value,
            picture: offersSheet.getCell(`F${rowNumber}`).value,
            description: offersSheet.getCell(`G${rowNumber}`).value,
            categoryId: '1',
            param: [
                { '@name': 'Фамилия', '#text': family },
                { '@name': 'Имя', '#text': onlyName },
                { '@name': 'Отчество', '#text': otchestvo },
                { '@name': 'Годы опыта', '#text': offersSheet.getCell(`H${rowNumber}`).value },
                // to do
                // { '@name': 'Начало карьеры', '#text': '2000-01-01' },

                { '@name': 'Город', '#text': offersSheet.getCell(`K${rowNumber}`).value },
                { '@name': 'Взрослый врач', '#text': offersSheet.getCell(`L${rowNumber}`).value },
                { '@name': 'Детский врач', '#text': offersSheet.getCell(`M${rowNumber}`).value },
                { '@name': 'Город клиники', '#text': offersSheet.getCell(`N${rowNumber}`).value },
                { '@name': 'Адрес клиники', '#text': offersSheet.getCell(`P${rowNumber}`).value },
                { '@name': 'Название клиники', '#text': company },
                { '@name': 'Возможность записи', '#text': 'true' },
                { '@name': 'Телефон для записи', '#text': offersSheet.getCell(`O${rowNumber}`).value },
                { '@name': 'Идентификатор организации', '#text': orgId },

            ]
        }
        if (education) {
            offer.param.push(...education);
        }
        offers.offer.push(offer);
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




