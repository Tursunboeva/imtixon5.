

document.getElementById('registrationForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    
    
    const YourName = document.getElementById('YourName').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();

    const loadingElement = document.getElementById('loading');
    const resultElement = document.getElementById('result');

    
    if ( !YourName || !email || !password) {
        resultElement.textContent = 'Please fill in all fields.';
        return;
    }

    loadingElement.classList.remove('hidden');
    resultElement.textContent = '';

    try {
        const response = await fetch('https://blogpost-server-production-d92d.up.railway.app/api/v1/user/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: ` ${YourName}`, email, password })
        });

       
        if (!response.ok) {
            
            const errorText = await response.text();
            resultElement.textContent = `Registration failed: ${errorText || 'Unknown error'}`;
            return;
        }

        const result = await response.json();

        resultElement.textContent = result.message ? `Registration failed: ${result.message}` : 'Registration successful!';
        
    } catch (error) {
        resultElement.textContent = `Registration failed: ${error.message || 'Unknown error'}`;
    } finally {
        loadingElement.classList.add('hidden');
    }
});
