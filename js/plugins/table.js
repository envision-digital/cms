(function( $ ){

	var tables = {};

	/*
	// data structure for a data-table instance
	 tables = {
		'table-name': {
			$el: 'jQuery table element',
			$body: 'jQuery tdbody element'
			headers: ['id', 'name', 'job'],
			data: ['{...}'],
			url: "somewhere.json",
			page: 0,
			pages: 3
		}
	}*/

	// Table object contstructor
	function Table(){
		this.length     = 0;
		this.$el        = null;
		this.$body      = null;
		this.headers    = [];
		this.data       = [];
		this.url        = '';
		this.sortedBy   = '';
		this.order      = 'asc';
		this.page       = 0;
		this.pages      = 0;
	}

	Table.prototype = {

		/**
		 * Table.push
		 *
		 * this function will add new data to the Table objech
		 * 
		 * @return Table 	for method chaining
		 */
		push: function(){

			var args;
			// check if pushing with an array
			if( arguments.length === 1 && arguments[0] instanceof Array){
				args = arguments[0];
			} else {
				args = Array.prototype.slice.apply(arguments, arguments);
			}

			for( var ii = 0; ii < args.length; ii++ ){
				this.data.push( args[ii] );
			}
			this.length = this.data.length;
			//call the renderTable method
			this._render();

			return this;
		},

		/**
		 * Table.pop
		 *
		 * this function will remove data from the end of the table
		 * @return Table [description]
		 */
		pop: function(){
			this.data.pop();
			this.length = this.data.length;
			this._render();

			return this;
		},

		/**
		 * Table._render
		 *
		 * re render the table based on the data on the object
		 * 
		 * @return @this 	for method chaining
		 */
		_render: function( data ){

			var
				data     = data || this.data,
				fragment = document.createDocumentFragment();

			for( var ii = 0, ll = data.length; ii < ll; ii++){
				var tr = document.createElement('tr');
				for( var key in data[ii] ){
					var td = document.createElement('td');
					td.appendChild( document.createTextNode( data[ii][key] ));
					tr.appendChild( td );
					tr.dataset['index'] = ii;
				}
				fragment.appendChild( tr );
			}
			this.$body.html( fragment );
		},

		filter: function(){



		},

		/**
		 * sort
		 *
		 * this function will sort a data table by a property
		 * 
		 * @param  	array	arr 	object array to sort
		 * @param 	string  cal 	property to sort the array by	
		 * @return 	Table     		for method chaining
		 */
		sort: function( col, order ){

			this.data = this.data.sort(function( a, b ){

				var
					aCol    = a[col].toLowerCase(),
					bCol    = b[col].toLowerCase(),
					isNum   = aCol.match(/^[0-9]+$/);

				if( isNum ){
					aCol    = parseInt( aCol );
					bCol    = parseInt( bCol );
				}
				if( order === 'asc' ){
					return aCol === bCol ? 0 : aCol > bCol ? 1 : -1;
				}
				return aCol === bCol ? 0 : aCol < bCol ? 1 : -1;

			});

			this._render();

			return this;
		},

		ajaxGet: function( url ){
			var _this = this;
			$.Ajax({
				url: url,
				complete: function( response ){
					_this.data = response.data;
					_this._render();
				}
			});
		}
	}

	// Attach the object to the jQuery prototype
	$.fn.smartTable = function( config ){
		// create a new smart table for each instance
		$(this).each(function( ii ){

			// create a new object to store the data and add it
			// to the tables array
			var
				table   = tables[ this.id ] = new Table(),
				$this   = $( this );

			// assign the values to the table object
			table.$el 		= $this;
			table.$body 	= $this.find('tbody');
			table.uid 		= ii;
			table.name 		= this.id;
			table.headers   = _getHeaders( table );
			table.data      = _getData( table );
			table.page      = 0;
			table.pages     = table.data.length % 10;

			// add contenteditable to table
			$this.on('dblclick', 'td', function( e ){

				var
					$target  = $(this),
					key      = table.headers[$target.index()];

				$target.attr('contenteditable', true);
				$target.on('blur', function( e ){

					var
						$el     = $(this),
						index   = parseInt($el.parent().attr('data-index')) || $el.parent().index();

					$el.removeAttr('contenteditable');

					table.data[ index ][ key ] = stripTags( $el.html() );
				});
			});

			return this;

		});
	}

	function stripTags( input ){
		return input.replace(/(<[^>]+>)/gm, '')
				.replace(/&\w+;/gm, ' ')
				.replace(/(\w+)$/gm, '$1 ');
	}

	/**
	 * @private _getHeaders
	 *
	 * this function will get the text from the header column
	 * 
	 * @param  jQuery 	$table 	table parent to get the headers from
	 * @return Array        	array of header names
	 */
	function _getHeaders( table ){
		
		var
			_headers 	= [];

		table.$el.find('th').each(function(ii){

			_headers.push( this.innerHTML );

			$(this).on('click', function( e ){
				headerEventHandler.call( this, e, table );
			});
		});

		return _headers;
	}

	function headerEventHandler( e, table ){

		table.sortedBy  = this.innerHTML;
		table.order     = table.order === 'asc' ? 'desc' : 'asc';

		var
			headers     = table.$el.find('th'),
			notSorted   = headers.not( this );

		// add the data-sort attr to the sorted
		// col, and remove from others
		notSorted.removeAttr('data-sorted');
		$(this).attr( 'data-sorted', table.order );

		// resort the table
		table.sort( this.innerHTML, table.order );
	}

	/**
	 * @private _getData
	 *
	 * this function will get the data from a table
	 * 
	 * @return Array 	table data
	 */
	function _getData( table ){
		
		var
			rows 	= table.$el.find('tbody tr'),
			data 	= [];

		rows.each(function(ii){
			// storage for the row data
			var row = {};
			$(this).find('td').each(function( xx ){
				// add the key to the value
				row[ table.headers[ xx ] ] = $(this).html();
			});
			// add the column to the data
			data.push( row );
		});

		// return the data array
		return data;
	}

})( jQuery );

// $('.data-table').smartTable.init( config );
// $('.data-table').smartTable.sort();