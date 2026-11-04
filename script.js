// GROUP 11 | PROJECT #39 | WEDDING INVITATION PAGE

// Mobile navigation: open and close the menu on small screens.
const menuToggle = document.getElementById("menuToggle");
const navigation = document.getElementById("navigation");

menuToggle.addEventListener("click", function () {
  const isOpen = navigation.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", isOpen);
});

navigation.querySelectorAll("a").forEach(function (link) {
  link.addEventListener("click", function () {
    navigation.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

// Gallery modal: show a larger version of the selected photograph.
const galleryItems = document.querySelectorAll(".gallery-item");
const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const lightboxClose = document.getElementById("lightboxClose");

galleryItems.forEach(function (item) {
  item.addEventListener("click", function () {
    lightboxImage.src = item.dataset.full;
    lightboxImage.alt = item.querySelector("img").alt;
    lightbox.classList.add("open");
    lightbox.setAttribute("aria-hidden", "false");
  });
});

function closeLightbox() {
  lightbox.classList.remove("open");
  lightbox.setAttribute("aria-hidden", "true");
  lightboxImage.src = "";
}

lightboxClose.addEventListener("click", closeLightbox);
lightbox.addEventListener("click", function (event) {
  if (event.target === lightbox) closeLightbox();
});
document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") closeLightbox();
});

// RSVP form: validate each required field before showing confirmation.
const rsvpForm = document.getElementById("rsvpForm");
const formStatus = document.getElementById("formStatus");

rsvpForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const name = document.getElementById("guestName").value.trim();
  const email = document.getElementById("guestEmail").value.trim();
  const attendance = document.getElementById("attendance").value;
  const guests = document.getElementById("guests").value;

  // Clear old messages before checking the new submission.
  document.querySelectorAll(".error").forEach(function (message) {
    message.textContent = "";
  });
  formStatus.textContent = "";

  let isValid = true;
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (name.length < 2) {
    document.getElementById("nameError").textContent = "Please enter a name with at least 2 characters.";
    isValid = false;
  }
  if (!emailPattern.test(email)) {
    document.getElementById("emailError").textContent = "Please enter a valid email address.";
    isValid = false;
  }
  if (attendance === "") {
    document.getElementById("attendanceError").textContent = "Please choose your response.";
    isValid = false;
  }
  if (guests === "") {
    document.getElementById("guestsError").textContent = "Please select the number of guests.";
    isValid = false;
  }

  if (isValid) {
    const guestMessage = attendance === "joyfully-attending"
      ? "We look forward to celebrating with you!"
      : "Thank you for letting us know. You will be missed!";
    formStatus.textContent = "Thank you, " + name + "! " + guestMessage;
    rsvpForm.reset();
  }
});
