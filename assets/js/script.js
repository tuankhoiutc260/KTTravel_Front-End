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

const contDeparture = document.querySelector(".cont-departure");
const selectDepartureOption = document.querySelector(
  ".select-departure-option"
);
const soValueDeparture = document.querySelector("#soValueDeparture");
const departureContent = document.querySelector(".departure-content");
const optionSearchDeparture = document.querySelector("#optionSearchDeparture");
const departureOptions = document.querySelector(".departure-options");
const departureOptionsList = document.querySelectorAll(".departure-options li");

const contDestination = document.querySelector(".cont-destination");
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
  contDeparture.classList.toggle("active");
  const rect = departureContent.getBoundingClientRect();
  const bottomPosition = rect.bottom + window.scrollY;
  const windowHeight = window.innerHeight;
  const adjustedScrollPosition = bottomPosition - windowHeight + 10;
  window.scrollTo({
    top: adjustedScrollPosition,
    behavior: "smooth",
  });
});

selectDestinationOption.addEventListener("click", function () {
  contDestination.classList.toggle("active");
  const rect = destinationContent.getBoundingClientRect();
  const bottomPosition = rect.bottom + window.scrollY;
  const windowHeight = window.innerHeight;
  const adjustedScrollPosition = bottomPosition - windowHeight + 10;
  window.scrollTo({
    top: adjustedScrollPosition,
    behavior: "smooth",
  });
});

document.addEventListener("click", removeActiveContDeparture);
function removeActiveContDeparture(event) {
  if (
    !departureContent.contains(event.target) &&
    !soValueDeparture.contains(event.target)
  ) {
    contDeparture.classList.remove("active");
  }
}

document.addEventListener("click", removeActiveContDestination);
function removeActiveContDestination(event) {
  if (
    !destinationContent.contains(event.target) &&
    !soValueDestination.contains(event.target)
  ) {
    contDestination.classList.remove("active");
  }
}

departureOptionsList.forEach(function (departureOptionsListSingle) {
  departureOptionsListSingle.addEventListener("click", function () {
    var text = this.textContent;
    soValueDeparture.textContent = text;
    contDeparture.classList.remove("active");
  });
});

destinationOptionsList.forEach(function (destinationOptionsListSingle) {
  destinationOptionsListSingle.addEventListener("click", function () {
    var text = this.textContent;
    soValueDestination.textContent = text;
    contDestination.classList.remove("active");
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

const btnSearchTour = document.querySelector(".btn-search-tour");
let currentPage = window.location.pathname.split("/").pop(); // Change this to the actual current page

const sectionBooking = document.querySelector(".section-booking");
console.log(currentPage);
(function () {
  // if (currentPage === "index.html") {
  const viewportHeight = window.innerHeight;
  console.log(window.innerHeight);
  const btnSearchTourHeight = (viewportHeight / 10) * 0.7;
  btnSearchTour.style.height = `${btnSearchTourHeight}px`;

  const sectionBookingHeight = sectionBooking.offsetHeight;

  sectionBooking.style.height = sectionBookingHeight + 20 + "px";
  console.log("sectionBookingHeight: " + sectionBookingHeight);
  // }
})();

// selectDepartureOption.addEventListener("click", function () {
//   const rect = departureContent.getBoundingClientRect();
//   const bottomPosition = rect.bottom + window.scrollY;
//   const windowHeight = window.innerHeight;
//   const adjustedScrollPosition = bottomPosition - windowHeight + 10;
//   window.scrollTo({
//       top: adjustedScrollPosition,
//       behavior: 'smooth'
//   });
// });

window.addEventListener("DOMContentLoaded", function () {
  const imgCover = document.querySelectorAll(".img-cover");
  function setHeight() {
    imgCover.forEach(function (imgCover) {
      imgCover.style.height = imgCover.width * 0.6 + "px";
    });
  }

  setHeight();
  window.addEventListener("resize", setHeight);
});

const btnFilter = document.querySelector(".btn-filter");
const filterTours = document.querySelector(".filter-tours");
btnFilter.addEventListener("click", function () {
  filterTours.classList.toggle("active");
});

document.addEventListener("DOMContentLoaded", function () {
  const slider = document.querySelector("#slider");
  const endValueRange = document.querySelector(".end-value-range");
  slider.oninput = function () {
    endValueRange.value = this.value.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    var value = ((this.value - this.min) / (this.max - this.min)) * 100;
    this.style.background =
      "linear-gradient(to right, var(--color-main) 0%, var(--color-main) " +
      value +
      "%, #fff " +
      value +
      "%, white 100%)";
  };

  slider.style.background =
    "linear-gradient(to right, var(--color-main) 0%, var(--color-main) " +
    0 +
    "%, #fff " +
    0 +
    "%, white 100%)";
  var max = parseInt(endValueRange.getAttribute("max"));
  endValueRange.onkeyup = function () {
    var removeChar = this.value.replace(/[^0-9\.]/g, "");
    console.log("remove char: " + removeChar);
    removeChar = removeChar.replace(/^0+(?=\d)/, "");
    var removeDot = removeChar.replace(/\./g, "");
    this.value = removeDot;
    console.log(formattedNumber);
    if (this.value > max)
      this.value = this.value.substring(0, this.value.length - 1);
    var formattedNumber = this.value.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    slider.value = this.value;
    this.value = formattedNumber;
  };
});

document.addEventListener("DOMContentLoaded", function () {
  const btnDuration = document.querySelectorAll(".btn-duration");
  const btnNumOfPeople = document.querySelectorAll(".btn-num-of-people");
  btnDuration.forEach((button) => {
    button.addEventListener("click", function () {
      // Remove active class from all buttons
      btnDuration.forEach((btn) => {
        btn.classList.remove("active");
      });

      this.classList.add("active");
    });
  });

  btnNumOfPeople.forEach((button) => {
    button.addEventListener("click", function () {
      // Remove active class from all buttons
      btnNumOfPeople.forEach((btn) => {
        btn.classList.remove("active");
      });

      this.classList.add("active");
    });
  });

  const btnCloseContFilter = document.querySelector(".btn-close-cont-filter");
  btnCloseContFilter.addEventListener("click", function () {
    filterTours.classList.remove("active");
  });
});
