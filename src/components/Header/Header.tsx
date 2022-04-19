import React from 'react'
import { Link } from 'react-router-dom'

export default function Header() {
    return (
        <div className="wrapper">
            <div className="main-container">

                <div className="main-header">
                    <div className="header">
                        <Link className='menu-link' to="/">Mental Health Survey Results</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}