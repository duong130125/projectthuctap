 // Hiển thị các trường nhập cho thanh toán qua thẻ khi người dùng chọn phương thức này
 function showPaymentFields(paymentMethod) {
    var cardFields = document.getElementById("cardFields");
    if (paymentMethod === "card") {
        cardFields.style.display = "block";
    } else {
        cardFields.style.display = "none";
    }
}

document.addEventListener("DOMContentLoaded", function() {
    // Khi form được gửi đi
    document.getElementById("checkoutForm").addEventListener("submit", function(event) {
        // Ngăn chặn hành động mặc định của form (chặn việc tải lại trang)
        event.preventDefault();

        // Thu thập thông tin từ các trường nhập dữ liệu
        let fullName = document.getElementById("fullName").value;
        let phoneNumber = document.getElementById("phoneNumber").value;
        let address = document.getElementById("address").value;
        let paymentMethod = document.getElementById("paymentMethod").value;
        let cardNumber = document.getElementById("cardNumber").value;
        let nameCard = document.getElementById("nameCard").value;
        let expiryDate = document.getElementById("expiryDate").value;
        let cvv = document.getElementById("cvv").value;

        // Tạo một đối tượng chứa thông tin đơn hàng
        let orderData = {
            fullName: fullName,
            phoneNumber: phoneNumber,
            address: address,
            paymentMethod: paymentMethod,
            cardNumber: cardNumber,
            nameCard: nameCard,
            expiryDate: expiryDate,
            cvv: cvv
        };

        // Lấy danh sách đơn hàng từ localStorage
        let orders = JSON.parse(localStorage.getItem("orders")) || [];
        
        // Duyệt qua danh sách đơn hàng và sửa thông tin cho đơn hàng cuối cùng
        if (orders.length > 0) {
            let lastOrder = orders[orders.length - 1];
            lastOrder.orderData = orderData;
            localStorage.setItem("orders", JSON.stringify(orders));

            // Hiển thị thông báo mua hàng thành công
            alert("Đơn hàng của bạn đã được xác nhận. Cảm ơn bạn đã mua hàng!");

            // Xóa thông tin khỏi các ô input sau khi xác nhận đơn hàng
            document.getElementById("fullName").value = "";
            document.getElementById("phoneNumber").value = "";
            document.getElementById("address").value = "";
            document.getElementById("paymentMethod").value = "";
            document.getElementById("cardNumber").value = "";
            document.getElementById("nameCard").value = "";
            document.getElementById("expiryDate").value = "";
            document.getElementById("cvv").value = "";

            // Xóa dữ liệu trong giỏ hàng
            clearCartData();

            // Quay về trang chủ
            window.location.href = "index.html";
        } else {
            alert("Không có đơn hàng để cập nhật.");
        }
    });
});
  

// Hàm xóa dữ liệu cart trong formDataArray sau khi thanh toán
function clearCartData() {
    let formDataArray = JSON.parse(localStorage.getItem("formDataArray")) || [];
    let userClass = JSON.parse(localStorage.getItem("userClass"));
    // Duyệt qua formDataArray để tìm thông tin của người đăng nhập
    for (let i = 0; i < formDataArray.length; i++) {
        if (formDataArray[i].id === userClass) {
            // Gán giá trị của key "cart" thành một mảng rỗng
            formDataArray[i].cart = [];
            break; // Sau khi tìm thấy và cập nhật, thoát khỏi vòng lặp
        }
    }

    // Lưu formDataArray đã được cập nhật vào localStorage
    localStorage.setItem("formDataArray", JSON.stringify(formDataArray));
}