// let products = [
//     {
//         image:"../asset/imgs/image-asset.jpeg",
//         name:"Kem nền",
//         price:"100",
//         quantity: 1000,
//         id:1,
//     },
//     {
//         image:"../asset/imgs/mau-anh-chup-my-pham-01-scaled.jpg",
//         name:"Thahera",
//         price:"800",
//         quantity: 1000,
//         id:2,
//     },
//     {
//         image:"../asset/imgs/in-hu-my-pham-3.jpg",
//         name:"Cocoon",
//         price:"500",
//         quantity: 1000,
//         id:3,
//     },
//     {
//         image:"../asset/imgs//cover - chup hinh my pham.jpg",
//         name:"Serum",
//         price:"1000",
//         quantity: 1000,
//         id:4,
//     },
//     {
//         image:"../asset/imgs/chup-anh-my-pham-dep-2.jpg",
//         name:"Rose",
//         price:"600",
//         quantity: 1000,
//         id:5,
//     },
//     {
//         image:"../asset/imgs/BST-MP-11.jpg",
//         name:"Nước toner",
//         price:"350",
//         quantity: 1000,
//         id:6,
//     },
//     {
//         image:"../asset/imgs/BST-MP-09.jpg",
//         name:"Woyga",
//         price:"150",
//         quantity: 1000,
//         id:7,
//     },
//     {
//         image:"../asset/imgs/anh-my-pham-02.jpg",
//         name:"Elody",
//         price:"250",
//         quantity: 1000,
//         id:8,
//     },
//     {
//         image:"../asset/imgs/655-10.jpg",
//         name:"Elody",
//         price:"3000",
//         quantity: 1000,
//         id:9,
//     },  
//     {
//         image:"../asset/imgs/photo1658455342930-16584553430462042350104-63794084405807.jpg",
//         name:"Elody",
//         price:"1400",
//         quantity: 1000,
//         id:10,
//     },   
//     {
//         image:"../asset/imgs/in-vo-my-pham-an-tuong-tu-cai-nhin-dau-tien-1.jpg",
//         name:"Elody",
//         price:"750",
//         quantity: 1000,
//         id:11,
//     },   
//     {
//         image:"../asset/imgs/nguon-hang-si-my-pham-nhat-tu-cac-shop-ban-si.jpg",
//         name:"Elody",
//         price:"5000",
//         quantity: 1000,
//         id:12,
//     },
//     {
//         image:"../asset/imgs/gia-cong-my-pham-trang-da-1610168090.jpg",
//         name:"Elody",
//         price:"10000",
//         quantity: 1000,
//         id:13,
//     },
//     {
//         image:"../asset/imgs/cach-phan-biet-my-pham-that-gia-1.jpg",
//         name:"Elody",
//         price:"1550",
//         quantity: 1000,
//         id:14,
//     },
//     {
//         image:"../asset/imgs/anhmypham.jpg",
//         name:"Elody",
//         price:"2050",
//         quantity: 1000,
//         id:15,
//     },
//     {
//         image:"../asset/imgs/bộ-mỹ-phẩm-1.jpg",
//         name:"Elody",
//         price:"2000",
//         quantity: 1000,
//         id:16,
//     },
// ]
// localStorage.setItem("products", JSON.stringify(products));


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
                        showQuantilyCart();
                    } else {
                        users[i].cart[index].quantily = ++users[i].cart[index].quantily;
                        localStorage.setItem("formDataArray", JSON.stringify(users));
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
