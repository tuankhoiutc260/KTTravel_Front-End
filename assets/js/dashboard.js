window.addEventListener("DOMContentLoaded", function () {
  iconProgressBar.style.left = -iconProgressBarWidth / 2 + "px";
  countChar100(inputTourName, tourNameCharCount);
  // countChar100(inputTourScheduleTitle, tourScheduleTitleCharCount);
  countChar250(inputTourDescription, tourDescriptionCharCount);

  allInputPrice.forEach((inputPrice) => {
    inputPrice.addEventListener("keyup", function () {
      formatPrice(inputPrice);
    });
  });
});

function formatPrice(element) {
  var inputPriceRemovedChar = element.value.replace(/[^0-9\.]/g, "");
  var inputPriceRemovedDot = inputPriceRemovedChar.replace(/\./g, "");
  var inputPriceValue = inputPriceRemovedDot;
  if (inputPriceValue.length < 1) {
    inputPriceValue = "0";
  }
  inputPriceValue = inputPriceValue.replace(/^0+/, "");
  if (inputPriceValue.length < 1) {
    inputPriceValue = "0";
  }
  var maxTourMainPrice = parseInt(element.getAttribute("max"), 10);
  if (parseInt(inputPriceValue, 10) > maxTourMainPrice) {
    inputPriceValue = inputPriceValue.substring(0, inputPriceValue.length - 1);
  }
  var inputTourPriceFormatted = inputPriceValue.replace(
    /\B(?=(\d{3})+(?!\d))/g,
    "."
  );
  element.value = inputTourPriceFormatted;
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
// const inputTourScheduleTitle = document.getElementById(
//   "input-tour-schedule-title"
// );

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
const allProgressBarsText = document.querySelectorAll(
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

function checkEmptyInputField() {
  const timeInput = document.getElementById("input-centralized-time-inf");
  timeInput.addEventListener("change", () => {
    if (timeInput.value) {
      timeInput.classList.add("selected");
      timeInput.style.borderColor = "";
    } else {
      timeInput.classList.remove("selected");
    }
  });

  const alInputField = document.querySelectorAll(".input-field");
  alInputField.forEach((inputField) => {
    const subContInputField = inputField.closest(".sub-cont-input-field");
    const inputTourHighlightCloset = inputField.closest(
      ".input-tour-highlight-field.active"
    );

    inputField.addEventListener("keyup", function () {
      // console.log("subContInputField: " + subContInputField);
      if (subContInputField) {
        if (
          inputField.tagName === "INPUT" ||
          inputField.tagName === "TEXTAREA"
        ) {
          if (inputField.value.trim() === "") {
            subContInputField.style.borderColor = "red";
          } else {
            subContInputField.style.borderColor = "";
          }
        } else {
          if (inputField.textContent.trim() === "") {
            subContInputField.style.borderColor = "red";
          } else {
            subContInputField.style.borderColor = "";
          }
        }
      } else if (inputTourHighlightCloset) {
        if (inputField.value.trim() === "") {
          inputTourHighlightCloset.style.borderColor = "red";
          isValid = false;
        } else {
          inputTourHighlightCloset.style.borderColor = "";
        }
      } else {
        if (inputField.value.trim() === "") {
          inputField.style.borderColor = "red";
        } else {
          inputField.style.borderColor = "";
        }
      }
    });
  });
}

checkEmptyInputField();

function closeContAddNewTour() {
  const contProcess1 = document.querySelector(".cont-process-1");
  allSubContInfNewTour.forEach((subContInfNewTour) => {
    subContInfNewTour.classList.remove("active");
    contProcess1.classList.add("active");
  });

  const contMainSubProgress1 = document.querySelector(
    ".cont-main-sub-progress-1"
  );
  const allContMainSubProgress = document.querySelectorAll(
    ".cont-main-sub-progress"
  );
  allContMainSubProgress.forEach((contMainSubProgress) => {
    contMainSubProgress.classList.remove("active");
    contMainSubProgress1.classList.add("active");
  });
  subContSuccessProgressBar.style.width = 0 + "px";
  iconProgressBar.style.left = -iconProgressBarWidth / 2 + "px";
  allProgressBarsText[0].textContent = "";

  for (let i = 2; i <= contNumbs.length; i++) {
    allProgressBarsText[i - 1].textContent = i;
  }
  lastActiveIndex = -1;
  currentActiveIndex = 0;
  contAddNewTour.classList.remove("active");
}

function resetInputField() {
  const allInputReset = document.querySelectorAll(".input-reset");
  let needConfirmation = false;
  allInputReset.forEach((inputReset) => {
    if (inputReset.tagName === "INPUT" || inputReset.tagName === "TEXTAREA") {
      if (inputReset.value.trim() !== "") {
        needConfirmation = true;
      }
    } else {
      if (inputReset.textContent.trim() !== "") {
        needConfirmation = true;
      }
    }
  });
  // allInputReset.forEach((inputReset) => {
  //   if (inputReset.textContent.trim() !== "") {
  //     needConfirmation = true;
  //   }
  // });

  // allInputReset.forEach((inputReset) => {
  //   if (inputReset.value.trim() !== "") {
  //     needConfirmation = true;

  //   }
  // });

  allInputReset.forEach((inputReset) => {
    inputReset.style.borderColor = "";
  });

  if (needConfirmation) {
    const confirmReset = confirm("Are you sure you want to close?");
    if (confirmReset) {
      allInputReset.forEach((inputReset) => {
        inputReset.value = "";
        inputReset.textContent = "";
      });

      closeContAddNewTour();
    }
  } else {
    closeContAddNewTour();
  }

  const highlights = document.querySelectorAll(
    ".cont-input-tour-highlights-field"
  );
  for (let i = 1; i < highlights.length; i++) {
    highlights[i].remove();
  }

  const included = document.querySelectorAll(".cont-input-tour-included-field");
  for (let i = 1; i < included.length; i++) {
    included[i].remove();
  }

  const excluded = document.querySelectorAll(".cont-input-tour-excluded-field");
  for (let i = 1; i < excluded.length; i++) {
    excluded[i].remove();
  }
}

// Call the function with the appropriate input ID and character count selector

// inputTourName.addEventListener('keyup', function(){
//   if(this.value.trim() === ''){
//     this.style.borderColor = "red";
//   } else {
//     this.style.borderColor = "";
//   }
// })
const inputCentralizedPositionInf = document.getElementById(
  "input-centralized-position-inf"
);
const inputCentralizedTimeInf = document.getElementById(
  "input-centralized-time-inf"
);
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
  if (inputCentralizedTimeInf.value.trim() === "") {
    inputCentralizedTimeInf.style.borderColor = "red";
    isValid = false;
  } else {
    inputCentralizedTimeInf.style.borderColor = "";
  }
  if (inputCentralizedPositionInf.value.trim() === "") {
    inputCentralizedPositionInf.style.borderColor = "red";
    isValid = false;
  } else {
    inputCentralizedPositionInf.style.borderColor = "";
  }
  console.log;
  return isValid;
}

function checkContainerSchedule() {
  let isValid = true;
  const allInputTourScheduleTitle = document.querySelectorAll(
    ".input-tour-schedule-title"
  );

  const allInputTourDescriptionSchedule = document.querySelectorAll(
    ".input-tour-description-schedule"
  );
  allInputTourScheduleTitle.forEach((inputTourScheduleTitle) => {
    if (inputTourScheduleTitle.value.trim() === "") {
      inputTourScheduleTitle.style.borderColor = "red";
      isValid = false;
    } else {
      inputTourScheduleTitle.style.borderColor = "";
    }
  });
  allInputTourDescriptionSchedule.forEach((inputTourDescriptionSchedule) => {
    const parentInputTourDescriptionSchedule =
      inputTourDescriptionSchedule.parentElement;

    if (inputTourDescriptionSchedule.textContent.trim() === "") {
      parentInputTourDescriptionSchedule.style.borderColor = "red";
      isValid = false;
    } else {
      parentInputTourDescriptionSchedule.style.borderColor = "";
    }
  });

  return isValid;
}
const inputTourMainPrice = document.getElementById("input-tour-main-price");
const inputTourAdultPrice = document.getElementById("input-tour-adult-price");
const inputTourChildrenPrice = document.getElementById(
  "input-tour-children-price"
);
function checkContainerPriceList() {
  let isValid = true;
  if (inputTourMainPrice.value == 0) {
    inputTourMainPrice.style.borderColor = "red";
    isValid = false;
  } else {
    inputTourMainPrice.style.borderColor = "";
  }
  if (inputTourAdultPrice.value == 0) {
    inputTourAdultPrice.style.borderColor = "red";
    isValid = false;
  } else {
    inputTourAdultPrice.style.borderColor = "";
  }
  if (inputTourChildrenPrice.value == 0) {
    inputTourChildrenPrice.style.borderColor = "red";
    isValid = false;
  } else {
    inputTourChildrenPrice.style.borderColor = "";
  }
  return isValid;
}

function checkNote() {
  let isValid = true;
  const allInputTourHighlight = document.querySelectorAll(
    ".input-tour-highlight-field"
  );
  const allInputTourIncluded = document.querySelectorAll(
    ".input-tour-included-field"
  );
  const allInputTourExcluded = document.querySelectorAll(
    ".input-tour-excluded-field"
  );
  allInputTourHighlight.forEach((inputTourHighlight) => {
    const inputTourHighlightCloset = inputTourHighlight.closest(
      ".sub-cont-input-field"
    );
    if (inputTourHighlight.value.trim() === "") {
      inputTourHighlightCloset.style.borderColor = "red";
      isValid = false;
    } else {
      inputTourHighlightCloset.style.borderColor = "";
    }
  });

  allInputTourIncluded.forEach((inputTourIncluded) => {
    const inputTourIncludedCloset = inputTourIncluded.closest(
      ".sub-cont-input-field"
    );
    if (inputTourIncluded.value.trim() === "") {
      inputTourIncludedCloset.style.borderColor = "red";
      isValid = false;
    } else {
      inputTourIncludedCloset.style.borderColor = "";
    }
  });

  allInputTourExcluded.forEach((inputTourExcluded) => {
    const inputTourExcludedCloset = inputTourExcluded.closest(
      ".sub-cont-input-field"
    );
    if (inputTourExcluded.value.trim() === "") {
      inputTourExcludedCloset.style.borderColor = "red";
      isValid = false;
    } else {
      inputTourExcludedCloset.style.borderColor = "";
    }
  });
  return isValid;
}

let currentActiveIndex = 0;
let lastActiveIndex = -1;

btnNextProgress.addEventListener("click", function () {
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
      allProgressBarsText[lastActiveIndex + 1].textContent = "";
      allProgressBarsText[lastActiveIndex].innerHTML =
        '<span class="material-symbols-outlined">done</span>';
      allSubContInfNewTour[lastActiveIndex].classList.remove("active");
      allSubContInfNewTour[lastActiveIndex + 1].classList.add("active");
      currentActiveIndex++;
    }
  }
  // updateProgressAndNavigation();
  switch (currentActiveIndex) {
    case 0:
      checkEmptyInputField();
      if (checkContainerOverview()) {
      updateProgressAndNavigation();
      }
      break;
    case 1:
      checkEmptyInputField();
      if (checkContainerDetails()) {
        updateProgressAndNavigation();
      }
      break;
    case 2:
      checkEmptyInputField();
      if (checkContainerSchedule()) {
        updateProgressAndNavigation();
      }
      break;
    case 3:
      checkEmptyInputField();
      if (checkContainerPriceList()) {
        updateProgressAndNavigation();
      }
      break;
    case 4:
      checkEmptyInputField();
      if (checkNote()) {
        resetInputField();

      }
  }
  if (currentActiveIndex == 1) {
    sub2ContInfNewTour.style.overflowX = "visible";
  } else {
    sub2ContInfNewTour.style.overflowX = "hidden";
  }
  if (lastActiveIndex == 1) {
    var departureDateParts = inputDepartureDate.value.split("/");
    var destinationDateParts = inputDestinationDate.value.split("/");
    departureDate = new Date(
      departureDateParts[2],
      departureDateParts[1] - 1,
      departureDateParts[0]
    );
    destinationDate = new Date(
      destinationDateParts[2],
      destinationDateParts[1] - 1,
      destinationDateParts[0]
    );
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
  scheduleDate.setDate(departureDate.getDate() + dayIndex);
  const formattedDate = scheduleDate.toLocaleDateString("vi-VN");
  const newSchedule = document.createElement("div");
  newSchedule.className = "cont-date-schedule";
  newSchedule.innerHTML = `
  <div id="cont-tour-schedule-title" class="cont-inf-field">
    <span style="font-weight: bold; font-size: 1.5rem; text-align: center;">Day ${dayCount} - ${formattedDate}</span>
    <label for="input-tour-schedule-title-${dayCount}" class="title-field">Title Schedule <span>(required)</span></label>
    <input type="text" id="input-tour-schedule-title-${dayCount}" class="input-field input-reset input-tour-schedule-title" placeholder="e.g: Khám phá Thác Datanla và Đồi Cỏ xanh..." maxlength="100" required oninput="countChar100(this, document.querySelector('.tour-schedule-title-char-count'))">
    <span class="tour-schedule-title-char-count char-count">0/100</span>
  </div>
  <div class="cont-schedule-content cont-inf-field">
    <label for="input-tour-description-schedule-${dayCount}" class="title-field">Description Schedule <span>(required)</span></label>
    <div class="sub-cont-input-field sub-input-field">
      <div style="border: none;" id="input-tour-description-schedule-${dayCount}" class="input-field input-reset input-tour-description-schedule" contenteditable="true"></div>
      <div class="cont-tool-editor">
        <a class="btn btn-tertiary" href="#" onclick="document.execCommand('bold', true, '')"><strong>B</strong></a>
        <a class="btn btn-tertiary" href="#" onclick="document.execCommand('italic', true, '')"><em>I</em></a>
        <a class="btn btn-tertiary" href="#" onclick="document.execCommand('underline', true, '')"><u>U</u></a>
      </div>
    </div>
  </div>
            `;
  container.appendChild(newSchedule);
  // const alInputField = document.querySelectorAll(".input-field");

  checkEmptyInputField();
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
        allProgressBarsText[i - 1].innerHTML = "";
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
        allProgressBarsText[i - 1].textContent = i;
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
  resetInputField();
});

