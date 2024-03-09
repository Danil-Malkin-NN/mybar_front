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
                setIngredients(response.data)
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
            <h1>Ingredients</h1>
            <div className="ingredient-grid">
                {ingredients.map(ingredient => (
                    <div key={ingredient.id} className="ingredient-card">
                        <h3>{ingredient.name}</h3>
                        <p>{ingredient.description}</p>
                        {/* Другая информация об ингредиенте */}
                        {/*<button onClick={() => handleAddIngredient(ingredient.id)}>-</button>*/}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default MyBar;
