/*****************************************************************
 * **************************************************************
 * @MetCreative - Table of Contents
 * 1-) Document Ready State
 *    a- Scroll Speed and Styling
 *    b- Skill Circles
 *    c- LightBox
 *    d- DL Menu
 *    e- Icon Navigation Tabs
 *    f- Latest Posts Carousel
 *    h- Latest Tweets
 *    i- Twitter Ticker
 *    j- Gmaps JS for Google Maps
 *    h- Php Ajax Contact Form
 *    l- Blog List Iframe Sizing
 *    m- Portfolio List Iframe Sizing
 *    n- Contact Page Contact Form
 *    o- Responsive Navigation
 *    p- Full Screen Background Image
 *    r- Testimonials
 * 2-) Window Load State
 *    a- Index Slider
 *    b- Portfolio List Slider
 *    c- Blog Slider
 *    d- Recent Works Carousel
 *    d- Cacoon Slider
 * 2-) Functions
 *    a- Sticky Header
 *    b- Sticky Header Resizing
 * !Note: You can make search with one of the title above to find the block according to it
 * **************************************************************
 *****************************************************************/

jQuery(document).ready(function(){

	/**
	 * Skill Circles
	 * @usedPlugins jquery, jquery.knob, jquery.easing
	 * @usedAt      services page
	 */
	var container = jQuery('.dial');

	container.each(function() {
		var that = jQuery(this),
			ao = Math.round(Math.random() * 360),
			w = container.data('width'),
			v = that.data('value');
		that.addClass('visible').knob({
			readOnly: true,
			bgColor: '#ebebeb',
			fgColor: '#18ADB5',
			thickness: 0.25,
			angleOffset: ao,
			width: w
		});
		jQuery({value: 0}).animate({value: v}, {
			duration: 2000,
			easing:'easeOutQuad',
			step: function() {
				that.val(Math.ceil(this.value)).trigger('change');
			}
		})
	});

	/**
	 * LightBox
	 * @usedPlugins jquery, magnific-popup
	 * @usedAt      portfolio
	 */
	jQuery('[rel*="lb"]').each(function(){
		jQuery('[rel="'+jQuery(this).attr('rel')+'"]').magnificPopup({
			type: 'image',
			gallery:{
				enabled: true
			}
		});
	});
	jQuery('[rel*="video_lb"]').each(function(){
		jQuery('[rel="'+jQuery(this).attr('rel')+'"]').magnificPopup({
			disableOn: 700,
			type: 'iframe',
			removalDelay: 160,
			preloader: false,
			fixedContentPos: false
		});
	});

	/**
	 * DL Menu
	 * @usedPlugins jquery, dlmenu
	 * @usedAt      shortcode
	 */
	jQuery( '#dl-menu' ).dlmenu({
		animationClasses : { 'in' : 'dl-animate-in-3', 'out' : 'dl-animate-out-3' }
	});

	/**
	 * Icon Navigation Tabs
	 * @usedPlugins jquery
	 * @usedAt      Icon Navigation Tabs on Index Page
	 */
	jQuery('.met_icon_tabs nav a').click(function(e){
		e.preventDefault();
		if(!jQuery(this).hasClass('met_active_tab')){
			var tabContainer = jQuery(this).parents('.met_icon_tabs');
			var href = jQuery(this).attr('href');

			tabContainer.find('.met_active_tab').removeClass('met_active_tab');
			tabContainer.find('.met_open_tab').removeClass('met_open_tab');

			jQuery(this).addClass('met_active_tab');
			jQuery(this).addClass('met_active_tab');

			tabContainer.find(href).addClass('met_open_tab');
		}
	});

	/**
	 * Latest Posts Carousel
	 * @usedPlugins jquery,caroufredsel
	 * @usedAt      Latest Posts on Index Page
	 */
	jQuery(".met_latest_posts").carouFredSel({
		responsive: true,
		pagination : {
			container		: jQuery('.met_latest_posts_pages'),
			anchorBuilder	: function(nr) {
				return '<a href="#"><i class="icon-circle"></i></a>';
			}
		},
		circular: false,
		infinite: true,
		auto: {
			play : true,
			pauseDuration: 0,
			duration: 2000
		},
		scroll: {
			duration: 400,
			wipe: true,
			pauseOnHover: true
		},
		items: {
			visible: {
				min: 1,
				max: 1  },
			height: 'auto'
		},
		direction: 'up',
		swipe : {
			onTouch : true
		},
		onCreate: function(){
			jQuery(window).trigger('resize');
		}
	});

	/**
	 * Blog List Iframe Sizing
	 * @usedPlugins jquery
	 * @usedAt      Blog List Page
	 */
	var iframeVideos = jQuery(".met_blog_video_iframe iframe"),
	iframeContainer = jQuery(".met_blog_video_iframe");

	iframeVideos.each(function() {
		jQuery(this).data('aspectRatio', this.height / this.width).removeAttr('height').removeAttr('width');
	});

	jQuery(window).resize(function() {
		var newWidth = iframeContainer.width();

		iframeVideos.each(function() {
			var el = jQuery(this);
			el.width(newWidth).height(newWidth * el.data('aspectRatio'));
		});
	}).resize();

	/**
	 * Portfolio List Iframe Sizing
	 * @usedPlugins jquery
	 * @usedAt      Portfolio List Page
	 */
	var iframeVideos = jQuery(".met_portfolio_item_preview");

	if(jQuery(".met_portfolio_row .span6").length > 0){
		var iframeContainer = jQuery(".met_portfolio_row .span6");
	}else{
		var iframeContainer = jQuery(".met_portfolio_row .span4");
	}

	iframeVideos.each(function() {
		jQuery(this).data('aspectRatio', this.height / this.width).removeAttr('height').removeAttr('width');
	});

	jQuery(window).resize(function() {
		var newWidth = iframeContainer.width();

		iframeVideos.each(function() {
			var el = jQuery(this);
			el.width(newWidth).height(newWidth * el.data('aspectRatio'));
		});
	}).resize();

	/**
	 * Responsive Navigation
	 * @usedPlugins jquery
	 * @usedAt      Every page that contains responsive navigation select elements
	 */
	jQuery('.met_responsive_nav').on('change',function(){
		window.location = jQuery(this).val();
	});

	if(jQuery('.met_main_nav').data('fixed') == '1'){
		sticky_header();
		jQuery(window).bind('scroll', sticky_header);
	}

	stickyHeaderSize();
	jQuery(window).bind('resize', stickyHeaderSize);


	/**
	 * Full Screen Background Image
	 * @usedPlugins jquery
	 * @usedAt      Boxed Layout Body Background Image
	 */
	if(jQuery('#met_fullScreenImg').length > 0){
		var FullscreenrOptions = {  width: window.innerWidth, height: window.innerHeight, bgID: '#met_fullScreenImg' };
		jQuery.fn.fullscreenr(FullscreenrOptions);
	}

	/**
	 * Testimonials
	 * @usedPlugins jquery
	 * @usedAt      Testimonials
	 */
	var testimonialInterval;
	jQuery('.met_testimonial_photos > div').hover(function(){
		var e = jQuery(this);
		testimonialInterval = setInterval(function(){testimonialHoverOver(e)},100);
	},function(){
		var e = jQuery(this);
		testimonialInterval = clearInterval(testimonialInterval);
		testimonialHoverOut(e);
	});
	function testimonialHoverOver(i){
		var id = i.index() + 1;
		i.parents('.met_testimonial_photos').next().children('div:nth-child('+id+')').slideDown();
	}
	function testimonialHoverOut(e){
		var id = e.index() + 1;
		e.parents('.met_testimonial_photos').next().children('div:nth-child('+id+')').slideUp();
	}

	/*jQuery('.met_main_nav > ul > li').hover(function(){
		var theLi = jQuery(this);
		if(theLi.children('ul').length > 0 && !theLi.hasClass('met_open_menu')){
			theLi.children('ul').fadeIn('fast');
			theLi.addClass('met_open_menu');
		}
	},function(){
		console.log('out triggered');
		var theLi = jQuery(this);
		if(theLi.hasClass('met_open_menu')){
			theLi.children('ul').css('display', 'none');
			theLi.removeClass('met_open_menu');
		}
	});*/
	jQuery('.met_main_nav > ul').superfish({
		delay: 250
	});

	logo_vertical_middle();


	/**
	 * Tabbed Footer
	 * @usedPlugins jquery
	 * @usedAt      Tabbed Footer Page
	 */
	jQuery('.met_tabbed_footer_nav a').click(function(e){
		e.preventDefault();
		if(!jQuery(this).hasClass('active-tab')){
			jQuery('.active-tab').removeClass('active-tab');
			jQuery(this).addClass('active-tab');
			jQuery('.active-tab-target').css('display','none').removeClass('active-tab-target');

			var destination = jQuery(this).data('footer-tab-destination');

			jQuery('div[data-footer-tab-target="'+destination+'"]').css('display','block').addClass('active-tab-target');
		}
	});
});

