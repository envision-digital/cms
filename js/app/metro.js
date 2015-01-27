define([
	'jquery',
	'TimelineLite'
], function( $, TimeLine ){

	function init() {
		$(function(){

			var
				metros = $('.metro'),
				tl = new TimeLine();

			TweenLite.set(".metro-panel", {perspective:800});
			TweenLite.set(metros, {transformStyle:"preserve-3d"});
			TweenLite.set('.back', {rotationY: -180});
			TweenLite.set(metros, {
				rotationY:180,
				scale: 0.5,
				opacity: 0
			});

			tl.to(metros, 1, {
				scale: 1,
				rotationY: 0,
				opacity: 1
			});

			metros.on('click', function( e ){
				console.log( 'clicked', this, e );
				TweenLite.to( $(this).parent(), 1, {

				});
				TweenLite.to( this, 1, {
					rotationY: 180,
					zIndex: 1000,
					width: '100%'
				});
			});


		});

	}

	return {
		init: init
	}

});