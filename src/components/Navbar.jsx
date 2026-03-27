import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { data } from '../data';
import './Navbar.css';

const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/skills', label: 'Skills' },
    { path: '/projects', label: 'Projects' },
    { path: '/certifications', label: 'Certificates' },
    { path: '/achievements', label: 'Achievements' },
    { path: '/resume', label: 'Resume' },
    { path: '/contact', label: 'Contact' },
];

export default function Navbar() {
    const location = useLocation();
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <nav className="navbar">
            <div className="navbar-inner">
                <Link to="/" className="navbar-brand">
                    <span className="brand-initials">{data.initials}</span>
                    <span className="brand-name"> Portfolio</span>
                </Link>

                <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
                    <span className={menuOpen ? 'bar open' : 'bar'}></span>
                    <span className={menuOpen ? 'bar open' : 'bar'}></span>
                    <span className={menuOpen ? 'bar open' : 'bar'}></span>
                </button>

                <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
                    {navLinks.map(link => (
                        <li key={link.path}>
                            <Link
                                to={link.path}
                                className={`nav-link ${location.pathname === link.path ? 'active' : ''}`}
                                onClick={() => setMenuOpen(false)}
                            >
                                {link.label}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    );
}
