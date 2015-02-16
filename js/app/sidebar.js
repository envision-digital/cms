define([
	'jquery',
	'TimelineLite'
], function( $, TimelineLite ){

	var sidebar,
		menu,
		sidebarLinks,
		sidebarItems,
		contentWrapper,
		menuout,
		nav,
		menus = {},
		navTabs;

	function init(){

		sidebar         = $('.sidebar');
		menu            = $('.sidebar__menu');
		sidebarLinks    = $('.sidebar__link a');
		sidebarItems    = $('.sidebar__menu-item');
		contentWrapper  = $('.content-wrapper');
		menuout         = false;
		navTabs 		= $('.nav-tab');

		getMenus();

		console.log( menus );


		sidebar.on('mouseover', overHandler);
		menu.on('mouseleave', outHandler);

		sidebarLinks.each(function(i){

			var $this = $(this);
			
			$this.click(function( e ){

				e.preventDefault();

				var hrefEl = $(this).attr('href'),
					tl 		= new TimelineLite()

				console.log( 'hrefEl', hrefEl);

				tl.add('nav-in')
					.to( navTabs, 0.5, {
						opacity: 0
					})
					.set( navTabs, {
						display: 'none'
					})
					.to( $(hrefEl), 0.5, {
						display: 'block',
						opacity : 1
					});

				return false;
			})

		});
	}


	function getMenus(){

		nav = $('nav-menu');

		var m = nav.find('nav-tab');

		m.each(function( ii ){
			menus[ this.id ] = $(this);
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