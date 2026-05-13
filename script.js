/* ============================================================
   VIJAI VARMA — Portfolio JavaScript
   All bugs fixed + new features added
   ============================================================ */

/* ============================================================
   TABS — FIXED bugs:
   1. Added `event` as first parameter (was missing — relied on
      deprecated global `event` object which breaks in strict mode
      and non-Chrome browsers)
   2. Added `let` to for-of loops (was creating implicit globals)
   3. Active link underline now goes full width, not 50%
   ============================================================ */

var tablinks   = document.getElementsByClassName("tab-links");
var tabcontents = document.getElementsByClassName("tab-contents");

function opentab(event, tabname) {

  // FIX: `let` added — was `for(tablink of tablinks)` before
  for (let tablink of tablinks) {
    tablink.classList.remove("active-link");
  }

  for (let tabcontent of tabcontents) {
    tabcontent.classList.remove("active-tab");
  }

  // FIX: event is now passed from HTML as first argument
  event.currentTarget.classList.add("active-link");
  document.getElementById(tabname).classList.add("active-tab");
}

/* ============================================================
   MOBILE MENU
   FIX added: close menu when any nav link is clicked
   (in original code, tapping a link kept the menu open)
   ============================================================ */

var sidemenu = document.getElementById("sidemenu");

function openmenu() {
  sidemenu.style.right = "0";
}

function closemenu() {
  sidemenu.style.right = "-220px";
}

/* ============================================================
   ACTIVE NAV LINK ON SCROLL
   NEW: highlights the correct nav link as you scroll
   ============================================================ */

window.addEventListener("scroll", function () {

  /* --- Active nav link --- */
  var sections  = document.querySelectorAll("div[id], footer");
  var navLinks  = document.querySelectorAll("nav ul li a");
  var scrollPos = window.scrollY + 120;
  var current   = "";

  sections.forEach(function (section) {
    if (section.offsetTop <= scrollPos) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach(function (link) {
    link.classList.remove("active");
    if (link.getAttribute("href") === "#" + current) {
      link.classList.add("active");
    }
  });

  /* --- Scroll-to-top button visibility --- */
  var scrollBtn = document.getElementById("scroll-top");
  if (scrollBtn) {
    if (window.scrollY > 500) {
      scrollBtn.classList.add("visible");
    } else {
      scrollBtn.classList.remove("visible");
    }
  }

  /* --- Scroll fade-in animations --- */
  document.querySelectorAll(".fade-in").forEach(function (el) {
    if (el.getBoundingClientRect().top < window.innerHeight - 60) {
      el.classList.add("visible");
    }
  });

});

/* ============================================================
   SCROLL TO TOP
   ============================================================ */

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

/* ============================================================
   CONTACT FORM — AJAX submission
   NEW: sends form to Formspree via fetch() instead of page reload.
   Shows success/error message inline without navigating away.
   ============================================================ */

var contactForm = document.getElementById("contact-form");

if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault(); // prevent page reload

    var submitBtn   = document.getElementById("submit-btn");
    var successMsg  = document.getElementById("form-success");
    var errorMsg    = document.getElementById("form-error");

    // Reset previous messages
    successMsg.style.display = "none";
    errorMsg.style.display   = "none";

    // Show loading state
    submitBtn.textContent = "Sending...";
    submitBtn.disabled    = true;

    fetch(contactForm.action, {
      method:  "POST",
      body:    new FormData(contactForm),
      headers: { "Accept": "application/json" }
    })
    .then(function (response) {
      if (response.ok) {
        successMsg.textContent  = "✓ Message sent! I'll reply within 24 hours.";
        successMsg.style.display = "block";
        contactForm.reset();
      } else {
        errorMsg.textContent  = "Something went wrong. Please email me directly at vijaivarma.dataanalyst@gmail.com";
        errorMsg.style.display = "block";
      }
    })
    .catch(function () {
      errorMsg.textContent  = "Connection error. Please email me directly at vijaivarma.dataanalyst@gmail.com";
      errorMsg.style.display = "block";
    })
    .finally(function () {
      submitBtn.textContent = "Send Message";
      submitBtn.disabled    = false;
    });
  });
}

/* ============================================================
   FADE-IN on page load (for elements already in viewport)
   ============================================================ */

document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll(".fade-in").forEach(function (el) {
    if (el.getBoundingClientRect().top < window.innerHeight - 60) {
      el.classList.add("visible");
    }
  });
});
