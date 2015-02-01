define([
	'jquery',
	'TweenLite'
], function( $, TweenLite ){

	var
		$metro = null;
		$slides = null;

	function init(){

		$metro      = $('.metro-wrapper');
		$slides     = $('.metro');

		$metro.on('click', '.metro', [$metro, $slides], slideHandler);

	}

	function slideHandler( e ){

		var
			$metro = e.data[0],
			$slides = e.data[1],
			notSelected = $slides.not( e.currentTarget );

		console.log( 'clicked a slide', e );

		TweenLite.to(notSelected, 1, {
			rotationY: 180
		});

	}


	return {
		init: init
	}

});