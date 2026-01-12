document.addEventListener("DOMContentLoaded", function () {

  const form = document.getElementById("educationForm");

  /* --- DOM References --- */
  const qualification = document.getElementById("qualification");
  const stream = document.getElementById("stream");
  const passingYear = document.getElementById("passingYear");
  const percentage = document.getElementById("percentage");

  const college = document.getElementById("college");
  const courseName = document.getElementById("courseName");
  const gradPassingYear = document.getElementById("gradPassingYear");
  const gradPercentage = document.getElementById("gradPercentage");

  const certName = document.getElementById("certName");
  const instName = document.getElementById("instName");
  const certYear = document.getElementById("certYear");

  const currentYear = new Date().getFullYear();

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    clearErrors();

    let isValid = true;

    /* --- HIGHEST QUALIFICATION VALIDATION --- */
    if (!qualification.value) {
      showError(qualification, "Select your qualification");
      isValid = false;
    }

    if ((qualification.value === "Graduation" || qualification.value === "Post-Graduation") && stream.value.trim().length < 2) {
      showError(stream, "Enter your stream / field");
      isValid = false;
    }

    if (!passingYear.value || passingYear.value < 1900 || passingYear.value > currentYear) {
      showError(passingYear, "Enter valid passing year");
      isValid = false;
    }

    if (!percentage.value || isNaN(percentage.value) || percentage.value < 0 || percentage.value > 100) {
      showError(percentage, "Enter valid percentage / CGPA");
      isValid = false;
    }

    /* --- GRADUATION / POST-GRADUATION VALIDATION --- */
    if (college.value.trim().length < 2) {
      showError(college, "Enter college / university name");
      isValid = false;
    }

    if (courseName.value.trim().length < 2) {
      showError(courseName, "Enter course name");
      isValid = false;
    }

    if (!gradPassingYear.value || gradPassingYear.value < 1900 || gradPassingYear.value > currentYear) {
      showError(gradPassingYear, "Enter valid graduation passing year");
      isValid = false;
    }

    if (!gradPercentage.value || isNaN(gradPercentage.value) || gradPercentage.value < 0 || gradPercentage.value > 100) {
      showError(gradPercentage, "Enter valid graduation percentage / CGPA");
      isValid = false;
    }

    /* --- CERTIFICATIONS OPTIONAL --- */
    if (certName.value.trim().length > 0 && instName.value.trim().length === 0) {
      showError(instName, "Enter institute for certification");
      isValid = false;
    }

    if (certYear.value && (certYear.value < 1900 || certYear.value > currentYear)) {
      showError(certYear, "Enter valid certification year");
      isValid = false;
    }

    /* --- SAVE TO localStorage IF VALID --- */
    if (isValid) {
      const page2Data = {
        qualification: qualification.value,
        stream: stream.value.trim(),
        passingYear: passingYear.value,
        percentage: percentage.value,
        college: college.value.trim(),
        courseName: courseName.value.trim(),
        gradPassingYear: gradPassingYear.value,
        gradPercentage: gradPercentage.value,
        certifications: [
          {
            name: certName.value.trim(),
            institute: instName.value.trim(),
            year: certYear.value
          }
        ]
      };

      localStorage.setItem("employeePage2", JSON.stringify(page2Data));
      alert("Page 2 validated and saved successfully!");
      window.location.href = "experience-info.html";
    }

  });

});

/* --- UTIL FUNCTIONS --- */
function showError(input, message) {
  input.classList.add("error-border");
  const nextEl = input.nextElementSibling;
  if (nextEl) nextEl.textContent = message;
}

function clearErrors() {
  document.querySelectorAll(".error").forEach(e => e.textContent = "");
  document.querySelectorAll(".error-border").forEach(e => e.classList.remove("error-border"));
}
