import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './griid.css';
import axios from "axios";

function CocktailsList() {
    const [cocktails, setCocktails] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchInput, setSearchInput] = useState('');

    const apiUrl = process.env.REACT_APP_BASE_URL;

    useEffect(() => {
        async function fetchCocktails() {
            try {
                let url = `${apiUrl}/cocktails?page=${currentPage}&size=10`;
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


    const handleSearch = async () => {
        try {
            const response = await axios.get(`${apiUrl}/cocktails/search?name=${searchTerm}`);
            setCocktails(response.data);
        } catch (error) {
            setError(error.message);
        }
    };

    const handlePreviousPage = () => {
        setCurrentPage(currentPage - 1);
    };

    const handleNextPage = () => {
        setCurrentPage(currentPage + 1);
    };

    const handleInputChange = (e) => {
        setSearchInput(e.target.value);
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
                    value={searchInput}
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
