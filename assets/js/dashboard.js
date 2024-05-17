window.addEventListener("DOMContentLoaded", function () {
  iconProgressBar.style.left = -iconProgressBarWidth / 2 + "px";
  countChar100(inputTourName, tourNameCharCount);
  // countChar100(inputTourScheduleTitle, tourScheduleTitleCharCount);
  countChar250(inputTourDescription, tourDescriptionCharCount);

  allInputPrice.forEach((inputPrice) => {
    formatPrice(inputPrice);
  });
});

function formatPrice(element) {
  var max = parseInt(element.getAttribute("max"));
  element.onkeyup = function () {
    var removeChar = this.value.replace(/[^0-9\.]/g, "");
    removeChar = removeChar.replace(/^0+(?=\d)/, "");
    var removeDot = removeChar.replace(/\./g, "");
    this.value = removeDot;
    if (this.value > max)
      this.value = this.value.substring(0, this.value.length - 1);
    var formattedNumber = this.value.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    this.value = formattedNumber;
  };
}

const subContAddNewTour = document.querySelector(".sub-cont-add-new-tour");
const allInputPrice = document.querySelectorAll(".input-price");

const toggle = document.querySelector(".toggle");
const navigation = document.querySelector(".navigation");
const titles = document.querySelectorAll(".title");
const btnFunction = document.querySelectorAll(".navigation > ul > li");
const contFunction = document.querySelector(".navigation ul");

const liNavigation = document.querySelector(".navigation li");
const iconBtn = document.querySelector(".navigation .icon-btn");
const liNavigationActive = document.querySelector(".navigation.active ul li");

toggle.addEventListener("click", function () {
  toggle.classList.toggle("active");
  navigation.classList.toggle("active");
  titles.forEach((title) => {
    title.classList.toggle("active");
  });
  // Resize li navigation
  const iconSize = iconBtn.width;
  const paddingLiNavigation = liNavigation.padding;
  liNavigationActive.style.width = iconSize + paddingLiNavigation;
});

btnFunction.forEach((btn) => {
  btn.addEventListener("click", function () {
    btnFunction.forEach((otherBtn) => {
      otherBtn.classList.remove("active");
    });
    btn.classList.toggle("active");
  });
});

const iconProgressBar = document.getElementById("icon-progress-bar");
const iconProgressBarWidth = parseFloat(
  window.getComputedStyle(iconProgressBar).getPropertyValue("width")
);

const contNumbs = document.querySelectorAll(".cont-numb");
const btnNextProgress = document.getElementById("btn-next-progress");

const contProgress = document.querySelector(".cont-progress");
const subContSuccessProgressBar = document.querySelector(
  ".sub-cont-success-progress-bar"
);
const contProgressWidth = parseFloat(
  window.getComputedStyle(contProgress).getPropertyValue("width")
);

const contMainSubProgressActiveAfters = document.querySelectorAll(
  ".cont-main-sub-progress.active::after"
);
const sub2ContInfNewTour = document.querySelector(".sub-2-cont-inf-new-tour");
const inputTourName = document.getElementById("input-tour-name");
const tourNameCharCount = document.querySelector(".tour-name-char-count");
const inputTourDescription = document.getElementById("input-tour-description");
const tourDescriptionCharCount = document.querySelector(
  ".tour-description-char-count"
);
const inputTourScheduleTitle = document.getElementById(
  "input-tour-schedule-title"
);
const tourScheduleTitleCharCount = document.querySelector(
  ".tour-schedule-title-char-count"
);
const allSubContInfNewTour = document.querySelectorAll(
  ".sub-cont-inf-new-tour"
);

const textareas = document.querySelectorAll("textarea");

textareas.forEach((textarea) => {
  textarea.addEventListener("keyup", (e) => {
    textarea.style.height = "50px";
    let scHeigth = e.target.scrollHeight;
    textarea.style.height = `${scHeigth}px`;
  });
});
const progressBarsText = document.querySelectorAll(
  ".cont-add-new-tour .sub-cont-progress span"
);

