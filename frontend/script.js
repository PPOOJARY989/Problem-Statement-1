const step1 = document.querySelector(".step1"),
  step2 = document.querySelector(".step2"),
  step3 = document.querySelector(".step3"),
  emailAddress = document.getElementById("emailAddress"),
  verifyEmail = document.getElementById("verifyEmail"),
  inputs = document.querySelectorAll(".otp-group input"),
  nextButton = document.querySelector(".nextButton"),
  verifyButton = document.querySelector(".verifyButton");

let OTP = ""; // Store OTP securely in this variable

window.addEventListener("load", () => {
  emailjs.init("f-IAVt-Ei9rYku1B7");
  step2.style.display = "none";
  step3.style.display = "none";
  nextButton.classList.add("disable");
  verifyButton.classList.add("disable");
});

// Email validation function
const validateEmail = (email) => {
  const re = /\S+@\S+\.\S+/;
  nextButton.classList.toggle("disable", !re.test(email));
};

// Generate a random 4-digit OTP
const generateOTP = () => Math.floor(1000 + Math.random() * 9000).toString(); // Convert to string for exact comparison

// Validate inputs and enable the verify button when all are filled
inputs.forEach((input, index) => {
  input.addEventListener("keyup", function (e) {
    // Restrict to one character per input field
    if (this.value.length > 1) {
      this.value = this.value[0];
    }
    
    // Move focus to the next input field if filled
    if (this.value && index < inputs.length - 1) {
      inputs[index + 1].focus();
    }
    
    // Enable verify button only if all fields are filled
    verifyButton.classList.toggle(
      "disable",
      Array.from(inputs).some(input => input.value === "")
    );
  });
});

const serviceID = "service_vhj8cxh";
const templateID = "template_dm59rfd";

nextButton.addEventListener("click", () => {
  OTP = generateOTP(); // Generate OTP as string
  console.log("Generated OTP:", OTP); // Debugging - Log the OTP to verify

  nextButton.innerHTML = "&#9889; Sending...";
  const email = emailAddress.value;

  const templateParameter = {
    from_name: "Pawan Naveen Poojary",
    OTP: OTP,
    message: "Please Verify Your Account",
    to_email: email,
    reply: email
  };

  emailjs.send(serviceID, templateID, templateParameter).then(
    (res) => {
      console.log("EmailJS Response:", res); // Debugging
      nextButton.innerHTML = "Next &rarr;";
      step1.style.display = "none";
      step2.style.display = "block";
      verifyEmail.textContent = email;
    },
    (err) => {
      console.error("EmailJS Error:", err); // Debugging
      alert("Failed to send OTP. Please try again.");
      nextButton.innerHTML = "Next &rarr;";
    }
  );
});

verifyButton.addEventListener("click", () => {
  const enteredOTP = Array.from(inputs).map(input => input.value).join("").trim(); // Get OTP from inputs and remove extra spaces
  console.log("Entered OTP:", enteredOTP); // Debugging

  // Compare entered OTP with generated OTP
  if (OTP === enteredOTP) {
    step1.style.display = "none";
    step2.style.display = "none";
    step3.style.display = "block"; // OTP matched, proceed to next step
  } else {
    verifyButton.classList.add("error-shake");
    setTimeout(() => {
      verifyButton.classList.remove("error-shake");
    }, 1000);
    alert("Invalid OTP. Please try again."); // Notify user of invalid OTP
  }
});

// Reset email change
function changeMyEmail() {
  step1.style.display = "block";
  step2.style.display = "none";
  step3.style.display = "none";
}
