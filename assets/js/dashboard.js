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

const inputTourName = document.querySelector("#input-tour-name");
const tourNameCharCount = document.querySelector(".tour-name-char-count");
const inputTourDescription = document.querySelector("#input-tour-description");
const tourDescriptionCharCount = document.querySelector(
  ".tour-description-char-count"
);
const allSubContInfNewTour = document.querySelectorAll(
  ".sub-cont-inf-new-tour"
);

window.addEventListener("DOMContentLoaded", function () {
  iconProgressBar.style.left = -iconProgressBarWidth / 2 + "px";
  countCharTourName();
  countCharTourDescription();
});

const textareas = document.querySelectorAll("textarea");
const subContAddNewTour = document.querySelector(".sub-cont-add-new-tour");

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

btnNextProgress.addEventListener("click", function () {
  let lastActiveIndex = -1;

  const currentProgressBarWidth = subContSuccessProgressBar.offsetWidth;
  const newProgressBarWidth = currentProgressBarWidth + contProgressWidth * 0.2;
  const currentIconProgressBarLeft = parseFloat(
    window.getComputedStyle(iconProgressBar).getPropertyValue("left")
  );
  const newIconProgressBarLeft =
    currentIconProgressBarLeft + contProgressWidth * 0.2;

  contNumbs.forEach((contNumb, index) => {
    if (
      contNumb.closest(".cont-main-sub-progress").classList.contains("active")
    ) {
      lastActiveIndex = index;
    }
  });

  if (lastActiveIndex !== -1 && lastActiveIndex < contNumbs.length - 1) {
    contNumbs[lastActiveIndex + 1]
      .closest(".cont-main-sub-progress")
      .classList.add("active");
    iconProgressBar.style.left = newIconProgressBarLeft + "px";
    subContSuccessProgressBar.style.width = newProgressBarWidth + "px";
    progressBarsText[lastActiveIndex + 1].textContent = "";
    console.log(lastActiveIndex);
    progressBarsText[lastActiveIndex].innerHTML =
      '<span class="material-symbols-outlined">done</span>';
    allSubContInfNewTour[lastActiveIndex].classList.remove("active");
    allSubContInfNewTour[lastActiveIndex + 1].classList.add("active");
  }
});

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
    }
  });
});

function countCharTourName() {
  let inputTourNameVariable = inputTourName.value.trim();
  let inputTourNameCharCountVariable = inputTourNameVariable.length;
  tourNameCharCount.textContent = inputTourNameCharCountVariable + "/100";
}

function countCharTourDescription() {
  let inputTourDescriptionVariable = inputTourDescription.value.trim();
  let inputTourDescriptionCharCountVariable =
    inputTourDescriptionVariable.length;
  tourDescriptionCharCount.textContent =
    inputTourDescriptionCharCountVariable + "/250";
}

inputTourName.addEventListener("input", function () {
  countCharTourName();
});

inputTourDescription.addEventListener("input", function () {
  countCharTourDescription();
});

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
