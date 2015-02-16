(function( $ ){

	var 
		currPage,
		totPages,
		perPage,
		availPages = [];

	$.fn.pager = function( curr, tot, per ){

		this.each(function(ii){

			var 
				$form 	= $(this),
				$el 	= $form.find('.pager-select');

			var pager = new Pager( $form, $el, curr, tot, per );

			return pager;

		});
	}

	function Pager( $form, $select, curr, tot, per ){
		this.$form 	= $form
		this.$select = $select;
		this.curr 	= curr;
		this.tot 	= tot;
		this.per 	= per;
		this.exp 	= 2;

		createOptions.call( this );
		debugger;
		logarise.call( this, 2, 2 );
	}

	Pager.prototype = {

		next: function(){
			this.to( this.curr++ );
		},
		prev: function(){
			this.to( this.curr-- );
		},
		to: function( page ){
			this.curr = page;
			this.$form.submit()
		}

	}

	function createOptions(){

		var frag = document.createDocumentFragment();

		for( var ii = this.curr - 3; ii < this.curr + 3; ii++){
			if( ii < 0 || ii > this.tot) continue;
			if( ii === this.curr ) {
				frag.appendChild( option( ii, {selected: true}, 'active'));
				continue;
			}
			frag.appendChild( option( ii ) );

		}

		this.$select.append( frag );
	}



	function logarise( page, exp ){
		var log = Math.log( page, exp );
		page++;
		debugger;
		this.$select.append( option( log ));
		if( log < this.tot ){
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

})(jQuery);