
'use client';
import { useState, useEffect } from 'react';
import Card from '@/components/Card';

export default function ExperienceEditor() {
    const [experiences, setExperiences] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [newExp, setNewExp] = useState({ title: '', company: '', period: '', description: '', order: 0 });

    useEffect(() => {
        fetch('/api/experience')
            .then(res => res.json())
            .then(data => {
                setExperiences(data);
                setLoading(false);
            });
    }, []);

    const handleAdd = async (e: React.FormEvent) => {
        e.preventDefault();
        const res = await fetch('/api/experience', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newExp)
        });
        const saved = await res.json();
        setExperiences([...experiences, saved]);
        setNewExp({ title: '', company: '', period: '', description: '', order: 0 });
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div>
            <h1>Manage Experience</h1>

            <Card style={{ marginBottom: '2rem' }}>
                <h3>Add New Experience</h3>
                <form onSubmit={handleAdd} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <input placeholder="Title" value={newExp.title} onChange={e => setNewExp({ ...newExp, title: e.target.value })} style={inputStyle} />
                    <input placeholder="Company" value={newExp.company} onChange={e => setNewExp({ ...newExp, company: e.target.value })} style={inputStyle} />
                    <input placeholder="Period" value={newExp.period} onChange={e => setNewExp({ ...newExp, period: e.target.value })} style={inputStyle} />
                    <textarea placeholder="Description (JSON list or text)" value={newExp.description} onChange={e => setNewExp({ ...newExp, description: e.target.value })} style={{ ...inputStyle, minHeight: '100px' }} />
                    <input type="number" placeholder="Order" value={newExp.order} onChange={e => setNewExp({ ...newExp, order: parseInt(e.target.value) })} style={inputStyle} />
                    <button type="submit" style={buttonStyle}>Add Experience</button>
                </form>
            </Card>

            <div>
                {experiences.map(exp => (
                    <Card key={exp.id}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <h4>{exp.title} at {exp.company}</h4>
                            <span>{exp.period}</span>
                        </div>
                        <p>{exp.description}</p>
                    </Card>
                ))}
            </div>
        </div>
    );
}

const inputStyle = { padding: '8px', border: '1px solid #ccc', borderRadius: '4px' };
const buttonStyle = { padding: '10px', background: '#0070f3', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' };
