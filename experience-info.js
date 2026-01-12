document.addEventListener("DOMContentLoaded", function () {

  const form = document.getElementById("experienceForm");

  const experienceRadios = document.getElementsByName("experienceStatus");
  const internshipRadios = document.getElementsByName("internshipStatus");

  const experienceDetails = document.getElementById("experienceDetails");
  const internshipDetails = document.getElementById("internshipDetails");
  const internshipSection = document.getElementById("internshipSection");

  // Experience Fields
  const companyName = document.getElementById("companyName");
  const jobTitle = document.getElementById("jobTitle");
  const startDate = document.getElementById("startDate");
  const endDate = document.getElementById("endDate");
  const responsibilities = document.getElementById("responsibilities");
  const currentlyWorking = document.getElementById("currentlyWorking");

  // Internship Fields
  const internCompany = document.getElementById("internCompany");
  const internRole = document.getElementById("internRole");
  const internDuration = document.getElementById("internDuration");

  const currentYear = new Date().getFullYear();

  // Show / Hide sections based on radio
  experienceRadios.forEach(radio => {
    radio.addEventListener("change", function () {
      if (this.value === "Yes") {
        experienceDetails.style.display = "block";
        internshipSection.style.display = "none";
        internshipDetails.style.display = "none";
      } else {
        experienceDetails.style.display = "none";
        internshipSection.style.display = "block";
      }
    });
  });

  internshipRadios.forEach(radio => {
    radio.addEventListener("change", function () {
      if (this.value === "Yes") {
        internshipDetails.style.display = "block";
      } else {
        internshipDetails.style.display = "none";
      }
    });
  });

  // Currently Working Checkbox
  currentlyWorking.addEventListener("change", function () {
    if (this.checked) {
      endDate.value = "";
      endDate.setAttribute("readonly", true);
    } else {
      endDate.removeAttribute("readonly");
    }
  });

  // FORM SUBMIT
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    clearErrors();

    let isValid = true;

    const experienceStatus = document.querySelector('input[name="experienceStatus"]:checked');
    const internshipStatus = document.querySelector('input[name="internshipStatus"]:checked');

    // Validate Experience Status
    if (!experienceStatus) {
      showErrorMessage(experienceRadios[0].parentElement.parentElement.querySelector(".error"), "Select your experience status");
      isValid = false;
    }

    // Experienced Validation
    if (experienceStatus && experienceStatus.value === "Yes") {
      if (companyName.value.trim().length < 2) { showError(companyName, "Enter company name"); isValid = false; }
      if (jobTitle.value.trim().length < 2) { showError(jobTitle, "Enter job title"); isValid = false; }
      if (!startDate.value) { showError(startDate, "Select start date"); isValid = false; }
      if (!endDate.value && !currentlyWorking.checked) { showError(endDate, "Select end date"); isValid = false; }
      if (startDate.value && endDate.value && new Date(startDate.value) > new Date(endDate.value)) {
        showError(endDate, "End date must be after start date"); isValid = false;
      }
      if (responsibilities.value.trim().length < 5) { showError(responsibilities, "Enter responsibilities"); isValid = false; }
    }

    // Internship Validation (if Fresher)
    if (experienceStatus && experienceStatus.value === "No" && internshipStatus && internshipStatus.value === "Yes") {
      if (internCompany.value.trim().length < 2) { showError(internCompany, "Enter internship company"); isValid = false; }
      if (internRole.value.trim().length < 2) { showError(internRole, "Enter internship role"); isValid = false; }
      if (internDuration.value.trim().length < 2) { showError(internDuration, "Enter internship duration"); isValid = false; }
    }

    // Save to localStorage if valid
    if (isValid) {
      const page3Data = {
        experienced: experienceStatus.value,
        internshipCompleted: internshipStatus ? internshipStatus.value : null,
        experience: {
          companyName: companyName.value.trim(),
          jobTitle: jobTitle.value.trim(),
          startDate: startDate.value,
          endDate: currentlyWorking.checked ? "Present" : endDate.value,
          responsibilities: responsibilities.value.trim()
        },
        internship: {
          company: internCompany.value.trim(),
          role: internRole.value.trim(),
          duration: internDuration.value.trim()
        }
      };

      localStorage.setItem("employeePage3", JSON.stringify(page3Data));
      alert("Page 3 validated and saved successfully!");
      window.location.href = "review-details.html";
    }
  });

  /* --- UTIL FUNCTIONS --- */
  function showError(input, message) {
    input.classList.add("error-border");
    const nextEl = input.nextElementSibling;
    if (nextEl) nextEl.textContent = message;
  }

  function showErrorMessage(element, message) {
    element.textContent = message;
  }

  function clearErrors() {
    document.querySelectorAll(".error").forEach(e => e.textContent = "");
    document.querySelectorAll(".error-border").forEach(e => e.classList.remove("error-border"));
  }

});