jQuery(window).load(function(){

	/**
	 * Portfolio List Slider
	 * @usedPlugins jquery,caroufredsel
	 * @usedAt      Portfolio Listing Page
	 */
	jQuery(".met_portfolio_item_slider").carouFredSel({
		responsive: true,
		prev: {
			button : function(){
				return jQuery(this).parents('.met_portfolio_item_slider_wrap').find('.met_portfolio_item_slider_nav_prev')
			}
		},
		next:{
			button : function(){
				return jQuery(this).parents('.met_portfolio_item_slider_wrap').find('.met_portfolio_item_slider_nav_next')
			}
		},
		circular: false,
		infinite: true,
		auto: {
			play : true,
			pauseDuration: 0,
			duration: 2000
		},
		scroll: {
			items: 1,
			duration: 400,
			wipe: true
		},
		items: {
			visible: {
				min: 1,
				max: 1
				},
			width: 691
		},
		width: 691,
		swipe : {
			onTouch : true
		}
	});

	/**
	 * Blog Slider
	 * @usedPlugins jquery,caroufredsel
	 * @usedAt      Blog Detail
	 */
	jQuery(".met_blog_slider").carouFredSel({
		responsive: true,
		prev: {
			button : function(){
				return jQuery(this).parents('.met_blog_slider_wrap').find('.met_blog_slider_nav_prev')
			}
		},
		next:{
			button : function(){
				return jQuery(this).parents('.met_blog_slider_wrap').find('.met_blog_slider_nav_next')
			}
		},
		circular: false,
		infinite: true,
		auto: {
			play : true,
			pauseDuration: 0,
			duration: 2000
		},
		scroll: {
			items: 1,
			duration: 400,
			wipe: true
		},
		items: {
			visible: {
				min: 1,
				max: 1
			},
			width: 870,
			height: 300
		},
		width: 870,
		height: 300,
		swipe : {
			onTouch : true
		}
	});

	/**
	 * Filtered Portfolio Slider
	 * @usedPlugins jquery,caroufredsel
	 * @usedAt      Filtered Portfolio
	 */
	var filterSlider = jQuery(".met_filtered_portfolio_slider");
	filterSlider.carouFredSel({
		responsive: true,
		prev: {
			button : function(){
				return jQuery(this).parents('.met_filtered_portfolio_slider_wrap').find('.met_blog_slider_nav_prev')
			}
		},
		next:{
			button : function(){
				return jQuery(this).parents('.met_filtered_portfolio_slider_wrap').find('.met_blog_slider_nav_next')
			}
		},
		circular: false,
		infinite: true,
		items: {
			visible: {
				min: 1,
				max: 1,
				height: 'variable'
			}
		},
		width: "100%",
		height: "auto",
		swipe : {
			onTouch : true
		}
	});

	/**
	 * Filtered Portfolio Slider
	 * @usedPlugins jquery,caroufredsel
	 * @usedAt      Filtered Portfolio
	 */
	var oneColumnSlider = jQuery(".met_one_column_slider");
	oneColumnSlider.carouFredSel({
		responsive: true,
		prev: {
			button : function(){
				return jQuery(this).parents('.met_one_column_slider_wrap').find('.met_blog_slider_nav_prev')
			}
		},
		next:{
			button : function(){
				return jQuery(this).parents('.met_one_column_slider_wrap').find('.met_blog_slider_nav_next')
			}
		},
		circular: false,
		infinite: true,
		items: {
			visible: {
				min: 1,
				max: 1,
				height: 'variable'
			}
		},
		width: "100%",
		height: "variable",
		swipe : {
				onTouch : true
		},
		onCreate : function () {
			jQuery(window).on('resize', function(){
				oneColumnSlider.parent().add(oneColumnSlider).css('height', oneColumnSlider.children().first().height() + 'px');
			}).trigger('resize');
		}
	});

	/**
	 * Cacoon Slider
	 * @usedPlugins jquery,caroufredsel
	 * @usedAt      Recent Works on Index Page
	 */
	var $big = jQuery('.met_thumbnail_slider_1_big .met_thumbnail_slider_1_images'),
		$small = jQuery('.met_thumbnail_slider_1_small .met_thumbnail_slider_1_images');

	$big.carouFredSel({
		auto: {
			play : true,
			pauseDuration: 5000,
			duration: 300
		},
		direction: 'up',
		scroll: {
			items: 1,
			duration: 300,
			pauseOnHover: true,
			onBefore: function( data ) {

				var item = data.items.visible.first();
				var src = item.data( 'slider-format' ).split( '-' )[ 2 ];

				jQuery('.met_active_title').removeClass('met_active_title');

				if(src == 'a' && !item.hasClass('met_first_slide')){
					jQuery('.met_thumbnail_slider_1_next').trigger('click');
				}else if(item.hasClass('met_first_slide')){
					item.removeClass('met_first_slide');
				}
			},
			onAfter: function( data ){

				var item = data.items.visible.first();

				item.find('.met_thumbnail_slider_1_title,.met_thumbnail_slider_1_subtitle').addClass('met_active_title');

			}
		},
		items: {
			width: 'variable'
		},
		prev: {
			duration: 'auto'
		},
		next: {
			duration: 'auto'
		},
		swipe : {
			onTouch : true
		},
		onCreate: function( data ){
			var item = data.items.first();
			item.find('.met_thumbnail_slider_1_title,.met_thumbnail_slider_1_subtitle').addClass('met_active_title');
			jQuery(this).parents('.met_thumbnail_slider_1_wrap').removeClass('met_thumbnail_slider_1_wrap_loading');
			jQuery(this).parents('.met_thumbnail_slider_1_wrap').find('.met_thumbnail_slider_1_overlay').fadeOut('fast',function(){
				jQuery(this).remove();
			});
		}
	});

	$small.carouFredSel({
		align: 'left',
		width: 'variable',
		auto: false,
		items:  4,
		scroll: {
			items: 'variable',
			duration: 300,
			onBefore: function( data ) {
				var item = data.items.visible.first();
				var src = item.data( 'slider-format' ).split( 'small-' )[ 1 ];
				$big.trigger( 'slideTo', [ '[data-slider-format="big-' + src + '"]', {
					fx: 'directscroll',
					duration: 300
				} ] );
			}
		}
	});

	jQuery('.met_thumbnail_slider_1_small img').click(function() {
		if ( $big.triggerHandler( 'isScrolling' ) ) {
			return false;
		}
		var src = jQuery(this).data( 'slider-format' ).split( 'small-' )[ 1 ];
		var isA = jQuery(this).data( 'slider-format' ).split( '-' )[ 2 ];

		if(isA == 'a'){jQuery('[data-slider-format="big-' + src + '"]').addClass('met_first_slide');}

		$big.trigger( 'slideTo', [ '[data-slider-format="big-' + src + '"]' ] );

		return false;
	});

	jQuery('.met_thumbnail_slider_1_next').click(function() {

		if ( $small.triggerHandler( 'isScrolling' ) ) {
			return false;
		}
		var $visible = $small.triggerHandler( 'currentVisible' ),
			$next = $visible.last().next(),
			$new = $small.find( '[data-slider-format^="small-' + $next.data( 'slider-format' ).split( '-' )[ 1 ] + '-"]' );

		$small.trigger( 'configuration', [{
			items: {
				visible: $new.length
			}
		}, false] );


		$small.trigger( 'next', [ $visible.length ] );

		return false;
	});

	/**
	 * Masonry Blog
	 * @usedPlugins jquery,isotope
	 * @usedAt      Masonry Blog PAge
	 */
	var mainpage_portfolio = jQuery('.met_masonry_blog');
	mainpage_portfolio.isotope({
		resizable: false,
		gutterWidth: 30,
		columnWidth: 270
	});

	jQuery(window).smartresize(function(){masonrySizing(mainpage_portfolio,4);}).smartresize();

	/**
	 * Filtered Portfolio
	 * @usedPlugins jquery,isotope
	 * @usedAt      Filtered Portfolio PAge
	 */
	var filtered_portfolio = jQuery('.met_filtered_portfolio');
	filtered_portfolio.isotope({
		resizable: false,
		gutterWidth: 30,
		columnWidth: 370
	});

	jQuery('.met_filtered_portfolio_filters li a').click(function(){
		jQuery('.met_filtered_portfolio_filters li a.met_color3').removeClass('met_color3');
		jQuery(this).addClass('met_color3');
		var selector = jQuery(this).attr('data-filter');
		filtered_portfolio.isotope({ filter: selector });
		return false;
	});

	jQuery(window).smartresize(function(){masonrySizing(filtered_portfolio,3,370,172);}).smartresize();



	/**
	 * Filtered One Column Portfolio
	 * @usedPlugins jquery,isotope
	 * @usedAt      Filtered Portfolio 2 Page
	 */
	var filtered_one_column = jQuery('.met_one_column_portfolio');
	filtered_one_column.isotope({
		resizable: false
	});

	jQuery(window).smartresize(function(){
		filtered_one_column.isotope({
			resizable: false
		});
	});

	jQuery('.met_one_column_portfolio_filters li a').click(function(){
		jQuery('.met_one_column_portfolio_filters li a.met_color3').removeClass('met_color3');
		jQuery(this).addClass('met_color3');
		var selector = jQuery(this).attr('data-filter');
		filtered_one_column.isotope({ filter: selector });
		return false;
	});
});

