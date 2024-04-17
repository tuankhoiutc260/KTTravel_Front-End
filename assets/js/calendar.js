// Helper functions
const isLeapYear = (year) => {
  return (
    (year % 4 === 0 && year % 100 !== 0 && year % 400 !== 0) ||
    (year % 100 === 0 && year % 400 === 0)
  );
};

const getFebDays = (year) => {
  return isLeapYear(year) ? 29 : 28;
};

// Array of month names
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

// DOM elements
let cont_calendar = document.querySelector(".cont-calendar");
let month_picker = document.querySelector("#month-picker");
let dayTextFormate = document.querySelector(".day-text-formate");
let timeFormate = document.querySelector(".time-formate");
let dateFormate = document.querySelector(".date-formate");
let month_list = cont_calendar.querySelector(".month-list");
let todayShowTime = document.querySelector(".time-formate");
let todayShowDate = document.querySelector(".date-formate");

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

  month_picker.innerHTML = month_names[month];
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
//

const contCalendar = document.querySelector(".cont-calendar");
const dateInformation = document.querySelector(".date-information");

dateInformation.addEventListener("click", function () {
  console.log("Event Listener triggered");
  contCalendar.classList.toggle("active");
  contCalendar.style.display = "block"; 
  console.log("contCalendar display style:", contCalendar.style.display);
});


function hideCalendar() {
  cont_calendar.classList.remove("active");
  contCalendar.style.display = "none";
}
// Function to attach event listeners to day elements
const attachEventListenersToDays = () => {
  const dayElements = document.querySelectorAll(".calendar-days > div");
  let selectedDayElement = null; // Track the currently selected day

  dayElements.forEach((dayElement) => {
    dayElement.addEventListener("click", function () {
      // Remove selection from any previously selected day
      if (selectedDayElement) {
        selectedDayElement.classList.remove("selected-day");
      }

      // Set the new selected day element
      selectedDayElement = this;

      // Add the selection class to the clicked day
      selectedDayElement.classList.add("selected-day");

      // Capture the clicked date
      const day = parseInt(selectedDayElement.innerHTML);
      // If the element does not contain a valid day, skip
      if (isNaN(day)) return;

      // Get the current month and year
      const month = currentMonth.value;
      const year = currentYear.value;

      // Create a Date object with the clicked date
      const clickedDate = new Date(year, month, day);

      // Display date information

      hideCalendar();
      displayDateInfo(clickedDate);
    });
  });
};

// Function to display information about the clicked date
// Function to display information about the clicked date
const displayDateInfo = (date) => {
  // Extract date information
  const weekdayName = date.toLocaleDateString("vi-VN", { weekday: "long" });
  const monthName = date.toLocaleDateString("vi-VN", { month: "long" });
  const day = date.getDate();
  const year = date.getFullYear();

  // Format the clicked date in the Vietnamese format (dd/mm/yyyy)
  const formattedDate = date.toLocaleDateString("vi-VN");

  // // Get the date-info element
  // const dateInfoElement = document.querySelector(".date-info");

  // Get the input element
  const inputElement = document.getElementById("soValueDate");

  // Check if dateInfoElement and inputElement are not null before setting properties
  inputElement.placeholder = formattedDate;
  // if (inputElement) {
  //   // Display the clicked date information
  //   // dateInfoElement.textContent = `Bạn đã nhấp vào: ${day} ${monthName} ${year} (${weekdayName})`;

  //   // Set the input's placeholder with the formatted clicked date


  //   // Optionally, alert the information
  //   // alert(dateInfoElement.textContent);
  // } else {
  //   console.error("One or both of the elements ('.date-info' or '#soValueDate') were not found.");
  // }
};


// Month picker event
month_picker.onclick = () => {
  month_list.classList.remove("hideonce");
  month_list.classList.remove("hide");
  month_list.classList.add("show");
  dayTextFormate.classList.remove("showtime");
  dayTextFormate.classList.add("hidetime");
  timeFormate.classList.remove("showtime");
  timeFormate.classList.add("hidetime");
  dateFormate.classList.remove("showtime");
  dateFormate.classList.add("hidetime");
};

// Event listener for month selection
month_names.forEach((e, index) => {
  let month = document.createElement("div");
  month.innerHTML = `<div>${e}</div>`;

  month_list.append(month);
  month.onclick = () => {
    currentMonth.value = index;
    generateCalendar(currentMonth.value, currentYear.value);
    month_list.classList.replace("show", "hide");
    dayTextFormate.classList.remove("hidetime");
    dayTextFormate.classList.add("showtime");
    timeFormate.classList.remove("hidetime");
    timeFormate.classList.add("showtime");
    dateFormate.classList.remove("hidetime");
    dateFormate.classList.add("showtime");
  };
});

// Initialize calendar
(function () {
  month_list.classList.add("hideonce");
  generateCalendar(currentMonth.value, currentYear.value);
})();

// Event listeners for changing years
document.querySelector("#pre-year").onclick = () => {
  --currentYear.value;
  generateCalendar(currentMonth.value, currentYear.value);
};

document.querySelector("#next-year").onclick = () => {
  ++currentYear.value;
  generateCalendar(currentMonth.value, currentYear.value);
};

// Show current date and time
const showCurrentDateTime = () => {
  const currentDate = new Date();

  // Format date
  const dateOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long",
  };
  const formattedDate = new Intl.DateTimeFormat("en-US", dateOptions).format(
    currentDate
  );
  todayShowDate.textContent = formattedDate;

  // Format time
  const timeOptions = {
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  };
  const formattedTime = new Intl.DateTimeFormat("en-US", timeOptions).format(
    currentDate
  );
  todayShowTime.textContent = formattedTime;
};

// Update current date and time every second
// setInterval(showCurrentDateTime, 1000);
