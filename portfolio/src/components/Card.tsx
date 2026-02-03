
export default function Card({ children, style = {} }: { children: React.ReactNode, style?: React.CSSProperties }) {
    return (
        <div style={{
            backgroundColor: '#fff',
            border: '1px solid #eaeaea',
            borderRadius: '8px',
            padding: '1.5rem',
            marginBottom: '1rem',
            boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
            ...style
        }}>
            {children}
        </div>
    );
}
