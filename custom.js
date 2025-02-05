(function ($) {
  "use strict";

  
  $('.navbar-collapse a').on('click', function () {
      $(".navbar-collapse").collapse('hide');
  });

  
  $('.smoothscroll').click(function () {
      var el = $(this).attr('href');
      var elWrapped = $(el);
      var header_height = $('.navbar').height();

      scrollToDiv(elWrapped, header_height);
      return false;

      function scrollToDiv(element, navheight) {
          var offset = element.offset();
          var offsetTop = offset.top;
          var totalScroll = offsetTop - navheight;

          $('body,html').animate({
              scrollTop: totalScroll
          }, 300);
      }
  });

  
  $(window).on('scroll', function () {
      function isScrollIntoView(elem) {
          var docViewTop = $(window).scrollTop();
          var docViewBottom = docViewTop + $(window).height();
          var elemTop = $(elem).offset().top;
          var elemBottom = elemTop + $(window).height() * 0.5;

          if (elemBottom <= docViewBottom && elemTop >= docViewTop) {
              $(elem).addClass('active');
          } else {
              $(elem).removeClass('active');
          }

          var MainTimelineContainer = $('#vertical-scrollable-timeline')[0];
          var MainTimelineContainerBottom = MainTimelineContainer.getBoundingClientRect().bottom - $(window).height() * 0.5;
          $(MainTimelineContainer).find('.inner').css('height', MainTimelineContainerBottom + 'px');
      }

      var timeline = $('#vertical-scrollable-timeline li');
      Array.from(timeline).forEach(isScrollIntoView);
  });

})(window.jQuery);


window.onscroll = function () {
  scrollFunction();
};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
      document.getElementById("scrollToTopBtn").style.display = "block";
  } else {
      document.getElementById("scrollToTopBtn").style.display = "none";
  }
}

function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}


document.addEventListener("DOMContentLoaded", function () {
  const logoutBtn = document.getElementById("logoutBtn");
  const authElements = document.getElementsByClassName("authcomp");

  
  if (localStorage.getItem("authToken")) {
      console.log("User is logged in");

      
      logoutBtn.style.display = "block";

      
      Array.from(authElements).forEach(element => {
          element.style.display = "none";
      });
  } else {
      console.log("User is not logged in");
  }

  
  logoutBtn.addEventListener("click", function (event) {
      event.preventDefault(); 

      
      localStorage.removeItem("authToken");
      sessionStorage.removeItem("authToken");

      
      window.location.href = "index.html"; 
  });
});
