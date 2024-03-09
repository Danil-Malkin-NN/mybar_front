import React, { useState, useEffect } from 'react';
import axios from 'axios';

function IngredientList() {
    const [ingredients, setIngredients] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchIngredients() {
            try {
                const response = await axios.get('http://mybar.dvmalkin.online/api/ingredients/all');
                setIngredients(response.data);
            } catch (error) {
                setError(error.message);
            }
        }

        fetchIngredients();
    }, []);

    const handleAddIngredient = async (ingredientId) => {
        try {
            const authHeaders = JSON.parse(localStorage.getItem('authHeaders'));

            const response = await axios.post(`http://mybar.dvmalkin.online/api/my/ingredients/add?ingredientsId=${ingredientId}`, {
                headers: {
                    Authorization: authHeaders.Authorization,
                    Cookie: authHeaders['set-cookie']
                }
            });

            console.log('Ingredient added successfully:', response.data);
            // Можно обновить список ингредиентов после успешного добавления
        } catch (error) {
            console.error('Failed to add ingredient:', error);
        }
    };

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <h1>Ingredients</h1>
            <ul>
                {ingredients.map(ingredient => (
                    <li key={ingredient.id}>
                        {ingredient.name}
                        <button onClick={() => handleAddIngredient(ingredient.id)}>+</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default IngredientList;
