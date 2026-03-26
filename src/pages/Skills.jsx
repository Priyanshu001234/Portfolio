import { useState, useEffect, useRef } from 'react';
import { data } from '../data';
import './Skills.css';

function ProgressBar({ level }) {
    const [width, setWidth] = useState(0);
    const ref = useRef();

    useEffect(() => {
        const timer = setTimeout(() => setWidth(level), 200);
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) setWidth(level); },
            { threshold: 0.1 }
        );
        if (ref.current) observer.observe(ref.current);
        return () => { clearTimeout(timer); observer.disconnect(); };
    }, [level]);

    return (
        <div className="progress-bar-bg" ref={ref}>
            <div className="progress-bar-fill" style={{ width: `${width}%` }}></div>
        </div>
    );
}

const categoryIcons = {
    Languages: '💻',
    Frontend: '🎨',
    'Data & Analytics': '📊',
    'Backend & Tools': '⚙️',
};

const categoryColors = {
    Languages: '#3b82f6',
    Frontend: '#8b5cf6',
    'Data & Analytics': '#10b981',
    'Backend & Tools': '#f59e0b',
};

export default function Skills() {
    const categories = Object.entries(data.skills);

    return (
        <div className="skills-page">
            <div className="container section">
                <h2 className="section-title gradient-text">Technical Skills</h2>
                <div className="title-underline"></div>
                <p className="section-subtitle">My technical arsenal — constantly evolving</p>

                <div className="skills-grid">
                    {categories.map(([cat, skills]) => (
                        <div className="card skills-card" key={cat} style={{ '--cat-color': categoryColors[cat] || '#3b82f6' }}>
                            <div className="skills-card-header">
                                <span className="skill-cat-icon" style={{ background: (categoryColors[cat] || '#3b82f6') + '22' }}>
                                    {categoryIcons[cat] || '🔧'}
                                </span>
                                <h3>{cat}</h3>
                            </div>
                            <div className="skill-list">
                                {skills.map(skill => (
                                    <div className="skill-item" key={skill.name}>
                                        <div className="skill-meta">
                                            <span className="skill-name">{skill.name}</span>
                                            <span className="skill-pct" style={{ color: categoryColors[cat] || '#3b82f6' }}>{skill.level}%</span>
                                        </div>
                                        <ProgressBar level={skill.level} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="soft-skills-section">
                    <h3 className="soft-title gradient-text">Soft Skills</h3>
                    <div className="soft-skills-grid">
                        {[
                            { label: 'Problem Solving', icon: '🧩' },
                            { label: 'Leadership', icon: '🎯' },
                            { label: 'Quick Learner', icon: '⚡' },
                            { label: 'Adaptability', icon: '🔄' },
                            { label: 'Team Collaboration', icon: '🤝' },
                            { label: 'Time Management', icon: '📈' },
                        ].map(s => (
                            <div className="soft-skill-item" key={s.label}>
                                <span>{s.icon}</span>
                                <span>{s.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
