import React, { useState, useEffect } from 'react';
import axios from 'axios';

function MyBar() {
    const [ingredients, setIngredients] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchIngredients() {
            const authHeaders = localStorage.getItem('authHeaders');

            try {

                const response = await axios.get('http://mybar.dvmalkin.online/api/my/ingredients', {
                    headers: {
                        authHeaders,
                    }
                });
                return response.data;
            } catch (error) {
                setError(error.message);
            }
        }
        fetchIngredients();
    }, []);

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <h1>Мой бар</h1>
            <ul>
                {ingredients.map(ingredient => (
                    <li key={ingredient.id}>{ingredient.name}</li>
                ))}
            </ul>
        </div>
    );
}

export default MyBar;
