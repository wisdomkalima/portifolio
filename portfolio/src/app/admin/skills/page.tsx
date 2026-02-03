
'use client';
import { useState, useEffect } from 'react';
import Card from '@/components/Card';

export default function SkillsEditor() {
    const [skills, setSkills] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [newSkill, setNewSkill] = useState({ name: '', category: '' });

    useEffect(() => {
        fetch('/api/skills')
            .then(res => res.json())
            .then(data => {
                setSkills(data);
                setLoading(false);
            });
    }, []);

    const handleAdd = async (e: React.FormEvent) => {
        e.preventDefault();
        const res = await fetch('/api/skills', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newSkill)
        });
        const saved = await res.json();
        setSkills([...skills, saved]);
        setNewSkill({ name: '', category: '' });
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div>
            <h1>Manage Skills</h1>

            <Card style={{ marginBottom: '2rem' }}>
                <h3>Add New Skill</h3>
                <form onSubmit={handleAdd} style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                    <input placeholder="Skill Name" value={newSkill.name} onChange={e => setNewSkill({ ...newSkill, name: e.target.value })} style={inputStyle} />
                    <input placeholder="Category (Optional)" value={newSkill.category} onChange={e => setNewSkill({ ...newSkill, category: e.target.value })} style={inputStyle} />
                    <button type="submit" style={buttonStyle}>Add</button>
                </form>
            </Card>

            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                {skills.map(skill => (
                    <span key={skill.id} style={{
                        background: '#f0f0f0',
                        padding: '8px 16px',
                        borderRadius: '20px',
                        border: '1px solid #ddd'
                    }}>
                        {skill.name} <small style={{ color: '#888' }}>({skill.category || 'General'})</small>
                    </span>
                ))}
            </div>
        </div>
    );
}

const inputStyle = { padding: '8px', border: '1px solid #ccc', borderRadius: '4px' };
const buttonStyle = { padding: '10px 20px', background: '#0070f3', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' };
