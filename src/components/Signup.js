import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Signup.css';
import axios from 'axios';

const Signup = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [dob, setDob] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState(''); // State for success message
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();
        setError(''); // Clear any existing error messages
        setSuccessMessage('');
    
        // Basic validation for password length
        if (password.length < 6) {
            setError('Password must be at least 6 characters long.');
            return;
        }
    
        try {
            const path = 'http://localhost:3000/api/auth/register';
            const response = await axios.post(path, { username, password, dob });
    
            const { message, token, age } = response.data; // Extract token and age from response
    
            console.log('Registration Token:', token); // Log token to the console
            localStorage.setItem('token', token); // Store token in localStorage for future use
            localStorage.setItem('age', age); // Store age for access logic
    
            setSuccessMessage(message); // Show success message
            navigate('/login'); // Redirect to the login page
        } catch (err) {
            console.error('Signup error:', err);
            if (err.response && err.response.data) {
                setError(err.response.data.error || 'Registration failed. Please try again.');
            } else {
                setError('Registration failed. Please try again.');
            }
        }
    };
    

    return (
        <div className="signup">
            <h2 className="signup-title">Signup</h2>
            <form className="signup-form" onSubmit={handleSignup}>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    className="signup-input"
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="signup-input"
                />
                <input
                    type="date"
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                    required
                    className="signup-input"
                />
                <button type="submit" className="signup-button">Signup</button>
                {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
            </form>
        </div>
    );
};

export default Signup;
