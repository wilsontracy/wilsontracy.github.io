

// //testing the shrinking nav thing
// // get the value of the bottom of the #main element by adding the offset of that element plus its height, set it as a variable
// var mainbottom = $('#littleguy').offset().top + $('#littleguy').height();

// // on scroll, 
// $(window).on('scroll',function(){

//     // we round here to reduce a little workload
//     stop = Math.round($(window).scrollTop());
//     if (stop > mainbottom) {
//         $('header').addClass('past-main');
//     } else {
//         $('header').removeClass('past-main');
//    }

// });

// //scroll to links

// $('.navigation a').on('click', jump);

// function jump(event) {
//     event.preventDefault();

//     // GET THE LINK WE CLICKED ON
//     var $currentTarget = $(event.currentTarget);

//     // GOT THE NAME OF THE ID SPECIFIC TO THE TARGET
//     var targetId = $currentTarget.attr('href');

//     // MEASURE DISTANCE FROM ID TO TOP OF DOCUMENT
//     var offsetTop = $(targetId).offset().top;

//     // ANIMATE PAGE TO SCROLLTOP PROPERTY
//     $('html, body').animate({
//         scrollTop: offsetTop
//     }, 1000);
// }

//nav scroll to links, adding nav class
$(document).ready(function () {
    $(document).on("scroll", onScroll);
 
    $('a[href^="#"]').on('click', function (e) {
      e.preventDefault();
      $(document).off("scroll");
 
      $('a').each(function () {
        $(this).removeClass('active');
      })
      $(this).addClass('active');
 
      var target = this.hash;
      $target = $(target);
      $('html, body').stop().animate({
        'scrollTop': $target.offset().top+2
      }, 500, 'swing', function () {
        window.location.hash = target;
        $(document).on("scroll", onScroll);
      });
    });
  });
 
  function onScroll(event){
    var scrollPosition = $(document).scrollTop();
    $('.navigation a').each(function () {
      var currentLink = $(this);
      var refElement = $(currentLink.attr("href"));
      if (refElement.position().top <= scrollPosition && refElement.position().top + refElement.height() > scrollPosition) {
        $('.navigation a').removeClass("active");
        currentLink.addClass("active");
      }
      else{
        currentLink.removeClass("active");
      }
    });
  }




//toggling bios

function slide(event) {
    event.preventDefault();
    $('#adam-bio').slideToggle(500);
  }

  $('#adam').on('click', slide);

function slide2(event) {
    event.preventDefault();
    $('#scott-bio').slideToggle(500);
  }

  $('#scott').on('click', slide2);


  function slide3(event) {
    event.preventDefault();
    $('#steph-bio').slideToggle(500);
  }

  $('#steph').on('click', slide3);



//the countdown
$('#clock').countdown('2016/07/23 13:00:00', function(event) {
   var $this = $(this).html(event.strftime(''
     // + '<span>%w</span> weeks '
     + '<span class="c-d-one">The next meeting is in: <br></span>'
     + '<span class="c-d-number">%D</span> <span class="c-d-days">Days</span> '
     + '<br><span>%H</span> Hours '
     + '<span>%M</span> Minutes '
     + '<span>%S</span> Seconds '
     + '<br>On November 08, 2015'
     ));
 });



//the bulletin form

$('form').on('submit', function() {
    event.preventDefault();

        // Get the form instance

        //when we submit this form, the event is a form--and it's putting the whole form in an object
        var $form = $(event.currentTarget);


        console.log($('#name-box').val());
        console.log($('#quote-box').val());
        console.log($('#page-box').val());

        var nameBox= $('#name-box').val();
        var quoteBox= $('#quote-box').val();
        var pageBox= $('#page-box').val();

        if(nameBox !='') {

    //Network > XHR to see what ajax is doing
    //input type to upload a file is <input type="file">
       

        //This is the fancy stuff
        //-------------------------------
        // Use Ajax to submit form data
        var url = 'https://docs.google.com/forms/d/1HIRTXsW4LNiugKHa-mElkbMht8uaQaq5o9haCex8kEM/formResponse';

        var data = $form.serialize();

        $.post(url, $form.serialize(), function() {

        }).always(function() {
            console.warn('Data sent to Google.');
            // $('body').append('<div>Thank you for submitting a form!</div>');
        });


        //clear the entry areas
   

      } else {
        alert('please fill entire form');
      }

     $( 'form' ).each(function(){
    this.reset();
    });
  });