function checkContainerOverview() {
  let isValid = true;
  if (inputTourName.value.trim() === "") {
    inputTourName.style.borderColor = "red";
    isValid = false;
  } else {
    inputTourName.style.borderColor = ""; 
  }
  if (inputTourDescription.value.trim() === "") {
    inputTourDescription.style.borderColor = "red";
    isValid = false;
  } else {
    inputTourDescription.style.borderColor = "";
  }
  return isValid;
}

function checkContainerDetails() {
  let isValid = true;
  if (inputDepartureDate.value.trim() === "") {
    inputDepartureDate.style.borderColor = "red";
    isValid = false;
  } else {
    inputDepartureDate.style.borderColor = ""; 
  }
  if (inputDestinationDate.value.trim() === "") {
    inputDestinationDate.style.borderColor = "red";
    isValid = false;
  } else {
    inputDestinationDate.style.borderColor = ""; 
  }
  if (inputPositionDeparture.value.trim() === "") {
    inputPositionDeparture.style.borderColor = "red";
    isValid = false;
  } else {
    inputPositionDeparture.style.borderColor = ""; 
  }
  if (inputPositionDestination.value.trim() === "") {
    inputPositionDestination.style.borderColor = "red";
    isValid = false;
  } else {
    inputPositionDestination.style.borderColor = ""; 
  }
  return isValid;
}



let currentActiveIndex = 0;

btnNextProgress.addEventListener("click", function () {
  let lastActiveIndex = -1;
  const currentProgressBarWidth = subContSuccessProgressBar.offsetWidth;
  const newProgressBarWidth = currentProgressBarWidth + contProgressWidth * 0.2;
  const currentIconProgressBarLeft = parseFloat(
    window.getComputedStyle(iconProgressBar).getPropertyValue("left")
  );
  const newIconProgressBarLeft =
    currentIconProgressBarLeft + contProgressWidth * 0.2;
  function updateProgressAndNavigation() {
    contNumbs.forEach((contNumb, index) => {
      if (
        contNumb.closest(".cont-main-sub-progress").classList.contains("active")
      ) {
        lastActiveIndex = index;
      }
    });
    if (lastActiveIndex + 1 < contNumbs.length) {
      contNumbs[lastActiveIndex + 1]
        .closest(".cont-main-sub-progress")
        .classList.add("active");
      iconProgressBar.style.left = newIconProgressBarLeft + "px";
      subContSuccessProgressBar.style.width = newProgressBarWidth + "px";
      progressBarsText[lastActiveIndex + 1].textContent = "";
      progressBarsText[lastActiveIndex].innerHTML =
        '<span class="material-symbols-outlined">done</span>';
      allSubContInfNewTour[lastActiveIndex].classList.remove("active");
      allSubContInfNewTour[lastActiveIndex + 1].classList.add("active");
      currentActiveIndex++;
      console.log("Updated currentActiveIndex: ", currentActiveIndex);
    }
  }
  console.log("Before switch, currentActiveIndex: ", currentActiveIndex);

  switch (currentActiveIndex) {
    case 0:
      if (checkContainerOverview()) {
        updateProgressAndNavigation();
      }
      console.log("Finish case 0, currentActiveIndex: ", currentActiveIndex);
      break;
    case 1:
      if (checkContainerDetails()) {
        updateProgressAndNavigation();
      }
      console.log("Finish case 1, currentActiveIndex: ", currentActiveIndex);
      break;
    default:
      
  }
  if (currentActiveIndex == 1) {
    sub2ContInfNewTour.style.overflowX = "visible";
  } else {
    sub2ContInfNewTour.style.overflowX = "hidden";
  }
 if (lastActiveIndex == 1) {
    var departureDateParts = inputDepartureDate.value.split("/");
    var destinationDateParts = inputDestinationDate.value.split("/");
    departureDate = new Date(departureDateParts[2], departureDateParts[1] - 1, departureDateParts[0]);
    destinationDate = new Date(destinationDateParts[2], destinationDateParts[1] - 1, destinationDateParts[0]);
    var timeDifference = destinationDate - departureDate;
    var dayDifference = timeDifference / (1000 * 60 * 60 * 24) + 1;

    if (dayCount < dayDifference) {
      for (let i = 0; i < dayDifference; i++) {
        addSchedule(i); // Add schedules for the new days
      }
    }

    if (dayCount > dayDifference) {
      removeAllSchedules(); // Remove existing schedules
      for (let i = 0; i < dayDifference; i++) {
        addSchedule(i); // Re-add schedules based on new day count
      }
    }

  }

});