function masonrySizing(container,columnCount,oriWidth,oriHeight){
	var bodyWidth       = jQuery('body').width();
	var containerWidth  = container.width();

	if(bodyWidth < 781 && bodyWidth > 480){columnCount = columnCount - 1}
	if(bodyWidth < 481 && bodyWidth > 320){columnCount = columnCount - 2}
	if(bodyWidth < 321){columnCount = columnCount - 3}
	if(columnCount <= 0){columnCount = 1}

	var itemWidth = ((containerWidth - (columnCount * 30)) / columnCount) - 1;
	container.children('div').css('width', itemWidth+'px');
	if(typeof oriWidth != 'undefined'){

		container.find('iframe').css({
			width : itemWidth,
			height : oriHeight / oriWidth * itemWidth
		});

		container.find('.caroufredsel_wrapper,.caroufredsel_wrapper a').css({
			width : itemWidth,
			height : oriHeight / oriWidth * itemWidth
		});
		container.find('.caroufredsel_wrapper').parent().trigger('play');
	}
	container.isotope({columnWidth: itemWidth});
}

/**
 * Sticky Header
 * @usedAt      global,window scroll, dom ready
 */
function sticky_header(){
	if(jQuery('body').width() > 800){
		if(jQuery('.met_main_nav').attr('data-fixed-width') == undefined) jQuery('.met_main_nav').attr('data-fixed-width', jQuery('.met_main_nav').width()+'px');
		if(jQuery('.met_main_nav').attr('data-fixed-left') == undefined) jQuery('.met_main_nav').attr('data-fixed-left', jQuery('.met_main_nav').offset().left+'px');

		if(jQuery(this).scrollTop() > 250 && jQuery('.met_fixed_nav').length != 1){

			jQuery('.met_main_nav').addClass('met_fixed_nav').css({
				'display' : 'none',
				'left' : jQuery('.met_main_nav').attr('data-fixed-left'),
				'width' : jQuery('.met_main_nav').attr('data-fixed-width')
			}).fadeIn('slow');

		}else if(jQuery(this).scrollTop() < 250 && jQuery('.met_fixed_nav').length > 0){

			jQuery('.met_fixed_nav').fadeOut('fast',function(){
				jQuery('.met_fixed_nav').css({
					'left' : '0',
					'width' : 'asd'
				});
				jQuery('.met_fixed_nav').removeClass('met_fixed_nav').fadeIn('fast');
			});

		}
	}
}


