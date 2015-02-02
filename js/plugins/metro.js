define([
	'jquery',
	'TweenLite',
	'TimelineLite',
], function( $, TweenLite, Timeline ){

	var
		$metro = null,
		$slides = null,
		size = null,
		focused = false;

	function init(){

		$metro      = $('.metro-wrapper');
		$slides     = $('.metro');
		size 		= getSize( $metro[0] );
		resetMetros( $slides );

		$metro.on('click', '.metro', [$metro, $slides], slideHandler);

	}

	function getSize( el ){

		elStyle = window.getComputedStyle( el );

		return {
			width: elStyle['width'],
			height: elStyle['height']
		}
	}

	function resetMetros( $metro ){

		$metro.removeClass('active');

		TweenLite.to( $metro.get( 0 ), 1, {
			width: '66%',
			height: '66%',
			left: 0,
			top: 0,
			scale: 1,
			rotationY: 0
		});

		TweenLite.to( $metro.get( 1 ), 1, {
			width: '34%',
			height: '34%',
			top: 0,
			left: '66%',
			scale: 1,
			rotationY: 0
		});

		TweenLite.to( $metro.get( 2 ), 1, {
			width: '34%',
			height: '34%',
			top: '33%',
			left: '66%',
			scale: 1,
			rotationY: 0
		});

		TweenLite.to( $metro.get( 3 ), 1, {
			width: '50%',
			height: '33%',
			top: '66%',
			left: 0,
			scale: 1,
			rotationY: 0
		});

		TweenLite.to( $metro.get( 4 ), 1, {
			width: '50%',
			height: '33%',
			top: '66%',
			left: '50%',
			scale: 1,
			rotationY: 0
		});

		// reset font sizes
		TweenLite.to( $metro.find('h1'), 1, {
			fontSize: "1em"
		});

		var tl = new Timeline(),
			onActive = $metro.find('.on-active');

		TweenLite.to( onActive, .5, {
			opacity: 0,
			top: '-50px'
		});

		focused = false;

	}

	function slideHandler( e ){

		if( focused ){
			return resetMetros( e.data[1] );
		}

		var
			$metro = e.data[0],
			$slides = e.data[1],
			selected = $(e.currentTarget),
			notSelected = $slides.not( e.currentTarget );

		focused = true;

		console.log( 'clicked a slide', e );

		TweenLite.to(notSelected, 1, {
			rotationY: 180,
			scale: 0.2,
			zIndex: 444
		});

		TweenLite.to(selected, 1, {
			width: size.width,
			height: size.height,
			left: 0,
			top: 0,
			scale: 1,
			zIndex: 1000,
			padding: '2em',
			onComplete: function(){
				selected.addClass('active');
			}
		});

		TweenLite.to( selected.find('h1'), 1, {
			fontSize: '3em'
		});

		var tl = new Timeline(),
			onActive = selected.find('.on-active');

		tl.add('in')
			.staggerTo( onActive, 1, {
				opacity: 1,
				top: 0
			}, 0.5);
		// spin the wrapper div clockwise
		
		// spin the target div 180deg anticlockwise
		
		// scale the notSelected divs 50%
		
		// grow the selected div to the available size

	}

	function closeHandler( e ){

	}


	return {
		init: init
	}

});