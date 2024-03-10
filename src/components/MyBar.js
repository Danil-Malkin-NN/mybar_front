import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Link} from "react-router-dom";

function MyBar() {
    const [ingredients, setIngredients] = useState([]);
    const [cocktails, setCocktails] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchIngredients();
        myCocktails();
    }, []);

    const fetchIngredients = async () => {
        try {
            const response = await axios.get('http://mybar.dvmalkin.online/api/my/ingredients');
            setIngredients(response.data);
        } catch (error) {
            setError(error.message);
        }
    };

    const myCocktails = async () => {
        try {
            const response = await axios.get('http://mybar.dvmalkin.online/api/my/available/cocktails');
            setCocktails(response.data);
        } catch (error) {
            setError(error.message);
        }
    };

    const handleDeleteIngredient = async (ingredientId) => {
        try {
            await axios.delete(`http://mybar.dvmalkin.online/api/my/ingredients/delete?ingredientsId=${ingredientId}`);
            // Обновляем список ингредиентов после удаления
            fetchIngredients();
            myCocktails();
        } catch (error) {
            setError(error.message);
        }
    };

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (<>
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
        <div className="ingredient-container">
            <h1>Cocktails</h1>
            <div className="ingredient-grid">
                {cocktails.map(cocktail => (
                    <Link key={cocktail.id} to={`/cocktails/${cocktail.id}`} className="ingredient-card">
                        <h3>{cocktail.name}</h3>
                        <p>{cocktail.description}</p>
                    </Link>
                ))}
            </div>
        </div>
        </>
    );
}

export default MyBar;
