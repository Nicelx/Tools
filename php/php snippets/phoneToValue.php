<?
function formatPhoneNumber($phone)
{
    // Убираем все символы, кроме цифр и знака +
    $formattedPhone = preg_replace('/[^\d+]/', '', $phone);

    return $formattedPhone;
}

?>