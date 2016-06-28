<?php

	require_once('../../dbConfig.php'); // this file is used to access database

	$id = $_REQUEST['id'];

	$sql = "SELECT * FROM modernGrid.numbers WHERE id = ".$id;
	$result = $conn->query($sql);
	if($result === false) {
		trigger_error('Wrong SQL: ' . $sql . ' Error: ' . $conn->error, E_USER_ERROR);		
	} else {
		while ($row = $result->fetch_assoc()) {
			$data = $row;
		}
	}

?>

<div class="col-xs-12">
	<div class="col-xs-4">ID:</div>
	<div class="col-xs-8"><?= $data['id']; ?></div>
	<div class="col-xs-4">Item:</div>
	<div class="col-xs-8"><input type="text" class="form-control" value="<?= $data['item']; ?>"></div>
	<div class="col-xs-4">Description:</div>
	<div class="col-xs-8"><input type="text" class="form-control" value="<?= $data['description']; ?>"></div>
	<div class="col-xs-4">Cost:</div>
	<div class="col-xs-8"><input type="text" class="form-control" value="<?= $data['cost']; ?>"></div>
	<div class="col-xs-4">Quantity:</div>
	<div class="col-xs-8"><input type="text" class="form-control" value="<?= $data['quantity']; ?>"></div>
	<div class="col-xs-4">In Stock:</div>
	<div class="col-xs-8"><input type="text" class="form-control" value="<?= $data['inStock']; ?>"></div>
	<div class="col-xs-4">Last Modified:</div>
	<div class="col-xs-8"><?= $data['lastModified']; ?></div>
</div>
<br style="clear: both;">
<br>
This is an example for updating an item - please note that this demo does not save.