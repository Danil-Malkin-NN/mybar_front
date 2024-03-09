// CocktailsList.js

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
    );
}

export default CocktailsList;
