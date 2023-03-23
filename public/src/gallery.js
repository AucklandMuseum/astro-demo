/*!
 * fancyBox - jQuery Plugin
 * version: 2.1.5 (Fri, 14 Jun 2013)
 * @requires jQuery v1.6 or later
 *
 * Examples at http://fancyapps.com/fancybox/
 * License: www.fancyapps.com/fancybox/#license
 *
 * Copyright 2012 Janis Skarnelis - janis@fancyapps.com
 *
 */

(function (window, document, $, undefined) {
	"use strict";
  
	var H = $("html"),
	  W = $(window),
	  D = $(document),
	  F = $.fancybox = function () {
		F.open.apply( this, arguments );
	  },
	  IE =  navigator.userAgent.match(/msie/i),
	  didUpdate  = null,
	  isTouch    = document.createTouch !== undefined,
  
	  isQuery  = function(obj) {
		return obj && obj.hasOwnProperty && obj instanceof $;
	  },
	  isString = function(str) {
		return str && $.type(str) === "string";
	  },
	  isPercentage = function(str) {
		return isString(str) && str.indexOf('%') > 0;
	  },
	  isScrollable = function(el) {
		return (el && !(el.style.overflow && el.style.overflow === 'hidden') && ((el.clientWidth && el.scrollWidth > el.clientWidth) || (el.clientHeight && el.scrollHeight > el.clientHeight)));
	  },
	  getScalar = function(orig, dim) {
		var value = parseInt(orig, 10) || 0;
  
		if (dim && isPercentage(orig)) {
		  value = F.getViewport()[ dim ] / 100 * value;
		}
  
		return Math.ceil(value);
	  },
	  getValue = function(value, dim) {
		return getScalar(value, dim) + 'px';
	  };
  
	$.extend(F, {
	  // The current version of fancyBox
	  version: '2.1.5',
  
	  defaults: {
		padding : 15,
		margin  : 20,
  
		width     : 800,
		height    : 600,
		minWidth  : 100,
		minHeight : 100,
		maxWidth  : 9999,
		maxHeight : 9999,
		pixelRatio: 1, // Set to 2 for retina display support
  
		autoSize   : true,
		autoHeight : false,
		autoWidth  : false,
  
		autoResize  : true,
		autoCenter  : !isTouch,
		fitToView   : true,
		aspectRatio : false,
		topRatio    : 0.5,
		leftRatio   : 0.5,
  
		scrolling : 'auto', // 'auto', 'yes' or 'no'
		wrapCSS   : '',
  
		arrows     : true,
		closeBtn   : true,
		closeClick : false,
		nextClick  : false,
		mouseWheel : true,
		autoPlay   : false,
		playSpeed  : 3000,
		preload    : 3,
		modal      : false,
		loop       : true,
  
		ajax  : {
		  dataType : 'html',
		  headers  : { 'X-fancyBox': true }
		},
		iframe : {
		  scrolling : 'auto',
		  preload   : true
		},
		swf : {
		  wmode: 'transparent',
		  allowfullscreen   : 'true',
		  allowscriptaccess : 'always'
		},
  
		keys  : {
		  next : {
			13 : 'left', // enter
			34 : 'up',   // page down
			39 : 'left', // right arrow
			40 : 'up'    // down arrow
		  },
		  prev : {
			8  : 'right',  // backspace
			33 : 'down',   // page up
			37 : 'right',  // left arrow
			38 : 'down'    // up arrow
		  },
		  close  : [27], // escape key
		  play   : [32], // space - start/stop slideshow
		  toggle : [70]  // letter "f" - toggle fullscreen
		},
  
		direction : {
		  next : 'left',
		  prev : 'right'
		},
  
		scrollOutside  : true,
  
		// Override some properties
		index   : 0,
		type    : null,
		href    : null,
		content : null,
		title   : null,
  
		// HTML templates
		tpl: {
		  wrap     : '<div class="fancybox-wrap" tabIndex="-1"><div class="fancybox-skin"><div class="fancybox-outer"><div class="fancybox-inner"></div></div></div></div>',
		  image    : '<img class="fancybox-image" src="{href}" alt="" />',
		  iframe   : '<iframe id="fancybox-frame{rnd}" name="fancybox-frame{rnd}" class="fancybox-iframe" frameborder="0" vspace="0" hspace="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen' + (IE ? ' allowtransparency="true"' : '') + '></iframe>',
		  error    : '<p class="fancybox-error">The requested content cannot be loaded.<br/>Please try again later.</p>',
		  closeBtn : '<a title="Close" class="fancybox-item fancybox-close" href="javascript:;"></a>',
		  next     : '<a title="Next" class="fancybox-nav fancybox-next" href="javascript:;"><span></span></a>',
		  prev     : '<a title="Previous" class="fancybox-nav fancybox-prev" href="javascript:;"><span></span></a>'
		},
  
		// Properties for each animation type
		// Opening fancyBox
		openEffect  : 'fade', // 'elastic', 'fade' or 'none'
		openSpeed   : 250,
		openEasing  : 'swing',
		openOpacity : true,
		openMethod  : 'zoomIn',
  
		// Closing fancyBox
		closeEffect  : 'fade', // 'elastic', 'fade' or 'none'
		closeSpeed   : 250,
		closeEasing  : 'swing',
		closeOpacity : true,
		closeMethod  : 'zoomOut',
  
		// Changing next gallery item
		nextEffect : 'elastic', // 'elastic', 'fade' or 'none'
		nextSpeed  : 250,
		nextEasing : 'swing',
		nextMethod : 'changeIn',
  
		// Changing previous gallery item
		prevEffect : 'elastic', // 'elastic', 'fade' or 'none'
		prevSpeed  : 250,
		prevEasing : 'swing',
		prevMethod : 'changeOut',
  
		// Enable default helpers
		helpers : {
		  overlay : true,
		  title   : true
		},
  
		// Callbacks
		onCancel     : $.noop, // If canceling
		beforeLoad   : $.noop, // Before loading
		afterLoad    : $.noop, // After loading
		beforeShow   : $.noop, // Before changing in current item
		afterShow    : $.noop, // After opening
		beforeChange : $.noop, // Before changing gallery item
		beforeClose  : $.noop, // Before closing
		afterClose   : $.noop  // After closing
	  },
  
	  //Current state
	  group    : {}, // Selected group
	  opts     : {}, // Group options
	  previous : null,  // Previous element
	  coming   : null,  // Element being loaded
	  current  : null,  // Currently loaded element
	  isActive : false, // Is activated
	  isOpen   : false, // Is currently open
	  isOpened : false, // Have been fully opened at least once
  
	  wrap  : null,
	  skin  : null,
	  outer : null,
	  inner : null,
  
	  player : {
		timer    : null,
		isActive : false
	  },
  
	  // Loaders
	  ajaxLoad   : null,
	  imgPreload : null,
  
	  // Some collections
	  transitions : {},
	  helpers     : {},
  
	  /*
	   *  Static methods
	   */
  
	  open: function (group, opts) {
		if (!group) {
		  return;
		}
  
		if (!$.isPlainObject(opts)) {
		  opts = {};
		}
  
		// Close if already active
		if (false === F.close(true)) {
		  return;
		}
  
		// Normalize group
		if (!$.isArray(group)) {
		  group = isQuery(group) ? $(group).get() : [group];
		}
  
		// Recheck if the type of each element is `object` and set content type (image, ajax, etc)
		$.each(group, function(i, element) {
		  var obj = {},
			href,
			title,
			content,
			type,
			rez,
			hrefParts,
			selector;
  
		  if ($.type(element) === "object") {
			// Check if is DOM element
			if (element.nodeType) {
			  element = $(element);
			}
  
			if (isQuery(element)) {
			  obj = {
				href    : element.data('fancybox-href') || element.attr('href'),
				title   : element.data('fancybox-title') || element.attr('title'),
				isDom   : true,
				element : element
			  };
  
			  if ($.metadata) {
				$.extend(true, obj, element.metadata());
			  }
  
			} else {
			  obj = element;
			}
		  }
  
		  href  = opts.href  || obj.href || (isString(element) ? element : null);
		  title = opts.title !== undefined ? opts.title : obj.title || '';
  
		  content = opts.content || obj.content;
		  type    = content ? 'html' : (opts.type  || obj.type);
  
		  if (!type && obj.isDom) {
			type = element.data('fancybox-type');
  
			if (!type) {
			  rez  = element.prop('class').match(/fancybox\.(\w+)/);
			  type = rez ? rez[1] : null;
			}
		  }
  
		  if (isString(href)) {
			// Try to guess the content type
			if (!type) {
			  if (F.isImage(href)) {
				type = 'image';
  
			  } else if (F.isSWF(href)) {
				type = 'swf';
  
			  } else if (href.charAt(0) === '#') {
				type = 'inline';
  
			  } else if (isString(element)) {
				type    = 'html';
				content = element;
			  }
			}
  
			// Split url into two pieces with source url and content selector, e.g,
			// "/mypage.html #my_id" will load "/mypage.html" and display element having id "my_id"
			if (type === 'ajax') {
			  hrefParts = href.split(/\s+/, 2);
			  href      = hrefParts.shift();
			  selector  = hrefParts.shift();
			}
		  }
  
		  if (!content) {
			if (type === 'inline') {
			  if (href) {
				content = $( isString(href) ? href.replace(/.*(?=#[^\s]+$)/, '') : href ); //strip for ie7
  
			  } else if (obj.isDom) {
				content = element;
			  }
  
			} else if (type === 'html') {
			  content = href;
  
			} else if (!type && !href && obj.isDom) {
			  type    = 'inline';
			  content = element;
			}
		  }
  
		  $.extend(obj, {
			href     : href,
			type     : type,
			content  : content,
			title    : title,
			selector : selector
		  });
  
		  group[ i ] = obj;
		});
  
		// Extend the defaults
		F.opts = $.extend(true, {}, F.defaults, opts);
  
		// All options are merged recursive except keys
		if (opts.keys !== undefined) {
		  F.opts.keys = opts.keys ? $.extend({}, F.defaults.keys, opts.keys) : false;
		}
  
		F.group = group;
  
		return F._start(F.opts.index);
	  },
  
	  // Cancel image loading or abort ajax request
	  cancel: function () {
		var coming = F.coming;
  
		if (!coming || false === F.trigger('onCancel')) {
		  return;
		}
  
		F.hideLoading();
  
		if (F.ajaxLoad) {
		  F.ajaxLoad.abort();
		}
  
		F.ajaxLoad = null;
  
		if (F.imgPreload) {
		  F.imgPreload.onload = F.imgPreload.onerror = null;
		}
  
		if (coming.wrap) {
		  coming.wrap.stop(true, true).trigger('onReset').remove();
		}
  
		F.coming = null;
  
		// If the first item has been canceled, then clear everything
		if (!F.current) {
		  F._afterZoomOut( coming );
		}
	  },
  
	  // Start closing animation if is open; remove immediately if opening/closing
	  close: function (event) {
		F.cancel();
  
		if (false === F.trigger('beforeClose')) {
		  return;
		}
  
		F.unbindEvents();
  
		if (!F.isActive) {
		  return;
		}
  
		if (!F.isOpen || event === true) {
		  $('.fancybox-wrap').stop(true).trigger('onReset').remove();
  
		  F._afterZoomOut();
  
		} else {
		  F.isOpen = F.isOpened = false;
		  F.isClosing = true;
  
		  $('.fancybox-item, .fancybox-nav').remove();
  
		  F.wrap.stop(true, true).removeClass('fancybox-opened');
  
		  F.transitions[ F.current.closeMethod ]();
		}
	  },
  
	  // Manage slideshow:
	  //   $.fancybox.play(); - toggle slideshow
	  //   $.fancybox.play( true ); - start
	  //   $.fancybox.play( false ); - stop
	  play: function ( action ) {
		var clear = function () {
			clearTimeout(F.player.timer);
		  },
		  set = function () {
			clear();
  
			if (F.current && F.player.isActive) {
			  F.player.timer = setTimeout(F.next, F.current.playSpeed);
			}
		  },
		  stop = function () {
			clear();
  
			D.unbind('.player');
  
			F.player.isActive = false;
  
			F.trigger('onPlayEnd');
		  },
		  start = function () {
			if (F.current && (F.current.loop || F.current.index < F.group.length - 1)) {
			  F.player.isActive = true;
  
			  D.bind({
				'onCancel.player beforeClose.player' : stop,
				'onUpdate.player'   : set,
				'beforeLoad.player' : clear
			  });
  
			  set();
  
			  F.trigger('onPlayStart');
			}
		  };
  
		if (action === true || (!F.player.isActive && action !== false)) {
		  start();
		} else {
		  stop();
		}
	  },
  
	  // Navigate to next gallery item
	  next: function ( direction ) {
		var current = F.current;
  
		if (current) {
		  if (!isString(direction)) {
			direction = current.direction.next;
		  }
  
		  F.jumpto(current.index + 1, direction, 'next');
		}
	  },
  
	  // Navigate to previous gallery item
	  prev: function ( direction ) {
		var current = F.current;
  
		if (current) {
		  if (!isString(direction)) {
			direction = current.direction.prev;
		  }
  
		  F.jumpto(current.index - 1, direction, 'prev');
		}
	  },
  
	  // Navigate to gallery item by index
	  jumpto: function ( index, direction, router ) {
		var current = F.current;
  
		if (!current) {
		  return;
		}
  
		index = getScalar(index);
  
		F.direction = direction || current.direction[ (index >= current.index ? 'next' : 'prev') ];
		F.router    = router || 'jumpto';
  
		if (current.loop) {
		  if (index < 0) {
			index = current.group.length + (index % current.group.length);
		  }
  
		  index = index % current.group.length;
		}
  
		if (current.group[ index ] !== undefined) {
		  F.cancel();
  
		  F._start(index);
		}
	  },
  
	  // Center inside viewport and toggle position type to fixed or absolute if needed
	  reposition: function (e, onlyAbsolute) {
		var current = F.current,
		  wrap    = current ? current.wrap : null,
		  pos;
  
		if (wrap) {
		  pos = F._getPosition(onlyAbsolute);
  
		  if (e && e.type === 'scroll') {
			delete pos.position;
  
			wrap.stop(true, true).animate(pos, 200);
  
		  } else {
			wrap.css(pos);
  
			current.pos = $.extend({}, current.dim, pos);
		  }
		}
	  },
  
	  update: function (e) {
		var type = (e && e.type),
		  anyway = !type || type === 'orientationchange';
  
		if (anyway) {
		  clearTimeout(didUpdate);
  
		  didUpdate = null;
		}
  
		if (!F.isOpen || didUpdate) {
		  return;
		}
  
		didUpdate = setTimeout(function() {
		  var current = F.current;
  
		  if (!current || F.isClosing) {
			return;
		  }
  
		  F.wrap.removeClass('fancybox-tmp');
  
		  if (anyway || type === 'load' || (type === 'resize' && current.autoResize)) {
			F._setDimension();
		  }
  
		  if (!(type === 'scroll' && current.canShrink)) {
			F.reposition(e);
		  }
  
		  F.trigger('onUpdate');
  
		  didUpdate = null;
  
		}, (anyway && !isTouch ? 0 : 300));
	  },
  
	  // Shrink content to fit inside viewport or restore if resized
	  toggle: function ( action ) {
		if (F.isOpen) {
		  F.current.fitToView = $.type(action) === "boolean" ? action : !F.current.fitToView;
  
		  // Help browser to restore document dimensions
		  if (isTouch) {
			F.wrap.removeAttr('style').addClass('fancybox-tmp');
  
			F.trigger('onUpdate');
		  }
  
		  F.update();
		}
	  },
  
	  hideLoading: function () {
		D.unbind('.loading');
  
		$('#fancybox-loading').remove();
	  },
  
	  showLoading: function () {
		var el, viewport;
  
		F.hideLoading();
  
		el = $('<div id="fancybox-loading"><div></div></div>').click(F.cancel).appendTo('body');
  
		// If user will press the escape-button, the request will be canceled
		D.bind('keydown.loading', function(e) {
		  if ((e.which || e.keyCode) === 27) {
			e.preventDefault();
  
			F.cancel();
		  }
		});
  
		if (!F.defaults.fixed) {
		  viewport = F.getViewport();
  
		  el.css({
			position : 'absolute',
			top  : (viewport.h * 0.5) + viewport.y,
			left : (viewport.w * 0.5) + viewport.x
		  });
		}
	  },
  
	  getViewport: function () {
		var locked = (F.current && F.current.locked) || false,
		  rez    = {
			x: W.scrollLeft(),
			y: W.scrollTop()
		  };
  
		if (locked) {
		  rez.w = locked[0].clientWidth;
		  rez.h = locked[0].clientHeight;
  
		} else {
		  // See http://bugs.jquery.com/ticket/6724
		  rez.w = isTouch && window.innerWidth  ? window.innerWidth  : W.width();
		  rez.h = isTouch && window.innerHeight ? window.innerHeight : W.height();
		}
  
		return rez;
	  },
  
	  // Unbind the keyboard / clicking actions
	  unbindEvents: function () {
		if (F.wrap && isQuery(F.wrap)) {
		  F.wrap.unbind('.fb');
		}
  
		D.unbind('.fb');
		W.unbind('.fb');
	  },
  
	  bindEvents: function () {
		var current = F.current,
		  keys;
  
		if (!current) {
		  return;
		}
  
		// Changing document height on iOS devices triggers a 'resize' event,
		// that can change document height... repeating infinitely
		W.bind('orientationchange.fb' + (isTouch ? '' : ' resize.fb') + (current.autoCenter && !current.locked ? ' scroll.fb' : ''), F.update);
  
		keys = current.keys;
  
		if (keys) {
		  D.bind('keydown.fb', function (e) {
			var code   = e.which || e.keyCode,
			  target = e.target || e.srcElement;
  
			// Skip esc key if loading, because showLoading will cancel preloading
			if (code === 27 && F.coming) {
			  return false;
			}
  
			// Ignore key combinations and key events within form elements
			if (!e.ctrlKey && !e.altKey && !e.shiftKey && !e.metaKey && !(target && (target.type || $(target).is('[contenteditable]')))) {
			  $.each(keys, function(i, val) {
				if (current.group.length > 1 && val[ code ] !== undefined) {
				  F[ i ]( val[ code ] );
  
				  e.preventDefault();
				  return false;
				}
  
				if ($.inArray(code, val) > -1) {
				  F[ i ] ();
  
				  e.preventDefault();
				  return false;
				}
			  });
			}
		  });
		}
  
		if ($.fn.mousewheel && current.mouseWheel) {
		  F.wrap.bind('mousewheel.fb', function (e, delta, deltaX, deltaY) {
			var target = e.target || null,
			  parent = $(target),
			  canScroll = false;
  
			while (parent.length) {
			  if (canScroll || parent.is('.fancybox-skin') || parent.is('.fancybox-wrap')) {
				break;
			  }
  
			  canScroll = isScrollable( parent[0] );
			  parent    = $(parent).parent();
			}
  
			if (delta !== 0 && !canScroll) {
			  if (F.group.length > 1 && !current.canShrink) {
				if (deltaY > 0 || deltaX > 0) {
				  F.prev( deltaY > 0 ? 'down' : 'left' );
  
				} else if (deltaY < 0 || deltaX < 0) {
				  F.next( deltaY < 0 ? 'up' : 'right' );
				}
  
				e.preventDefault();
			  }
			}
		  });
		}
	  },
  
	  trigger: function (event, o) {
		var ret, obj = o || F.coming || F.current;
  
		if (!obj) {
		  return;
		}
  
		if ($.isFunction( obj[event] )) {
		  ret = obj[event].apply(obj, Array.prototype.slice.call(arguments, 1));
		}
  
		if (ret === false) {
		  return false;
		}
  
		if (obj.helpers) {
		  $.each(obj.helpers, function (helper, opts) {
			if (opts && F.helpers[helper] && $.isFunction(F.helpers[helper][event])) {
			  F.helpers[helper][event]($.extend(true, {}, F.helpers[helper].defaults, opts), obj);
			}
		  });
		}
  
		D.trigger(event);
	  },
  
	  isImage: function (str) {
		  return isString(str) && (str.match(/(^data:image\/.*,)|(\.(jp(e|g|eg)|gif|png|bmp|webp|svg)((\?|#).*)?$)/i) || str.match(/^\/getmedia\//) );
	  },
  
	  isSWF: function (str) {
		return isString(str) && str.match(/\.(swf)((\?|#).*)?$/i);
	  },
  
	  _start: function (index) {
		var coming = {},
		  obj,
		  href,
		  type,
		  margin,
		  padding;
  
		index = getScalar( index );
		obj   = F.group[ index ] || null;
  
		if (!obj) {
		  return false;
		}
  
		coming = $.extend(true, {}, F.opts, obj);
  
		// Convert margin and padding properties to array - top, right, bottom, left
		margin  = coming.margin;
		padding = coming.padding;
  
		if ($.type(margin) === 'number') {
		  coming.margin = [margin, margin, margin, margin];
		}
  
		if ($.type(padding) === 'number') {
		  coming.padding = [padding, padding, padding, padding];
		}
  
		// 'modal' propery is just a shortcut
		if (coming.modal) {
		  $.extend(true, coming, {
			closeBtn   : false,
			closeClick : false,
			nextClick  : false,
			arrows     : false,
			mouseWheel : false,
			keys       : null,
			helpers: {
			  overlay : {
				closeClick : false
			  }
			}
		  });
		}
  
		// 'autoSize' property is a shortcut, too
		if (coming.autoSize) {
		  coming.autoWidth = coming.autoHeight = true;
		}
  
		if (coming.width === 'auto') {
		  coming.autoWidth = true;
		}
  
		if (coming.height === 'auto') {
		  coming.autoHeight = true;
		}
  
		/*
		 * Add reference to the group, so it`s possible to access from callbacks, example:
		 * afterLoad : function() {
		 *     this.title = 'Image ' + (this.index + 1) + ' of ' + this.group.length + (this.title ? ' - ' + this.title : '');
		 * }
		 */
  
		coming.group  = F.group;
		coming.index  = index;
  
		// Give a chance for callback or helpers to update coming item (type, title, etc)
		F.coming = coming;
  
		if (false === F.trigger('beforeLoad')) {
		  F.coming = null;
  
		  return;
		}
  
		type = coming.type;
		href = coming.href;
  
		if (!type) {
		  F.coming = null;
  
		  //If we can not determine content type then drop silently or display next/prev item if looping through gallery
		  if (F.current && F.router && F.router !== 'jumpto') {
			F.current.index = index;
  
			return F[ F.router ]( F.direction );
		  }
  
		  return false;
		}
  
		F.isActive = true;
  
		if (type === 'image' || type === 'swf') {
		  coming.autoHeight = coming.autoWidth = false;
		  coming.scrolling  = 'visible';
		}
  
		if (type === 'image') {
		  coming.aspectRatio = true;
		}
  
		if (type === 'iframe' && isTouch) {
		  coming.scrolling = 'scroll';
		}
  
		// Build the neccessary markup
		coming.wrap = $(coming.tpl.wrap).addClass('fancybox-' + (isTouch ? 'mobile' : 'desktop') + ' fancybox-type-' + type + ' fancybox-tmp ' + coming.wrapCSS).appendTo( coming.parent || 'body' );
  
		$.extend(coming, {
		  skin  : $('.fancybox-skin',  coming.wrap),
		  outer : $('.fancybox-outer', coming.wrap),
		  inner : $('.fancybox-inner', coming.wrap)
		});
  
		$.each(["Top", "Right", "Bottom", "Left"], function(i, v) {
		  coming.skin.css('padding' + v, getValue(coming.padding[ i ]));
		});
  
		F.trigger('onReady');
  
		// Check before try to load; 'inline' and 'html' types need content, others - href
		if (type === 'inline' || type === 'html') {
		  if (!coming.content || !coming.content.length) {
			return F._error( 'content' );
		  }
  
		} else if (!href) {
		  return F._error( 'href' );
		}
  
		if (type === 'image') {
		  F._loadImage();
  
		} else if (type === 'ajax') {
		  F._loadAjax();
  
		} else if (type === 'iframe') {
		  F._loadIframe();
  
		} else {
		  F._afterLoad();
		}
	  },
  
	  _error: function ( type ) {
		$.extend(F.coming, {
		  type       : 'html',
		  autoWidth  : true,
		  autoHeight : true,
		  minWidth   : 0,
		  minHeight  : 0,
		  scrolling  : 'no',
		  hasError   : type,
		  content    : F.coming.tpl.error
		});
  
		F._afterLoad();
	  },
  
	  _loadImage: function () {
		// Reset preload image so it is later possible to check "complete" property
		var img = F.imgPreload = new Image();
  
		img.onload = function () {
		  this.onload = this.onerror = null;
  
		  F.coming.width  = this.width / F.opts.pixelRatio;
		  F.coming.height = this.height / F.opts.pixelRatio;
  
		  F._afterLoad();
		};
  
		img.onerror = function () {
		  this.onload = this.onerror = null;
  
		  F._error( 'image' );
		};
  
		img.src = F.coming.href;
  
		if (img.complete !== true) {
		  F.showLoading();
		}
	  },
  
	  _loadAjax: function () {
		var coming = F.coming;
  
		F.showLoading();
  
		F.ajaxLoad = $.ajax($.extend({}, coming.ajax, {
		  url: coming.href,
		  error: function (jqXHR, textStatus) {
			if (F.coming && textStatus !== 'abort') {
			  F._error( 'ajax', jqXHR );
  
			} else {
			  F.hideLoading();
			}
		  },
		  success: function (data, textStatus) {
			if (textStatus === 'success') {
			  coming.content = data;
  
			  F._afterLoad();
			}
		  }
		}));
	  },
  
	  _loadIframe: function() {
		var coming = F.coming,
		  iframe = $(coming.tpl.iframe.replace(/\{rnd\}/g, new Date().getTime()))
			.attr('scrolling', isTouch ? 'auto' : coming.iframe.scrolling)
			.attr('src', coming.href);
  
		// This helps IE
		$(coming.wrap).bind('onReset', function () {
		  try {
			$(this).find('iframe').hide().attr('src', '//about:blank').end().empty();
		  } catch (e) {}
		});
  
		if (coming.iframe.preload) {
		  F.showLoading();
  
		  iframe.one('load', function() {
			$(this).data('ready', 1);
  
			// iOS will lose scrolling if we resize
			if (!isTouch) {
			  $(this).bind('load.fb', F.update);
			}
  
			// Without this trick:
			//   - iframe won't scroll on iOS devices
			//   - IE7 sometimes displays empty iframe
			$(this).parents('.fancybox-wrap').width('100%').removeClass('fancybox-tmp').show();
  
			F._afterLoad();
		  });
		}
  
		coming.content = iframe.appendTo( coming.inner );
  
		if (!coming.iframe.preload) {
		  F._afterLoad();
		}
	  },
  
	  _preloadImages: function() {
		var group   = F.group,
		  current = F.current,
		  len     = group.length,
		  cnt     = current.preload ? Math.min(current.preload, len - 1) : 0,
		  item,
		  i;
  
		for (i = 1; i <= cnt; i += 1) {
		  item = group[ (current.index + i ) % len ];
  
		  if (item.type === 'image' && item.href) {
			new Image().src = item.href;
		  }
		}
	  },
  
	  _afterLoad: function () {
		var coming   = F.coming,
		  previous = F.current,
		  placeholder = 'fancybox-placeholder',
		  current,
		  content,
		  type,
		  scrolling,
		  href,
		  embed;
  
		F.hideLoading();
  
		if (!coming || F.isActive === false) {
		  return;
		}
  
		if (false === F.trigger('afterLoad', coming, previous)) {
		  coming.wrap.stop(true).trigger('onReset').remove();
  
		  F.coming = null;
  
		  return;
		}
  
		if (previous) {
		  F.trigger('beforeChange', previous);
  
		  previous.wrap.stop(true).removeClass('fancybox-opened')
			.find('.fancybox-item, .fancybox-nav')
			.remove();
		}
  
		F.unbindEvents();
  
		current   = coming;
		content   = coming.content;
		type      = coming.type;
		scrolling = coming.scrolling;
  
		$.extend(F, {
		  wrap  : current.wrap,
		  skin  : current.skin,
		  outer : current.outer,
		  inner : current.inner,
		  current  : current,
		  previous : previous
		});
  
		href = current.href;
  
		switch (type) {
		  case 'inline':
		  case 'ajax':
		  case 'html':
			if (current.selector) {
			  content = $('<div>').html(content).find(current.selector);
  
			} else if (isQuery(content)) {
			  if (!content.data(placeholder)) {
				content.data(placeholder, $('<div class="' + placeholder + '"></div>').insertAfter( content ).hide() );
			  }
  
			  content = content.show().detach();
  
			  current.wrap.bind('onReset', function () {
				if ($(this).find(content).length) {
				  content.hide().replaceAll( content.data(placeholder) ).data(placeholder, false);
				}
			  });
			}
		  break;
  
		  case 'image':
			content = current.tpl.image.replace(/\{href\}/g, href);
		  break;
  
		  case 'swf':
			content = '<object id="fancybox-swf" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="100%" height="100%"><param name="movie" value="' + href + '"></param>';
			embed   = '';
  
			$.each(current.swf, function(name, val) {
			  content += '<param name="' + name + '" value="' + val + '"></param>';
			  embed   += ' ' + name + '="' + val + '"';
			});
  
			content += '<embed src="' + href + '" type="application/x-shockwave-flash" width="100%" height="100%"' + embed + '></embed></object>';
		  break;
		}
  
		if (!(isQuery(content) && content.parent().is(current.inner))) {
		  current.inner.append( content );
		}
  
		// Give a chance for helpers or callbacks to update elements
		F.trigger('beforeShow');
  
		// Set scrolling before calculating dimensions
		current.inner.css('overflow', scrolling === 'yes' ? 'scroll' : (scrolling === 'no' ? 'hidden' : scrolling));
  
		// Set initial dimensions and start position
		F._setDimension();
  
		F.reposition();
  
		F.isOpen = false;
		F.coming = null;
  
		F.bindEvents();
  
		if (!F.isOpened) {
		  $('.fancybox-wrap').not( current.wrap ).stop(true).trigger('onReset').remove();
  
		} else if (previous.prevMethod) {
		  F.transitions[ previous.prevMethod ]();
		}
  
		F.transitions[ F.isOpened ? current.nextMethod : current.openMethod ]();
  
		F._preloadImages();
	  },
  
	  _setDimension: function () {
		var viewport   = F.getViewport(),
		  steps      = 0,
		  canShrink  = false,
		  canExpand  = false,
		  wrap       = F.wrap,
		  skin       = F.skin,
		  inner      = F.inner,
		  current    = F.current,
		  width      = current.width,
		  height     = current.height,
		  minWidth   = current.minWidth,
		  minHeight  = current.minHeight,
		  maxWidth   = current.maxWidth,
		  maxHeight  = current.maxHeight,
		  scrolling  = current.scrolling,
		  scrollOut  = current.scrollOutside ? current.scrollbarWidth : 0,
		  margin     = current.margin,
		  wMargin    = getScalar(margin[1] + margin[3]),
		  hMargin    = getScalar(margin[0] + margin[2]),
		  wPadding,
		  hPadding,
		  wSpace,
		  hSpace,
		  origWidth,
		  origHeight,
		  origMaxWidth,
		  origMaxHeight,
		  ratio,
		  width_,
		  height_,
		  maxWidth_,
		  maxHeight_,
		  iframe,
		  body;
  
		// Reset dimensions so we could re-check actual size
		wrap.add(skin).add(inner).width('auto').height('auto').removeClass('fancybox-tmp');
  
		wPadding = getScalar(skin.outerWidth(true)  - skin.width());
		hPadding = getScalar(skin.outerHeight(true) - skin.height());
  
		// Any space between content and viewport (margin, padding, border, title)
		wSpace = wMargin + wPadding;
		hSpace = hMargin + hPadding;
  
		origWidth  = isPercentage(width)  ? (viewport.w - wSpace) * getScalar(width)  / 100 : width;
		origHeight = isPercentage(height) ? (viewport.h - hSpace) * getScalar(height) / 100 : height;
  
		if (current.type === 'iframe') {
		  iframe = current.content;
  
		  if (current.autoHeight && iframe.data('ready') === 1) {
			try {
			  if (iframe[0].contentWindow.document.location) {
				inner.width( origWidth ).height(9999);
  
				body = iframe.contents().find('body');
  
				if (scrollOut) {
				  body.css('overflow-x', 'hidden');
				}
  
				origHeight = body.outerHeight(true);
			  }
  
			} catch (e) {}
		  }
  
		} else if (current.autoWidth || current.autoHeight) {
		  inner.addClass( 'fancybox-tmp' );
  
		  // Set width or height in case we need to calculate only one dimension
		  if (!current.autoWidth) {
			inner.width( origWidth );
		  }
  
		  if (!current.autoHeight) {
			inner.height( origHeight );
		  }
  
		  if (current.autoWidth) {
			origWidth = inner.width();
		  }
  
		  if (current.autoHeight) {
			origHeight = inner.height();
		  }
  
		  inner.removeClass( 'fancybox-tmp' );
		}
  
		width  = getScalar( origWidth );
		height = getScalar( origHeight );
  
		ratio  = origWidth / origHeight;
  
		// Calculations for the content
		minWidth  = getScalar(isPercentage(minWidth) ? getScalar(minWidth, 'w') - wSpace : minWidth);
		maxWidth  = getScalar(isPercentage(maxWidth) ? getScalar(maxWidth, 'w') - wSpace : maxWidth);
  
		minHeight = getScalar(isPercentage(minHeight) ? getScalar(minHeight, 'h') - hSpace : minHeight);
		maxHeight = getScalar(isPercentage(maxHeight) ? getScalar(maxHeight, 'h') - hSpace : maxHeight);
  
		// These will be used to determine if wrap can fit in the viewport
		origMaxWidth  = maxWidth;
		origMaxHeight = maxHeight;
  
		if (current.fitToView) {
		  maxWidth  = Math.min(viewport.w - wSpace, maxWidth);
		  maxHeight = Math.min(viewport.h - hSpace, maxHeight);
		}
  
		maxWidth_  = viewport.w - wMargin;
		maxHeight_ = viewport.h - hMargin;
  
		if (current.aspectRatio) {
		  if (width > maxWidth) {
			width  = maxWidth;
			height = getScalar(width / ratio);
		  }
  
		  if (height > maxHeight) {
			height = maxHeight;
			width  = getScalar(height * ratio);
		  }
  
		  if (width < minWidth) {
			width  = minWidth;
			height = getScalar(width / ratio);
		  }
  
		  if (height < minHeight) {
			height = minHeight;
			width  = getScalar(height * ratio);
		  }
  
		} else {
		  width = Math.max(minWidth, Math.min(width, maxWidth));
  
		  if (current.autoHeight && current.type !== 'iframe') {
			inner.width( width );
  
			height = inner.height();
		  }
  
		  height = Math.max(minHeight, Math.min(height, maxHeight));
		}
  
		// Try to fit inside viewport (including the title)
		if (current.fitToView) {
		  inner.width( width ).height( height );
  
		  wrap.width( width + wPadding );
  
		  // Real wrap dimensions
		  width_  = wrap.width();
		  height_ = wrap.height();
  
		  if (current.aspectRatio) {
			while ((width_ > maxWidth_ || height_ > maxHeight_) && width > minWidth && height > minHeight) {
			  if (steps++ > 19) {
				break;
			  }
  
			  height = Math.max(minHeight, Math.min(maxHeight, height - 10));
			  width  = getScalar(height * ratio);
  
			  if (width < minWidth) {
				width  = minWidth;
				height = getScalar(width / ratio);
			  }
  
			  if (width > maxWidth) {
				width  = maxWidth;
				height = getScalar(width / ratio);
			  }
  
			  inner.width( width ).height( height );
  
			  wrap.width( width + wPadding );
  
			  width_  = wrap.width();
			  height_ = wrap.height();
			}
  
		  } else {
			width  = Math.max(minWidth,  Math.min(width,  width  - (width_  - maxWidth_)));
			height = Math.max(minHeight, Math.min(height, height - (height_ - maxHeight_)));
		  }
		}
  
		if (scrollOut && scrolling === 'auto' && height < origHeight && (width + wPadding + scrollOut) < maxWidth_) {
		  width += scrollOut;
		}
  
		inner.width( width ).height( height );
  
		wrap.width( width + wPadding );
  
		width_  = wrap.width();
		height_ = wrap.height();
  
		canShrink = (width_ > maxWidth_ || height_ > maxHeight_) && width > minWidth && height > minHeight;
		canExpand = current.aspectRatio ? (width < origMaxWidth && height < origMaxHeight && width < origWidth && height < origHeight) : ((width < origMaxWidth || height < origMaxHeight) && (width < origWidth || height < origHeight));
  
		$.extend(current, {
		  dim : {
			width  : getValue( width_ ),
			height  : getValue( height_ )
		  },
		  origWidth  : origWidth,
		  origHeight : origHeight,
		  canShrink  : canShrink,
		  canExpand  : canExpand,
		  wPadding   : wPadding,
		  hPadding   : hPadding,
		  wrapSpace  : height_ - skin.outerHeight(true),
		  skinSpace  : skin.height() - height
		});
  
		if (!iframe && current.autoHeight && height > minHeight && height < maxHeight && !canExpand) {
		  inner.height('auto');
		}
	  },
  
	  _getPosition: function (onlyAbsolute) {
		var current  = F.current,
		  viewport = F.getViewport(),
		  margin   = current.margin,
		  width    = F.wrap.width()  + margin[1] + margin[3],
		  height   = F.wrap.height() + margin[0] + margin[2],
		  rez      = {
			position: 'absolute',
			top  : margin[0],
			left : margin[3]
		  };
  
		if (current.autoCenter && current.fixed && !onlyAbsolute && height <= viewport.h && width <= viewport.w) {
		  rez.position = 'fixed';
  
		} else if (!current.locked) {
		  rez.top  += viewport.y;
		  rez.left += viewport.x;
		}
  
		rez.top  = getValue(Math.max(rez.top,  rez.top  + ((viewport.h - height) * current.topRatio)));
		rez.left = getValue(Math.max(rez.left, rez.left + ((viewport.w - width)  * current.leftRatio)));
  
		return rez;
	  },
  
	  _afterZoomIn: function () {
		var current = F.current;
  
		if (!current) {
		  return;
		}
  
		F.isOpen = F.isOpened = true;
  
		F.wrap.css('overflow', 'visible').addClass('fancybox-opened');
  
		F.update();
  
		// Assign a click event
		if ( current.closeClick || (current.nextClick && F.group.length > 1) ) {
		  F.inner.css('cursor', 'pointer').bind('click.fb', function(e) {
			if (!$(e.target).is('a') && !$(e.target).parent().is('a')) {
			  e.preventDefault();
  
			  F[ current.closeClick ? 'close' : 'next' ]();
			}
		  });
		}
  
		// Create a close button
		if (current.closeBtn) {
		  $(current.tpl.closeBtn).appendTo(F.skin).bind('click.fb', function(e) {
			e.preventDefault();
  
			F.close();
		  });
		}
  
		// Create navigation arrows
		if (current.arrows && F.group.length > 1) {
		  if (current.loop || current.index > 0) {
			$(current.tpl.prev).appendTo(F.outer).bind('click.fb', F.prev);
		  }
  
		  if (current.loop || current.index < F.group.length - 1) {
			$(current.tpl.next).appendTo(F.outer).bind('click.fb', F.next);
		  }
		}
  
		F.trigger('afterShow');
  
		// Stop the slideshow if this is the last item
		if (!current.loop && current.index === current.group.length - 1) {
		  F.play( false );
  
		} else if (F.opts.autoPlay && !F.player.isActive) {
		  F.opts.autoPlay = false;
  
		  F.play();
		}
	  },
  
	  _afterZoomOut: function ( obj ) {
		obj = obj || F.current;
  
		$('.fancybox-wrap').trigger('onReset').remove();
  
		$.extend(F, {
		  group  : {},
		  opts   : {},
		  router : false,
		  current   : null,
		  isActive  : false,
		  isOpened  : false,
		  isOpen    : false,
		  isClosing : false,
		  wrap   : null,
		  skin   : null,
		  outer  : null,
		  inner  : null
		});
  
		F.trigger('afterClose', obj);
	  }
	});
  
	/*
	 *  Default transitions
	 */
  
	F.transitions = {
	  getOrigPosition: function () {
		var current  = F.current,
		  element  = current.element,
		  orig     = current.orig,
		  pos      = {},
		  width    = 50,
		  height   = 50,
		  hPadding = current.hPadding,
		  wPadding = current.wPadding,
		  viewport = F.getViewport();
  
		if (!orig && current.isDom && element.is(':visible')) {
		  orig = element.find('img:first');
  
		  if (!orig.length) {
			orig = element;
		  }
		}
  
		if (isQuery(orig)) {
		  pos = orig.offset();
  
		  if (orig.is('img')) {
			width  = orig.outerWidth();
			height = orig.outerHeight();
		  }
  
		} else {
		  pos.top  = viewport.y + (viewport.h - height) * current.topRatio;
		  pos.left = viewport.x + (viewport.w - width)  * current.leftRatio;
		}
  
		if (F.wrap.css('position') === 'fixed' || current.locked) {
		  pos.top  -= viewport.y;
		  pos.left -= viewport.x;
		}
  
		pos = {
		  top     : getValue(pos.top  - hPadding * current.topRatio),
		  left    : getValue(pos.left - wPadding * current.leftRatio),
		  width   : getValue(width  + wPadding),
		  height  : getValue(height + hPadding)
		};
  
		return pos;
	  },
  
	  step: function (now, fx) {
		var ratio,
		  padding,
		  value,
		  prop       = fx.prop,
		  current    = F.current,
		  wrapSpace  = current.wrapSpace,
		  skinSpace  = current.skinSpace;
  
		if (prop === 'width' || prop === 'height') {
		  ratio = fx.end === fx.start ? 1 : (now - fx.start) / (fx.end - fx.start);
  
		  if (F.isClosing) {
			ratio = 1 - ratio;
		  }
  
		  padding = prop === 'width' ? current.wPadding : current.hPadding;
		  value   = now - padding;
  
		  F.skin[ prop ](  getScalar( prop === 'width' ?  value : value - (wrapSpace * ratio) ) );
		  F.inner[ prop ]( getScalar( prop === 'width' ?  value : value - (wrapSpace * ratio) - (skinSpace * ratio) ) );
		}
	  },
  
	  zoomIn: function () {
		var current  = F.current,
		  startPos = current.pos,
		  effect   = current.openEffect,
		  elastic  = effect === 'elastic',
		  endPos   = $.extend({opacity : 1}, startPos);
  
		// Remove "position" property that breaks older IE
		delete endPos.position;
  
		if (elastic) {
		  startPos = this.getOrigPosition();
  
		  if (current.openOpacity) {
			startPos.opacity = 0.1;
		  }
  
		} else if (effect === 'fade') {
		  startPos.opacity = 0.1;
		}
  
		F.wrap.css(startPos).animate(endPos, {
		  duration : effect === 'none' ? 0 : current.openSpeed,
		  easing   : current.openEasing,
		  step     : elastic ? this.step : null,
		  complete : F._afterZoomIn
		});
	  },
  
	  zoomOut: function () {
		var current  = F.current,
		  effect   = current.closeEffect,
		  elastic  = effect === 'elastic',
		  endPos   = {opacity : 0.1};
  
		if (elastic) {
		  endPos = this.getOrigPosition();
  
		  if (current.closeOpacity) {
			endPos.opacity = 0.1;
		  }
		}
  
		F.wrap.animate(endPos, {
		  duration : effect === 'none' ? 0 : current.closeSpeed,
		  easing   : current.closeEasing,
		  step     : elastic ? this.step : null,
		  complete : F._afterZoomOut
		});
	  },
  
	  changeIn: function () {
		var current   = F.current,
		  effect    = current.nextEffect,
		  startPos  = current.pos,
		  endPos    = { opacity : 1 },
		  direction = F.direction,
		  distance  = 200,
		  field;
  
		startPos.opacity = 0.1;
  
		if (effect === 'elastic') {
		  field = direction === 'down' || direction === 'up' ? 'top' : 'left';
  
		  if (direction === 'down' || direction === 'right') {
			startPos[ field ] = getValue(getScalar(startPos[ field ]) - distance);
			endPos[ field ]   = '+=' + distance + 'px';
  
		  } else {
			startPos[ field ] = getValue(getScalar(startPos[ field ]) + distance);
			endPos[ field ]   = '-=' + distance + 'px';
		  }
		}
  
		// Workaround for http://bugs.jquery.com/ticket/12273
		if (effect === 'none') {
		  F._afterZoomIn();
  
		} else {
		  F.wrap.css(startPos).animate(endPos, {
			duration : current.nextSpeed,
			easing   : current.nextEasing,
			complete : F._afterZoomIn
		  });
		}
	  },
  
	  changeOut: function () {
		var previous  = F.previous,
		  effect    = previous.prevEffect,
		  endPos    = { opacity : 0.1 },
		  direction = F.direction,
		  distance  = 200;
  
		if (effect === 'elastic') {
		  endPos[ direction === 'down' || direction === 'up' ? 'top' : 'left' ] = ( direction === 'up' || direction === 'left' ? '-' : '+' ) + '=' + distance + 'px';
		}
  
		previous.wrap.animate(endPos, {
		  duration : effect === 'none' ? 0 : previous.prevSpeed,
		  easing   : previous.prevEasing,
		  complete : function () {
			$(this).trigger('onReset').remove();
		  }
		});
	  }
	};
  
	/*
	 *  Overlay helper
	 */
  
	F.helpers.overlay = {
	  defaults : {
		closeClick : true,      // if true, fancyBox will be closed when user clicks on the overlay
		speedOut   : 200,       // duration of fadeOut animation
		showEarly  : true,      // indicates if should be opened immediately or wait until the content is ready
		css        : {},        // custom CSS properties
		locked     : !isTouch,  // if true, the content will be locked into overlay
		fixed      : true       // if false, the overlay CSS position property will not be set to "fixed"
	  },
  
	  overlay : null,      // current handle
	  fixed   : false,     // indicates if the overlay has position "fixed"
	  el      : $('html'), // element that contains "the lock"
  
	  // Public methods
	  create : function(opts) {
		opts = $.extend({}, this.defaults, opts);
  
		if (this.overlay) {
		  this.close();
		}
  
		this.overlay = $('<div class="fancybox-overlay"></div>').appendTo( F.coming ? F.coming.parent : opts.parent );
		this.fixed   = false;
  
		if (opts.fixed && F.defaults.fixed) {
		  this.overlay.addClass('fancybox-overlay-fixed');
  
		  this.fixed = true;
		}
	  },
  
	  open : function(opts) {
		var that = this;
  
		opts = $.extend({}, this.defaults, opts);
  
		if (this.overlay) {
		  this.overlay.unbind('.overlay').width('auto').height('auto');
  
		} else {
		  this.create(opts);
		}
  
		if (!this.fixed) {
		  W.bind('resize.overlay', $.proxy( this.update, this) );
  
		  this.update();
		}
  
		if (opts.closeClick) {
		  this.overlay.bind('click.overlay', function(e) {
			if ($(e.target).hasClass('fancybox-overlay')) {
			  if (F.isActive) {
				F.close();
			  } else {
				that.close();
			  }
  
			  return false;
			}
		  });
		}
  
		this.overlay.css( opts.css ).show();
	  },
  
	  close : function() {
		var scrollV, scrollH;
  
		W.unbind('resize.overlay');
  
		if (this.el.hasClass('fancybox-lock')) {
		  $('.fancybox-margin').removeClass('fancybox-margin');
  
		  scrollV = W.scrollTop();
		  scrollH = W.scrollLeft();
  
		  this.el.removeClass('fancybox-lock');
  
		  W.scrollTop( scrollV ).scrollLeft( scrollH );
		}
  
		$('.fancybox-overlay').remove().hide();
  
		$.extend(this, {
		  overlay : null,
		  fixed   : false
		});
	  },
  
	  // Private, callbacks
  
	  update : function () {
		var width = '100%', offsetWidth;
  
		// Reset width/height so it will not mess
		this.overlay.width(width).height('100%');
  
		// jQuery does not return reliable result for IE
		if (IE) {
		  offsetWidth = Math.max(document.documentElement.offsetWidth, document.body.offsetWidth);
  
		  if (D.width() > offsetWidth) {
			width = D.width();
		  }
  
		} else if (D.width() > W.width()) {
		  width = D.width();
		}
  
		this.overlay.width(width).height(D.height());
	  },
  
	  // This is where we can manipulate DOM, because later it would cause iframes to reload
	  onReady : function (opts, obj) {
		var overlay = this.overlay;
  
		$('.fancybox-overlay').stop(true, true);
  
		if (!overlay) {
		  this.create(opts);
		}
  
		if (opts.locked && this.fixed && obj.fixed) {
		  if (!overlay) {
			this.margin = D.height() > W.height() ? $('html').css('margin-right').replace("px", "") : false;
		  }
  
		  obj.locked = this.overlay.append( obj.wrap );
		  obj.fixed  = false;
		}
  
		if (opts.showEarly === true) {
		  this.beforeShow.apply(this, arguments);
		}
	  },
  
	  beforeShow : function(opts, obj) {
		var scrollV, scrollH;
  
		if (obj.locked) {
		  if (this.margin !== false) {
			$('*').filter(function(){
			  return ($(this).css('position') === 'fixed' && !$(this).hasClass("fancybox-overlay") && !$(this).hasClass("fancybox-wrap") );
			}).addClass('fancybox-margin');
  
			this.el.addClass('fancybox-margin');
		  }
  
		  scrollV = W.scrollTop();
		  scrollH = W.scrollLeft();
  
		  this.el.addClass('fancybox-lock');
  
		  W.scrollTop( scrollV ).scrollLeft( scrollH );
		}
  
		this.open(opts);
	  },
  
	  onUpdate : function() {
		if (!this.fixed) {
		  this.update();
		}
	  },
  
	  afterClose: function (opts) {
		// Remove overlay if exists and fancyBox is not opening
		// (e.g., it is not being open using afterClose callback)
		//if (this.overlay && !F.isActive) {
		if (this.overlay && !F.coming) {
		  this.overlay.fadeOut(opts.speedOut, $.proxy( this.close, this ));
		}
	  }
	};
  
	/*
	 *  Title helper
	 */
  
	F.helpers.title = {
	  defaults : {
		type     : 'float', // 'float', 'inside', 'outside' or 'over',
		position : 'bottom' // 'top' or 'bottom'
	  },
  
	  beforeShow: function (opts) {
		var current = F.current,
		  text    = current.title,
		  type    = opts.type,
		  title,
		  target;
  
		if ($.isFunction(text)) {
		  text = text.call(current.element, current);
		}
  
		if (!isString(text) || $.trim(text) === '') {
		  return;
		}
  
		title = $('<div class="fancybox-title fancybox-title-' + type + '-wrap">' + text + '</div>');
  
		switch (type) {
		  case 'inside':
			target = F.skin;
		  break;
  
		  case 'outside':
			target = F.wrap;
		  break;
  
		  case 'over':
			target = F.inner;
		  break;
  
		  default: // 'float'
			target = F.skin;
  
			title.appendTo('body');
  
			if (IE) {
			  title.width( title.width() );
			}
  
			title.wrapInner('<span class="child"></span>');
  
			//Increase bottom margin so this title will also fit into viewport
			F.current.margin[2] += Math.abs( getScalar(title.css('margin-bottom')) );
		  break;
		}
  
		title[ (opts.position === 'top' ? 'prependTo'  : 'appendTo') ](target);
	  }
	};
  
	// jQuery plugin initialization
	$.fn.fancybox = function (options) {
	  var index,
		that     = $(this),
		selector = this.selector || '',
		run      = function(e) {
		  var what = $(this).blur(), idx = index, relType, relVal;
  
		  if (!(e.ctrlKey || e.altKey || e.shiftKey || e.metaKey) && !what.is('.fancybox-wrap')) {
			relType = options.groupAttr || 'data-fancybox-group';
			relVal  = what.attr(relType);
  
			if (!relVal) {
			  relType = 'rel';
			  relVal  = what.get(0)[ relType ];
			}
  
			if (relVal && relVal !== '' && relVal !== 'nofollow') {
			  what = selector.length ? $(selector) : that;
			  what = what.filter('[' + relType + '="' + relVal + '"]');
			  idx  = what.index(this);
			}
  
			options.index = idx;
  
			// Stop an event from bubbling if everything is fine
			if (F.open(what, options) !== false) {
			  e.preventDefault();
			}
		  }
		};
  
	  options = options || {};
	  index   = options.index || 0;
  
	  if (!selector || options.live === false) {
		that.unbind('click.fb-start').bind('click.fb-start', run);
  
	  } else {
		D.undelegate(selector, 'click.fb-start').delegate(selector + ":not('.fancybox-item, .fancybox-nav')", 'click.fb-start', run);
	  }
  
	  this.filter('[data-fancybox-start=1]').trigger('click');
  
	  return this;
	};
  
	// Tests that need a body at doc ready
	D.ready(function() {
	  var w1, w2;
  
	  if ( $.scrollbarWidth === undefined ) {
		// http://benalman.com/projects/jquery-misc-plugins/#scrollbarwidth
		$.scrollbarWidth = function() {
		  var parent = $('<div style="width:50px;height:50px;overflow:auto"><div/></div>').appendTo('body'),
			child  = parent.children(),
			width  = child.innerWidth() - child.height( 99 ).innerWidth();
  
		  parent.remove();
  
		  return width;
		};
	  }
  
	  if ( $.support.fixedPosition === undefined ) {
		$.support.fixedPosition = (function() {
		  var elem  = $('<div style="position:fixed;top:20px;"></div>').appendTo('body'),
			fixed = ( elem[0].offsetTop === 20 || elem[0].offsetTop === 15 );
  
		  elem.remove();
  
		  return fixed;
		}());
	  }
  
	  $.extend(F.defaults, {
		scrollbarWidth : $.scrollbarWidth(),
		fixed  : $.support.fixedPosition,
		parent : $('body')
	  });
  
	  //Get real width of page scroll-bar
	  w1 = $(window).width();
  
	  H.addClass('fancybox-lock-test');
  
	  w2 = $(window).width();
  
	  H.removeClass('fancybox-lock-test');
  
	  $("<style type='text/css'>.fancybox-margin{margin-right:" + (w2 - w1) + "px;}</style>").appendTo("head");
	});
  
  }(window, document, jQuery));
  
  
  
  /*!
  * Thumbnail helper for fancyBox
  * version: 1.0.7 (Mon, 01 Oct 2012)
  * @requires fancyBox v2.0 or later
  *
  * Usage:
  *     $(".fancybox").fancybox({
  *         helpers : {
  *             thumbs: {
  *                 width  : 50,
  *                 height : 50
  *             }
  *         }
  *     });
  *
  */
  (function ($) {
   //Shortcut for fancyBox object
   var F = $.fancybox;
  
   //Add helper object
   F.helpers.thumbs = {
	 defaults : {
	   width    : 50,       // thumbnail width
	   height   : 50,       // thumbnail height
	   position : 'bottom', // 'top' or 'bottom'
	   source   : function ( item ) {  // function to obtain the URL of the thumbnail image
		 var href;
  
		 if (item.element) {
		   href = $(item.element).find('img').attr('src');
		 }
  
		 if (!href && item.type === 'image' && item.href) {
		   href = item.href;
		 }
  
		 return href;
	   }
	 },
  
	 wrap  : null,
	 list  : null,
	 width : 0,
  
	 init: function (opts, obj) {
	   var that = this,
		 list,
		 thumbWidth  = opts.width,
		 thumbHeight = opts.height,
		 thumbSource = opts.source;
  
	   //Build list structure
	   list = '';
  
	   for (var n = 0; n < obj.group.length; n++) {
		 list += '<li><a style="width:' + thumbWidth + 'px;height:' + thumbHeight + 'px;" href="javascript:jQuery.fancybox.jumpto(' + n + ');"></a></li>';
	   }
  
	   // DAN - was appended to body - moved to .fancybox-extra-info
	   this.wrap =$('<div id="fancybox-thumbs"></div>').addClass(opts.position).appendTo('.fancybox-content');
	   this.list = $('<ul>' + list + '</ul>').appendTo(this.wrap);
  
	   //Load each thumbnail
	   $.each(obj.group, function (i) {
		 var href = thumbSource( obj.group[ i ] );
  
		 if (!href) {
		   return;
		 }
  
		 $("<img />").load(function () {
		   var width  = this.width,
			 height = this.height,
			 widthRatio, heightRatio, parent;
  
		   if (!that.list || !width || !height) {
			 return;
		   }
  
		   //Calculate thumbnail width/height and center it
		   widthRatio  = width / thumbWidth;
		   heightRatio = height / thumbHeight;
  
		   parent = that.list.children().eq(i).find('a');
  
		   if (widthRatio >= 1 && heightRatio >= 1) {
			 if (widthRatio > heightRatio) {
			   width  = Math.floor(width / heightRatio);
			   height = thumbHeight;
  
			 } else {
			   width  = thumbWidth;
			   height = Math.floor(height / widthRatio);
			 }
		   }
  
		   $(this).css({
			 width  : width,
			 height : height,
			 top    : Math.floor(thumbHeight / 2 - height / 2),
			 left   : Math.floor(thumbWidth / 2 - width / 2)
		   });
  
		   parent.width(thumbWidth).height(thumbHeight);
  
		   $(this).hide().appendTo(parent).fadeIn(300);
  
		 }).attr('src', href);
	   });
  
	   //Set initial width
	   this.width = this.list.children().eq(0).outerWidth(true);
  
	   this.list.width(this.width * (obj.group.length + 1)).css('left', Math.floor($(window).width() * 0.5 - (obj.index * this.width + this.width * 0.5)));
	 },
  
	 beforeLoad: function (opts, obj) {
	   //Remove self if gallery do not have at least two items
	   if (obj.group.length < 2) {
		 obj.helpers.thumbs = false;
  
		 return;
	   }
  
	   //Increase bottom margin to give space for thumbs
	   obj.margin[ opts.position === 'top' ? 0 : 2 ] += ((opts.height) + 15);
	 },
  
	 afterShow: function (opts, obj) {
	   //Check if exists and create or update list
	   if (this.list) {
		 // this.onUpdate(opts, obj);
  
	   } else {
		 this.init(opts, obj);
	   }
  
	   //Set active element
	   this.list.children().removeClass('active').eq(obj.index).addClass('active');
	 },
  
	 //Center list
	 onUpdate: function (opts, obj) {
	   if (this.list) {
		 this.list.stop(true).animate({
		   'left': Math.floor($(window).width() * 0.5 - (obj.index * this.width + this.width * 0.5))
		 }, 150);
	   }
	 },
  
	 beforeClose: function () {
	   if (this.wrap) {
		 this.wrap.remove();
	   }
  
	   this.wrap  = null;
	   this.list  = null;
	   this.width = 0;
	 }
   }
  
  }(jQuery));
  /**!
  
   @license
   handlebars v4.3.5
  
  Copyright (C) 2011-2017 by Yehuda Katz
  
  Permission is hereby granted, free of charge, to any person obtaining a copy
  of this software and associated documentation files (the "Software"), to deal
  in the Software without restriction, including without limitation the rights
  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
  copies of the Software, and to permit persons to whom the Software is
  furnished to do so, subject to the following conditions:
  
  The above copyright notice and this permission notice shall be included in
  all copies or substantial portions of the Software.
  
  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
  THE SOFTWARE.
  
  */
  (function webpackUniversalModuleDefinition(root, factory) {
	  if(typeof exports === 'object' && typeof module === 'object')
		  module.exports = factory();
	  else if(typeof define === 'function' && define.amd)
		  define([], factory);
	  else if(typeof exports === 'object')
		  exports["Handlebars"] = factory();
	  else
		  root["Handlebars"] = factory();
  })(this, function() {
  return /******/ (function(modules) { // webpackBootstrap
  /******/ 	// The module cache
  /******/ 	var installedModules = {};
  
  /******/ 	// The require function
  /******/ 	function __webpack_require__(moduleId) {
  
  /******/ 		// Check if module is in cache
  /******/ 		if(installedModules[moduleId])
  /******/ 			return installedModules[moduleId].exports;
  
  /******/ 		// Create a new module (and put it into the cache)
  /******/ 		var module = installedModules[moduleId] = {
  /******/ 			exports: {},
  /******/ 			id: moduleId,
  /******/ 			loaded: false
  /******/ 		};
  
  /******/ 		// Execute the module function
  /******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
  
  /******/ 		// Flag the module as loaded
  /******/ 		module.loaded = true;
  
  /******/ 		// Return the exports of the module
  /******/ 		return module.exports;
  /******/ 	}
  
  
  /******/ 	// expose the modules object (__webpack_modules__)
  /******/ 	__webpack_require__.m = modules;
  
  /******/ 	// expose the module cache
  /******/ 	__webpack_require__.c = installedModules;
  
  /******/ 	// __webpack_public_path__
  /******/ 	__webpack_require__.p = "";
  
  /******/ 	// Load entry module and return exports
  /******/ 	return __webpack_require__(0);
  /******/ })
  /************************************************************************/
  /******/ ([
  /* 0 */
  /***/ (function(module, exports, __webpack_require__) {
  
	  'use strict';
  
	  var _interopRequireDefault = __webpack_require__(1)['default'];
  
	  exports.__esModule = true;
  
	  var _handlebarsRuntime = __webpack_require__(2);
  
	  var _handlebarsRuntime2 = _interopRequireDefault(_handlebarsRuntime);
  
	  // Compiler imports
  
	  var _handlebarsCompilerAst = __webpack_require__(35);
  
	  var _handlebarsCompilerAst2 = _interopRequireDefault(_handlebarsCompilerAst);
  
	  var _handlebarsCompilerBase = __webpack_require__(36);
  
	  var _handlebarsCompilerCompiler = __webpack_require__(41);
  
	  var _handlebarsCompilerJavascriptCompiler = __webpack_require__(42);
  
	  var _handlebarsCompilerJavascriptCompiler2 = _interopRequireDefault(_handlebarsCompilerJavascriptCompiler);
  
	  var _handlebarsCompilerVisitor = __webpack_require__(39);
  
	  var _handlebarsCompilerVisitor2 = _interopRequireDefault(_handlebarsCompilerVisitor);
  
	  var _handlebarsNoConflict = __webpack_require__(34);
  
	  var _handlebarsNoConflict2 = _interopRequireDefault(_handlebarsNoConflict);
  
	  var _create = _handlebarsRuntime2['default'].create;
	  function create() {
		var hb = _create();
  
		hb.compile = function (input, options) {
		  return _handlebarsCompilerCompiler.compile(input, options, hb);
		};
		hb.precompile = function (input, options) {
		  return _handlebarsCompilerCompiler.precompile(input, options, hb);
		};
  
		hb.AST = _handlebarsCompilerAst2['default'];
		hb.Compiler = _handlebarsCompilerCompiler.Compiler;
		hb.JavaScriptCompiler = _handlebarsCompilerJavascriptCompiler2['default'];
		hb.Parser = _handlebarsCompilerBase.parser;
		hb.parse = _handlebarsCompilerBase.parse;
  
		return hb;
	  }
  
	  var inst = create();
	  inst.create = create;
  
	  _handlebarsNoConflict2['default'](inst);
  
	  inst.Visitor = _handlebarsCompilerVisitor2['default'];
  
	  inst['default'] = inst;
  
	  exports['default'] = inst;
	  module.exports = exports['default'];
  
  /***/ }),
  /* 1 */
  /***/ (function(module, exports) {
  
	  "use strict";
  
	  exports["default"] = function (obj) {
		return obj && obj.__esModule ? obj : {
		  "default": obj
		};
	  };
  
	  exports.__esModule = true;
  
  /***/ }),
  /* 2 */
  /***/ (function(module, exports, __webpack_require__) {
  
	  'use strict';
  
	  var _interopRequireWildcard = __webpack_require__(3)['default'];
  
	  var _interopRequireDefault = __webpack_require__(1)['default'];
  
	  exports.__esModule = true;
  
	  var _handlebarsBase = __webpack_require__(4);
  
	  var base = _interopRequireWildcard(_handlebarsBase);
  
	  // Each of these augment the Handlebars object. No need to setup here.
	  // (This is done to easily share code between commonjs and browse envs)
  
	  var _handlebarsSafeString = __webpack_require__(21);
  
	  var _handlebarsSafeString2 = _interopRequireDefault(_handlebarsSafeString);
  
	  var _handlebarsException = __webpack_require__(6);
  
	  var _handlebarsException2 = _interopRequireDefault(_handlebarsException);
  
	  var _handlebarsUtils = __webpack_require__(5);
  
	  var Utils = _interopRequireWildcard(_handlebarsUtils);
  
	  var _handlebarsRuntime = __webpack_require__(22);
  
	  var runtime = _interopRequireWildcard(_handlebarsRuntime);
  
	  var _handlebarsNoConflict = __webpack_require__(34);
  
	  var _handlebarsNoConflict2 = _interopRequireDefault(_handlebarsNoConflict);
  
	  // For compatibility and usage outside of module systems, make the Handlebars object a namespace
	  function create() {
		var hb = new base.HandlebarsEnvironment();
  
		Utils.extend(hb, base);
		hb.SafeString = _handlebarsSafeString2['default'];
		hb.Exception = _handlebarsException2['default'];
		hb.Utils = Utils;
		hb.escapeExpression = Utils.escapeExpression;
  
		hb.VM = runtime;
		hb.template = function (spec) {
		  return runtime.template(spec, hb);
		};
  
		return hb;
	  }
  
	  var inst = create();
	  inst.create = create;
  
	  _handlebarsNoConflict2['default'](inst);
  
	  inst['default'] = inst;
  
	  exports['default'] = inst;
	  module.exports = exports['default'];
  
  /***/ }),
  /* 3 */
  /***/ (function(module, exports) {
  
	  "use strict";
  
	  exports["default"] = function (obj) {
		if (obj && obj.__esModule) {
		  return obj;
		} else {
		  var newObj = {};
  
		  if (obj != null) {
			for (var key in obj) {
			  if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
			}
		  }
  
		  newObj["default"] = obj;
		  return newObj;
		}
	  };
  
	  exports.__esModule = true;
  
  /***/ }),
  /* 4 */
  /***/ (function(module, exports, __webpack_require__) {
  
	  'use strict';
  
	  var _interopRequireDefault = __webpack_require__(1)['default'];
  
	  exports.__esModule = true;
	  exports.HandlebarsEnvironment = HandlebarsEnvironment;
  
	  var _utils = __webpack_require__(5);
  
	  var _exception = __webpack_require__(6);
  
	  var _exception2 = _interopRequireDefault(_exception);
  
	  var _helpers = __webpack_require__(10);
  
	  var _decorators = __webpack_require__(18);
  
	  var _logger = __webpack_require__(20);
  
	  var _logger2 = _interopRequireDefault(_logger);
  
	  var VERSION = '4.3.5';
	  exports.VERSION = VERSION;
	  var COMPILER_REVISION = 8;
	  exports.COMPILER_REVISION = COMPILER_REVISION;
	  var LAST_COMPATIBLE_COMPILER_REVISION = 7;
  
	  exports.LAST_COMPATIBLE_COMPILER_REVISION = LAST_COMPATIBLE_COMPILER_REVISION;
	  var REVISION_CHANGES = {
		1: '<= 1.0.rc.2', // 1.0.rc.2 is actually rev2 but doesn't report it
		2: '== 1.0.0-rc.3',
		3: '== 1.0.0-rc.4',
		4: '== 1.x.x',
		5: '== 2.0.0-alpha.x',
		6: '>= 2.0.0-beta.1',
		7: '>= 4.0.0 <4.3.0',
		8: '>= 4.3.0'
	  };
  
	  exports.REVISION_CHANGES = REVISION_CHANGES;
	  var objectType = '[object Object]';
  
	  function HandlebarsEnvironment(helpers, partials, decorators) {
		this.helpers = helpers || {};
		this.partials = partials || {};
		this.decorators = decorators || {};
  
		_helpers.registerDefaultHelpers(this);
		_decorators.registerDefaultDecorators(this);
	  }
  
	  HandlebarsEnvironment.prototype = {
		constructor: HandlebarsEnvironment,
  
		logger: _logger2['default'],
		log: _logger2['default'].log,
  
		registerHelper: function registerHelper(name, fn) {
		  if (_utils.toString.call(name) === objectType) {
			if (fn) {
			  throw new _exception2['default']('Arg not supported with multiple helpers');
			}
			_utils.extend(this.helpers, name);
		  } else {
			this.helpers[name] = fn;
		  }
		},
		unregisterHelper: function unregisterHelper(name) {
		  delete this.helpers[name];
		},
  
		registerPartial: function registerPartial(name, partial) {
		  if (_utils.toString.call(name) === objectType) {
			_utils.extend(this.partials, name);
		  } else {
			if (typeof partial === 'undefined') {
			  throw new _exception2['default']('Attempting to register a partial called "' + name + '" as undefined');
			}
			this.partials[name] = partial;
		  }
		},
		unregisterPartial: function unregisterPartial(name) {
		  delete this.partials[name];
		},
  
		registerDecorator: function registerDecorator(name, fn) {
		  if (_utils.toString.call(name) === objectType) {
			if (fn) {
			  throw new _exception2['default']('Arg not supported with multiple decorators');
			}
			_utils.extend(this.decorators, name);
		  } else {
			this.decorators[name] = fn;
		  }
		},
		unregisterDecorator: function unregisterDecorator(name) {
		  delete this.decorators[name];
		}
	  };
  
	  var log = _logger2['default'].log;
  
	  exports.log = log;
	  exports.createFrame = _utils.createFrame;
	  exports.logger = _logger2['default'];
  
  /***/ }),
  /* 5 */
  /***/ (function(module, exports) {
  
	  'use strict';
  
	  exports.__esModule = true;
	  exports.extend = extend;
	  exports.indexOf = indexOf;
	  exports.escapeExpression = escapeExpression;
	  exports.isEmpty = isEmpty;
	  exports.createFrame = createFrame;
	  exports.blockParams = blockParams;
	  exports.appendContextPath = appendContextPath;
  
	  var escape = {
		'&': '&amp;',
		'<': '&lt;',
		'>': '&gt;',
		'"': '&quot;',
		"'": '&#x27;',
		'`': '&#x60;',
		'=': '&#x3D;'
	  };
  
	  var badChars = /[&<>"'`=]/g,
		  possible = /[&<>"'`=]/;
  
	  function escapeChar(chr) {
		return escape[chr];
	  }
  
	  function extend(obj /* , ...source */) {
		for (var i = 1; i < arguments.length; i++) {
		  for (var key in arguments[i]) {
			if (Object.prototype.hasOwnProperty.call(arguments[i], key)) {
			  obj[key] = arguments[i][key];
			}
		  }
		}
  
		return obj;
	  }
  
	  var toString = Object.prototype.toString;
  
	  exports.toString = toString;
	  // Sourced from lodash
	  // https://github.com/bestiejs/lodash/blob/master/LICENSE.txt
	  /* eslint-disable func-style */
	  var isFunction = function isFunction(value) {
		return typeof value === 'function';
	  };
	  // fallback for older versions of Chrome and Safari
	  /* istanbul ignore next */
	  if (isFunction(/x/)) {
		exports.isFunction = isFunction = function (value) {
		  return typeof value === 'function' && toString.call(value) === '[object Function]';
		};
	  }
	  exports.isFunction = isFunction;
  
	  /* eslint-enable func-style */
  
	  /* istanbul ignore next */
	  var isArray = Array.isArray || function (value) {
		return value && typeof value === 'object' ? toString.call(value) === '[object Array]' : false;
	  };
  
	  exports.isArray = isArray;
	  // Older IE versions do not directly support indexOf so we must implement our own, sadly.
  
	  function indexOf(array, value) {
		for (var i = 0, len = array.length; i < len; i++) {
		  if (array[i] === value) {
			return i;
		  }
		}
		return -1;
	  }
  
	  function escapeExpression(string) {
		if (typeof string !== 'string') {
		  // don't escape SafeStrings, since they're already safe
		  if (string && string.toHTML) {
			return string.toHTML();
		  } else if (string == null) {
			return '';
		  } else if (!string) {
			return string + '';
		  }
  
		  // Force a string conversion as this will be done by the append regardless and
		  // the regex test will do this transparently behind the scenes, causing issues if
		  // an object's to string has escaped characters in it.
		  string = '' + string;
		}
  
		if (!possible.test(string)) {
		  return string;
		}
		return string.replace(badChars, escapeChar);
	  }
  
	  function isEmpty(value) {
		if (!value && value !== 0) {
		  return true;
		} else if (isArray(value) && value.length === 0) {
		  return true;
		} else {
		  return false;
		}
	  }
  
	  function createFrame(object) {
		var frame = extend({}, object);
		frame._parent = object;
		return frame;
	  }
  
	  function blockParams(params, ids) {
		params.path = ids;
		return params;
	  }
  
	  function appendContextPath(contextPath, id) {
		return (contextPath ? contextPath + '.' : '') + id;
	  }
  
  /***/ }),
  /* 6 */
  /***/ (function(module, exports, __webpack_require__) {
  
	  'use strict';
  
	  var _Object$defineProperty = __webpack_require__(7)['default'];
  
	  exports.__esModule = true;
  
	  var errorProps = ['description', 'fileName', 'lineNumber', 'message', 'name', 'number', 'stack'];
  
	  function Exception(message, node) {
		var loc = node && node.loc,
			line = undefined,
			column = undefined;
		if (loc) {
		  line = loc.start.line;
		  column = loc.start.column;
  
		  message += ' - ' + line + ':' + column;
		}
  
		var tmp = Error.prototype.constructor.call(this, message);
  
		// Unfortunately errors are not enumerable in Chrome (at least), so `for prop in tmp` doesn't work.
		for (var idx = 0; idx < errorProps.length; idx++) {
		  this[errorProps[idx]] = tmp[errorProps[idx]];
		}
  
		/* istanbul ignore else */
		if (Error.captureStackTrace) {
		  Error.captureStackTrace(this, Exception);
		}
  
		try {
		  if (loc) {
			this.lineNumber = line;
  
			// Work around issue under safari where we can't directly set the column value
			/* istanbul ignore next */
			if (_Object$defineProperty) {
			  Object.defineProperty(this, 'column', {
				value: column,
				enumerable: true
			  });
			} else {
			  this.column = column;
			}
		  }
		} catch (nop) {
		  /* Ignore if the browser is very particular */
		}
	  }
  
	  Exception.prototype = new Error();
  
	  exports['default'] = Exception;
	  module.exports = exports['default'];
  
  /***/ }),
  /* 7 */
  /***/ (function(module, exports, __webpack_require__) {
  
	  module.exports = { "default": __webpack_require__(8), __esModule: true };
  
  /***/ }),
  /* 8 */
  /***/ (function(module, exports, __webpack_require__) {
  
	  var $ = __webpack_require__(9);
	  module.exports = function defineProperty(it, key, desc){
		return $.setDesc(it, key, desc);
	  };
  
  /***/ }),
  /* 9 */
  /***/ (function(module, exports) {
  
	  var $Object = Object;
	  module.exports = {
		create:     $Object.create,
		getProto:   $Object.getPrototypeOf,
		isEnum:     {}.propertyIsEnumerable,
		getDesc:    $Object.getOwnPropertyDescriptor,
		setDesc:    $Object.defineProperty,
		setDescs:   $Object.defineProperties,
		getKeys:    $Object.keys,
		getNames:   $Object.getOwnPropertyNames,
		getSymbols: $Object.getOwnPropertySymbols,
		each:       [].forEach
	  };
  
  /***/ }),
  /* 10 */
  /***/ (function(module, exports, __webpack_require__) {
  
	  'use strict';
  
	  var _interopRequireDefault = __webpack_require__(1)['default'];
  
	  exports.__esModule = true;
	  exports.registerDefaultHelpers = registerDefaultHelpers;
	  exports.moveHelperToHooks = moveHelperToHooks;
  
	  var _helpersBlockHelperMissing = __webpack_require__(11);
  
	  var _helpersBlockHelperMissing2 = _interopRequireDefault(_helpersBlockHelperMissing);
  
	  var _helpersEach = __webpack_require__(12);
  
	  var _helpersEach2 = _interopRequireDefault(_helpersEach);
  
	  var _helpersHelperMissing = __webpack_require__(13);
  
	  var _helpersHelperMissing2 = _interopRequireDefault(_helpersHelperMissing);
  
	  var _helpersIf = __webpack_require__(14);
  
	  var _helpersIf2 = _interopRequireDefault(_helpersIf);
  
	  var _helpersLog = __webpack_require__(15);
  
	  var _helpersLog2 = _interopRequireDefault(_helpersLog);
  
	  var _helpersLookup = __webpack_require__(16);
  
	  var _helpersLookup2 = _interopRequireDefault(_helpersLookup);
  
	  var _helpersWith = __webpack_require__(17);
  
	  var _helpersWith2 = _interopRequireDefault(_helpersWith);
  
	  function registerDefaultHelpers(instance) {
		_helpersBlockHelperMissing2['default'](instance);
		_helpersEach2['default'](instance);
		_helpersHelperMissing2['default'](instance);
		_helpersIf2['default'](instance);
		_helpersLog2['default'](instance);
		_helpersLookup2['default'](instance);
		_helpersWith2['default'](instance);
	  }
  
	  function moveHelperToHooks(instance, helperName, keepHelper) {
		if (instance.helpers[helperName]) {
		  instance.hooks[helperName] = instance.helpers[helperName];
		  if (!keepHelper) {
			delete instance.helpers[helperName];
		  }
		}
	  }
  
  /***/ }),
  /* 11 */
  /***/ (function(module, exports, __webpack_require__) {
  
	  'use strict';
  
	  exports.__esModule = true;
  
	  var _utils = __webpack_require__(5);
  
	  exports['default'] = function (instance) {
		instance.registerHelper('blockHelperMissing', function (context, options) {
		  var inverse = options.inverse,
			  fn = options.fn;
  
		  if (context === true) {
			return fn(this);
		  } else if (context === false || context == null) {
			return inverse(this);
		  } else if (_utils.isArray(context)) {
			if (context.length > 0) {
			  if (options.ids) {
				options.ids = [options.name];
			  }
  
			  return instance.helpers.each(context, options);
			} else {
			  return inverse(this);
			}
		  } else {
			if (options.data && options.ids) {
			  var data = _utils.createFrame(options.data);
			  data.contextPath = _utils.appendContextPath(options.data.contextPath, options.name);
			  options = { data: data };
			}
  
			return fn(context, options);
		  }
		});
	  };
  
	  module.exports = exports['default'];
  
  /***/ }),
  /* 12 */
  /***/ (function(module, exports, __webpack_require__) {
  
	  'use strict';
  
	  var _interopRequireDefault = __webpack_require__(1)['default'];
  
	  exports.__esModule = true;
  
	  var _utils = __webpack_require__(5);
  
	  var _exception = __webpack_require__(6);
  
	  var _exception2 = _interopRequireDefault(_exception);
  
	  exports['default'] = function (instance) {
		instance.registerHelper('each', function (context, options) {
		  if (!options) {
			throw new _exception2['default']('Must pass iterator to #each');
		  }
  
		  var fn = options.fn,
			  inverse = options.inverse,
			  i = 0,
			  ret = '',
			  data = undefined,
			  contextPath = undefined;
  
		  if (options.data && options.ids) {
			contextPath = _utils.appendContextPath(options.data.contextPath, options.ids[0]) + '.';
		  }
  
		  if (_utils.isFunction(context)) {
			context = context.call(this);
		  }
  
		  if (options.data) {
			data = _utils.createFrame(options.data);
		  }
  
		  function execIteration(field, index, last) {
			if (data) {
			  data.key = field;
			  data.index = index;
			  data.first = index === 0;
			  data.last = !!last;
  
			  if (contextPath) {
				data.contextPath = contextPath + field;
			  }
			}
  
			ret = ret + fn(context[field], {
			  data: data,
			  blockParams: _utils.blockParams([context[field], field], [contextPath + field, null])
			});
		  }
  
		  if (context && typeof context === 'object') {
			if (_utils.isArray(context)) {
			  for (var j = context.length; i < j; i++) {
				if (i in context) {
				  execIteration(i, i, i === context.length - 1);
				}
			  }
			} else {
			  var priorKey = undefined;
  
			  for (var key in context) {
				if (context.hasOwnProperty(key)) {
				  // We're running the iterations one step out of sync so we can detect
				  // the last iteration without have to scan the object twice and create
				  // an itermediate keys array.
				  if (priorKey !== undefined) {
					execIteration(priorKey, i - 1);
				  }
				  priorKey = key;
				  i++;
				}
			  }
			  if (priorKey !== undefined) {
				execIteration(priorKey, i - 1, true);
			  }
			}
		  }
  
		  if (i === 0) {
			ret = inverse(this);
		  }
  
		  return ret;
		});
	  };
  
	  module.exports = exports['default'];
  
  /***/ }),
  /* 13 */
  /***/ (function(module, exports, __webpack_require__) {
  
	  'use strict';
  
	  var _interopRequireDefault = __webpack_require__(1)['default'];
  
	  exports.__esModule = true;
  
	  var _exception = __webpack_require__(6);
  
	  var _exception2 = _interopRequireDefault(_exception);
  
	  exports['default'] = function (instance) {
		instance.registerHelper('helperMissing', function () /* [args, ]options */{
		  if (arguments.length === 1) {
			// A missing field in a {{foo}} construct.
			return undefined;
		  } else {
			// Someone is actually trying to call something, blow up.
			throw new _exception2['default']('Missing helper: "' + arguments[arguments.length - 1].name + '"');
		  }
		});
	  };
  
	  module.exports = exports['default'];
  
  /***/ }),
  /* 14 */
  /***/ (function(module, exports, __webpack_require__) {
  
	  'use strict';
  
	  exports.__esModule = true;
  
	  var _utils = __webpack_require__(5);
  
	  exports['default'] = function (instance) {
		instance.registerHelper('if', function (conditional, options) {
		  if (_utils.isFunction(conditional)) {
			conditional = conditional.call(this);
		  }
  
		  // Default behavior is to render the positive path if the value is truthy and not empty.
		  // The `includeZero` option may be set to treat the condtional as purely not empty based on the
		  // behavior of isEmpty. Effectively this determines if 0 is handled by the positive path or negative.
		  if (!options.hash.includeZero && !conditional || _utils.isEmpty(conditional)) {
			return options.inverse(this);
		  } else {
			return options.fn(this);
		  }
		});
  
		instance.registerHelper('unless', function (conditional, options) {
		  return instance.helpers['if'].call(this, conditional, { fn: options.inverse, inverse: options.fn, hash: options.hash });
		});
	  };
  
	  module.exports = exports['default'];
  
  /***/ }),
  /* 15 */
  /***/ (function(module, exports) {
  
	  'use strict';
  
	  exports.__esModule = true;
  
	  exports['default'] = function (instance) {
		instance.registerHelper('log', function () /* message, options */{
		  var args = [undefined],
			  options = arguments[arguments.length - 1];
		  for (var i = 0; i < arguments.length - 1; i++) {
			args.push(arguments[i]);
		  }
  
		  var level = 1;
		  if (options.hash.level != null) {
			level = options.hash.level;
		  } else if (options.data && options.data.level != null) {
			level = options.data.level;
		  }
		  args[0] = level;
  
		  instance.log.apply(instance, args);
		});
	  };
  
	  module.exports = exports['default'];
  
  /***/ }),
  /* 16 */
  /***/ (function(module, exports) {
  
	  'use strict';
  
	  exports.__esModule = true;
  
	  exports['default'] = function (instance) {
		instance.registerHelper('lookup', function (obj, field) {
		  if (!obj) {
			return obj;
		  }
		  if (field === 'constructor' && !obj.propertyIsEnumerable(field)) {
			return undefined;
		  }
		  return obj[field];
		});
	  };
  
	  module.exports = exports['default'];
  
  /***/ }),
  /* 17 */
  /***/ (function(module, exports, __webpack_require__) {
  
	  'use strict';
  
	  exports.__esModule = true;
  
	  var _utils = __webpack_require__(5);
  
	  exports['default'] = function (instance) {
		instance.registerHelper('with', function (context, options) {
		  if (_utils.isFunction(context)) {
			context = context.call(this);
		  }
  
		  var fn = options.fn;
  
		  if (!_utils.isEmpty(context)) {
			var data = options.data;
			if (options.data && options.ids) {
			  data = _utils.createFrame(options.data);
			  data.contextPath = _utils.appendContextPath(options.data.contextPath, options.ids[0]);
			}
  
			return fn(context, {
			  data: data,
			  blockParams: _utils.blockParams([context], [data && data.contextPath])
			});
		  } else {
			return options.inverse(this);
		  }
		});
	  };
  
	  module.exports = exports['default'];
  
  /***/ }),
  /* 18 */
  /***/ (function(module, exports, __webpack_require__) {
  
	  'use strict';
  
	  var _interopRequireDefault = __webpack_require__(1)['default'];
  
	  exports.__esModule = true;
	  exports.registerDefaultDecorators = registerDefaultDecorators;
  
	  var _decoratorsInline = __webpack_require__(19);
  
	  var _decoratorsInline2 = _interopRequireDefault(_decoratorsInline);
  
	  function registerDefaultDecorators(instance) {
		_decoratorsInline2['default'](instance);
	  }
  
  /***/ }),
  /* 19 */
  /***/ (function(module, exports, __webpack_require__) {
  
	  'use strict';
  
	  exports.__esModule = true;
  
	  var _utils = __webpack_require__(5);
  
	  exports['default'] = function (instance) {
		instance.registerDecorator('inline', function (fn, props, container, options) {
		  var ret = fn;
		  if (!props.partials) {
			props.partials = {};
			ret = function (context, options) {
			  // Create a new partials stack frame prior to exec.
			  var original = container.partials;
			  container.partials = _utils.extend({}, original, props.partials);
			  var ret = fn(context, options);
			  container.partials = original;
			  return ret;
			};
		  }
  
		  props.partials[options.args[0]] = options.fn;
  
		  return ret;
		});
	  };
  
	  module.exports = exports['default'];
  
  /***/ }),
  /* 20 */
  /***/ (function(module, exports, __webpack_require__) {
  
	  'use strict';
  
	  exports.__esModule = true;
  
	  var _utils = __webpack_require__(5);
  
	  var logger = {
		methodMap: ['debug', 'info', 'warn', 'error'],
		level: 'info',
  
		// Maps a given level value to the `methodMap` indexes above.
		lookupLevel: function lookupLevel(level) {
		  if (typeof level === 'string') {
			var levelMap = _utils.indexOf(logger.methodMap, level.toLowerCase());
			if (levelMap >= 0) {
			  level = levelMap;
			} else {
			  level = parseInt(level, 10);
			}
		  }
  
		  return level;
		},
  
		// Can be overridden in the host environment
		log: function log(level) {
		  level = logger.lookupLevel(level);
  
		  if (typeof console !== 'undefined' && logger.lookupLevel(logger.level) <= level) {
			var method = logger.methodMap[level];
			if (!console[method]) {
			  // eslint-disable-line no-console
			  method = 'log';
			}
  
			for (var _len = arguments.length, message = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
			  message[_key - 1] = arguments[_key];
			}
  
			console[method].apply(console, message); // eslint-disable-line no-console
		  }
		}
	  };
  
	  exports['default'] = logger;
	  module.exports = exports['default'];
  
  /***/ }),
  /* 21 */
  /***/ (function(module, exports) {
  
	  // Build out our basic SafeString type
	  'use strict';
  
	  exports.__esModule = true;
	  function SafeString(string) {
		this.string = string;
	  }
  
	  SafeString.prototype.toString = SafeString.prototype.toHTML = function () {
		return '' + this.string;
	  };
  
	  exports['default'] = SafeString;
	  module.exports = exports['default'];
  
  /***/ }),
  /* 22 */
  /***/ (function(module, exports, __webpack_require__) {
  
	  'use strict';
  
	  var _Object$seal = __webpack_require__(23)['default'];
  
	  var _interopRequireWildcard = __webpack_require__(3)['default'];
  
	  var _interopRequireDefault = __webpack_require__(1)['default'];
  
	  exports.__esModule = true;
	  exports.checkRevision = checkRevision;
	  exports.template = template;
	  exports.wrapProgram = wrapProgram;
	  exports.resolvePartial = resolvePartial;
	  exports.invokePartial = invokePartial;
	  exports.noop = noop;
  
	  var _utils = __webpack_require__(5);
  
	  var Utils = _interopRequireWildcard(_utils);
  
	  var _exception = __webpack_require__(6);
  
	  var _exception2 = _interopRequireDefault(_exception);
  
	  var _base = __webpack_require__(4);
  
	  var _helpers = __webpack_require__(10);
  
	  function checkRevision(compilerInfo) {
		var compilerRevision = compilerInfo && compilerInfo[0] || 1,
			currentRevision = _base.COMPILER_REVISION;
  
		if (compilerRevision >= _base.LAST_COMPATIBLE_COMPILER_REVISION && compilerRevision <= _base.COMPILER_REVISION) {
		  return;
		}
  
		if (compilerRevision < _base.LAST_COMPATIBLE_COMPILER_REVISION) {
		  var runtimeVersions = _base.REVISION_CHANGES[currentRevision],
			  compilerVersions = _base.REVISION_CHANGES[compilerRevision];
		  throw new _exception2['default']('Template was precompiled with an older version of Handlebars than the current runtime. ' + 'Please update your precompiler to a newer version (' + runtimeVersions + ') or downgrade your runtime to an older version (' + compilerVersions + ').');
		} else {
		  // Use the embedded version info since the runtime doesn't know about this revision yet
		  throw new _exception2['default']('Template was precompiled with a newer version of Handlebars than the current runtime. ' + 'Please update your runtime to a newer version (' + compilerInfo[1] + ').');
		}
	  }
  
	  function template(templateSpec, env) {
  
		/* istanbul ignore next */
		if (!env) {
		  throw new _exception2['default']('No environment passed to template');
		}
		if (!templateSpec || !templateSpec.main) {
		  throw new _exception2['default']('Unknown template object: ' + typeof templateSpec);
		}
  
		templateSpec.main.decorator = templateSpec.main_d;
  
		// Note: Using env.VM references rather than local var references throughout this section to allow
		// for external users to override these as pseudo-supported APIs.
		env.VM.checkRevision(templateSpec.compiler);
  
		// backwards compatibility for precompiled templates with compiler-version 7 (<4.3.0)
		var templateWasPrecompiledWithCompilerV7 = templateSpec.compiler && templateSpec.compiler[0] === 7;
  
		function invokePartialWrapper(partial, context, options) {
		  if (options.hash) {
			context = Utils.extend({}, context, options.hash);
			if (options.ids) {
			  options.ids[0] = true;
			}
		  }
		  partial = env.VM.resolvePartial.call(this, partial, context, options);
  
		  var optionsWithHooks = Utils.extend({}, options, { hooks: this.hooks });
  
		  var result = env.VM.invokePartial.call(this, partial, context, optionsWithHooks);
  
		  if (result == null && env.compile) {
			options.partials[options.name] = env.compile(partial, templateSpec.compilerOptions, env);
			result = options.partials[options.name](context, optionsWithHooks);
		  }
		  if (result != null) {
			if (options.indent) {
			  var lines = result.split('\n');
			  for (var i = 0, l = lines.length; i < l; i++) {
				if (!lines[i] && i + 1 === l) {
				  break;
				}
  
				lines[i] = options.indent + lines[i];
			  }
			  result = lines.join('\n');
			}
			return result;
		  } else {
			throw new _exception2['default']('The partial ' + options.name + ' could not be compiled when running in runtime-only mode');
		  }
		}
  
		// Just add water
		var container = {
		  strict: function strict(obj, name) {
			if (!(name in obj)) {
			  throw new _exception2['default']('"' + name + '" not defined in ' + obj);
			}
			return obj[name];
		  },
		  lookup: function lookup(depths, name) {
			var len = depths.length;
			for (var i = 0; i < len; i++) {
			  if (depths[i] && depths[i][name] != null) {
				return depths[i][name];
			  }
			}
		  },
		  lambda: function lambda(current, context) {
			return typeof current === 'function' ? current.call(context) : current;
		  },
  
		  escapeExpression: Utils.escapeExpression,
		  invokePartial: invokePartialWrapper,
  
		  fn: function fn(i) {
			var ret = templateSpec[i];
			ret.decorator = templateSpec[i + '_d'];
			return ret;
		  },
  
		  programs: [],
		  program: function program(i, data, declaredBlockParams, blockParams, depths) {
			var programWrapper = this.programs[i],
				fn = this.fn(i);
			if (data || depths || blockParams || declaredBlockParams) {
			  programWrapper = wrapProgram(this, i, fn, data, declaredBlockParams, blockParams, depths);
			} else if (!programWrapper) {
			  programWrapper = this.programs[i] = wrapProgram(this, i, fn);
			}
			return programWrapper;
		  },
  
		  data: function data(value, depth) {
			while (value && depth--) {
			  value = value._parent;
			}
			return value;
		  },
		  // An empty object to use as replacement for null-contexts
		  nullContext: _Object$seal({}),
  
		  noop: env.VM.noop,
		  compilerInfo: templateSpec.compiler
		};
  
		function ret(context) {
		  var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
  
		  var data = options.data;
  
		  ret._setup(options);
		  if (!options.partial && templateSpec.useData) {
			data = initData(context, data);
		  }
		  var depths = undefined,
			  blockParams = templateSpec.useBlockParams ? [] : undefined;
		  if (templateSpec.useDepths) {
			if (options.depths) {
			  depths = context != options.depths[0] ? [context].concat(options.depths) : options.depths;
			} else {
			  depths = [context];
			}
		  }
  
		  function main(context /*, options*/) {
			return '' + templateSpec.main(container, context, container.helpers, container.partials, data, blockParams, depths);
		  }
		  main = executeDecorators(templateSpec.main, main, container, options.depths || [], data, blockParams);
		  return main(context, options);
		}
		ret.isTop = true;
  
		ret._setup = function (options) {
		  if (!options.partial) {
			container.helpers = Utils.extend({}, env.helpers, options.helpers);
  
			if (templateSpec.usePartial) {
			  container.partials = Utils.extend({}, env.partials, options.partials);
			}
			if (templateSpec.usePartial || templateSpec.useDecorators) {
			  container.decorators = Utils.extend({}, env.decorators, options.decorators);
			}
  
			container.hooks = {};
  
			var keepHelperInHelpers = options.allowCallsToHelperMissing || templateWasPrecompiledWithCompilerV7;
			_helpers.moveHelperToHooks(container, 'helperMissing', keepHelperInHelpers);
			_helpers.moveHelperToHooks(container, 'blockHelperMissing', keepHelperInHelpers);
		  } else {
			container.helpers = options.helpers;
			container.partials = options.partials;
			container.decorators = options.decorators;
			container.hooks = options.hooks;
		  }
		};
  
		ret._child = function (i, data, blockParams, depths) {
		  if (templateSpec.useBlockParams && !blockParams) {
			throw new _exception2['default']('must pass block params');
		  }
		  if (templateSpec.useDepths && !depths) {
			throw new _exception2['default']('must pass parent depths');
		  }
  
		  return wrapProgram(container, i, templateSpec[i], data, 0, blockParams, depths);
		};
		return ret;
	  }
  
	  function wrapProgram(container, i, fn, data, declaredBlockParams, blockParams, depths) {
		function prog(context) {
		  var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
  
		  var currentDepths = depths;
		  if (depths && context != depths[0] && !(context === container.nullContext && depths[0] === null)) {
			currentDepths = [context].concat(depths);
		  }
  
		  return fn(container, context, container.helpers, container.partials, options.data || data, blockParams && [options.blockParams].concat(blockParams), currentDepths);
		}
  
		prog = executeDecorators(fn, prog, container, depths, data, blockParams);
  
		prog.program = i;
		prog.depth = depths ? depths.length : 0;
		prog.blockParams = declaredBlockParams || 0;
		return prog;
	  }
  
	  /**
	   * This is currently part of the official API, therefore implementation details should not be changed.
	   */
  
	  function resolvePartial(partial, context, options) {
		if (!partial) {
		  if (options.name === '@partial-block') {
			partial = options.data['partial-block'];
		  } else {
			partial = options.partials[options.name];
		  }
		} else if (!partial.call && !options.name) {
		  // This is a dynamic partial that returned a string
		  options.name = partial;
		  partial = options.partials[partial];
		}
		return partial;
	  }
  
	  function invokePartial(partial, context, options) {
		// Use the current closure context to save the partial-block if this partial
		var currentPartialBlock = options.data && options.data['partial-block'];
		options.partial = true;
		if (options.ids) {
		  options.data.contextPath = options.ids[0] || options.data.contextPath;
		}
  
		var partialBlock = undefined;
		if (options.fn && options.fn !== noop) {
		  (function () {
			options.data = _base.createFrame(options.data);
			// Wrapper function to get access to currentPartialBlock from the closure
			var fn = options.fn;
			partialBlock = options.data['partial-block'] = function partialBlockWrapper(context) {
			  var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
  
			  // Restore the partial-block from the closure for the execution of the block
			  // i.e. the part inside the block of the partial call.
			  options.data = _base.createFrame(options.data);
			  options.data['partial-block'] = currentPartialBlock;
			  return fn(context, options);
			};
			if (fn.partials) {
			  options.partials = Utils.extend({}, options.partials, fn.partials);
			}
		  })();
		}
  
		if (partial === undefined && partialBlock) {
		  partial = partialBlock;
		}
  
		if (partial === undefined) {
		  throw new _exception2['default']('The partial ' + options.name + ' could not be found');
		} else if (partial instanceof Function) {
		  return partial(context, options);
		}
	  }
  
	  function noop() {
		return '';
	  }
  
	  function initData(context, data) {
		if (!data || !('root' in data)) {
		  data = data ? _base.createFrame(data) : {};
		  data.root = context;
		}
		return data;
	  }
  
	  function executeDecorators(fn, prog, container, depths, data, blockParams) {
		if (fn.decorator) {
		  var props = {};
		  prog = fn.decorator(prog, props, container, depths && depths[0], data, blockParams, depths);
		  Utils.extend(prog, props);
		}
		return prog;
	  }
  
  /***/ }),
  /* 23 */
  /***/ (function(module, exports, __webpack_require__) {
  
	  module.exports = { "default": __webpack_require__(24), __esModule: true };
  
  /***/ }),
  /* 24 */
  /***/ (function(module, exports, __webpack_require__) {
  
	  __webpack_require__(25);
	  module.exports = __webpack_require__(30).Object.seal;
  
  /***/ }),
  /* 25 */
  /***/ (function(module, exports, __webpack_require__) {
  
	  // 19.1.2.17 Object.seal(O)
	  var isObject = __webpack_require__(26);
  
	  __webpack_require__(27)('seal', function($seal){
		return function seal(it){
		  return $seal && isObject(it) ? $seal(it) : it;
		};
	  });
  
  /***/ }),
  /* 26 */
  /***/ (function(module, exports) {
  
	  module.exports = function(it){
		return typeof it === 'object' ? it !== null : typeof it === 'function';
	  };
  
  /***/ }),
  /* 27 */
  /***/ (function(module, exports, __webpack_require__) {
  
	  // most Object methods by ES6 should accept primitives
	  var $export = __webpack_require__(28)
		, core    = __webpack_require__(30)
		, fails   = __webpack_require__(33);
	  module.exports = function(KEY, exec){
		var fn  = (core.Object || {})[KEY] || Object[KEY]
		  , exp = {};
		exp[KEY] = exec(fn);
		$export($export.S + $export.F * fails(function(){ fn(1); }), 'Object', exp);
	  };
  
  /***/ }),
  /* 28 */
  /***/ (function(module, exports, __webpack_require__) {
  
	  var global    = __webpack_require__(29)
		, core      = __webpack_require__(30)
		, ctx       = __webpack_require__(31)
		, PROTOTYPE = 'prototype';
  
	  var $export = function(type, name, source){
		var IS_FORCED = type & $export.F
		  , IS_GLOBAL = type & $export.G
		  , IS_STATIC = type & $export.S
		  , IS_PROTO  = type & $export.P
		  , IS_BIND   = type & $export.B
		  , IS_WRAP   = type & $export.W
		  , exports   = IS_GLOBAL ? core : core[name] || (core[name] = {})
		  , target    = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE]
		  , key, own, out;
		if(IS_GLOBAL)source = name;
		for(key in source){
		  // contains in native
		  own = !IS_FORCED && target && key in target;
		  if(own && key in exports)continue;
		  // export native or passed
		  out = own ? target[key] : source[key];
		  // prevent global pollution for namespaces
		  exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
		  // bind timers to global for call from export context
		  : IS_BIND && own ? ctx(out, global)
		  // wrap global constructors for prevent change them in library
		  : IS_WRAP && target[key] == out ? (function(C){
			var F = function(param){
			  return this instanceof C ? new C(param) : C(param);
			};
			F[PROTOTYPE] = C[PROTOTYPE];
			return F;
		  // make static versions for prototype methods
		  })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
		  if(IS_PROTO)(exports[PROTOTYPE] || (exports[PROTOTYPE] = {}))[key] = out;
		}
	  };
	  // type bitmap
	  $export.F = 1;  // forced
	  $export.G = 2;  // global
	  $export.S = 4;  // static
	  $export.P = 8;  // proto
	  $export.B = 16; // bind
	  $export.W = 32; // wrap
	  module.exports = $export;
  
  /***/ }),
  /* 29 */
  /***/ (function(module, exports) {
  
	  // https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	  var global = module.exports = typeof window != 'undefined' && window.Math == Math
		? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
	  if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef
  
  /***/ }),
  /* 30 */
  /***/ (function(module, exports) {
  
	  var core = module.exports = {version: '1.2.6'};
	  if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef
  
  /***/ }),
  /* 31 */
  /***/ (function(module, exports, __webpack_require__) {
  
	  // optional / simple context binding
	  var aFunction = __webpack_require__(32);
	  module.exports = function(fn, that, length){
		aFunction(fn);
		if(that === undefined)return fn;
		switch(length){
		  case 1: return function(a){
			return fn.call(that, a);
		  };
		  case 2: return function(a, b){
			return fn.call(that, a, b);
		  };
		  case 3: return function(a, b, c){
			return fn.call(that, a, b, c);
		  };
		}
		return function(/* ...args */){
		  return fn.apply(that, arguments);
		};
	  };
  
  /***/ }),
  /* 32 */
  /***/ (function(module, exports) {
  
	  module.exports = function(it){
		if(typeof it != 'function')throw TypeError(it + ' is not a function!');
		return it;
	  };
  
  /***/ }),
  /* 33 */
  /***/ (function(module, exports) {
  
	  module.exports = function(exec){
		try {
		  return !!exec();
		} catch(e){
		  return true;
		}
	  };
  
  /***/ }),
  /* 34 */
  /***/ (function(module, exports) {
  
	  /* WEBPACK VAR INJECTION */(function(global) {/* global window */
	  'use strict';
  
	  exports.__esModule = true;
  
	  exports['default'] = function (Handlebars) {
		/* istanbul ignore next */
		var root = typeof global !== 'undefined' ? global : window,
			$Handlebars = root.Handlebars;
		/* istanbul ignore next */
		Handlebars.noConflict = function () {
		  if (root.Handlebars === Handlebars) {
			root.Handlebars = $Handlebars;
		  }
		  return Handlebars;
		};
	  };
  
	  module.exports = exports['default'];
	  /* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))
  
  /***/ }),
  /* 35 */
  /***/ (function(module, exports) {
  
	  'use strict';
  
	  exports.__esModule = true;
	  var AST = {
		// Public API used to evaluate derived attributes regarding AST nodes
		helpers: {
		  // a mustache is definitely a helper if:
		  // * it is an eligible helper, and
		  // * it has at least one parameter or hash segment
		  helperExpression: function helperExpression(node) {
			return node.type === 'SubExpression' || (node.type === 'MustacheStatement' || node.type === 'BlockStatement') && !!(node.params && node.params.length || node.hash);
		  },
  
		  scopedId: function scopedId(path) {
			return (/^\.|this\b/.test(path.original)
			);
		  },
  
		  // an ID is simple if it only has one part, and that part is not
		  // `..` or `this`.
		  simpleId: function simpleId(path) {
			return path.parts.length === 1 && !AST.helpers.scopedId(path) && !path.depth;
		  }
		}
	  };
  
	  // Must be exported as an object rather than the root of the module as the jison lexer
	  // must modify the object to operate properly.
	  exports['default'] = AST;
	  module.exports = exports['default'];
  
  /***/ }),
  /* 36 */
  /***/ (function(module, exports, __webpack_require__) {
  
	  'use strict';
  
	  var _interopRequireDefault = __webpack_require__(1)['default'];
  
	  var _interopRequireWildcard = __webpack_require__(3)['default'];
  
	  exports.__esModule = true;
	  exports.parse = parse;
  
	  var _parser = __webpack_require__(37);
  
	  var _parser2 = _interopRequireDefault(_parser);
  
	  var _whitespaceControl = __webpack_require__(38);
  
	  var _whitespaceControl2 = _interopRequireDefault(_whitespaceControl);
  
	  var _helpers = __webpack_require__(40);
  
	  var Helpers = _interopRequireWildcard(_helpers);
  
	  var _utils = __webpack_require__(5);
  
	  exports.parser = _parser2['default'];
  
	  var yy = {};
	  _utils.extend(yy, Helpers);
  
	  function parse(input, options) {
		// Just return if an already-compiled AST was passed in.
		if (input.type === 'Program') {
		  return input;
		}
  
		_parser2['default'].yy = yy;
  
		// Altering the shared object here, but this is ok as parser is a sync operation
		yy.locInfo = function (locInfo) {
		  return new yy.SourceLocation(options && options.srcName, locInfo);
		};
  
		var strip = new _whitespaceControl2['default'](options);
		return strip.accept(_parser2['default'].parse(input));
	  }
  
  /***/ }),
  /* 37 */
  /***/ (function(module, exports) {
  
	  // File ignored in coverage tests via setting in .istanbul.yml
	  /* Jison generated parser */
	  "use strict";
  
	  exports.__esModule = true;
	  var handlebars = (function () {
		  var parser = { trace: function trace() {},
			  yy: {},
			  symbols_: { "error": 2, "root": 3, "program": 4, "EOF": 5, "program_repetition0": 6, "statement": 7, "mustache": 8, "block": 9, "rawBlock": 10, "partial": 11, "partialBlock": 12, "content": 13, "COMMENT": 14, "CONTENT": 15, "openRawBlock": 16, "rawBlock_repetition_plus0": 17, "END_RAW_BLOCK": 18, "OPEN_RAW_BLOCK": 19, "helperName": 20, "openRawBlock_repetition0": 21, "openRawBlock_option0": 22, "CLOSE_RAW_BLOCK": 23, "openBlock": 24, "block_option0": 25, "closeBlock": 26, "openInverse": 27, "block_option1": 28, "OPEN_BLOCK": 29, "openBlock_repetition0": 30, "openBlock_option0": 31, "openBlock_option1": 32, "CLOSE": 33, "OPEN_INVERSE": 34, "openInverse_repetition0": 35, "openInverse_option0": 36, "openInverse_option1": 37, "openInverseChain": 38, "OPEN_INVERSE_CHAIN": 39, "openInverseChain_repetition0": 40, "openInverseChain_option0": 41, "openInverseChain_option1": 42, "inverseAndProgram": 43, "INVERSE": 44, "inverseChain": 45, "inverseChain_option0": 46, "OPEN_ENDBLOCK": 47, "OPEN": 48, "mustache_repetition0": 49, "mustache_option0": 50, "OPEN_UNESCAPED": 51, "mustache_repetition1": 52, "mustache_option1": 53, "CLOSE_UNESCAPED": 54, "OPEN_PARTIAL": 55, "partialName": 56, "partial_repetition0": 57, "partial_option0": 58, "openPartialBlock": 59, "OPEN_PARTIAL_BLOCK": 60, "openPartialBlock_repetition0": 61, "openPartialBlock_option0": 62, "param": 63, "sexpr": 64, "OPEN_SEXPR": 65, "sexpr_repetition0": 66, "sexpr_option0": 67, "CLOSE_SEXPR": 68, "hash": 69, "hash_repetition_plus0": 70, "hashSegment": 71, "ID": 72, "EQUALS": 73, "blockParams": 74, "OPEN_BLOCK_PARAMS": 75, "blockParams_repetition_plus0": 76, "CLOSE_BLOCK_PARAMS": 77, "path": 78, "dataName": 79, "STRING": 80, "NUMBER": 81, "BOOLEAN": 82, "UNDEFINED": 83, "NULL": 84, "DATA": 85, "pathSegments": 86, "SEP": 87, "$accept": 0, "$end": 1 },
			  terminals_: { 2: "error", 5: "EOF", 14: "COMMENT", 15: "CONTENT", 18: "END_RAW_BLOCK", 19: "OPEN_RAW_BLOCK", 23: "CLOSE_RAW_BLOCK", 29: "OPEN_BLOCK", 33: "CLOSE", 34: "OPEN_INVERSE", 39: "OPEN_INVERSE_CHAIN", 44: "INVERSE", 47: "OPEN_ENDBLOCK", 48: "OPEN", 51: "OPEN_UNESCAPED", 54: "CLOSE_UNESCAPED", 55: "OPEN_PARTIAL", 60: "OPEN_PARTIAL_BLOCK", 65: "OPEN_SEXPR", 68: "CLOSE_SEXPR", 72: "ID", 73: "EQUALS", 75: "OPEN_BLOCK_PARAMS", 77: "CLOSE_BLOCK_PARAMS", 80: "STRING", 81: "NUMBER", 82: "BOOLEAN", 83: "UNDEFINED", 84: "NULL", 85: "DATA", 87: "SEP" },
			  productions_: [0, [3, 2], [4, 1], [7, 1], [7, 1], [7, 1], [7, 1], [7, 1], [7, 1], [7, 1], [13, 1], [10, 3], [16, 5], [9, 4], [9, 4], [24, 6], [27, 6], [38, 6], [43, 2], [45, 3], [45, 1], [26, 3], [8, 5], [8, 5], [11, 5], [12, 3], [59, 5], [63, 1], [63, 1], [64, 5], [69, 1], [71, 3], [74, 3], [20, 1], [20, 1], [20, 1], [20, 1], [20, 1], [20, 1], [20, 1], [56, 1], [56, 1], [79, 2], [78, 1], [86, 3], [86, 1], [6, 0], [6, 2], [17, 1], [17, 2], [21, 0], [21, 2], [22, 0], [22, 1], [25, 0], [25, 1], [28, 0], [28, 1], [30, 0], [30, 2], [31, 0], [31, 1], [32, 0], [32, 1], [35, 0], [35, 2], [36, 0], [36, 1], [37, 0], [37, 1], [40, 0], [40, 2], [41, 0], [41, 1], [42, 0], [42, 1], [46, 0], [46, 1], [49, 0], [49, 2], [50, 0], [50, 1], [52, 0], [52, 2], [53, 0], [53, 1], [57, 0], [57, 2], [58, 0], [58, 1], [61, 0], [61, 2], [62, 0], [62, 1], [66, 0], [66, 2], [67, 0], [67, 1], [70, 1], [70, 2], [76, 1], [76, 2]],
			  performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate, $$, _$) {
  
				  var $0 = $$.length - 1;
				  switch (yystate) {
					  case 1:
						  return $$[$0 - 1];
						  break;
					  case 2:
						  this.$ = yy.prepareProgram($$[$0]);
						  break;
					  case 3:
						  this.$ = $$[$0];
						  break;
					  case 4:
						  this.$ = $$[$0];
						  break;
					  case 5:
						  this.$ = $$[$0];
						  break;
					  case 6:
						  this.$ = $$[$0];
						  break;
					  case 7:
						  this.$ = $$[$0];
						  break;
					  case 8:
						  this.$ = $$[$0];
						  break;
					  case 9:
						  this.$ = {
							  type: 'CommentStatement',
							  value: yy.stripComment($$[$0]),
							  strip: yy.stripFlags($$[$0], $$[$0]),
							  loc: yy.locInfo(this._$)
						  };
  
						  break;
					  case 10:
						  this.$ = {
							  type: 'ContentStatement',
							  original: $$[$0],
							  value: $$[$0],
							  loc: yy.locInfo(this._$)
						  };
  
						  break;
					  case 11:
						  this.$ = yy.prepareRawBlock($$[$0 - 2], $$[$0 - 1], $$[$0], this._$);
						  break;
					  case 12:
						  this.$ = { path: $$[$0 - 3], params: $$[$0 - 2], hash: $$[$0 - 1] };
						  break;
					  case 13:
						  this.$ = yy.prepareBlock($$[$0 - 3], $$[$0 - 2], $$[$0 - 1], $$[$0], false, this._$);
						  break;
					  case 14:
						  this.$ = yy.prepareBlock($$[$0 - 3], $$[$0 - 2], $$[$0 - 1], $$[$0], true, this._$);
						  break;
					  case 15:
						  this.$ = { open: $$[$0 - 5], path: $$[$0 - 4], params: $$[$0 - 3], hash: $$[$0 - 2], blockParams: $$[$0 - 1], strip: yy.stripFlags($$[$0 - 5], $$[$0]) };
						  break;
					  case 16:
						  this.$ = { path: $$[$0 - 4], params: $$[$0 - 3], hash: $$[$0 - 2], blockParams: $$[$0 - 1], strip: yy.stripFlags($$[$0 - 5], $$[$0]) };
						  break;
					  case 17:
						  this.$ = { path: $$[$0 - 4], params: $$[$0 - 3], hash: $$[$0 - 2], blockParams: $$[$0 - 1], strip: yy.stripFlags($$[$0 - 5], $$[$0]) };
						  break;
					  case 18:
						  this.$ = { strip: yy.stripFlags($$[$0 - 1], $$[$0 - 1]), program: $$[$0] };
						  break;
					  case 19:
						  var inverse = yy.prepareBlock($$[$0 - 2], $$[$0 - 1], $$[$0], $$[$0], false, this._$),
							  program = yy.prepareProgram([inverse], $$[$0 - 1].loc);
						  program.chained = true;
  
						  this.$ = { strip: $$[$0 - 2].strip, program: program, chain: true };
  
						  break;
					  case 20:
						  this.$ = $$[$0];
						  break;
					  case 21:
						  this.$ = { path: $$[$0 - 1], strip: yy.stripFlags($$[$0 - 2], $$[$0]) };
						  break;
					  case 22:
						  this.$ = yy.prepareMustache($$[$0 - 3], $$[$0 - 2], $$[$0 - 1], $$[$0 - 4], yy.stripFlags($$[$0 - 4], $$[$0]), this._$);
						  break;
					  case 23:
						  this.$ = yy.prepareMustache($$[$0 - 3], $$[$0 - 2], $$[$0 - 1], $$[$0 - 4], yy.stripFlags($$[$0 - 4], $$[$0]), this._$);
						  break;
					  case 24:
						  this.$ = {
							  type: 'PartialStatement',
							  name: $$[$0 - 3],
							  params: $$[$0 - 2],
							  hash: $$[$0 - 1],
							  indent: '',
							  strip: yy.stripFlags($$[$0 - 4], $$[$0]),
							  loc: yy.locInfo(this._$)
						  };
  
						  break;
					  case 25:
						  this.$ = yy.preparePartialBlock($$[$0 - 2], $$[$0 - 1], $$[$0], this._$);
						  break;
					  case 26:
						  this.$ = { path: $$[$0 - 3], params: $$[$0 - 2], hash: $$[$0 - 1], strip: yy.stripFlags($$[$0 - 4], $$[$0]) };
						  break;
					  case 27:
						  this.$ = $$[$0];
						  break;
					  case 28:
						  this.$ = $$[$0];
						  break;
					  case 29:
						  this.$ = {
							  type: 'SubExpression',
							  path: $$[$0 - 3],
							  params: $$[$0 - 2],
							  hash: $$[$0 - 1],
							  loc: yy.locInfo(this._$)
						  };
  
						  break;
					  case 30:
						  this.$ = { type: 'Hash', pairs: $$[$0], loc: yy.locInfo(this._$) };
						  break;
					  case 31:
						  this.$ = { type: 'HashPair', key: yy.id($$[$0 - 2]), value: $$[$0], loc: yy.locInfo(this._$) };
						  break;
					  case 32:
						  this.$ = yy.id($$[$0 - 1]);
						  break;
					  case 33:
						  this.$ = $$[$0];
						  break;
					  case 34:
						  this.$ = $$[$0];
						  break;
					  case 35:
						  this.$ = { type: 'StringLiteral', value: $$[$0], original: $$[$0], loc: yy.locInfo(this._$) };
						  break;
					  case 36:
						  this.$ = { type: 'NumberLiteral', value: Number($$[$0]), original: Number($$[$0]), loc: yy.locInfo(this._$) };
						  break;
					  case 37:
						  this.$ = { type: 'BooleanLiteral', value: $$[$0] === 'true', original: $$[$0] === 'true', loc: yy.locInfo(this._$) };
						  break;
					  case 38:
						  this.$ = { type: 'UndefinedLiteral', original: undefined, value: undefined, loc: yy.locInfo(this._$) };
						  break;
					  case 39:
						  this.$ = { type: 'NullLiteral', original: null, value: null, loc: yy.locInfo(this._$) };
						  break;
					  case 40:
						  this.$ = $$[$0];
						  break;
					  case 41:
						  this.$ = $$[$0];
						  break;
					  case 42:
						  this.$ = yy.preparePath(true, $$[$0], this._$);
						  break;
					  case 43:
						  this.$ = yy.preparePath(false, $$[$0], this._$);
						  break;
					  case 44:
						  $$[$0 - 2].push({ part: yy.id($$[$0]), original: $$[$0], separator: $$[$0 - 1] });this.$ = $$[$0 - 2];
						  break;
					  case 45:
						  this.$ = [{ part: yy.id($$[$0]), original: $$[$0] }];
						  break;
					  case 46:
						  this.$ = [];
						  break;
					  case 47:
						  $$[$0 - 1].push($$[$0]);
						  break;
					  case 48:
						  this.$ = [$$[$0]];
						  break;
					  case 49:
						  $$[$0 - 1].push($$[$0]);
						  break;
					  case 50:
						  this.$ = [];
						  break;
					  case 51:
						  $$[$0 - 1].push($$[$0]);
						  break;
					  case 58:
						  this.$ = [];
						  break;
					  case 59:
						  $$[$0 - 1].push($$[$0]);
						  break;
					  case 64:
						  this.$ = [];
						  break;
					  case 65:
						  $$[$0 - 1].push($$[$0]);
						  break;
					  case 70:
						  this.$ = [];
						  break;
					  case 71:
						  $$[$0 - 1].push($$[$0]);
						  break;
					  case 78:
						  this.$ = [];
						  break;
					  case 79:
						  $$[$0 - 1].push($$[$0]);
						  break;
					  case 82:
						  this.$ = [];
						  break;
					  case 83:
						  $$[$0 - 1].push($$[$0]);
						  break;
					  case 86:
						  this.$ = [];
						  break;
					  case 87:
						  $$[$0 - 1].push($$[$0]);
						  break;
					  case 90:
						  this.$ = [];
						  break;
					  case 91:
						  $$[$0 - 1].push($$[$0]);
						  break;
					  case 94:
						  this.$ = [];
						  break;
					  case 95:
						  $$[$0 - 1].push($$[$0]);
						  break;
					  case 98:
						  this.$ = [$$[$0]];
						  break;
					  case 99:
						  $$[$0 - 1].push($$[$0]);
						  break;
					  case 100:
						  this.$ = [$$[$0]];
						  break;
					  case 101:
						  $$[$0 - 1].push($$[$0]);
						  break;
				  }
			  },
			  table: [{ 3: 1, 4: 2, 5: [2, 46], 6: 3, 14: [2, 46], 15: [2, 46], 19: [2, 46], 29: [2, 46], 34: [2, 46], 48: [2, 46], 51: [2, 46], 55: [2, 46], 60: [2, 46] }, { 1: [3] }, { 5: [1, 4] }, { 5: [2, 2], 7: 5, 8: 6, 9: 7, 10: 8, 11: 9, 12: 10, 13: 11, 14: [1, 12], 15: [1, 20], 16: 17, 19: [1, 23], 24: 15, 27: 16, 29: [1, 21], 34: [1, 22], 39: [2, 2], 44: [2, 2], 47: [2, 2], 48: [1, 13], 51: [1, 14], 55: [1, 18], 59: 19, 60: [1, 24] }, { 1: [2, 1] }, { 5: [2, 47], 14: [2, 47], 15: [2, 47], 19: [2, 47], 29: [2, 47], 34: [2, 47], 39: [2, 47], 44: [2, 47], 47: [2, 47], 48: [2, 47], 51: [2, 47], 55: [2, 47], 60: [2, 47] }, { 5: [2, 3], 14: [2, 3], 15: [2, 3], 19: [2, 3], 29: [2, 3], 34: [2, 3], 39: [2, 3], 44: [2, 3], 47: [2, 3], 48: [2, 3], 51: [2, 3], 55: [2, 3], 60: [2, 3] }, { 5: [2, 4], 14: [2, 4], 15: [2, 4], 19: [2, 4], 29: [2, 4], 34: [2, 4], 39: [2, 4], 44: [2, 4], 47: [2, 4], 48: [2, 4], 51: [2, 4], 55: [2, 4], 60: [2, 4] }, { 5: [2, 5], 14: [2, 5], 15: [2, 5], 19: [2, 5], 29: [2, 5], 34: [2, 5], 39: [2, 5], 44: [2, 5], 47: [2, 5], 48: [2, 5], 51: [2, 5], 55: [2, 5], 60: [2, 5] }, { 5: [2, 6], 14: [2, 6], 15: [2, 6], 19: [2, 6], 29: [2, 6], 34: [2, 6], 39: [2, 6], 44: [2, 6], 47: [2, 6], 48: [2, 6], 51: [2, 6], 55: [2, 6], 60: [2, 6] }, { 5: [2, 7], 14: [2, 7], 15: [2, 7], 19: [2, 7], 29: [2, 7], 34: [2, 7], 39: [2, 7], 44: [2, 7], 47: [2, 7], 48: [2, 7], 51: [2, 7], 55: [2, 7], 60: [2, 7] }, { 5: [2, 8], 14: [2, 8], 15: [2, 8], 19: [2, 8], 29: [2, 8], 34: [2, 8], 39: [2, 8], 44: [2, 8], 47: [2, 8], 48: [2, 8], 51: [2, 8], 55: [2, 8], 60: [2, 8] }, { 5: [2, 9], 14: [2, 9], 15: [2, 9], 19: [2, 9], 29: [2, 9], 34: [2, 9], 39: [2, 9], 44: [2, 9], 47: [2, 9], 48: [2, 9], 51: [2, 9], 55: [2, 9], 60: [2, 9] }, { 20: 25, 72: [1, 35], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 20: 36, 72: [1, 35], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 4: 37, 6: 3, 14: [2, 46], 15: [2, 46], 19: [2, 46], 29: [2, 46], 34: [2, 46], 39: [2, 46], 44: [2, 46], 47: [2, 46], 48: [2, 46], 51: [2, 46], 55: [2, 46], 60: [2, 46] }, { 4: 38, 6: 3, 14: [2, 46], 15: [2, 46], 19: [2, 46], 29: [2, 46], 34: [2, 46], 44: [2, 46], 47: [2, 46], 48: [2, 46], 51: [2, 46], 55: [2, 46], 60: [2, 46] }, { 13: 40, 15: [1, 20], 17: 39 }, { 20: 42, 56: 41, 64: 43, 65: [1, 44], 72: [1, 35], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 4: 45, 6: 3, 14: [2, 46], 15: [2, 46], 19: [2, 46], 29: [2, 46], 34: [2, 46], 47: [2, 46], 48: [2, 46], 51: [2, 46], 55: [2, 46], 60: [2, 46] }, { 5: [2, 10], 14: [2, 10], 15: [2, 10], 18: [2, 10], 19: [2, 10], 29: [2, 10], 34: [2, 10], 39: [2, 10], 44: [2, 10], 47: [2, 10], 48: [2, 10], 51: [2, 10], 55: [2, 10], 60: [2, 10] }, { 20: 46, 72: [1, 35], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 20: 47, 72: [1, 35], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 20: 48, 72: [1, 35], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 20: 42, 56: 49, 64: 43, 65: [1, 44], 72: [1, 35], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 33: [2, 78], 49: 50, 65: [2, 78], 72: [2, 78], 80: [2, 78], 81: [2, 78], 82: [2, 78], 83: [2, 78], 84: [2, 78], 85: [2, 78] }, { 23: [2, 33], 33: [2, 33], 54: [2, 33], 65: [2, 33], 68: [2, 33], 72: [2, 33], 75: [2, 33], 80: [2, 33], 81: [2, 33], 82: [2, 33], 83: [2, 33], 84: [2, 33], 85: [2, 33] }, { 23: [2, 34], 33: [2, 34], 54: [2, 34], 65: [2, 34], 68: [2, 34], 72: [2, 34], 75: [2, 34], 80: [2, 34], 81: [2, 34], 82: [2, 34], 83: [2, 34], 84: [2, 34], 85: [2, 34] }, { 23: [2, 35], 33: [2, 35], 54: [2, 35], 65: [2, 35], 68: [2, 35], 72: [2, 35], 75: [2, 35], 80: [2, 35], 81: [2, 35], 82: [2, 35], 83: [2, 35], 84: [2, 35], 85: [2, 35] }, { 23: [2, 36], 33: [2, 36], 54: [2, 36], 65: [2, 36], 68: [2, 36], 72: [2, 36], 75: [2, 36], 80: [2, 36], 81: [2, 36], 82: [2, 36], 83: [2, 36], 84: [2, 36], 85: [2, 36] }, { 23: [2, 37], 33: [2, 37], 54: [2, 37], 65: [2, 37], 68: [2, 37], 72: [2, 37], 75: [2, 37], 80: [2, 37], 81: [2, 37], 82: [2, 37], 83: [2, 37], 84: [2, 37], 85: [2, 37] }, { 23: [2, 38], 33: [2, 38], 54: [2, 38], 65: [2, 38], 68: [2, 38], 72: [2, 38], 75: [2, 38], 80: [2, 38], 81: [2, 38], 82: [2, 38], 83: [2, 38], 84: [2, 38], 85: [2, 38] }, { 23: [2, 39], 33: [2, 39], 54: [2, 39], 65: [2, 39], 68: [2, 39], 72: [2, 39], 75: [2, 39], 80: [2, 39], 81: [2, 39], 82: [2, 39], 83: [2, 39], 84: [2, 39], 85: [2, 39] }, { 23: [2, 43], 33: [2, 43], 54: [2, 43], 65: [2, 43], 68: [2, 43], 72: [2, 43], 75: [2, 43], 80: [2, 43], 81: [2, 43], 82: [2, 43], 83: [2, 43], 84: [2, 43], 85: [2, 43], 87: [1, 51] }, { 72: [1, 35], 86: 52 }, { 23: [2, 45], 33: [2, 45], 54: [2, 45], 65: [2, 45], 68: [2, 45], 72: [2, 45], 75: [2, 45], 80: [2, 45], 81: [2, 45], 82: [2, 45], 83: [2, 45], 84: [2, 45], 85: [2, 45], 87: [2, 45] }, { 52: 53, 54: [2, 82], 65: [2, 82], 72: [2, 82], 80: [2, 82], 81: [2, 82], 82: [2, 82], 83: [2, 82], 84: [2, 82], 85: [2, 82] }, { 25: 54, 38: 56, 39: [1, 58], 43: 57, 44: [1, 59], 45: 55, 47: [2, 54] }, { 28: 60, 43: 61, 44: [1, 59], 47: [2, 56] }, { 13: 63, 15: [1, 20], 18: [1, 62] }, { 15: [2, 48], 18: [2, 48] }, { 33: [2, 86], 57: 64, 65: [2, 86], 72: [2, 86], 80: [2, 86], 81: [2, 86], 82: [2, 86], 83: [2, 86], 84: [2, 86], 85: [2, 86] }, { 33: [2, 40], 65: [2, 40], 72: [2, 40], 80: [2, 40], 81: [2, 40], 82: [2, 40], 83: [2, 40], 84: [2, 40], 85: [2, 40] }, { 33: [2, 41], 65: [2, 41], 72: [2, 41], 80: [2, 41], 81: [2, 41], 82: [2, 41], 83: [2, 41], 84: [2, 41], 85: [2, 41] }, { 20: 65, 72: [1, 35], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 26: 66, 47: [1, 67] }, { 30: 68, 33: [2, 58], 65: [2, 58], 72: [2, 58], 75: [2, 58], 80: [2, 58], 81: [2, 58], 82: [2, 58], 83: [2, 58], 84: [2, 58], 85: [2, 58] }, { 33: [2, 64], 35: 69, 65: [2, 64], 72: [2, 64], 75: [2, 64], 80: [2, 64], 81: [2, 64], 82: [2, 64], 83: [2, 64], 84: [2, 64], 85: [2, 64] }, { 21: 70, 23: [2, 50], 65: [2, 50], 72: [2, 50], 80: [2, 50], 81: [2, 50], 82: [2, 50], 83: [2, 50], 84: [2, 50], 85: [2, 50] }, { 33: [2, 90], 61: 71, 65: [2, 90], 72: [2, 90], 80: [2, 90], 81: [2, 90], 82: [2, 90], 83: [2, 90], 84: [2, 90], 85: [2, 90] }, { 20: 75, 33: [2, 80], 50: 72, 63: 73, 64: 76, 65: [1, 44], 69: 74, 70: 77, 71: 78, 72: [1, 79], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 72: [1, 80] }, { 23: [2, 42], 33: [2, 42], 54: [2, 42], 65: [2, 42], 68: [2, 42], 72: [2, 42], 75: [2, 42], 80: [2, 42], 81: [2, 42], 82: [2, 42], 83: [2, 42], 84: [2, 42], 85: [2, 42], 87: [1, 51] }, { 20: 75, 53: 81, 54: [2, 84], 63: 82, 64: 76, 65: [1, 44], 69: 83, 70: 77, 71: 78, 72: [1, 79], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 26: 84, 47: [1, 67] }, { 47: [2, 55] }, { 4: 85, 6: 3, 14: [2, 46], 15: [2, 46], 19: [2, 46], 29: [2, 46], 34: [2, 46], 39: [2, 46], 44: [2, 46], 47: [2, 46], 48: [2, 46], 51: [2, 46], 55: [2, 46], 60: [2, 46] }, { 47: [2, 20] }, { 20: 86, 72: [1, 35], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 4: 87, 6: 3, 14: [2, 46], 15: [2, 46], 19: [2, 46], 29: [2, 46], 34: [2, 46], 47: [2, 46], 48: [2, 46], 51: [2, 46], 55: [2, 46], 60: [2, 46] }, { 26: 88, 47: [1, 67] }, { 47: [2, 57] }, { 5: [2, 11], 14: [2, 11], 15: [2, 11], 19: [2, 11], 29: [2, 11], 34: [2, 11], 39: [2, 11], 44: [2, 11], 47: [2, 11], 48: [2, 11], 51: [2, 11], 55: [2, 11], 60: [2, 11] }, { 15: [2, 49], 18: [2, 49] }, { 20: 75, 33: [2, 88], 58: 89, 63: 90, 64: 76, 65: [1, 44], 69: 91, 70: 77, 71: 78, 72: [1, 79], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 65: [2, 94], 66: 92, 68: [2, 94], 72: [2, 94], 80: [2, 94], 81: [2, 94], 82: [2, 94], 83: [2, 94], 84: [2, 94], 85: [2, 94] }, { 5: [2, 25], 14: [2, 25], 15: [2, 25], 19: [2, 25], 29: [2, 25], 34: [2, 25], 39: [2, 25], 44: [2, 25], 47: [2, 25], 48: [2, 25], 51: [2, 25], 55: [2, 25], 60: [2, 25] }, { 20: 93, 72: [1, 35], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 20: 75, 31: 94, 33: [2, 60], 63: 95, 64: 76, 65: [1, 44], 69: 96, 70: 77, 71: 78, 72: [1, 79], 75: [2, 60], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 20: 75, 33: [2, 66], 36: 97, 63: 98, 64: 76, 65: [1, 44], 69: 99, 70: 77, 71: 78, 72: [1, 79], 75: [2, 66], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 20: 75, 22: 100, 23: [2, 52], 63: 101, 64: 76, 65: [1, 44], 69: 102, 70: 77, 71: 78, 72: [1, 79], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 20: 75, 33: [2, 92], 62: 103, 63: 104, 64: 76, 65: [1, 44], 69: 105, 70: 77, 71: 78, 72: [1, 79], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 33: [1, 106] }, { 33: [2, 79], 65: [2, 79], 72: [2, 79], 80: [2, 79], 81: [2, 79], 82: [2, 79], 83: [2, 79], 84: [2, 79], 85: [2, 79] }, { 33: [2, 81] }, { 23: [2, 27], 33: [2, 27], 54: [2, 27], 65: [2, 27], 68: [2, 27], 72: [2, 27], 75: [2, 27], 80: [2, 27], 81: [2, 27], 82: [2, 27], 83: [2, 27], 84: [2, 27], 85: [2, 27] }, { 23: [2, 28], 33: [2, 28], 54: [2, 28], 65: [2, 28], 68: [2, 28], 72: [2, 28], 75: [2, 28], 80: [2, 28], 81: [2, 28], 82: [2, 28], 83: [2, 28], 84: [2, 28], 85: [2, 28] }, { 23: [2, 30], 33: [2, 30], 54: [2, 30], 68: [2, 30], 71: 107, 72: [1, 108], 75: [2, 30] }, { 23: [2, 98], 33: [2, 98], 54: [2, 98], 68: [2, 98], 72: [2, 98], 75: [2, 98] }, { 23: [2, 45], 33: [2, 45], 54: [2, 45], 65: [2, 45], 68: [2, 45], 72: [2, 45], 73: [1, 109], 75: [2, 45], 80: [2, 45], 81: [2, 45], 82: [2, 45], 83: [2, 45], 84: [2, 45], 85: [2, 45], 87: [2, 45] }, { 23: [2, 44], 33: [2, 44], 54: [2, 44], 65: [2, 44], 68: [2, 44], 72: [2, 44], 75: [2, 44], 80: [2, 44], 81: [2, 44], 82: [2, 44], 83: [2, 44], 84: [2, 44], 85: [2, 44], 87: [2, 44] }, { 54: [1, 110] }, { 54: [2, 83], 65: [2, 83], 72: [2, 83], 80: [2, 83], 81: [2, 83], 82: [2, 83], 83: [2, 83], 84: [2, 83], 85: [2, 83] }, { 54: [2, 85] }, { 5: [2, 13], 14: [2, 13], 15: [2, 13], 19: [2, 13], 29: [2, 13], 34: [2, 13], 39: [2, 13], 44: [2, 13], 47: [2, 13], 48: [2, 13], 51: [2, 13], 55: [2, 13], 60: [2, 13] }, { 38: 56, 39: [1, 58], 43: 57, 44: [1, 59], 45: 112, 46: 111, 47: [2, 76] }, { 33: [2, 70], 40: 113, 65: [2, 70], 72: [2, 70], 75: [2, 70], 80: [2, 70], 81: [2, 70], 82: [2, 70], 83: [2, 70], 84: [2, 70], 85: [2, 70] }, { 47: [2, 18] }, { 5: [2, 14], 14: [2, 14], 15: [2, 14], 19: [2, 14], 29: [2, 14], 34: [2, 14], 39: [2, 14], 44: [2, 14], 47: [2, 14], 48: [2, 14], 51: [2, 14], 55: [2, 14], 60: [2, 14] }, { 33: [1, 114] }, { 33: [2, 87], 65: [2, 87], 72: [2, 87], 80: [2, 87], 81: [2, 87], 82: [2, 87], 83: [2, 87], 84: [2, 87], 85: [2, 87] }, { 33: [2, 89] }, { 20: 75, 63: 116, 64: 76, 65: [1, 44], 67: 115, 68: [2, 96], 69: 117, 70: 77, 71: 78, 72: [1, 79], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 33: [1, 118] }, { 32: 119, 33: [2, 62], 74: 120, 75: [1, 121] }, { 33: [2, 59], 65: [2, 59], 72: [2, 59], 75: [2, 59], 80: [2, 59], 81: [2, 59], 82: [2, 59], 83: [2, 59], 84: [2, 59], 85: [2, 59] }, { 33: [2, 61], 75: [2, 61] }, { 33: [2, 68], 37: 122, 74: 123, 75: [1, 121] }, { 33: [2, 65], 65: [2, 65], 72: [2, 65], 75: [2, 65], 80: [2, 65], 81: [2, 65], 82: [2, 65], 83: [2, 65], 84: [2, 65], 85: [2, 65] }, { 33: [2, 67], 75: [2, 67] }, { 23: [1, 124] }, { 23: [2, 51], 65: [2, 51], 72: [2, 51], 80: [2, 51], 81: [2, 51], 82: [2, 51], 83: [2, 51], 84: [2, 51], 85: [2, 51] }, { 23: [2, 53] }, { 33: [1, 125] }, { 33: [2, 91], 65: [2, 91], 72: [2, 91], 80: [2, 91], 81: [2, 91], 82: [2, 91], 83: [2, 91], 84: [2, 91], 85: [2, 91] }, { 33: [2, 93] }, { 5: [2, 22], 14: [2, 22], 15: [2, 22], 19: [2, 22], 29: [2, 22], 34: [2, 22], 39: [2, 22], 44: [2, 22], 47: [2, 22], 48: [2, 22], 51: [2, 22], 55: [2, 22], 60: [2, 22] }, { 23: [2, 99], 33: [2, 99], 54: [2, 99], 68: [2, 99], 72: [2, 99], 75: [2, 99] }, { 73: [1, 109] }, { 20: 75, 63: 126, 64: 76, 65: [1, 44], 72: [1, 35], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 5: [2, 23], 14: [2, 23], 15: [2, 23], 19: [2, 23], 29: [2, 23], 34: [2, 23], 39: [2, 23], 44: [2, 23], 47: [2, 23], 48: [2, 23], 51: [2, 23], 55: [2, 23], 60: [2, 23] }, { 47: [2, 19] }, { 47: [2, 77] }, { 20: 75, 33: [2, 72], 41: 127, 63: 128, 64: 76, 65: [1, 44], 69: 129, 70: 77, 71: 78, 72: [1, 79], 75: [2, 72], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 5: [2, 24], 14: [2, 24], 15: [2, 24], 19: [2, 24], 29: [2, 24], 34: [2, 24], 39: [2, 24], 44: [2, 24], 47: [2, 24], 48: [2, 24], 51: [2, 24], 55: [2, 24], 60: [2, 24] }, { 68: [1, 130] }, { 65: [2, 95], 68: [2, 95], 72: [2, 95], 80: [2, 95], 81: [2, 95], 82: [2, 95], 83: [2, 95], 84: [2, 95], 85: [2, 95] }, { 68: [2, 97] }, { 5: [2, 21], 14: [2, 21], 15: [2, 21], 19: [2, 21], 29: [2, 21], 34: [2, 21], 39: [2, 21], 44: [2, 21], 47: [2, 21], 48: [2, 21], 51: [2, 21], 55: [2, 21], 60: [2, 21] }, { 33: [1, 131] }, { 33: [2, 63] }, { 72: [1, 133], 76: 132 }, { 33: [1, 134] }, { 33: [2, 69] }, { 15: [2, 12] }, { 14: [2, 26], 15: [2, 26], 19: [2, 26], 29: [2, 26], 34: [2, 26], 47: [2, 26], 48: [2, 26], 51: [2, 26], 55: [2, 26], 60: [2, 26] }, { 23: [2, 31], 33: [2, 31], 54: [2, 31], 68: [2, 31], 72: [2, 31], 75: [2, 31] }, { 33: [2, 74], 42: 135, 74: 136, 75: [1, 121] }, { 33: [2, 71], 65: [2, 71], 72: [2, 71], 75: [2, 71], 80: [2, 71], 81: [2, 71], 82: [2, 71], 83: [2, 71], 84: [2, 71], 85: [2, 71] }, { 33: [2, 73], 75: [2, 73] }, { 23: [2, 29], 33: [2, 29], 54: [2, 29], 65: [2, 29], 68: [2, 29], 72: [2, 29], 75: [2, 29], 80: [2, 29], 81: [2, 29], 82: [2, 29], 83: [2, 29], 84: [2, 29], 85: [2, 29] }, { 14: [2, 15], 15: [2, 15], 19: [2, 15], 29: [2, 15], 34: [2, 15], 39: [2, 15], 44: [2, 15], 47: [2, 15], 48: [2, 15], 51: [2, 15], 55: [2, 15], 60: [2, 15] }, { 72: [1, 138], 77: [1, 137] }, { 72: [2, 100], 77: [2, 100] }, { 14: [2, 16], 15: [2, 16], 19: [2, 16], 29: [2, 16], 34: [2, 16], 44: [2, 16], 47: [2, 16], 48: [2, 16], 51: [2, 16], 55: [2, 16], 60: [2, 16] }, { 33: [1, 139] }, { 33: [2, 75] }, { 33: [2, 32] }, { 72: [2, 101], 77: [2, 101] }, { 14: [2, 17], 15: [2, 17], 19: [2, 17], 29: [2, 17], 34: [2, 17], 39: [2, 17], 44: [2, 17], 47: [2, 17], 48: [2, 17], 51: [2, 17], 55: [2, 17], 60: [2, 17] }],
			  defaultActions: { 4: [2, 1], 55: [2, 55], 57: [2, 20], 61: [2, 57], 74: [2, 81], 83: [2, 85], 87: [2, 18], 91: [2, 89], 102: [2, 53], 105: [2, 93], 111: [2, 19], 112: [2, 77], 117: [2, 97], 120: [2, 63], 123: [2, 69], 124: [2, 12], 136: [2, 75], 137: [2, 32] },
			  parseError: function parseError(str, hash) {
				  throw new Error(str);
			  },
			  parse: function parse(input) {
				  var self = this,
					  stack = [0],
					  vstack = [null],
					  lstack = [],
					  table = this.table,
					  yytext = "",
					  yylineno = 0,
					  yyleng = 0,
					  recovering = 0,
					  TERROR = 2,
					  EOF = 1;
				  this.lexer.setInput(input);
				  this.lexer.yy = this.yy;
				  this.yy.lexer = this.lexer;
				  this.yy.parser = this;
				  if (typeof this.lexer.yylloc == "undefined") this.lexer.yylloc = {};
				  var yyloc = this.lexer.yylloc;
				  lstack.push(yyloc);
				  var ranges = this.lexer.options && this.lexer.options.ranges;
				  if (typeof this.yy.parseError === "function") this.parseError = this.yy.parseError;
				  function popStack(n) {
					  stack.length = stack.length - 2 * n;
					  vstack.length = vstack.length - n;
					  lstack.length = lstack.length - n;
				  }
				  function lex() {
					  var token;
					  token = self.lexer.lex() || 1;
					  if (typeof token !== "number") {
						  token = self.symbols_[token] || token;
					  }
					  return token;
				  }
				  var symbol,
					  preErrorSymbol,
					  state,
					  action,
					  a,
					  r,
					  yyval = {},
					  p,
					  len,
					  newState,
					  expected;
				  while (true) {
					  state = stack[stack.length - 1];
					  if (this.defaultActions[state]) {
						  action = this.defaultActions[state];
					  } else {
						  if (symbol === null || typeof symbol == "undefined") {
							  symbol = lex();
						  }
						  action = table[state] && table[state][symbol];
					  }
					  if (typeof action === "undefined" || !action.length || !action[0]) {
						  var errStr = "";
						  if (!recovering) {
							  expected = [];
							  for (p in table[state]) if (this.terminals_[p] && p > 2) {
								  expected.push("'" + this.terminals_[p] + "'");
							  }
							  if (this.lexer.showPosition) {
								  errStr = "Parse error on line " + (yylineno + 1) + ":\n" + this.lexer.showPosition() + "\nExpecting " + expected.join(", ") + ", got '" + (this.terminals_[symbol] || symbol) + "'";
							  } else {
								  errStr = "Parse error on line " + (yylineno + 1) + ": Unexpected " + (symbol == 1 ? "end of input" : "'" + (this.terminals_[symbol] || symbol) + "'");
							  }
							  this.parseError(errStr, { text: this.lexer.match, token: this.terminals_[symbol] || symbol, line: this.lexer.yylineno, loc: yyloc, expected: expected });
						  }
					  }
					  if (action[0] instanceof Array && action.length > 1) {
						  throw new Error("Parse Error: multiple actions possible at state: " + state + ", token: " + symbol);
					  }
					  switch (action[0]) {
						  case 1:
							  stack.push(symbol);
							  vstack.push(this.lexer.yytext);
							  lstack.push(this.lexer.yylloc);
							  stack.push(action[1]);
							  symbol = null;
							  if (!preErrorSymbol) {
								  yyleng = this.lexer.yyleng;
								  yytext = this.lexer.yytext;
								  yylineno = this.lexer.yylineno;
								  yyloc = this.lexer.yylloc;
								  if (recovering > 0) recovering--;
							  } else {
								  symbol = preErrorSymbol;
								  preErrorSymbol = null;
							  }
							  break;
						  case 2:
							  len = this.productions_[action[1]][1];
							  yyval.$ = vstack[vstack.length - len];
							  yyval._$ = { first_line: lstack[lstack.length - (len || 1)].first_line, last_line: lstack[lstack.length - 1].last_line, first_column: lstack[lstack.length - (len || 1)].first_column, last_column: lstack[lstack.length - 1].last_column };
							  if (ranges) {
								  yyval._$.range = [lstack[lstack.length - (len || 1)].range[0], lstack[lstack.length - 1].range[1]];
							  }
							  r = this.performAction.call(yyval, yytext, yyleng, yylineno, this.yy, action[1], vstack, lstack);
							  if (typeof r !== "undefined") {
								  return r;
							  }
							  if (len) {
								  stack = stack.slice(0, -1 * len * 2);
								  vstack = vstack.slice(0, -1 * len);
								  lstack = lstack.slice(0, -1 * len);
							  }
							  stack.push(this.productions_[action[1]][0]);
							  vstack.push(yyval.$);
							  lstack.push(yyval._$);
							  newState = table[stack[stack.length - 2]][stack[stack.length - 1]];
							  stack.push(newState);
							  break;
						  case 3:
							  return true;
					  }
				  }
				  return true;
			  }
		  };
		  /* Jison generated lexer */
		  var lexer = (function () {
			  var lexer = { EOF: 1,
				  parseError: function parseError(str, hash) {
					  if (this.yy.parser) {
						  this.yy.parser.parseError(str, hash);
					  } else {
						  throw new Error(str);
					  }
				  },
				  setInput: function setInput(input) {
					  this._input = input;
					  this._more = this._less = this.done = false;
					  this.yylineno = this.yyleng = 0;
					  this.yytext = this.matched = this.match = '';
					  this.conditionStack = ['INITIAL'];
					  this.yylloc = { first_line: 1, first_column: 0, last_line: 1, last_column: 0 };
					  if (this.options.ranges) this.yylloc.range = [0, 0];
					  this.offset = 0;
					  return this;
				  },
				  input: function input() {
					  var ch = this._input[0];
					  this.yytext += ch;
					  this.yyleng++;
					  this.offset++;
					  this.match += ch;
					  this.matched += ch;
					  var lines = ch.match(/(?:\r\n?|\n).*/g);
					  if (lines) {
						  this.yylineno++;
						  this.yylloc.last_line++;
					  } else {
						  this.yylloc.last_column++;
					  }
					  if (this.options.ranges) this.yylloc.range[1]++;
  
					  this._input = this._input.slice(1);
					  return ch;
				  },
				  unput: function unput(ch) {
					  var len = ch.length;
					  var lines = ch.split(/(?:\r\n?|\n)/g);
  
					  this._input = ch + this._input;
					  this.yytext = this.yytext.substr(0, this.yytext.length - len - 1);
					  //this.yyleng -= len;
					  this.offset -= len;
					  var oldLines = this.match.split(/(?:\r\n?|\n)/g);
					  this.match = this.match.substr(0, this.match.length - 1);
					  this.matched = this.matched.substr(0, this.matched.length - 1);
  
					  if (lines.length - 1) this.yylineno -= lines.length - 1;
					  var r = this.yylloc.range;
  
					  this.yylloc = { first_line: this.yylloc.first_line,
						  last_line: this.yylineno + 1,
						  first_column: this.yylloc.first_column,
						  last_column: lines ? (lines.length === oldLines.length ? this.yylloc.first_column : 0) + oldLines[oldLines.length - lines.length].length - lines[0].length : this.yylloc.first_column - len
					  };
  
					  if (this.options.ranges) {
						  this.yylloc.range = [r[0], r[0] + this.yyleng - len];
					  }
					  return this;
				  },
				  more: function more() {
					  this._more = true;
					  return this;
				  },
				  less: function less(n) {
					  this.unput(this.match.slice(n));
				  },
				  pastInput: function pastInput() {
					  var past = this.matched.substr(0, this.matched.length - this.match.length);
					  return (past.length > 20 ? '...' : '') + past.substr(-20).replace(/\n/g, "");
				  },
				  upcomingInput: function upcomingInput() {
					  var next = this.match;
					  if (next.length < 20) {
						  next += this._input.substr(0, 20 - next.length);
					  }
					  return (next.substr(0, 20) + (next.length > 20 ? '...' : '')).replace(/\n/g, "");
				  },
				  showPosition: function showPosition() {
					  var pre = this.pastInput();
					  var c = new Array(pre.length + 1).join("-");
					  return pre + this.upcomingInput() + "\n" + c + "^";
				  },
				  next: function next() {
					  if (this.done) {
						  return this.EOF;
					  }
					  if (!this._input) this.done = true;
  
					  var token, match, tempMatch, index, col, lines;
					  if (!this._more) {
						  this.yytext = '';
						  this.match = '';
					  }
					  var rules = this._currentRules();
					  for (var i = 0; i < rules.length; i++) {
						  tempMatch = this._input.match(this.rules[rules[i]]);
						  if (tempMatch && (!match || tempMatch[0].length > match[0].length)) {
							  match = tempMatch;
							  index = i;
							  if (!this.options.flex) break;
						  }
					  }
					  if (match) {
						  lines = match[0].match(/(?:\r\n?|\n).*/g);
						  if (lines) this.yylineno += lines.length;
						  this.yylloc = { first_line: this.yylloc.last_line,
							  last_line: this.yylineno + 1,
							  first_column: this.yylloc.last_column,
							  last_column: lines ? lines[lines.length - 1].length - lines[lines.length - 1].match(/\r?\n?/)[0].length : this.yylloc.last_column + match[0].length };
						  this.yytext += match[0];
						  this.match += match[0];
						  this.matches = match;
						  this.yyleng = this.yytext.length;
						  if (this.options.ranges) {
							  this.yylloc.range = [this.offset, this.offset += this.yyleng];
						  }
						  this._more = false;
						  this._input = this._input.slice(match[0].length);
						  this.matched += match[0];
						  token = this.performAction.call(this, this.yy, this, rules[index], this.conditionStack[this.conditionStack.length - 1]);
						  if (this.done && this._input) this.done = false;
						  if (token) return token;else return;
					  }
					  if (this._input === "") {
						  return this.EOF;
					  } else {
						  return this.parseError('Lexical error on line ' + (this.yylineno + 1) + '. Unrecognized text.\n' + this.showPosition(), { text: "", token: null, line: this.yylineno });
					  }
				  },
				  lex: function lex() {
					  var r = this.next();
					  if (typeof r !== 'undefined') {
						  return r;
					  } else {
						  return this.lex();
					  }
				  },
				  begin: function begin(condition) {
					  this.conditionStack.push(condition);
				  },
				  popState: function popState() {
					  return this.conditionStack.pop();
				  },
				  _currentRules: function _currentRules() {
					  return this.conditions[this.conditionStack[this.conditionStack.length - 1]].rules;
				  },
				  topState: function topState() {
					  return this.conditionStack[this.conditionStack.length - 2];
				  },
				  pushState: function begin(condition) {
					  this.begin(condition);
				  } };
			  lexer.options = {};
			  lexer.performAction = function anonymous(yy, yy_, $avoiding_name_collisions, YY_START) {
  
				  function strip(start, end) {
					  return yy_.yytext = yy_.yytext.substring(start, yy_.yyleng - end + start);
				  }
  
				  var YYSTATE = YY_START;
				  switch ($avoiding_name_collisions) {
					  case 0:
						  if (yy_.yytext.slice(-2) === "\\\\") {
							  strip(0, 1);
							  this.begin("mu");
						  } else if (yy_.yytext.slice(-1) === "\\") {
							  strip(0, 1);
							  this.begin("emu");
						  } else {
							  this.begin("mu");
						  }
						  if (yy_.yytext) return 15;
  
						  break;
					  case 1:
						  return 15;
						  break;
					  case 2:
						  this.popState();
						  return 15;
  
						  break;
					  case 3:
						  this.begin('raw');return 15;
						  break;
					  case 4:
						  this.popState();
						  // Should be using `this.topState()` below, but it currently
						  // returns the second top instead of the first top. Opened an
						  // issue about it at https://github.com/zaach/jison/issues/291
						  if (this.conditionStack[this.conditionStack.length - 1] === 'raw') {
							  return 15;
						  } else {
							  strip(5, 9);
							  return 'END_RAW_BLOCK';
						  }
  
						  break;
					  case 5:
						  return 15;
						  break;
					  case 6:
						  this.popState();
						  return 14;
  
						  break;
					  case 7:
						  return 65;
						  break;
					  case 8:
						  return 68;
						  break;
					  case 9:
						  return 19;
						  break;
					  case 10:
						  this.popState();
						  this.begin('raw');
						  return 23;
  
						  break;
					  case 11:
						  return 55;
						  break;
					  case 12:
						  return 60;
						  break;
					  case 13:
						  return 29;
						  break;
					  case 14:
						  return 47;
						  break;
					  case 15:
						  this.popState();return 44;
						  break;
					  case 16:
						  this.popState();return 44;
						  break;
					  case 17:
						  return 34;
						  break;
					  case 18:
						  return 39;
						  break;
					  case 19:
						  return 51;
						  break;
					  case 20:
						  return 48;
						  break;
					  case 21:
						  this.unput(yy_.yytext);
						  this.popState();
						  this.begin('com');
  
						  break;
					  case 22:
						  this.popState();
						  return 14;
  
						  break;
					  case 23:
						  return 48;
						  break;
					  case 24:
						  return 73;
						  break;
					  case 25:
						  return 72;
						  break;
					  case 26:
						  return 72;
						  break;
					  case 27:
						  return 87;
						  break;
					  case 28:
						  // ignore whitespace
						  break;
					  case 29:
						  this.popState();return 54;
						  break;
					  case 30:
						  this.popState();return 33;
						  break;
					  case 31:
						  yy_.yytext = strip(1, 2).replace(/\\"/g, '"');return 80;
						  break;
					  case 32:
						  yy_.yytext = strip(1, 2).replace(/\\'/g, "'");return 80;
						  break;
					  case 33:
						  return 85;
						  break;
					  case 34:
						  return 82;
						  break;
					  case 35:
						  return 82;
						  break;
					  case 36:
						  return 83;
						  break;
					  case 37:
						  return 84;
						  break;
					  case 38:
						  return 81;
						  break;
					  case 39:
						  return 75;
						  break;
					  case 40:
						  return 77;
						  break;
					  case 41:
						  return 72;
						  break;
					  case 42:
						  yy_.yytext = yy_.yytext.replace(/\\([\\\]])/g, '$1');return 72;
						  break;
					  case 43:
						  return 'INVALID';
						  break;
					  case 44:
						  return 5;
						  break;
				  }
			  };
			  lexer.rules = [/^(?:[^\x00]*?(?=(\{\{)))/, /^(?:[^\x00]+)/, /^(?:[^\x00]{2,}?(?=(\{\{|\\\{\{|\\\\\{\{|$)))/, /^(?:\{\{\{\{(?=[^\/]))/, /^(?:\{\{\{\{\/[^\s!"#%-,\.\/;->@\[-\^`\{-~]+(?=[=}\s\/.])\}\}\}\})/, /^(?:[^\x00]*?(?=(\{\{\{\{)))/, /^(?:[\s\S]*?--(~)?\}\})/, /^(?:\()/, /^(?:\))/, /^(?:\{\{\{\{)/, /^(?:\}\}\}\})/, /^(?:\{\{(~)?>)/, /^(?:\{\{(~)?#>)/, /^(?:\{\{(~)?#\*?)/, /^(?:\{\{(~)?\/)/, /^(?:\{\{(~)?\^\s*(~)?\}\})/, /^(?:\{\{(~)?\s*else\s*(~)?\}\})/, /^(?:\{\{(~)?\^)/, /^(?:\{\{(~)?\s*else\b)/, /^(?:\{\{(~)?\{)/, /^(?:\{\{(~)?&)/, /^(?:\{\{(~)?!--)/, /^(?:\{\{(~)?![\s\S]*?\}\})/, /^(?:\{\{(~)?\*?)/, /^(?:=)/, /^(?:\.\.)/, /^(?:\.(?=([=~}\s\/.)|])))/, /^(?:[\/.])/, /^(?:\s+)/, /^(?:\}(~)?\}\})/, /^(?:(~)?\}\})/, /^(?:"(\\["]|[^"])*")/, /^(?:'(\\[']|[^'])*')/, /^(?:@)/, /^(?:true(?=([~}\s)])))/, /^(?:false(?=([~}\s)])))/, /^(?:undefined(?=([~}\s)])))/, /^(?:null(?=([~}\s)])))/, /^(?:-?[0-9]+(?:\.[0-9]+)?(?=([~}\s)])))/, /^(?:as\s+\|)/, /^(?:\|)/, /^(?:([^\s!"#%-,\.\/;->@\[-\^`\{-~]+(?=([=~}\s\/.)|]))))/, /^(?:\[(\\\]|[^\]])*\])/, /^(?:.)/, /^(?:$)/];
			  lexer.conditions = { "mu": { "rules": [7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44], "inclusive": false }, "emu": { "rules": [2], "inclusive": false }, "com": { "rules": [6], "inclusive": false }, "raw": { "rules": [3, 4, 5], "inclusive": false }, "INITIAL": { "rules": [0, 1, 44], "inclusive": true } };
			  return lexer;
		  })();
		  parser.lexer = lexer;
		  function Parser() {
			  this.yy = {};
		  }Parser.prototype = parser;parser.Parser = Parser;
		  return new Parser();
	  })();exports["default"] = handlebars;
	  module.exports = exports["default"];
  
  /***/ }),
  /* 38 */
  /***/ (function(module, exports, __webpack_require__) {
  
	  'use strict';
  
	  var _interopRequireDefault = __webpack_require__(1)['default'];
  
	  exports.__esModule = true;
  
	  var _visitor = __webpack_require__(39);
  
	  var _visitor2 = _interopRequireDefault(_visitor);
  
	  function WhitespaceControl() {
		var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
  
		this.options = options;
	  }
	  WhitespaceControl.prototype = new _visitor2['default']();
  
	  WhitespaceControl.prototype.Program = function (program) {
		var doStandalone = !this.options.ignoreStandalone;
  
		var isRoot = !this.isRootSeen;
		this.isRootSeen = true;
  
		var body = program.body;
		for (var i = 0, l = body.length; i < l; i++) {
		  var current = body[i],
			  strip = this.accept(current);
  
		  if (!strip) {
			continue;
		  }
  
		  var _isPrevWhitespace = isPrevWhitespace(body, i, isRoot),
			  _isNextWhitespace = isNextWhitespace(body, i, isRoot),
			  openStandalone = strip.openStandalone && _isPrevWhitespace,
			  closeStandalone = strip.closeStandalone && _isNextWhitespace,
			  inlineStandalone = strip.inlineStandalone && _isPrevWhitespace && _isNextWhitespace;
  
		  if (strip.close) {
			omitRight(body, i, true);
		  }
		  if (strip.open) {
			omitLeft(body, i, true);
		  }
  
		  if (doStandalone && inlineStandalone) {
			omitRight(body, i);
  
			if (omitLeft(body, i)) {
			  // If we are on a standalone node, save the indent info for partials
			  if (current.type === 'PartialStatement') {
				// Pull out the whitespace from the final line
				current.indent = /([ \t]+$)/.exec(body[i - 1].original)[1];
			  }
			}
		  }
		  if (doStandalone && openStandalone) {
			omitRight((current.program || current.inverse).body);
  
			// Strip out the previous content node if it's whitespace only
			omitLeft(body, i);
		  }
		  if (doStandalone && closeStandalone) {
			// Always strip the next node
			omitRight(body, i);
  
			omitLeft((current.inverse || current.program).body);
		  }
		}
  
		return program;
	  };
  
	  WhitespaceControl.prototype.BlockStatement = WhitespaceControl.prototype.DecoratorBlock = WhitespaceControl.prototype.PartialBlockStatement = function (block) {
		this.accept(block.program);
		this.accept(block.inverse);
  
		// Find the inverse program that is involed with whitespace stripping.
		var program = block.program || block.inverse,
			inverse = block.program && block.inverse,
			firstInverse = inverse,
			lastInverse = inverse;
  
		if (inverse && inverse.chained) {
		  firstInverse = inverse.body[0].program;
  
		  // Walk the inverse chain to find the last inverse that is actually in the chain.
		  while (lastInverse.chained) {
			lastInverse = lastInverse.body[lastInverse.body.length - 1].program;
		  }
		}
  
		var strip = {
		  open: block.openStrip.open,
		  close: block.closeStrip.close,
  
		  // Determine the standalone candiacy. Basically flag our content as being possibly standalone
		  // so our parent can determine if we actually are standalone
		  openStandalone: isNextWhitespace(program.body),
		  closeStandalone: isPrevWhitespace((firstInverse || program).body)
		};
  
		if (block.openStrip.close) {
		  omitRight(program.body, null, true);
		}
  
		if (inverse) {
		  var inverseStrip = block.inverseStrip;
  
		  if (inverseStrip.open) {
			omitLeft(program.body, null, true);
		  }
  
		  if (inverseStrip.close) {
			omitRight(firstInverse.body, null, true);
		  }
		  if (block.closeStrip.open) {
			omitLeft(lastInverse.body, null, true);
		  }
  
		  // Find standalone else statments
		  if (!this.options.ignoreStandalone && isPrevWhitespace(program.body) && isNextWhitespace(firstInverse.body)) {
			omitLeft(program.body);
			omitRight(firstInverse.body);
		  }
		} else if (block.closeStrip.open) {
		  omitLeft(program.body, null, true);
		}
  
		return strip;
	  };
  
	  WhitespaceControl.prototype.Decorator = WhitespaceControl.prototype.MustacheStatement = function (mustache) {
		return mustache.strip;
	  };
  
	  WhitespaceControl.prototype.PartialStatement = WhitespaceControl.prototype.CommentStatement = function (node) {
		/* istanbul ignore next */
		var strip = node.strip || {};
		return {
		  inlineStandalone: true,
		  open: strip.open,
		  close: strip.close
		};
	  };
  
	  function isPrevWhitespace(body, i, isRoot) {
		if (i === undefined) {
		  i = body.length;
		}
  
		// Nodes that end with newlines are considered whitespace (but are special
		// cased for strip operations)
		var prev = body[i - 1],
			sibling = body[i - 2];
		if (!prev) {
		  return isRoot;
		}
  
		if (prev.type === 'ContentStatement') {
		  return (sibling || !isRoot ? /\r?\n\s*?$/ : /(^|\r?\n)\s*?$/).test(prev.original);
		}
	  }
	  function isNextWhitespace(body, i, isRoot) {
		if (i === undefined) {
		  i = -1;
		}
  
		var next = body[i + 1],
			sibling = body[i + 2];
		if (!next) {
		  return isRoot;
		}
  
		if (next.type === 'ContentStatement') {
		  return (sibling || !isRoot ? /^\s*?\r?\n/ : /^\s*?(\r?\n|$)/).test(next.original);
		}
	  }
  
	  // Marks the node to the right of the position as omitted.
	  // I.e. {{foo}}' ' will mark the ' ' node as omitted.
	  //
	  // If i is undefined, then the first child will be marked as such.
	  //
	  // If mulitple is truthy then all whitespace will be stripped out until non-whitespace
	  // content is met.
	  function omitRight(body, i, multiple) {
		var current = body[i == null ? 0 : i + 1];
		if (!current || current.type !== 'ContentStatement' || !multiple && current.rightStripped) {
		  return;
		}
  
		var original = current.value;
		current.value = current.value.replace(multiple ? /^\s+/ : /^[ \t]*\r?\n?/, '');
		current.rightStripped = current.value !== original;
	  }
  
	  // Marks the node to the left of the position as omitted.
	  // I.e. ' '{{foo}} will mark the ' ' node as omitted.
	  //
	  // If i is undefined then the last child will be marked as such.
	  //
	  // If mulitple is truthy then all whitespace will be stripped out until non-whitespace
	  // content is met.
	  function omitLeft(body, i, multiple) {
		var current = body[i == null ? body.length - 1 : i - 1];
		if (!current || current.type !== 'ContentStatement' || !multiple && current.leftStripped) {
		  return;
		}
  
		// We omit the last node if it's whitespace only and not preceded by a non-content node.
		var original = current.value;
		current.value = current.value.replace(multiple ? /\s+$/ : /[ \t]+$/, '');
		current.leftStripped = current.value !== original;
		return current.leftStripped;
	  }
  
	  exports['default'] = WhitespaceControl;
	  module.exports = exports['default'];
  
  /***/ }),
  /* 39 */
  /***/ (function(module, exports, __webpack_require__) {
  
	  'use strict';
  
	  var _interopRequireDefault = __webpack_require__(1)['default'];
  
	  exports.__esModule = true;
  
	  var _exception = __webpack_require__(6);
  
	  var _exception2 = _interopRequireDefault(_exception);
  
	  function Visitor() {
		this.parents = [];
	  }
  
	  Visitor.prototype = {
		constructor: Visitor,
		mutating: false,
  
		// Visits a given value. If mutating, will replace the value if necessary.
		acceptKey: function acceptKey(node, name) {
		  var value = this.accept(node[name]);
		  if (this.mutating) {
			// Hacky sanity check: This may have a few false positives for type for the helper
			// methods but will generally do the right thing without a lot of overhead.
			if (value && !Visitor.prototype[value.type]) {
			  throw new _exception2['default']('Unexpected node type "' + value.type + '" found when accepting ' + name + ' on ' + node.type);
			}
			node[name] = value;
		  }
		},
  
		// Performs an accept operation with added sanity check to ensure
		// required keys are not removed.
		acceptRequired: function acceptRequired(node, name) {
		  this.acceptKey(node, name);
  
		  if (!node[name]) {
			throw new _exception2['default'](node.type + ' requires ' + name);
		  }
		},
  
		// Traverses a given array. If mutating, empty respnses will be removed
		// for child elements.
		acceptArray: function acceptArray(array) {
		  for (var i = 0, l = array.length; i < l; i++) {
			this.acceptKey(array, i);
  
			if (!array[i]) {
			  array.splice(i, 1);
			  i--;
			  l--;
			}
		  }
		},
  
		accept: function accept(object) {
		  if (!object) {
			return;
		  }
  
		  /* istanbul ignore next: Sanity code */
		  if (!this[object.type]) {
			throw new _exception2['default']('Unknown type: ' + object.type, object);
		  }
  
		  if (this.current) {
			this.parents.unshift(this.current);
		  }
		  this.current = object;
  
		  var ret = this[object.type](object);
  
		  this.current = this.parents.shift();
  
		  if (!this.mutating || ret) {
			return ret;
		  } else if (ret !== false) {
			return object;
		  }
		},
  
		Program: function Program(program) {
		  this.acceptArray(program.body);
		},
  
		MustacheStatement: visitSubExpression,
		Decorator: visitSubExpression,
  
		BlockStatement: visitBlock,
		DecoratorBlock: visitBlock,
  
		PartialStatement: visitPartial,
		PartialBlockStatement: function PartialBlockStatement(partial) {
		  visitPartial.call(this, partial);
  
		  this.acceptKey(partial, 'program');
		},
  
		ContentStatement: function ContentStatement() /* content */{},
		CommentStatement: function CommentStatement() /* comment */{},
  
		SubExpression: visitSubExpression,
  
		PathExpression: function PathExpression() /* path */{},
  
		StringLiteral: function StringLiteral() /* string */{},
		NumberLiteral: function NumberLiteral() /* number */{},
		BooleanLiteral: function BooleanLiteral() /* bool */{},
		UndefinedLiteral: function UndefinedLiteral() /* literal */{},
		NullLiteral: function NullLiteral() /* literal */{},
  
		Hash: function Hash(hash) {
		  this.acceptArray(hash.pairs);
		},
		HashPair: function HashPair(pair) {
		  this.acceptRequired(pair, 'value');
		}
	  };
  
	  function visitSubExpression(mustache) {
		this.acceptRequired(mustache, 'path');
		this.acceptArray(mustache.params);
		this.acceptKey(mustache, 'hash');
	  }
	  function visitBlock(block) {
		visitSubExpression.call(this, block);
  
		this.acceptKey(block, 'program');
		this.acceptKey(block, 'inverse');
	  }
	  function visitPartial(partial) {
		this.acceptRequired(partial, 'name');
		this.acceptArray(partial.params);
		this.acceptKey(partial, 'hash');
	  }
  
	  exports['default'] = Visitor;
	  module.exports = exports['default'];
  
  /***/ }),
  /* 40 */
  /***/ (function(module, exports, __webpack_require__) {
  
	  'use strict';
  
	  var _interopRequireDefault = __webpack_require__(1)['default'];
  
	  exports.__esModule = true;
	  exports.SourceLocation = SourceLocation;
	  exports.id = id;
	  exports.stripFlags = stripFlags;
	  exports.stripComment = stripComment;
	  exports.preparePath = preparePath;
	  exports.prepareMustache = prepareMustache;
	  exports.prepareRawBlock = prepareRawBlock;
	  exports.prepareBlock = prepareBlock;
	  exports.prepareProgram = prepareProgram;
	  exports.preparePartialBlock = preparePartialBlock;
  
	  var _exception = __webpack_require__(6);
  
	  var _exception2 = _interopRequireDefault(_exception);
  
	  function validateClose(open, close) {
		close = close.path ? close.path.original : close;
  
		if (open.path.original !== close) {
		  var errorNode = { loc: open.path.loc };
  
		  throw new _exception2['default'](open.path.original + " doesn't match " + close, errorNode);
		}
	  }
  
	  function SourceLocation(source, locInfo) {
		this.source = source;
		this.start = {
		  line: locInfo.first_line,
		  column: locInfo.first_column
		};
		this.end = {
		  line: locInfo.last_line,
		  column: locInfo.last_column
		};
	  }
  
	  function id(token) {
		if (/^\[.*\]$/.test(token)) {
		  return token.substring(1, token.length - 1);
		} else {
		  return token;
		}
	  }
  
	  function stripFlags(open, close) {
		return {
		  open: open.charAt(2) === '~',
		  close: close.charAt(close.length - 3) === '~'
		};
	  }
  
	  function stripComment(comment) {
		return comment.replace(/^\{\{~?!-?-?/, '').replace(/-?-?~?\}\}$/, '');
	  }
  
	  function preparePath(data, parts, loc) {
		loc = this.locInfo(loc);
  
		var original = data ? '@' : '',
			dig = [],
			depth = 0;
  
		for (var i = 0, l = parts.length; i < l; i++) {
		  var part = parts[i].part,
  
		  // If we have [] syntax then we do not treat path references as operators,
		  // i.e. foo.[this] resolves to approximately context.foo['this']
		  isLiteral = parts[i].original !== part;
		  original += (parts[i].separator || '') + part;
  
		  if (!isLiteral && (part === '..' || part === '.' || part === 'this')) {
			if (dig.length > 0) {
			  throw new _exception2['default']('Invalid path: ' + original, { loc: loc });
			} else if (part === '..') {
			  depth++;
			}
		  } else {
			dig.push(part);
		  }
		}
  
		return {
		  type: 'PathExpression',
		  data: data,
		  depth: depth,
		  parts: dig,
		  original: original,
		  loc: loc
		};
	  }
  
	  function prepareMustache(path, params, hash, open, strip, locInfo) {
		// Must use charAt to support IE pre-10
		var escapeFlag = open.charAt(3) || open.charAt(2),
			escaped = escapeFlag !== '{' && escapeFlag !== '&';
  
		var decorator = /\*/.test(open);
		return {
		  type: decorator ? 'Decorator' : 'MustacheStatement',
		  path: path,
		  params: params,
		  hash: hash,
		  escaped: escaped,
		  strip: strip,
		  loc: this.locInfo(locInfo)
		};
	  }
  
	  function prepareRawBlock(openRawBlock, contents, close, locInfo) {
		validateClose(openRawBlock, close);
  
		locInfo = this.locInfo(locInfo);
		var program = {
		  type: 'Program',
		  body: contents,
		  strip: {},
		  loc: locInfo
		};
  
		return {
		  type: 'BlockStatement',
		  path: openRawBlock.path,
		  params: openRawBlock.params,
		  hash: openRawBlock.hash,
		  program: program,
		  openStrip: {},
		  inverseStrip: {},
		  closeStrip: {},
		  loc: locInfo
		};
	  }
  
	  function prepareBlock(openBlock, program, inverseAndProgram, close, inverted, locInfo) {
		if (close && close.path) {
		  validateClose(openBlock, close);
		}
  
		var decorator = /\*/.test(openBlock.open);
  
		program.blockParams = openBlock.blockParams;
  
		var inverse = undefined,
			inverseStrip = undefined;
  
		if (inverseAndProgram) {
		  if (decorator) {
			throw new _exception2['default']('Unexpected inverse block on decorator', inverseAndProgram);
		  }
  
		  if (inverseAndProgram.chain) {
			inverseAndProgram.program.body[0].closeStrip = close.strip;
		  }
  
		  inverseStrip = inverseAndProgram.strip;
		  inverse = inverseAndProgram.program;
		}
  
		if (inverted) {
		  inverted = inverse;
		  inverse = program;
		  program = inverted;
		}
  
		return {
		  type: decorator ? 'DecoratorBlock' : 'BlockStatement',
		  path: openBlock.path,
		  params: openBlock.params,
		  hash: openBlock.hash,
		  program: program,
		  inverse: inverse,
		  openStrip: openBlock.strip,
		  inverseStrip: inverseStrip,
		  closeStrip: close && close.strip,
		  loc: this.locInfo(locInfo)
		};
	  }
  
	  function prepareProgram(statements, loc) {
		if (!loc && statements.length) {
		  var firstLoc = statements[0].loc,
			  lastLoc = statements[statements.length - 1].loc;
  
		  /* istanbul ignore else */
		  if (firstLoc && lastLoc) {
			loc = {
			  source: firstLoc.source,
			  start: {
				line: firstLoc.start.line,
				column: firstLoc.start.column
			  },
			  end: {
				line: lastLoc.end.line,
				column: lastLoc.end.column
			  }
			};
		  }
		}
  
		return {
		  type: 'Program',
		  body: statements,
		  strip: {},
		  loc: loc
		};
	  }
  
	  function preparePartialBlock(open, program, close, locInfo) {
		validateClose(open, close);
  
		return {
		  type: 'PartialBlockStatement',
		  name: open.path,
		  params: open.params,
		  hash: open.hash,
		  program: program,
		  openStrip: open.strip,
		  closeStrip: close && close.strip,
		  loc: this.locInfo(locInfo)
		};
	  }
  
  /***/ }),
  /* 41 */
  /***/ (function(module, exports, __webpack_require__) {
  
	  /* eslint-disable new-cap */
  
	  'use strict';
  
	  var _interopRequireDefault = __webpack_require__(1)['default'];
  
	  exports.__esModule = true;
	  exports.Compiler = Compiler;
	  exports.precompile = precompile;
	  exports.compile = compile;
  
	  var _exception = __webpack_require__(6);
  
	  var _exception2 = _interopRequireDefault(_exception);
  
	  var _utils = __webpack_require__(5);
  
	  var _ast = __webpack_require__(35);
  
	  var _ast2 = _interopRequireDefault(_ast);
  
	  var slice = [].slice;
  
	  function Compiler() {}
  
	  // the foundHelper register will disambiguate helper lookup from finding a
	  // function in a context. This is necessary for mustache compatibility, which
	  // requires that context functions in blocks are evaluated by blockHelperMissing,
	  // and then proceed as if the resulting value was provided to blockHelperMissing.
  
	  Compiler.prototype = {
		compiler: Compiler,
  
		equals: function equals(other) {
		  var len = this.opcodes.length;
		  if (other.opcodes.length !== len) {
			return false;
		  }
  
		  for (var i = 0; i < len; i++) {
			var opcode = this.opcodes[i],
				otherOpcode = other.opcodes[i];
			if (opcode.opcode !== otherOpcode.opcode || !argEquals(opcode.args, otherOpcode.args)) {
			  return false;
			}
		  }
  
		  // We know that length is the same between the two arrays because they are directly tied
		  // to the opcode behavior above.
		  len = this.children.length;
		  for (var i = 0; i < len; i++) {
			if (!this.children[i].equals(other.children[i])) {
			  return false;
			}
		  }
  
		  return true;
		},
  
		guid: 0,
  
		compile: function compile(program, options) {
		  this.sourceNode = [];
		  this.opcodes = [];
		  this.children = [];
		  this.options = options;
		  this.stringParams = options.stringParams;
		  this.trackIds = options.trackIds;
  
		  options.blockParams = options.blockParams || [];
  
		  // These changes will propagate to the other compiler components
		  var knownHelpers = options.knownHelpers;
		  options.knownHelpers = {
			'helperMissing': true,
			'blockHelperMissing': true,
			'each': true,
			'if': true,
			'unless': true,
			'with': true,
			'log': true,
			'lookup': true
		  };
		  if (knownHelpers) {
			// the next line should use "Object.keys", but the code has been like this a long time and changing it, might
			// cause backwards-compatibility issues... It's an old library...
			// eslint-disable-next-line guard-for-in
			for (var _name in knownHelpers) {
			  this.options.knownHelpers[_name] = knownHelpers[_name];
			}
		  }
  
		  return this.accept(program);
		},
  
		compileProgram: function compileProgram(program) {
		  var childCompiler = new this.compiler(),
			  // eslint-disable-line new-cap
		  result = childCompiler.compile(program, this.options),
			  guid = this.guid++;
  
		  this.usePartial = this.usePartial || result.usePartial;
  
		  this.children[guid] = result;
		  this.useDepths = this.useDepths || result.useDepths;
  
		  return guid;
		},
  
		accept: function accept(node) {
		  /* istanbul ignore next: Sanity code */
		  if (!this[node.type]) {
			throw new _exception2['default']('Unknown type: ' + node.type, node);
		  }
  
		  this.sourceNode.unshift(node);
		  var ret = this[node.type](node);
		  this.sourceNode.shift();
		  return ret;
		},
  
		Program: function Program(program) {
		  this.options.blockParams.unshift(program.blockParams);
  
		  var body = program.body,
			  bodyLength = body.length;
		  for (var i = 0; i < bodyLength; i++) {
			this.accept(body[i]);
		  }
  
		  this.options.blockParams.shift();
  
		  this.isSimple = bodyLength === 1;
		  this.blockParams = program.blockParams ? program.blockParams.length : 0;
  
		  return this;
		},
  
		BlockStatement: function BlockStatement(block) {
		  transformLiteralToPath(block);
  
		  var program = block.program,
			  inverse = block.inverse;
  
		  program = program && this.compileProgram(program);
		  inverse = inverse && this.compileProgram(inverse);
  
		  var type = this.classifySexpr(block);
  
		  if (type === 'helper') {
			this.helperSexpr(block, program, inverse);
		  } else if (type === 'simple') {
			this.simpleSexpr(block);
  
			// now that the simple mustache is resolved, we need to
			// evaluate it by executing `blockHelperMissing`
			this.opcode('pushProgram', program);
			this.opcode('pushProgram', inverse);
			this.opcode('emptyHash');
			this.opcode('blockValue', block.path.original);
		  } else {
			this.ambiguousSexpr(block, program, inverse);
  
			// now that the simple mustache is resolved, we need to
			// evaluate it by executing `blockHelperMissing`
			this.opcode('pushProgram', program);
			this.opcode('pushProgram', inverse);
			this.opcode('emptyHash');
			this.opcode('ambiguousBlockValue');
		  }
  
		  this.opcode('append');
		},
  
		DecoratorBlock: function DecoratorBlock(decorator) {
		  var program = decorator.program && this.compileProgram(decorator.program);
		  var params = this.setupFullMustacheParams(decorator, program, undefined),
			  path = decorator.path;
  
		  this.useDecorators = true;
		  this.opcode('registerDecorator', params.length, path.original);
		},
  
		PartialStatement: function PartialStatement(partial) {
		  this.usePartial = true;
  
		  var program = partial.program;
		  if (program) {
			program = this.compileProgram(partial.program);
		  }
  
		  var params = partial.params;
		  if (params.length > 1) {
			throw new _exception2['default']('Unsupported number of partial arguments: ' + params.length, partial);
		  } else if (!params.length) {
			if (this.options.explicitPartialContext) {
			  this.opcode('pushLiteral', 'undefined');
			} else {
			  params.push({ type: 'PathExpression', parts: [], depth: 0 });
			}
		  }
  
		  var partialName = partial.name.original,
			  isDynamic = partial.name.type === 'SubExpression';
		  if (isDynamic) {
			this.accept(partial.name);
		  }
  
		  this.setupFullMustacheParams(partial, program, undefined, true);
  
		  var indent = partial.indent || '';
		  if (this.options.preventIndent && indent) {
			this.opcode('appendContent', indent);
			indent = '';
		  }
  
		  this.opcode('invokePartial', isDynamic, partialName, indent);
		  this.opcode('append');
		},
		PartialBlockStatement: function PartialBlockStatement(partialBlock) {
		  this.PartialStatement(partialBlock);
		},
  
		MustacheStatement: function MustacheStatement(mustache) {
		  this.SubExpression(mustache);
  
		  if (mustache.escaped && !this.options.noEscape) {
			this.opcode('appendEscaped');
		  } else {
			this.opcode('append');
		  }
		},
		Decorator: function Decorator(decorator) {
		  this.DecoratorBlock(decorator);
		},
  
		ContentStatement: function ContentStatement(content) {
		  if (content.value) {
			this.opcode('appendContent', content.value);
		  }
		},
  
		CommentStatement: function CommentStatement() {},
  
		SubExpression: function SubExpression(sexpr) {
		  transformLiteralToPath(sexpr);
		  var type = this.classifySexpr(sexpr);
  
		  if (type === 'simple') {
			this.simpleSexpr(sexpr);
		  } else if (type === 'helper') {
			this.helperSexpr(sexpr);
		  } else {
			this.ambiguousSexpr(sexpr);
		  }
		},
		ambiguousSexpr: function ambiguousSexpr(sexpr, program, inverse) {
		  var path = sexpr.path,
			  name = path.parts[0],
			  isBlock = program != null || inverse != null;
  
		  this.opcode('getContext', path.depth);
  
		  this.opcode('pushProgram', program);
		  this.opcode('pushProgram', inverse);
  
		  path.strict = true;
		  this.accept(path);
  
		  this.opcode('invokeAmbiguous', name, isBlock);
		},
  
		simpleSexpr: function simpleSexpr(sexpr) {
		  var path = sexpr.path;
		  path.strict = true;
		  this.accept(path);
		  this.opcode('resolvePossibleLambda');
		},
  
		helperSexpr: function helperSexpr(sexpr, program, inverse) {
		  var params = this.setupFullMustacheParams(sexpr, program, inverse),
			  path = sexpr.path,
			  name = path.parts[0];
  
		  if (this.options.knownHelpers[name]) {
			this.opcode('invokeKnownHelper', params.length, name);
		  } else if (this.options.knownHelpersOnly) {
			throw new _exception2['default']('You specified knownHelpersOnly, but used the unknown helper ' + name, sexpr);
		  } else {
			path.strict = true;
			path.falsy = true;
  
			this.accept(path);
			this.opcode('invokeHelper', params.length, path.original, _ast2['default'].helpers.simpleId(path));
		  }
		},
  
		PathExpression: function PathExpression(path) {
		  this.addDepth(path.depth);
		  this.opcode('getContext', path.depth);
  
		  var name = path.parts[0],
			  scoped = _ast2['default'].helpers.scopedId(path),
			  blockParamId = !path.depth && !scoped && this.blockParamIndex(name);
  
		  if (blockParamId) {
			this.opcode('lookupBlockParam', blockParamId, path.parts);
		  } else if (!name) {
			// Context reference, i.e. `{{foo .}}` or `{{foo ..}}`
			this.opcode('pushContext');
		  } else if (path.data) {
			this.options.data = true;
			this.opcode('lookupData', path.depth, path.parts, path.strict);
		  } else {
			this.opcode('lookupOnContext', path.parts, path.falsy, path.strict, scoped);
		  }
		},
  
		StringLiteral: function StringLiteral(string) {
		  this.opcode('pushString', string.value);
		},
  
		NumberLiteral: function NumberLiteral(number) {
		  this.opcode('pushLiteral', number.value);
		},
  
		BooleanLiteral: function BooleanLiteral(bool) {
		  this.opcode('pushLiteral', bool.value);
		},
  
		UndefinedLiteral: function UndefinedLiteral() {
		  this.opcode('pushLiteral', 'undefined');
		},
  
		NullLiteral: function NullLiteral() {
		  this.opcode('pushLiteral', 'null');
		},
  
		Hash: function Hash(hash) {
		  var pairs = hash.pairs,
			  i = 0,
			  l = pairs.length;
  
		  this.opcode('pushHash');
  
		  for (; i < l; i++) {
			this.pushParam(pairs[i].value);
		  }
		  while (i--) {
			this.opcode('assignToHash', pairs[i].key);
		  }
		  this.opcode('popHash');
		},
  
		// HELPERS
		opcode: function opcode(name) {
		  this.opcodes.push({ opcode: name, args: slice.call(arguments, 1), loc: this.sourceNode[0].loc });
		},
  
		addDepth: function addDepth(depth) {
		  if (!depth) {
			return;
		  }
  
		  this.useDepths = true;
		},
  
		classifySexpr: function classifySexpr(sexpr) {
		  var isSimple = _ast2['default'].helpers.simpleId(sexpr.path);
  
		  var isBlockParam = isSimple && !!this.blockParamIndex(sexpr.path.parts[0]);
  
		  // a mustache is an eligible helper if:
		  // * its id is simple (a single part, not `this` or `..`)
		  var isHelper = !isBlockParam && _ast2['default'].helpers.helperExpression(sexpr);
  
		  // if a mustache is an eligible helper but not a definite
		  // helper, it is ambiguous, and will be resolved in a later
		  // pass or at runtime.
		  var isEligible = !isBlockParam && (isHelper || isSimple);
  
		  // if ambiguous, we can possibly resolve the ambiguity now
		  // An eligible helper is one that does not have a complex path, i.e. `this.foo`, `../foo` etc.
		  if (isEligible && !isHelper) {
			var _name2 = sexpr.path.parts[0],
				options = this.options;
  
			if (options.knownHelpers[_name2]) {
			  isHelper = true;
			} else if (options.knownHelpersOnly) {
			  isEligible = false;
			}
		  }
  
		  if (isHelper) {
			return 'helper';
		  } else if (isEligible) {
			return 'ambiguous';
		  } else {
			return 'simple';
		  }
		},
  
		pushParams: function pushParams(params) {
		  for (var i = 0, l = params.length; i < l; i++) {
			this.pushParam(params[i]);
		  }
		},
  
		pushParam: function pushParam(val) {
		  var value = val.value != null ? val.value : val.original || '';
  
		  if (this.stringParams) {
			if (value.replace) {
			  value = value.replace(/^(\.?\.\/)*/g, '').replace(/\//g, '.');
			}
  
			if (val.depth) {
			  this.addDepth(val.depth);
			}
			this.opcode('getContext', val.depth || 0);
			this.opcode('pushStringParam', value, val.type);
  
			if (val.type === 'SubExpression') {
			  // SubExpressions get evaluated and passed in
			  // in string params mode.
			  this.accept(val);
			}
		  } else {
			if (this.trackIds) {
			  var blockParamIndex = undefined;
			  if (val.parts && !_ast2['default'].helpers.scopedId(val) && !val.depth) {
				blockParamIndex = this.blockParamIndex(val.parts[0]);
			  }
			  if (blockParamIndex) {
				var blockParamChild = val.parts.slice(1).join('.');
				this.opcode('pushId', 'BlockParam', blockParamIndex, blockParamChild);
			  } else {
				value = val.original || value;
				if (value.replace) {
				  value = value.replace(/^this(?:\.|$)/, '').replace(/^\.\//, '').replace(/^\.$/, '');
				}
  
				this.opcode('pushId', val.type, value);
			  }
			}
			this.accept(val);
		  }
		},
  
		setupFullMustacheParams: function setupFullMustacheParams(sexpr, program, inverse, omitEmpty) {
		  var params = sexpr.params;
		  this.pushParams(params);
  
		  this.opcode('pushProgram', program);
		  this.opcode('pushProgram', inverse);
  
		  if (sexpr.hash) {
			this.accept(sexpr.hash);
		  } else {
			this.opcode('emptyHash', omitEmpty);
		  }
  
		  return params;
		},
  
		blockParamIndex: function blockParamIndex(name) {
		  for (var depth = 0, len = this.options.blockParams.length; depth < len; depth++) {
			var blockParams = this.options.blockParams[depth],
				param = blockParams && _utils.indexOf(blockParams, name);
			if (blockParams && param >= 0) {
			  return [depth, param];
			}
		  }
		}
	  };
  
	  function precompile(input, options, env) {
		if (input == null || typeof input !== 'string' && input.type !== 'Program') {
		  throw new _exception2['default']('You must pass a string or Handlebars AST to Handlebars.precompile. You passed ' + input);
		}
  
		options = options || {};
		if (!('data' in options)) {
		  options.data = true;
		}
		if (options.compat) {
		  options.useDepths = true;
		}
  
		var ast = env.parse(input, options),
			environment = new env.Compiler().compile(ast, options);
		return new env.JavaScriptCompiler().compile(environment, options);
	  }
  
	  function compile(input, options, env) {
		if (options === undefined) options = {};
  
		if (input == null || typeof input !== 'string' && input.type !== 'Program') {
		  throw new _exception2['default']('You must pass a string or Handlebars AST to Handlebars.compile. You passed ' + input);
		}
  
		options = _utils.extend({}, options);
		if (!('data' in options)) {
		  options.data = true;
		}
		if (options.compat) {
		  options.useDepths = true;
		}
  
		var compiled = undefined;
  
		function compileInput() {
		  var ast = env.parse(input, options),
			  environment = new env.Compiler().compile(ast, options),
			  templateSpec = new env.JavaScriptCompiler().compile(environment, options, undefined, true);
		  return env.template(templateSpec);
		}
  
		// Template is only compiled on first use and cached after that point.
		function ret(context, execOptions) {
		  if (!compiled) {
			compiled = compileInput();
		  }
		  return compiled.call(this, context, execOptions);
		}
		ret._setup = function (setupOptions) {
		  if (!compiled) {
			compiled = compileInput();
		  }
		  return compiled._setup(setupOptions);
		};
		ret._child = function (i, data, blockParams, depths) {
		  if (!compiled) {
			compiled = compileInput();
		  }
		  return compiled._child(i, data, blockParams, depths);
		};
		return ret;
	  }
  
	  function argEquals(a, b) {
		if (a === b) {
		  return true;
		}
  
		if (_utils.isArray(a) && _utils.isArray(b) && a.length === b.length) {
		  for (var i = 0; i < a.length; i++) {
			if (!argEquals(a[i], b[i])) {
			  return false;
			}
		  }
		  return true;
		}
	  }
  
	  function transformLiteralToPath(sexpr) {
		if (!sexpr.path.parts) {
		  var literal = sexpr.path;
		  // Casting to string here to make false and 0 literal values play nicely with the rest
		  // of the system.
		  sexpr.path = {
			type: 'PathExpression',
			data: false,
			depth: 0,
			parts: [literal.original + ''],
			original: literal.original + '',
			loc: literal.loc
		  };
		}
	  }
  
  /***/ }),
  /* 42 */
  /***/ (function(module, exports, __webpack_require__) {
  
	  'use strict';
  
	  var _interopRequireDefault = __webpack_require__(1)['default'];
  
	  exports.__esModule = true;
  
	  var _base = __webpack_require__(4);
  
	  var _exception = __webpack_require__(6);
  
	  var _exception2 = _interopRequireDefault(_exception);
  
	  var _utils = __webpack_require__(5);
  
	  var _codeGen = __webpack_require__(43);
  
	  var _codeGen2 = _interopRequireDefault(_codeGen);
  
	  function Literal(value) {
		this.value = value;
	  }
  
	  function JavaScriptCompiler() {}
  
	  JavaScriptCompiler.prototype = {
		// PUBLIC API: You can override these methods in a subclass to provide
		// alternative compiled forms for name lookup and buffering semantics
		nameLookup: function nameLookup(parent, name /* , type*/) {
		  var isEnumerable = [this.aliasable('container.propertyIsEnumerable'), '.call(', parent, ',"constructor")'];
  
		  if (name === 'constructor') {
			return ['(', isEnumerable, '?', _actualLookup(), ' : undefined)'];
		  }
		  return _actualLookup();
  
		  function _actualLookup() {
			if (JavaScriptCompiler.isValidJavaScriptVariableName(name)) {
			  return [parent, '.', name];
			} else {
			  return [parent, '[', JSON.stringify(name), ']'];
			}
		  }
		},
		depthedLookup: function depthedLookup(name) {
		  return [this.aliasable('container.lookup'), '(depths, "', name, '")'];
		},
  
		compilerInfo: function compilerInfo() {
		  var revision = _base.COMPILER_REVISION,
			  versions = _base.REVISION_CHANGES[revision];
		  return [revision, versions];
		},
  
		appendToBuffer: function appendToBuffer(source, location, explicit) {
		  // Force a source as this simplifies the merge logic.
		  if (!_utils.isArray(source)) {
			source = [source];
		  }
		  source = this.source.wrap(source, location);
  
		  if (this.environment.isSimple) {
			return ['return ', source, ';'];
		  } else if (explicit) {
			// This is a case where the buffer operation occurs as a child of another
			// construct, generally braces. We have to explicitly output these buffer
			// operations to ensure that the emitted code goes in the correct location.
			return ['buffer += ', source, ';'];
		  } else {
			source.appendToBuffer = true;
			return source;
		  }
		},
  
		initializeBuffer: function initializeBuffer() {
		  return this.quotedString('');
		},
		// END PUBLIC API
  
		compile: function compile(environment, options, context, asObject) {
		  this.environment = environment;
		  this.options = options;
		  this.stringParams = this.options.stringParams;
		  this.trackIds = this.options.trackIds;
		  this.precompile = !asObject;
  
		  this.name = this.environment.name;
		  this.isChild = !!context;
		  this.context = context || {
			decorators: [],
			programs: [],
			environments: []
		  };
  
		  this.preamble();
  
		  this.stackSlot = 0;
		  this.stackVars = [];
		  this.aliases = {};
		  this.registers = { list: [] };
		  this.hashes = [];
		  this.compileStack = [];
		  this.inlineStack = [];
		  this.blockParams = [];
  
		  this.compileChildren(environment, options);
  
		  this.useDepths = this.useDepths || environment.useDepths || environment.useDecorators || this.options.compat;
		  this.useBlockParams = this.useBlockParams || environment.useBlockParams;
  
		  var opcodes = environment.opcodes,
			  opcode = undefined,
			  firstLoc = undefined,
			  i = undefined,
			  l = undefined;
  
		  for (i = 0, l = opcodes.length; i < l; i++) {
			opcode = opcodes[i];
  
			this.source.currentLocation = opcode.loc;
			firstLoc = firstLoc || opcode.loc;
			this[opcode.opcode].apply(this, opcode.args);
		  }
  
		  // Flush any trailing content that might be pending.
		  this.source.currentLocation = firstLoc;
		  this.pushSource('');
  
		  /* istanbul ignore next */
		  if (this.stackSlot || this.inlineStack.length || this.compileStack.length) {
			throw new _exception2['default']('Compile completed with content left on stack');
		  }
  
		  if (!this.decorators.isEmpty()) {
			this.useDecorators = true;
  
			this.decorators.prepend('var decorators = container.decorators;\n');
			this.decorators.push('return fn;');
  
			if (asObject) {
			  this.decorators = Function.apply(this, ['fn', 'props', 'container', 'depth0', 'data', 'blockParams', 'depths', this.decorators.merge()]);
			} else {
			  this.decorators.prepend('function(fn, props, container, depth0, data, blockParams, depths) {\n');
			  this.decorators.push('}\n');
			  this.decorators = this.decorators.merge();
			}
		  } else {
			this.decorators = undefined;
		  }
  
		  var fn = this.createFunctionContext(asObject);
		  if (!this.isChild) {
			var ret = {
			  compiler: this.compilerInfo(),
			  main: fn
			};
  
			if (this.decorators) {
			  ret.main_d = this.decorators; // eslint-disable-line camelcase
			  ret.useDecorators = true;
			}
  
			var _context = this.context;
			var programs = _context.programs;
			var decorators = _context.decorators;
  
			for (i = 0, l = programs.length; i < l; i++) {
			  if (programs[i]) {
				ret[i] = programs[i];
				if (decorators[i]) {
				  ret[i + '_d'] = decorators[i];
				  ret.useDecorators = true;
				}
			  }
			}
  
			if (this.environment.usePartial) {
			  ret.usePartial = true;
			}
			if (this.options.data) {
			  ret.useData = true;
			}
			if (this.useDepths) {
			  ret.useDepths = true;
			}
			if (this.useBlockParams) {
			  ret.useBlockParams = true;
			}
			if (this.options.compat) {
			  ret.compat = true;
			}
  
			if (!asObject) {
			  ret.compiler = JSON.stringify(ret.compiler);
  
			  this.source.currentLocation = { start: { line: 1, column: 0 } };
			  ret = this.objectLiteral(ret);
  
			  if (options.srcName) {
				ret = ret.toStringWithSourceMap({ file: options.destName });
				ret.map = ret.map && ret.map.toString();
			  } else {
				ret = ret.toString();
			  }
			} else {
			  ret.compilerOptions = this.options;
			}
  
			return ret;
		  } else {
			return fn;
		  }
		},
  
		preamble: function preamble() {
		  // track the last context pushed into place to allow skipping the
		  // getContext opcode when it would be a noop
		  this.lastContext = 0;
		  this.source = new _codeGen2['default'](this.options.srcName);
		  this.decorators = new _codeGen2['default'](this.options.srcName);
		},
  
		createFunctionContext: function createFunctionContext(asObject) {
		  var varDeclarations = '';
  
		  var locals = this.stackVars.concat(this.registers.list);
		  if (locals.length > 0) {
			varDeclarations += ', ' + locals.join(', ');
		  }
  
		  // Generate minimizer alias mappings
		  //
		  // When using true SourceNodes, this will update all references to the given alias
		  // as the source nodes are reused in situ. For the non-source node compilation mode,
		  // aliases will not be used, but this case is already being run on the client and
		  // we aren't concern about minimizing the template size.
		  var aliasCount = 0;
		  for (var alias in this.aliases) {
			// eslint-disable-line guard-for-in
			var node = this.aliases[alias];
			if (this.aliases.hasOwnProperty(alias) && node.children && node.referenceCount > 1) {
			  varDeclarations += ', alias' + ++aliasCount + '=' + alias;
			  node.children[0] = 'alias' + aliasCount;
			}
		  }
  
		  var params = ['container', 'depth0', 'helpers', 'partials', 'data'];
  
		  if (this.useBlockParams || this.useDepths) {
			params.push('blockParams');
		  }
		  if (this.useDepths) {
			params.push('depths');
		  }
  
		  // Perform a second pass over the output to merge content when possible
		  var source = this.mergeSource(varDeclarations);
  
		  if (asObject) {
			params.push(source);
  
			return Function.apply(this, params);
		  } else {
			return this.source.wrap(['function(', params.join(','), ') {\n  ', source, '}']);
		  }
		},
		mergeSource: function mergeSource(varDeclarations) {
		  var isSimple = this.environment.isSimple,
			  appendOnly = !this.forceBuffer,
			  appendFirst = undefined,
			  sourceSeen = undefined,
			  bufferStart = undefined,
			  bufferEnd = undefined;
		  this.source.each(function (line) {
			if (line.appendToBuffer) {
			  if (bufferStart) {
				line.prepend('  + ');
			  } else {
				bufferStart = line;
			  }
			  bufferEnd = line;
			} else {
			  if (bufferStart) {
				if (!sourceSeen) {
				  appendFirst = true;
				} else {
				  bufferStart.prepend('buffer += ');
				}
				bufferEnd.add(';');
				bufferStart = bufferEnd = undefined;
			  }
  
			  sourceSeen = true;
			  if (!isSimple) {
				appendOnly = false;
			  }
			}
		  });
  
		  if (appendOnly) {
			if (bufferStart) {
			  bufferStart.prepend('return ');
			  bufferEnd.add(';');
			} else if (!sourceSeen) {
			  this.source.push('return "";');
			}
		  } else {
			varDeclarations += ', buffer = ' + (appendFirst ? '' : this.initializeBuffer());
  
			if (bufferStart) {
			  bufferStart.prepend('return buffer + ');
			  bufferEnd.add(';');
			} else {
			  this.source.push('return buffer;');
			}
		  }
  
		  if (varDeclarations) {
			this.source.prepend('var ' + varDeclarations.substring(2) + (appendFirst ? '' : ';\n'));
		  }
  
		  return this.source.merge();
		},
  
		// [blockValue]
		//
		// On stack, before: hash, inverse, program, value
		// On stack, after: return value of blockHelperMissing
		//
		// The purpose of this opcode is to take a block of the form
		// `{{#this.foo}}...{{/this.foo}}`, resolve the value of `foo`, and
		// replace it on the stack with the result of properly
		// invoking blockHelperMissing.
		blockValue: function blockValue(name) {
		  var blockHelperMissing = this.aliasable('container.hooks.blockHelperMissing'),
			  params = [this.contextName(0)];
		  this.setupHelperArgs(name, 0, params);
  
		  var blockName = this.popStack();
		  params.splice(1, 0, blockName);
  
		  this.push(this.source.functionCall(blockHelperMissing, 'call', params));
		},
  
		// [ambiguousBlockValue]
		//
		// On stack, before: hash, inverse, program, value
		// Compiler value, before: lastHelper=value of last found helper, if any
		// On stack, after, if no lastHelper: same as [blockValue]
		// On stack, after, if lastHelper: value
		ambiguousBlockValue: function ambiguousBlockValue() {
		  // We're being a bit cheeky and reusing the options value from the prior exec
		  var blockHelperMissing = this.aliasable('container.hooks.blockHelperMissing'),
			  params = [this.contextName(0)];
		  this.setupHelperArgs('', 0, params, true);
  
		  this.flushInline();
  
		  var current = this.topStack();
		  params.splice(1, 0, current);
  
		  this.pushSource(['if (!', this.lastHelper, ') { ', current, ' = ', this.source.functionCall(blockHelperMissing, 'call', params), '}']);
		},
  
		// [appendContent]
		//
		// On stack, before: ...
		// On stack, after: ...
		//
		// Appends the string value of `content` to the current buffer
		appendContent: function appendContent(content) {
		  if (this.pendingContent) {
			content = this.pendingContent + content;
		  } else {
			this.pendingLocation = this.source.currentLocation;
		  }
  
		  this.pendingContent = content;
		},
  
		// [append]
		//
		// On stack, before: value, ...
		// On stack, after: ...
		//
		// Coerces `value` to a String and appends it to the current buffer.
		//
		// If `value` is truthy, or 0, it is coerced into a string and appended
		// Otherwise, the empty string is appended
		append: function append() {
		  if (this.isInline()) {
			this.replaceStack(function (current) {
			  return [' != null ? ', current, ' : ""'];
			});
  
			this.pushSource(this.appendToBuffer(this.popStack()));
		  } else {
			var local = this.popStack();
			this.pushSource(['if (', local, ' != null) { ', this.appendToBuffer(local, undefined, true), ' }']);
			if (this.environment.isSimple) {
			  this.pushSource(['else { ', this.appendToBuffer("''", undefined, true), ' }']);
			}
		  }
		},
  
		// [appendEscaped]
		//
		// On stack, before: value, ...
		// On stack, after: ...
		//
		// Escape `value` and append it to the buffer
		appendEscaped: function appendEscaped() {
		  this.pushSource(this.appendToBuffer([this.aliasable('container.escapeExpression'), '(', this.popStack(), ')']));
		},
  
		// [getContext]
		//
		// On stack, before: ...
		// On stack, after: ...
		// Compiler value, after: lastContext=depth
		//
		// Set the value of the `lastContext` compiler value to the depth
		getContext: function getContext(depth) {
		  this.lastContext = depth;
		},
  
		// [pushContext]
		//
		// On stack, before: ...
		// On stack, after: currentContext, ...
		//
		// Pushes the value of the current context onto the stack.
		pushContext: function pushContext() {
		  this.pushStackLiteral(this.contextName(this.lastContext));
		},
  
		// [lookupOnContext]
		//
		// On stack, before: ...
		// On stack, after: currentContext[name], ...
		//
		// Looks up the value of `name` on the current context and pushes
		// it onto the stack.
		lookupOnContext: function lookupOnContext(parts, falsy, strict, scoped) {
		  var i = 0;
  
		  if (!scoped && this.options.compat && !this.lastContext) {
			// The depthed query is expected to handle the undefined logic for the root level that
			// is implemented below, so we evaluate that directly in compat mode
			this.push(this.depthedLookup(parts[i++]));
		  } else {
			this.pushContext();
		  }
  
		  this.resolvePath('context', parts, i, falsy, strict);
		},
  
		// [lookupBlockParam]
		//
		// On stack, before: ...
		// On stack, after: blockParam[name], ...
		//
		// Looks up the value of `parts` on the given block param and pushes
		// it onto the stack.
		lookupBlockParam: function lookupBlockParam(blockParamId, parts) {
		  this.useBlockParams = true;
  
		  this.push(['blockParams[', blockParamId[0], '][', blockParamId[1], ']']);
		  this.resolvePath('context', parts, 1);
		},
  
		// [lookupData]
		//
		// On stack, before: ...
		// On stack, after: data, ...
		//
		// Push the data lookup operator
		lookupData: function lookupData(depth, parts, strict) {
		  if (!depth) {
			this.pushStackLiteral('data');
		  } else {
			this.pushStackLiteral('container.data(data, ' + depth + ')');
		  }
  
		  this.resolvePath('data', parts, 0, true, strict);
		},
  
		resolvePath: function resolvePath(type, parts, i, falsy, strict) {
		  // istanbul ignore next
  
		  var _this = this;
  
		  if (this.options.strict || this.options.assumeObjects) {
			this.push(strictLookup(this.options.strict && strict, this, parts, type));
			return;
		  }
  
		  var len = parts.length;
		  for (; i < len; i++) {
			/* eslint-disable no-loop-func */
			this.replaceStack(function (current) {
			  var lookup = _this.nameLookup(current, parts[i], type);
			  // We want to ensure that zero and false are handled properly if the context (falsy flag)
			  // needs to have the special handling for these values.
			  if (!falsy) {
				return [' != null ? ', lookup, ' : ', current];
			  } else {
				// Otherwise we can use generic falsy handling
				return [' && ', lookup];
			  }
			});
			/* eslint-enable no-loop-func */
		  }
		},
  
		// [resolvePossibleLambda]
		//
		// On stack, before: value, ...
		// On stack, after: resolved value, ...
		//
		// If the `value` is a lambda, replace it on the stack by
		// the return value of the lambda
		resolvePossibleLambda: function resolvePossibleLambda() {
		  this.push([this.aliasable('container.lambda'), '(', this.popStack(), ', ', this.contextName(0), ')']);
		},
  
		// [pushStringParam]
		//
		// On stack, before: ...
		// On stack, after: string, currentContext, ...
		//
		// This opcode is designed for use in string mode, which
		// provides the string value of a parameter along with its
		// depth rather than resolving it immediately.
		pushStringParam: function pushStringParam(string, type) {
		  this.pushContext();
		  this.pushString(type);
  
		  // If it's a subexpression, the string result
		  // will be pushed after this opcode.
		  if (type !== 'SubExpression') {
			if (typeof string === 'string') {
			  this.pushString(string);
			} else {
			  this.pushStackLiteral(string);
			}
		  }
		},
  
		emptyHash: function emptyHash(omitEmpty) {
		  if (this.trackIds) {
			this.push('{}'); // hashIds
		  }
		  if (this.stringParams) {
			this.push('{}'); // hashContexts
			this.push('{}'); // hashTypes
		  }
		  this.pushStackLiteral(omitEmpty ? 'undefined' : '{}');
		},
		pushHash: function pushHash() {
		  if (this.hash) {
			this.hashes.push(this.hash);
		  }
		  this.hash = { values: [], types: [], contexts: [], ids: [] };
		},
		popHash: function popHash() {
		  var hash = this.hash;
		  this.hash = this.hashes.pop();
  
		  if (this.trackIds) {
			this.push(this.objectLiteral(hash.ids));
		  }
		  if (this.stringParams) {
			this.push(this.objectLiteral(hash.contexts));
			this.push(this.objectLiteral(hash.types));
		  }
  
		  this.push(this.objectLiteral(hash.values));
		},
  
		// [pushString]
		//
		// On stack, before: ...
		// On stack, after: quotedString(string), ...
		//
		// Push a quoted version of `string` onto the stack
		pushString: function pushString(string) {
		  this.pushStackLiteral(this.quotedString(string));
		},
  
		// [pushLiteral]
		//
		// On stack, before: ...
		// On stack, after: value, ...
		//
		// Pushes a value onto the stack. This operation prevents
		// the compiler from creating a temporary variable to hold
		// it.
		pushLiteral: function pushLiteral(value) {
		  this.pushStackLiteral(value);
		},
  
		// [pushProgram]
		//
		// On stack, before: ...
		// On stack, after: program(guid), ...
		//
		// Push a program expression onto the stack. This takes
		// a compile-time guid and converts it into a runtime-accessible
		// expression.
		pushProgram: function pushProgram(guid) {
		  if (guid != null) {
			this.pushStackLiteral(this.programExpression(guid));
		  } else {
			this.pushStackLiteral(null);
		  }
		},
  
		// [registerDecorator]
		//
		// On stack, before: hash, program, params..., ...
		// On stack, after: ...
		//
		// Pops off the decorator's parameters, invokes the decorator,
		// and inserts the decorator into the decorators list.
		registerDecorator: function registerDecorator(paramSize, name) {
		  var foundDecorator = this.nameLookup('decorators', name, 'decorator'),
			  options = this.setupHelperArgs(name, paramSize);
  
		  this.decorators.push(['fn = ', this.decorators.functionCall(foundDecorator, '', ['fn', 'props', 'container', options]), ' || fn;']);
		},
  
		// [invokeHelper]
		//
		// On stack, before: hash, inverse, program, params..., ...
		// On stack, after: result of helper invocation
		//
		// Pops off the helper's parameters, invokes the helper,
		// and pushes the helper's return value onto the stack.
		//
		// If the helper is not found, `helperMissing` is called.
		invokeHelper: function invokeHelper(paramSize, name, isSimple) {
		  var nonHelper = this.popStack(),
			  helper = this.setupHelper(paramSize, name);
  
		  var possibleFunctionCalls = [];
  
		  if (isSimple) {
			// direct call to helper
			possibleFunctionCalls.push(helper.name);
		  }
		  // call a function from the input object
		  possibleFunctionCalls.push(nonHelper);
		  if (!this.options.strict) {
			possibleFunctionCalls.push(this.aliasable('container.hooks.helperMissing'));
		  }
  
		  var functionLookupCode = ['(', this.itemsSeparatedBy(possibleFunctionCalls, '||'), ')'];
		  var functionCall = this.source.functionCall(functionLookupCode, 'call', helper.callParams);
		  this.push(functionCall);
		},
  
		itemsSeparatedBy: function itemsSeparatedBy(items, separator) {
		  var result = [];
		  result.push(items[0]);
		  for (var i = 1; i < items.length; i++) {
			result.push(separator, items[i]);
		  }
		  return result;
		},
		// [invokeKnownHelper]
		//
		// On stack, before: hash, inverse, program, params..., ...
		// On stack, after: result of helper invocation
		//
		// This operation is used when the helper is known to exist,
		// so a `helperMissing` fallback is not required.
		invokeKnownHelper: function invokeKnownHelper(paramSize, name) {
		  var helper = this.setupHelper(paramSize, name);
		  this.push(this.source.functionCall(helper.name, 'call', helper.callParams));
		},
  
		// [invokeAmbiguous]
		//
		// On stack, before: hash, inverse, program, params..., ...
		// On stack, after: result of disambiguation
		//
		// This operation is used when an expression like `{{foo}}`
		// is provided, but we don't know at compile-time whether it
		// is a helper or a path.
		//
		// This operation emits more code than the other options,
		// and can be avoided by passing the `knownHelpers` and
		// `knownHelpersOnly` flags at compile-time.
		invokeAmbiguous: function invokeAmbiguous(name, helperCall) {
		  this.useRegister('helper');
  
		  var nonHelper = this.popStack();
  
		  this.emptyHash();
		  var helper = this.setupHelper(0, name, helperCall);
  
		  var helperName = this.lastHelper = this.nameLookup('helpers', name, 'helper');
  
		  var lookup = ['(', '(helper = ', helperName, ' || ', nonHelper, ')'];
		  if (!this.options.strict) {
			lookup[0] = '(helper = ';
			lookup.push(' != null ? helper : ', this.aliasable('container.hooks.helperMissing'));
		  }
  
		  this.push(['(', lookup, helper.paramsInit ? ['),(', helper.paramsInit] : [], '),', '(typeof helper === ', this.aliasable('"function"'), ' ? ', this.source.functionCall('helper', 'call', helper.callParams), ' : helper))']);
		},
  
		// [invokePartial]
		//
		// On stack, before: context, ...
		// On stack after: result of partial invocation
		//
		// This operation pops off a context, invokes a partial with that context,
		// and pushes the result of the invocation back.
		invokePartial: function invokePartial(isDynamic, name, indent) {
		  var params = [],
			  options = this.setupParams(name, 1, params);
  
		  if (isDynamic) {
			name = this.popStack();
			delete options.name;
		  }
  
		  if (indent) {
			options.indent = JSON.stringify(indent);
		  }
		  options.helpers = 'helpers';
		  options.partials = 'partials';
		  options.decorators = 'container.decorators';
  
		  if (!isDynamic) {
			params.unshift(this.nameLookup('partials', name, 'partial'));
		  } else {
			params.unshift(name);
		  }
  
		  if (this.options.compat) {
			options.depths = 'depths';
		  }
		  options = this.objectLiteral(options);
		  params.push(options);
  
		  this.push(this.source.functionCall('container.invokePartial', '', params));
		},
  
		// [assignToHash]
		//
		// On stack, before: value, ..., hash, ...
		// On stack, after: ..., hash, ...
		//
		// Pops a value off the stack and assigns it to the current hash
		assignToHash: function assignToHash(key) {
		  var value = this.popStack(),
			  context = undefined,
			  type = undefined,
			  id = undefined;
  
		  if (this.trackIds) {
			id = this.popStack();
		  }
		  if (this.stringParams) {
			type = this.popStack();
			context = this.popStack();
		  }
  
		  var hash = this.hash;
		  if (context) {
			hash.contexts[key] = context;
		  }
		  if (type) {
			hash.types[key] = type;
		  }
		  if (id) {
			hash.ids[key] = id;
		  }
		  hash.values[key] = value;
		},
  
		pushId: function pushId(type, name, child) {
		  if (type === 'BlockParam') {
			this.pushStackLiteral('blockParams[' + name[0] + '].path[' + name[1] + ']' + (child ? ' + ' + JSON.stringify('.' + child) : ''));
		  } else if (type === 'PathExpression') {
			this.pushString(name);
		  } else if (type === 'SubExpression') {
			this.pushStackLiteral('true');
		  } else {
			this.pushStackLiteral('null');
		  }
		},
  
		// HELPERS
  
		compiler: JavaScriptCompiler,
  
		compileChildren: function compileChildren(environment, options) {
		  var children = environment.children,
			  child = undefined,
			  compiler = undefined;
  
		  for (var i = 0, l = children.length; i < l; i++) {
			child = children[i];
			compiler = new this.compiler(); // eslint-disable-line new-cap
  
			var existing = this.matchExistingProgram(child);
  
			if (existing == null) {
			  this.context.programs.push(''); // Placeholder to prevent name conflicts for nested children
			  var index = this.context.programs.length;
			  child.index = index;
			  child.name = 'program' + index;
			  this.context.programs[index] = compiler.compile(child, options, this.context, !this.precompile);
			  this.context.decorators[index] = compiler.decorators;
			  this.context.environments[index] = child;
  
			  this.useDepths = this.useDepths || compiler.useDepths;
			  this.useBlockParams = this.useBlockParams || compiler.useBlockParams;
			  child.useDepths = this.useDepths;
			  child.useBlockParams = this.useBlockParams;
			} else {
			  child.index = existing.index;
			  child.name = 'program' + existing.index;
  
			  this.useDepths = this.useDepths || existing.useDepths;
			  this.useBlockParams = this.useBlockParams || existing.useBlockParams;
			}
		  }
		},
		matchExistingProgram: function matchExistingProgram(child) {
		  for (var i = 0, len = this.context.environments.length; i < len; i++) {
			var environment = this.context.environments[i];
			if (environment && environment.equals(child)) {
			  return environment;
			}
		  }
		},
  
		programExpression: function programExpression(guid) {
		  var child = this.environment.children[guid],
			  programParams = [child.index, 'data', child.blockParams];
  
		  if (this.useBlockParams || this.useDepths) {
			programParams.push('blockParams');
		  }
		  if (this.useDepths) {
			programParams.push('depths');
		  }
  
		  return 'container.program(' + programParams.join(', ') + ')';
		},
  
		useRegister: function useRegister(name) {
		  if (!this.registers[name]) {
			this.registers[name] = true;
			this.registers.list.push(name);
		  }
		},
  
		push: function push(expr) {
		  if (!(expr instanceof Literal)) {
			expr = this.source.wrap(expr);
		  }
  
		  this.inlineStack.push(expr);
		  return expr;
		},
  
		pushStackLiteral: function pushStackLiteral(item) {
		  this.push(new Literal(item));
		},
  
		pushSource: function pushSource(source) {
		  if (this.pendingContent) {
			this.source.push(this.appendToBuffer(this.source.quotedString(this.pendingContent), this.pendingLocation));
			this.pendingContent = undefined;
		  }
  
		  if (source) {
			this.source.push(source);
		  }
		},
  
		replaceStack: function replaceStack(callback) {
		  var prefix = ['('],
			  stack = undefined,
			  createdStack = undefined,
			  usedLiteral = undefined;
  
		  /* istanbul ignore next */
		  if (!this.isInline()) {
			throw new _exception2['default']('replaceStack on non-inline');
		  }
  
		  // We want to merge the inline statement into the replacement statement via ','
		  var top = this.popStack(true);
  
		  if (top instanceof Literal) {
			// Literals do not need to be inlined
			stack = [top.value];
			prefix = ['(', stack];
			usedLiteral = true;
		  } else {
			// Get or create the current stack name for use by the inline
			createdStack = true;
			var _name = this.incrStack();
  
			prefix = ['((', this.push(_name), ' = ', top, ')'];
			stack = this.topStack();
		  }
  
		  var item = callback.call(this, stack);
  
		  if (!usedLiteral) {
			this.popStack();
		  }
		  if (createdStack) {
			this.stackSlot--;
		  }
		  this.push(prefix.concat(item, ')'));
		},
  
		incrStack: function incrStack() {
		  this.stackSlot++;
		  if (this.stackSlot > this.stackVars.length) {
			this.stackVars.push('stack' + this.stackSlot);
		  }
		  return this.topStackName();
		},
		topStackName: function topStackName() {
		  return 'stack' + this.stackSlot;
		},
		flushInline: function flushInline() {
		  var inlineStack = this.inlineStack;
		  this.inlineStack = [];
		  for (var i = 0, len = inlineStack.length; i < len; i++) {
			var entry = inlineStack[i];
			/* istanbul ignore if */
			if (entry instanceof Literal) {
			  this.compileStack.push(entry);
			} else {
			  var stack = this.incrStack();
			  this.pushSource([stack, ' = ', entry, ';']);
			  this.compileStack.push(stack);
			}
		  }
		},
		isInline: function isInline() {
		  return this.inlineStack.length;
		},
  
		popStack: function popStack(wrapped) {
		  var inline = this.isInline(),
			  item = (inline ? this.inlineStack : this.compileStack).pop();
  
		  if (!wrapped && item instanceof Literal) {
			return item.value;
		  } else {
			if (!inline) {
			  /* istanbul ignore next */
			  if (!this.stackSlot) {
				throw new _exception2['default']('Invalid stack pop');
			  }
			  this.stackSlot--;
			}
			return item;
		  }
		},
  
		topStack: function topStack() {
		  var stack = this.isInline() ? this.inlineStack : this.compileStack,
			  item = stack[stack.length - 1];
  
		  /* istanbul ignore if */
		  if (item instanceof Literal) {
			return item.value;
		  } else {
			return item;
		  }
		},
  
		contextName: function contextName(context) {
		  if (this.useDepths && context) {
			return 'depths[' + context + ']';
		  } else {
			return 'depth' + context;
		  }
		},
  
		quotedString: function quotedString(str) {
		  return this.source.quotedString(str);
		},
  
		objectLiteral: function objectLiteral(obj) {
		  return this.source.objectLiteral(obj);
		},
  
		aliasable: function aliasable(name) {
		  var ret = this.aliases[name];
		  if (ret) {
			ret.referenceCount++;
			return ret;
		  }
  
		  ret = this.aliases[name] = this.source.wrap(name);
		  ret.aliasable = true;
		  ret.referenceCount = 1;
  
		  return ret;
		},
  
		setupHelper: function setupHelper(paramSize, name, blockHelper) {
		  var params = [],
			  paramsInit = this.setupHelperArgs(name, paramSize, params, blockHelper);
		  var foundHelper = this.nameLookup('helpers', name, 'helper'),
			  callContext = this.aliasable(this.contextName(0) + ' != null ? ' + this.contextName(0) + ' : (container.nullContext || {})');
  
		  return {
			params: params,
			paramsInit: paramsInit,
			name: foundHelper,
			callParams: [callContext].concat(params)
		  };
		},
  
		setupParams: function setupParams(helper, paramSize, params) {
		  var options = {},
			  contexts = [],
			  types = [],
			  ids = [],
			  objectArgs = !params,
			  param = undefined;
  
		  if (objectArgs) {
			params = [];
		  }
  
		  options.name = this.quotedString(helper);
		  options.hash = this.popStack();
  
		  if (this.trackIds) {
			options.hashIds = this.popStack();
		  }
		  if (this.stringParams) {
			options.hashTypes = this.popStack();
			options.hashContexts = this.popStack();
		  }
  
		  var inverse = this.popStack(),
			  program = this.popStack();
  
		  // Avoid setting fn and inverse if neither are set. This allows
		  // helpers to do a check for `if (options.fn)`
		  if (program || inverse) {
			options.fn = program || 'container.noop';
			options.inverse = inverse || 'container.noop';
		  }
  
		  // The parameters go on to the stack in order (making sure that they are evaluated in order)
		  // so we need to pop them off the stack in reverse order
		  var i = paramSize;
		  while (i--) {
			param = this.popStack();
			params[i] = param;
  
			if (this.trackIds) {
			  ids[i] = this.popStack();
			}
			if (this.stringParams) {
			  types[i] = this.popStack();
			  contexts[i] = this.popStack();
			}
		  }
  
		  if (objectArgs) {
			options.args = this.source.generateArray(params);
		  }
  
		  if (this.trackIds) {
			options.ids = this.source.generateArray(ids);
		  }
		  if (this.stringParams) {
			options.types = this.source.generateArray(types);
			options.contexts = this.source.generateArray(contexts);
		  }
  
		  if (this.options.data) {
			options.data = 'data';
		  }
		  if (this.useBlockParams) {
			options.blockParams = 'blockParams';
		  }
		  return options;
		},
  
		setupHelperArgs: function setupHelperArgs(helper, paramSize, params, useRegister) {
		  var options = this.setupParams(helper, paramSize, params);
		  options = this.objectLiteral(options);
		  if (useRegister) {
			this.useRegister('options');
			params.push('options');
			return ['options=', options];
		  } else if (params) {
			params.push(options);
			return '';
		  } else {
			return options;
		  }
		}
	  };
  
	  (function () {
		var reservedWords = ('break else new var' + ' case finally return void' + ' catch for switch while' + ' continue function this with' + ' default if throw' + ' delete in try' + ' do instanceof typeof' + ' abstract enum int short' + ' boolean export interface static' + ' byte extends long super' + ' char final native synchronized' + ' class float package throws' + ' const goto private transient' + ' debugger implements protected volatile' + ' double import public let yield await' + ' null true false').split(' ');
  
		var compilerWords = JavaScriptCompiler.RESERVED_WORDS = {};
  
		for (var i = 0, l = reservedWords.length; i < l; i++) {
		  compilerWords[reservedWords[i]] = true;
		}
	  })();
  
	  JavaScriptCompiler.isValidJavaScriptVariableName = function (name) {
		return !JavaScriptCompiler.RESERVED_WORDS[name] && /^[a-zA-Z_$][0-9a-zA-Z_$]*$/.test(name);
	  };
  
	  function strictLookup(requireTerminal, compiler, parts, type) {
		var stack = compiler.popStack(),
			i = 0,
			len = parts.length;
		if (requireTerminal) {
		  len--;
		}
  
		for (; i < len; i++) {
		  stack = compiler.nameLookup(stack, parts[i], type);
		}
  
		if (requireTerminal) {
		  return [compiler.aliasable('container.strict'), '(', stack, ', ', compiler.quotedString(parts[i]), ')'];
		} else {
		  return stack;
		}
	  }
  
	  exports['default'] = JavaScriptCompiler;
	  module.exports = exports['default'];
  
  /***/ }),
  /* 43 */
  /***/ (function(module, exports, __webpack_require__) {
  
	  /* global define */
	  'use strict';
  
	  exports.__esModule = true;
  
	  var _utils = __webpack_require__(5);
  
	  var SourceNode = undefined;
  
	  try {
		/* istanbul ignore next */
		if (false) {
		  // We don't support this in AMD environments. For these environments, we asusme that
		  // they are running on the browser and thus have no need for the source-map library.
		  var SourceMap = require('source-map');
		  SourceNode = SourceMap.SourceNode;
		}
	  } catch (err) {}
	  /* NOP */
  
	  /* istanbul ignore if: tested but not covered in istanbul due to dist build  */
	  if (!SourceNode) {
		SourceNode = function (line, column, srcFile, chunks) {
		  this.src = '';
		  if (chunks) {
			this.add(chunks);
		  }
		};
		/* istanbul ignore next */
		SourceNode.prototype = {
		  add: function add(chunks) {
			if (_utils.isArray(chunks)) {
			  chunks = chunks.join('');
			}
			this.src += chunks;
		  },
		  prepend: function prepend(chunks) {
			if (_utils.isArray(chunks)) {
			  chunks = chunks.join('');
			}
			this.src = chunks + this.src;
		  },
		  toStringWithSourceMap: function toStringWithSourceMap() {
			return { code: this.toString() };
		  },
		  toString: function toString() {
			return this.src;
		  }
		};
	  }
  
	  function castChunk(chunk, codeGen, loc) {
		if (_utils.isArray(chunk)) {
		  var ret = [];
  
		  for (var i = 0, len = chunk.length; i < len; i++) {
			ret.push(codeGen.wrap(chunk[i], loc));
		  }
		  return ret;
		} else if (typeof chunk === 'boolean' || typeof chunk === 'number') {
		  // Handle primitives that the SourceNode will throw up on
		  return chunk + '';
		}
		return chunk;
	  }
  
	  function CodeGen(srcFile) {
		this.srcFile = srcFile;
		this.source = [];
	  }
  
	  CodeGen.prototype = {
		isEmpty: function isEmpty() {
		  return !this.source.length;
		},
		prepend: function prepend(source, loc) {
		  this.source.unshift(this.wrap(source, loc));
		},
		push: function push(source, loc) {
		  this.source.push(this.wrap(source, loc));
		},
  
		merge: function merge() {
		  var source = this.empty();
		  this.each(function (line) {
			source.add(['  ', line, '\n']);
		  });
		  return source;
		},
  
		each: function each(iter) {
		  for (var i = 0, len = this.source.length; i < len; i++) {
			iter(this.source[i]);
		  }
		},
  
		empty: function empty() {
		  var loc = this.currentLocation || { start: {} };
		  return new SourceNode(loc.start.line, loc.start.column, this.srcFile);
		},
		wrap: function wrap(chunk) {
		  var loc = arguments.length <= 1 || arguments[1] === undefined ? this.currentLocation || { start: {} } : arguments[1];
  
		  if (chunk instanceof SourceNode) {
			return chunk;
		  }
  
		  chunk = castChunk(chunk, this, loc);
  
		  return new SourceNode(loc.start.line, loc.start.column, this.srcFile, chunk);
		},
  
		functionCall: function functionCall(fn, type, params) {
		  params = this.generateList(params);
		  return this.wrap([fn, type ? '.' + type + '(' : '(', params, ')']);
		},
  
		quotedString: function quotedString(str) {
		  return '"' + (str + '').replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/\n/g, '\\n').replace(/\r/g, '\\r').replace(/\u2028/g, '\\u2028') // Per Ecma-262 7.3 + 7.8.4
		  .replace(/\u2029/g, '\\u2029') + '"';
		},
  
		objectLiteral: function objectLiteral(obj) {
		  var pairs = [];
  
		  for (var key in obj) {
			if (obj.hasOwnProperty(key)) {
			  var value = castChunk(obj[key], this);
			  if (value !== 'undefined') {
				pairs.push([this.quotedString(key), ':', value]);
			  }
			}
		  }
  
		  var ret = this.generateList(pairs);
		  ret.prepend('{');
		  ret.add('}');
		  return ret;
		},
  
		generateList: function generateList(entries) {
		  var ret = this.empty();
  
		  for (var i = 0, len = entries.length; i < len; i++) {
			if (i) {
			  ret.add(',');
			}
  
			ret.add(castChunk(entries[i], this));
		  }
  
		  return ret;
		},
  
		generateArray: function generateArray(entries) {
		  var ret = this.generateList(entries);
		  ret.prepend('[');
		  ret.add(']');
  
		  return ret;
		}
	  };
  
	  exports['default'] = CodeGen;
	  module.exports = exports['default'];
  
  /***/ })
  /******/ ])
  });
  ;
  
  /*
	  Swag v0.6.1 <http://elving.github.com/swag/>
	  Copyright 2012 Elving Rodriguez <http://elving.me/>
	  Available under MIT license <https://raw.github.com/elving/swag/master/LICENSE>
  */
  
  !function(){var e,r,n,t,a=[].indexOf||function(e){for(var r=0,n=this.length;n>r;r++)if(r in this&&this[r]===e)return r;return-1};"undefined"!=typeof window&&null!==window?window.Swag=n={}:"undefined"!=typeof module&&null!==module&&(module.exports=n={}),n.helpers={},n.addHelper=function(e,r,a){return null==a&&(a=[]),a instanceof Array||(a=[a]),n.helpers[e]=function(){var n,i,u,s,o;for(t.verify(e,arguments,a),i=Array.prototype.slice.apply(arguments),u=[],s=0,o=i.length;o>s;s++)n=i[s],t.isHandlebarsSpecific(n)||(n=t.result(n)),u.push(n);return r.apply(this,u)}},n.registerHelpers=function(e){var r,t,a,i;e?n.Handlebars=e:"undefined"!=typeof window&&null!==window?n.Handlebars=null!=window.Ember?Ember.Handlebars:window.Handlebars:"undefined"!=typeof module&&null!==module&&(n.Handlebars=require("handlebars")),n.registerHelper=function(e,r){return"undefined"!=typeof window&&null!==window&&window.Ember?n.Handlebars.helper(e,r):n.Handlebars.registerHelper(e,r)},a=n.helpers,i=[];for(t in a)r=a[t],i.push(n.registerHelper(t,r));return i},n.Config={partialsPath:"",precompiledTemplates:!0},t={},t.isHandlebarsSpecific=function(e){return e&&null!=e.fn||e&&null!=e.hash},t.isUndefined=function(e){return void 0===e||null===e||t.isHandlebarsSpecific(e)},t.safeString=function(e){return new n.Handlebars.SafeString(e)},t.trim=function(e){var r;return r=/\S/.test(" ")?/^[\s\xA0]+|[\s\xA0]+$/g:/^\s+|\s+$/g,e.toString().replace(r,"")},t.isFunc=function(e){return"function"==typeof e},t.isString=function(e){return"string"==typeof e},t.result=function(e){return t.isFunc(e)?e():e},t.err=function(e){throw new Error(e)},t.verify=function(e,r,n){var a,i,u,s,o,d;for(null==n&&(n=[]),r=Array.prototype.slice.apply(r).slice(0,n.length),d=[],i=s=0,o=r.length;o>s;i=++s)a=r[i],u="{{"+e+"}} requires "+n.length+" arguments "+n.join(", ")+".",n[i].indexOf("safe:")>-1?t.isHandlebarsSpecific(a)?d.push(t.err(u)):d.push(void 0):t.isUndefined(a)?d.push(t.err(u)):d.push(void 0);return d},n.addHelper("lowercase",function(e){return e.toLowerCase()},"string"),n.addHelper("uppercase",function(e){return e.toUpperCase()},"string"),n.addHelper("capitalizeFirst",function(e){return e.charAt(0).toUpperCase()+e.slice(1)},"string"),n.addHelper("capitalizeEach",function(e){return e.replace(/\w\S*/g,function(e){return e.charAt(0).toUpperCase()+e.substr(1)})},"string"),n.addHelper("titleize",function(e){var r,n,t,a;return n=e.replace(/[ \-_]+/g," "),a=n.match(/\w+/g)||[],r=function(e){return e.charAt(0).toUpperCase()+e.slice(1)},function(){var e,n,i;for(i=[],e=0,n=a.length;n>e;e++)t=a[e],i.push(r(t));return i}().join(" ")},"string"),n.addHelper("sentence",function(e){return e.replace(/((?:\S[^\.\?\!]*)[\.\?\!]*)/g,function(e){return e.charAt(0).toUpperCase()+e.substr(1).toLowerCase()})},"string"),n.addHelper("reverse",function(e){return e.split("").reverse().join("")},"string"),n.addHelper("truncate",function(e,r,n){return t.isUndefined(n)&&(n=""),e.length>r?e.substring(0,r-n.length)+n:e},["string","number"]),n.addHelper("center",function(e,r){var n,a;for(r=t.result(r),a="",n=0;r>n;)a+="&nbsp;",n++;return""+a+e+a},"string"),n.addHelper("newLineToBr",function(e){return e.replace(/\r?\n|\r/g,"<br>")},"string"),n.addHelper("sanitize",function(e,r){return t.isUndefined(r)&&(r="-"),e.replace(/[^a-z0-9]/gi,r)},"string"),n.addHelper("first",function(e,r){return t.isUndefined(r)||(r=parseFloat(r)),t.isUndefined(r)?e[0]:e.slice(0,r)},"array"),n.addHelper("withFirst",function(e,r,n){var a,i;if(t.isUndefined(r)||(r=parseFloat(r)),t.isUndefined(r))return n=r,n.fn(e[0]);e=e.slice(0,r),i="";for(a in e)i+=n.fn(e[a]);return i},"array"),n.addHelper("last",function(e,r){return t.isUndefined(r)||(r=parseFloat(r)),t.isUndefined(r)?e[e.length-1]:e.slice(-r)},"array"),n.addHelper("withLast",function(e,r,n){var a,i;if(t.isUndefined(r)||(r=parseFloat(r)),t.isUndefined(r))return n=r,n.fn(e[e.length-1]);e=e.slice(-r),i="";for(a in e)i+=n.fn(e[a]);return i},"array"),n.addHelper("after",function(e,r){return t.isUndefined(r)||(r=parseFloat(r)),e.slice(r)},["array","number"]),n.addHelper("withAfter",function(e,r,n){var a,i;t.isUndefined(r)||(r=parseFloat(r)),e=e.slice(r),i="";for(a in e)i+=n.fn(e[a]);return i},["array","number"]),n.addHelper("before",function(e,r){return t.isUndefined(r)||(r=parseFloat(r)),e.slice(0,-r)},["array","number"]),n.addHelper("withBefore",function(e,r,n){var a,i;t.isUndefined(r)||(r=parseFloat(r)),e=e.slice(0,-r),i="";for(a in e)i+=n.fn(e[a]);return i},["array","number"]),n.addHelper("join",function(e,r){return e.join(t.isUndefined(r)?" ":r)},"array"),n.addHelper("sort",function(e,r){return t.isUndefined(r)?e.sort():e.sort(function(e,n){return e[r]>n[r]})},"array"),n.addHelper("withSort",function(e,r,n){var a,i,u,s;if(i="",t.isUndefined(r))for(n=r,e=e.sort(),u=0,s=e.length;s>u;u++)a=e[u],i+=n.fn(a);else{e=e.sort(function(e,n){return e[r]>n[r]});for(a in e)i+=n.fn(e[a])}return i},"array"),n.addHelper("length",function(e){return e.length},"array"),n.addHelper("lengthEqual",function(e,r,n){return t.isUndefined(r)||(r=parseFloat(r)),e.length===r?n.fn(this):n.inverse(this)},["array","number"]),n.addHelper("empty",function(e,r){return!e||e.length<=0?r.fn(this):r.inverse(this)},"safe:array"),n.addHelper("any",function(e,r){return e&&e.length>0?r.fn(this):r.inverse(this)},"safe:array"),n.addHelper("inArray",function(e,r,n){return a.call(e,r)>=0?n.fn(this):n.inverse(this)},["array","string|number"]),n.addHelper("eachIndex",function(e,r){var n,t,a,i,u;for(t="",n=i=0,u=e.length;u>i;n=++i)a=e[n],t+=r.fn({item:a,index:n});return t},"array"),n.addHelper("eachProperty",function(e,r){var n,t,a;t="";for(n in e)a=e[n],t+=r.fn({key:n,value:a});return t},"object"),n.addHelper("add",function(e,r){return e=parseFloat(e),r=parseFloat(r),e+r},["number","number"]),n.addHelper("subtract",function(e,r){return e=parseFloat(e),r=parseFloat(r),e-r},["number","number"]),n.addHelper("divide",function(e,r){return e=parseFloat(e),r=parseFloat(r),e/r},["number","number"]),n.addHelper("multiply",function(e,r){return e=parseFloat(e),r=parseFloat(r),e*r},["number","number"]),n.addHelper("floor",function(e){return e=parseFloat(e),Math.floor(e)},"number"),n.addHelper("ceil",function(e){return e=parseFloat(e),Math.ceil(e)},"number"),n.addHelper("round",function(e){return e=parseFloat(e),Math.round(e)},"number"),n.addHelper("toFixed",function(e,r){return e=parseFloat(e),r=t.isUndefined(r)?0:r,e.toFixed(r)},"number"),n.addHelper("toPrecision",function(e,r){return e=parseFloat(e),r=t.isUndefined(r)?1:r,e.toPrecision(r)},"number"),n.addHelper("toExponential",function(e,r){return e=parseFloat(e),r=t.isUndefined(r)?0:r,e.toExponential(r)},"number"),n.addHelper("toInt",function(e){return parseInt(e,10)},"number"),n.addHelper("toFloat",function(e){return parseFloat(e)},"number"),n.addHelper("digitGrouping",function(e,r){return e=parseFloat(e),r=t.isUndefined(r)?",":r,e.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g,"$1"+r)},"number"),n.addHelper("is",function(e,r,n){return e&&e===r?n.fn(this):n.inverse(this)},["safe:string|number","safe:string|number"]),n.addHelper("isnt",function(e,r,n){return e&&e===r?n.inverse(this):n.fn(this)},["safe:string|number","safe:string|number"]),n.addHelper("gt",function(e,r,n){return e>r?n.fn(this):n.inverse(this)},["safe:string|number","safe:string|number"]),n.addHelper("gte",function(e,r,n){return e>=r?n.fn(this):n.inverse(this)},["safe:string|number","safe:string|number"]),n.addHelper("lt",function(e,r,n){return r>e?n.fn(this):n.inverse(this)},["safe:string|number","safe:string|number"]),n.addHelper("lte",function(e,r,n){return r>=e?n.fn(this):n.inverse(this)},["safe:string|number","safe:string|number"]),n.addHelper("or",function(e,r,n){return e||r?n.fn(this):n.inverse(this)},["safe:string|number","safe:string|number"]),n.addHelper("and",function(e,r,n){return e&&r?n.fn(this):n.inverse(this)},["safe:string|number","safe:string|number"]),e={},e.padNumber=function(e,r,n){var t,a;if("undefined"==typeof n&&(n="0"),t=r-String(e).length,a="",t>0)for(;t--;)a+=n;return a+e},e.dayOfYear=function(e){var r;return r=new Date(e.getFullYear(),0,1),Math.ceil((e-r)/864e5)},e.weekOfYear=function(e){var r;return r=new Date(e.getFullYear(),0,1),Math.ceil(((e-r)/864e5+r.getDay()+1)/7)},e.isoWeekOfYear=function(e){var r,n,t,a;return a=new Date(e.valueOf()),n=(e.getDay()+6)%7,a.setDate(a.getDate()-n+3),t=new Date(a.getFullYear(),0,4),r=(a-t)/864e5,1+Math.ceil(r/7)},e.tweleveHour=function(e){return e.getHours()>12?e.getHours()-12:e.getHours()},e.timeZoneOffset=function(r){var n,t;return n=-r.getTimezoneOffset()/60,t=e.padNumber(Math.abs(n),4),(n>0?"+":"-")+t},e.format=function(r,n){return n.replace(e.formats,function(n,t){switch(t){case"a":return e.abbreviatedWeekdays[r.getDay()];case"A":return e.fullWeekdays[r.getDay()];case"b":return e.abbreviatedMonths[r.getMonth()];case"B":return e.fullMonths[r.getMonth()];case"c":return r.toLocaleString();case"C":return Math.round(r.getFullYear()/100);case"d":return e.padNumber(r.getDate(),2);case"D":return e.format(r,"%m/%d/%y");case"e":return e.padNumber(r.getDate(),2," ");case"F":return e.format(r,"%Y-%m-%d");case"h":return e.format(r,"%b");case"H":return e.padNumber(r.getHours(),2);case"I":return e.padNumber(e.tweleveHour(r),2);case"j":return e.padNumber(e.dayOfYear(r),3);case"k":return e.padNumber(r.getHours(),2," ");case"l":return e.padNumber(e.tweleveHour(r),2," ");case"L":return e.padNumber(r.getMilliseconds(),3);case"m":return e.padNumber(r.getMonth()+1,2);case"M":return e.padNumber(r.getMinutes(),2);case"n":return"\n";case"p":return r.getHours()>11?"PM":"AM";case"P":return e.format(r,"%p").toLowerCase();case"r":return e.format(r,"%I:%M:%S %p");case"R":return e.format(r,"%H:%M");case"s":return r.getTime()/1e3;case"S":return e.padNumber(r.getSeconds(),2);case"t":return"  ";case"T":return e.format(r,"%H:%M:%S");case"u":return 0===r.getDay()?7:r.getDay();case"U":return e.padNumber(e.weekOfYear(r),2);case"v":return e.format(r,"%e-%b-%Y");case"V":return e.padNumber(e.isoWeekOfYear(r),2);case"W":return e.padNumber(e.weekOfYear(r),2);case"w":return e.padNumber(r.getDay(),2);case"x":return r.toLocaleDateString();case"X":return r.toLocaleTimeString();case"y":return String(r.getFullYear()).substring(2);case"Y":return r.getFullYear();case"z":return e.timeZoneOffset(r);default:return match}})},e.formats=/%(a|A|b|B|c|C|d|D|e|F|h|H|I|j|k|l|L|m|M|n|p|P|r|R|s|S|t|T|u|U|v|V|W|w|x|X|y|Y|z)/g,e.abbreviatedWeekdays=["Sun","Mon","Tue","Wed","Thur","Fri","Sat"],e.fullWeekdays=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],e.abbreviatedMonths=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],e.fullMonths=["January","February","March","April","May","June","July","August","September","October","November","December"],n.addHelper("formatDate",function(r,n){return r=new Date(r),e.format(r,n)},["string|number|date","string"]),n.addHelper("now",function(r){var n;return n=new Date,t.isUndefined(r)?n:e.format(n,r)}),n.addHelper("timeago",function(e){var r,n;return e=new Date(e),n=Math.floor((new Date-e)/1e3),r=Math.floor(n/31536e3),r>1?""+r+" years ago":(r=Math.floor(n/2592e3),r>1?""+r+" months ago":(r=Math.floor(n/86400),r>1?""+r+" days ago":(r=Math.floor(n/3600),r>1?""+r+" hours ago":(r=Math.floor(n/60),r>1?""+r+" minutes ago":0===Math.floor(n)?"Just now":Math.floor(n)+" seconds ago"))))},"string|number|date"),n.addHelper("inflect",function(e,r,n,a){var i;return e=parseFloat(e),i=e>1||0===e?n:r,t.isUndefined(a)||a===!1?i:""+e+" "+i},["number","string","string"]),n.addHelper("ordinalize",function(e){var r,n;if(e=parseFloat(e),r=Math.abs(Math.round(e)),n=r%100,a.call([11,12,13],n)>=0)return""+e+"th";switch(r%10){case 1:return""+e+"st";case 2:return""+e+"nd";case 3:return""+e+"rd";default:return""+e+"th"}},"number"),r={},r.parseAttributes=function(e){return Object.keys(e).map(function(r){return""+r+'="'+e[r]+'"'}).join(" ")},n.addHelper("ul",function(e,n){return"<ul "+r.parseAttributes(n.hash)+">"+e.map(function(e){return"<li>"+n.fn(t.result(e))+"</li>"}).join("\n")+"</ul>"}),n.addHelper("ol",function(e,n){return"<ol "+r.parseAttributes(n.hash)+">"+e.map(function(e){return"<li>"+n.fn(t.result(e))+"</li>"}).join("\n")+"</ol>"}),n.addHelper("br",function(e){var r,n;if(r="<br>",!t.isUndefined(e))for(n=0;n<parseFloat(e)-1;)r+="<br>",n++;return t.safeString(r)}),n.addHelper("log",function(e){return console.log(e)},"string|number|boolean|array|object"),n.addHelper("debug",function(e){return console.log("Context: ",this),t.isUndefined(e)||console.log("Value: ",e),console.log("-----------------------------------------------")}),n.addHelper("default",function(e,r){return e||r},"safe:string|number","string|number"),("undefined"==typeof Ember||null===Ember)&&n.addHelper("partial",function(e,r,a){var i;return i=n.Config.partialsPath+e,null==n.Handlebars.partials[e]&&(t.isUndefined(a)?"undefined"!=typeof define&&null!==define&&t.isFunc(define)&&define.amd?(n.Config.precompiledTemplates||(i="!text"+i),require([i],function(r){return t.isString(r)&&(r=n.Handlebars.compile(r)),n.Handlebars.registerPartial(e,r)})):"undefined"!=typeof require&&null!==require?(a=require(i),t.isString(a)&&(a=n.Handlebars.compile(a)),n.Handlebars.registerPartial(e,a)):t.err("{{partial}} no amd or commonjs module support found."):(t.isString(a)&&(a=n.Handlebars.compile(a)),n.Handlebars.registerPartial(e,a))),t.safeString(n.Handlebars.partials[e](r))},"string")}.call(this);
  
  this["AKM"] = this["AKM"] || {};
  this["AKM"]["cenotaph-print-options"] = Handlebars.template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
	  return "<h2>Print Options</h2>\r\n\r\n\r\n<div class=\"print-options\">\r\n  <div class=\"option option-expanded\">\r\n    <a href=\"#\" class=\"print-option\">\r\n      <svg class=\"icon\">\r\n        <use xlink:href=\"#shape-expanded\" />\r\n      </svg>\r\n      <div href=\"#\" class=\"button button-primary\">Standard</div>\r\n      <p>Retains formatting for easy reading.  Photo included.</p>\r\n    </a>\r\n  </div>\r\n\r\n  <div class=\"option option-condensed\">\r\n    <a href=\"#\" class=\"print-option\" data-body-class=\"print-option-short\">\r\n      <svg class=\"icon\">\r\n        <use xlink:href=\"#shape-condensed\" />\r\n      </svg>\r\n      <div href=\"#\" class=\"button button-primary\">Compact</div>\r\n      <p> Reduced formatting, prints fewer pages. Photo not included.</p>\r\n  </div>\r\n</div>\r\n\r\n\r\n";
  },"useData":true});
  this["AKM"]["fancybox"] = this["AKM"]["fancybox"] || {};
  this["AKM"]["fancybox"]["extra-controls"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
	  var helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
		  if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
			return parent[propertyName];
		  }
		  return undefined
	  };
  
	return "	 <a class=\"fancybox-enlarge\" title=\"Enlarge image\" target=\"_blank\" href=\""
	  + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"downloadUrl") || (depth0 != null ? lookupProperty(depth0,"downloadUrl") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"downloadUrl","hash":{},"data":data,"loc":{"start":{"line":3,"column":74},"end":{"line":3,"column":89}}}) : helper)))
	  + "\"></a>\r\n";
  },"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
	  var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
		  if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
			return parent[propertyName];
		  }
		  return undefined
	  };
  
	return "<div class=\"fancybox-extra-controls\">\r\n"
	  + ((stack1 = lookupProperty(helpers,"if").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"downloadUrl") : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":2,"column":1},"end":{"line":4,"column":8}}})) != null ? stack1 : "")
	  + "</div>\r\n";
  },"useData":true});
  this["AKM"]["fancybox"]["extra-info"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
	  return "			<span class=\"slidecount\">\r\n				<p>\r\n";
  },"3":function(container,depth0,helpers,partials,data) {
	  var stack1, helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
		  if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
			return parent[propertyName];
		  }
		  return undefined
	  };
  
	return "					"
	  + ((stack1 = ((helper = (helper = lookupProperty(helpers,"item") || (depth0 != null ? lookupProperty(depth0,"item") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"item","hash":{},"data":data,"loc":{"start":{"line":10,"column":5},"end":{"line":10,"column":15}}}) : helper))) != null ? stack1 : "")
	  + " of\r\n";
  },"5":function(container,depth0,helpers,partials,data) {
	  var stack1, helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
		  if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
			return parent[propertyName];
		  }
		  return undefined
	  };
  
	return "					"
	  + ((stack1 = ((helper = (helper = lookupProperty(helpers,"count") || (depth0 != null ? lookupProperty(depth0,"count") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"count","hash":{},"data":data,"loc":{"start":{"line":13,"column":5},"end":{"line":13,"column":16}}}) : helper))) != null ? stack1 : "")
	  + " items\r\n				</p>\r\n			</span>\r\n";
  },"7":function(container,depth0,helpers,partials,data) {
	  var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), lookupProperty = container.lookupProperty || function(parent, propertyName) {
		  if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
			return parent[propertyName];
		  }
		  return undefined
	  };
  
	return "				<li>\r\n"
	  + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"title") : depth0),{"name":"if","hash":{},"fn":container.program(8, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":21,"column":5},"end":{"line":23,"column":12}}})) != null ? stack1 : "")
	  + "\r\n"
	  + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"ccText") : depth0),{"name":"if","hash":{},"fn":container.program(10, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":25,"column":5},"end":{"line":31,"column":12}}})) != null ? stack1 : "")
	  + "\r\n"
	  + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"caption") : depth0),{"name":"if","hash":{},"fn":container.program(12, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":33,"column":5},"end":{"line":36,"column":13}}})) != null ? stack1 : "")
	  + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"source") : depth0),{"name":"if","hash":{},"fn":container.program(14, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":37,"column":6},"end":{"line":39,"column":13}}})) != null ? stack1 : "")
	  + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"caption") : depth0),{"name":"if","hash":{},"fn":container.program(16, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":40,"column":6},"end":{"line":42,"column":12}}})) != null ? stack1 : "")
	  + "				</li>\r\n";
  },"8":function(container,depth0,helpers,partials,data) {
	  var stack1, helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
		  if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
			return parent[propertyName];
		  }
		  return undefined
	  };
  
	return "					<h3>"
	  + ((stack1 = ((helper = (helper = lookupProperty(helpers,"title") || (depth0 != null ? lookupProperty(depth0,"title") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"title","hash":{},"data":data,"loc":{"start":{"line":22,"column":9},"end":{"line":22,"column":20}}}) : helper))) != null ? stack1 : "")
	  + "</h3>\r\n";
  },"10":function(container,depth0,helpers,partials,data) {
	  var stack1, helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
		  if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
			return parent[propertyName];
		  }
		  return undefined
	  };
  
	return "					<li>\r\n						<span class=\"cc\">\r\n							"
	  + ((stack1 = ((helper = (helper = lookupProperty(helpers,"ccText") || (depth0 != null ? lookupProperty(depth0,"ccText") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"ccText","hash":{},"data":data,"loc":{"start":{"line":28,"column":7},"end":{"line":28,"column":19}}}) : helper))) != null ? stack1 : "")
	  + "\r\n						</span>\r\n					</li>\r\n";
  },"12":function(container,depth0,helpers,partials,data) {
	  var stack1, helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
		  if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
			return parent[propertyName];
		  }
		  return undefined
	  };
  
	return "					<p>\r\n						"
	  + ((stack1 = ((helper = (helper = lookupProperty(helpers,"caption") || (depth0 != null ? lookupProperty(depth0,"caption") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"caption","hash":{},"data":data,"loc":{"start":{"line":35,"column":6},"end":{"line":35,"column":19}}}) : helper))) != null ? stack1 : "")
	  + "\r\n";
  },"14":function(container,depth0,helpers,partials,data) {
	  var stack1, helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
		  if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
			return parent[propertyName];
		  }
		  return undefined
	  };
  
	return "						<span class=\"field-source\">"
	  + ((stack1 = ((helper = (helper = lookupProperty(helpers,"source") || (depth0 != null ? lookupProperty(depth0,"source") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"source","hash":{},"data":data,"loc":{"start":{"line":38,"column":33},"end":{"line":38,"column":45}}}) : helper))) != null ? stack1 : "")
	  + "</span>\r\n";
  },"16":function(container,depth0,helpers,partials,data) {
	  return "					</p>\r\n";
  },"18":function(container,depth0,helpers,partials,data) {
	  var stack1, helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
		  if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
			return parent[propertyName];
		  }
		  return undefined
	  };
  
	return "				<li>\r\n					<span class=\"credit\">"
	  + ((stack1 = ((helper = (helper = lookupProperty(helpers,"credit") || (depth0 != null ? lookupProperty(depth0,"credit") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"credit","hash":{},"data":data,"loc":{"start":{"line":48,"column":26},"end":{"line":48,"column":38}}}) : helper))) != null ? stack1 : "")
	  + "</span>\r\n				</li>\r\n";
  },"20":function(container,depth0,helpers,partials,data) {
	  var stack1, helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
		  if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
			return parent[propertyName];
		  }
		  return undefined
	  };
  
	return "				<li>\r\n					<span class=\"copyright\">"
	  + ((stack1 = ((helper = (helper = lookupProperty(helpers,"copyright") || (depth0 != null ? lookupProperty(depth0,"copyright") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"copyright","hash":{},"data":data,"loc":{"start":{"line":53,"column":29},"end":{"line":53,"column":44}}}) : helper))) != null ? stack1 : "")
	  + "</span>\r\n				</li>\r\n";
  },"22":function(container,depth0,helpers,partials,data) {
	  var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", lookupProperty = container.lookupProperty || function(parent, propertyName) {
		  if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
			return parent[propertyName];
		  }
		  return undefined
	  };
  
	return "			<a href=\""
	  + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"contributeUrl") || (depth0 != null ? lookupProperty(depth0,"contributeUrl") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"contributeUrl","hash":{},"data":data,"loc":{"start":{"line":63,"column":12},"end":{"line":63,"column":29}}}) : helper)))
	  + "\">\r\n				<svg class=\"icon icon-20\">\r\n					<use xlink:href=\"#shape-document_white\" />\r\n				</svg>"
	  + ((stack1 = ((helper = (helper = lookupProperty(helpers,"contributeText") || (depth0 != null ? lookupProperty(depth0,"contributeText") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"contributeText","hash":{},"data":data,"loc":{"start":{"line":66,"column":10},"end":{"line":66,"column":30}}}) : helper))) != null ? stack1 : "")
	  + "\r\n			</a>\r\n";
  },"24":function(container,depth0,helpers,partials,data) {
	  var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", lookupProperty = container.lookupProperty || function(parent, propertyName) {
		  if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
			return parent[propertyName];
		  }
		  return undefined
	  };
  
	return "			<a href=\""
	  + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"reportUrl") || (depth0 != null ? lookupProperty(depth0,"reportUrl") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"reportUrl","hash":{},"data":data,"loc":{"start":{"line":71,"column":12},"end":{"line":71,"column":25}}}) : helper)))
	  + "\">\r\n				<svg class=\"icon icon-20\">\r\n					<use xlink:href=\"#shape-report_white\" />\r\n				</svg>"
	  + ((stack1 = ((helper = (helper = lookupProperty(helpers,"reportText") || (depth0 != null ? lookupProperty(depth0,"reportText") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"reportText","hash":{},"data":data,"loc":{"start":{"line":74,"column":10},"end":{"line":74,"column":26}}}) : helper))) != null ? stack1 : "")
	  + "\r\n			</a>\r\n";
  },"26":function(container,depth0,helpers,partials,data) {
	  var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", lookupProperty = container.lookupProperty || function(parent, propertyName) {
		  if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
			return parent[propertyName];
		  }
		  return undefined
	  };
  
	return "			<a href=\""
	  + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"enquireUrl") || (depth0 != null ? lookupProperty(depth0,"enquireUrl") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"enquireUrl","hash":{},"data":data,"loc":{"start":{"line":79,"column":12},"end":{"line":79,"column":26}}}) : helper)))
	  + "\" data-event=\"item image enquiry link\" >\r\n				<svg class=\"icon icon-20\">\r\n					<use xlink:href=\"#shape-enquire_white\" />\r\n				</svg>"
	  + ((stack1 = ((helper = (helper = lookupProperty(helpers,"enquireText") || (depth0 != null ? lookupProperty(depth0,"enquireText") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"enquireText","hash":{},"data":data,"loc":{"start":{"line":82,"column":10},"end":{"line":82,"column":27}}}) : helper))) != null ? stack1 : "")
	  + "\r\n			</a>\r\n";
  },"28":function(container,depth0,helpers,partials,data) {
	  var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
		  if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
			return parent[propertyName];
		  }
		  return undefined
	  };
  
	return "			<a href=\""
	  + alias4(((helper = (helper = lookupProperty(helpers,"downloadUrl") || (depth0 != null ? lookupProperty(depth0,"downloadUrl") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"downloadUrl","hash":{},"data":data,"loc":{"start":{"line":87,"column":12},"end":{"line":87,"column":27}}}) : helper)))
	  + "\" onclick=\""
	  + alias4(((helper = (helper = lookupProperty(helpers,"downloadTracking") || (depth0 != null ? lookupProperty(depth0,"downloadTracking") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"downloadTracking","hash":{},"data":data,"loc":{"start":{"line":87,"column":38},"end":{"line":87,"column":58}}}) : helper)))
	  + "\" data-event=\"item image download\">\r\n				<svg class=\"icon icon-20\">\r\n					<use xlink:href=\"#shape-export_white\" />\r\n				</svg>"
	  + ((stack1 = ((helper = (helper = lookupProperty(helpers,"downloadText") || (depth0 != null ? lookupProperty(depth0,"downloadText") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"downloadText","hash":{},"data":data,"loc":{"start":{"line":90,"column":10},"end":{"line":90,"column":28}}}) : helper))) != null ? stack1 : "")
	  + "\r\n			</a>\r\n";
  },"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
	  var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), lookupProperty = container.lookupProperty || function(parent, propertyName) {
		  if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
			return parent[propertyName];
		  }
		  return undefined
	  };
  
	return "<div class=\"fancybox-extra-info\">\r\n	<div class=\"container\">\r\n		<div class=\"fancybox-caption\">\r\n\r\n"
	  + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"count") : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":5,"column":3},"end":{"line":8,"column":12}}})) != null ? stack1 : "")
	  + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"item") : depth0),{"name":"if","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":9,"column":5},"end":{"line":11,"column":12}}})) != null ? stack1 : "")
	  + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"count") : depth0),{"name":"if","hash":{},"fn":container.program(5, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":12,"column":5},"end":{"line":16,"column":10}}})) != null ? stack1 : "")
	  + "\r\n			<ul id=\"imageCaptions\" class=\"fancybox-captions\">\r\n"
	  + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"caption") : depth0),{"name":"if","hash":{},"fn":container.program(7, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":19,"column":4},"end":{"line":44,"column":11}}})) != null ? stack1 : "")
	  + "\r\n"
	  + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"credit") : depth0),{"name":"if","hash":{},"fn":container.program(18, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":46,"column":4},"end":{"line":50,"column":11}}})) != null ? stack1 : "")
	  + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"copyright") : depth0),{"name":"if","hash":{},"fn":container.program(20, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":51,"column":4},"end":{"line":55,"column":11}}})) != null ? stack1 : "")
	  + "			</ul>\r\n\r\n		</div>\r\n\r\n		<div class=\"fancybox-actions\">\r\n\r\n"
	  + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"contributeUrl") : depth0),{"name":"if","hash":{},"fn":container.program(22, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":62,"column":3},"end":{"line":68,"column":10}}})) != null ? stack1 : "")
	  + "\r\n"
	  + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"reportUrl") : depth0),{"name":"if","hash":{},"fn":container.program(24, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":70,"column":3},"end":{"line":76,"column":10}}})) != null ? stack1 : "")
	  + "\r\n"
	  + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"enquireUrl") : depth0),{"name":"if","hash":{},"fn":container.program(26, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":78,"column":3},"end":{"line":84,"column":10}}})) != null ? stack1 : "")
	  + "\r\n"
	  + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"downloadUrl") : depth0),{"name":"if","hash":{},"fn":container.program(28, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":86,"column":3},"end":{"line":92,"column":10}}})) != null ? stack1 : "")
	  + "		</div>\r\n\r\n	</div>\r\n</div>";
  },"useData":true});
  $('.fancy-gallery').each(function(i) {
	$(this).find('.fancybox-buttons').attr("rel", "gallery-" + i);
  });
  
  $('.fancybox-buttons').fancybox({
  
	afterLoad: function( current, previous ) {
  
	 //Generate HTML from Handlebars template and Element data attributes.
	 var html = AKM.fancybox['extra-info']( current.element.data() );
	 var htmlObj = $(html);
	//  if (typeof PageMethods !== 'undefined') {
	//      if (typeof PageMethods.GetImageUGC !== 'undefined') {
	//          var uri = this.element.data("uri"),
	//              recordID = this.element.data("recordid");
	//
	//          PageMethods.GetImageUGC(uri, recordID, function (result) {
	//              htmlObj.find('#imageCaptions').append($(result));
	//          });
	//      }
	//  }
  
	  if ($('.fancybox-extra-info').length) {
		$('.fancybox-extra-info').replaceWith(htmlObj);
	  } else {
		$('.fancybox-overlay').append($('<div class="fancybox-content"></div>').append(htmlObj));
	  }
  
	},
  
	afterShow: function(current, previous) {
	  $('html').addClass('fancybox-lock');
	},
  
	tpl: {
	  image: '<a class="fancybox-image-wrap" href="{href}" target="_blank" title="Enlarge"><div class="fancybox-enlarge"></div><img class="fancybox-image" src="{href}" alt="" /></a>'
	},
  
	fitToView: false,
	autoSize: false,
	padding: '0',
	maxWidth: "90%",
	maxHeight: '75%',
	prevEffect: 'none',
	nextEffect: 'none',
	closeBtn: true,
	topRatio: 0.25,
	scrolling: 'no',
  
	helpers : {
	  title:  null,
	  thumbs  : {
		width   : 50,
		height  : 50
	  }
	}
  });
  