var Common = {
  init: function () {
    this.accordion();
    this.select();
    this.byte();
  },
  accordion: function () {
    $(".accordion .item-header").on("click", function (e) {
      e.preventDefault();
      $(this).toggleClass("expanded");
      $(this).siblings().collapse("toggle");
    });
  },
  select: function () {
    /* select */
    $(".form-select").each(function () {
      if ($(this).hasClass("text-style")) {
        $(this)
          .selectmenu({
            position: { my: "right top", at: "right bottom" },
          })
          .selectmenu("menuWidget")
          .addClass("text-style");
      } else if ($(this).next().hasClass(".form-select-zone")) {
        var zone = $(this).next(".form-select-zone");
        $(this).selectmenu({
          // appenTo 선택 엘리먼트에 셀렉트박스 넣음
          appendTo: zone,
        });
      } else {
        $(this).selectmenu({});
      }
    });
  },
  byte: function () {
    /* byte check */
    $("textarea, input").on("input", function (e) {
      console.log(e);
      if ($(this).attr("maxlength") !== "") {
        var maxlength = $(this).attr("maxlength");
        var content = $(this).val();

        $(this).siblings(".byte").find("span").text(content.length);

        if (content.length > maxlength) {
          $(this).val(content.substring(0, maxlength));
        }
      }
    });
    $("textarea")
      .on("focus", function () {
        $(this).closest(".textarea").addClass("active");
      })
      .on("blur", function () {
        $(this).closest(".textarea").removeClass("active");
      });
  },
};

var html = document.querySelector("html");
var body = document.querySelector("body");
var Header = {
  init: function () {
    this.scrolling();
    window.addEventListener("mousewheel", Header.scrolling);
    window.addEventListener("touchmove", Header.scrolling);
    $(window).scroll(function () {
      Header.scrolling();
    });
    $(window).resize(function () {
      Header.scrolling();
    });
  },
  scrolling: function (e) {
    var doc = document.documentElement;
    var w = window;
    var prevScroll = w.scrollY || doc.scrollTop;
    var curScroll;
    var direction = 0;
    var prevDirection = 0;

    var checkScroll = function () {
      /*
       ** Find the direction of scroll
       ** 0 - initial, 1 - up, 2 - down
       */
      curScroll = w.scrollY || doc.scrollTop;
      if (curScroll > prevScroll) {
        //scrolled up
        direction = 2;
      } else if (curScroll < prevScroll) {
        //scrolled down
        direction = 1;
      }

      if (direction !== prevDirection) {
        scrollDirection(direction, curScroll);
      }

      prevScroll = curScroll;
    };

    var scrollDirection = function (direction, curScroll) {
      if (direction === 2 && curScroll > 25) {
        //replace 52 with the height of your header in px
        html.classList.add("scroll-down");
        prevDirection = direction;
      } else if (direction === 1) {
        html.classList.remove("scroll-down");
        prevDirection = direction;
      }
    };

    window.addEventListener("scroll", checkScroll);
  },
};

$(function () {
  Header.init();
  Common.init();
});
