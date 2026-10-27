// ==========================================
// CHECKOUT FORM JAVASCRIPT
// ==========================================

const checkoutForm = document.getElementById("checkoutForm");

let currentStep = 1;


// ==========================================
// GET ELEMENTS
// ==========================================

const steps = document.querySelectorAll(".form-step");
const progressSteps = document.querySelectorAll(".step");


// ==========================================
// SHOW STEP
// ==========================================

function showStep(stepNumber) {

    currentStep = stepNumber;

    // Hide all form sections
    steps.forEach(step => {
        step.classList.remove("active");
    });

    // Show current section
    document
        .getElementById(`step${stepNumber}`)
        .classList.add("active");


    // Update progress bar
    progressSteps.forEach((step, index) => {

        const stepNumberValue = index + 1;

        step.classList.remove("active");
        step.classList.remove("completed");

        if (stepNumberValue === stepNumber) {
            step.classList.add("active");
        }

        if (stepNumberValue < stepNumber) {
            step.classList.add("completed");
        }

    });

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


// ==========================================
// CLEAR ERROR
// ==========================================

function clearError(inputId, errorId) {

    const input = document.getElementById(inputId);
    const error = document.getElementById(errorId);

    input.classList.remove("input-error");
    input.classList.add("input-success");

    error.textContent = "";
}


// ==========================================
// SHOW ERROR
// ==========================================

function showError(inputId, errorId, message) {

    const input = document.getElementById(inputId);
    const error = document.getElementById(errorId);

    input.classList.remove("input-success");
    input.classList.add("input-error");

    error.textContent = message;

}


// ==========================================
// VALIDATE REQUIRED FIELD
// ==========================================

function validateRequired(inputId, errorId, message) {

    const input = document.getElementById(inputId);

    if (input.value.trim() === "") {

        showError(
            inputId,
            errorId,
            message
        );

        return false;
    }

    clearError(inputId, errorId);

    return true;
}


// ==========================================
// BILLING VALIDATION
// ==========================================

function validateBilling() {

    let valid = true;


    if (
        !validateRequired(
            "firstName",
            "firstNameError",
            "First name is required."
        )
    ) {
        valid = false;
    }


    if (
        !validateRequired(
            "lastName",
            "lastNameError",
            "Last name is required."
        )
    ) {
        valid = false;
    }


    // Email validation
    const email = document.getElementById("email");

    const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email.value.trim())) {

        showError(
            "email",
            "emailError",
            "Enter a valid email address."
        );

        valid = false;

    } else {

        clearError(
            "email",
            "emailError"
        );
    }


    // Phone validation
    const phone = document.getElementById("phone");

    if (!/^[0-9]{10}$/.test(phone.value.trim())) {

        showError(
            "phone",
            "phoneError",
            "Enter a valid 10-digit phone number."
        );

        valid = false;

    } else {

        clearError(
            "phone",
            "phoneError"
        );
    }


    if (
        !validateRequired(
            "country",
            "countryError",
            "Please select your country."
        )
    ) {
        valid = false;
    }


    if (
        !validateRequired(
            "billingAddress",
            "billingAddressError",
            "Billing address is required."
        )
    ) {
        valid = false;
    }


    if (
        !validateRequired(
            "city",
            "cityError",
            "City is required."
        )
    ) {
        valid = false;
    }


    if (
        !validateRequired(
            "pincode",
            "pincodeError",
            "PIN / ZIP code is required."
        )
    ) {
        valid = false;
    }


    return valid;
}


// ==========================================
// SHIPPING VALIDATION
// ==========================================

function validateShipping() {

    let valid = true;


    if (
        !validateRequired(
            "shippingName",
            "shippingNameError",
            "Full name is required."
        )
    ) {
        valid = false;
    }


    const shippingPhone =
        document.getElementById("shippingPhone");

    if (
        !/^[0-9]{10}$/.test(
            shippingPhone.value.trim()
        )
    ) {

        showError(
            "shippingPhone",
            "shippingPhoneError",
            "Enter a valid 10-digit phone number."
        );

        valid = false;

    } else {

        clearError(
            "shippingPhone",
            "shippingPhoneError"
        );
    }


    if (
        !validateRequired(
            "shippingAddress",
            "shippingAddressError",
            "Shipping address is required."
        )
    ) {
        valid = false;
    }


    if (
        !validateRequired(
            "shippingCity",
            "shippingCityError",
            "City is required."
        )
    ) {
        valid = false;
    }


    if (
        !validateRequired(
            "shippingState",
            "shippingStateError",
            "State is required."
        )
    ) {
        valid = false;
    }


    if (
        !validateRequired(
            "shippingPincode",
            "shippingPincodeError",
            "PIN / ZIP code is required."
        )
    ) {
        valid = false;
    }


    return valid;
}


// ==========================================
// PAYMENT VALIDATION
// ==========================================

