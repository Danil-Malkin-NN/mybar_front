import React, {useState, useEffect} from 'react';
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
            const authHeaders = JSON.parse(localStorage.getItem('basic'));

            const response = await axios.post(`http://mybar.dvmalkin.online/api/my/ingredients/add?ingredientsId=${ingredientId}`, {
                    // Тут должны быть данные вашего запроса, если они есть
                },
                {
                    headers: {
                        Authorization: authHeaders,
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
            <div className="ingredient-grid">
                {ingredients.map(ingredient => (
                    <div key={ingredient.id} className="ingredient-card">
                        <h3>{ingredient.name}</h3>
                        <p>{ingredient.description}</p>
                        {/* Другая информация об ингредиенте */}
                        <button onClick={() => handleAddIngredient(ingredient.id)}>+</button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default IngredientList;
