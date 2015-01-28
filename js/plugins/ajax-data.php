<?php

	$data = [
		'headers' => [
			'id',
			'name',
			'age',
		],
		'data' => [
			[
				'id' => 1,
				'name' => 'andrew',
				'age' => 31,
			],
			[
				'id' => 2,
				'name' => 'nicholas',
				'age' => 22,
			],
			[
				'id' => 3,
				'name' => 'helenz',
				'age' => 26,
			],
		]
	];

	echo json_encode( $data );