let dayCount = 0;
let departureDate; // Declare departureDate at a higher scope
let destinationDate; // Declare destinationDate at a higher scope

function addSchedule(dayIndex) {
  dayCount++;
  const container = document.getElementById("cont-tour-schedule");
  const scheduleDate = new Date(departureDate);
  scheduleDate.setDate(departureDate.getDate() + dayIndex); // Calculate the date for the current dayIndex

  // Format the schedule date to the desired format (dd/mm/yyyy)
  const formattedDate = scheduleDate.toLocaleDateString("vi-VN");

  const newSchedule = document.createElement("div");
  newSchedule.className = "cont-date-schedule";
  newSchedule.innerHTML = `
                <div id="cont-tour-schedule-title" class="cont-inf-field">
                    <span style="font-weight: bold; font-size: 1.5rem; text-align: center;">Day ${dayCount} - ${formattedDate}</span>
                    <label for="input-tour-schedule-title" class="title-field">Title Schedule <span>(required)</span></label>
                    <input type="text" id="input-tour-schedule-title" class="input-field" placeholder="e.g: Khám phá Thác Datanla và Đồi Cỏ xanh..." maxlength="100" required oninput="countChar100(this, document.querySelector('.tour-schedule-title-char-count'))">
                    <span class="tour-schedule-title-char-count char-count">0/100</span>
                </div>
                <div class="cont-schedule-content cont-inf-field">
                    <label for="input-tour-description-schedule" class="title-field">Description Schedule <span>(required)</span></label>
                    <div class="sub-cont-schedule-content input-field">
                        <div style="border: none;" id="input-tour-description-schedule" class="input-field" contenteditable="true"></div>
                        <div class="cont-tool-editor">
                            <a class="btn btn-tertiary" href="#" onclick="document.execCommand('bold', true, '')"><strong>B</strong></a>
                            <a class="btn btn-tertiary" href="#" onclick="document.execCommand('italic', true, '')"><em>I</em></a>
                            <a class="btn btn-tertiary" href="#" onclick="document.execCommand('underline', true, '')"><u>U</u></a>
                        </div>
                    </div>
                </div>
            `;
  container.appendChild(newSchedule);
}

function removeAllSchedules() {
  const container = document.getElementById("cont-tour-schedule");
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }
  dayCount = 0; // Reset dayCount
}

contNumbs.forEach((contNumb, index) => {
  contNumb.addEventListener("click", function () {
    if (
      contNumb.closest(".cont-main-sub-progress").classList.contains("active")
    ) {
      for (let i = index + 1; i < contNumbs.length; i++) {
        contNumbs[i]
          .closest(".cont-main-sub-progress")
          .classList.remove("active");
        progressBarsText[i - 1].innerHTML = "";
      }

      const activeCount = index;
      if (activeCount == 1) {
        sub2ContInfNewTour.style.overflowX = "visible";
      }

      if (activeCount != 1) {
        sub2ContInfNewTour.style.overflowX = "hidden";
      }
      const newProgressBarWidth =
        contProgressWidth * ((activeCount * 20) / 100);
      subContSuccessProgressBar.style.width = newProgressBarWidth + "px";
      iconProgressBar.style.left =
        -iconProgressBarWidth / 2 + newProgressBarWidth + "px";

      for (let i = contNumbs.length; i > activeCount + 1; i--) {
        progressBarsText[i - 1].textContent = i;
        allSubContInfNewTour[i - 1].classList.remove("active");
      }

      allSubContInfNewTour[index].classList.add("active");
      currentActiveIndex = index;
    }
  });
});

