import { data } from '../data';
import './Achievements.css';

export default function Achievements() {
    return (
        <div className="achievements-page">
            <div className="container section">
                <h2 className="section-title gradient-text">Achievements</h2>
                <div className="title-underline"></div>
                <p className="section-subtitle">Milestones and competitive programming highlights</p>

                <div className="achievements-grid">
                    {data.achievements.map((a, i) => (
                        <div className="card achievement-card" key={i}>
                            <div className="achievement-icon-wrap">
                                <span className="achievement-icon">{a.icon}</span>
                            </div>
                            <div className="achievement-content">
                                <h3 className="achievement-title">{a.title}</h3>
                                <p className="achievement-desc">{a.description}</p>
                                <span className="achievement-date">{a.date}</span>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="stats-row">
                    <div className="stat-box card">
                        <span className="stat-num gradient-text">200+</span>
                        <span className="stat-label">Problems Solved</span>
                    </div>
                    <div className="stat-box card">
                        <span className="stat-num gradient-text">5★</span>
                        <span className="stat-label">LeetCode Rating</span>
                    </div>
                    <div className="stat-box card">
                        <span className="stat-num gradient-text">5+</span>
                        <span className="stat-label">Certifications</span>
                    </div>
                    <div className="stat-box card">
                        <span className="stat-num gradient-text">2+</span>
                        <span className="stat-label">Projects Built</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
