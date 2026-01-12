document.addEventListener("DOMContentLoaded", function () {

  // Sections
  const personalSection = document.getElementById("personalSection");
  const educationSection = document.getElementById("educationSection");
  const experienceSection = document.getElementById("experienceSection");

  // Load data from localStorage
  const page1 = JSON.parse(localStorage.getItem("employeePage1")) || {};
  const page2 = JSON.parse(localStorage.getItem("employeePage2")) || {};
  const page3 = JSON.parse(localStorage.getItem("employeePage3")) || {};

  function renderSections() {
    // Personal
    personalSection.innerHTML = `
      <div><strong>Full Name:</strong> ${page1.fullName || ""}</div>
      <div><strong>DOB:</strong> ${page1.dob || ""}</div>
      <div><strong>Gender:</strong> ${page1.gender || ""}</div>
      <div><strong>Mobile:</strong> ${page1.mobile || ""}</div>
      <div><strong>Email:</strong> ${page1.email || ""}</div>
      <div><strong>Current Address:</strong> ${page1.currentAddress || ""}</div>
      <div><strong>Permanent Address:</strong> ${page1.permanentAddress || ""}</div>
      <div><strong>Emergency Name:</strong> ${page1.emergencyName || ""}</div>
      <div><strong>Relationship:</strong> ${page1.relationship || ""}</div>
      <div><strong>Emergency Mobile:</strong> ${page1.emergencyMobile || ""}</div>
    `;

    // Education
    educationSection.innerHTML = `
      <div><strong>Qualification:</strong> ${page2.qualification || ""}</div>
      <div><strong>Stream:</strong> ${page2.stream || ""}</div>
      <div><strong>Passing Year:</strong> ${page2.passingYear || ""}</div>
      <div><strong>Percentage/CGPA:</strong> ${page2.percentage || ""}</div>
      <div><strong>College:</strong> ${page2.college || ""}</div>
      <div><strong>Course:</strong> ${page2.courseName || ""}</div>
      <div><strong>Grad Passing Year:</strong> ${page2.gradPassingYear || ""}</div>
      <div><strong>Grad Percentage:</strong> ${page2.gradPercentage || ""}</div>
      ${page2.certifications && page2.certifications[0] && page2.certifications[0].name ? `
        <div><strong>Certification:</strong> ${page2.certifications[0].name} (${page2.certifications[0].institute || ""}, ${page2.certifications[0].year || ""})</div>
      ` : ""}
    `;

    // Experience
    experienceSection.innerHTML = `
      <div><strong>Experienced:</strong> ${page3.experienced || ""}</div>
      ${page3.experienced === "Yes" ? `
        <div><strong>Company:</strong> ${page3.experience.companyName || ""}</div>
        <div><strong>Job Title:</strong> ${page3.experience.jobTitle || ""}</div>
        <div><strong>Start Date:</strong> ${page3.experience.startDate || ""}</div>
        <div><strong>End Date:</strong> ${page3.experience.endDate || ""}</div>
        <div><strong>Responsibilities:</strong> ${page3.experience.responsibilities || ""}</div>
      ` : ""}
      ${page3.experienced === "No" && page3.internshipCompleted === "Yes" ? `
        <div><strong>Internship Company:</strong> ${page3.internship.company || ""}</div>
        <div><strong>Role:</strong> ${page3.internship.role || ""}</div>
        <div><strong>Duration:</strong> ${page3.internship.duration || ""}</div>
      ` : ""}
    `;
  }

  renderSections();

  // Edit buttons
  document.querySelectorAll(".edit-btn").forEach(btn => {
    btn.addEventListener("click", function () {
      const section = this.dataset.section;
      if (section === "personal") {
        window.location.href = "index.html"; // Page 1
      } else if (section === "education") {
        window.location.href = "education-info.html"; // Page 2
      } else if (section === "experience") {
        window.location.href = "experience-info.html"; // Page 3
      }
    });
  });

  // Final Submit
  const reviewForm = document.getElementById("reviewForm");
  reviewForm.addEventListener("submit", function (e) {
    e.preventDefault();
    // Combine all data
    const finalData = {
      personal: page1,
      education: page2,
      experience: page3
    };
    console.log("Final Employee Data:", finalData);
    alert("Form submitted successfully! Check console for data.");
    // localStorage.clear();
  });

});
