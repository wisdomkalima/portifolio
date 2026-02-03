
'use client';
import { useState, useEffect } from 'react';
import Card from '@/components/Card';

export default function MessagesViewer() {
    const [messages, setMessages] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/messages')
            .then(res => res.json())
            .then(data => {
                setMessages(data);
                setLoading(false);
            });
    }, []);

    if (loading) return <div>Loading...</div>;

    return (
        <div>
            <h1>Messages</h1>
            {messages.length === 0 ? <p>No messages yet.</p> : null}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {messages.map(msg => (
                    <Card key={msg.id}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #eee', paddingBottom: '10px', marginBottom: '10px' }}>
                            <strong>{msg.name} ({msg.email})</strong>
                            <span style={{ color: '#888', fontSize: '0.9rem' }}>{new Date(msg.createdAt).toLocaleString()}</span>
                        </div>
                        <p style={{ whiteSpace: 'pre-wrap' }}>{msg.content}</p>
                    </Card>
                ))}
            </div>
        </div>
    );
}
