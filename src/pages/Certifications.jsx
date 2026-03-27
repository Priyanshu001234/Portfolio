import { useState } from 'react';
import { data } from '../data';
import './Certifications.css';

export default function Certifications() {
    const [modalImg, setModalImg] = useState(null);

    const handleViewCert = (cert) => {
        if (cert.image) {
            setModalImg({ 
                url: cert.image, 
                name: cert.name, 
                link: cert.link,
                platform: cert.platform 
            });
        } else {
            alert(`Certificate: ${cert.name}\nIssued by: ${cert.issuer}\nDate: ${cert.date}`);
        }
    };

    const closeModal = () => setModalImg(null);

    return (
        <div className="certs-page">
            <div className="container section">
                <h2 className="section-title gradient-text">Certificates</h2>
                <div className="title-underline"></div>
                <p className="section-subtitle">Professional credentials and courses I've completed</p>

                <div className="certs-grid">
                    {data.certifications.map((cert, i) => (
                        <div className="cert-card-container" key={i} style={{ animationDelay: `${i * 0.1}s` }}>
                            <div className="cert-card">
                                {/* FRONT OF CARD */}
                                <div className="cert-card-front">
                                    <div className="cert-card-image-wrapper">
                                        <div className="cert-platform-badge">{cert.platform}</div>
                                        {cert.image ? (
                                            <img src={cert.image} alt={cert.name} className="cert-card-bg-image" />
                                        ) : (
                                            <div className="cert-banner-placeholder">
                                                <span>{cert.icon}</span>
                                            </div>
                                        )}
                                    </div>
                                    <div className="cert-card-body">
                                        <h3 className="cert-name">{cert.name}</h3>
                                        <p className="cert-desc">{cert.description}</p>
                                        <div className="cert-front-footer">
                                            <span className="cert-footer-issuer">{cert.platform}</span>
                                            <span className="cert-footer-date">{cert.date}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* HOVER OVERLAY */}
                                <div className="cert-card-hover">
                                    <h3 className="cert-hover-title">{cert.name}</h3>

                                    <div className="cert-hover-details">
                                        <div className="cert-detail-row">
                                            <span className="detail-icon">📚</span>
                                            <div className="detail-text">
                                                <small>Issued by:</small>
                                                <strong>{cert.issuer}</strong>
                                            </div>
                                        </div>

                                        <div className="cert-detail-row">
                                            <span className="detail-icon">🗓️</span>
                                            <div className="detail-text">
                                                <small>Date:</small>
                                                <strong>{cert.date}</strong>
                                            </div>
                                        </div>

                                        {cert.skills && cert.skills.length > 0 && (
                                            <div className="cert-detail-row skills-row">
                                                <span className="detail-icon">🔍</span>
                                                <div className="detail-text">
                                                    <small>Skills:</small>
                                                    <div className="cert-skills-group">
                                                        {cert.skills.map((skill, idx) => (
                                                            <span key={idx} className="cert-skill-pill">{skill}</span>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    <div className="cert-actions">
                                        <button
                                            className="cert-view-btn-full"
                                            onClick={() => handleViewCert(cert)}
                                        >
                                            View Image
                                        </button>
                                        {cert.link && (
                                            <a 
                                                href={cert.link} 
                                                target="_blank" 
                                                rel="noopener noreferrer" 
                                                className="cert-link-btn"
                                            >
                                                Verify Credential ↗
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className="hover-hint">Hover to view details</div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Modal */}
            {modalImg && (
                <div className="cert-modal-overlay" onClick={closeModal}>
                    <div className="cert-modal-content" onClick={(e) => e.stopPropagation()}>
                        <button className="cert-modal-close" onClick={closeModal}>&times;</button>
                        
                        {modalImg.link ? (
                            <a href={modalImg.link} target="_blank" rel="noopener noreferrer" className="cert-modal-image-link">
                                <img src={modalImg.url} alt={modalImg.name} className="cert-modal-image" />
                            </a>
                        ) : (
                            <img src={modalImg.url} alt={modalImg.name} className="cert-modal-image" />
                        )}
                        
                        <h3 className="cert-modal-title">{modalImg.name}</h3>
                        
                        {modalImg.link && (
                            <a href={modalImg.link} target="_blank" rel="noopener noreferrer" className="cert-modal-verify-link">
                                🔗 Verify on {modalImg.platform || 'website'}
                            </a>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
