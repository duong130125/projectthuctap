const signUpButton = document.getElementById('signUpButton');
const signupForm = document.getElementById('signupForm');
const successMessage = document.getElementById('successMessage');
const errorMessage = document.getElementById('errorMessage');
const infoMessage = document.getElementById('infoMessage');
const loginLink = document.getElementById('loginLink');

signUpButton.addEventListener('click', function(event) {
    event.preventDefault(); 

    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (!firstName || !lastName || !email || !password) {
        alert("Vui lòng điền đầy đủ thông tin");
        return; 
    }

    const formData = {
        id: Math.floor(Math.random()*999999),
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
        cart:[],
    };

    let formDataArray = JSON.parse(localStorage.getItem('formDataArray')) || [];

    const emailExists = formDataArray.some(data => data.email === email);

    if (emailExists) {
        alert("Email đã tồn tại");
        successMessage.textContent = ""; 
    } else {
        formDataArray.push(formData);
        localStorage.setItem('formDataArray', JSON.stringify(formDataArray));
        signupForm.reset();

        alert("Đăng kí thành công");
        errorMessage.textContent = ""; 

        window.location.href = "./login.html";
    }
});