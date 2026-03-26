import { useState } from 'react';
import { data } from '../data';
import './Projects.css';

const allCategories = ['All', ...new Set(data.projects.flatMap(p => p.categories || [p.type]))];

export default function Projects() {
    const [filter, setFilter] = useState('All');
    const [modalImages, setModalImages] = useState(null);
    const [currentImgIndex, setCurrentImgIndex] = useState(0);

    const openGallery = (images) => {
        if (!images || images.length === 0) return;
        setModalImages(images);
        setCurrentImgIndex(0);
    };

    const nextImg = (e) => {
        e.stopPropagation();
        setCurrentImgIndex(prev => (prev < modalImages.length - 1 ? prev + 1 : 0));
    };

    const prevImg = (e) => {
        e.stopPropagation();
        setCurrentImgIndex(prev => (prev > 0 ? prev - 1 : modalImages.length - 1));
    };

    const filtered = filter === 'All'
        ? data.projects
        : data.projects.filter(p => (p.categories || [p.type]).includes(filter));

    return (
        <div className="projects-page">
            <div className="container section">
                <h2 className="section-title gradient-text">My Projects</h2>
                <div className="title-underline"></div>
                <p className="section-subtitle">A showcase of what I've built</p>

                <div className="filter-row">
                    {allCategories.map(t => (
                        <button
                            key={t}
                            className={`filter-btn ${filter === t ? 'active' : ''}`}
                            onClick={() => setFilter(t)}
                        >
                            {t}
                        </button>
                    ))}
                </div>

                <div className="projects-grid">
                    {filtered.map(proj => (
                        <div className="portfolio-card" key={proj.name}>
                            <div
                                className="portfolio-image-container"
                                onClick={() => proj.images && proj.images.length > 0 && openGallery(proj.images)}
                                style={{
                                    cursor: proj.images && proj.images.length > 0 ? 'pointer' : 'default',
                                    background: `radial-gradient(circle at 0% 0%, ${proj.color || '#3b82f6'}66 0%, transparent 60%), radial-gradient(circle at 100% 100%, ${proj.color || '#3b82f6'}44 0%, transparent 50%), #0f172a`
                                }}
                            >
                                {proj.featured && <span className="featured-badge">Featured</span>}
                                {proj.images && proj.images.length > 0 ? (
                                    <img src={proj.images[0]} alt={proj.name} className="portfolio-img" />
                                ) : (
                                    <div className="portfolio-placeholder">
                                        <span className="placeholder-icon">💻</span>
                                    </div>
                                )}
                                {proj.images && proj.images.length > 1 && (
                                    <div className="gallery-indicator">
                                        📷 {proj.images.length}
                                    </div>
                                )}
                                <div className="portfolio-categories">
                                    {proj.categories && proj.categories.length > 0
                                        ? proj.categories.map(cat => <span key={cat} className="cat-badge">{cat}</span>)
                                        : <span className="cat-badge">{proj.type}</span>
                                    }
                                </div>
                            </div>

                            <div className="portfolio-content">
                                <h3 className="portfolio-title" style={{ color: proj.color || '#60a5fa' }}>{proj.name}</h3>
                                <p className="portfolio-desc">{proj.description}</p>

                                <div className="portfolio-tech-list">
                                    {proj.tech.map(t => (
                                        <span key={t} className="tech-badge">{t}</span>
                                    ))}
                                </div>

                                <div className="portfolio-actions">
                                    {proj.live && (
                                        <a href={proj.live} target="_blank" rel="noopener noreferrer" className="btn-live">
                                            Live Demo
                                        </a>
                                    )}
                                    {proj.github && (
                                        <a href={proj.github} target="_blank" rel="noopener noreferrer" className="btn-source">
                                            Source Code
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Image Gallery Modal */}
            {modalImages && (
                <div className="project-modal-overlay" onClick={() => setModalImages(null)}>
                    <div className="project-modal" onClick={e => e.stopPropagation()}>
                        <button className="project-modal-close" onClick={() => setModalImages(null)}>✕</button>
                        <img src={modalImages[currentImgIndex]} alt="Gallery" className="project-modal-img" />
                        {modalImages.length > 1 && (
                            <>
                                <button className="modal-prev" onClick={prevImg}>‹</button>
                                <button className="modal-next" onClick={nextImg}>›</button>
                                <div className="modal-counter">
                                    {currentImgIndex + 1} / {modalImages.length}
                                </div>
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
