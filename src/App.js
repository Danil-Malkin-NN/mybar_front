// App.js
import logo from './logo.svg';
import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import IngredientList from './components/IngredientList'; // импортируем наш компонент

function App() {
  return (
      <Router>
        <div>
          <Switch>
            <Route path="/ingredients">
              <IngredientList /> {/* отображаем список ингредиентов на этом маршруте */}
            </Route>
            {/* Другие маршруты, если есть */}
          </Switch>
        </div>
      </Router>
  );
}


export default App;
