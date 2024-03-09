import React, { useState } from 'react';
import axios from 'axios';

function LoginForm() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Отправляем запрос на логин с указанным именем пользователя и паролем
            const response = await axios.post('http://mybar.dvmalkin.online/api/login', {
                username: username,
                password: password
            }, { withCredentials: true });

            // Проверяем успешность логина (например, проверяем статус кода ответа)
            if (response.status === 200) {
                console.log('Logged in successfully!');
                // Здесь вы можете перенаправить пользователя на другую страницу или обновить текущую страницу
            } else {
                setError('Login failed');
            }
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="username">Username:</label>
                <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
            </div>
            <div>
                <label htmlFor="password">Password:</label>
                <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <button type="submit">Login</button>
            {error && <div>{error}</div>}
        </form>
    );
}

export default LoginForm;
