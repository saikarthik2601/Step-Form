const form = document.getElementById("personalForm");
const dob = document.getElementById("dob");
const age = document.getElementById("age");
const email = document.getElementById("email");

dob.addEventListener("change", () => {
    const birthDate = new Date(dob.value);
    const today = new Date();
    let a = today.getFullYear() - birthDate.getFullYear();
    if (
        today.getMonth() < birthDate.getMonth() ||
        (today.getMonth() === birthDate.getMonth() && today.getDate() < birthDate.getDate())
    ) a--;
    age.value = a;
});

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

    const requiredFields = [
        "firstName", "gender", "dob", "mobile",
        "currentAddress", "permanentAddress",
        "city", "state", "pincode", "country"
    ];

    requiredFields.forEach(id => {
        const field = document.getElementById(id);
        if (!field.value.trim()) {
            showError(field, "You have missed this field");
            valid = false;
        }
    });

    if (!/^\d{10}$/.test(mobile.value)) {
        showError(mobile, "Enter valid 10-digit number");
        valid = false;
    }

    if (valid) {
        localStorage.setItem("personalInfo", JSON.stringify({
            firstName: firstName.value,
            gender: gender.value,
            dob: dob.value,
            age: age.value,
            mobile: mobile.value,
            email: email.value,
            currentAddress: currentAddress.value,
            permanentAddress: permanentAddress.value,
            city: city.value,
            state: state.value,
            pincode: pincode.value,
            country: country.value
        }));

        window.location.href = "education-info.html"
    }

    window.addEventListener("DOMContentLoaded", () => {
        const saved = JSON.parse(localStorage.getItem("personalInfo"));
        if (!saved) return;

        document.getElementById("firstName").value = saved.firstName || "";
        document.getElementById("lastName").value = saved.lastName || "";
        document.getElementById("gender").value = saved.gender || "";
        document.getElementById("dob").value = saved.dob || "";
        document.getElementById("mobile").value = saved.mobile || "";
        document.getElementById("email").value = saved.email || "";
        document.getElementById("currentAddress").value = saved.currentAddress || "";
        document.getElementById("city").value = saved.city || "";
    });

});
