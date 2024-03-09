// instrumentList.js

import React, {useState, useEffect} from 'react';
import './griid.css'; // импортируем файл стилей для карточек

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
            <h1>Cocktails</h1>
            <div className="ingredient-grid">
                {cocktails.map(cocktail => (
                    <div key={cocktail.id} className="ingredient-card">
                        <h3>{cocktail.name}</h3>
                        <p>{cocktail.description}</p>
                        {/* Другая информация об ингредиенте */}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default CocktailsList;