function validatePayment() {

    const selectedPayment =
        document.querySelector(
            'input[name="payment"]:checked'
        ).value;


    // CASH ON DELIVERY
    if (selectedPayment === "cod") {
        return true;
    }


    // UPI
    if (selectedPayment === "upi") {

        const upi =
            document.getElementById("upiId");

        const upiPattern =
            /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+$/;

        if (!upiPattern.test(upi.value.trim())) {

            showError(
                "upiId",
                "upiError",
                "Enter a valid UPI ID."
            );

            return false;
        }

        clearError(
            "upiId",
            "upiError"
        );

        return true;
    }


    // CARD
    let valid = true;


    if (
        !validateRequired(
            "cardName",
            "cardNameError",
            "Cardholder name is required."
        )
    ) {
        valid = false;
    }


    const cardNumber =
        document.getElementById("cardNumber");

    const cleanCardNumber =
        cardNumber.value.replace(/\s/g, "");

    if (!/^[0-9]{16}$/.test(cleanCardNumber)) {

        showError(
            "cardNumber",
            "cardNumberError",
            "Enter a valid 16-digit card number."
        );

        valid = false;

    } else {

        clearError(
            "cardNumber",
            "cardNumberError"
        );
    }


    const expiry =
        document.getElementById("expiry");

    if (
        !/^(0[1-9]|1[0-2])\/\d{2}$/.test(
            expiry.value.trim()
        )
    ) {

        showError(
            "expiry",
            "expiryError",
            "Use MM/YY format."
        );

        valid = false;

    } else {

        clearError(
            "expiry",
            "expiryError"
        );
    }


    const cvv =
        document.getElementById("cvv");

    if (!/^[0-9]{3}$/.test(cvv.value.trim())) {

        showError(
            "cvv",
            "cvvError",
            "CVV must contain 3 digits."
        );

        valid = false;

    } else {

        clearError(
            "cvv",
            "cvvError"
        );
    }


    return valid;
}


// ==========================================
// NEXT BUTTON CLICK EVENT
// ==========================================

document.querySelectorAll(".next-btn").forEach(button => {

    button.addEventListener("click", function () {

        const nextStep =
            Number(this.dataset.next);


        // Billing → Shipping
        if (currentStep === 1) {

            if (!validateBilling()) {

                alert(
                    "Please correct the billing information."
                );

                return;
            }
        }


        // Shipping → Payment
        if (currentStep === 2) {

            if (!validateShipping()) {

                alert(
                    "Please correct the shipping information."
                );

                return;
            }
        }


        // Payment → Review
        if (currentStep === 3) {

            if (!validatePayment()) {

                alert(
                    "Please correct the payment information."
                );

                return;
            }

            updateReview();
        }


        showStep(nextStep);

    });

});


// ==========================================
// PREVIOUS BUTTON CLICK EVENT
// ==========================================

document.querySelectorAll(".prev-btn").forEach(button => {

    button.addEventListener("click", function () {

        const previousStep =
            Number(this.dataset.prev);

        showStep(previousStep);

    });

});


// ==========================================
// PAYMENT CHANGE EVENT
// ==========================================

document
    .querySelectorAll('input[name="payment"]')
    .forEach(radio => {

        radio.addEventListener("change", function () {

            const cardPayment =
                document.getElementById("cardPayment");

            const upiPayment =
                document.getElementById("upiPayment");

            const codPayment =
                document.getElementById("codPayment");


            cardPayment.classList.add("hidden");
            upiPayment.classList.add("hidden");
            codPayment.classList.add("hidden");


            if (this.value === "card") {

                cardPayment.classList.remove("hidden");

            }

            else if (this.value === "upi") {

                upiPayment.classList.remove("hidden");

            }

            else if (this.value === "cod") {

                codPayment.classList.remove("hidden");

            }

        });

    });


// ==========================================
// SAME ADDRESS CHANGE EVENT
// ==========================================

document
    .getElementById("sameAddress")
    .addEventListener("change", function () {

        if (this.checked) {

            document.getElementById("shippingName").value =
                document.getElementById("firstName").value +
                " " +
                document.getElementById("lastName").value;

            document.getElementById("shippingPhone").value =
                document.getElementById("phone").value;

            document.getElementById("shippingAddress").value =
                document.getElementById("billingAddress").value;

            document.getElementById("shippingCity").value =
                document.getElementById("city").value;

            document.getElementById("shippingPincode").value =
                document.getElementById("pincode").value;

        }

    });


// ==========================================
// CARD NUMBER INPUT EVENT
// ==========================================

document
    .getElementById("cardNumber")
    .addEventListener("input", function () {

        let value =
            this.value.replace(/\D/g, "");

        value =
            value.substring(0, 16);

        let formatted = "";

        for (let i = 0; i < value.length; i++) {

            if (i > 0 && i % 4 === 0) {
                formatted += " ";
            }

            formatted += value[i];
        }

        this.value = formatted;

    });


