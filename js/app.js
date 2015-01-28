requirejs.config({
	"baseUrl": "/cms/",
	"paths": {
		"app": 		"./app",
		"jquery": 		"./bower_components/jquery/dist/jquery",
		"TweenMax":  	"./bower_components/greensock/src/uncompressed/TweenMax",
		"TweenLite": 	"./bower_components/greensock/src/uncompressed/TweenLite",
		"CSSPlugin": 	"./bower_components/greensock/src/uncompressed/plugins/CSSPlugin",
		"TimelineLite": "./bower_components/greensock/src/uncompressed/TimelineLite",
		"TimelineMax": 	"./bower_components/greensock/src/uncompressed/TimelineMax",
		"EasePack": 	"./bower_components/greensock/src/uncompressed/easing/EasePack",
		"table": 		"./js/plugins/table"
	},
	shim: {
	    'table': [ 'jquery' ]
	},
	"params": "v=" + new Date().getTime()
});