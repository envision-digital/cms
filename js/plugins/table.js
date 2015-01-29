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

		ajaxGet: function( url, $el, callback ){
			var _this = this,
				pathname = window.location.pathname;
			if( pathname ){
				url = pathname + url;
			}
			$.ajax({
				method: 'get',
				url: url,
				async: false,
				complete: function( response ){
					var data = JSON.parse( response.responseText );
					console.log( data );
					_this.data = data.data;
					_this.headers = data.headings
					debugger;
					_buildTable( _this, $el );
					callback.call( _this, response );
					// _this._render();
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

			// check if the data-url attr is set, if so get the data
			if( $this.attr('data-url') ){

				table.url = $this.attr('data-url');
				table.ajaxGet( table.url, $this, function( response ){
					initTable.call( this, table, $this, ii );
				});

			} else {

				initTable.call( this, table, $this, ii );

			}

			

			return this;

		});
	}


	function initTable( table, $this, ii ){

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
			dblclickHandler.call( this, e, table );
		});

		// move the conetntedibale focus around the table
		$this.on('keydown', 'td', function( e ){
			keydownHandler.call( this, e, table );
		});
	}

	function keydownHandler( e, table ){
		
		var
			right   = 39,
			left    = 37,
			up      = 38,
			down    = 40,
			shift   = 16;


		switch (e.keyCode) {
			case 39:
				moveRight.call(this, table);
				break;
			case 37:
				moveLeft.call(this, table);
				break;
			case 38:
				moveUp.call(this, table);
				break;
			case 40:
				moveDown.call(this, table);
				break;
		}
			
	}

	function dblclickHandler( e, table ){
		
		var 
			$target  = $(this),
			key      = table.headers[$target.index()];

		$target.attr('contenteditable', true);
		// onblur: remove content edibable event
		$target.on('blur', function( e ){

			var
				$el     = $(this),
				index   = parseInt($el.parent().attr('data-index')) || $el.parent().index();

			$el.removeAttr('contenteditable');

			table.data[ index ][ key ] = stripTags( $el.html() );
		});
	}

	function moveRight( table ){

		var 
			$this = $(this),
			$next = $this.next();

		if( $this.index() === $this.parent().children().length -1 ){
			$next = $this.parent().children().first();
		}

		$this.removeAttr('contenteditable');
		$next.attr('contenteditable', true);
		$next.focus();
	}

	function moveLeft( table ){

		var 
			$this = $(this),
			$previous = $this.prev();

		if( $this.index() === 0 ){
			$previous = $this.parent().children().last();
		}

		$this.removeAttr('contenteditable');
		$previous.attr('contenteditable', true);
		$previous.focus();
	}

	function moveDown( table ){

		var 
			$this 		= $(this),
			index 		= $this.index(),
			parent 		= $this.parent(),
			nextParent 	= parent.next(),
			below 		= null;

		if( parent.index() === table.$body.children().length - 1 ){
			debugger;
			nextParent = table.$body.find('tr').first();
		}	

		below = $(nextParent).children().eq( index );

		$this.removeAttr('contenteditable');
		below.attr('contenteditable', true);
		below.focus();
	}

	function moveUp( table ){

		var 
			$this 		= $(this),
			index 		= $this.index(),
			parent 		= $this.parent(),
			prevParent 	= parent.prev(),
			above 		= null;

		if( parent.index() === 0 ){
			debugger;
			prevParent = table.$body.find('tr').last();
		}

		above = $(prevParent).children().eq( index );

		$this.removeAttr('contenteditable');
		above.attr('contenteditable', true);
		above.focus();
	}

	function stripTags( input ){
		return input.replace(/(<[^>]+>)/gm, '')
				.replace(/&\w+;/gm, ' ')
				.replace(/(\w+)$/gm, '$1 ');
	}

	/**
	 * @private _buildTable
	 *
	 * this function will build a new tables html after
	 * an ajax call to retrieve the data
	 */
	function _buildTable( table, $el ){

		var 
			fragment 	= document.createDocumentFragment(),
			thead 		= document.createElement('thead'),
			tbody 		= document.createElement('tbody');

		// add the thead and tbody to the fragment
		fragment.appendChild( thead );
		fragment.appendChild( tbody );

		// build the headers
		for( var ii = 0; ii < table.headers.length; ii++ ){
			
			var 
				th 		= document.createElement('th'),
				text 	= document.createTextNode( table.headers[ii] );

			th.appendChild(text);
			thead.appendChild( th );
		}

		for( var ii = 0, ll = table.data.length; ii < ll; ii++ ){
			
			var tr = document.createElement('tr');
				tr.setAttribute('data-index', ii);

			for(var xx = 0; xx < table.headers.length; xx++ ){
				
				var 
					td 		= document.createElement('td'),
					// create data in order of the headers
					text 	= document.createTextNode( table.data[ii][table.headers[xx]]);

				td.appendChild( text );
				tr.appendChild( td );
			}

			tbody.appendChild( tr );
		}

		$el.append( fragment );

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