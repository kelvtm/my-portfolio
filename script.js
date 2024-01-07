"use strict";
const toggleSwitch = document.querySelector('input[type="checkbox"]');
const nav = document.getElementById("nav");
const toggleIcon = document.getElementById("toggle-icon");
const img1 = document.getElementById("image1");
const img2 = document.getElementById("image2");
const img3 = document.getElementById("image3");
const textBox = document.getElementById("text-box");
const textEl = document.getElementById("sentence");

// image mode colors
const imageMode = function (color) {
  img1.src = `img/undraw_conceptual_idea_${color}.svg`;
  img2.src = `img/undraw_feeling_proud_${color}.svg`;
  img3.src = `img/undraw_proud_coder_${color}.svg`;
};

const chooseModes = function (isDark) {
  nav.style.backgroundColor = isDark
    ? "rgb(0 0 0 / 50%)"
    : "rgb(255 255 255 / 50%)";
  textBox.style.backgroundColor = isDark
    ? "rgb(255 255 255 / 50%)"
    : "rgb(0 0 0 / 50%)";
  toggleIcon.children[0].textContent = isDark ? "Dark Mode" : "Light Mode";
  isDark
    ? toggleIcon.children[1].classList.replace("fa-sun", "fa-moon")
    : toggleIcon.children[1].classList.replace("fa-moon", "fa-sun");
  isDark ? imageMode("dark") : imageMode("light");
};

const mode = function (e) {
  //   console.log(e.target.checked);
  if (e.target.checked) {
    document.documentElement.setAttribute("data-theme", "dark");
    localStorage.setItem("theme", "dark");
    chooseModes(true);
  } else {
    document.documentElement.setAttribute("data-theme", "light");
    localStorage.setItem("theme", "light");
    chooseModes(false);
  }
};

toggleSwitch.addEventListener("change", mode);

// check local storage for theme
const localTheme = localStorage.getItem("theme");
console.log(localTheme);
if (localTheme) {
  document.documentElement.setAttribute("data-theme", localTheme);
  if (localTheme === "dark") {
    toggleSwitch.checked = true;
    chooseModes(true);
  }
}
// create typing effect
const textArray = [
  "Front End Developer",
  "Back End Developer",
  "Full Stack Developer",
  "Site Maintenance",
];
let arrayIndex = 0;
let charIndex = 0;
let isDeleting = false;

const typeText = function () {
  const currentText = textArray[arrayIndex];
  textEl.textContent = isDeleting
    ? currentText.substring(0, charIndex - 1)
    : currentText.substring(0, charIndex + 1);
  isDeleting ? charIndex-- : charIndex++;

  if (!isDeleting && charIndex > currentText.length) {
    isDeleting = true;
    setTimeout(typeText, 1000);
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    arrayIndex = (arrayIndex + 1) % textArray.length;
    setTimeout(typeText, 500);
  } else {
    setTimeout(typeText, 50);
  }
};
document.addEventListener("DOMContentLoaded", () => {
  setTimeout(typeText, 1000);
});