btnAddNewTour.addEventListener("click", function () {
  console.log("currentDepartureMonth: " + currentDepartureMonth.value);
  console.log("currentDestinationMonth: " + currentDestinationMonth.value);
  destinationSelectedDate = "";
  departureSelectedDate = "";
  currentDepartureMonth = { value: currentDepartureDate.getMonth() };
  currentDestinationMonth = { value: currentDestinationDate.getMonth() };
  currentDepartureYear = { value: currentDepartureDate.getFullYear() };
  currentDestinationYear = { value: currentDestinationDate.getFullYear() };
  generateDepartureCalendar(
    currentDepartureMonth.value,
    currentDepartureYear.value
  );
  generateDestinationCalendar(
    currentDestinationMonth.value,
    currentDestinationYear.value
  );
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
    departureDayElement.classList.remove("future-day");
    if (destinationSelectedDate !== "") {
      if (departureDate > destinationSelectedDate)
        departureDayElement.classList.add("future-day");
      departureDayElement.classList.remove("destination-selected-date");
      if (departureDate.getTime() === destinationSelectedDate.getTime()) {
        departureDayElement.classList.add("destination-selected-date");
      }
      if (departureSelectedDate) {
        departureDayElement.classList.remove("departure-selected-date");
        if (departureDate.getTime() === departureSelectedDate.getTime()) {
          departureDayElement.classList.add("departure-selected-date");
        }
      }
    }
    if (departureDate < departureToday) {
      departureDayElement.classList.add("past-day");
    }
    departureDayElement.addEventListener("click", () => {
      if (destinationSelectedDate) {
        if (departureDate > destinationSelectedDate) {
          return;
        }
      }
      if (departureDate < departureToday) {
        return;
      }
      selectDepartureDay(departureDayElement, departureDate);
    });
  });
};

