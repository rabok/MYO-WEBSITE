function makeMpesaPayment() {
    const paybillNumber = document.getElementById('paybillNumber').value;
    const accountNumber = document.getElementById('accountNumber').value;
    const amount = document.getElementById('amount').value;

    // You need to implement the logic here to initiate the M-Pesa Paybill payment using Daraja API
    // This may involve making an AJAX request to your server to handle the payment initiation
    // Ensure to include proper security measures in your server-side code
    // For a complete solution, you should integrate with the Safaricom Daraja API
    // Refer to Safaricom documentation: https://developer.safaricom.co.ke/docs#lipa-na-m-pesa-online

    // This is a placeholder, replace with actual API call to Safaricom Daraja API
    alert(`Initiate payment with Paybill: ${paybillNumber}, Account: ${accountNumber}, Amount: ${amount}`);
}

const btn = document.querySelector("#btn-submit")
const email = document.querySelector("#email");


btn.addEventListener("click", (e) =>  {
    e.preventDefault();
    //validate the input field
    if(this.email.value == null || this.email.value == ""){
        alert("Please enter your email address!");
        return false;
    
    } else {
        let fdata = {
            method: "POST",
            body: JSON.stringify({
                email: this.email.value,
            }),
            headers: ({"Content-Type": "application/json"}),
        }
        fetch("/subscribe", fdata)
        .then((response) => {
            if(response.ok){
                console.log("Email sent successfully.");
            }else {
                throw new Error("Error!");
            }

        })
    }
})