function countChar100(element, spanElement) {
  let elementCountCharNumb = element.value.trim().length;
  spanElement.textContent = elementCountCharNumb + "/100";
}

function countChar250(element, spanElement) {
  let elementCountCharNumb = element.value.trim().length;
  spanElement.textContent = elementCountCharNumb + "/250";
}

function countCharTourDescription() {
  let inputTourDescriptionVariable = inputTourDescription.value.trim();
  let inputTourDescriptionCharCountVariable =
    inputTourDescriptionVariable.length;
  tourDescriptionCharCount.textContent =
    inputTourDescriptionCharCountVariable + "/250";
}

// inputTourDescription.addEventListener("input", function () {
//   countCharTourDescription();
// });

const btnCloseContAddNewTour = document.getElementById(
  "btn-close-cont-add-new-tour"
);
const contAddNewTour = document.querySelector(".cont-add-new-tour");
const btnAddNewTour = document.getElementById("btn-add-new-tour");
btnCloseContAddNewTour.addEventListener("click", function () {
  contAddNewTour.classList.toggle("active");
});

btnAddNewTour.addEventListener("click", function () {
  contAddNewTour.classList.toggle("active");
});
// Calendar
const isLeapYear = (year) => {
  return (
    (year % 4 === 0 && year % 100 !== 0 && year % 400 !== 0) ||
    (year % 100 === 0 && year % 400 === 0)
  );
};

const getFebDays = (year) => {
  return isLeapYear(year) ? 29 : 28;
};

const monthName = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const contDepartureCalendar = document.getElementById(
  "cont-departure-calendar"
);
const contDestinationCalendar = document.getElementById(
  "cont-destination-calendar"
);

const contDepartureCalendarMonth = document.querySelector(
  ".cont-departure-calendar-month"
);
const contDestinationCalendarMonth = document.querySelector(
  ".cont-destination-calendar-month"
);

const monthDeparturePicker = document.getElementById("month-departure-picker");
const monthDestinationPicker = document.getElementById(
  "month-destination-picker"
);

const departureMonthList = contDepartureCalendar.querySelector(
  "#departure-month-list"
);
const destinationMonthList = contDestinationCalendar.querySelector(
  "#destination-month-list"
);
// const dateInformation = document.querySelector(".date-information");

// Current month and year
let currentDepartureDate = new Date();
let currentDestinationDate = new Date();
let currentDepartureMonth = { value: currentDepartureDate.getMonth() };
let currentDestinationMonth = { value: currentDestinationDate.getMonth() };
let currentDepartureYear = { value: currentDepartureDate.getFullYear() };
let currentDestinationYear = { value: currentDestinationDate.getFullYear() };

// Generate the calendar for a specific month and year
const generateDepartureCalendar = (departureMonth, departureYear) => {
  let departureCalendarDays = document.querySelector(
    ".departure-calendar-days"
  );
  departureCalendarDays.innerHTML = "";
  let departureCalendarHeaderYear = document.getElementById("departure-year");

  let departureDaysOfMonth = [
    31,
    getFebDays(departureYear),
    31,
    30,
    31,
    30,
    31,
    31,
    30,
    31,
    30,
    31,
  ];

  monthDeparturePicker.innerHTML = monthName[departureMonth];
  departureCalendarHeaderYear.innerHTML = departureYear;
  let departureFirstDay = new Date(departureYear, departureMonth);
  for (
    let i = 0;
    i <= departureDaysOfMonth[departureMonth] + departureFirstDay.getDay() - 1;
    i++
  ) {
    let departureDay = document.createElement("div");
    if (i >= departureFirstDay.getDay()) {
      departureDay.innerHTML = i - departureFirstDay.getDay() + 1;
      // Highlight the current date
      if (
        i - departureFirstDay.getDay() + 1 === currentDepartureDate.getDate() &&
        departureYear === currentDepartureDate.getFullYear() &&
        departureMonth === currentDepartureDate.getMonth()
      ) {
        departureDay.classList.add("current-date");
      }
    }
    // Add day element to the calendar
    departureCalendarDays.appendChild(departureDay);
  }
  // Attach event listeners to the day elements
  attachEventListenersDepartureToDays();
};

