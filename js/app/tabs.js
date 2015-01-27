define([
	'jquery',
	'TimelineLite'
], function( $, TimeLine ){

	var
		$tabs       = null,
		$triggers   = null,
		cache       = {
			'tab-1': {
				active: '#tab-news',
				$nav: $('#tab-1 tab-nav')
			}
		}

	function init(){

		$(function(){
			$(window).on('ready hashchange', function( e ){

				show.apply( this, arguments );

			});
			show();
		});



	}

	function show( $tab ){

		var nav = $('.tab-nav'),
			hash = window.location.hash,
			link = null,
			tabs = $('.tab'),
			tabActive = $( hash),
			tabsNotActive = tabs.not( tabActive[0] );

		nav.find('a').removeClass('active');
		link = nav.find('[href=' + hash + ']').addClass('active');

		//$('.tab').removeClass('active');
		//$( hash ).addClass('active');

		var tl = new TimeLine();

		tl.to( tabsNotActive, .5, {
			opacity: 0,
			scale: ".95",
			// top: '-20px',
			ease: Back.easeIn,
			onComplete: function(){
				tabsNotActive.css({display: 'none'});
				tabActive.css({display: 'block', opacity: 0});
			}
		})
		.to( tabActive, 1, {
			opacity: 1,
			scale: 1,
			top: '0px',
			ease: Power1.easeOut
		});

		window.scrollTo(0, 0);

	}



	return {
		init: init
	}

});