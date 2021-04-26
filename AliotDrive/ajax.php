<?php

header("Cache-Control: no-cache, must-revalidate");
header("Pragma: no-cache");
header("Content-Type: text/javascript; charset=utf-8");

if (isset($_POST['act'])) {
    switch ($_POST['act']) {
        case "send":
            Send();
            break;
        default:
            exit();
    }
}

function Send()
{
    $mail = "info@aliotdrive.ru";

    $name = $_POST['name'];
    $number = $_POST['number'];
    $comment = $_POST['comment'];
    $type = $_POST['type'];

    if ($type == "partner") {
        $type_str = "партнёрство";
    }
    else {
        $type_str = "тех. поддержку";
    }

    $message = "Письмо с сайта aliotdrive.ru\r\n\nЗапрос на ". $type_str ." \r\n\nИмя пользоваталя: ". $name ."\r\nНомер: ". $number."\r\nКомментарий: ". $comment;
    $message = wordwrap($message, 70, "\r\n");

    $res = mail($mail, 'Запрос на '. $type_str .' | aliotdrive.ru', $message);

    if ($res)  {
        echo '1';
    }
    else {
        echo '0';
    }
    return;
}

?>