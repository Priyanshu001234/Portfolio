import { useState } from 'react';
import { data } from '../data';
import './Resume.css';

const tabs = ['Education', 'Skills', 'Projects', 'Certifications', 'Extracurricular'];

export default function Resume() {
    const [activeTab, setActiveTab] = useState('Education');

    return (
        <div className="resume-page">
            <div className="container section">
                <h2 className="section-title gradient-text">Resume</h2>
                <div className="title-underline"></div>
                <p className="section-subtitle">A summary of my academic and professional journey</p>

                <div className="tabs-row">
                    {tabs.map(t => (
                        <button key={t} className={`tab-btn ${activeTab === t ? 'active' : ''}`} onClick={() => setActiveTab(t)}>{t}</button>
                    ))}
                </div>

                <div className="tab-content card">
                    {activeTab === 'Education' && (
                        <div className="edu-list">
                            {data.education.map((e, i) => (
                                <div className="edu-item" key={i}>
                                    <div className="edu-dot"></div>
                                    <div className="edu-info">
                                        <div className="edu-header">
                                            <h3>{e.school}</h3>
                                            <span className="edu-period">{e.period}</span>
                                        </div>
                                        <p className="edu-degree">{e.degree}</p>
                                        <div className="edu-meta">
                                            <span className="tag">{e.grade}</span>
                                            <span className="edu-loc">📍 {e.location}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {activeTab === 'Skills' && (
                        <div className="resume-skills">
                            {Object.entries(data.skills).map(([cat, skills]) => (
                                <div key={cat} className="resume-skill-group">
                                    <h4 className="gradient-text">{cat}</h4>
                                    <div className="resume-skill-tags">
                                        {skills.map(s => <span key={s.name} className="tag">{s.name}</span>)}
                                    </div>
                                </div>
                            ))}
                            <div className="resume-skill-group">
                                <h4 className="gradient-text">Soft Skills</h4>
                                <div className="resume-skill-tags">
                                    {['Problem Solving', 'Leadership', 'Quick Learner', 'Adaptability', 'Time Management'].map(s => (
                                        <span key={s} className="tag">{s}</span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'Projects' && (
                        <div className="resume-projects">
                            {data.projects.map((p, i) => (
                                <div className="resume-project-item" key={i}>
                                    <div className="rp-header">
                                        <h3>{p.name}</h3>
                                        <span className="edu-period">{p.period}</span>
                                    </div>
                                    <p className="rp-desc">{p.description}</p>
                                    <div className="resume-skill-tags" style={{ marginTop: 8 }}>
                                        {p.tech.map(t => <span key={t} className="tag">{t}</span>)}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {activeTab === 'Certifications' && (
                        <div className="resume-certs">
                            {data.certifications.map((c, i) => (
                                <div className="resume-cert-item" key={i}>
                                    <span className="cert-icon-sm">{c.icon}</span>
                                    <div>
                                        <h4>{c.name}</h4>
                                        <p>{c.issuer} · <span style={{ color: 'var(--blue)' }}>{c.date}</span></p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {activeTab === 'Extracurricular' && (
                        <div className="resume-extra">
                            {data.extracurricular.map((e, i) => (
                                <div className="extra-item" key={i}>
                                    <span className="extra-dot">▹</span>
                                    <p>{e}</p>
                                </div>
                            ))}
                            <div style={{ marginTop: 24 }}>
                                <h4 className="gradient-text" style={{ marginBottom: 8 }}>Training</h4>
                                <div className="resume-cert-item">
                                    <span className="cert-icon-sm">💻</span>
                                    <div>
                                        <h4>Java Maestro – Hands-On Training on GUI Applications</h4>
                                        <p>Lovely Professional University (LPU) · <span style={{ color: 'var(--blue)' }}>Jul '25</span></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap', marginTop: 32 }}>
                    <a href="/Priyanshu_Resume.pdf" download="Priyanshu_Raj_Sharma_Resume.pdf" className="btn-primary">⬇️ Download Tech Resume</a>
                    <a href="/Priyanshu_Specialized_CV.pdf" download="Priyanshu_Raj_Sharma_Specialized_CV.pdf" className="btn-primary">⬇️ Download Specialized CV</a>
                </div>
            </div>
        </div>
    );
}
