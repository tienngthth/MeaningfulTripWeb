// When the user clicks anywhere outside of any pop up windows, close it
window.onclick = function (event) {
  if (event.target == hotlineForm) { //hotline form
    hotlineForm.style.display = "none";
  }
  if (event.target == responsiveBackground) { //menu options
    openNavBar();
  }
}

//scroll to top when page is reloaded
function toTopWhenReload() {
  window.onbeforeunload = function () {
    window.scrollTo(0, 0);
  }
}
/* --------------------------------------------------map----------------------------------------- */
function initMap() {
  // The location 
  var location = { lat: 10.742500, lng: 106.673833 };
  // Centered 
  var map = new google.maps.Map(
    document.getElementById('map'), { zoom: 10, center: location });
  // The marker
  var marker = new google.maps.Marker({ position: location, map: map });
}
/*-------------------------------------navigation menu------------------------------------------- */
var navBar = document.getElementById("navigation-bar");
var responsiveBackground = document.getElementById("navigation-bar-responsive");
//Open or close the menu when click the icon
function openNavBar() {
  if (navBar.className === "navigation-bar") {
    navBar.className += " open";
    responsiveBackground.style.backgroundColor = "rgba(0, 9, 26, 0.9)";
    responsiveBackground.style.height = "100%";
  } else {
    navBar.className = "navigation-bar";
    responsiveBackground.style.backgroundColor = "unset";
    responsiveBackground.style.height = "unset";
  }
}
/*---------------------------------------------hotline form-------------------------------------- */
var hotlineForm = document.getElementById("hotline-form");
// When the user clicks the button, open the form 
function openForm() {
  hotlineForm.style.display = "block";
}
// When the user clicks on <span> (x), close the form
function closeForm() {
  hotlineForm.style.display = "none";
}
// Validate form when submitted
function validateSingleFieldForm(id) {
  var inputField, input;
  var regex = /.*\S.*/;
  inputField = document.getElementById(id);
  input = inputField.value
  if (!regex.test(input)) {
    inputField.style.outlineColor = "red";
    return false;
  }
  alert("Thank you for submitting!");
  return true;
}
// Validate form when submitted
function validateMultipleFieldsForm(listOfIds) {
  for (let step = 0; step < listOfIds.length; step++) {
    var inputField = document.getElementById(listOfIds[step]);
    if (validateSingleFieldForm(listOfIds[step]) == false) {
      inputField.style.outlineStyle = "auto";
    } else {
      //inputField.style.outlineColor="blue";
      inputField.style.outline = "unset";
    }
  }
}
/*---------------------------------------------to top page button----------------------------------- */
//back to top btn
var upBtn = document.getElementById("up-btn");
// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function () {showUpBtn() };
function showUpBtn() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    upBtn.style.display = "block";
  } else {
    upBtn.style.display = "none";
  }
}
// When the user clicks on the button, scroll to the top of the document
function toTop() {
  window.scrollTo(0, 0); 
}
/*---------------------------------------------project slider------------------------------------- */
var slideIndex = 0;
var autoSwitch;
var slider = document.querySelector("#projects-slider");
//start showing slides
showSlides();
//stop switching slides when hover
slider.addEventListener("mouseover", event => {
  clearTimeout(autoSwitch);
});
//start switching slides when not hover anymore
slider.addEventListener("mouseout", event => {
  showSlides();
});
//show next slide after 3.5s
function startTimeout() {
  autoSwitch = setTimeout(nextSlides, 3500);
}
//show a slide
function showSlides() {
  clearTimeout(autoSwitch);
  var slides = document.getElementsByClassName("project-slide");
  var dots = document.getElementsByClassName("dot");
  for (let step = 0; step < slides.length; step++) {
    slides[step].style.display = "none";
    dots[step].className = dots[step].className.replace(" focus", "");
  }
  slides[slideIndex].style.display = "block";
  dots[slideIndex].className += " focus";
  startTimeout();
}
//display a specific slide
function displaySlide(n) {
  slideIndex = n;
  showSlides();
}
//switch to the next/previous slide
function switchSlides(n) {
  slideIndex += n;
  if (slideIndex > 2) { slideIndex = 0 }
  else if (slideIndex < 0) { slideIndex = 2 }
  showSlides();
}
//show the next slide
function nextSlides() {
  switchSlides(1);
} 
/*-------------------------------------get ready infomation collumns------------------------------------- */
//open a section
function openInfo(index) {
  var sectionInfo = document.getElementsByClassName("section-info");
  if (sectionInfo[index].className === "section-info") {
    sectionInfo[index].className += " open";
    sectionInfo[index].style.display = "block";
  } else {
    sectionInfo[index].className = "section-info";
    sectionInfo[index].style.display = "none";
  }
}
//expand all sections
function expandAll() {
  var sectionInfo = document.getElementsByClassName("section-info");
  for (let step = 0; step < sectionInfo.length; step++) {
    sectionInfo[step].className += " open";
    sectionInfo[step].style.display = "block";
  }
}
//collapse all sections
function collapseAll() {
  var sectionInfo = document.getElementsByClassName("section-info");
  for (let step = 0; step < sectionInfo.length; step++) {
    if (sectionInfo[step].className !== "section-info") {
      sectionInfo[step].className = "section-info";
      sectionInfo[step].style.display = "none";
    }
  }
}
/*----------------------------------save message subject from link----------------------------------- */
//get meessage subject from a project link
function getSubject(index) {
  localStorage.setItem("subjectIndex", index);
  window.open("ContactUs.html");
}
//edit message subject every time reload contact page
function editSubject() {
  var subjectIndex = localStorage.getItem("subjectIndex");
  var placeHolder = document.getElementById("message-subject");
  if (subjectIndex == 1) {
    placeHolder.placeholder = "Subject / Waste To Love"
  } else if (subjectIndex == 2) {
    placeHolder.placeholder = "Subject / Beautiful City"
  } else if (subjectIndex == 3) {
    placeHolder.placeholder = "Subject / Light To The Future"
  } else {
    placeHolder.placeholder = "Subject"
    placeHolder.className = placeHolder.className.replace(" adjusted", "");
  }
  if (subjectIndex == 1 || subjectIndex == 2 || subjectIndex == 3) {
    placeHolder.className += " adjusted";
  }
  localStorage.setItem("subjectIndex", 0);
  toTopWhenReload();
}
/*---------------------------------display the selected project information-----------------------------*/ 
//get project index
function displayProject(index) {
  localStorage.setItem("aProjectIndex", index);
  window.open("ProjectsInfo.html","_self");
}
//scroll down to project information
function showProjectInfo() {
  if (localStorage.getItem("aProjectIndex") != -1) {
    var aProject = document.getElementsByClassName("a-project");
    aProject[localStorage.getItem("aProjectIndex")].scrollIntoView();
    window.scrollBy(0, -80);
    localStorage.setItem("aProjectIndex", -1);
  } 
  toTopWhenReload();
}
