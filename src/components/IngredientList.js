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

    const apiUrl = process.env.REACT_APP_API_URL;

    useEffect(() => {
        async function fetchIngredients() {
            try {
                console.log('API URL:', process.env.REACT_APP_API_URL);
                const response = await axios.get(`${apiUrl}/api/ingredients?page=${page}&size=${size}`);
                setIngredients(Array.isArray(response.data.content) ? response.data.content : []);
                setTotalPages(response.data.totalPages);
            } catch (error) {
                setError(error.message);
            }
        }

        fetchIngredients();
    }, [page, size]);

    const handleSearch = async () => {
        try {
            console.log('API URL:', process.env.REACT_APP_API_URL);
            const response = await axios.get(`${apiUrl}/api/ingredients/search?name=${searchTerm}`);
            setIngredients(Array.isArray(response.data) ? response.data : []);
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

    const handleAddIngredient = async (ingredientId) => {
        try {
            const response = await axios.post(`${apiUrl}/api/my/ingredients/add?ingredientsId=${ingredientId}`);
            console.log('Ingredient added successfully:', response.data);
            // Можно обновить список ингредиентов после успешного добавления
        } catch (error) {
            console.error('Failed to add ingredient:', error);
        }
    };

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
                        <button onClick={() => handleAddIngredient(ingredient.id)}>+</button>
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
