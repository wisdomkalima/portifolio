
'use client';
import { useState, useEffect } from 'react';
import Card from '@/components/Card';

export default function EducationEditor() {
    const [education, setEducation] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [newEdu, setNewEdu] = useState({ degree: '', institution: '', period: '', details: '', order: 0 });

    useEffect(() => {
        fetch('/api/education')
            .then(res => res.json())
            .then(data => {
                setEducation(data);
                setLoading(false);
            });
    }, []);

    const handleAdd = async (e: React.FormEvent) => {
        e.preventDefault();
        const res = await fetch('/api/education', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newEdu)
        });
        const saved = await res.json();
        setEducation([...education, saved]);
        setNewEdu({ degree: '', institution: '', period: '', details: '', order: 0 });
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div>
            <h1>Manage Education</h1>

            <Card style={{ marginBottom: '2rem' }}>
                <h3>Add New Education</h3>
                <form onSubmit={handleAdd} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <input placeholder="Degree" value={newEdu.degree} onChange={e => setNewEdu({ ...newEdu, degree: e.target.value })} style={inputStyle} />
                    <input placeholder="Institution" value={newEdu.institution} onChange={e => setNewEdu({ ...newEdu, institution: e.target.value })} style={inputStyle} />
                    <input placeholder="Period" value={newEdu.period} onChange={e => setNewEdu({ ...newEdu, period: e.target.value })} style={inputStyle} />
                    <textarea placeholder="Details" value={newEdu.details} onChange={e => setNewEdu({ ...newEdu, details: e.target.value })} style={{ ...inputStyle, minHeight: '100px' }} />
                    <input type="number" placeholder="Order" value={newEdu.order} onChange={e => setNewEdu({ ...newEdu, order: parseInt(e.target.value) })} style={inputStyle} />
                    <button type="submit" style={buttonStyle}>Add Education</button>
                </form>
            </Card>

            <div>
                {education.map(edu => (
                    <Card key={edu.id}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <h4>{edu.degree}</h4>
                            <span>{edu.period}</span>
                        </div>
                        <p style={{ color: '#666' }}>{edu.institution}</p>
                        <p>{edu.details}</p>
                    </Card>
                ))}
            </div>
        </div>
    );
}

const inputStyle = { padding: '8px', border: '1px solid #ccc', borderRadius: '4px' };
const buttonStyle = { padding: '10px', background: '#0070f3', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' };
