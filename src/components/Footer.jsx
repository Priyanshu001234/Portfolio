import { data } from '../data';
import './Footer.css';

export default function Footer() {
    return (
        <footer className="footer">
            <div className="container footer-inner">
                <div className="footer-brand">
                    <span className="footer-initials">{data.initials}</span>
                    <span className="footer-name">{data.name}</span>
                </div>
                <p className="footer-tagline">{data.title}</p>
                <div className="footer-links">
                    <a href={data.github} target="_blank" rel="noopener noreferrer" className="footer-link">GitHub</a>
                    <span className="footer-dot">·</span>
                    <a href={data.linkedin} target="_blank" rel="noopener noreferrer" className="footer-link">LinkedIn</a>
                    <span className="footer-dot">·</span>
                    <a href={`mailto:${data.email}`} className="footer-link">Email</a>
                </div>
                <p className="footer-copy">© 2025 {data.name}. Built with ❤️ using React + Vite.</p>
            </div>
        </footer>
    );
}
