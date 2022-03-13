const FORM = document.getElementById('form');
const EMAIL = document.getElementById('email');

FORM.addEventListener('submit', e => {
    e.preventDefault();

    checkInputs();
});

function checkInputs() {
    const EMAIL_VALUE = EMAIL.value.trim();

    if (EMAIL_VALUE === '') {
        setErrorFor(EMAIL, 'Please provide an email'); 
    } else if (!isEmail(EMAIL_VALUE)) {
        setErrorFor(EMAIL, 'Please provide a valid email'); 
    } else {
        setSuccessFor(EMAIL);
    }
}


function setErrorFor(input, message) {
    const FORM_CONTROL = input.parentElement;
    const SMALL = FORM_CONTROL.querySelector('small');
    
    // Add error class
    FORM_CONTROL.className = 'form-control error';
    // Add error message inside error-message
    SMALL.innerText = message;
}

function setSuccessFor(input) {
    const FORM_CONTROL = input.parentElement;
    FORM_CONTROL.className = 'form-control success';
}

function isEmail(email) {
	return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
}