let departureSelectedDate = "";
let destinationSelectedDate = "";
let click1 = null;
let click2 = null;
let clickCount = 0;

const selectDepartureDay = (departureDayElement, departureDate) => {
  const previousSelectedDepartureDay = document.querySelector(
    ".departure-calendar-days .selected-day"
  );
  if (previousSelectedDepartureDay) {
    previousSelectedDepartureDay.classList.remove("selected-day");
  }

  departureDayElement.classList.add("selected-day");
  hideDepartureCalendar();

  // clickCount++;
  // if (clickCount === 1) {
  //   click1 = departureDate;
  //   console.log("First click date:", click1);
  //   departureDayElement.classList.add("selected-day");

  // } else if (clickCount === 2) {
  //   click2 = departureDate;
  //   console.log("Second click date:", click2);
  //   departureDayElement.classList.add("selected-day");
  // } else if(clickCount == 3) {
  //   allPreviousSelectedDepartureDay.forEach((previousSelectedDepartureDay) => {
  //     previousSelectedDepartureDay.classList.remove("selected-day");
  //   });

  //   clickCount = 1;
  //   click1 = departureDate;
  //   click2 = null;
  //   departureDayElement.classList.add("selected-day");

  //   console.log("Resetting, new first click date:", click1);
  // }
  // console.log("count: " + clickCount);

  displayDepartureDateInfo(departureDate);

  departureSelectedDate = departureDate;
};

