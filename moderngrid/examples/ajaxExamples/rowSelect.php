<?php

	require_once('../../dbConfig.php'); // this file is used to access database

	$ids = $_REQUEST['ids'];

	$sql = "SELECT * FROM modernGrid.numbers WHERE id IN (".$ids.")";
	$result = $conn->query($sql);
	if($result === false) {
		trigger_error('Wrong SQL: ' . $sql . ' Error: ' . $conn->error, E_USER_ERROR);		
	} else {
		while ($row = $result->fetch_assoc()) {
			$data[$row['id']] = $row;
		}
	}

?>

<div class="col-xs-12">
	<?php foreach ($data as $id=>$details) { ?>
	<br>
	<div class='label label-primary col-xs-12'>Item: <?= $details['item']; ?></div>
	<div class="col-xs-4">ID:</div>
	<div class="col-xs-8"><?= $details['id']; ?></div>
	<div class="col-xs-4">Item:</div>
	<div class="col-xs-8"><?= $details['item']; ?></div>
	<div class="col-xs-4">Description:</div>
	<div class="col-xs-8"><?= $details['description']; ?></div>
	<div class="col-xs-4">Cost:</div>
	<div class="col-xs-8"><?= $details['cost']; ?></div>
	<div class="col-xs-4">Quantity:</div>
	<div class="col-xs-8"><?= $details['quantity']; ?></div>
	<div class="col-xs-4">In Stock:</div>
	<div class="col-xs-8"><?= $details['inStock']; ?></div>
	<div class="col-xs-4">Last Modified:</div>
	<div class="col-xs-8"><?= $details['lastModified']; ?></div>
	<br>
	<?php } ?>
</div>
<br style="clear: both;">
<br>
This is an example for showing full item details for multiple items.