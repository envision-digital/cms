define([
	'jquery'
], function( $ ){

	function init(){
		getHeaders();
		getData();
		console.log( tables );
	}

	var table = $('.data-table');


	var rows = table.find('tbody tr');

	var tables = [],
		headers = []

	function getHeaders(){
		var h = table.find('th');
		h.each(function(i){
			headers.push( this.innerHTML );
			$(this).on('click', function( e ){
				sort( tables, this.innerHTML );
				console.dir( tables );
				rebuildTable();
			});
		});
	}

	function sort( arr, col ){
		return arr.sort(function( a, b ){
			var aCol = a[col].toLowerCase(),
				bCol = b[col].toLowerCase(),
				isNum = aCol.match(/^[0-9]+$/);

			if( isNum ){
				aCol = parseInt( aCol );
				bCol = parseInt( bCol );
			}
			return aCol === bCol ? 0 : aCol > bCol ? 1 : -1;
		});
	}

	function rebuildTable(){

		var frag = document.createDocumentFragment();

		for( var ii = 0; ii < tables.length; ii++ )(function(xx){
			var tr = document.createElement('tr');

			for( var key in tables[xx] ){
				var td = document.createElement('td');
				td.appendChild(document.createTextNode( tables[xx][key] ));
				tr.appendChild( td );
			}

			frag.appendChild( tr );
		})(ii);

		table.find('tbody').html("");
		table.find('tbody').append( frag );

	}

	function getData(){

		var iData;

		rows.each(function( ii ){

			tables[ii] = {};
			$(this).find('td').each(function(xx){
				tables[ii][ headers[xx] ] = $(this).text();
			});

		});
	}


	return {
		init: init
	}

});