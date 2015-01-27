define([

], function(){

	function log( stuff ){
		var output = document.getElementById('output') || document.getElementsByTagName('main')[0],
			li = docuent.createElement('li');
		stuff = ( typeof stuff === 'Object' || stuff instanceof Array ) ?
			JSON.strigify( stuff ) :
			stuff;

		li.innerHTML = stuff;

		output.appendChild( li );
	}

	return log;

});