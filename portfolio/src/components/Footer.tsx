
export default function Footer() {
    return (
        <footer style={{ padding: '2rem 0', textAlign: 'center' as 'center', color: '#666', borderTop: '1px solid #eaeaea', marginTop: '2rem' }}>
            <p>&copy; {new Date().getFullYear()} Wisdom Waliweyo Kalima. All rights reserved.</p>
        </footer>
    );
}