const inputDepartureDate = document.getElementById("input-departure-date");
const displayDepartureDateInfo = (departureDate) => {
  const formattedDepartureDate = departureDate.toLocaleDateString("vi-VN");
  inputDepartureDate.value = formattedDepartureDate;
  inputDepartureDate.style.borderColor = "";
};

function hideDepartureCalendar() {
  contDepartureCalendar.classList.remove("active");
}

function showDepartureCalendar() {
  contDepartureCalendar.classList.toggle("active");
}

inputDepartureDate.addEventListener("click", function () {
  attachEventListenersDepartureToDays();
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

  // console.log(departureSelectedDate);
  // console.log(destinationSelectedDate);
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
  // console.log(departureSelectedDate)
  // console.log(destinationSelectedDate)
  // attachEventListenersDepartureToDays();
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
    destinationDayElement.classList.remove("past-day");
    if (departureSelectedDate !== "") {
      if (destinationDate < departureSelectedDate)
        destinationDayElement.classList.add("past-day");
      destinationDayElement.classList.remove("departure-selected-date");
      if (destinationDate.getTime() === departureSelectedDate.getTime()) {
        destinationDayElement.classList.add("departure-selected-date");
      }
      if (destinationSelectedDate) {
        destinationDayElement.classList.remove("destination-selected-date");
        if (destinationDate.getTime() === destinationSelectedDate.getTime()) {
          destinationDayElement.classList.add("destination-selected-date");
        }
      }
    } else if (
      departureSelectedDate === "" &&
      destinationDate < destinationToday
    ) {
      destinationDayElement.classList.add("past-day");
    }
    destinationDayElement.addEventListener("click", () => {
      // if (destinationDate < departureSelectedDate) {
      //   return;
      // }
      if (departureDate) {
        if (destinationDate < departureSelectedDate) {
          return;
        }
      } else {
        if (destinationDate < destinationToday) {
          return;
        }
      }

      selectDestinationDay(destinationDayElement, destinationDate);
    });
  });
};

