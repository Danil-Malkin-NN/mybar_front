// Navigation.js

import React from 'react';
import { NavLink } from 'react-router-dom';

function Navigation() {
    return (
        <nav>
            <ul>
                <li>
                    <NavLink to="/ingredients" activeClassName="active">Ингредиенты</NavLink>
                </li>
                <li>
                    <NavLink to="/instruments" activeClassName="active">Инструменты</NavLink>
                </li>
                <li>
                    <NavLink to="/cocktails" activeClassName="active">Коктейли</NavLink>
                </li>
                <li>
                    <NavLink to="/mybar" activeClassName="active">Мой бар</NavLink>
                </li>
            </ul>
        </nav>
    );
}

export default Navigation;
