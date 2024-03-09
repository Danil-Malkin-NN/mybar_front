// instrumentList.js

import React, {useState, useEffect} from 'react';
import './IngredientList.css.css'; // импортируем файл стилей для карточек

function instrumentList() {
    const [instruments, setinstruments] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch('http://mybar.dvmalkin.online/api/instruments/all')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch instruments');
                }
                return response.json();
            })
            .then(data => {
                setinstruments(data);
            })
            .catch(error => {
                setError(error.message);
            });
    }, []);

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="instrument-container">
            <h1>instruments</h1>
            <div className="instrument-grid">
                {instruments.map(instrument => (
                    <div key={instrument.id} className="instrument-card">
                        <h3>{instrument.name}</h3>
                        <p>{instrument.description}</p>
                        {/* Другая информация об ингредиенте */}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default instrumentList;
