// CocktailDetails.js

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function CocktailDetails() {
    const { id } = useParams();
    const [cocktail, setCocktail] = useState(null);
    const [error, setError] = useState(null);

    const apiUrl = process.env.REACT_APP_API_URL;

    useEffect(() => {
        fetch(`${apiUrl}/api/cocktails/${id}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch Cocktail details');
                }
                return response.json();
            })
            .then(data => {
                setCocktail(data);
            })
            .catch(error => {
                setError(error.message);
            });
    }, [id]);

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!cocktail) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>{cocktail.name}</h1>
            <p><strong>Description:</strong> {cocktail.description}</p>
            <p><strong>Volume:</strong> {cocktail.volume} ml</p>
            <p><strong>Strength:</strong> {cocktail.strength}%</p>

            <h2>Ingredients:</h2>
            <ul>
                {cocktail.ingredients.map(ingredient => (
                    <li key={ingredient.id}>
                        {ingredient.count} {ingredient.unitType} - {ingredient.ingredient.name} ({ingredient.ingredient.description})
                    </li>
                ))}
            </ul>

            <h2>Instruments:</h2>
            <ul>
                {cocktail.instruments.map(instrument => (
                    <li key={instrument.id}>
                        {instrument.name} - {instrument.description}
                    </li>
                ))}
            </ul>

            <h2>Steps:</h2>
            <ol>
                {cocktail.steps.map(step => (
                    <li key={step.id}>
                        <h3>{step.goal}</h3>
                        <p>{step.description}</p>
                    </li>
                ))}
            </ol>
        </div>
    );
}

export default CocktailDetails;
