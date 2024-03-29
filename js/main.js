let products = JSON.parse(localStorage.getItem("products"));

function renderProducts() {
    let element = "";
    for (let i = 0; i < products.length; i++) {
        element +=
            `
            <div class="sanpham">
                <div>
                    <a href="../pages/detail.html"><img class="img" src="${products[i].image}"></a>
                </div>
                <div class="thongtin">
                    <div><b>${products[i].name}</b></div>
                </div>
                <div class="thongtin">
                    <div><b>${products[i].price}</b></div>
                </div>
                <div class="thongtin">
                    <button onclick="addToCart(${products[i].id})"><span class="material-symbols-outlined">shopping_cart</span></button>
                </div>
                <div class="clear"></div>
             </div>
        `;
    }
    document.getElementsByClassName("container")[0].innerHTML = element;
}
renderProducts();

function addToCart(productId) {
    let checkLogin = JSON.parse(localStorage.getItem("userClass"));
    if (checkLogin == null) {
        alert("Bạn phải đăng nhập để mua hàng.");
        return;
    }

    let users = JSON.parse(localStorage.getItem("formDataArray"));
    for (let i = 0; i < users.length; i++) {
        if (users[i].id == checkLogin) {
            if (users[i].locked) {
                alert("Tài khoản của bạn đã bị khóa. Đăng xuất");
                logout(); // Đăng xuất người dùng
                return;
            }

            let product = JSON.parse(localStorage.getItem("products"));
            for (let j = 0; j < product.length; j++) {
                if (productId == product[j].id) {
                    let index = users[i].cart.findIndex((item, index) => {
                        return item.id == productId;
                    });
                    if (index == -1) {
                        users[i].cart.push({ ...product[j], quantily: 1 });
                        localStorage.setItem("formDataArray", JSON.stringify(users));
                        alert("Sản phẩm mới được thêm vào giỏ hàng.");
                        showQuantilyCart();
                    } else {
                        users[i].cart[index].quantily = ++users[i].cart[index].quantily;
                        localStorage.setItem("formDataArray", JSON.stringify(users));
                        alert("Sản phẩm được thêm vào giỏ hàng.");
                    }
                }
            }
        }
    }
}

function showQuantilyCart() {
    let checkLogin = JSON.parse(localStorage.getItem("userClass"));
    let users = JSON.parse(localStorage.getItem("formDataArray"));
    for (let i = 0; i < users.length; i++) {
        if (users[i].id == checkLogin) {
            document.getElementsByClassName("itemCart")[0].innerHTML = users[i].cart.length;
        }
    }
}
showQuantilyCart();

function logout() {
    localStorage.removeItem('userClass');
    window.location.href = "login.html"; // Chuyển hướng người dùng đến trang đăng nhập sau khi đăng xuất
}
