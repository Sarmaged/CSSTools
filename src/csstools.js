/*! CSSTools Copyright (C) 2013 Sagalov Dmitriy
 * This program comes with ABSOLUTELY NO WARRANTY.
 * This is free software, and you are welcome to redistribute it
 * under certain conditions; show http://www.gnu.org/licenses/gpl-3.0.html for details.
 * 
 * @version 0.2
 * @license GPLv3, http://www.gnu.org/licenses/gpl-3.0.html
 * @author  Dmitriy Sagalov, [ email: sarmaged@gmail.com; site: http://sarmaged.ru ]
 * @created 2013-02-22
 * @updated 2013-03-16
 * @link    http://csstools.ru
 */

(function( $ ){
	
	var m = {
		
		version: 0.2,
		bookmark: 0.1,
		html: '<div id="cssTools"><div class="handle"><div class="cssTools-title"></div><a class="cssTools-btn cssTools-about" href="#" id="ctAbout" title="About">?</a><a class="cssTools-btn cssTools-close" href="#" id="ctClose" title="Close">×</a></div><div id="ctDomPathSelect"></div><div id="ctContent"><div id="ctBorder"><label class="checkbox"><input type="checkbox" name="border" value="border.js"> Border</label><div></div></div><div id="ctFont"><label class="checkbox"><input type="checkbox" name="font" value="font.js"> Font</label><div class="clearfix"></div></div><div id="ctFormatting"><label class="checkbox"><input type="checkbox" name="formatting" value="formatting.js"> Formatting</label><div class="clearfix"></div></div></div></div>',
		about: function(){
			return '<div id="cssTools-about"><a href="#" class="cssTools-about-close">&times;</a><p><strong>CSSTools v'+ m.version +'</strong> - help for quick site editing.<br/>Copyright (C) 2013 <a href="#" class="mailto:sarmaged@gmail.com">Dmitriy Sagalov</a>, <a href="http://sarmaged.ru" target="_blank">site</a></p><p>This program is free software: you can redistribute it and/or modify<br/>it under the terms of the GNU General Public License as published by<br/>the Free Software Foundation, either version 3 of the License, or<br/>(at your option) any later version.</p><p>This program is distributed in the hope that it will be useful,<br/>but WITHOUT ANY WARRANTY; without even the implied warranty of<br/>MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the<br/>GNU General Public License for more details.</p><p>You should have received a copy of the GNU General Public License<br/>along with this program.  If not, see <a href="http://www.gnu.org/licenses/gpl.html" target="_blank">http://www.gnu.org/licenses/gpl.html</a></p></div>';
		},
		
		init: function(){
			
			if( window.CSSTOOLSVERSION && window.CSSTOOLSVERSION < m.bookmark ) {
				m.alert('Please update your code in the bookmark');
				return;
			}
			
			$('body').append( m.html );
			m.dom.reset();
			m.factoryEvent();
			
			/* D&D */
			m.dom.cssTools
			.drag(function( ev, dd ){
				$( this ).css({
					top: dd.offsetY - $(window).scrollTop(),
					left: dd.offsetX
				});
			},{ handle:".handle"});
			
		},
		
		modules: [],
		
		flags: {
			cssTools: false,
			factoryEvent: false
		},
		
		path:{
			module: 'http://csstools.ru/js/modules/' // http://csstools.ru/js/modules/
		},
		
		dom: {
			
			mySelect: null,
			arrSelect: null,
			ctDomPathSelect: null, // это просто пусть [ body > elm > elm ]
			saveSelects: [], //сохранёные пути
			
			cssTools: null,
			ctCopy: null,
			ctAbout: null,
			ctClose: null,
			ctContent: null,
			
			$class:{
				hover: 'ct-hover',
				select: 'ct-select',
				save: 'ct-save'
			},
			
			reset: function(){
				
				m.dom.cssTools = $('#cssTools');
				m.dom.ctCopy = $('#ctCopy');
				m.dom.ctAbout = $('#ctAbout');
				m.dom.ctClose = $('#ctClose');
				m.dom.ctContent = $('#ctContent');
				m.dom.ctDomPathSelect = $('#ctDomPathSelect');
				
				m.ctMenu.stopEvent();
			},
			
			linkPreventDefault: function(e){
				e.preventDefault();
				// console.log( e );
				$('a').unbind('click.csstools', m.dom.linkPreventDefault);
			},
			mouseoverListener: function(e){
				if( m.flags.cssTools ) return;
				
				m.dom.parser(e);
				
				$(e.target).addClass(m.dom.$class.hover);
			},
			mouseoutListener: function(e){
				$(e.target).removeClass(m.dom.$class.hover);
			},
			
			classParser: function(a){
				var b = a.split(/\s+/);
				var str = '';
				
				$.each(b, function(i, elm){
					str +=  '.' + elm;
				});
				
				return str;
			},
			
			parser: function(e){
				var dom = [];
				var isID = false;
				var i = 0;
				var noClass = false;
				m.dom.arrSelect = '';
				
				function cickl(elm){
					if(elm.localName == 'body') return;
					
					if(elm.id) { // если есть ID
						isID = true;
						var str = '#' + elm.id;
					} else { // если нет ID
						
						//dom.unshift('body');
						
						if(elm.className) { // если есть class
							str = elm.localName + m.dom.classParser(elm.className);
						} else { // если нет class
							// console.log( elm );
							
							if(!noClass){
								noClass = true;
								str = elm.localName + ".eq(" + $(elm).index() + ")";
							} else {
								str = elm.localName
							}
							// console.log( $(elm).parent() );
							// console.log( i );
						}
					}
					
					dom.unshift(str);
					
					if(!elm.id){
						cickl(elm.parentNode);
					}
				};
				
				cickl(e.target);
				
				if(!isID){
					dom.unshift('body');
				}
				
				var DOM = dom;
				
				m.dom.arrSelect += DOM[0];
				for(var i = 1; i < DOM.length; i++){
					m.dom.arrSelect += ' > ' + DOM[i];
				}
				
				m.dom.ctDomPathSelect = m.dom.arrSelect;
				
				return dom;
			},
			
			selectClickListener: function(e){
				
				if( m.flags.cssTools ) return;
				
				if( m.dom.mySelect !== null ) m.dom.mySelect.removeClass(m.dom.$class.select);
				m.dom.mySelect = $(e.target);
				m.dom.mySelect.addClass(m.dom.$class.select);
				
				$.each(m.modules, function(i, key){
					$[key]('factory', m.dom.mySelect);
				});
				
				// console.log( m.dom.ctDomPathSelect );
				
				// m.ctMenu.stopEvent();
			}
			
		},
		
		alert: function( text ){
			alert( text + 'Your version: ' + window.CSSTOOLSVERSION + '\n' + 'Current version: ' + m.bookmark );
			document.location.href = "http://csstools.ru";
		},
		
		getCSSTools: function(){
			return m.dom.cssTools;
		},
		
		getSelectDOM: function(){
			return m.dom.mySelect;
		},
		
		start: function(){
			
			m.dom.cssTools.show();
			
			if(!m.flags.factoryEvent) { // если event уже запущен, то пропускаем
				m.flags.factoryEvent = true;
				m.ctMenu.startEvent();
			};
			
		},
		stop: function(){
			if( m.dom.mySelect !== null ) m.dom.mySelect.removeClass(m.dom.$class.select);
			m.flags.factoryEvent = false;
			m.ctMenu.stopEvent();
			m.dom.cssTools.hide();
		},
		
		save: function( elm ){
			
			m.dom.mySelect.addClass( m.dom.$class.save );
			m.dom.saveSelects.push( m.dom.ctDomPathSelect );
			
		},
		
		setScript: function( url ){
			var script = document.createElement('script');
			script.setAttribute('type', 'text/javascript');
			script.setAttribute('src', url);
			document.getElementsByTagName("head")[0].appendChild( script );
		},
		
		checkboxClickListener: function(e){
			
			var obj = null;
			var $id = null;
			var $this = this;
			var pr = $($this).parent().parent();
			
			if( $this.checked ){
				
				if( !$($this).hasClass('loaded') ){
					
					m.setScript( m.path.module + $($this).val() );
					
					$.getScript( m.path.module + $($this).val() ).done(function(script, textStatus) {
						if(textStatus == 'success') {
							
							$id = pr.attr('id');
							obj = m.dom.cssTools.find('#' + $id);
							
							$($this).addClass('loaded');
							m.modules.push( $id );
							
							$[$id]( obj );
							jscolor.init();
							if(m.dom.mySelect !== null) $[$id]('factory', m.dom.mySelect);
							
							m.start();
							
						}
					}).fail(function(jqxhr, settings, exception) {
						console.log( "Triggered ajaxError handler." );
					});
					
				} else {
					
					pr.find('>div').show();
					
				}
				
			} else {
				
				pr.find('>div').hide();
				
			}
		},
		
		factoryEvent: function(){
			
			m.dom.ctCopy.click(m.ctMenu.ctCopy);
			m.dom.ctAbout.click(m.ctMenu.ctAbout);
			m.dom.ctClose.click(m.ctMenu.ctClose);
			
			m.dom.cssTools.bind('mouseenter', function(){
				m.flags.cssTools = true;
			}).bind('mouseleave', function(){
				m.flags.cssTools = false;
			});
			
			$('>div >label >:checkbox', m.dom.ctContent).click(m.checkboxClickListener);
			
		},
		
		ctMenu:{
			
			startEvent: function(){
				$('a').bind('click.csstools', m.dom.linkPreventDefault);
				$(document).bind('mousedown.csstools', m.dom.selectClickListener);
				$('body').bind('mouseover.csstools', m.dom.mouseoverListener).bind('mouseout.csstools', m.dom.mouseoutListener);
			},
			stopEvent: function(){
				$('a').unbind('click.csstools', m.dom.linkPreventDefault);
				$(document).unbind('mousedown.csstools', m.dom.selectClickListener);
				$('body').unbind('mouseover.csstools', m.dom.mouseoverListener).unbind('mouseout.csstools', m.dom.mouseoutListener);
			},
			
			ctCopy: function(e){
				e.preventDefault();
				
				// console.log( 'click ctCopy' );
			},
			ctAbout: function(e){
				e.preventDefault();
				
				$('body').append( m.about() );
				
				var domAbout = $('#cssTools-about');
				
				domAbout.bind('mouseenter', function(){
					m.flags.cssTools = true;
				}).bind('mouseleave', function(){
					m.flags.cssTools = false;
				});
				
				$('.cssTools-about-close', domAbout).one('click', function(e){
					e.preventDefault();
					
					m.flags.cssTools = false;
					$('#cssTools-about').remove();
				})
				// console.log( 'click ctAbout' );
			},
			ctClose: function(e){
				e.preventDefault();
				
				m.stop();
			}
		},
		
		rgbToHex: function( rgb, bool ){
			function hex(x) {return ("0" + parseInt(x).toString(16)).slice(-2);}
			if( typeof rgb == 'string' ){
				var rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
				rgb = [rgb[1], rgb[2], rgb[3]];
			}
			if(!bool) return hex(rgb[0]) + hex(rgb[1]) + hex(rgb[2]);
			return [parseInt(rgb[0]), parseInt(rgb[1]), parseInt(rgb[2])];
		},
		
		/*! For Module */
		setOption: function( obj, value ){
			
			$.each(obj, function(id, val){
				if( obj.eq(id).val() == value ) {
					obj.eq(id).get(0).selected = true;
					return;
				}
			});
			
		},
		cssValue: function( value ){
			var a = value.toLowerCase();
			if(a.indexOf("'") != -1) a = a.slice(1, a.length - 1);
			return a;
		},
		px: function( px ){
			return px.slice(0, px.length -2);
		}
		
	};
	
	$.CSSTools = function( method ){
		if ( m[method] ) {
			return m[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
		} else if ( typeof method === 'object' || ! method ) {
			return m.init.apply( this, arguments );
		} else {
			$.error( 'Method ' +  method + ' does not exist on jQuery.CSSTools' );
		}
	};
	
})( jQuery );

$(document).ready(function(){
	$.CSSTools();
});