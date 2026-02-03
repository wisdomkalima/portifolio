
'use client';
import { useState } from 'react';
import Card from './Card';

export default function ContactForm() {
    const [formData, setFormData] = useState({ name: '', email: '', content: '' });
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('submitting');
        try {
            const res = await fetch('/api/messages', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            if (!res.ok) throw new Error('Failed');
            setStatus('success');
            setFormData({ name: '', email: '', content: '' });
        } catch {
            setStatus('error');
        }
    };

    return (
        <Card>
            <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
                <div style={{ flex: 1 }}>
                    <h3 style={{ marginBottom: '1rem' }}>Get in Touch</h3>
                    <p>I am currently available for new opportunities. Send me a message and I'll respond as soon as possible.</p>
                </div>
                <div style={{ flex: 1 }}>
                    {status === 'success' ? (
                        <div style={{ background: '#d4edda', color: '#155724', padding: '1rem', borderRadius: '4px' }}>
                            Message sent successfully!
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <input
                                placeholder="Your Name"
                                required
                                value={formData.name}
                                onChange={e => setFormData({ ...formData, name: e.target.value })}
                                style={inputStyle}
                            />
                            <input
                                placeholder="Your Email"
                                type="email"
                                required
                                value={formData.email}
                                onChange={e => setFormData({ ...formData, email: e.target.value })}
                                style={inputStyle}
                            />
                            <textarea
                                placeholder="Message"
                                required
                                value={formData.content}
                                onChange={e => setFormData({ ...formData, content: e.target.value })}
                                style={{ ...inputStyle, minHeight: '120px' }}
                            />
                            <button
                                type="submit"
                                disabled={status === 'submitting'}
                                style={{ ...buttonStyle, opacity: status === 'submitting' ? 0.7 : 1 }}
                            >
                                {status === 'submitting' ? 'Sending...' : 'Send Message'}
                            </button>
                            {status === 'error' && <p style={{ color: 'red' }}>Failed to send. Please try again.</p>}
                        </form>
                    )}
                </div>
            </div>
        </Card>
    );
}

const inputStyle = { padding: '12px', border: '1px solid #ddd', borderRadius: '4px', fontSize: '1rem' };
const buttonStyle = { padding: '12px', background: '#0070f3', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '1rem' };