/**
 * Sticky Header Resizing
 * @usedAt      global,window scroll, dom ready, window resize
 */
function stickyHeaderSize(){
	jQuery('.met_main_nav').attr('data-fixed-width', jQuery('.met_content').width()+'px');
	jQuery('.met_main_nav').attr('data-fixed-left', jQuery('.met_content').offset().left+'px');

	if(jQuery('.met_fixed_nav').length > 0){
		jQuery('.met_fixed_nav').css({
			'left' : jQuery('.met_main_nav').attr('data-fixed-left'),
			'width' : jQuery('.met_main_nav').attr('data-fixed-width')
		});
	}else{
		jQuery('.met_main_nav').css({
			'left' : 0,
			'width' : jQuery('.met_main_nav').attr('data-fixed-width')
		});
	}
}


/**
 * Logo Vertically Centering
 * @usedAt      global, dom ready, window resize
 */
function logo_vertical_middle(){
	var topSpace = Math.floor(Math.abs((150 - jQuery('.met_logo img').attr('height')) / 2));

	jQuery('.met_logo img').css({'margin-top': topSpace+'px'});

	jQuery('.met_logo').removeClass('met_logo_loading');
}

/**
 * Logo Vertically Centering
 * @usedAt      global, dom ready, window resize
 */
function scrollBarFiller(){
	var scrollTop = jQuery(window).scrollTop();
	var bars = jQuery('.not-loaded');
	bars.each(function(){
		var offsetTop = jQuery(this).offset().top;
		var evenThem = offsetTop - scrollTop - jQuery(window).height() + jQuery(this).height();
		if(evenThem <= 0){
			jQuery(this).removeClass('not-loaded');
			jQuery(this).css('width', jQuery(this).data('width')+'%');
		}

	});
}
jQuery(window).scroll(function(){
	var scrolling;
	scrolling = setInterval(function(){
		scrollBarFiller();
		clearInterval(scrolling);
	},100);
});



