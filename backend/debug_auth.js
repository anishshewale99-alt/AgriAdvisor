// Node 18+ has built-in fetch

async function testAuth() {
    const signupData = {
        name: 'Test Farmer',
        email: 'test@example.com',
        password: 'password123'
    };

    try {
        console.log('Attempting signup...');
        const signupRes = await fetch('http://localhost:5000/api/auth/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(signupData)
        });
        const signupResult = await signupRes.json();
        console.log('Signup Result:', signupResult);

        console.log('\nAttempting login...');
        const loginRes = await fetch('http://localhost:5000/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: signupData.email,
                password: signupData.password
            })
        });
        const loginResult = await loginRes.json();
        console.log('Login Result:', loginResult);

    } catch (err) {
        console.error('Error:', err);
    }
}

testAuth();
