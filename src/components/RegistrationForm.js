import React, { useState } from 'react';
import axios from 'axios';

function RegistrationForm() {
    const [formData, setFormData] = useState({
        email: '',
        firstName: '',
        lastName: '',
        userCredentialsDto: {
            name: '',
            password: ''
        }
    });
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'name' || name === 'password') {
            setFormData(prevState => ({
                ...prevState,
                userCredentialsDto: {
                    ...prevState.userCredentialsDto,
                    [name]: value
                }
            }));
        } else {
            setFormData(prevState => ({
                ...prevState,
                [name]: value
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://mybar.dvmalkin.ru/api/register', formData);
            setSuccessMessage('Registration successful!'); // Показать сообщение об успехе
            // Очистить поля формы после успешной регистрации
            setFormData({
                email: '',
                firstName: '',
                lastName: '',
                userCredentialsDto: {
                    name: '',
                    password: ''
                }
            });
        } catch (error) {
            setError('Registration failed');
        }
    };

    return (
        <div>
            <h2>Registration Form</h2>
            {successMessage && <div>{successMessage}</div>}
            {error && <div>{error}</div>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email:</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} required />
                </div>
                <div>
                    <label>First Name:</label>
                    <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required />
                </div>
                <div>
                    <label>Last Name:</label>
                    <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required />
                </div>
                <div>
                    <label>Username:</label>
                    <input type="text" name="name" value={formData.userCredentialsDto.name} onChange={handleChange} required />
                </div>
                <div>
                    <label>Password:</label>
                    <input type="password" name="password" value={formData.userCredentialsDto.password} onChange={handleChange} required />
                </div>
                <button type="submit">Register</button>
            </form>
        </div>
    );
}

export default RegistrationForm;