/**
 * Full Width Menu
 * @usedAt      global, dom ready, window resize
 */
function fullWidthMenu(){
	var navWidth = jQuery('.met_main_nav').width();

	jQuery('.met_mega_menu_link').each(function(){
		var positionLeft = jQuery(this).parent().position().left;
		jQuery(this).next().css({
			'width' : navWidth+'px',
			left : - positionLeft+'px'
		});
	});
}

jQuery(document).bind('ready', fullWidthMenu);
jQuery(window).bind('resize', fullWidthMenu);

function teamMemberHeight(){
	if(jQuery('.met_team_member_details').length > 0){
		var tallest = 0;
		jQuery('.met_team_member_details').each(function(){
			if(jQuery(this).height() > tallest) tallest = jQuery(this).height();
		});

		jQuery('.met_team_member_details').css('height', tallest+'px');
	}
}

jQuery(document).bind('ready', teamMemberHeight);
jQuery(window).bind('resize', teamMemberHeight);


/**
 * Tabbed Footer
 * @usedAt      global, dom ready, window resize
 */
function tabbedFooterNavPositioning(){
	if(jQuery('.met_tabbed_footer_nav').length > 0){
		var nav = jQuery('.met_tabbed_footer_nav');
		nav.next().css('margin-left', nav.width()+'px');
	}
}

jQuery(document).bind('ready', tabbedFooterNavPositioning);
jQuery(window).bind('resize', tabbedFooterNavPositioning);