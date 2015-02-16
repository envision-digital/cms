define([
	'jquery'
], function( $ ){

	var 
		currPage,
		totPages,
		perPage,
		availPages = [];

	function Pager( curr, tot, per ){
		currPage 	= curr;
		totPages 	= tot;
		perPage 	= per;

		logarise( 2, 2 );
	}

	function start(){

		var frag = document.createDocumentFragment();

		for( var ii = currPage - 3; ii < currPage + 3; ii++){
			if( ii < 0 || ii > totPages) continue;
			if( ii === currPage ) {
				frag.appendChild(currPageOption( ii, {selected: true}, 'active'));
				continue;
			}
			frag.appendChild( option( ii ) );

		}
	}

	currPageOption( ii, attrs, classes ){
		return option( ii, attrs, classes );
	}



	function logarise( page, exp ){
		var log = Math.log( page, exp );
		page++;
		console.log( log );
		if( log < totPages ){
			return logarise( page, exp );
		}
	}

	function option( text, attrs, classes ){
		var opt = document.createElement('option');
		if( text ){
			opt.appendChild( document.createTextNode( text ));
			opt.value = text;
		}
		for( var key in attrs ){
			opt[ key ] = attrs[ key ];
		}
		if( classes ){
			opt.className = classes;
		}
		return opt;
	}

	return {
		pager: pager
	}

});