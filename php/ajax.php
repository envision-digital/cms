<?php

$data = [
	"headings" => [
		'id',
		'name',
		'job',
	],
	'rules' => [
		'total' => 'job',
		'index' => 'id',
	],
	'data' => [
		[
			'id' => 1,
			'name' => 'andrew',
			'job' => 'front end developer',
		],
		[
			'id' => 2,
			'name' => 'rich',
			'job' => 'ops manager',
		],
		[
			'id' => 3,
			'name' => 'sam',
			'job' => 'CEO',
		],
	]
];

echo json_encode( $data );