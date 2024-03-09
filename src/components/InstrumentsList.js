// instrumentList.js

import React, {useState, useEffect} from 'react';
import './IngredientList.css'; // импортируем файл стилей для карточек

function InstrumentList() {
    const [instruments, setInstruments] = useState([]);
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
                setInstruments(data);
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
            <h1>instruments</h1>
            <div className="ingredient-grid">
                {instruments.map(instrument => (
                    <div key={instrument.id} className="ingredient-card">
                        <h3>{instrument.name}</h3>
                        <p>{instrument.description}</p>
                        {/* Другая информация об ингредиенте */}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default InstrumentList;
