<?php

$f = fopen('jes-img.csv', 'r');
if ($f === false) {
    die('Cannot open the file ' . $filename);
}
$goodsArray_raw = array();
$header = false;
// read each line in CSV file at a time
while (($row = fgetcsv($f)) !== false) {
    if ($row)
        if (!$header) {
            $header = true;
            continue;
        }
    array_push(
        $goodsArray_raw,
        array(
            "variant" => $row[0],
            "name" => $row[1],
            "price" => $row[6],
            "available" => $row[7],
            "old_price" => $row[9],
            "id" => $row[12],
            'description' => $row[13],
            'url' => $row[23],
            'img-url' => $row[26],
        )
    );
}

print_r($goodsArray_raw);


fclose($f);


function createXml($goodsArray)
{
    $filePath = 'feed.xml';

    $dom = new DOMDocument('1.0', 'utf-8');

    $yml_catalog = $dom->createElement('yml_catalog');
    $yml_catalog->setAttribute('date', date("Y-m-d H:i:s"));
    $dom->appendChild($yml_catalog);

    $shop = $dom->createElement('shop');
    $yml_catalog->appendChild($shop);

    $name = $dom->createElement('name', "JES");
    $shop->appendChild($name);
    $company = $dom->createElement('company', "JES Медицинская компания");
    $url = $dom->createElement('url', "https://jesmedexpert.ru/");

    $currencies = $dom->createElement('currencies');
    $currency = $dom->createElement('currency');
    $currency->setAttribute('id', 'RUR');
    $currency->setAttribute('rate', '1');
    $currencies->appendChild($currency);

    $categories = $dom->createElement('categories');


    $offers = $dom->createElement('offers');

    $category_id = 0;
    $current_category = '';

    for ($i = 0; $i < count($goodsArray); $i++) {
        $old_price = 0;
        $variant = $goodsArray[$i]['variant'];
        $prodId = $goodsArray[$i]['id'];
        $prodName = $goodsArray[$i]['name'];
        $prodPrice = $goodsArray[$i]['price'];
        if ($goodsArray[$i]['available'] === '1') {
            $available = "true";
        } else {
            $available = "false";
        }
        if ($goodsArray[$i]['old_price']) {
            $old_price = $goodsArray[$i]['old_price'];
        }
        $description = $goodsArray[$i]['description'];
        $offer_url = "https://jesmedexpert.ru/" . $goodsArray[$i]['url'];
        $img_url = $goodsArray[$i]['img-url'];


        if ($current_category === "" && $variant !== "category")
            continue;

        // $category_id = $variant['id'];
        if ($variant === "category") {
            if ($prodName === "HARMONY CASTLE" || $prodName === "ARKANA" || $prodName === "KARISMA EXO") {
                $category = $dom->createElement('category', $prodName);
                $category->setAttribute('id', $prodId);
                $current_category = $prodName;
                $category_id = $prodId;

                $categories->appendChild($category);
            }
            continue;
        }



        $offer = $dom->createElement('offer');
        $offer->setAttribute('id', $prodId);
        $offer->setAttribute('available', $available);

        $name = $dom->createElement('name', $prodName);
        $offer->appendChild($name);

        $price = $dom->createElement('price', $prodPrice);
        $offer->appendChild($price);

        $curr_id = $dom->createElement('currencyId', "RUB");
        $offer->appendChild($curr_id);

        $cat_id_el = $dom->createElement('categoryId', $category_id);
        $offer->appendChild($cat_id_el);

        $old_price_el = $dom->createElement('oldprice', $old_price);
        $offer->appendChild($old_price_el);

        $desc_el = $dom->createElement('description', $description);
        $offer->appendChild($desc_el);

        $url_el = $dom->createElement('url', $offer_url);
        $offer->appendChild($url_el);

        $picture = $dom->createElement('picture', $img_url);
        $offer->appendChild($picture);


        $offers->appendChild($offer);


    }



    $shop->appendChild($company);
    $shop->appendChild($url);
    $shop->appendChild($currencies);
    $shop->appendChild($categories);
    $shop->appendChild($offers);


    // for($i = 0; $i < count($goodsArray); $i++) {


    $dom->save($filePath);

}

createXml($goodsArray_raw);




// function createXMLfile($booksArray)
// {

//     $filePath = 'book.xml';

//     $dom = new DOMDocument('1.0', 'utf-8');

//     $root = $dom->createElement('books');

//     for ($i = 0; $i < count($booksArray); $i++) {

//         $bookId = $booksArray[$i]['id'];

//         $bookName = htmlspecialchars($booksArray[$i]['title']);

//         $bookAuthor = $booksArray[$i]['author_name'];

//         $bookPrice = $booksArray[$i]['price'];

//         $bookISBN = $booksArray[$i]['ISBN'];

//         $bookCategory = $booksArray[$i]['category'];

//         $book = $dom->createElement('book');

//         $book->setAttribute('id', $bookId);

//         $name = $dom->createElement('title', $bookName);

//         $book->appendChild($name);

//         $author = $dom->createElement('author', $bookAuthor);

//         $book->appendChild($author);

//         $price = $dom->createElement('price', $bookPrice);

//         $book->appendChild($price);

//         $isbn = $dom->createElement('ISBN', $bookISBN);

//         $book->appendChild($isbn);

//         $category = $dom->createElement('category', $bookCategory);

//         $book->appendChild($category);

//         $root->appendChild($book);

//     }

//     $dom->appendChild($root);

//     $dom->save($filePath);

// }