//supposedly something that makes header shrink on scroll

// $('.iris-left').xeyes();
// $('.iris-right').xeyes();


(function($) {
  "use strict";

  var defaultOptions = {
    padding: 0,
    reset: false,
    radius: 'natural',
    position: 'center',
    trigger: window
  };

  var positions = {
    top: 90,
    bottom: -90,
    left: 180,
    right: 0,
    topRight: 45,
    topLeft: 135,
    bottomRight: -45,
    bottomLeft: -135
  };

  function Iris($iris) {
    this.$iris = $iris;
    $iris.css('position', 'absolute');

    this.width  = $iris.outerWidth();
    this.height = $iris.outerHeight();

    this.resetOffset = function() {
      var offset = $iris.offset();
      this.offset = {
        x: offset.left + (this.width / 2) - parseInt($iris.css("left")),
        y: offset.top + (this.height / 2) - parseInt($iris.css("top"))
      };
    };
  }

  function Eye($eye, $iris) {
    this.$eye = $eye;

    $eye.css('position', 'relative');

    this.width  = $eye.width();
    this.height = $eye.height();

    this.iris   = new Iris($iris);

    this.pos = {
      x: (this.width - this.iris.width) / 2,
      y: (this.height - this.iris.height) / 2
    };

    $iris.css("left", this.pos.x + "px").css("top", this.pos.y + "px");

    this.padding = 0;
  }

  Eye.prototype.follow = function(mouse) {
    mouse.x = mouse.x - this.pos.x;
    mouse.y = mouse.y - this.pos.y;

    this.iris.resetOffset();

    var degree = Math.atan(( mouse.y - this.iris.offset.y) / ( mouse.x - this.iris.offset.x)),
    direction = (this.iris.offset.x > mouse.x) ? -1 : 1,
    newX = Math.cos(degree) * ((this.width - this.iris.width) / 2 - this.padding) * direction,
    newY = Math.sin(degree) * ((this.height - this.iris.height) / 2 - this.padding) * direction,
    radius = Math.sqrt(Math.pow(newX, 2) + Math.pow(newY, 2)),
    distance = Math.sqrt(Math.pow(mouse.y - this.iris.offset.y, 2) + Math.pow(mouse.x - this.iris.offset.x, 2));

    if (radius > distance) {
      this.iris.$iris.css("left", ( mouse.x - this.iris.offset.x + this.pos.x) + "px").css("top", (mouse.y - this.iris.offset.y + this.pos.y) + "px");
    } else {
      this.iris.$iris.css("left", this.pos.x + newX + "px").css("top", this.pos.y + newY + "px");
    }
  };

  Eye.prototype.setPosition = function(position) {
    if (position.x !== undefined && position.y !== undefined) {
      this.iris.$iris.css("left", this.pos.x - position.x + "px").css("top", this.pos.y - position.y + "px");
    } else if (typeof position === "number") {
      var deg = position * Math.PI / -180;
      this.iris.$iris.css("left", this.pos.x + Math.cos(deg) * (this.width / 2 - this.iris.width / 2 - this.padding) + "px").css("top", this.pos.y + Math.sin(deg) * (this.height / 2 - this.iris.height / 2 - this.padding) + "px");
    } else if (position === "center") {
      this.iris.$iris.css("left", this.pos.x + "px").css("top", this.pos.y + "px");
    } else if (positions[position] !== undefined) {
      var deg2 = positions[position] * Math.PI / -180;
      this.iris.$iris.css("left", this.pos.x + Math.cos(deg2) * (this.width / 2 - this.iris.width / 2 - this.padding) + "px").css("top", this.pos.y + Math.sin(deg2) * (this.height / 2 - this.iris.height / 2 - this.padding) + "px");
    }
  };

  $.fn.xeyes = function(options) {
    options = $.extend(defaultOptions, options);
    var padding = parseInt(options.padding, 10);
    var $trigger = $(options.trigger);

    this.each(function(index, irisEl) {
      var $iris = $(irisEl),
      $eye = $iris.parent();

      var eye = new Eye($eye, $iris);
      eye.padding = padding;

      if (options.radius == 'circular' && eye.width > eye.height)
        eye.width = eye.height;
      else if (options.radius == 'circular')
        eye.height = eye.width;

      eye.setPosition(options.position);

      $trigger.mousemove(function(e) {
        eye.follow({ x: e.pageX, y: e.pageY });
      });

      if (options.reset) {
        $trigger.mouseleave(function(e) {
          eye.setPosition(options.position);
        });
      }
    });
  };
})(jQuery);

