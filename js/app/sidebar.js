define([
	'jquery',
	'TimelineLite'
], function( $, TimelineLite ){

	var sidebar,
		menu,
		sidebarLinks,
		sidebarItems,
		contentWrapper,
		menuout;

	function init(){

		sidebar         = $('.sidebar');
		menu            = $('.sidebar__menu');
		sidebarLinks    = $('.sidebar__link a');
		sidebarItems    = $('.sidebar__menu-item');
		contentWrapper  = $('.content-wrapper');
		menuout         = false;


		sidebar.on('mouseover', overHandler);
		menu.on('mouseleave', outHandler);

		sidebarLinks.each(function(i){

			$(this).hover(function(){
				TweenLite.to( this, 0.5, {
					borderWidth: "5px"
				});
			})

		});
	}



	function overHandler( e ){

		e.stopPropagation();

		if( !menuout ){
			console.log( 'menuover' );

			var
				tl      = new TimelineLite(),
				tl2     = new TimelineLite();

			tl.add('menuIn')
				.to( menu, 0.5, {
					left: "110px"
				})
				.staggerFrom( sidebarItems, 0.25,{
					left:"-100", opacity: 0
				}, 0.1);

			tl2.add('menuIn')
				.to( contentWrapper, 0.5, {
					left: "405px"
				});

			// tl.play();
			menuout = true;
		}
	}

	function outHandler( e ){

		e.stopPropagation();

		if( menuout ){
			console.log( 'menuout' );
			TweenLite.to( menu, 1,  {
				left: "-185px"
			});
			TweenLite.to( contentWrapper, 1, {
				left: "110px"
			});
			menuout = false;
		}
	}

	return {
		init: init
	}

});