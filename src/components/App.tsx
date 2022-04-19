import React from 'react'
import {
    Route,
    Routes
} from 'react-router-dom';
import Header from './Header/Header';
import Home from './Home/Home';

export default function App() {
    return (
        <>
            <div className="app">
                <Header />
                <div className="overlay-app"></div>
                <Routes>
                    <Route path="/mental-health-ui/" element={<Home />} />
                    <Route path="*" element={<Home />} />
                </Routes>
            </div>
        </>
    )
}