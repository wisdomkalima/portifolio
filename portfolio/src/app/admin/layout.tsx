
import Link from 'next/link';
import { getServerSession } from "next-auth";

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await getServerSession();

    return (
        <div style={{ display: 'flex', minHeight: '100vh' }}>
            <aside style={{
                width: '250px',
                background: '#f4f4f4',
                padding: '2rem',
                borderRight: '1px solid #ddd'
            }}>
                <h2 style={{ marginBottom: '2rem' }}>Admin Panel</h2>
                <nav>
                    <ul style={{ listStyle: 'none', padding: 0 }}>
                        <li style={{ marginBottom: '1rem' }}><Link href="/admin">Dashboard</Link></li>
                        <li style={{ marginBottom: '1rem' }}><Link href="/admin/profile">Profile</Link></li>
                        <li style={{ marginBottom: '1rem' }}><Link href="/admin/experience">Experience</Link></li>
                        <li style={{ marginBottom: '1rem' }}><Link href="/admin/education">Education</Link></li>
                        <li style={{ marginBottom: '1rem' }}><Link href="/admin/skills">Skills</Link></li>
                        <li style={{ marginBottom: '1rem' }}><Link href="/admin/messages">Messages</Link></li>
                        <li style={{ marginTop: '2rem', borderTop: '1px solid #ddd', paddingTop: '1rem' }}>
                            <Link href="/" target="_blank">View Site</Link>
                        </li>
                    </ul>
                </nav>
            </aside>
            <main style={{ flex: 1, padding: '2rem' }}>
                {children}
            </main>
        </div>
    );
}
