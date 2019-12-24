import React from 'react';
import { Route } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom/cjs/react-router-dom.min';
import Main from './pages/main';
import Cloud from './pages/cloud';
import './App.css';

function App () {
    return (
        <BrowserRouter>
            <Route path='/cloud' exact component={Cloud}></Route>
            <Route path='/main' exact component={Main}></Route>
        </BrowserRouter>
    );
}

export { App };