const attachEventListenersDepartureToDays = () => {
  const departureDayElements = document.querySelectorAll(
    ".departure-calendar-days > div"
  );
  const departureToday = new Date();

  departureDayElements.forEach((departureDayElement) => {
    const departureDay = parseInt(departureDayElement.innerHTML);
    if (isNaN(departureDay)) return;
    const departureMonth = currentDepartureMonth.value;
    const departureYear = currentDepartureYear.value;
    const departureDate = new Date(departureYear, departureMonth, departureDay);
    if (departureDate < departureToday) {
      departureDayElement.classList.add("past-day");
    }
    departureDayElement.addEventListener("click", () => {
      if (departureDate < departureToday) {
        return;
      }
      selectDepartureDay(departureDayElement, departureDate);
    });
  });
};

const selectDepartureDay = (departureDayElement, departureDate) => {
  const previousSelectedDepartureDay = document.querySelector(
    ".departure-calendar-days .selected-day"
  );
  if (previousSelectedDepartureDay) {
    previousSelectedDepartureDay.classList.remove("selected-day");
  }

  departureDayElement.classList.add("selected-day");
  displayDepartureDateInfo(departureDate);
  hideDepartureCalendar();
};

const inputDepartureDate = document.getElementById("input-departure-date");
const displayDepartureDateInfo = (departureDate) => {
  const formattedDepartureDate = departureDate.toLocaleDateString("vi-VN");
  inputDepartureDate.value = formattedDepartureDate;
  inputDepartureDate.style.borderColor = ""
};

function hideDepartureCalendar() {
  contDepartureCalendar.classList.remove("active");
}

function showDepartureCalendar() {
  contDepartureCalendar.classList.toggle("active");
}

inputDepartureDate.addEventListener("click", function () {
  showDepartureCalendar();
});

monthDeparturePicker.onclick = () => {
  contDepartureCalendarMonth.classList.remove("hide");
  contDepartureCalendarMonth.classList.add("show");
};

monthName.forEach((e, index) => {
  let departureMonth = document.createElement("div");
  departureMonth.innerHTML = `<div>${e}</div>`;
  if (index === currentDepartureMonth.value) {
    departureMonth.classList.add("current-departure-month");
  }
  departureMonthList.append(departureMonth);
  departureMonth.onclick = () => {
    currentDepartureMonth.value = index;
    generateDepartureCalendar(
      currentDepartureMonth.value,
      currentDepartureYear.value
    );
    contDepartureCalendarMonth.classList.replace("show", "hide");
    document
      .querySelectorAll("#departure-month-list > div")
      .forEach((m) => m.classList.remove("selected-departure-month"));
    departureMonth.classList.add("selected-departure-month");
  };
});

document.getElementById("pre-departure-month").onclick = () => {
  currentDepartureMonth.value -= 1;
  if (currentDepartureMonth.value < 0) {
    currentDepartureMonth.value = 11;
    currentDepartureYear.value -= 1;
  }
  generateDepartureCalendar(
    currentDepartureMonth.value,
    currentDepartureYear.value
  );
};

document.getElementById("next-departure-month").onclick = () => {
  currentDepartureMonth.value += 1;
  if (currentDepartureMonth.value > 11) {
    currentDepartureMonth.value = 0;
    currentDepartureYear.value += 1;
  }
  generateDepartureCalendar(
    currentDepartureMonth.value,
    currentDepartureYear.value
  );
};

document.getElementById("pre-departure-year").onclick = () => {
  --currentDepartureYear.value;
  generateDepartureCalendar(
    currentDepartureMonth.value,
    currentDepartureYear.value
  );
};

document.getElementById("next-departure-year").onclick = () => {
  ++currentDepartureYear.value;
  generateDepartureCalendar(
    currentDepartureMonth.value,
    currentDepartureYear.value
  );
};

