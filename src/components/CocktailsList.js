import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './griid.css';

function CocktailsList() {
    const [cocktails, setCocktails] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchCocktails() {
            try {
                const response = await fetch(`http://mybar.dvmalkin.online/api/cocktails?page=${currentPage}&size=10`);
                if (!response.ok) {
                    throw new Error('Failed to fetch Cocktails');
                }
                const data = await response.json();
                setCocktails(data.content);
                setTotalPages(data.totalPages);
            } catch (error) {
                setError(error.message);
            }
        }

        fetchCocktails();
    }, [currentPage]);

    if (error) {
        return <div>Error: {error}</div>;
    }

    const handlePreviousPage = () => {
        setCurrentPage(currentPage - 1);
    };

    const handleNextPage = () => {
        setCurrentPage(currentPage + 1);
    };

    return (
        <div className="ingredient-container">
            <h1>Коктейли</h1>
            <div className="ingredient-grid">
                {cocktails.map(cocktail => (
                    <div key={cocktail.id} className="ingredient-card">
                        <h3>{cocktail.name}</h3>
                        <p>{cocktail.description}</p>
                        {/* Другая информация о коктейле */}
                        <h4>Ингредиенты:</h4>
                        <ul>
                            {cocktail.ingredients.map((ingredient, index) => (
                                <li key={index}>{ingredient.ingredient.name}</li>
                            ))}
                        </ul>
                        <Link to={`/cocktails/${cocktail.id}`}>Подробнее</Link>
                    </div>
                ))}
            </div>
            <div>
                <span>Страница: {currentPage + 1} / {totalPages}</span>
                <button disabled={currentPage === 0} onClick={handlePreviousPage}>Предыдущая</button>
                <button disabled={currentPage === totalPages - 1} onClick={handleNextPage}>Следующая</button>
            </div>
        </div>
    );
}

export default CocktailsList;
