<?php

$id = $_REQUEST['id'];
$value = $_REQUEST['value'];

//Split id to find item id and column to update:
$data = explode("-", $id);
$itemId = $data[0];
$column = $data[1];

// now you can update the data.  Once update is complete, simply echo the result to show update in the table, or send error message.

if ($value == 'N') {
	echo 'No';
} else if ($value == 'Y') {
	echo 'Yes';
} else {
	echo $value;
}

?>
