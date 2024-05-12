import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './griid.css';

function CocktailsList() {
    const [cocktails, setCocktails] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        async function fetchCocktails() {
            try {
                let url = `http://mybar.dvmalkin.online/api/cocktails?page=${currentPage}&size=10`;
                if (searchTerm) {
                    url = `http://mybar.dvmalkin.online/api/cocktails/search?name=${searchTerm}`;
                }
                const response = await fetch(url);
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
    }, [currentPage, searchTerm]);

    const handlePreviousPage = () => {
        setCurrentPage(currentPage - 1);
    };

    const handleNextPage = () => {
        setCurrentPage(currentPage + 1);
    };

    const handleInputChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleSearch = async () => {
        setCurrentPage(0); // Сбросить страницу при выполнении поиска
    };

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="ingredient-container">
            <h1>Коктейли</h1>
            <div>
                <input
                    type="text"
                    placeholder="Search cocktail..."
                    value={searchTerm}
                    onChange={handleInputChange}
                />
                <button onClick={handleSearch}>Search</button>
            </div>
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
