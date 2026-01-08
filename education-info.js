document.addEventListener("DOMContentLoaded", () => {

    const form = document.getElementById("educationForm");

    function showError(input, message) {
        input.classList.add("error");
        input.nextElementSibling.textContent = message;
    }

    function clearErrors() {
        document.querySelectorAll(".error").forEach(el => el.classList.remove("error"));
        document.querySelectorAll(".error-msg").forEach(el => el.textContent = "");
    }

    form.addEventListener("submit", e => {
        e.preventDefault();
        clearErrors();

        let valid = true;

        const fields = {
            qualification: document.getElementById("qualification"),
            course: document.getElementById("course"),
            branch: document.getElementById("branch"),
            institutionName: document.getElementById("institutionName"),
            yearOfPass: document.getElementById("yearOfPass"),
            percentage: document.getElementById("percentage")
        };

        Object.entries(fields).forEach(([key, field]) => {
            if (!field.value.trim()) {
                showError(field, "You have missed this field");
                valid = false;
            }
        });

        if (valid) {
            localStorage.setItem("educationInfo", JSON.stringify({
                qualification: fields.qualification.value,
                course: fields.course.value,
                branch: fields.branch.value,
                institutionName: fields.institutionName.value,
                yearOfPass: fields.yearOfPass.value,
                percentage: fields.percentage.value
            }));

            alert("Education details saved successfully!");
            window.location.href = "experience-info.html";
        }
    });

    window.addEventListener("DOMContentLoaded", () => {
        const edu = JSON.parse(localStorage.getItem("educationInfo"));
        if (!edu) return;

        document.getElementById("qualification").value = edu.qualification || "";
        document.getElementById("course").value = edu.course || "";
        document.getElementById("branch").value = edu.branch || "";
        document.getElementById("college").value = edu.college || "";
    });


});
