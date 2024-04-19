const preloader = document.querySelector("[data-preloader]");

window.addEventListener("load", () => {
  preloader.classList.add("remove");
});

const addEventOnElements = function (elements, eventType, callback) {
  for (let i = 0, len = elements.length; i < len; i++) {
    elements[i].addEventListener(eventType, callback);
  }
};

// NAVBAR TOGGLER FOR MOBILE
const navbar = document.querySelector("[data-navbar]");
const navTogglers = document.querySelectorAll("[data-nav-toggler]");
const overlay = document.querySelector("[data-overlay]");

const toggleNav = function () {
  navbar.classList.toggle("active");
  overlay.classList.toggle("active");
  document.body.classList.toggle("nav-active");
};

addEventOnElements(navTogglers, "click", toggleNav);

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
  header.classList[this.window.scrollY > 0 ? "add" : "remove"]("active");
});

// SWIPER
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

const homeContDeparture = document.querySelector(".home_cont-departure");
const selectDepartureOption = document.querySelector(
  ".select-departure-option"
);
const soValueDeparture = document.querySelector("#soValueDeparture");
const departureContent = document.querySelector(".departure-content");
const optionSearchDeparture = document.querySelector("#optionSearchDeparture");
const departureOptions = document.querySelector(".departure-options");
const departureOptionsList = document.querySelectorAll(".departure-options li");

const homeContDestination = document.querySelector(".home_cont-destination");
const selectDestinationOption = document.querySelector(
  ".select-destination-option"
);
const soValueDestination = document.querySelector("#soValueDestination");
const destinationContent = document.querySelector(".destination-content");
const optionSearchDestination = document.querySelector(
  "#optionSearchDestination"
);
const destinationOptions = document.querySelector(".destination-options");
const destinationOptionsList = document.querySelectorAll(
  ".destination-options li"
);

selectDepartureOption.addEventListener("click", function () {
  homeContDeparture.classList.toggle("active");
});

selectDestinationOption.addEventListener("click", function () {
  homeContDestination.classList.toggle("active");
});

document.addEventListener("click", removeActiveContDeparture);
function removeActiveContDeparture(event) {
  if (
    !departureContent.contains(event.target) &&
    !soValueDeparture.contains(event.target)
  ) {
    homeContDeparture.classList.remove("active");
  }
}

document.addEventListener("click", removeActiveContDestination);
function removeActiveContDestination(event) {
  if (
    !destinationContent.contains(event.target) &&
    !soValueDestination.contains(event.target)
  ) {
    homeContDestination.classList.remove("active");
  }
}

departureOptionsList.forEach(function (departureOptionsListSingle) {
  departureOptionsListSingle.addEventListener("click", function () {
    var text = this.textContent;
    soValueDeparture.value = text;
    homeContDeparture.classList.remove("active");
  });
});

destinationOptionsList.forEach(function (destinationOptionsListSingle) {
  destinationOptionsListSingle.addEventListener("click", function () {
    var text = this.textContent;
    soValueDestination.value = text;
    homeContDestination.classList.remove("active");
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
