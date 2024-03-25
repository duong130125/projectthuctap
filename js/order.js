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

        // Lưu đối tượng đơn hàng vào local storage
        localStorage.setItem("orderData", JSON.stringify(orderData));

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

        // Quay về trang chủ
        window.location.href = "index.html";
    });
});