jQuery(".iris").xeyes();



//this is the countdown

//  $('#clock').countdown('2020/10/10', function(event) {   

//     var $this = $(this).html(event.strftime(''
//     '<span>%w</span> Weeks '
//     '<span>%d</span> Days '
//     '<span>%H</span> Hours '
//     '<span>%M</span> Mins '
//     '<span>%S</span> Secs'
//     ));
// });

// this is the header thing


// $(function(){
//   $('#header_nav').data('size','big');
// });

// $(window).scroll(function(){
//   if($(document).scrollTop() > 0)
// {
//     if($('#header_nav').data('size') == 'big')
//     {
//         $('#header_nav').data('size','small');
//         $('#header_nav').stop().animate({
//             height:'40px'
//         },600);
//     }
// }
// else
//   {
//     if($('#header_nav').data('size') == 'small')
//       {
//         $('#header_nav').data('size','big');
//         $('#header_nav').stop().animate({
//             height:'100px'
//         },600);
//       }  
//   }
// });



//this is the sliders

  $('.books').slick({
        prevArrow: $('.prev'),
        nextArrow: $('.next'),
  });




//something

$(function(){
  $('header').data('size','big');
});

$(window).scroll(function(){
  if($(document).scrollTop() > 0)
{
    if($('header').data('size') == 'big')
    {
        $('header').data('size','small');
        $('header').stop().animate({
            height:'180px'
        },200);
        $('.logo').css({
            'transform': 'scale(0.6,0.6)',
            'transform-origin':'top left'
        }); 
        $('#clock').css({
            'transform': 'scale(0.6,0.6)',
            'transform-origin':'top right'
        });
        $('.marquee').css('display', 'none');
        $('.navigation').css({
            'transform': 'scale(0.6,0.6)',
            'transform-origin':'top left'
        });

    }
}
else
  {
    if($('header').data('size') == 'small')
      {
        $('header').data('size','big');
        $('header').stop().animate({
            height:'380px'
        },200);
        $('.logo').css({
            'transform': 'scale(1,1)',
            'transform-origin':'top left'
        });
        $('#clock').css({
            'transform': 'scale(1,1)',
            'transform-origin':'top right'
        });
        $('.marquee').css({
            'display': 'inline',
            'padding-top': '20px'
          });
        $('.navigation').css({
            'transform': 'scale(1,1)',
            'transform-origin':'top left'
        });
      }  
  }
});


//merch


$('.swag-img').jrumble({
  x: 10,
  y: 10,
  rotation: 4
});

$('.swag-img').trigger('startRumble');
$('.swag-img').hover(function(){
  $(this).trigger('startRumble');
}, function(){
  $(this).trigger('stopRumble');
});
  

