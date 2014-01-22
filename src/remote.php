<?php

// 
// modify this script to output a <table> of rows/cols from your database result set
//

// 
// these params are sent from ingrid, via querystring
// 'page' : the page being requested, first page = 1
// 'sort' : the column number to sort by, an integer, 0-indexed
// 'dir'  : sort direction, a string, 'desc' or 'asc'
// 

$page = isset($_GET['page']) ? $_GET['page'] : 1;   // 
$sort = isset($_GET['sort']) ? $_GET['sort'] : '';  // 
$dir  = isset($_GET['dir'])  ? $_GET['dir']  : '';  // 

// 
// without a real result set to loop thru, let's fake it
//
$rows = 25;
$cols = 4;

?>
<table>
<tbody>
<?php 
for ($i=0; $i<$rows; $i++) {
	$uid = ($page-1)*$rows+$i;
?>
	<tr id="<?php echo $uid ?>">
	<?php
	for ($j=0; $j<$cols; $j++) {
		$sorted = ( $j == $sort ? ': sorted ' . $dir : '' );
		echo "<td>$uid : pg $page : row $i : col $j $sorted</td>";
	}
	?>
	</tr>
<?php
}
?>
</tbody>
</table>