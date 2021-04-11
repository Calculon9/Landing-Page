// SET SUBMIT BUTTON TO BE DISABLED BY DEFAULT

document.getElementById('submit').disabled = true;
let submitBtn = document.getElementById('submit');


// VALIDATE FIELDS WITH 'REQUIRED' MESSAGE

// Add event listeners to input fields
let inputs = document.querySelectorAll('input');
inputs.forEach((input) => input.addEventListener('blur', function (e) {

  // If nothing is entered AND there's currently no message saying 'Required'
  if (!e.target.value && !e.target.nextElementSibling) {
    // Then display 'Required' message
    e.target.insertAdjacentHTML('afterEnd', "<span class='text-danger'>Required</span>");
  } 

  // If nothing is entered AND there is a message saying 'Required'
  if (!e.target.value && e.target.nextElementSibling.innerText === 'Required') {
    // Continue to display message
      e.target.nextElementSibling.display = 'block';
  } else if (e.target.nextElementSibling) {
    // Otherwise, something must've been entered so remove the message
    e.target.nextElementSibling.remove();
  }
  complete();
}))


// VALIDATE PASSWORD AND CONFIRM PASSWORD SO THAT THE ENTERED VALUES MATCH AND ARE VALID

// Add event listeners to both password fields
let passwordInputs = document.querySelectorAll('[type="password"]');
passwordInputs.forEach((input) => input.addEventListener('blur', function (e) {

  let pass = document.getElementById('password');
  let confirmPass = document.getElementById('confirm-password');
  
  // Checking if both are valid passwords
  if ((pass.value && confirmPass.value) && pass.value === confirmPass.value) {
    if (pass.value.length < 8) {
      !confirmPass.nextElementSibling ? confirmPass.insertAdjacentHTML('afterEnd', "<span class='text-danger'>Password must be at least 8 characters</span>"): confirmPass.nextElementSibling.innerText = 'Password must be at least 8 characters';
    } else if (!/[@#$%^&*?!]/.test(pass.value)) {
      !confirmPass.nextElementSibling ? confirmPass.insertAdjacentHTML('afterEnd', "<span class='text-danger'>Password must contain a character: @#$%^&*?!</span>"): confirmPass.nextElementSibling.innerText = 'Password must contain a character: @#$%^&*?!';
    }
    complete();
  }

  // Checking if they match
  if (pass.value && confirmPass.value && pass.value !== confirmPass.value) {
    if (e.target.nextElementSibling) {
      e.target.nextElementSibling.remove();
    } else if (!confirmPass.nextElementSibling) {
      confirmPass.insertAdjacentHTML('afterEnd', "<span class='text-danger'>Passwords must match</span>");
    }
  } else if ((pass.value === '' || confirmPass.value === '') && confirmPass.innerText === 'Passwords must match') {
      confirmPass.nextElementSibling.remove();
  }
  complete();
}))


// VALIDATE EMAIL TO ENSURE CORRECT FORMAT - ABC@EXAMPLE.COM

// Add event listener to email
document.getElementById('email').addEventListener('blur', function(e) {
  let regex = /(\w+)@(\w+)\.(\w+)/ig;
  if (e.target.value) {
    if(!regex.test(e.target.value) && !e.target.nextElementSibling) {
    e.target.insertAdjacentHTML('afterEnd', "<span class='text-danger'>Enter valid address: abc@example.com</span>");
  } else if (!regex.test(e.target.value) && e.target.nextElementSibling) {
    e.target.nextElementSibling.innerText = 'Enter valid address: abc@example.com';
    }
  }
  complete();
  // Note: if valid address is entered, any error messages are removed by event listener that gives 'Required' error message
})

submitBtn.addEventListener('click', function(e) {
    e.preventDefault();
    submitBtn.insertAdjacentHTML('afterEnd',"<div class='alert alert-success mt-5 text-center'>FORM SUBMITTED</div>");
})

// CHECK FOR FORM COMPLETION - ACTIVATE SUBMIT BUTTON IF COMPLETE

 function complete () {
  
  let complete = Array.from(inputs).every((input) => input.value);
  
  if (complete && !document.querySelector('.text-danger')) {
    submitBtn.disabled = false;
    submitBtn.classList.replace('btn-secondary','btn-primary');
  } else if (complete && submitBtn.disabled === false) {
      submitBtn.disabled = true;
      submitBtn.classList.replace('btn-primary','btn-secondary');
  }
}