const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');
// const lists = [username, email, password,password2]
// console.log(username); // print tag

//Show input error message
function showError(input, message){
    const formControl = input.parentElement; // <div>, get parent element of input tag
    formControl.className = 'form-control error'; //add error to class name

    const small = formControl.querySelector('small'); // select small tag
    small.innerText = message; // add innertText
}

//Show success outline
function showSuccess(input){
    const formControl = input.parentElement;
    formControl.className = 'form-control success';
}

// check email is valid: js email regex
function checkEmail(email){
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(re.test(email.value.toLowerCase())){
        showSuccess(email);
    }else{
        showError(email, 'Email is in valid')
    }
}

// Check required
function checkRequired(inputArray){
 inputArray.forEach(function(input){
    // console.log(input.value);
    if(input.value.trim() === ''){
        showError(input, `${getFieldName(input)} is required`);
    }else{
        showSuccess(input);
    }
 });
}

// check input length
function checkLength(input, min, max){
    if(input.value.length < min){
        showError(input, `${getFieldName(input)} must be at least ${min} characters`);
    }else if(input.value.length > max){
        showError(input, `${getFieldName(input)} must not be greater than ${max} characters`);
    }else{
        showSuccess(input);
    }
}

// check passwords match
function checkPasswordsMatch(input1, input2){
    if(input1.value !== input2.value){
        showError(input2, 'Passwords do not match.')
    }else{
        showSuccess(input2)
    }
}

// Convert id name to capitalized
function getFieldName(input){
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

// Event Listener
form.addEventListener('submit', function(event) {
    event.preventDefault(); // prevents event from happening by browser via freshing the page, instead, need to trigger event by js logic
    checkRequired([username, email, password,password2]);
    checkLength(username, 3, 15);
    checkLength(password, 6, 25);
    checkEmail(email);
    checkPasswordsMatch(password, password2);
    
    // console.log(username.value); // get input value

    // lists.forEach(elem => {
    //     if(elem.value === ''){
    //         showError(elem, `${elem.id} is required`);
    //     }else{
    //         showSuccess(elem);
    //     }
    // })

    // if(username.value === ''){
    //     //alert('Username is required')
    //     showError(username, 'is required');
    // }else{
    //     showSuccess(username);
    // }

    // if(email.value === ''){
    //     showError(email, 'is required');
    // }else if(!email.value.isValidEmail){
    //     showError(email, 'is not valid');
    // }else{
    //     showSuccess(email);
    // }

    // if(password.value === ''){
    //     showError(password, 'is required');
    // }else if(!password.value.isValidPassword){
    //     showError(password, `${password.id} is not valid`);
    // }else{
    //     showSuccess(password);
    // }

    // if(password2.value === ''){
    //     showError(password2, 'is required');
    // }else if(password2.value !== password.value){
    //     showError(password2, 'is not match');
    // }else{
    //     showSuccess(password2);
    // }
})




