const loginForm = document.getElementById('loginForm');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const signInButton = document.getElementById('signInButton');
const successMessage = document.getElementById('successMessage');
const errorMessage = document.getElementById('errorMessage');

signInButton.addEventListener('click', function(event) {
    event.preventDefault(); 

    const email = emailInput.value.trim(); 
    const password = passwordInput.value.trim(); 

    // Lấy dữ liệu từ local storage và chuyển đổi thành đối tượng JavaScript
    let storedData = JSON.parse(localStorage.getItem('formDataArray'));

    // Kiểm tra xem dữ liệu từ local storage có tồn tại không
    let check = storedData.find(check => check.email === email && check.password === password)

    if (check) {
        localStorage.setItem('userClass', check.id);
        document.getElementById('successMessage').style.display = 'block';
        window.location.href = "index.html";
    } else {
        alert('Email hoặc password không chính xác.');
    }
});