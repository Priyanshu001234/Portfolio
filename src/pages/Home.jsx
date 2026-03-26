import { useState, useEffect } from 'react';
import { data } from '../data';
import { Link } from 'react-router-dom';
import './Home.css';
import profileImg from '../assets/profile.jpeg';

const hobbyIcons = { 'Competitive Programming': '💻', 'Open Source': '🌐', 'Problem Solving': '🧩', Gaming: '🎮', Music: '🎵', Reading: '📚' };

export default function Home() {
    const titles = ["Aspiring Software Developer", "Problem Solver", "Data Enthusiast", "Java Developer"];
    const [currentTitleIndex, setCurrentTitleIndex] = useState(0);
    const [currentText, setCurrentText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        const timeout = setTimeout(() => {
            const currentFullText = titles[currentTitleIndex];
            if (!isDeleting) {
                setCurrentText(currentFullText.substring(0, currentText.length + 1));
                if (currentText === currentFullText) {
                    setTimeout(() => setIsDeleting(true), 1500);
                }
            } else {
                setCurrentText(currentFullText.substring(0, currentText.length - 1));
                if (currentText === '') {
                    setIsDeleting(false);
                    setCurrentTitleIndex((prev) => (prev + 1) % titles.length);
                }
            }
        }, isDeleting ? 50 : 100);
        return () => clearTimeout(timeout);
    }, [currentText, isDeleting, currentTitleIndex]);

    return (
        <div className="home-page">
            {/* HERO */}
            <section className="hero-section">
                <div className="hero-bg-glow"></div>
                <div className="container hero-content">
                    <div className="avatar-wrapper">
                        <img src={profileImg} alt={data.name} className="avatar-img" />
                        <div className="avatar-ring"></div>
                    </div>

                    <h1 className="hero-name">
                        <span className="gradient-text">{data.name}</span>
                    </h1>

                    <div className="hero-title-wrapper">
                        <span className="hero-title">{currentText}</span>
                        <span className="cursor-blink">|</span>
                    </div>

                    <p className="hero-bio">{data.bio}</p>

                    <div className="hero-tags">
                        {data.quickSkills.map(skill => (
                            <span key={skill} className="tag">{skill}</span>
                        ))}
                    </div>

                    <div className="hero-buttons">
                        <Link to="/projects" className="btn-primary">View My Work</Link>
                        <Link to="/contact" className="btn-outline">Contact Me</Link>
                    </div>

                    <div className="scroll-indicator">
                        <span>Scroll to explore</span>
                        <div className="scroll-mouse">
                            <div className="scroll-wheel"></div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ABOUT */}
            <section className="about-section">
                <div className="container">
                    <div className="section-title gradient-text">About Me</div>
                    <div className="title-underline" style={{ margin: '0 auto 16px' }}></div>
                    <p className="section-subtitle">Get to know me better</p>

                    <div className="about-grid">
                        {/* Left */}
                        <div className="about-left">
                            <div className="card quick-facts-card">
                                <h3>Quick Facts</h3>
                                <div className="fact-item">
                                    <span className="fact-icon">📍</span>
                                    <div>
                                        <small>Location</small>
                                        <p>{data.location}</p>
                                    </div>
                                </div>
                                <div className="fact-item">
                                    <span className="fact-icon">🎓</span>
                                    <div>
                                        <small>Education</small>
                                        <p>Pursuing B.Tech in CSE</p>
                                    </div>
                                </div>
                                <div className="fact-item">
                                    <span className="fact-icon">💼</span>
                                    <div>
                                        <small>Experience</small>
                                        <p>{data.experience}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="card hobbies-card">
                                <h3>When I'm Not Coding</h3>
                                {data.hobbies.map(h => (
                                    <div key={h} className="hobby-item">
                                        <span>{hobbyIcons[h] || '🎯'}</span>
                                        <span>{h}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Right */}
                        <div className="about-right">
                            <div className="card journey-card">
                                <h3 className="gradient-text">My Journey</h3>
                                {data.journey.split('\n\n').map((para, i) => (
                                    <p key={i}>{para}</p>
                                ))}
                            </div>

                            <div className="card approach-card">
                                <h3 className="gradient-text">My Approach</h3>
                                <p>{data.approach}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
