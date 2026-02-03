
export default function Section({ id, title, children }: { id?: string, title: string, children: React.ReactNode }) {
    return (
        <section id={id} style={{ padding: '3rem 20px', maxWidth: '1200px', margin: '0 auto' }}>
            <h2 style={{ fontSize: '1.8rem', marginBottom: '1.5rem', color: '#333' }}>{title}</h2>
            {children}
        </section>
    );
}