// const selectDestinationDay = (destinationDayElement, destinationDate) => {
const selectDestinationDay = (destinationDayElement, destinationDate) => {
  const previousSelectedDestinationDay = document.querySelector(
    ".destination-calendar-days .selected-day"
  );
  if (previousSelectedDestinationDay) {
    previousSelectedDestinationDay.classList.remove("selected-day");
    // const pastDays = document.querySelectorAll(
    //   ".destination-calendar-days .past-day"
    // );
    // pastDays.forEach((day) => day.classList.remove("past-day"));
  }

  destinationDayElement.classList.add("selected-day");
  displayDestinationDateInfo(destinationDate);
  hideDestinationCalendar();
  destinationSelectedDate = destinationDate;
};

const inputDestinationDate = document.getElementById("input-destination-date");
const displayDestinationDateInfo = (destinationDate) => {
  const formattedDestinationDate = destinationDate.toLocaleDateString("vi-VN");
  inputDestinationDate.value = formattedDestinationDate;
  inputDestinationDate.style.borderColor = "";
};

function hideDestinationCalendar() {
  contDestinationCalendar.classList.remove("active");
}

function showDestinationCalendar() {
  contDestinationCalendar.classList.toggle("active");
}

inputDestinationDate.addEventListener("click", function () {
  attachEventListenersDestinationToDays();
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
    inputPositionDeparture.style.borderColor = "";
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
    inputPositionDestination.style.borderColor = "";
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

inputTourMainPrice.addEventListener("keyup", function () {
  formatPrice(this);
  var inputTourMainPriceRemovedChar = this.value.replace(/[^0-9\.]/g, "");
  var inputTourMainPriceRemovedDot = inputTourMainPriceRemovedChar.replace(
    /\./g,
    ""
  );
  inputTourAdultPrice.value = inputTourMainPriceRemovedDot;
  formatPrice(inputTourAdultPrice);

  inputTourChildrenPrice.value = Math.round(inputTourMainPriceRemovedDot / 2);
  formatPrice(inputTourChildrenPrice);
  if (inputTourMainPriceRemovedDot == 0) {
    inputTourAdultPrice.style.borderColor = "red";
    inputTourChildrenPrice.style.borderColor = "red";
  }
  if (inputTourMainPriceRemovedDot > 0) {
    inputTourAdultPrice.style.borderColor = "";
    inputTourChildrenPrice.style.borderColor = "";
  }
});

inputTourAdultPrice.addEventListener("keyup", function () {
  formatPrice(this);
  var inputTourMainPriceValue = parseInt(
    inputTourMainPrice.value.replace(/\./g, ""),
    10
  );
  var inputTourAdultPriceRemovedChar = this.value.replace(/[^0-9\.]/g, "");
  var inputTourAdultPriceRemovedDot = inputTourAdultPriceRemovedChar.replace(
    /\./g,
    ""
  );
  var inputTourAdultPriceValue = parseInt(inputTourAdultPriceRemovedDot, 10);
  if (inputTourAdultPriceValue > inputTourMainPriceValue) {
    inputTourAdultPriceValue = Math.floor(inputTourAdultPriceValue / 10);
  }
  var inputTourPriceFormatted = inputTourAdultPriceValue
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  this.value = inputTourPriceFormatted;
});

inputTourChildrenPrice.addEventListener("keyup", function () {
  formatPrice(this);
  var inputTourMainPriceValue = parseInt(
    inputTourMainPrice.value.replace(/\./g, ""),
    10
  );
  var inputTourChildrenPriceRemovedChar = this.value.replace(/[^0-9\.]/g, "");
  var inputTourChildrenPriceRemovedDot =
    inputTourChildrenPriceRemovedChar.replace(/\./g, "");
  var inputTourChildrenPriceValue = parseInt(
    inputTourChildrenPriceRemovedDot,
    10
  );
  if (inputTourChildrenPriceValue > inputTourMainPriceValue) {
    inputTourChildrenPriceValue = Math.floor(inputTourChildrenPriceValue / 10);
  }
  var inputTourPriceFormatted = inputTourChildrenPriceValue
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  this.value = inputTourPriceFormatted;
});
const btnAddNewHighlights = document
  .getElementById("btn-add-new-highlights")
  .addEventListener("click", function () {
    checkEmptyInputField();
    const subContInputTourHighlightsField = document.querySelector(
      ".sub-cont-input-tour-highlights-field"
    );

    const newContHighlights = document.createElement("div");
    newContHighlights.className =
      "cont-input-tour-highlights-field cont-input-tour-field-process-note sub-cont-input-field sub-input-field";
    newContHighlights.innerHTML = `
    <input type="text" id="input-tour-highlights" class="input-field input-reset input-tour-field-process-note input-tour-highlight-field" placeholder="e.g: Explore the Valley of Love: Enjoy romantic gardens, serene lakes, and scenic walking trail">
    <div class="cont-btn-function-with-highlights-field cont-btn-function-with-field-of-process-note">
      <a href="#" id="btn-delete-highlights" class="btn-function-with-field-of-process-note btn-normal">
      <span class="material-symbols-outlined">close</span></a>
    </div>`;
    subContInputTourHighlightsField.appendChild(newContHighlights);
    checkEmptyInputField();

    const btnDeleteNewHighlights = newContHighlights.querySelector(
      "#btn-delete-highlights"
    );

    btnDeleteNewHighlights.addEventListener("click", function (e) {
      e.preventDefault();
      newContHighlights.remove();
    });
  });

const btnAddNewIncluded = document
  .getElementById("btn-add-new-included")
  .addEventListener("click", function () {
    checkEmptyInputField();
    const subContInputTourIncludedField = document.querySelector(
      ".sub-cont-input-tour-included-field"
    );

    const newContIncluded = document.createElement("div");
    newContIncluded.className =
      "cont-input-tour-included-field cont-input-tour-field-process-note sub-cont-input-field sub-input-field";
    newContIncluded.innerHTML = `
    <input type="text" id="input-tour-included" class="input-field input-reset input-tour-field-process-note input-tour-highlight-field" placeholder="e.g: Explore the Valley of Love: Enjoy romantic gardens, serene lakes, and scenic walking trail">
    <div class="cont-btn-function-with-included-field cont-btn-function-with-field-of-process-note">
      <a href="#" id="btn-delete-included" class="btn-function-with-field-of-process-note btn-normal">
      <span class="material-symbols-outlined">close</span></a>
    </div>`;
    subContInputTourIncludedField.appendChild(newContIncluded);
    checkEmptyInputField();

    const btnDeleteNewIncluded = newContIncluded.querySelector(
      "#btn-delete-included"
    );

    btnDeleteNewIncluded.addEventListener("click", function (e) {
      e.preventDefault();
      newContIncluded.remove();
    });
  });

  const btnAddNewExcluded = document
  .getElementById("btn-add-new-excluded")
  .addEventListener("click", function () {
    checkEmptyInputField();
    const subContInputTourExcludedField = document.querySelector(
      ".sub-cont-input-tour-excluded-field"
    );

    const newContExcluded = document.createElement("div");
    newContExcluded.className =
      "cont-input-tour-excluded-field cont-input-tour-field-process-note sub-cont-input-field sub-input-field";
    newContExcluded.innerHTML = `
    <input type="text" id="input-tour-excluded" class="input-field input-reset input-tour-field-process-note input-tour-highlight-field" placeholder="e.g: Explore the Valley of Love: Enjoy romantic gardens, serene lakes, and scenic walking trail">
    <div class="cont-btn-function-with-excluded-field cont-btn-function-with-field-of-process-note">
      <a href="#" id="btn-delete-excluded" class="btn-function-with-field-of-process-note btn-normal">
      <span class="material-symbols-outlined">close</span></a>
    </div>`;
    subContInputTourExcludedField.appendChild(newContExcluded);
    checkEmptyInputField();

    const btnDeleteNewExcluded = newContExcluded.querySelector(
      "#btn-delete-excluded"
    );

    btnDeleteNewExcluded.addEventListener("click", function (e) {
      e.preventDefault();
      newContExcluded.remove();
    });
  });
