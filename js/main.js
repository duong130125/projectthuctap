let productss = [
    {
        id:1,
        image:"../asset/imgs/ảnh1.jpg",
        name: "sản phẩm 1",
        price: 3000,
        quantity: 1000
    },
    {
        id:2,
        image:"../asset/imgs/ảnh2.jpg",
        name: "sản phẩm 2",
        price: 2500,
        quantity: 1000
    },
    {
        id:3,
        image:"../asset/imgs/ảnh3.jpg",
        name: "sản phẩm 3",
        price: 5000,
        quantity: 1000
    },
    {
        id:4,
        image:"../asset/imgs/ảnh4.jpg",
        name: "sản phẩm 4",
        price: 700,
        quantity: 1000
    },
    {
        id:5,
        image:"../asset/imgs/ảnh5.jpg",
        name: "sản phẩm 5",
        price: 500,
        quantity: 1000
    },
    {
        id:6,
        image:"../asset/imgs/ảnh6.jpg",
        name: "sản phẩm 6",
        price: 1500,
        quantity: 1000
    },
    {
        id:7,
        image:"../asset/imgs/ảnh7.jpg",
        name: "sản phẩm 7",
        price: 2000,
        quantity: 1000
    },
    {
        id:8,
        image:"../asset/imgs/ảnh8.jpg",
        name: "sản phẩm 8",
        price: 1000,
        quantity: 1000
    },
]
localStorage.setItem("products", JSON.stringify(productss));

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
