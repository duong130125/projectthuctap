// let products = [
//     {
//         image:"../asset/imgs/image-asset.jpeg",
//         name:"Kem nền",
//         price:"100",
//         id:1,
//     },
//     {
//         image:"../asset/imgs/mau-anh-chup-my-pham-01-scaled.jpg",
//         name:"Thahera",
//         price:"800.000",
//         id:2,
//     },
//     {
//         image:"../asset/imgs/in-hu-my-pham-3.jpg",
//         name:"Cocoon",
//         price:"500.000",
//         id:3,
//     },
//     {
//         image:"../asset/imgs//cover - chup hinh my pham.jpg",
//         name:"Serum",
//         price:"1.000.000",
//         id:4,
//     },
//     {
//         image:"../asset/imgs/chup-anh-my-pham-dep-2.jpg",
//         name:"Rose",
//         price:"600.000",
//         id:5,
//     },
//     {
//         image:"../asset/imgs/BST-MP-11.jpg",
//         name:"Nước toner",
//         price:"350.000",
//         id:6,
//     },
//     {
//         image:"../asset/imgs/BST-MP-09.jpg",
//         name:"Woyga",
//         price:"150.000",
//         id:7,
//     },
//     {
//         image:"../asset/imgs/anh-my-pham-02.jpg",
//         name:"Elody",
//         price:"250.000",
//         id:8,
//     },
// ]
// localStorage.setItem("products", JSON.stringify(products));

let products = JSON.parse(localStorage.getItem("products"));
function renderProducts(){
    let element = "";
    for (let i=0; i<products.length; i++) {
        element += 
        `
            <div class="sanpham">
                <div>
                    <img class="img" src="${products[i].image}">
                    <span class="detail"></span>
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
        `
    }
    document.getElementsByClassName("container")[0].innerHTML=element;
}
renderProducts();
function addToCart(productId) {
    
    let checkLogin = JSON.parse(localStorage.getItem("userClass"));
    if (checkLogin == null) {
        alert("bạn phải đăng nhập để đi mua hàng");
        return // gặp return dừng chương trình luôn
    }
    console.log("đi mua hàng bình thường");
    /* 
        lấy giỏ hàng của user để đi mua hàng
        và lấy giỏ hàng user dựa vào id của user
     */
    let users = JSON.parse(localStorage.getItem("formDataArray"));
    for (let i = 0; i < users.length; i++) {
        if (users[i].id == checkLogin) {

            //lấy thông tin sản phẩm để đưa vào giỏ hàng
            // làm sao để lấy thông tin sản phẩm
            // console.log("11111", productId);
            // có id sản phẩm rồi làm sao lấy thông tin sản phẩm
            let product = JSON.parse(localStorage.getItem("products"));
            for (let j = 0; j < product.length; j++) {
                if (productId == product[j].id) {
                    // lấy thông tin sản phẩm
                    console.log("1111", product[j]);
                    console.log("giỏ hàng của user sẽ là ", users[i].cart);

                    // check id sản phẩm có trong giỏ hàng hay chưa
                    let index = users[i].cart.findIndex((item,index)=>{
                        return item.id == productId
                    })
                    if(index == -1){
                        console.log("chưa có");
                        users[i].cart.push({ ...product[j], quantily: 1});
                        localStorage.setItem("formDataArray", JSON.stringify(users));
                        showQuantilyCart();
                    }else{
                        console.log("có rồi");
                        users[i].cart[index].quantily = ++users[i].cart[index].quantily;
                        localStorage.setItem("formDataArray", JSON.stringify(users));
                    }

                }
            }
        }

    }
}

function showQuantilyCart(){
    let checkLogin = JSON.parse(localStorage.getItem("userClass"));
    let users = JSON.parse(localStorage.getItem("formDataArray"));
    for (let i = 0; i < users.length; i++) {
        if (users[i].id == checkLogin) {
            document.getElementsByClassName("itemCart")[0].innerHTML = users[i].cart.length;
        }
    }    
}
showQuantilyCart();