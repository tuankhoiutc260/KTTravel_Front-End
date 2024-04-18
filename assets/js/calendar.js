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
const monthPicker = document.querySelector("#month-picker");
// const dayTextFormate = document.querySelector(".day-text-formate");
// const timeFormate = document.querySelector(".time-formate");
// const dateFormate = document.querySelector(".date-formate");
const month_list = contCalendar.querySelector(".month-list");
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

// const overlay = document.querySelector("[data-overlay]");


dateInformation.addEventListener("click", function () {
  contCalendar.classList.toggle("active");
  contCalendar.style.display = "block";
  // overlay.classList.toggle("active");
});

function removeActiveContCalendar(event) {
  if (
    !contCalendar.contains(event.target) &&
    !dateInformation.contains(event.target)
  ) {
    hideCalendar();
    checkAndHideMonthList();
  }
}

document.addEventListener("click", removeActiveContCalendar);

function hideCalendar() {
  contCalendar.classList.remove("active");
  contCalendar.style.display = "none";
}

// Attach event listeners to the day elements
const attachEventListenersToDays = () => {
  const dayElements = document.querySelectorAll('.calendar-days > div');
  let selectedDayElement = null;

  // Lấy ngày hiện tại
  const today = new Date();

  dayElements.forEach((dayElement) => {
    const day = parseInt(dayElement.innerHTML);

    // Nếu ngày không hợp lệ (ví dụ như phần tử trống), bỏ qua sự kiện
    if (isNaN(day)) return;

    // Lấy tháng và năm hiện tại
    const month = currentMonth.value;
    const year = currentYear.value;

    // Tạo một đối tượng Date với ngày, tháng, và năm hiện tại
    const date = new Date(year, month, day);

    // Kiểm tra nếu ngày đã qua
    if (date < today) {
      // Thêm lớp CSS để bôi màu xám cho ngày đã qua
      dayElement.classList.add('past-day');
    }

    // Thêm sự kiện click cho ngày hiện tại và tương lai
    dayElement.addEventListener('click', () => {
      // Kiểm tra nếu ngày đã qua
      if (date < today) {
        // Bỏ qua sự kiện nếu ngày đã qua
        return;
      }

      // Gọi hàm selectDay để xử lý việc chọn ngày
      selectDay(dayElement, date);
    });
  });
};

// Function to handle the selection of a specific day
const selectDay = (dayElement, date) => {
  // Remove the 'selected-day' class from the previously selected day (if any)
  const previousSelectedDay = document.querySelector('.calendar-days .selected-day');
  if (previousSelectedDay) {
    previousSelectedDay.classList.remove('selected-day');
  }

  // Add the 'selected-day' class to the new day element
  dayElement.classList.add('selected-day');

  // Display information about the selected date
  displayDateInfo(date);

  // Hide the calendar if desired
  hideCalendar();
};

// Function to display information about the clicked date
const displayDateInfo = (date) => {
  // Extract date information
  const weekdayName = date.toLocaleDateString('vi-VN', { weekday: 'long' });
  const monthName = date.toLocaleDateString('vi-VN', { month: 'long' });
  const day = date.getDate();
  const year = date.getFullYear();

  // Format the clicked date in the Vietnamese format (dd/mm/yyyy)
  const formattedDate = date.toLocaleDateString('vi-VN');
  const inputElement = document.getElementById('soValueDate');
  inputElement.placeholder = formattedDate;
  console.log(formattedDate);
};

// Month picker event
monthPicker.onclick = () => {
  month_list.classList.remove("hideonce");
  month_list.classList.remove("hide");
  month_list.classList.add("show");
  // dayTextFormate.classList.remove("showtime");
  // dayTextFormate.classList.add("hidetime");
  // timeFormate.classList.remove("showtime");
  // timeFormate.classList.add("hidetime");
  // dateFormate.classList.remove("showtime");
  // dateFormate.classList.add("hidetime");
};



function checkAndHideMonthList() {
  if (
    !contCalendar.classList.contains("active") &&
    month_list.classList.contains("show")
  ) {
    month_list.classList.remove("show");
    month_list.classList.add("hide");
  }
}




// Event listener for month selection
// Event listener for month selection
month_names.forEach((e, index) => {
  let month = document.createElement("div");
  month.innerHTML = `<div>${e}</div>`;

  // Check if the current month matches the index and add the 'current-month' class
  if (index === currentMonth.value) {
    // month.classList.add("selected-month");
    month.classList.add('current-month');
  }

  month_list.append(month);
  month.onclick = () => {
    currentMonth.value = index;
    generateCalendar(currentMonth.value, currentYear.value);
    month_list.classList.replace("show", "hide");

    // Remove 'current-month' class from all months
    document.querySelectorAll('.month-list > div').forEach(m => m.classList.remove('selected-month'));
    // Add 'current-month' class to the selected month
    month.classList.add('selected-month');
    
  };
});

// Initialize calendar
(function () {
  month_list.classList.add("hideonce");
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
}

document.querySelector("#next-month").onclick = () => {
  currentMonth.value += 1;
  if (currentMonth.value > 11) {
    currentMonth.value = 0;
    currentYear.value += 1;
  }
  generateCalendar(currentMonth.value, currentYear.value);
}

// PRE-NEXT YEAR
document.querySelector("#pre-year").onclick = () => {
  --currentYear.value;
  generateCalendar(currentMonth.value, currentYear.value);
};

document.querySelector("#next-year").onclick = () => {
  ++currentYear.value;
  generateCalendar(currentMonth.value, currentYear.value);
};
