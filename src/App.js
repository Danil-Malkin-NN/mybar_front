// App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './navbar/Navigation';
import IngredientList from './components/IngredientList';
import InstrumentsList from './components/InstrumentsList';
import CocktailsList from './components/CocktailsList';
import CocktailDetails from './components/CocktailDetails';
import MyBar from './components/MyBar';
import LoginForm from './components/LoginForm';
import RegistrationForm from "./components/RegistrationForm";

function App() {
    return (
        <Router>
            <div>
                <Navigation />
                <Routes>
                    <Route path="/ingredients" element={<IngredientList />} />
                    <Route path="/instruments" element={<InstrumentsList />} />
                    <Route path="/cocktails" element={<CocktailsList />} />
                    <Route path="/cocktails/:id" element={<CocktailDetails />} />
                    <Route path="/mybar" element={<MyBar />} />
                    <Route path="/login" element={<LoginForm />} />
                    <Route path="/register" element={<RegistrationForm />} />
                    {/* Другие маршруты, если есть */}
                </Routes>
            </div>
        </Router>
    );
}

export default App;
