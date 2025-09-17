// v0.01 testing

const fs = require("fs");
const ExcelJS = require("exceljs");
const { create } = require("xmlbuilder2");

const OUTPUT_FILE = "feedBuilder/goods-yml.xml";
const INPUT_FILE = "feedBuilder/goods-data.xlsx";
const SHEET_NAME = "shop";
const OFFERS_SHEET_NAME = "offers";

async function convert() {
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.readFile(INPUT_FILE);
  const shopSheet = workbook.getWorksheet(SHEET_NAME);
  const offersSheet = workbook.getWorksheet(OFFERS_SHEET_NAME);

  const name = shopSheet.getCell("B1").value;
  const company = shopSheet.getCell("B2").value;
  const url = shopSheet.getCell("B3").value;
  const email = shopSheet.getCell("B4").value;
  const picture = shopSheet.getCell("B5").value;

  const lastSetRow = shopSheet
    .getColumn(3)
    .values.filter((v) => v != null).length;
  const lastOffersRow = offersSheet
    .getColumn(1)
    .values.filter((v) => v != null).length;

  const sets = {
    set: [],
  };

  for (let rowNumber = 3; rowNumber <= lastSetRow; rowNumber++) {
    const rowData = {
      "@id": shopSheet.getCell(`C${rowNumber}`).value,
      name: shopSheet.getCell(`D${rowNumber}`).value,
      url: shopSheet.getCell(`E${rowNumber}`).value,
    };
    sets.set.push(rowData);
  }

  const offers = {
    offer: [],
  };

  for (let rowNumber = 2; rowNumber <= lastOffersRow; rowNumber++) {
    const name = offersSheet.getCell(`A${rowNumber}`).value;

    const offer = {
      "@id": `${rowNumber}`,
      "@available": true,
      name: name,
      url: offersSheet.getCell(`B${rowNumber}`).value,
      description: offersSheet.getCell(`G${rowNumber}`).value,
      price: {
        "#text": offersSheet.getCell(`C${rowNumber}`).value,
        "@from": "true",
      },
      currencyId: "RUR",
      picture: offersSheet.getCell(`F${rowNumber}`).value,
      categoryId: offersSheet.getCell(`E${rowNumber}`).value,
    };

    offers.offer.push(offer);
  }

  const categories = {
    category: [
      {
        "@id": "consalting",
        "#text": "Консалтинг",
      },
      {
        "@id": "webDev",
        "#text": "Создание сайтов",
      },
      {
        "@id": "audit",
        "#text": "Аналитика и аудиты",
      },
      {
        "@id": "serm",
        "#text": "Управление имиджем и репутацией",
      },
      {
        "@id": "salesUp",
        "#text": "Увеличение продаж",
      },
      {
        "@id": "content",
        "#text": "Контент",
      },
    ],
  };

  const root = create({ version: "1.0", encoding: "UTF-8" })
    .ele("yml_catalog", { date: "2025-09-11 15:48:17" })
    .ele("shop")
    .ele("name")
    .txt(name)
    .up()
    .ele("company")
    .txt(company)
    .up()
    .ele("url")
    .txt(url)
    .up()
    .ele("email")
    .txt(email)
    .up()
    .ele("picture")
    .txt(picture)
    .up()
    .ele("currencies")
    .ele("currency", { id: "RUR", rate: "1" })
    .up()
    .up()
    .ele("categories")
    .ele(categories)
    .up()
    .up()
   
    .ele("offers")
    .ele(offers)
    .up()
    .up()
    .up()
    .up();

  // Генерация XML-строки
  const xml = root.end({ prettyPrint: true });
  fs.writeFileSync(OUTPUT_FILE, xml, "utf-8");
}

convert();
