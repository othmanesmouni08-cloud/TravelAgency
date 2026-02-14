const axios = require('axios');

async function testCheckout() {
    try {
        const response = await axios.post('http://localhost:5000/api/payments/checkout', {
            cart: [
                {
                    id: 'test-1',
                    name: 'Test Hotel',
                    price: 1000,
                    type: 'hotel',
                    details: 'Standard Room'
                }
            ],
            amount: 1050,
            customerName: 'Test User',
            paymentMethod: 'credit_card'
        });

        console.log('Checkout Response:', JSON.stringify(response.data, null, 2));
        if (response.status === 201) {
            console.log('Verification Success!');
        } else {
            console.error('Verification Failed: Unexpected status code', response.status);
        }
    } catch (error) {
        console.error('Verification Error:', error.response?.data || error.message);
    }
}

testCheckout();
