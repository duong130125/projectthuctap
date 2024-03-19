let storedUserName = localStorage.getItem('userClass');
    if (storedUserName) {
        document.getElementById('namename').textContent = storedUserName;
        document.getElementById('shopping').style.display = 'inline-block';
        document.getElementById('userLogout').style.display = 'inline-block';
        document.getElementById('userlogin').style.display = 'none'; // Ẩn đăng ký
        document.getElementById('usersign').style.display = 'none'; // Ẩn đăng nhập
        document.getElementById('userLink').style.display = 'inline-block'; // Hiển thị userLink
    }
    document.getElementById('userLogout').addEventListener('click', function() {
        localStorage.removeItem('userClass');
        document.getElementById('shopping').style.display = 'none';
        document.getElementById('userLogout').style.display = 'none';
        document.getElementById('userlogin').style.display = 'inline-block'; // Hiển thị đăng ký
        document.getElementById('usersign').style.display = 'inline-block'; // Hiển thị đăng nhập
        document.getElementById('userLink').style.display = 'none'; // Ẩn userLink
    });