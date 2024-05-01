import React, {useEffect, useState} from 'react';
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
                    url = `http://mybar.dvmalkin.online/api/ingredients?page=${currentPage}&size=10&sort=desc`;
                }
                const response = await axios.get(url);
                if (!searchTerm) {
                    setTotalPages(response.data.totalPages);
                }
                setIngredients(response.data.content);
                setError(null); // Очищаем ошибку при успешном получении данных
            } catch (error) {
                setError(error.message); // Устанавливаем ошибку, если запрос завершился неудачно
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
                {ingredients && ingredients.length > 0 ? (
                    ingredients.map(ingredient => (
                        <div key={ingredient.id} className="ingredient-card">
                            <h3>{ingredient.name}</h3>
                            <p>{ingredient.description}</p>
                            {/* Другая информация об ингредиенте */}
                            <button onClick={() => handleAddIngredient(ingredient.id)}>+</button>
                        </div>
                    ))
                ) : (
                    <p>No ingredients found</p>
                )}
            </div>
            {!searchTerm && (
                <div>
                    <p>Page: {currentPage + 1} / {totalPages}</p>
                    <button disabled={currentPage === 0} onClick={() => handlePageChange(currentPage - 1)}>Previous
                    </button>
                    <button disabled={currentPage === totalPages - 1}
                            onClick={() => handlePageChange(currentPage + 1)}>Next
                    </button>
                </div>
            )}
        </div>
    );
}


export default IngredientList;
