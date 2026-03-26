import { useState } from 'react';
import { data } from '../data';
import './Contact.css';

export default function Contact() {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [status, setStatus] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!data.web3formsKey) {
            alert("Web3Forms Access Key is missing. Please add it to data.js to enable emails.");
            return;
        }

        setStatus('loading');

        try {
            const res = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json"
                },
                body: JSON.stringify({
                    access_key: data.web3formsKey,
                    name: formData.name,
                    email: formData.email,
                    message: formData.message
                })
            });
            const resData = await res.json();

            if (resData.success) {
                setStatus('success');
                setFormData({ name: '', email: '', message: '' });
                setTimeout(() => setStatus(''), 5000);
            } else {
                setStatus('error');
            }
        } catch (error) {
            setStatus('error');
        }
    };

    const contactInfo = [
        { icon: '📧', label: 'Email', value: data.email, link: `mailto:${data.email}` },
        { icon: '📱', label: 'Phone', value: data.phone, link: `tel:${data.phone}` },
        { icon: '📍', label: 'Location', value: data.location, link: null }
    ];

    const socialLinks = [
        {
            name: 'GitHub',
            url: data.github,
            label: 'github.com/Priyanshu001234',
            icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" /></svg>
        },
        {
            name: 'LinkedIn',
            url: data.linkedin.startsWith('http') ? data.linkedin : `https://${data.linkedin}`,
            label: 'linkedin.com/in/PriyanshuRajSharma',
            icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="#0A66C2"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
        }
    ];

    return (
        <div className="contact-page">
            <div className="container section">
                <h2 className="section-title gradient-text">Get In Touch</h2>
                <div className="title-underline"></div>
                <p className="section-subtitle">Let's connect and build something amazing together</p>

                <div className="contact-grid">
                    <div className="contact-info">
                        <div className="card contact-card">
                            {contactInfo.map((info) => (
                                <div key={info.label} className="contact-item">
                                    <span className="contact-icon">{info.icon}</span>
                                    <div>
                                        <small>{info.label}</small>
                                        {info.link ? (
                                            <a href={info.link}>{info.value}</a>
                                        ) : (
                                            <p>{info.value}</p>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="social-links">
                            {socialLinks.map((social) => (
                                <a key={social.name} href={social.url} target="_blank" rel="noopener noreferrer" className="card social-card">
                                    {social.icon}
                                    <div>
                                        <h4>{social.name}</h4>
                                        <p>{social.label}</p>
                                    </div>
                                </a>
                            ))}
                        </div>
                    </div>

                    <div className="card contact-message-card">
                        <h3 className="gradient-text">Send a Message</h3>
                        <p style={{ color: 'var(--text-secondary)', marginBottom: 24, fontSize: '0.9rem' }}>Have an opportunity or just want to say hi? I'd love to hear from you!</p>

                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label>Your Name</label>
                                <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="John Doe" className="form-input" required />
                            </div>
                            <div className="form-group">
                                <label>Your Email</label>
                                <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="john@example.com" className="form-input" required />
                            </div>
                            <div className="form-group">
                                <label>Message</label>
                                <textarea name="message" value={formData.message} onChange={handleChange} rows="5" placeholder="Your message..." className="form-input" required></textarea>
                            </div>
                            <button type="submit" disabled={status === 'loading'} className="btn-primary" style={{ width: '100%', textAlign: 'center', display: 'block', border: 'none', cursor: 'pointer', fontFamily: 'inherit', fontSize: '1rem', padding: '12px 24px', opacity: status === 'loading' ? 0.7 : 1 }}>
                                {status === 'loading' ? 'Sending...' : 'Send Message →'}
                            </button>
                            {status === 'success' && <p style={{ color: '#10b981', marginTop: '12px', textAlign: 'center', fontSize: '0.9rem' }}>Message sent successfully!</p>}
                            {status === 'error' && <p style={{ color: '#ef4444', marginTop: '12px', textAlign: 'center', fontSize: '0.9rem' }}>Something went wrong. Please try again.</p>}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