const generateDestinationCalendar = (destinationMonth, destinationYear) => {
  let destinationCalendarDays = document.querySelector(
    ".destination-calendar-days"
  );
  destinationCalendarDays.innerHTML = "";
  let destinationCalendarHeaderYear =
    document.getElementById("destination-year");

  let destinationDaysOfMonth = [
    31,
    getFebDays(destinationYear),
    31,
    30,
    31,
    30,
    31,
    31,
    30,
    31,
    30,
    31,
  ];

  monthDestinationPicker.innerHTML = monthName[destinationMonth];
  destinationCalendarHeaderYear.innerHTML = destinationYear;
  let destinationFirstDay = new Date(destinationYear, destinationMonth);
  for (
    let i = 0;
    i <=
    destinationDaysOfMonth[destinationMonth] + destinationFirstDay.getDay() - 1;
    i++
  ) {
    let destinationDay = document.createElement("div");

    if (i >= destinationFirstDay.getDay()) {
      destinationDay.innerHTML = i - destinationFirstDay.getDay() + 1;
      if (
        i - destinationFirstDay.getDay() + 1 ===
          currentDestinationDate.getDate() &&
        destinationYear === currentDestinationDate.getFullYear() &&
        destinationMonth === currentDestinationDate.getMonth()
      ) {
        destinationDay.classList.add("current-date");
      }
    }
    destinationCalendarDays.appendChild(destinationDay);
  }
  attachEventListenersDestinationToDays();
};

const attachEventListenersDestinationToDays = () => {
  const destinationDayElements = document.querySelectorAll(
    ".destination-calendar-days > div"
  );
  const destinationToday = new Date();
  destinationDayElements.forEach((destinationDayElement) => {
    const destinationDay = parseInt(destinationDayElement.innerHTML);
    if (isNaN(destinationDay)) return;
    const destinationMonth = currentDestinationMonth.value;
    const destinationYear = currentDestinationYear.value;
    const destinationDate = new Date(
      destinationYear,
      destinationMonth,
      destinationDay
    );
    if (destinationDate < destinationToday) {
      destinationDayElement.classList.add("past-day");
    }
    destinationDayElement.addEventListener("click", () => {
      if (destinationDate < destinationToday) {
        return;
      }
      selectDestinationDay(destinationDayElement, destinationDate);
    });
  });
};

const selectDestinationDay = (destinationDayElement, destinationDate) => {
  const previousSelectedDestinationDay = document.querySelector(
    ".destination-calendar-days .selected-day"
  );
  if (previousSelectedDestinationDay) {
    previousSelectedDestinationDay.classList.remove("selected-day");
  }
  destinationDayElement.classList.add("selected-day");
  displayDestinationDateInfo(destinationDate);
  hideDestinationCalendar();
};

const inputDestinationDate = document.getElementById("input-destination-date");
const displayDestinationDateInfo = (destinationDate) => {
  const formattedDestinationDate = destinationDate.toLocaleDateString("vi-VN");
  inputDestinationDate.value = formattedDestinationDate;
  inputDestinationDate.style.borderColor = ""
};

function hideDestinationCalendar() {
  contDestinationCalendar.classList.remove("active");
}

function showDestinationCalendar() {
  contDestinationCalendar.classList.toggle("active");
}

inputDestinationDate.addEventListener("click", function () {
  showDestinationCalendar();
});

monthDestinationPicker.onclick = () => {
  contDestinationCalendarMonth.classList.remove("hide");
  contDestinationCalendarMonth.classList.add("show");
};

monthName.forEach((e, index) => {
  let destinationMonth = document.createElement("div");
  destinationMonth.innerHTML = `<div>${e}</div>`;
  if (index === currentDestinationMonth.value) {
    destinationMonth.classList.add("current-destination-month");
  }
  destinationMonthList.append(destinationMonth);
  destinationMonth.onclick = () => {
    currentDestinationMonth.value = index;
    generateDestinationCalendar(
      currentDestinationMonth.value,
      currentDestinationYear.value
    );
    contDestinationCalendarMonth.classList.replace("show", "hide");
    document
      .querySelectorAll("#destination-month-list > div")
      .forEach((m) => m.classList.remove("selected-destination-month"));
    destinationMonth.classList.add("selected-destination-month");
  };
});

