$(window).load(function() {
  $('img:not(".logo-img")').each(function() {
    if (!this.complete || typeof this.naturalWidth === "undefined" || this.naturalWidth === 0) {
      // image was broken, replace with your new image
      this.src = "http://placehold.it/" + ($(this).attr('width') || this.width || $(this).naturalWidth()) + "x" + (this.naturalHeight || $(this).attr('height') || $(this).height());
    }
  });
});

//Facebook
(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = "//connect.facebook.net/en_EN/all.js#xfbml=1";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

//Twitter
!function(d,s,id){
  var js,
  fjs=d.getElementsByTagName(s)[0],
  p=/^http:/.test(d.location)?'http':'https';
  
  if(!d.getElementById(id)){
	js=d.createElement(s);js.id=id;js.src=p+"://platform.twitter.com/widgets.js";
	fjs.parentNode.insertBefore(js,fjs);
  }
}(document,"script","twitter-wjs");

function formStylization() {
  var $ = jQuery;
  
  $('input[type="radio"]').wrap('<div class="new-radio"></div>');
  $('.new-radio').append('<span></span>');
  $('input[type="checkbox"]').wrap('<div class="new-checkbox"></div>');
  $('.new-checkbox').append('<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="15px" height="15px" viewBox="0 0 20 20" enable-background="new 0 0 20 20" xml:space="preserve"><polygon fill="#1e1e1e" points="9.298,13.391 4.18,9.237 3,10.079 9.297,17 17.999,4.678 16.324,3 "/></svg>');
  $('input[type="checkbox"]:checked').parent('.new-checkbox').addClass('checked');
  $('input[type="radio"]:checked').parent('.new-radio').addClass('checked');
  $('input[type="radio"]:disabled, input[type="checkbox"]:disabled').parent().addClass('disabled');
  
  $('html').click(function(){
	$('input[type="radio"]').parent('.new-radio').removeClass('checked');
	$('input[type="radio"]:checked').parent('.new-radio').addClass('checked');
	$('input[type="checkbox"]').parent('.new-checkbox').removeClass('checked');
	$('input[type="checkbox"]:checked').parent('.new-checkbox').addClass('checked');
	$('input[type="radio"], input[type="checkbox"]').parent().removeClass('disabled');
	$('input[type="radio"]:disabled, input[type="checkbox"]:disabled').parent().addClass('disabled');
  });
  
  $('select').selectBox();
}

function fullWidthBox() {
  var $ = jQuery,
	  windowWidth = $('body').outerWidth(),
	  containerWidth    = $('.container').outerWidth();
	  
  $('.full-width-box .bg').each(function() {
	$(this).css({
	  left  : ( containerWidth - windowWidth) / 2,
	  width : windowWidth
	});
  });
}

//Animations
function animations() {
  var $ = jQuery;

  $('[data-appear-animation]').each(function() {
	var $this = $(this);

	$this.addClass('appear-animation');

	if(!$('body').hasClass('no-csstransitions') && $(window).width() > 767) {
	  $this.appear(function() {
		var delay = ($this.attr('data-appear-animation-delay') ? $this.attr('data-appear-animation-delay') : 1);

		if(delay > 1) $this.css('animation-delay', delay + 'ms');
		$this.addClass($this.attr('data-appear-animation'));

		setTimeout(function() {
		  $this.addClass('appear-animation-visible');
		}, delay);
	  }, {accX: 0, accY: -150});
	} else {
	  $this.addClass('appear-animation-visible');
	}
  });
  
  /* Animation Progress Bars */
  $('[data-appear-progress-animation]').each(function() {
	var $this = $(this);

	$this.appear(function() {
	  var delay = ($this.attr('data-appear-animation-delay') ? $this.attr('data-appear-animation-delay') : 1);

	  if(delay > 1) $this.css('animation-delay', delay + 'ms');
	  
	  $this.find('.bar').addClass($this.attr('data-appear-animation'));

	  setTimeout(function() {
		$this.find('.bar').animate({
		  width: $this.attr('data-appear-progress-animation')
		}, 500, 'easeInCirc', function() {
		  $this.find('.bar').animate({
			textIndent: 10
		  }, 1500, 'easeOutBounce');
		});
	  }, delay);
	}, {accX: 0, accY: -50});
  });
}

//Header Fixed
function headerCustomizer() {
  var $ = jQuery,
	  headerTop = 0,
	  header    = 0,
	  scroll    = 0;
  
  headerTop = $('#top-box').outerHeight();
  header = $('.header').outerHeight();
  scroll = headerTop;
  
  if ($('.fixed-header').length) {
	if ($('body').hasClass('hidden-top')) {
	  $('body').css('paddingTop', header + 8);
	} else {
	  $('body').css('paddingTop', header);
	}
  }
  
  $(window).scroll(function(){
	if (!$('body').hasClass('visible-top')) {
	  scroll = 8;
	}
    if ($(this).scrollTop() >= scroll) {
      $('.fixed-header').addClass('fixed');
    } else {
      $('.fixed-header').removeClass('fixed');
    }
	if ($(this).scrollTop() >= header) {
      $('.fixed-header').addClass('background-opacity');
    } else {
      $('.fixed-header').removeClass('background-opacity');
    }
  });
  
  $(window).scroll(function(){
    if ($(this).scrollTop() >= headerTop + header) {
      $('.top-fixed-box').addClass('fixed');
    } else {
      $('.top-fixed-box').removeClass('fixed');
    }
  });
   
  $('.hidden-top .header, .hidden-top #top-box').hover(function(){
    $('.hidden-top').addClass('visible-top');
  }, function(){
    $('.hidden-top').removeClass('visible-top');
  });
}

//Header Menu
function menu() {
  var $ = jQuery;

  $('.primary .parent > a .open-sub').remove();
  
  if ($('body').width() <= 979 ) {
	$('.primary .parent > a, .primary .megamenu .title').append('<span class="open-sub"><span></span><span></span></span>');
  } else {
	$('.primary .sub, .primary .megamenu .box ul').removeAttr('style', 'display');
	$('.primary .parent').removeClass('active');
  }
  
  $('.primary .parent a .open-sub').click(function(event){
	event.preventDefault();

	if ($(this).closest('.parent').hasClass('active')) {
	  $(this).closest('.parent').find('.sub').slideUp(600);
	  $(this).parent('a').next('.sub').slideUp(600);
	  $(this).closest('.parent').removeClass('active');
	} else {
	  $('.primary .nav .parent').not($(this).parents('.parent')).find('.sub').slideUp(600);
	  $('.primary .nav .parent').not($(this).parents('.parent')).removeClass('active');
	  $(this).parent('a').next('.sub').slideDown(600);
	  $(this).closest('.parent').addClass('active');
	}
  });
  
  /* Megamenu */
  $('.primary .megamenu .open-sub').click(function(event){
	event.preventDefault();

	if ($(this).closest('.box').hasClass('active')) {
	  $(this).parent('.title').next('ul').slideUp(600);
	  $(this).closest('.box').removeClass('active');
	} else {
	  $('.primary .megamenu .box').find('ul').slideUp(600);
	  $('.primary .megamenu .box').removeClass('active');
	  $(this).parent('.title').next('ul').slideDown(600);
	  $(this).closest('.box').addClass('active');
	}
  });
  
  $('.primary .parent > a').click(function(event){
	if (($('body').width() > 979) &&  (navigator.userAgent.match(/iPad|iPhone|Android/i))) {
	  if ($(this).parent().hasClass('open')) {
		$(this).parent().removeClass('open')
	  } else {
		event.preventDefault();
		
		$(this).parent().addClass('open')
	  }
	}
  });
}

//Accordion
function accordion() {
  var $ = jQuery;
  
  $('.accordion-group .accordion-body.in').parent().addClass('active');
  
  $('.accordion-group .accordion-heading').click( function(event){
	var accordion = $(this).parent();
	
	event.preventDefault();
	
	if ( accordion.hasClass('active')) {
	  if (accordion.closest('.accordion').hasClass('one-open')) {
		event.stopPropagation();
	  } else {
		accordion.removeClass('active');
	  }
	} else {
	  $(this).closest('.accordion').find('.accordion-group').removeClass('active');
	  accordion.addClass('active');
	}
  }).dblclick(function(event){
	event.preventDefault();
	
	$(this).trigger('click');
  });
}

//Tabs
function tabs() {
  var $ = jQuery;

  if ($('body').width() < 768)
  {
    $('.nav-tabs').each(function(){
	  if (!$(this).next('.tab-content').hasClass('hidden')) {
		$(this).addClass('accordion-tab');
	  
		$(this).find('a').each(function(){
		  var id = $(this).attr('href');
		  
		  $(this).prepend('<span class="open-sub"></span>');
		  
		  $(this).closest('.nav-tabs').next('.tab-content').find(id)
			.appendTo($(this).closest('li'));
		});
		
		$(this).next('.tab-content').addClass('hidden');
	  }
    });
	
	$('.accordion-tab > li.active .tab-pane').slideDown();
	
	$('.accordion-tab > li > a').click(function(event){
	  event.preventDefault();
	  
	  if (!$(this).closest('li').find('.tab-pane').hasClass('active')) {
		$(this).closest('.tabs, .nav-tabs').find('.tab-pane').slideUp();
		$('.accordion-tab .tab-pane').removeClass('active');
		$(this).closest('li').find('.tab-pane').slideDown();
	  }
	});
	
	$('.nav-tabs a').click(function (event) {
	  $(this).tab('show');
	});
  }
  else
  {
	$('.nav-tabs .tab-pane').removeAttr('style', 'display');
	$('.nav-tabs').each(function(){
	  if ($(this).next('.tab-content').hasClass('hidden')) {
		$(this).removeClass('accordion-tab');
	  
		$(this).find('a').each(function(){
		  var id = $(this).attr('href');
		  
		  $($(this).closest('li').find('.tab-pane'))
			.appendTo($(this).closest('.nav-tabs').next('.tab-content'));
		});
		
		$(this).next('.tab-content').removeClass('hidden');
	  }
    });
	
	$('.nav-tabs a').click(function (event) {
	  event.preventDefault();
	  
	  $(this).tab('show');
	});
  }
}

//Footer structure (max-width < 768)
function footerStructure() {
  var $ = jQuery;
  
  if ($('body').width() < 768) {
	if (!$('#footer .footer-bottom .new-copyright').length) {
	  $('#footer .footer-bottom .address').after('<div class="new-copyright"></div>');
	  $('#footer .footer-bottom .copyright').appendTo('#footer .footer-bottom .new-copyright');
	}
  } else {
	if ($('#footer .footer-bottom .new-copyright').length) {
	  $('#footer .footer-bottom .copyright').prependTo('#footer .footer-bottom .row');
	  $('#footer .footer-bottom .new-copyright').remove();
	}
  }
}

//Slider
function openItem( $item ) {
  var $ = jQuery;
  
  $item.addClass('active');
  $item.stop().children('.slid-content').animate({
	opacity: 1
  });
}
function slider() {
  var $ = jQuery;
  
  $('#slider .sliders-box').each(function () {
	$(this).carouFredSel({
	  responsive : true,
	  scroll : {
		fx : "crossfade",
		duration: 700,
		onBefore: function( data ) {
		  data.items.old.stop().children('.slid-content').animate({
			opacity: 0
		  });
		},
		onAfter: function( data ) {
		  openItem( data.items.visible );
		}
	  },
	  auto: true,
	  next: $(this).closest('#slider').find('.next'),
	  prev: $(this).closest('#slider').find('.prev'),
	  pagination: $(this).closest('#slider').find('.pagination'),
	  items : {
		visible : 1,
	  },
	  swipe: {
		onMouse: false,
		onTouch: true
	  },
	  onCreate: function( data ) {
		openItem(data.items);
	  }
	}).parents('#slider').removeClass('load');
  });
}

//Page Slider
function pageSlider() {
  var $ = jQuery;
  
  $('.page-slider .sliders-box').each(function () {
	$(this).carouFredSel({
	  responsive : true,
	  scroll : {
		fx : "crossfade",
		duration: 1000,
		onBefore: function( data ) {
		  data.items.old.stop().children('.slid-content').animate({
			bottom: '100%'
		  });
		},
		onAfter: function( data ) {
		  openItem( data.items.visible );
		}
	  },
	  auto: false,
	  next: $(this).closest('.page-slider').find('.next'),
	  prev: $(this).closest('.page-slider').find('.prev'),
	  pagination: $(this).closest('.page-slider').find('.pagination'),
	  items : {
		visible : 1,
	  },
	  swipe: {
		onMouse: false,
		onTouch: true
	  },
	  onCreate: function( data ) {
		openItem(data.items);
	  }
	}).parents('.page-slider').removeClass('load');
  });
}

//Banner set
function bannerSet() {
  var $ = jQuery,
	  twoBanners = $('.banner-set .two-banners');
  
  if ( $('body').width() < 768 )
  {
	if (!twoBanners.length) {
	  $('.banner-set .banner:even').each(function(){
		$(this).before('<div class="two-banners"></div>');
		$(this).addClass('first');
		$(this).next().prependTo($(this).prev('.two-banners'));
		$(this).prependTo($(this).prev('.two-banners'));
	  });
	}
  }
  else
  {
	if (twoBanners.length) {
	  twoBanners.each(function(){
		$(this).children().removeClass('first');
		$(this).children().appendTo($(this).parent());
		$(this).remove();
	  });
	}
  }
}
function bannerSetCarousel() {
  var $ = jQuery;
  
  $('.banner-set .banners').each(function () {
	var bannerSet = $(this).closest('.banner-set'),
		prev = bannerSet.find('.prev'),
		next = bannerSet.find('.next'),
		pagitation,
		height;
		
	if (bannerSet.hasClass('banner-set-mini')) {
	  pagination = false;
	} else {
	  pagination = bannerSet.find('.pagination');
	}

	$(this).carouFredSel({
	  auto       : false,
	  width      : '100%',
	  responsive : false,
	  infinite   : false,
	  next       : next,
	  prev       : prev,
	  pagination : pagination,
	  swipe      : {
		onMouse : false,
		onTouch : true
	  },
	  scroll: 1,
	  onCreate: function () {
		if ( $('body').width() < 768 ) {
		  height = 'auto';
		} else {
		  height = $(this).height();
		}
		$(this).find('.banner').css({
		  height : height
		});
	  }
	}).parents('.banner-set').removeClass('load');
  });
}

//Carousel
function carousel() {
  var $ = jQuery;
  
  $('.carousel-box .carousel').each(function () {
	var carousel = $(this).closest('.carousel-box'),
		swipe,
		autoplay,
		prev,
		next,
		pagitation,
		responsive = false;

	if (carousel.hasClass('no-swipe')) {
	  swipe = false;
	} else {
	  swipe = true;
	}
	
	if (carousel.attr('data-carousel-autoplay') == 'true') {
	  autoplay = true;
	} else {
	  autoplay = false;
	}
	
	if (carousel.attr('data-carousel-nav') == 'false') {
	  next = false;
	  prev = false;
	  carousel.addClass('no-nav');
	} else {
	  next = carousel.find('.next');
	  prev = carousel.find('.prev');
	  carousel.removeClass('no-nav');
	}
	
	if (carousel.attr('data-carousel-pagination') == 'true') {
	  pagination = carousel.find('.pagination');
	  carousel.removeClass('no-pagination');
	} else {
	  pagination = false;
	  carousel.addClass('no-pagination');
	}
	
	if (carousel.attr('data-carousel-one') == 'true') {
	  responsive = true;
	}
	
	$(this).carouFredSel({
	  auto       : autoplay,
	  width      : '100%',
	  infinite   : false,
	  next       : next,
	  prev       : prev,
	  pagination : pagination,
	  responsive : responsive,
	  swipe      : {
		onMouse : false,
		onTouch : swipe
	  },
	  scroll: 1
	}).parents('.carousel-box').removeClass('load');
  });
}

//Promo Slider
function promoSlider() {
  var $ = jQuery;
  
  $('.slider-promo .sliders-box').each(function () {
	$(this).carouFredSel({
	  auto       : false,
	  responsive : true,
	  infinite   : false,
	  pagination : $(this).closest('.slider-promo').find('.pagination'),
	  swipe      : {
		onMouse : false,
		onTouch : true
	  }
	}).parents('.slider-promo').removeClass('load');
  });
}

function thumblist() {
  var $ = jQuery;
  
  $('#thumblist').carouFredSel({
	prev  : '.thumblist-box .prev',
	next  : '.thumblist-box .next',
	width : '100%',
	auto  : false,
	swipe : {
	  onMouse : false,
	  onTouch : true
	}
  }).parents('.thumblist-box').removeClass('load');
}

//Modern Gallery
function modernGallery() {
  var $ = jQuery,
	  $container = $('#gallery-modern');
	  
  $container.imagesLoaded( function() {
    if ($(window).width() >= 1200) {
      $container.masonry({
        columnWidth: 300,
        itemSelector: '.images-box'
      }); 
    } else if ($(window).width() <= 1199 && $(window).width() >= 980 ) {
      $container.masonry({
        columnWidth: 240,
        itemSelector: '.images-box'
      }); 
    } else if ($(window).width() <= 979 && $(window).width() >= 768 ) {
      $container.masonry({
        columnWidth: 186,
        itemSelector: '.images-box'
      }); 
    }
  });
}

//Chart
function chart() {
  var $ = jQuery;
  
  $('.chart').each(function () {
	var $this             = $(this),
		line              = [],
		type              = 'line',
		width             = '100%',
		height            = '225',
		lineColor         = '#e1e1e1',
		fillColor         = 'rgba(0, 0, 0, .05)',
		spotColor         = '#a9a8a8',
		minSpotColor      = '#c6c6c6',
		maxSpotColor      = '#727070',
		verticalLineColor = '#e1e1e1',
		spotColorHovered  = '#1e1e1e',
		lineWidth         = 2,
		barSpacing        = 8,
		barWidth          = 18,
		barColor          = 'rgba(0, 0, 0, .2)',
		offset            = 0,
		sliceColors       = [],
		colorMap          = [],
		rangeColors       = ['#d3dafe', '#a8b6ff', '#7f94ff'],
		posBarColor	      = '#c6c6c6',
		negBarColor	      = '#727070',
		zeroBarColor      = '#a9a8a8',
		performanceColor  = '#575656',
		targetWidth       = 5,
		targetColor       = '#1e1e1e';
	  
	if ($this.attr('data-line') !== undefined && $this.attr('data-line') !== false) {
	  line = $this.attr('data-line').split(/,/);
	}
	if ($this.attr('data-height') !== undefined && $this.attr('data-height') !== false) {
	  height = $this.attr('data-height');
	}
	if ($this.attr('data-line-width') !== undefined && $this.attr('data-line-width') !== false) {
	  lineWidth = $this.attr('data-line-width');
	}
	if ($this.attr('data-line-color') !== undefined && $this.attr('data-line-color') !== false) {
	  lineColor = $this.attr('data-line-color');
	}
	if ($this.attr('data-vertical-line-color') !== undefined && $this.attr('data-vertical-line-color') !== false) {
	  verticalLineColor = $this.attr('data-vertical-line-color');
	}
	if ($this.attr('data-spot-color-hovered') !== undefined && $this.attr('data-spot-color-hovered') !== false) {
	  spotColorHovered = $this.attr('data-spot-color-hovered');
	}
	if ($this.attr('data-spot-color') !== undefined && $this.attr('data-spot-color') !== false) {
	  spotColor = $this.attr('data-spot-color');
	}
	if ($this.attr('data-min-spot-color') !== undefined && $this.attr('data-min-spot-color') !== false) {
	  minSpotColor = $this.attr('data-min-spot-color');
	}
	if ($this.attr('data-max-spot-color') !== undefined && $this.attr('data-max-spot-color') !== false) {
	  maxSpotColor = $this.attr('data-max-spot-color');
	}
	if ($this.attr('data-bar-spacing') !== undefined && $this.attr('data-bar-spacing') !== false) {
	  barSpacing = $this.attr('data-bar-spacing');
	}
	if ($this.attr('data-bar-width') !== undefined && $this.attr('data-bar-width') !== false) {
	  barWidth = $this.attr('data-bar-width');
	}
	if ($this.attr('data-bar-color') !== undefined && $this.attr('data-bar-color') !== false) {
	  barColor = $this.attr('data-bar-color');
	}
	if ($this.attr('data-color-map') !== undefined && $this.attr('data-color-map') !== false) {
	  colorMap = $this.attr('data-color-map').split(/, /);
	}
	if ($this.attr('data-offset') !== undefined && $this.attr('data-offset') !== false) {
	  offset = $this.attr('data-offset');
	}
	if ($this.attr('data-slice-colors') !== undefined && $this.attr('data-slice-colors') !== false) {
	  sliceColors = $this.attr('data-slice-colors').split(/, /);
	}
	if ($this.attr('data-range-colors') !== undefined && $this.attr('data-range-colors') !== false) {
	  rangeColors = $this.attr('data-range-colors').split(/, /);
	}
	if ($this.attr('data-target-width') !== undefined && $this.attr('data-target-width') !== false) {
	  targetWidth = $this.attr('data-target-width');
	}
	if ($this.attr('data-pos-bar-color') !== undefined && $this.attr('data-pos-bar-color') !== false) {
	  posBarColor = $this.attr('data-pos-bar-color');
	}
	if ($this.attr('data-neg-bar-color') !== undefined && $this.attr('data-neg-bar-color') !== false) {
	  negBarColor = $this.attr('data-neg-bar-color');
	}
	if ($this.attr('data-performance-color') !== undefined && $this.attr('data-performance-color') !== false) {
	  performanceColor = $this.attr('data-performance-color');
	}
	if ($this.attr('data-type') == 'bar') {
	  type = 'bar';
	}
	if ($this.attr('data-type') == 'pie') {
	  type = 'pie';
	  width = 'auto';
	}
	if ($this.attr('data-type') == 'discrete') {
	  type = 'discrete';
	}
	if ($this.attr('data-type') == 'tristate') {
	  type = 'tristate';
	}
	if ($this.attr('data-type') == 'bullet') {
	  type = 'bullet';
	}
	if ($this.attr('data-type') == 'box') {
	  type = 'box';
	}
	
	$this.sparkline(line, {
	  type               : type,
	  width              : width,
	  height             : height,
	  lineColor          : lineColor,
	  fillColor          : fillColor,
	  lineWidth          : lineWidth,
	  spotColor          : spotColor,
	  minSpotColor       : minSpotColor,
	  maxSpotColor       : maxSpotColor,
	  highlightSpotColor : spotColorHovered,
	  highlightLineColor : verticalLineColor,
	  spotRadius         : 6,
	  chartRangeMin      : 0,
	  barSpacing         : barSpacing,
	  barWidth           : barWidth,
	  barColor           : barColor,
	  offset             : offset,
	  sliceColors        : sliceColors,
	  colorMap           : colorMap,
	  posBarColor	     : posBarColor,
	  negBarColor	     : negBarColor,
	  zeroBarColor       : zeroBarColor,
	  rangeColors        : rangeColors,
	  performanceColor   : performanceColor,
	  targetWidth        : targetWidth,
	  targetColor        : targetColor
	});
  });
}

function graph($re) {
  var $ = jQuery,
	  tax_data;
  
  if ($re) {
	$('.graph').html('');
  }
  
  tax_data = [
	{
	  period: "2011 Q3",
	  licensed: 3407,
	  sorned: 660
	}, {
	  period: "2011 Q2",
	  licensed: 3351,
	  sorned: 629
	}, {
	  period: "2011 Q1",
	  licensed: 3269,
	  sorned: 618
	}, {
	  period: "2010 Q4",
	  licensed: 3246,
	  sorned: 661
	}, {
	  period: "2009 Q4",
	  licensed: 3171,
	  sorned: 676
	}, {
	  period: "2008 Q4",
	  licensed: 3155,
	  sorned: 681
	}, {
	  period: "2007 Q4",
	  licensed: 3226,
	  sorned: 620
	}, {
	  period: "2006 Q4",
	  licensed: 3245,
	  sorned: null
	}, {
	  period: "2005 Q4",
	  licensed: 3289,
	  sorned: null
	}
  ];
  
  if ($('#hero-graph').length) {
	Morris.Line({
	  element: "hero-graph",
	  data: tax_data,
	  xkey: "period",
	  ykeys: ["licensed", "sorned"],
	  labels: ["Licensed", "Off the road"],
	  lineColors: ["#3e8e00", "#000000"]
	});
  }
  
  if ($('#hero-donut').length) {
	Morris.Donut({
	  element: "hero-donut",
	  data: [
		{
		  label: "Development",
		  value: 25
		}, {
		  label: "Sales & Marketing",
		  value: 40
		}, {
		  label: "User Experience",
		  value: 25
		}, {
		  label: "Human Resources",
		  value: 10
		}
	  ],
	  colors: ["#ff9d00"],
	  height: 100,
	  formatter: function(y) {
		return y + "%";
	  }
	});
  }
  
  if ($('#hero-area').length) {
	Morris.Area({
	  element: "hero-area",
	  data: [
		{
		  period: "2010 Q1",
		  iphone: 2666,
		  ipad: null,
		  itouch: 2647
		}, {
		  period: "2010 Q2",
		  iphone: 2778,
		  ipad: 2294,
		  itouch: 2441
		}, {
		  period: "2010 Q3",
		  iphone: 4912,
		  ipad: 1969,
		  itouch: 2501
		}, {
		  period: "2010 Q4",
		  iphone: 3767,
		  ipad: 3597,
		  itouch: 5689
		}, {
		  period: "2011 Q1",
		  iphone: 6810,
		  ipad: 1914,
		  itouch: 2293
		}, {
		  period: "2011 Q2",
		  iphone: 5670,
		  ipad: 4293,
		  itouch: 1881
		}, {
		  period: "2011 Q3",
		  iphone: 4820,
		  ipad: 3795,
		  itouch: 1588
		}, {
		  period: "2011 Q4",
		  iphone: 15073,
		  ipad: 5967,
		  itouch: 5175
		}, {
		  period: "2012 Q1",
		  iphone: 10687,
		  ipad: 4460,
		  itouch: 2028
		}, {
		  period: "2012 Q2",
		  iphone: 8432,
		  ipad: 5713,
		  itouch: 1791
		}
	  ],
	  xkey: "period",
	  ykeys: ["iphone", "ipad", "itouch"],
	  labels: ["iPhone", "iPad", "iPod Touch"],
	  hideHover: "auto",
	  lineWidth: 2,
	  pointSize: 4,
	  lineColors: ["#00c3ff", "#ff9d00", "#3e8e00"],
	  fillOpacity: 0.3,
	  smooth: true
	});
  }
  
  if ($('#hero-bar').length) {
	return Morris.Bar({
	  element: "hero-bar",
	  data: [
		{
		  device: "iPhone",
		  geekbench: 136
		}, {
		  device: "iPhone 3G",
		  geekbench: 137
		}, {
		  device: "iPhone 3GS",
		  geekbench: 275
		}, {
		  device: "iPhone 4",
		  geekbench: 380
		}, {
		  device: "iPhone 4S",
		  geekbench: 655
		}, {
		  device: "iPhone 5",
		  geekbench: 1571
		}
	  ],
	  xkey: "device",
	  ykeys: ["geekbench"],
	  labels: ["Geekbench"],
	  barRatio: 0.4,
	  xLabelAngle: 35,
	  hideHover: "auto",
	  barColors: ["#ef005c"]
	});
  }
}

//Portfolio Filter
function isotopFilter() {
  var $ = jQuery;
  
  $('.portfolio, .filter-box').each(function () {
	var filterBox     = $(this),
		filterElem = filterBox.find('.filter-elements'),
		buttonBox     = filterBox.find('.filter-buttons');

	if (!filterBox.hasClass('accordions-filter')) {
	  filterElem.isotope();
	}
	
	buttonBox.find('a').click(function(event){
	  var selector = $(this).attr('data-filter');
	  
	  event.preventDefault();
	  
	  if (!$(this).hasClass('active')) {
		buttonBox.find('a').removeClass('active');
		$(this).addClass('active');
		
		if (filterBox.hasClass('accordions-filter')) {
		  filterElem.children().not(selector)
			.animate({ height : 0 })
			.addClass('e-hidden');
		  filterElem.children(selector)
			.animate({ height : '100%' })
			.removeClass('e-hidden');
		} else {
		  filterElem.isotope({
			filter: selector,
		  });
		}
	  }
	});
  });
}

$(document).ready(function(){
  'use strict';
  var $ = jQuery;
  
  //Touch device
  if( navigator.userAgent.match(/iPad|iPhone|Android/i) ) {
	$('body').addClass('touch-device');
	$('.bg-video video').remove();
  }
  
  //Slider Revolution
  $('.tp-banner').revolution({
	delay          : 6000,
	startwidth     : 1170,
	startheight    : 500,
	hideThumbs     : 10,
	navigationType : 'none',
	onHoverStop    : 'off'
  }).parents('#slider').removeClass('load');
  
  //Functions
  fullWidthBox();
  menu();
  footerStructure();
  bannerSet();
  tabs();
  accordion();
  headerCustomizer();
  modernGallery();
  animations();
  chart();
  graph();
  formStylization();
  
  //Carousel load
  $(window).bind({
    load : function() {
      slider();
      pageSlider();
      bannerSetCarousel();
      thumblist();
      carousel();
      promoSlider();
	  isotopFilter();
    }
  });

  //Meta Head
  if (document.width > 768) {
    $('.viewport').remove();
  }

  //Bootstrap Elements
  $('.tooltip-demo a, .tooltip-link').tooltip();
  
  $("a[data-toggle=popover]")
	.popover()
	.click(function(event) {
	  event.preventDefault();
	});
  
  $('.btn-loading').click(function () {
    var btn = $(this)
    btn.button('loading')
    setTimeout(function () {
      btn.button('reset')
    }, 3000)
  });
  $('.disabled').click(function () {
    return false;
  });
  
  //Language-Currency
  $('.language, .currency, .sort-by, .show-by').hover(function(){
    $(this).addClass('open');
  }, function(){
    $(this).removeClass('open');
  });
  
  //Header Phone & Search
  $('.phone-header > a').click(function(event){
	event.preventDefault();
    $('.btn-group').removeClass('open');
    $('.phone-active').fadeIn();
	$('.cart-header').addClass('no-open');
  });
  
  $('.search-header > a').click(function(event){
	event.preventDefault();
    $('.btn-group').removeClass('open');
    $('.search-active').fadeIn();
	$('.cart-header').addClass('no-open');
  });
  
  $('.phone-active .close, .search-active .close').click(function(event){
	event.preventDefault();
    $(this).parent().fadeOut();
	$('.cart-header').removeClass('no-open');
  });
  
  //Cart
  $('.cart-header').hover(function(){
    if ($('body').width() >= 979 ) {
      $(this).addClass('open');
    }
  }, function(){
    if ($('body').width() >= 979 ) {
      $(this).removeClass('open');
    }
  });
  
  $('.cart-header .dropdown-menu .close').click(function(){
    $(this).parents('.cart-header').removeClass('open');
  });
  
  //Product
  if(!navigator.userAgent.match(/iPad|iPhone|Android/i)) {
	$('.product, .employee')
	  .hover(function(event) {
		event.preventDefault();
		
		$(this).addClass('hover');
	  }, function(event) {
		event.preventDefault();
		
		$(this).removeClass('hover');
	  });
  }
  
  $('body').on('touchstart', function (event) {
	event.stopPropagation();
	
	if ($(event.target).parents('.product, .employee').length==0) {
      $('.product, .employee').removeClass('hover');
    }
  });

  $('.product, .employee').bind('touchend', function(event){
	if ($(this).hasClass('hover')) {
	  $(this).removeClass('hover');
	} else {
	  $('.product, .employee').removeClass('hover');
	  $(this).addClass('hover');
	}
  });

  //Menu > Sidebar
  $('.menu .parent:not(".active") a').next('.sub').css('display', 'none');
  $('.menu .parent a .open-sub').click(function(event){
	event.preventDefault();
	
    if ($(this).closest('.parent').hasClass('active')) {
      $(this).parent().next('.sub').slideUp(600);
      $(this).closest('.parent').removeClass('active');
    } else {
      $(this).parent().next('.sub').slideDown(600);
      $(this).closest('.parent').addClass('active');
    }
  });
  
  //Button flip
  $('.btn-ads').hover(function(){
    if ($(this).hasClass("flip")) {
      $(this).removeClass("flip");
    } else {
      $(this).addClass("flip");
    }
  });
  
  //Price Regulator
  $('#Slider2').slider({
    from: 5000,
    to: 150000,
    limits: false,
    heterogeneity: ['50/50000'],
    step: 1000,
    dimension: '&nbsp;$'
  });
  
  $('#filter').slider({
    from: 2000,
    to: 2013,
    limits: false,
    step: 1,
    dimension: '',
    calculate: function( value ){
      return ( value );
    }
  });
  $('.jslider-pointer').html('\n\
	<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 8 12" enable-background="new 0 0 8 12" xml:space="preserve">\n\
	  <path fill-rule="evenodd" clip-rule="evenodd" fill="#1e1e1e" d="M2,0h4c1.1,0,2,0.9,2,2l-2,8c-0.4,1.1-0.9,2-2,2l0,0c-1.1,0-1.6-0.9-2-2L0,2C0,0.9,0.9,0,2,0z"/>\n\
	</svg>\n\
  ');
  
  //Contact Us
  $('#submit').click(function(){
    $.post('form.php', $('#contactform').serialize(),  function(data) {
      $('#success').html(data).animate({opacity: 1}, 500, function(){
        $('#contactform').trigger( 'reset' );
      });
    });
    return false;
  });
  
  //Regulator Up/Down
  $('.number-up').click(function(){
    var $value = ($(this).closest('.number').find('input[type="text"]').attr('value'));
    $(this).closest('.number').find('input[type="text"]').attr('value', parseFloat($value)+1);
    return false;
  });
  $('.number-down').click(function(){
    var $value = ($(this).closest('.number').find('input[type="text"]').attr('value'));
    if ($value > 1) {
      $(this).closest('.number').find('input[type="text"]').attr('value', parseFloat($value)-1);
    }
    return false;
  });
  
  //Add to Cart
  $(".add-cart-form .add-cart").click(function() {
    $(this).next('.number').find('input[type="text"]').attr('value', 1);
    return false;
  });
  
  // Zoomer
  if ($.fn.elevateZoom) {
	if ($('body').width() > 980) {
	  $('.general-img img').elevateZoom({
		gallery            : 'thumblist', 
		cursor             : 'crosshair',
		galleryActiveClass : 'active',
		zoomWindowWidth    : 470,
		zoomWindowHeight   : 470,
		borderSize         : 0,
		borderColor        : 'none',
		lensFadeIn         : true,
		zoomWindowFadeIn   : true
	  });
	} else {
	  $('.general-img img').elevateZoom({
		gallery            : 'thumblist', 
		cursor             : 'crosshair',
		galleryActiveClass : 'active',
		borderSize         : 0,
		borderColor        : 'none',
		lensFadeIn         : true,
		zoomWindowFadeIn   : true,
		zoomType		   : 'inner'
	  });
	}
  }
  //Add your review
  $('a[href="#reviews"]').click(function(){
    $('.product-tab .nav-tabs > li, .tab-content > .tab-pane').removeClass('active');
    $('.tab-content > .tab-pane#reviews').addClass('active');
	$('.product-tab .nav-tabs > li > a[href="#reviews"]').parent().addClass('active');
	
	$('html, body').animate({
      scrollTop: $("#reviews").offset().top
    }, 1000);
  });
  
  //Emergence Price
  $('.emergence-price').click(function(){
    $(this).animate({opacity: "0"}, 0);
    $(this).prev('.price').fadeIn(1000);
    return false;
  });
  
  //Gallery
  $('.gallery-images, .lightbox').fancybox({
    nextEffect  : 'fade',
    prevEffect  : 'fade',
    openEffect  : 'fade',
    closeEffect : 'fade',
	tpl         : {
	  next : '<a title="Next" class="fancybox-nav fancybox-next" href="javascript:;">\n\
		<span><svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="9px" height="16px" viewBox="0 0 9 16" enable-background="new 0 0 9 16" xml:space="preserve"><polygon fill-rule="evenodd" clip-rule="evenodd" fill="#fcfcfc" points="1,0.001 0,1.001 7,8 0,14.999 1,15.999 9,8 "/></svg></span>\n\
	  </a>',
	  prev : '<a title="Previous" class="fancybox-nav fancybox-prev" href="javascript:;">\n\
		<span><svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="9px" height="16px" viewBox="0 0 9 16" enable-background="new 0 0 9 16" xml:space="preserve"><polygon fill-rule="evenodd" clip-rule="evenodd" fill="#fcfcfc" points="8,15.999 9,14.999 2,8 9,1.001 8,0.001 0,8 "/></svg></span>\n\
	  </a>',
	}
  });
  
  //Country
  if ($.fn.county){
    $('#count-down').county({
	  endDateTime: new Date('2014/12/29 10:00:00'),
	  reflection: false
	});
  }
  
  // Scroll to Top
  $('#footer .up').click(function() {
    $('html, body').animate({
      scrollTop: $('body').offset().top
    }, 500);
    return false;
  });
  
  // Circular Bars - Knob
  if(typeof($.fn.knob) != 'undefined') {
	$('.knob').each(function () {
      var $this = $(this),
		  knobVal = $this.attr('rel');

      $this.knob({
		'draw' : function () { 
		  $(this.i).val(this.cv + '%')
		}
	  });

      $({
		value: 0
      }).animate({
        value: knobVal
      }, {
        duration: 2000,
        easing: 'swing',
        step: function () {
          $this.val(Math.ceil(this.value)).trigger('change');
        }
      });
	});
  }
  
  //Paralax
  if(!navigator.userAgent.match(/iPad|iPhone|Android/i)) {
	$('body').stellar({
	  horizontalScrolling: false,
	  verticalOffset: 0,
	  horizontalOffset: 0
	});
  }
  
  //Blur
  $('.blur').blurjs({
	source: '.blur',
	radius: 20,
	overlay: 'rgba(0, 0, 0, .2)'
  });
  
  //Resize Window
  $(window).resize(function() {
	
	delay( function() {
	  
	  if ($('body').width > 767) {
		$('.viewport').remove();
	  } else {
		$('head').append('<meta class="viewport" name="viewport" content="width=device-width, initial-scale=1.0">');
	  }
	  
	  //Functions
	  fullWidthBox();
	  menu();
	  footerStructure();
	  bannerSet();
	  tabs();
	  modernGallery();
	  animations();
	  chart();
	  isotopFilter();
	  
	  slider();
      pageSlider();
      bannerSetCarousel();
      thumblist();
      carousel();
      promoSlider();
	  
	  var graphResize;
	
	  clearTimeout(graphResize);
	  return graphResize = setTimeout(function() {
		return graph(true);
	  }, 500);
	  
	}, 'resize' );
  });
  
  var delay = ( function() {
	var timeout = { };
	
	return function( callback, id, time ) {
	  if( id !== null ) {
		time = ( time !== null ) ? time : 100;
		clearTimeout( timeout[ id ] );
		timeout[ id ] = setTimeout( callback, time );
	  }
	};
  })();
});