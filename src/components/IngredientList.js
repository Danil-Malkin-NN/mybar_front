import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './griid.css'; // импортируем файл стилей для карточек

function IngredientList() {
    const [ingredients, setIngredients] = useState([]);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(10);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        async function fetchIngredients() {
            try {
                const response = await axios.get(`http://mybar.dvmalkin.online/api/ingredients?page=${page}&size=${size}`);
                setIngredients(response.data.content);
                setTotalPages(response.data.totalPages);
            } catch (error) {
                setError(error.message);
            }
        }

        fetchIngredients();
    }, [page, size]);

    const handleSearch = async () => {
        try {
            const response = await axios.get(`http://mybar.dvmalkin.online/api/ingredients/search?name=${searchTerm}`);
            setIngredients(response.data);
        } catch (error) {
            setError(error.message);
        }
    };

    const handleInputChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handlePreviousPage = () => {
        setPage(page - 1);
    };

    const handleNextPage = () => {
        setPage(page + 1);
    };

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="ingredient-container">
            <h1>Ингредиенты</h1>
            <div>
                <input
                    type="text"
                    placeholder="Search ingredient..."
                    value={searchTerm}
                    onChange={handleInputChange}
                />
                <button onClick={handleSearch}>Search</button>
            </div>
            <div className="ingredient-grid">
                {ingredients.map(ingredient => (
                    <div key={ingredient.id} className="ingredient-card">
                        <h3>{ingredient.name}</h3>
                        <p>{ingredient.description}</p>
                        {/* Другая информация об ингредиенте */}
                    </div>
                ))}
            </div>
            <div>
                <span>Page: {page + 1} of {totalPages}</span>
                <button disabled={page === 0} onClick={handlePreviousPage}>Previous</button>
                <button disabled={page === totalPages - 1} onClick={handleNextPage}>Next</button>
            </div>
        </div>
    );
}

export default IngredientList;
