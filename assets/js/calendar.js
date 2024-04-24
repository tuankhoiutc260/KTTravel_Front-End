const isLeapYear = (year) => {
  return (
    (year % 4 === 0 && year % 100 !== 0 && year % 400 !== 0) ||
    (year % 100 === 0 && year % 400 === 0)
  );
};

const getFebDays = (year) => {
  return isLeapYear(year) ? 29 : 28;
};

const month_names = [
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

const contCalendar = document.querySelector(".cont-calendar");
const contCalendarMonth = document.querySelector(".cont-calendar-month");
const monthPicker = document.querySelector("#month-picker");
const monthList = contCalendar.querySelector(".month-list");
const dateInformation = document.querySelector(".date-information");

// Current month and year
let currentDate = new Date();
let currentMonth = { value: currentDate.getMonth() };
let currentYear = { value: currentDate.getFullYear() };

// Generate the calendar for a specific month and year
const generateCalendar = (month, year) => {
  let calendar_days = document.querySelector(".calendar-days");
  calendar_days.innerHTML = "";
  let calendar_header_year = document.querySelector("#year");

  let days_of_month = [
    31,
    getFebDays(year),
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

  monthPicker.innerHTML = month_names[month];
  calendar_header_year.innerHTML = year;

  let first_day = new Date(year, month);

  for (let i = 0; i <= days_of_month[month] + first_day.getDay() - 1; i++) {
    let day = document.createElement("div");

    if (i >= first_day.getDay()) {
      day.innerHTML = i - first_day.getDay() + 1;

      // Highlight the current date
      if (
        i - first_day.getDay() + 1 === currentDate.getDate() &&
        year === currentDate.getFullYear() &&
        month === currentDate.getMonth()
      ) {
        day.classList.add("current-date");
      }
    }

    // Add day element to the calendar
    calendar_days.appendChild(day);
  }

  // Attach event listeners to the day elements
  attachEventListenersToDays();
};

const attachEventListenersToDays = () => {
  const dayElements = document.querySelectorAll(".calendar-days > div");
  let selectedDayElement = null;

  const today = new Date();

  dayElements.forEach((dayElement) => {
    const day = parseInt(dayElement.innerHTML);

    // Nếu ngày không hợp lệ (ví dụ như phần tử trống), bỏ qua sự kiện
    if (isNaN(day)) return;

    const month = currentMonth.value;
    const year = currentYear.value;
    const date = new Date(year, month, day);

    if (date < today) {
      dayElement.classList.add("past-day");
    }

    dayElement.addEventListener("click", () => {
      if (date < today) {
        return;
      }

      selectDay(dayElement, date);
    });
  });
};

const selectDay = (dayElement, date) => {
  const previousSelectedDay = document.querySelector(
    ".calendar-days .selected-day"
  );
  if (previousSelectedDay) {
    previousSelectedDay.classList.remove("selected-day");
  }

  dayElement.classList.add("selected-day");
  displayDateInfo(date);
  hideCalendar();
};

const selectDateOption = document.querySelector(".select-date-option");
const displayDateElement = document.querySelector("#soValueDate");
const displayDateInfo = (date) => {
  const weekdayName = date.toLocaleDateString("vi-VN", { weekday: "long" });
  const monthName = date.toLocaleDateString("vi-VN", { month: "long" });
  const day = date.getDate();
  const year = date.getFullYear();
  const formattedDate = date.toLocaleDateString("vi-VN");
  displayDateElement.textContent = formattedDate;
};

function hideCalendar() {
  contCalendar.classList.remove("active");
}

function showCalendar() {
  contCalendar.classList.toggle("active");
}

document.addEventListener("click", removeActiveContCalendar);
function removeActiveContCalendar(event) {
  if (
    !contCalendar.contains(event.target) &&
    !dateInformation.contains(event.target)
  ) {
    hideCalendar();
    checkAndHideMonthList();
  }
}

function checkAndHideMonthList() {
  if (
    !contCalendar.classList.contains("active") &&
    contCalendarMonth.classList.contains("show")
  ) {
    contCalendarMonth.classList.remove("show");
    contCalendarMonth.classList.add("hide");
  }
}

selectDateOption.addEventListener("click", function () {
  showCalendar();

  // Select the container element
  const container = document.querySelector('.cont-calendar');

  // Get the bounding client rect of the container
  const rect = container.getBoundingClientRect();

  // Calculate the bottom position of the container relative to the top of the document
  const bottomPosition = rect.bottom + window.scrollY;

  // Calculate the height of the window
  const windowHeight = window.innerHeight;

  // Calculate the adjusted scroll position
  // This position ensures there is a padding of 10 pixels between the bottom of the container and the bottom of the screen
  const adjustedScrollPosition = bottomPosition - windowHeight + 10;

  // Scroll the window to the adjusted position using the 'top' parameter
  window.scrollTo({
      top: adjustedScrollPosition,
      behavior: 'smooth' // Optional: Adds smooth scrolling animation
  });
});




monthPicker.onclick = () => {
  if (contCalendarMonth && contCalendar) {
    const computedStyle = window.getComputedStyle(contCalendar);
    const contCalendarHeight = computedStyle.getPropertyValue("height");
    // console.log("Computed height of contCalendar:", contCalendarHeight);
    contCalendarMonth.style.height = contCalendarHeight;
    // contCalendarMonth.classList.remove("hideonce");
    contCalendarMonth.classList.remove("hide");
    contCalendarMonth.classList.add("show");
  }
};

month_names.forEach((e, index) => {
  let month = document.createElement("div");
  month.innerHTML = `<div>${e}</div>`;

  if (index === currentMonth.value) {
    month.classList.add("current-month");
  }

  monthList.append(month);
  month.onclick = () => {
    currentMonth.value = index;
    generateCalendar(currentMonth.value, currentYear.value);
    contCalendarMonth.classList.replace("show", "hide");

    document
      .querySelectorAll(".month-list > div")
      .forEach((m) => m.classList.remove("selected-month"));
    month.classList.add("selected-month");
  };
});

// Initialize calendar
(function () {
  // contCalendarMonth.classList.add("hideonce");
  generateCalendar(currentMonth.value, currentYear.value);
})();

// PRE-NEXT MONTH
document.querySelector("#pre-month").onclick = () => {
  currentMonth.value -= 1;
  if (currentMonth.value < 0) {
    currentMonth.value = 11;
    currentYear.value -= 1;
  }
  generateCalendar(currentMonth.value, currentYear.value);
};

document.querySelector("#next-month").onclick = () => {
  currentMonth.value += 1;
  if (currentMonth.value > 11) {
    currentMonth.value = 0;
    currentYear.value += 1;
  }
  generateCalendar(currentMonth.value, currentYear.value);
};

// PRE-NEXT YEAR
document.querySelector("#pre-year").onclick = () => {
  --currentYear.value;
  generateCalendar(currentMonth.value, currentYear.value);
};

document.querySelector("#next-year").onclick = () => {
  ++currentYear.value;
  generateCalendar(currentMonth.value, currentYear.value);
};