// Initialize calendar
(function () {
  generateDestinationCalendar(
    currentDestinationMonth.value,
    currentDestinationYear.value
  );
  generateDepartureCalendar(
    currentDepartureMonth.value,
    currentDepartureYear.value
  );
})();

document.getElementById("pre-destination-month").onclick = () => {
  currentDestinationMonth.value -= 1;
  if (currentDestinationMonth.value < 0) {
    currentDestinationMonth.value = 11;
    currentDestinationYear.value -= 1;
  }
  generateDestinationCalendar(
    currentDestinationMonth.value,
    currentDestinationYear.value
  );
};

document.getElementById("next-destination-month").onclick = () => {
  currentDestinationMonth.value += 1;
  if (currentDestinationMonth.value > 11) {
    currentDestinationMonth.value = 0;
    currentDestinationYear.value += 1;
  }
  generateDestinationCalendar(
    currentDestinationMonth.value,
    currentDestinationYear.value
  );
};

document.getElementById("pre-destination-year").onclick = () => {
  --currentDestinationYear.value;
  generateDestinationCalendar(
    currentDestinationMonth.value,
    currentDestinationYear.value
  );
};

document.getElementById("next-destination-year").onclick = () => {
  ++currentDestinationYear.value;
  generateDestinationCalendar(
    currentDestinationMonth.value,
    currentDestinationYear.value
  );
};

// Position
// const inputDepartureAddNewTour = document.getElementById(
//   "input-position-departure"
// );
const inputPositionDeparture = document.getElementById(
  "input-position-departure"
);
const departurePositionContent = document.querySelector(
  ".departure-position-content"
);
inputPositionDeparture.addEventListener("click", function () {
  departurePositionContent.classList.toggle("active");
});

const inputPositionDestination = document.getElementById(
  "input-position-destination"
);

// const inputDestinationAddNewTour = document.getElementById(
//   "input-position-destination"
// );
const destinationPositionContent = document.querySelector(
  ".destination-position-content"
);
inputPositionDestination.addEventListener("click", function () {
  destinationPositionContent.classList.toggle("active");
});

// Search Departure Position
const departurePositionOptionsList = document.querySelectorAll(
  ".departure-position-options li"
);
// const inputPositionDeparture = document.getElementById(
//   "input-position-departure"
// );
const optionSearchDeparturePosition = document.getElementById(
  "optionSearchDeparturePosition"
);
const departurePositionOptions = document.querySelector(
  ".departure-position-options"
);

departurePositionOptionsList.forEach(function (
  departurePositionOptionsListSingle
) {
  departurePositionOptionsListSingle.addEventListener("click", function () {
    var departurePositionValue = this.textContent;
    inputPositionDeparture.value = departurePositionValue;
    inputPositionDeparture.style.borderColor = ""    
    departurePositionContent.classList.remove("active");
  });
});

