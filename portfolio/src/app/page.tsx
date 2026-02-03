
import { prisma } from '@/lib/prisma';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Section from '@/components/Section';
import Card from '@/components/Card';
import Link from 'next/link';
import ContactForm from '@/components/ContactForm';
import ContactForm from '@/components/ContactForm';

// Force dynamic rendering since we are fetching from DB
export const dynamic = 'force-dynamic';

async function getPortfolioData() {
  const profile = await prisma.profile.findFirst();
  const experiences = await prisma.experience.findMany({ orderBy: { order: 'asc' } });
  const education = await prisma.education.findMany({ orderBy: { order: 'asc' } });
  const skills = await prisma.skill.findMany();

  return { profile, experiences, education, skills };
}

export default async function Home() {
  const { profile, experiences, education, skills } = await getPortfolioData();

  return (
    <>
      <Header />
      <main>
        {/* Hero / About */}
        <Section id="about" title="About Me">
          {profile ? (
            <Card>
              <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
                <div style={{ flex: 2 }}>
                  <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>{profile.name}</h1>
                  <h3 style={{ color: '#555', marginBottom: '1.5rem' }}>{profile.title}</h3>
                  <div style={{ whiteSpace: 'pre-wrap', lineHeight: '1.6' }}>{profile.bio}</div>
                </div>
                <div style={{ flex: 1, minWidth: '250px', borderLeft: '1px solid #eaeaea', paddingLeft: '2rem' }}>
                  <div style={{ marginBottom: '1rem' }}>
                    <strong>Location:</strong><br /> {profile.location}
                  </div>
                  <div style={{ marginBottom: '1rem' }}>
                    <strong>Email:</strong><br /> <a href={`mailto:${profile.email}`}>{profile.email}</a>
                  </div>
                  <div style={{ marginBottom: '1rem' }}>
                    <strong>Phone:</strong><br /> {profile.phone}
                  </div>
                  {profile.cvUrl && (
                    <div style={{ marginTop: '2rem' }}>
                      <Link href={profile.cvUrl} className="button" style={{
                        display: 'inline-block',
                        padding: '10px 20px',
                        background: '#0070f3',
                        color: 'white',
                        textDecoration: 'none',
                        borderRadius: '5px'
                      }}>
                        Download CV
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </Card>
          ) : (
            <p>Profile not loaded. Please run seed script.</p>
          )}
        </Section>

        {/* Experience */}
        <Section id="experience" title="Professional Experience">
          {experiences.map((exp) => (
            <Card key={exp.id}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <h3 style={{ margin: 0 }}>{exp.title}</h3>
                <span style={{ color: '#666' }}>{exp.period}</span>
              </div>
              <div style={{ color: '#0070f3', marginBottom: '1rem' }}>{exp.company}</div>
              <ul style={{ paddingLeft: '20px', margin: 0 }}>
                {(() => {
                  try {
                    // Try parsing JSON list
                    const items = JSON.parse(exp.description);
                    if (Array.isArray(items)) {
                      return items.map((item, i) => <li key={i} style={{ marginBottom: '0.5rem' }}>{item}</li>);
                    }
                    return <li>{exp.description}</li>;
                  } catch {
                    // Fallback if not JSON
                    return <li>{exp.description}</li>;
                  }
                })()}
              </ul>
            </Card>
          ))}
        </Section>

        {/* Education */}
        <Section id="education" title="Education">
          {education.map((edu) => (
            <Card key={edu.id}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <h3 style={{ margin: 0 }}>{edu.degree}</h3>
                <span style={{ color: '#666' }}>{edu.period}</span>
              </div>
              <div style={{ color: '#0070f3', marginBottom: '0.5rem' }}>{edu.institution}</div>
              <p style={{ margin: 0, color: '#444' }}>{edu.details}</p>
            </Card>
          ))}
        </Section>

        {/* Skills */}
        <Section id="skills" title="Skills">
          <Card>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              {skills.map((skill) => (
                <span key={skill.id} style={{
                  background: '#f0f0f0',
                  padding: '5px 15px',
                  borderRadius: '20px',
                  fontSize: '0.9rem',
                  color: '#333'
                }}>
                  {skill.name}
                </span>
              ))}
            </div>
          </Card>
        </Section>

        <Section id="contact" title="Contact Me">
          <ContactForm />
        </Section>
      </main>
      <Footer />
    </>
  );
}
