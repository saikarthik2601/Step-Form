document.addEventListener("DOMContentLoaded", function () {

  const form = document.getElementById("personalForm");
  const currentAddress = document.getElementById("currentAddress");
  const permanentAddress = document.getElementById("permanentAddress");
  const sameAddress = document.getElementById("sameAddress");

  /* ===============================
     REAL-TIME ADDRESS SYNC
  ================================ */
  sameAddress.addEventListener("change", function () {
    if (this.checked) {
      permanentAddress.value = currentAddress.value;
      permanentAddress.readOnly = true;
    } else {
      permanentAddress.value = "";
      permanentAddress.readOnly = false;
    }
  });

  currentAddress.addEventListener("input", function () {
    if (sameAddress.checked) {
      permanentAddress.value = currentAddress.value;
    }
  });

  /* ===============================
     FORM SUBMIT VALIDATION & SAVE
  ================================ */
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    clearErrors();

    let isValid = true;

    const fullName = document.getElementById("fullName");
    const dob = document.getElementById("dob");
    const mobile = document.getElementById("mobile");
    const email = document.getElementById("email");
    const emergencyName = document.getElementById("emergencyName");
    const relationship = document.getElementById("relationship");
    const emergencyMobile = document.getElementById("emergencyMobile");

    /* --- VALIDATIONS --- */
    if (!/^[A-Za-z ]{2,}$/.test(fullName.value.trim())) {
      showError(fullName, "Enter a valid full name");
      isValid = false;
    }

    if (!dob.value || calculateAge(dob.value) < 18) {
      showError(dob, "Age must be 18 or above");
      isValid = false;
    }

    if (!document.querySelector('input[name="gender"]:checked')) {
      showRadioError("Please select gender");
      isValid = false;
    }

    if (!/^\d{10}$/.test(mobile.value)) {
      showError(mobile, "Enter valid 10-digit mobile number");
      isValid = false;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
      showError(email, "Enter valid email address");
      isValid = false;
    }

    if (currentAddress.value.trim().length < 10) {
      showError(currentAddress, "Enter current address");
      isValid = false;
    }

    if (!sameAddress.checked && permanentAddress.value.trim().length < 10) {
      showError(permanentAddress, "Enter permanent address");
      isValid = false;
    }

    if (!/^[A-Za-z ]+$/.test(emergencyName.value)) {
      showError(emergencyName, "Enter emergency contact name");
      isValid = false;
    }

    if (!relationship.value) {
      showError(relationship, "Select relationship");
      isValid = false;
    }

    if (!/^\d{10}$/.test(emergencyMobile.value)) {
      showError(emergencyMobile, "Enter valid emergency number");
      isValid = false;
    }

    /* --- SAVE TO localStorage IF VALID --- */
    if (isValid) {
      const page1Data = {
        fullName: fullName.value.trim(),
        dob: dob.value,
        gender: document.querySelector('input[name="gender"]:checked').value,
        mobile: mobile.value.trim(),
        email: email.value.trim(),
        currentAddress: currentAddress.value.trim(),
        permanentAddress: permanentAddress.value.trim(),
        sameAddress: sameAddress.checked,
        emergencyName: emergencyName.value.trim(),
        relationship: relationship.value,
        emergencyMobile: emergencyMobile.value.trim()
      };

      localStorage.setItem("employeePage1", JSON.stringify(page1Data));

      /* ===============================
         🔥 AUTO REDIRECT LOGIC (ADDED)
      ================================ */
      const editMode = localStorage.getItem("editMode");

      if (editMode === "true") {
        localStorage.removeItem("editMode"); // clean up
        window.location.href = "review-details.html";
      } else {
        window.location.href = "education-info.html";
      }
    }
  });

});

/* ===============================
   UTIL FUNCTIONS
================================ */
function showError(input, message) {
  input.classList.add("error-border");
  input.nextElementSibling.textContent = message;
}

function clearErrors() {
  document.querySelectorAll(".error").forEach(e => e.textContent = "");
  document.querySelectorAll(".error-border").forEach(e => e.classList.remove("error-border"));
}

function calculateAge(dob) {
  const birthDate = new Date(dob);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) age--;
  return age;
}

function showRadioError(message) {
  document.querySelector(".radio-group")
    .parentElement
    .querySelector(".error").textContent = message;
}
