import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './griid.css'; // импортируем файл стилей для карточек

function InstrumentList() {
    const [instruments, setInstruments] = useState([]);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(10);
    const [totalPages, setTotalPages] = useState(0);

    const apiUrl = process.env.REACT_APP_API_URL;

    useEffect(() => {
        async function fetchInstruments() {
            try {
                const response = await axios.get(`${apiUrl}/api/instruments?page=${page}&size=${size}`);
                setInstruments(response.data.content);
                setTotalPages(response.data.totalPages);
            } catch (error) {
                setError(error.message);
            }
        }

        fetchInstruments();
    }, [page, size]);

    const handleSearch = async () => {
        try {
            const response = await axios.get(`${apiUrl}/api/instruments/search?name=${searchTerm}`);
            setInstruments(response.data);
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
            <h1>Инструменты</h1>
            <div>
                <input
                    type="text"
                    placeholder="Search instrument..."
                    value={searchTerm}
                    onChange={handleInputChange}
                />
                <button onClick={handleSearch}>Search</button>
            </div>
            <div className="ingredient-grid">
                {instruments.map(instrument => (
                    <div key={instrument.id} className="ingredient-card">
                        <h3>{instrument.name}</h3>
                        <p>{instrument.description}</p>
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

export default InstrumentList;
