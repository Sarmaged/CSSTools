/*! Font module
 * 
 * @version 0.1
 * @created 2013-02-22
 * @updated 2013-03-15
 */
(function( $ ){

	var m = {
		
		dom: {
			select: null,
			
			stg: {
				family: null,
				size: null,
				style: null,
				variant: null,
				weight: null
			}

		},
		
		html: '<div><!-- family --><div><label class="control-label" for="csstools_font_family" title="family">family</label><select name="family" id="csstools_font_family"><option value="arial">Arial</option><option value="arial black">Arial Black</option><option value="arial narrow">Arial Narrow</option><option value="book antiqua">Book Antiqua</option><option value="century gothic">Century Gothic</option><option value="comic sans ms">Comic Sans MS</option><option value="courier new">Courier New</option><option value="franklin gothic medium">Franklin Gothic Medium</option><option value="georgia">Georgia</option><option value="impact">Impact</option><option value="lucida console">Lucida Console</option><option value="lucida sans unicode">Lucida Sans Unicode</option><option value="microsoft sans serif">Microsoft Sans Serif</option><option value="palatino linotype">Palatino Linotype</option><option value="sylfaen">Sylfaen</option><option value="tahoma">Tahoma</option><option value="times new roman">Times New Roman</option><option value="trebuchet ms">Trebuchet MS</option><option value="verdana">Verdana</option><option value="webdings">Webdings</option><option value="wingdings">Wingdings</option></select></div><!-- size --><div><label class="control-label" for="csstools_font_size" title="size">size</label> <input type="number" id="csstools_font_size" name="size" value="0"/> px</div><!-- weight --><div><label class="control-label" for="csstools_font_weight" title="weight">weight</label><select name="weight" id="csstools_font_weight"><option value="normal">normal</option><option value="bold">bold</option><option value="bolder">bolder</option><option value="lighter">lighter</option><option value="100">100</option><option value="200">200</option><option value="300">300</option><option value="400">400</option><option value="500">500</option><option value="600">600</option><option value="700">700</option><option value="800">800</option><option value="900">900</option></select></div><!-- style --><div><label class="control-label" for="csstools_font_style" title="style">style</label><select name="style" id="csstools_font_style"><option value="normal">normal</option><option value="italic">italic</option><option value="oblique">oblique</option></select></div><!-- variant --><div><label class="control-label" for="csstools_font_variant" title="variant">variant</label><select name="variant" id="csstools_font_variant"><option value="normal">normal</option><option value="small-caps">small-caps</option></select></div></div>',
		
		init: function( obj ){
			
			$(' >div', obj).show().append( m.html );
			
		},
		
		factory: function( select ){
			
			m.dom.select = select;
			
			m.dom.stg.family = $('#csstools_font_family');
			m.dom.stg.size = $('#csstools_font_size');
			m.dom.stg.style = $('#csstools_font_style');
			m.dom.stg.variant = $('#csstools_font_variant');
			m.dom.stg.weight = $('#csstools_font_weight');
			
			m.inputFactory();
			m.eventFactory();
			
		},
		
		setup: {
			
			family: function( family ){
				$.CSSTools('setOption', $('option', m.dom.stg.family), family);
			},
			
			size: function( size ){
				m.dom.stg.size.val( size.slice(0, size.length -2) );
			},
			
			style: function( style ){
				$.CSSTools('setOption', $('option', m.dom.stg.style), style);
			},
			
			variant: function( variant ){
				$.CSSTools('setOption', $('option', m.dom.stg.variant), variant);
			},
			
			weight: function( weight ){
				$.CSSTools('setOption', $('option', m.dom.stg.weight), weight);
			}
			
		},
		
		inputFactory: function(){
			
			m.setup.family( $.CSSTools('cssValue', m.dom.select.css('font-family')) );
			m.setup.size( m.dom.select.css('font-size') );
			m.setup.style( m.dom.select.css('font-style') );
			m.setup.variant( m.dom.select.css('font-variant') );
			m.setup.weight( m.dom.select.css('font-weight') );
			
		},
		
		eventFactory: function(){
			
			$(':input, select').bind('change', function(){
				
				switch( this.name ){
				
					case 'family':
						m.dom.select.css('font-family', $(this).val());
					break;
					
					case 'size':
						m.dom.select.css('font-size', $(this).val() + 'px');
					break;
					
					case 'style':
						m.dom.select.css('font-style', $(this).val());
					break;
					
					case 'variant':
						m.dom.select.css('font-variant', $(this).val());
					break;
					
					case 'weight':
						m.dom.select.css('font-weight', $(this).val());
					break;
					
				};
				
			});
			
		}
	
	};


	$.ctFont = function( method ){
		if ( m[method] ) {
			return m[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
		} else if ( typeof method === 'object' || ! method ) {
			return m.init.apply( this, arguments );
		} else {
			$.error( 'Method ' +  method + ' does not exist on jQuery.ctFont' );
		}
	};
	
})( jQuery );