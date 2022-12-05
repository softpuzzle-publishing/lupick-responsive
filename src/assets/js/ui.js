var html = document.querySelector("html");
var body = document.querySelector("body");

var Init = {
  defaults: function () {
    this.resize();
    window.addEventListener("resize", this.resize);
  },
  resize: function () {
    Init.getBrowserSize();
    Init.drawBreakPoint();

    Init.breakpoint = window.matchMedia("(min-width:992px)").matches;
    if (!Init.breakpoint) {
      html.classList.remove("is-desktop");
      html.classList.add("is-mobile");
    } else {
      html.classList.remove("is-mobile");
      html.classList.add("is-desktop");
    }
  },
  getBrowserSize: function () {
    this.bodyHeight = Math.max(document.body.scrollHeight, document.body.offsetHeight, document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight);
    this.bodyWidth = Math.max(document.body.scrollWidth, document.body.offsetWidth, document.documentElement.clientWidth, document.documentElement.scrollWidth, document.documentElement.offsetWidth);
  },
  drawBreakPoint: function () {
    html.setAttribute("data-width", this.bodyWidth);
    html.setAttribute("data-height", this.bodyHeight);
  },
};

var Common = {
  init: function () {
    this.accordion();
    this.select();
    this.byte();
    this.address();
    this.moreToggle();
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
      } else if ($(this).hasClass("static")) {
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
  address: function () {
    /* 직접입력 */
    $(".form-select").selectmenu({
      change: function (event, ui) {
        if ($(this).val() == "직접 입력") {
          $(this).siblings(".textarea").removeClass("visually-hidden");
        } else {
          $(this).siblings(".textarea").addClass("visually-hidden");
        }
      },
    });
  },
  moreToggle: function () {
    $(".toggle-view-detail > a").on("click", function (e) {
      e.preventDefault();
      if ($(this).hasClass("active")) {
        $(this).removeClass("active");
        $(this).text("자세히 보기");
      } else {
        $(this).addClass("active");
        $(this).text("간략히 보기");
      }
    });
  },
};

var Header = {
  init: function () {
    this.scrolling();
    window.addEventListener("mousewheel", Header.scrolling);
    window.addEventListener("touchmove", Header.scrolling);
    $(window).scroll(function () {
      Header.scrolling();
      Header.fixedOption();
    });
    $(window).resize(function () {
      Header.scrolling();
    });
    const optionOffsetTop = $(".layout-event-top-right .event-price-info");
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
  fixedOption: function () {
    //var
  },
};

$(function () {
  Init.defaults();
  Header.init();
  Common.init();
});
