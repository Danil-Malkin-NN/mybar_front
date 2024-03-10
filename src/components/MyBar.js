import React, { useState, useEffect } from 'react';
import axios from 'axios';

function MyBar() {
    const [ingredients, setIngredients] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchIngredients();
    }, []);

    const fetchIngredients = async () => {
        try {
            const response = await axios.get('http://mybar.dvmalkin.online/api/my/ingredients');
            setIngredients(response.data);
        } catch (error) {
            setError(error.message);
        }
    };

    const handleDeleteIngredient = async (ingredientId) => {
        try {
            await axios.delete(`http://mybar.dvmalkin.online/api/my/ingredients/delete?ingredientsId=${ingredientId}`);
            // Обновляем список ингредиентов после удаления
            fetchIngredients();
        } catch (error) {
            setError(error.message);
        }
    };

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <h1>Мой бар</h1>
            <div className="ingredient-grid">
                {ingredients.map(ingredient => (
                    <div key={ingredient.id} className="ingredient-card">
                        <h3>{ingredient.name}</h3>
                        <p>{ingredient.description}</p>
                        {/* Другая информация об ингредиенте */}
                        <button onClick={() => handleDeleteIngredient(ingredient.id)}>Удалить</button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default MyBar;
