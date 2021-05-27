/**
  * isMobile
  * responsiveMenu
  * sliderbar
  * tabs
  * isOdd
  * recommandProducts
  * testimonialSlider
  * popup
  * ajaxSubscribe
  * ourProducts
  * ourProjects
  * swClick
  * goTop
  * grid_counter
  * removePreloader
*/
;(function($) {

   'use strict'

   var isMobile = {
        Android: function() {
            return navigator.userAgent.match(/Android/i);
        },
        BlackBerry: function() {
            return navigator.userAgent.match(/BlackBerry/i);
        },
        iOS: function() {
            return navigator.userAgent.match(/iPhone|iPad|iPod/i);
        },
        Opera: function() {
            return navigator.userAgent.match(/Opera Mini/i);
        },
        Windows: function() {
            return navigator.userAgent.match(/IEMobile/i);
        },
        any: function() {
            return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
        }
    };

    var responsiveMenu = function() {
        var menuType = 'desktop';

        $(window).on('load resize', function() {
            var currMenuType = 'desktop';
            if ( matchMedia( 'only screen and (max-width: 991px)' ).matches ) {
                currMenuType = 'mobile';
            }

            if ( currMenuType !== menuType ) {
                menuType = currMenuType;

                if ( currMenuType === 'mobile' ) {
                    var $mobileMenu = $('#mainnav').attr('id', 'mainnav-mobi').hide();
                    var hasChildMenu = $('#mainnav-mobi').find('li:has(ul)');

                    $('.mega-menu .mega-menu-sub').hide();
                    $('.has-mega-menu .submenu.mega-menu').hide();

                    $('#header').after($mobileMenu);
                    hasChildMenu.children('ul').hide();
                    hasChildMenu.children('a:not(.has-mega)').after('<span class="btn-submenu"></span>');
                    $('.btn-menu').removeClass('active');
                } else {
                    var $desktopMenu = $('#mainnav-mobi').attr('id', 'mainnav').removeAttr('style');

                    $desktopMenu.find('.submenu').removeAttr('style');
                    $('#header').find('.nav-wrap').append($desktopMenu);
                    $('.btn-submenu').remove();
                }
            }
        });

        $('.btn-menu').on('click', function() {         
            $('#mainnav-mobi').slideToggle(300);
            $(this).toggleClass('active');
        });

        // Mega menu click
        if ( matchMedia( 'only screen and (max-width: 991px)' ).matches ) {
            $('.btn-mega').on('click', function() {      
                $(this).parent('.mega-title').siblings().slideToggle(300);   
                $(this).toggleClass('active');
            });

            $('.has-mega').on('click', function() {      
                $(this).siblings().slideToggle(300);  
                $(this).toggleClass('active');
            });
        }        

        $(document).on('click', '#mainnav-mobi li .btn-submenu', function(e) {
            $(this).toggleClass('active').next('ul').slideToggle(300);
            e.stopImmediatePropagation()
        });

    }

    var sliderbar = function () {
        if( $().slider ) {
            $( "#slider-range" ).slider({
                range: true,
                min: 0,
                max: 721,
                values: [ 125, 525 ],
                slide: function( event, ui ) {
                    $( "#slider-range .flat-value-left span" )[0].innerHTML = "$" + ui.values[ 0 ] + ".00";
                    $( "#slider-range .flat-value-right span" )[0].innerHTML = "$" + ui.values[ 1 ] + ".00";
                }
            });
        }
    }

    var tabs = function () {
        $('.woocommerce-tabs').each(function() {
            $(this).children('.tab-content').children().hide();
            $(this).find('.product-tabs').children('li').on('click', function (e) {
                var liActive = $(this).index();
                var contentActive = $(this).siblings().removeClass('active').parents('.woocommerce-tabs').children('.tab-content').children().eq(liActive);
                contentActive.addClass('active').fadeIn('slow');
                contentActive.siblings().removeClass('active');
                $(this).addClass('active').parents('.woocommerce-tabs').children('.tab-content').children().eq(liActive).siblings().hide();
                e.preventDefault();
                return false;
            });
        });
        $('.woocommerce-tabs .product-tabs li:first').trigger('click');
    }

    var isOdd = function (num) {
        return num % 2;
    }

    var recommandProducts = function () {
        $(".flat-our-products .products-grid .item").each( function(index){
            var odd = isOdd((index + 1)); // +1 because index start from 0;
            if (odd) {
                $(this).parent().append($('<div class="owl2row">'));           
            }
            $(".owl2row").last().append($(this));
        });
        if ( !$().owlCarousel ) return;
        var owl = $(".flat-our-products .two-row");
        owl.owlCarousel({
            navigation:true,
            autoplay:false,
            autoplayTimeout:4000,
            loop: false,
            slideSpeed: 4000,
            itemSelector: 'owl2row',
            responsive:{ 
                1200:{items:5, margin : 30},
                960:{items:4, margin : 30},
                678:{items:3, margin : 30},
                479:{items:2, margin: 30},
                0:{items:1, margin: 0}
            },
            nav:false,
        });

        $(".flat-our-products .two-row-v2").owlCarousel({
            nav:true,
            dots:false,
            navText:['<i class="fa fa-chevron-right" aria-hidden="true"></i>','<i class="fa fa-chevron-left" aria-hidden="true"></i>'],
            autoplay:true,
            autoplayTimeout:4000,
            loop: true,
            slideSpeed: 4000,
            itemSelector: 'owl2row',
            responsive:{ 
                1200:{items:3, margin : 30},
                960:{items:3, margin : 30},
                678:{items:2, margin : 30},
                479:{items:2, margin: 30},
                0:{items:1, margin: 0}
            }
        })

        $(".owl-carousel-6").owlCarousel({
            nav:false,
            dots:false,
            navText:['<i class="fa fa-chevron-right" aria-hidden="true"></i>','<i class="fa fa-chevron-left" aria-hidden="true"></i>'],
            autoplay:true,
            autoplayTimeout:4000,
            loop: true,
            slideSpeed: 4000,
            itemSelector: 'owl2row',
            responsive:{ 
                1200:{items:6},
                960:{items:4},
                678:{items:3},
                479:{items:2},
                0:{items:1}
            }
        })
    }

    var testimonialSlider = function () {

        if ( !$().owlCarousel ) return;
        var owl = $(".flat-testi-wrap");
        owl.owlCarousel({
            navigation:true,
            autoplay:true,
            autoplayTimeout:4000,
            loop: true,
            slideSpeed: 4000,
            items: 1,
            nav:false,
        });
    }

    var ajaxSubscribe = {
        obj: {
            subscribeEmail    : $('#subscribe-email'),
            subscribeButton   : $('#subscribe-button'),
            subscribeMsg      : $('#subscribe-msg'),
            subscribeContent  : $("#subscribe-content"),
            dataMailchimp     : $('#subscribe-form').attr('data-mailchimp'),
            success_message   : '<div class="notification_ok">Thank you for joining our mailing list! Please check your email for a confirmation link.</div>',
            failure_message   : '<div class="notification_error">Error! <strong>There was a problem processing your submission.</strong></div>',
            noticeError       : '<div class="notification_error">{msg}</div>',
            noticeInfo        : '<div class="notification_error">{msg}</div>',
            basicAction       : 'mail/subscribe.php',
            mailChimpAction   : 'mail/subscribe-mailchimp.php'
        },

        eventLoad: function() {
            var objUse = ajaxSubscribe.obj;

            $(objUse.subscribeButton).on('click', function() {
                if ( window.ajaxCalling ) return;
                var isMailchimp = objUse.dataMailchimp === 'true';

                if ( isMailchimp ) {
                    ajaxSubscribe.ajaxCall(objUse.mailChimpAction);
                } else {
                    ajaxSubscribe.ajaxCall(objUse.basicAction);
                }
            });
        },

        ajaxCall: function (action) {
            window.ajaxCalling = true;
            var objUse = ajaxSubscribe.obj;
            var messageDiv = objUse.subscribeMsg.html('').hide();
            $.ajax({
                url: action,
                type: 'POST',
                dataType: 'json',
                data: {
                   subscribeEmail: objUse.subscribeEmail.val()
                },
                success: function (responseData, textStatus, jqXHR) {
                    if ( responseData.status ) {
                        objUse.subscribeContent.fadeOut(500, function () {
                            messageDiv.html(objUse.success_message).fadeIn(500);
                        });
                    } else {
                        switch (responseData.msg) {
                            case "email-required":
                                messageDiv.html(objUse.noticeError.replace('{msg}','Error! <strong>Email is required.</strong>'));
                                break;
                            case "email-err":
                                messageDiv.html(objUse.noticeError.replace('{msg}','Error! <strong>Email invalid.</strong>'));
                                break;
                            case "duplicate":
                                messageDiv.html(objUse.noticeError.replace('{msg}','Error! <strong>Email is duplicate.</strong>'));
                                break;
                            case "filewrite":
                                messageDiv.html(objUse.noticeInfo.replace('{msg}','Error! <strong>Mail list file is open.</strong>'));
                                break;
                            case "undefined":
                                messageDiv.html(objUse.noticeInfo.replace('{msg}','Error! <strong>undefined error.</strong>'));
                                break;
                            case "api-error":
                                objUse.subscribeContent.fadeOut(500, function () {
                                    messageDiv.html(objUse.failure_message);
                                });
                        }
                        messageDiv.fadeIn(500);
                    }
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    alert('Connection error');
                },
                complete: function (data) {
                    window.ajaxCalling = false;
                }
            });
        }
    };

    var ourProducts = function () {
        if ( !$().owlCarousel ) return;
        $(".flat-op-wrap .products-grid").owlCarousel({
            navigation:true,
            autoplay:true,
            autoplayTimeout:4000,
            loop: false,
            slideSpeed: 4000,
            items:5, 
            margin : 30,
            nav:false,
            owlrow: 'true',
            owl2rowTarget: 'item-inner',
        });

        $(".flat-na-wrap").owlCarousel({
            navigation:true,
            autoplay:false,
            autoplayTimeout:4000,
            loop: false,
            slideSpeed: 4000,
            items:3, 
            margin : 30,
            nav:false,
            responsive: {
                0:{
                    items: 1
                },
                767:{
                    items: 2
                },
                991:{
                    items: 3
                },
                1200: {
                    items: 3
                }
            }
        });

    }

    var ourProjects = function() {         
        if ( $().isotope ) {           
            var $container = $('.flat-opro-wrap');
            $container.imagesLoaded(function(){
                $container.isotope({
                    itemSelector: '.item',
                    transitionDuration: '1s'
                });
            });
                    
        };
    };    

    var goTop = function() {
        $(window).scroll(function() {
            if ( $(this).scrollTop() > 800 ) {
                $('.go-top').addClass('show');
            } else {
                $('.go-top').removeClass('show');
            }
        }); 

        $('.go-top').on('click', function() {            
            $("html, body").animate({ scrollTop: 0 }, 1000 , 'easeInOutExpo');
            return false;
        });
    };

    var grid_counter = function () {
    	$(window).on("load", function(){
    		var max = -1;

	        $( '.flat-lastest-post .item' ).each( function() {
	              var h = $(this).outerHeight(true); 
	              max = h > max ? h : max;
	        });

	        $('.flat-lastest-post .item').css('height', max);
    	})        
    }

    var googleMap = function() {
        if ( $().gmap3 ) {
            $("#flat-map").gmap3({
                map:{
                    options:{
                        zoom: 11,
                        mapTypeId: 'arch_style',
                        mapTypeControlOptions: {
                            mapTypeIds: ['arch_style', google.maps.MapTypeId.SATELLITE, google.maps.MapTypeId.HYBRID]
                        },
                        scrollwheel: false
                    }
                },
                getlatlng:{
                    address:  "PO Box 97845 Baker st. 567, Los Angeles, California, United States",
                    callback: function(results) {
                        if ( !results ) return;
                        $(this).gmap3('get').setCenter(new google.maps.LatLng(results[0].geometry.location.lat(), results[0].geometry.location.lng()));
                        $(this).gmap3({
                            marker:{
                                latLng:results[0].geometry.location,
                                options:{
                                    icon: 'http://themesflat.com/html/arch/images/icon/marker.png'
                                }
                            }
                        });
                    }
                },
                styledmaptype:{
                    id: "arch_style",
                    options:{
                        name: "Arch Map"
                    }, 
                    styles: [
                        {
                            "featureType": "landscape",
                            "stylers": [
                                {
                                    "saturation": -100
                                },
                                {
                                    "lightness": 65
                                },
                                {
                                    "visibility": "on"
                                }
                            ]
                        },

                        {
                            "featureType": "poi",
                            "stylers": [
                                {
                                    "saturation": -100
                                },
                                {
                                    "lightness": 51
                                },
                                {
                                    "visibility": "simplified"
                                }
                            ]
                        },

                        {
                            "featureType": "road.highway",
                            "stylers": [
                                {
                                    "saturation": -100
                                },
                                {
                                    "visibility": "simplified"
                                }
                            ]
                        },

                        {
                            "featureType": "road.arterial",
                            "stylers": [
                                {
                                    "saturation": -100
                                },
                                {
                                    "lightness": 30
                                },
                                {
                                    "visibility": "on"
                                }
                            ]
                        },
                        {
                            "featureType": "road.local",
                            "stylers": [
                                {
                                    "saturation": -100
                                },
                                {
                                    "lightness": 40
                                },
                                {
                                    "visibility": "on"
                                }
                            ]
                        },
                        {
                            "featureType": "transit",
                            "stylers": [
                                {
                                    "saturation": -100
                                },
                                {
                                    "visibility": "simplified"
                                }
                            ]
                        },

                        {
                            "featureType": "administrative.province",
                            "stylers": [
                                {
                                    "visibility": "off"
                                }
                            ]
                        },
                        {
                            "featureType": "water",
                            "elementType": "labels",
                            "stylers": [
                                {
                                    "visibility": "on"
                                },
                                {
                                    "lightness": -25
                                },
                                {
                                    "saturation": -100
                                }
                            ]
                        },
                        {
                            "featureType": "water",
                            "elementType": "geometry",
                            "stylers": [
                                {
                                    "hue": "#edf0f4"
                                },
                                {
                                    "lightness": 17
                                },
                                {
                                    "saturation": -97
                                }
                            ]
                        }
                    ]                   
                },
            });
        }
    }; 

    var progressCircle = function() {
        $('.flat-progress-circle').on('on-appear', function() {
            $(this).each(function() {
                if ( $().easyPieChart ) {
                    $(this).easyPieChart({
                        lineWidth: $(this).data('width'),
                        barColor: '#92c841',
                        trackColor: '#ebebeb',
                        scaleColor: false,
                        animate: 3000,
                        lineCap: 'square',
                        onStep: function(from, to, value) {
                            $(this.el).find('.inner-circle span:eq(1)').text(~~value);
                        }
                    });
                }
            });
        });
    };

    var progressBar = function() {
        $('.progress-bar').on('on-appear', function() {
            $(this).each(function() {
                var percent = $(this).data('percent');

                $(this).find('.progress-animate').animate({
                    "width": percent + '%'
                },3000);

                $(this).parent('.flat-progress').find('.perc').addClass('show').animate({
                    "width": percent + '%'
                },3000);
            });
        });
    };

    var detectViewport = function() {
        $('[data-waypoint-active="yes"]').waypoint(function() {
            $(this).trigger('on-appear');
        }, { offset: '90%', triggerOnce: true });
    };

    var flatAccordion = function() {
        var args = {duration: 600};
        $('.flat-toggle .toggle-title.active').siblings('.toggle-content').show();

        $('.flat-toggle.enable .toggle-title').on('click', function() {
            $(this).closest('.flat-toggle').find('.toggle-content').slideToggle(args);
            $(this).toggleClass('active');
        }); // toggle 

        $('.flat-accordion .toggle-title').on('click', function () {
            if( !$(this).is('.active') ) {
                $(this).closest('.flat-accordion').find('.toggle-title.active').toggleClass('active').next().slideToggle(args);
                $(this).toggleClass('active');
                $(this).next().slideToggle(args);
            } else {
                $(this).toggleClass('active');
                $(this).next().slideToggle(args);
            }     
        }); // accordion
    }; 

    var portfolioIsotope = function() {         
        if ( $().isotope ) {           
            var $container = $('.portfolio-wrap');
            $container.imagesLoaded(function(){
                $container.isotope({
                    itemSelector: '.item',
                    transitionDuration: '1s'
                });
            });

            $('.portfolio-filter li').on('click',function() {                           
                var selector = $(this).find("a").attr('data-filter');
                $('.portfolio-filter li').removeClass('active');
                $(this).addClass('active');
                $container.isotope({ filter: selector });
                return false;
            });

            $('.flat-portfolio .load-more a').on('click', function(e) {
                e.preventDefault();

                var el = $(this),
                    url = el.attr('href'),
                    page = parseInt(el.attr('data-page'), 10);

                el.addClass('loading').text('Loading...');

                $.ajax({
                    type: "GET",
                    url: url,
                    dataType: "html",
                    async: false,   // wait result
                    data : { page : page }
                })
                .done(function (data) {
                    if ( data != null ) {                      
                        var newitem = $(data);
                        $container.append(newitem).isotope('appended', newitem);
                        el.removeClass('loading').text('Load more');
                        page = page + 1;
                        el.attr({'data-page': page, 'href': './ajax/p' + page + '.html'});
                    }
                })
                .fail(function () {
                    el.text('No more portfolio to load.');
                })
            });
        };
    };

    var blog_slider = function() { 
        if ( $().flexslider ) {            
            $('.flat-blog-slider').each(function() {
                var $this = $(this)
                $this.find('.flexslider').flexslider({
                    animation      :  "slide",
                    direction      :  "horizontal", // vertical
                    pauseOnHover   :  true,
                    useCSS         :  false,
                    easing         :  "swing",
                    animationSpeed :  500,
                    slideshowSpeed :  5000,
                    controlNav     :  false,
                    directionNav   :  true,
                    slideshow      :  true,
                    prevText       :  '<i class="fa fa-angle-left"></i>',
                    nextText       :  '<i class="fa fa-angle-right"></i>',
                    smoothHeight   :  true
                }); // flexslider
            }); // blog-sider
        }
    }; 

    var ajaxContactForm = function() {  
        $('#contactform').each(function() {
            $(this).validate({
                submitHandler: function( form ) {
                    var $form = $(form),
                        str = $form.serialize(),
                        loading = $('<div />', { 'class': 'loading' });

                    $.ajax({
                        type: "POST",
                        url:  $form.attr('action'),
                        data: str,
                        beforeSend: function () {
                            $form.find('.submit-wrap').append(loading);
                        },
                        success: function( msg ) {
                            var result, cls;                            
                            if ( msg == 'Success' ) {                                
                                result = 'Message Sent Successfully To Email Administrator. ( You can change the email management a very easy way to get the message of customers in the user manual )';
                                cls = 'msg-success';
                            } else {
                                result = 'Error sending email.';
                                cls = 'msg-error';
                            }

                            $form.prepend(
                                $('<div />', {
                                    'class': 'flat-alert ' + cls,
                                    'text' : result
                                }).append(
                                    $('<a class="close" href="#"><i class="fa fa-close"></i></a>')
                                )
                            );

                            $form.find(':input').not('.submit').val('');
                        },
                        complete: function (xhr, status, error_thrown) {
                            $form.find('.loading').remove();
                        }
                    });
                }
            });
        }); // each contactform
    };   

    var alertBox = function() {
        $(document).on('click', '.close', function(e) {
            $(this).closest('.flat-alert').remove();
            e.preventDefault();
        })     
    }  

    var parallax = function() {
        if ( $().parallax && isMobile.any() == null ) {
            $('.parallax1').parallax("50%", 0.2); 
            $('.parallax2').parallax("50%", 0.2);          
        }
    };

    var removePreloader = function() {        
        $('.loading-overlay').fadeOut('slow',function () {
            $(this).remove();
        });
    }; 

    // Dom Ready
    $(function() {
        responsiveMenu();
        sliderbar();
        goTop();
        tabs();        
        recommandProducts();
        ajaxSubscribe.eventLoad();
        ourProducts();
        ourProjects();
        testimonialSlider();
        grid_counter();
        progressCircle();
        progressBar();
        detectViewport();
        portfolioIsotope();
        blog_slider();
        ajaxContactForm();
        alertBox();
        parallax();
        flatAccordion();
        googleMap();
        removePreloader();
    });

})(jQuery);