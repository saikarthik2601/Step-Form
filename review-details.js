// Redirect to edit pages
function editPage(page) {
    window.location.href = page;
}

/* ---------- PERSONAL INFO ---------- */
const personal = JSON.parse(localStorage.getItem("personalInfo")) || {};

document.getElementById("r_name").textContent =
    personal.firstName ? `${personal.firstName} ${personal.lastName || ""}` : "-";
document.getElementById("r_gender").textContent = personal.gender || "-";
document.getElementById("r_dob").textContent = personal.dob || "-";
document.getElementById("r_contact").textContent = personal.mobile ||  "-";
document.getElementById("r_email").textContent = personal.email || personal.emailAddress || personal.userEmail || "-";
document.getElementById("r_address").textContent =
    personal.currentAddress ? `${personal.currentAddress}, ${personal.city || ""}` : "-";

/* ---------- EDUCATION ---------- */
const education = JSON.parse(localStorage.getItem("educationInfo")) || {};

document.getElementById("r_qualification").textContent =
    education.qualification || "-";

document.getElementById("r_academic").textContent =
    `${education.course || ""}, ${education.branch || ""}, ${education.college || ""}` || "-";

/* ---------- EXPERIENCE ---------- */
const experience = JSON.parse(localStorage.getItem("experienceInfo")) || {};
const experienceBlock = document.getElementById("experienceBlock");

// Clear first
experienceBlock.innerHTML = "";

/* ---- FRESHER ---- */
if (experience.experienceStatus === "fresher") {
    experienceBlock.innerHTML = `
        <p><strong>Status:</strong> Fresher</p>
        <p><strong>Internship:</strong> ${experience.internshipStatus || "Yes"}</p>
        <p><strong>Internship Company:</strong> ${experience.internshipCompany || "N/A"}</p>
        <p><strong>Internship Duration:</strong> ${experience.internshipDuration || "N/A"}</p>
    `;
}

/* ---- EXPERIENCED ---- */
else if (experience.experienceStatus === "experienced") {
    experienceBlock.innerHTML = `
        <p><strong>Status:</strong> Experienced</p>
        <p><strong>Company:</strong> ${experience.companyName || "-"}</p>
        <p><strong>Role:</strong> ${experience.jobTitle || "-"}</p>
        <p><strong>Total Experience:</strong> ${experience.totalExperience || "-"}</p>
        <p><strong>Last CTC:</strong> ${experience.lastCTC || "-"}</p>
    `;
}

/* ---- NO DATA ---- */
else {
    experienceBlock.innerHTML = `<p>No experience details available</p>`;
}
