// MyBar.js

import React, { useState, useEffect } from 'react';

function MyBar() {
    const [ingredients, setIngredients] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch('http://mybar.dvmalkin.online/api/my/ingredients')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch ingredients from My Bar');
                }
                return response.json();
            })
            .then(data => {
                setIngredients(data);
            })
            .catch(error => {
                setError(error.message);
            });
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
