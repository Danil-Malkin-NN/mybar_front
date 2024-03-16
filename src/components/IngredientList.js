import React, { useState, useEffect } from 'react';
import axios from 'axios';

function IngredientList() {
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [ingredients, setIngredients] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchIngredients() {
            try {
                let url = '';
                if (searchTerm) {
                    url = `http://mybar.dvmalkin.online/api/ingredients/search?name=${searchTerm}`;
                } else {
                    url = `http://mybar.dvmalkin.online/api/ingredients?page=${currentPage}&size=5&sort=desc`;
                }
                const response = await axios.get(url);
                setIngredients(response.data.content);
                if (!searchTerm) {
                    setTotalPages(response.data.totalPages);
                }
            } catch (error) {
                setError(error.message);
            }
        }

        fetchIngredients();
    }, [searchTerm, currentPage]);

    const handleAddIngredient = async (ingredientId) => {
        try {
            const response = await axios.post(`http://mybar.dvmalkin.online/api/my/ingredients/add?ingredientsId=${ingredientId}`);
            console.log('Ingredient added successfully:', response.data);
            // Можно обновить список ингредиентов после успешного добавления
        } catch (error) {
            console.error('Failed to add ingredient:', error);
        }
    };

    if (error) {
        return <div>Error: {error}</div>;
    }

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div>
            <h1>Ingredients</h1>
            <div>
                <input
                    type="text"
                    placeholder="Search ingredient..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
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
            {!searchTerm && (
                <div>
                    <p>Page: {currentPage + 1} / {totalPages}</p>
                    <button disabled={currentPage === 0} onClick={() => handlePageChange(currentPage - 1)}>Previous</button>
                    <button disabled={currentPage === totalPages - 1} onClick={() => handlePageChange(currentPage + 1)}>Next</button>
                </div>
            )}
        </div>
    );
}

export default IngredientList;
