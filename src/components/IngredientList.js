// IngredientList.js

import React, { useState, useEffect } from 'react';
import './griid.css'; // импортируем файл стилей для карточек

function IngredientList() {
    const [ingredients, setIngredients] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch('http://mybar.dvmalkin.online/api/ingredients/all')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch ingredients');
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
        <div className="ingredient-container">
            <h1>Ingredients</h1>
            <div className="ingredient-grid">
                {ingredients.map(ingredient => (
                    <div key={ingredient.id} className="ingredient-card">
                        <h3>{ingredient.name}</h3>
                        <p>{ingredient.description}</p>
                        {/* Другая информация об ингредиенте */}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default IngredientList;
