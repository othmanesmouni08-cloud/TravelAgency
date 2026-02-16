const axios = require('axios');

async function testRegistration() {
    const email = `testuser_${Date.now()}@example.com`;
    try {
        const response = await axios.post('http://localhost:5000/api/auth/register', {
            name: 'Test Auth User',
            email: email,
            password: 'password123',
            number: '1234567890',
            role: 'user'
        });

        console.log('Registration Response:', JSON.stringify(response.data, null, 2));

        if (response.status === 201) {
            console.log('User Registration Success!');
            const user = response.data.data.user || response.data.user;
            console.log('Persisted User Details:', {
                id: user._id,
                email: user.email,
                name: user.name,
                phone: user.phone || 'N/A' // backend currently returns user object in response
            });
        } else {
            console.error('Registration Failed: Unexpected status code', response.status);
        }
    } catch (error) {
        console.error('Registration Error:', error.response?.data || error.message);
    }
}

testRegistration();
