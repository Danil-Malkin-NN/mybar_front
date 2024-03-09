// App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import IngredientList from './components/IngredientList';
import InstrumentsList from './components/InstrumentsList';
import CocktailsList from './components/CocktailsList';
import CocktailDetails from './components/CocktailDetails';

function App() {
    return (
        <Router>
            <div>
                <Routes>
                    <Route path="/ingredients" element={<IngredientList />} />
                    <Route path="/instruments" element={<InstrumentsList />} />
                    <Route path="/cocktails" element={<CocktailsList />} />
                    <Route path="/cocktails/:id" component={CocktailDetails} />
                    {/* Другие маршруты, если есть */}
                </Routes>
            </div>
        </Router>
    );
}

export default App;
