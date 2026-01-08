const experienceStatus = document.getElementById("experienceStatus");
const experiencedSection = document.getElementById("experiencedSection");
const fresherSection = document.getElementById("fresherSection");
const internshipStatus = document.getElementById("internshipStatus");
const internshipDetails = document.getElementById("internshipDetails");
const startDate = document.getElementById("startDate");
const endDate = document.getElementById("endDate");
const totalExperience = document.getElementById("totalExperience");
const form = document.getElementById("experienceForm");

experienceStatus.addEventListener("change", () => {
    experiencedSection.style.display = "none";
    fresherSection.style.display = "none";

    if (experienceStatus.value === "experienced") {
        experiencedSection.style.display = "block";
    } else if (experienceStatus.value === "fresher") {
        fresherSection.style.display = "block";
    }
});

internshipStatus.addEventListener("change", () => {
    internshipDetails.style.display = internshipStatus.value === "yes" ? "block" : "none";
});

function calculateExperience() {
    if (startDate.value && endDate.value) {
        const start = new Date(startDate.value);
        const end = new Date(endDate.value);
        let years = end.getFullYear() - start.getFullYear();
        if (
            end.getMonth() < start.getMonth() ||
            (end.getMonth() === start.getMonth() && end.getDate() < start.getDate())
        ) years--;
        totalExperience.value = years + " Years";
    }
}

startDate.addEventListener("change", calculateExperience);
endDate.addEventListener("change", calculateExperience);

function showError(input) {
    input.classList.add("error");
    input.nextElementSibling.textContent = "You have missed this field";
}

function clearErrors() {
    document.querySelectorAll(".error").forEach(e => e.classList.remove("error"));
    document.querySelectorAll(".error-msg").forEach(e => e.textContent = "");
}

form.addEventListener("submit", e => {
    e.preventDefault();
    clearErrors();

    let valid = true;

    if (!experienceStatus.value) {
        showError(experienceStatus);
        valid = false;
    }

    if (experienceStatus.value === "experienced") {
        const required = [
            "companyName", "jobTitle", "employeeType",
            "startDate", "endDate", "lastCTC", "reasonForLeaving"
        ];

        required.forEach(id => {
            const field = document.getElementById(id);
            if (!field.value.trim()) {
                showError(field);
                valid = false;
            }
        });
    }

    if (experienceStatus.value === "fresher") {
        if (!internshipStatus.value) {
            showError(internshipStatus);
            valid = false;
        }

        if (internshipStatus.value === "yes") {
            ["internshipCompany", "internshipDuration"].forEach(id => {
                const field = document.getElementById(id);
                if (!field.value.trim()) {
                    showError(field);
                    valid = false;
                }
            });
        }
    }

    if (valid) {
        let experienceData = {
            experienceStatus: experienceStatus.value 
        };

        if (experienceStatus.value === "experienced") {
            experienceData.companyName = companyName.value;
            experienceData.role = jobTitle.value;            
            experienceData.duration = totalExperience.value; 
            experienceData.ctc = lastCTC.value;              
        }

        if (experienceStatus.value === "fresher") {
            experienceData.internshipCompany = internshipCompany?.value || "";
            experienceData.internshipDuration = internshipDuration?.value || "";
        }

        localStorage.setItem("experienceInfo", JSON.stringify(experienceData));

        alert("Experience details saved successfully!");
        window.location.href = "review-details.html";
    }

    window.addEventListener("DOMContentLoaded", () => {
        const exp = JSON.parse(localStorage.getItem("experienceInfo"));
        if (!exp) return;

        experienceStatus.value = exp.experienceStatus || "";

        experienceStatus.dispatchEvent(new Event("change"));

        if (exp.experienceStatus === "experienced") {
            companyName.value = exp.companyName || "";
            jobTitle.value = exp.jobTitle || "";
            totalExperience.value = exp.totalExperience || "";
            lastCTC.value = exp.lastCTC || "";
        }

        if (exp.experienceStatus === "fresher") {
            internshipStatus.value = exp.internshipStatus || "";
            internshipStatus.dispatchEvent(new Event("change"));

            internshipCompany.value = exp.internshipCompany || "";
            internshipDuration.value = exp.internshipDuration || "";
        }
    });

});

