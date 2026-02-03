
import Link from 'next/link';

export default function Header() {
    return (
        <header style={styles.header}>
            <div style={styles.container}>
                <div style={styles.logo}>
                    <Link href="/" style={styles.logoLink}>Wisdom Waliweyo Kalima</Link>
                </div>
                <nav>
                    <ul style={styles.navList}>
                        <li><Link href="#about" style={styles.navLink}>About</Link></li>
                        <li><Link href="#experience" style={styles.navLink}>Experience</Link></li>
                        <li><Link href="#education" style={styles.navLink}>Education</Link></li>
                        <li><Link href="#skills" style={styles.navLink}>Skills</Link></li>
                        <li><Link href="#contact" style={styles.navLink}>Contact</Link></li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}

const styles = {
    header: {
        padding: '1rem 0',
        backgroundColor: '#fff',
        borderBottom: '1px solid #eaeaea',
        position: 'sticky' as 'sticky',
        top: 0,
        zIndex: 100,
    },
    container: {
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    logo: {
        fontWeight: 'bold',
        fontSize: '1.2rem',
    },
    logoLink: {
        textDecoration: 'none',
        color: 'inherit',
    },
    navList: {
        listStyle: 'none',
        display: 'flex',
        gap: '20px',
        margin: 0,
        padding: 0,
    },
    navLink: {
        textDecoration: 'none',
        color: '#555',
        fontSize: '0.95rem',
    }
};
