/*! Border module
 * 
 * @version 0.1
 * @created 2013-03-06
 * @updated 2013-03-15
 */
(function( $ ){
	
	var m = {
		
		dom: {
			select: null,
			
			stg: {
				width: null,
				style: null,
				color: null,
				radius: null
			}

		},
		
		html: '<div><div><span class="ct-label">border:</span><input type="number" id="csstools_border_width" name="width"/><select name="style" id="csstools_border_style"><option value="none">none</option><option value="solid">solid</option><option value="dotted">dotted</option><option value="dashed">dashed</option><option value="inherit">inherit</option><option value="hidden">hidden</option><option value="double">double</option><option value="groove">groove</option><option value="ridge">ridge</option><option value="inset">inset</option><option value="outset">outset</option></select><input type="text" id="csstools_border_color" name="color" class="color {caps:false}" value="ffffff"/></div></div>',
		
		init: function( obj ){
			
			$('>div', obj).show().append( m.html );
			
		},
		
		factory: function( select ){
			
			m.dom.select = select;
			
			m.dom.stg.style = $('#csstools_border_style');
			m.dom.stg.width = $('#csstools_border_width');
			m.dom.stg.color = $('#csstools_border_color');
			m.dom.stg.radius = $('#csstools_border_radius');
			
			m.inputFactory();
			m.eventFactory();
			
		},
		
		setup: {
			
			style: function( style ){
				$.CSSTools('setOption', $('option', m.dom.stg.style), style);
			},
			
			width: function( width ){
				// console.log( m.dom.stg );
				m.dom.stg.width.val( $.CSSTools('px', width) );
			},
			
			color: function( color ){
				
				color = $.CSSTools('rgbToHex', color);
				m.dom.stg.color.val( color ).get(0).color.fromString( color );
				// console.log( m.dom.stg.color.get(0).color );
				// console.log( m.dom.stg.color.get(0).color.onImmediateChange() );
				m.dom.stg.color.get(0).color.onImmediateChange = function(){
					m.dom.select.css('border-color', '#' + m.dom.stg.color.get(0).color.toString());
				};
				
			},
			
			radius: function( radius ){
				m.dom.stg.radius.val( $.CSSTools('px', radius) );
			}
			
		},
		
		inputFactory: function(){
			
			m.setup.style( m.dom.select.css('border-style') );
			m.setup.width( m.dom.select.css('border-width') );
			m.setup.color( m.dom.select.css('border-color') );
			m.setup.radius( m.dom.select.css('border-radius') );
			
		},
		
		eventFactory: function(){
			
			$(':input, select').bind('change', function(){
				
				switch( this.name ){
					case 'style':
						m.dom.select.css('border-style', $(this).val());
					break;
					
					case 'width':
						m.dom.select.css('border-width', $(this).val() + 'px');
					break;
					
					// case 'color':
						// m.dom.select.css('border-color', '#' + $(this).val());
					// break;
					
					case 'radius':
						m.dom.select.css('border-radius', $(this).val() + 'px');
					break;
					
				};
				
			});
			
		}
		
	};
	
	$.ctBorder = function( method ){
		if ( m[method] ) {
			return m[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
		} else if ( typeof method === 'object' || ! method ) {
			return m.init.apply( this, arguments );
		} else {
			$.error( 'Method ' +  method + ' does not exist on jQuery.ctText' );
		}
	};
	
})( jQuery );