// ==========================================
// EXPIRY INPUT EVENT
// ==========================================

document
    .getElementById("expiry")
    .addEventListener("input", function () {

        let value =
            this.value.replace(/\D/g, "");

        value =
            value.substring(0, 4);

        if (value.length >= 3) {

            value =
                value.substring(0, 2) +
                "/" +
                value.substring(2);

        }

        this.value = value;

    });


// ==========================================
// PHONE INPUT EVENT
// ==========================================

document
    .querySelectorAll('input[type="tel"]')
    .forEach(input => {

        input.addEventListener("input", function () {

            this.value =
                this.value.replace(/\D/g, "");

        });

    });


// ==========================================
// INPUT EVENT - REMOVE ERROR
// ==========================================

document
    .querySelectorAll("input, textarea, select")
    .forEach(input => {

        input.addEventListener("input", function () {

            this.classList.remove("input-error");

        });

        input.addEventListener("change", function () {

            this.classList.remove("input-error");

        });

    });


// ==========================================
// UPDATE REVIEW
// ==========================================

function updateReview() {

    const firstName =
        document.getElementById("firstName").value;

    const lastName =
        document.getElementById("lastName").value;

    const email =
        document.getElementById("email").value;

    const billingAddress =
        document.getElementById("billingAddress").value;

    const city =
        document.getElementById("city").value;

    const country =
        document.getElementById("country").value;


    document.getElementById("reviewBilling").innerHTML =
        `<strong>${firstName} ${lastName}</strong><br>
        ${email}<br>
        ${billingAddress}<br>
        ${city}, ${country}`;


    const shippingName =
        document.getElementById("shippingName").value;

    const shippingAddress =
        document.getElementById("shippingAddress").value;

    const shippingCity =
        document.getElementById("shippingCity").value;

    const shippingState =
        document.getElementById("shippingState").value;

    const shippingPincode =
        document.getElementById("shippingPincode").value;


    document.getElementById("reviewShipping").innerHTML =
        `<strong>${shippingName}</strong><br>
        ${shippingAddress}<br>
        ${shippingCity}, ${shippingState}<br>
        ${shippingPincode}`;


    const payment =
        document.querySelector(
            'input[name="payment"]:checked'
        ).value;


    let paymentText = "";

    if (payment === "card") {

        paymentText =
            "💳 Credit / Debit Card";

    }

    else if (payment === "upi") {

        paymentText =
            "📱 UPI";

    }

    else {

        paymentText =
            "💵 Cash on Delivery";

    }


    document.getElementById("reviewPayment").textContent =
        paymentText;


    // Update shipping price
    updateShippingCost();

}


// ==========================================
// SHIPPING COST CHANGE EVENT
// ==========================================

document
    .getElementById("delivery")
    .addEventListener("change", updateShippingCost);


function updateShippingCost() {

    const delivery =
        document.getElementById("delivery").value;

    let shippingCost = 50;

    if (delivery === "Express") {
        shippingCost = 150;
    }


    const productPrice = 1500;

    const total =
        productPrice + shippingCost;


    document.getElementById("shippingCost").textContent =
        `₹${shippingCost}`;

    document.getElementById("totalCost").textContent =
        `₹${total}`;

}


// ==========================================
// FORM SUBMIT EVENT
// ==========================================

checkoutForm.addEventListener("submit", function (event) {

    event.preventDefault();


    // Validate terms
    const terms =
        document.getElementById("terms");

    const termsError =
        document.getElementById("termsError");


    if (!terms.checked) {

        termsError.textContent =
            "You must accept the terms and conditions.";

        return;
    }


    termsError.textContent = "";


    // Generate order number
    const orderNumber =
        "ORD-" +
        Math.floor(
            100000 +
            Math.random() * 900000
        );


    document.getElementById("orderNumber").textContent =
        orderNumber;


    // Hide form
    checkoutForm.classList.add("hidden");

    document
        .querySelector(".progress-container")
        .classList.add("hidden");


    // Show success message
    document
        .getElementById("successMessage")
        .classList.remove("hidden");

});


// ==========================================
// NEW ORDER BUTTON CLICK EVENT
// ==========================================

document
    .getElementById("newOrderBtn")
    .addEventListener("click", function () {

        checkoutForm.reset();

        checkoutForm.classList.remove("hidden");

        document
            .querySelector(".progress-container")
            .classList.remove("hidden");


        document
            .getElementById("successMessage")
            .classList.add("hidden");


        // Reset payment sections
        document
            .getElementById("cardPayment")
            .classList.remove("hidden");

        document
            .getElementById("upiPayment")
            .classList.add("hidden");

        document
            .getElementById("codPayment")
            .classList.add("hidden");


        showStep(1);

    });


// ==========================================
// INITIALIZE
// ==========================================

showStep(1);
updateShippingCost();