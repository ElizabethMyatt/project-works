
   // Get the checkbox and submit button elements
   const checkbox = document.getElementById("confirm");
   const submitButton = document.getElementById("submitButton");

   // Add event listener to the checkbox
   checkbox.addEventListener("change", function() {
       // Enable/disable the submit button based on checkbox state
       submitButton.disabled = !checkbox.checked;
   });
   
window.onload = function() {
    document.getElementById('submitButton').addEventListener('click', function() {
        document.getElementById("patientConsentForm").submit();

    });
}

document.addEventListener('DOMContentLoaded', function() {
    const inputs = document.querySelectorAll('input');
    const button = document.getElementById('submitButton');
  
    inputs.forEach(input => {
      input.addEventListener('input', () => {
        for(let i = 0; i < inputs.length; i++) {
          if(inputs[i].value === '') {
            button.disabled = true;
            return;
          }
        }
        button.disabled = false;
      });
    });
  });