
'use client';
import { useState, useEffect } from 'react';
import Card from '@/components/Card';

export default function ProfileEditor() {
    const [profile, setProfile] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/profile')
            .then(res => res.json())
            .then(data => {
                setProfile(data);
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setLoading(false);
            });
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await fetch('/api/profile', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(profile)
        });
        alert('Profile updated!');
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div>
            <h1>Edit Profile</h1>
            <Card>
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div>
                        <label>Name</label>
                        <input
                            value={profile?.name || ''}
                            onChange={e => setProfile({ ...profile, name: e.target.value })}
                            style={{ width: '100%', padding: '8px' }}
                        />
                    </div>
                    <div>
                        <label>Title</label>
                        <input
                            value={profile?.title || ''}
                            onChange={e => setProfile({ ...profile, title: e.target.value })}
                            style={{ width: '100%', padding: '8px' }}
                        />
                    </div>
                    <div>
                        <label>Bio</label>
                        <textarea
                            value={profile?.bio || ''}
                            onChange={e => setProfile({ ...profile, bio: e.target.value })}
                            style={{ width: '100%', padding: '8px', minHeight: '150px' }}
                        />
                    </div>
                    <div>
                        <label>Location</label>
                        <input
                            value={profile?.location || ''}
                            onChange={e => setProfile({ ...profile, location: e.target.value })}
                            style={{ width: '100%', padding: '8px' }}
                        />
                    </div>
                    <div>
                        <label>Email</label>
                        <input
                            value={profile?.email || ''}
                            onChange={e => setProfile({ ...profile, email: e.target.value })}
                            style={{ width: '100%', padding: '8px' }}
                        />
                    </div>
                    <div>
                        <label>Phone</label>
                        <input
                            value={profile?.phone || ''}
                            onChange={e => setProfile({ ...profile, phone: e.target.value })}
                            style={{ width: '100%', padding: '8px' }}
                        />
                    </div>
                    <div>
                        <label>CV URL</label>
                        <input
                            value={profile?.cvUrl || ''}
                            onChange={e => setProfile({ ...profile, cvUrl: e.target.value })}
                            style={{ width: '100%', padding: '8px' }}
                        />
                    </div>

                    <button type="submit" style={{ padding: '10px', background: 'black', color: 'white', cursor: 'pointer' }}>
                        Save Changes
                    </button>
                </form>
            </Card>
        </div>
    );
}
