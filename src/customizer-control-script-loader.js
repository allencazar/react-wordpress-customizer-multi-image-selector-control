/*
 * Script to attach and load ReactJS module when document is ready
 *
 */
( function( $ ) {
	$(function(){
		/** attach script library when the document is ready */ 
		if(typeof MYSCRIPT != "undefined"){
			let scriptId = document.getElementById(MYSCRIPT.id);
			if( !scriptId ) {
				var script = document.createElement("script");  // create a script DOM node
				script.src = MYSCRIPT.path;  // set its src to the provided URL
				script.id = MYSCRIPT.id;
				document.body.appendChild(script); 
			}
		}
	});
} )( jQuery );