optionSearchDeparturePosition.addEventListener("keyup", function () {
  var filter, li, i, textValue, liCount;
  filter = optionSearchDeparturePosition.value.toUpperCase();
  li = departurePositionOptions.getElementsByTagName("li");
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
// Search Destination Position
const destinationPositionOptionsList = document.querySelectorAll(
  ".destination-position-options li"
);
// const inputPositionDestination = document.getElementById(
//   "input-position-destination"
// );
const optionSearchDestinationPosition = document.getElementById(
  "optionSearchDestinationPosition"
);
const destinationPositionOptions = document.querySelector(
  ".destination-position-options"
);

destinationPositionOptionsList.forEach(function (
  destinationPositionOptionsListSingle
) {
  destinationPositionOptionsListSingle.addEventListener("click", function () {
    var destinationPositionValue = this.textContent;
    inputPositionDestination.value = destinationPositionValue;
    inputPositionDestination.style.borderColor = ""
    destinationPositionContent.classList.remove("active");
  });
});

optionSearchDestinationPosition.addEventListener("keyup", function () {
  var filter, li, i, textValue, liCount;
  filter = optionSearchDestinationPosition.value.toUpperCase();
  li = destinationPositionOptions.getElementsByTagName("li");
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

// document.addEventListener("click", removeActiveContCalendar);
// function removeActiveContCalendar(event) {
//   var target = event.target;
//   if (
//     !contDepartureCalendar.contains(target) &&
//     !inputDepartureDate.contains(target)
//   ) {
//     hideDepartureCalendar();
//   }

//   if (
//     !contDestinationCalendar.contains(target) &&
//     !inputDestinationDate.contains(target)
//   ) {
//     hideDestinationCalendar();
//   }

//   if (
//     !departurePositionContent.contains(target) &&
//     !inputPositionDeparture.contains(target)
//   ) {
//     departurePositionContent.classList.remove("active");
//   }

//   if (
//     !destinationPositionContent.contains(target) &&
//     !inputPositionDestination.contains(target)
//   ) {
//     destinationPositionContent.classList.remove("active");
//   }
// }

document.addEventListener("click", function () {
  var target = event.target;
  if (
    !contDepartureCalendar.contains(target) &&
    !inputDepartureDate.contains(target)
  ) {
    hideDepartureCalendar();
  }

  if (
    !contDestinationCalendar.contains(target) &&
    !inputDestinationDate.contains(target)
  ) {
    hideDestinationCalendar();
  }

  if (
    !departurePositionContent.contains(target) &&
    !inputPositionDeparture.contains(target)
  ) {
    departurePositionContent.classList.remove("active");
  }

  if (
    !destinationPositionContent.contains(target) &&
    !inputPositionDestination.contains(target)
  ) {
    destinationPositionContent.classList.remove("active");
  }
});
function removeActiveContCalendar(event) {}
// edit text
// const scheduleTitle = document.querySelector('.schedule-title')
// function clearPlaceholderInputTitleSchedule(element) {
//   if (element.textContent === 'Type day 1 schedule') {
//       element.textContent = '';
//       element.style.color = 'black'
//       element.style.fontWeight = 'bold'
//   }
// }

// function restorePlaceholderInputTitleSchedule(element) {
//   if (element.textContent === '') {
//       element.textContent = 'Type day 1 schedule';
//       element.style.color = '#757575';
//       element.style.fontWeight = 'normal'
//   }
// }

// function clearPlaceholderInputTourName(element){
//   if(element.textContent === 'Write Tour Name'){
//     element.textContent = ''
//     element.style.color = 'black'
//   }
// }

// function restorePlaceholderInputTourName(element) {
//   if (element.textContent === '') {
//       element.textContent = 'Write Tour Name';
//       element.style.color = '#757575';

//   }
// }

function clearPlaceholderInput(
  element,
  placeholderText,
  textColor,
  fontWeight
) {
  if (element.textContent === placeholderText) {
    element.textContent = "";
    element.style.color = textColor;
    element.style.fontWeight = fontWeight;
  }
}

function restorePlaceholderInput(
  element,
  placeholderText,
  textColor,
  fontWeight
) {
  if (element.textContent === "") {
    element.textContent = placeholderText;
    element.style.color = textColor;
    element.style.fontWeight = fontWeight;
  }
}

const inputTourMainPrice = document.getElementById("input-tour-main-price");
const inputTourAdultPrice = document.getElementById("input-tour-adult-price");
const inputTourChildrenPrice = document.getElementById(
  "input-tour-children-price"
);
inputTourMainPrice.addEventListener("keyup", function () {
  this.value = this.value.replace(/\./g, "");
  let adultPrice = this.value;
  let childrenPrice = Math.round(adultPrice / 2);
  if (this.value > parseInt(this.getAttribute("max"))) {
    adultPrice = adultPrice.substring(0, this.value.length - 1);
    childrenPrice = Math.round(adultPrice / 2);
  }

  inputTourAdultPrice.value = adultPrice.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  inputTourChildrenPrice.value = String(childrenPrice).replace(
    /\B(?=(\d{3})+(?!\d))/g,
    "."
  );
  // formatPrice(inputTourMainPrice)
});
