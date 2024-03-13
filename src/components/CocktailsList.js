import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './griid.css';

function CocktailsList() {
    const [cocktails, setCocktails] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch('http://mybar.dvmalkin.online/api/cocktails/all')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch Cocktails');
                }
                return response.json();
            })
            .then(data => {
                setCocktails(data);
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
            <h1>Коктейли</h1>
            <div className="ingredient-grid">
                {cocktails.map(cocktail => (
                    <div key={cocktail.id} className="ingredient-card">
                        <h3>{cocktail.name}</h3>
                        <p>{cocktail.description}</p>
                        {/* Другая информация о коктейле */}
                        <h4>Ингридиенты:</h4>
                        <ul>
                            {cocktail.ingredients.map((ingredient, index) => (
                                <li key={index}>{ingredient.ingredient.name}</li>
                            ))}
                        </ul>
                        <Link to={`/cocktails/${cocktail.id}`}>Подробнее</Link>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default CocktailsList;
