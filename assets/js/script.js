const preloader = document.querySelector("[data-preloader]");

window.addEventListener("load", () => {
  preloader.classList.add("remove");
});

/**
 * add event on multiple elements
 */

const addEventOnElements = function (elements, eventType, callback) {
  for (let i = 0, len = elements.length; i < len; i++) {
    elements[i].addEventListener(eventType, callback);
  }
};


/**
 * Navbar toggler for mobile
 */

const navbar = document.querySelector("[data-navbar]");
const navTogglers = document.querySelectorAll("[data-nav-toggler]");
const overlay = document.querySelector("[data-overlay]");

const toggleNav = function () {
  navbar.classList.toggle("active");
  overlay.classList.toggle("active");
  document.body.classList.toggle("nav-active");
};

addEventOnElements(navTogglers, "click", toggleNav);

//
window.addEventListener("resize", function () {
  if (window.innerWidth >= 992) {
    navbar.classList.remove("active");
    overlay.classList.remove("active");
    document.body.classList.remove("nav-active");
  }
});

// HEADER
const header = document.querySelector("[data-header]");
window.addEventListener("scroll", function () {
  header.classList[this.window.scrollY > 100 ? "add" : "remove"]("active");
});



const thumbnailsSwiper = new Swiper(".home_thumbnails", {
  slidesPerView: 2.5,
  spaceBetween: 20,
  loop: true,
  effect: "carousel",
  allowTouchMove: true,
  autoplay: {
    delay: 5000,
    disableOnInteraction: false,
  },
  breakpoints: {
    0: { slidesPerView: 1.5 },
    800: { slidesPerView: 1.8 },
    940: { slidesPerView: 2.2 },
    1000: { slidesPerView: 2.4 },
    1100: { slidesPerView: 2.5 },
    1200: { slidesPerView: 2.8 },
    1300: { slidesPerView: 3.1 },
    1380: { slidesPerView: 3.5 },
  },
});

thumbnailsSwiper.on("slideChange", () => {
  let realIndex = thumbnailsSwiper.realIndex,
    prevRealIndex = thumbnailsSwiper.previousRealIndex;
  document
    .querySelectorAll(".home_slide")
    [prevRealIndex].classList.remove("active");
  document.querySelectorAll(".home_slide")[realIndex].classList.add("active");
});


const selectDepartureBox = document.querySelector(".home_cont-departure");
const selectDepartureOption = document.querySelector(".select-departure-option");
const soValueDeparture = document.querySelector("#soValueDeparture");
const optionSearchDeparture = document.querySelector("#optionSearchDeparture");
const departureOptions = document.querySelector(".departure-options");
const departureOptionsList = document.querySelectorAll(".departure-options li");
selectDepartureOption.addEventListener("click", function () {
  selectDepartureBox.classList.toggle("active");
});

departureOptionsList.forEach(function (departureOptionsListSingle) {
  departureOptionsListSingle.addEventListener("click", function () {
    var text = this.textContent;
    soValueDeparture.value = text;
    selectDepartureBox.classList.remove("active");
  });
});

optionSearchDeparture.addEventListener("keyup", function () {
  var filter, li, i, textValue, liCount;
  filter = optionSearchDeparture.value.toUpperCase();
  li = departureOptions.getElementsByTagName("li");
  for (i = 0; i < li.length; i++) {
    liCount = li[i];
    textValue = liCount.textContent || liCount.innerText;
    if (textValue.toUpperCase().indexOf(filter) > -1) {
      li[i].style.display = "";
    } else {
      li[i].style.display = "none";
    }
  }
});

const selectDestinationBox = document.querySelector(".home_cont-destination");
const selectDestinationOption = document.querySelector(
  ".select-destination-option"
);
const soValueDestination = document.querySelector("#soValueDestination");
const optionSearchDestination = document.querySelector(
  "#optionSearchDestination"
);
const destinationOptions = document.querySelector(".destination-options");
const destinationOptionsList = document.querySelectorAll(
  ".destination-options li"
);
selectDestinationOption.addEventListener("click", function () {
  selectDestinationBox.classList.toggle("active");
});

destinationOptionsList.forEach(function (destinationOptionsListSingle) {
  destinationOptionsListSingle.addEventListener("click", function () {
    var text = this.textContent;
    soValueDestination.value = text;
    selectDestinationBox.classList.remove("active");
  });
});

optionSearchDestination.addEventListener("keyup", function () {
  var filter, li, i, textValue, liCount;
  filter = optionSearchDestination.value.toUpperCase();
  li = destinationOptions.getElementsByTagName("li");
  for (i = 0; i < li.length; i++) {
    liCount = li[i];
    textValue = liCount.textContent || liCount.innerText;
    if (textValue.toUpperCase().indexOf(filter) > -1) {
      li[i].style.display = "";
    } else {
      li[i].style.display = "none";
    }
  }
});



// JS FOR DATE OF CALENDAR
const inputElement = document.getElementById("soValueDate");
const today = new Date();
const formattedDate = today.toLocaleDateString("vi-VN");
inputElement.placeholder = formattedDate;
// END JS FOR DATE OF CALENDAR
