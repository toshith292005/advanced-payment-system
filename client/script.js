const API = "http://localhost:3000/api";

console.log("JS Loaded ✅");

async function payNow() {
    try {
        console.log("Button clicked");

        // 1️⃣ Create order
        const res = await fetch(`${API}/create-order`);
        const order = await res.json();

        console.log("Order:", order);

        // 2️⃣ Razorpay popup
        const options = {
            key: "rzp_test_SYzgXaBcJxi7yS", // your key
            amount: order.amount,
            currency: order.currency,
            order_id: order.id,

            handler: async function (response) {
                console.log("SUCCESS:", response);

                // 🔐 VERIFY PAYMENT
                const verifyRes = await fetch(`${API}/verify-payment`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(response)
                });

                const data = await verifyRes.json();

                console.log("Verification:", data);

                if (data.success) {
                    document.getElementById("status").innerText =
                        "Payment Verified ✅";
                } else {
                    document.getElementById("status").innerText =
                        "Verification Failed ❌";
                }
            }
        };

        const rzp = new Razorpay(options);
        rzp.open();

    } catch (error) {
        console.error(error);
        alert("Payment failed");
    }
}