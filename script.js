console.log("JavaScript is connected"); 
// prints to browser console

const form = document.getElementById("myForm"); // finds element with id="myForm"
const errorContainer = document.getElementById("errorContainer");
const successContainer = document.getElementById("successContainer");

function markInvalid(fieldId) {
    document.getElementById(fieldId).classList.add("invalid"); // adds css class invalid to the element
}

function clearInvalid() {
    const invalidFields = document.querySelectorAll(".invalid"); // finds all elements with class invalid
    invalidFields.forEach(function(field) {
        field.classList.remove("invalid"); // removes css class invalid from the element
    });
}

// event listener for form submission
// "submit" is the event type
// function(event) is an anonymous founction that runs when event fires, can be function(e) or function(event) etc. 
form.addEventListener("submit", function(event) {
    event.preventDefault(); // prevents form from actually submitting & refreshing 
    
    errorContainer.innerHTML = "";
    errorContainer.style.display = "none";
    clearInvalid(); // clear any previous invalid states

    const errors = [];

    const firstName = document.getElementById("firstName").value; // gets value of firstName input
    const lastName = document.getElementById("lastName").value;
    const email = document.getElementById("email").value;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (firstName.trim() === "") {
        errors.push("First name is required");
        markInvalid("firstName");
    }
    if (lastName.trim() === "") {
        errors.push("Last name is required");
        markInvalid("lastName");
    }
    if (email.trim() === "" || !emailPattern.test(email)) {
        errors.push("Email is required and must be a valid email address");
        markInvalid("email");
    }

    console.log("Errors found:", errors);

    if (errors.length > 0) {
        let errorHTML = "<ul>"; // use let when you want to reassign the value
        for (let i = 0; i < errors.length; i++) {
            errorHTML += "<li>" + errors[i] + "</li>";
        }
        errorHTML += "</ul>";

        errorContainer.innerHTML = errorHTML; // take what's in errorHTML and put it in errorContainer
        errorContainer.style.display = "block";
        return;
    }

    const formData = new FormData(form); // built in browser function that grabs all values from every input field
    const data = [];
    formData.forEach(function(value, key) {
        data[key] = value;
    });

    // Build success message
    let successHTML = "<h3>✅ Registration Submitted!</h3>";
    successHTML += "<p><strong>Name:</strong> " + data.firstName + " " + data.lastName + "</p>";
    successHTML += "<p><strong>Email:</strong> " + data.email + "</p>";
    successHTML += "<p><strong>Phone:</strong> " + (data.phone || "Not provided") + "</p>";
    
    // Show success, hide form
    successContainer.innerHTML = successHTML;
    successContainer.style.display = "block";
    form.style.display = "none";  // Hide the form after success
});