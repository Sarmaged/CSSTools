/*! Formatting module
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
				$float: null,
				overflow: null,
				display: null,
				clear: null,
				visibility: null,
				verticalAlign: null
			}

		},
		
		html: '<div><!-- float --><div><label class="control-label" for="csstools_formatting_float" title="float">float</label><select name="float" id="csstools_formatting_float"><option value="none">none</option><option value="left">left</option><option value="right">right</option><option value="inherit">inherit</option></select></div><!-- overflow --><div><label class="control-label" for="csstools_formatting_overflow" title="overflow">overflow</label><select name="overflow" id="csstools_formatting_overflow"><option value="auto">auto</option><option value="scroll">scroll</option><option value="hidden">hidden</option><option value="visible">visible</option></select></div><!-- display --><div><label class="control-label" for="csstools_formatting_display" title="display">display</label><select name="display" id="csstools_formatting_display"><option value="none">none</option><option value="block">block</option><option value="inline">inline</option><option value="inline-block">inline-block</option><option value="inline-table">inline-table</option><option value="list-item">list-item</option><option value="run-in">run-in</option><option value="table">table</option><option value="table-caption">table-caption</option><option value="table-cell">table-cell</option><option value="table-column-group">table-column-group</option><option value="table-column">table-column</option><option value="table-footer-group">table-footer-group</option><option value="table-header-group">table-header-group</option><option value="table-row">table-row</option><option value="table-row-group">table-row-group</option></select></div><!-- clear --><div><label class="control-label" for="csstools_formatting_clear" title="clear">clear</label><select name="clear" id="csstools_formatting_clear"><option value="none">none</option><option value="both">both</option><option value="left">left</option><option value="right">right</option><option value="inherit">inherit</option></select></div><!-- visibility --><div><label class="control-label" for="csstools_formatting_visibility" title="visibility">visibility</label><select name="visibility" id="csstools_formatting_visibility"><option value="hidden">hidden</option><option value="visible">visible</option><option value="collapse">collapse</option><option value="inherit">inherit</option></select></div><!-- vertical-align --><div><label class="control-label" for="csstools_formatting_vertical-align" title="vertical-align">vertical-align</label><select name="vertical-align" id="csstools_formatting_vertical-align"><option value="baseline">baseline</option><option value="bottom">bottom</option><option value="middle">middle</option><option value="sub">sub</option><option value="super">super</option><option value="text-bottom">text-bottom</option><option value="text-top">text-top</option><option value="top">top</option><option value="inherit">inherit</option></select></div></div>',
		
		init: function( obj ){
			
			$(' >div', obj).show().append( m.html );
			
		},
		
		factory: function( select ){
			
			m.dom.select = select;
			
			m.dom.stg.$float = $('#csstools_formatting_float');
			m.dom.stg.overflow = $('#csstools_formatting_overflow');
			m.dom.stg.display = $('#csstools_formatting_display');
			m.dom.stg.clear = $('#csstools_formatting_clear');
			m.dom.stg.visibility = $('#csstools_formatting_visibility');
			m.dom.stg.verticalAlign = $('#csstools_formatting_vertical-align');
			
			m.inputFactory();
			m.eventFactory();
			
		},
		
		setup: {
			
			$float: function( $float ){
				$.CSSTools('setOption', $('option', m.dom.stg.$float), $float);
			},
			
			overflow: function( overflow ){
				$.CSSTools('setOption', $('option', m.dom.stg.overflow), overflow);
			},
			
			display: function( display ){
				$.CSSTools('setOption', $('option', m.dom.stg.display), display);
			},
			
			clear: function( clear ){
				$.CSSTools('setOption', $('option', m.dom.stg.clear), clear);
			},
			
			visibility: function( visibility ){
				$.CSSTools('setOption', $('option', m.dom.stg.visibility), visibility);
			},
			
			verticalAlign: function( verticalAlign ){
				$.CSSTools('setOption', $('option', m.dom.stg.verticalAlign), verticalAlign);
			}
			
		},
		
		inputFactory: function(){
			
			// m.setup.family( $.CSSTools('cssValue', m.dom.select.css('font-family')) );
			m.setup.$float( m.dom.select.css('float') );
			m.setup.overflow( m.dom.select.css('overflow') );
			m.setup.display( m.dom.select.css('display') );
			m.setup.clear( m.dom.select.css('fclear') );
			m.setup.visibility( m.dom.select.css('visibility') );
			m.setup.verticalAlign( m.dom.select.css('vertical-align') );
			
		},
		
		eventFactory: function(){
			
			$(':input, select').bind('change', function(){
				
				switch( this.name ){
				
					case 'float':
						m.dom.select.css('float', $(this).val());
					break;
					
					case 'overflow':
						m.dom.select.css('overflow', $(this).val());
					break;
					
					case 'display':
						m.dom.select.css('display', $(this).val());
					break;
					
					case 'clear':
						m.dom.select.css('clear', $(this).val());
					break;
					
					case 'visibility':
						m.dom.select.css('visibility', $(this).val());
					break;
					
					case 'vertical-align':
						m.dom.select.css('vertical-align', $(this).val());
					break;
					
				};
				
			});
			
		}
	
	};
	
	$.ctFormatting = function( method ){
		if ( m[method] ) {
			return m[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
		} else if ( typeof method === 'object' || ! method ) {
			return m.init.apply( this, arguments );
		} else {
			$.error( 'Method ' +  method + ' does not exist on jQuery.ctFormatting' );
		}
	};
	
})( jQuery );