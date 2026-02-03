
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function main() {
    console.log('Seeding database...')

    // Profile
    const profile = await prisma.profile.upsert({
        where: { id: 1 },
        update: {},
        create: {
            name: 'Wisdom Waliweyo Kalima',
            title: 'Data Analyst | Data & ICT Specialist',
            bio: `I am a dedicated Data Analyst and ICT Specialist with a strong background in data management, monitoring & evaluation, and ICT support. I hold a Bachelor of Education in Computer Science from the University of Malawi and have gained valuable experience working with government agencies and development projects.

My expertise spans data analysis using tools like SPSS, STATA, Power BI, and Excel, alongside strong ICT capabilities in database management, IT support, and networking. I am passionate about leveraging technology to improve data-driven decision-making in development contexts.

Throughout my career, I have contributed to projects in climate-smart agriculture, electoral management, and education, demonstrating my ability to handle complex data and coordinate effectively with diverse teams and stakeholders.`,
            location: 'Zomba, Malawi',
            email: 'wisdom.kalima@email.com',
            phone: '+265 888 XXX XXX',
            available: true,
        },
    })

    // Experiences
    const experienceData = [
        {
            title: 'ICT Officer Intern',
            company: 'Zomba District Council',
            period: '2023 - 2024',
            description: JSON.stringify([
                'Provided ICT technical support and troubleshooting for district office staff and equipment',
                'Managed and maintained computer systems, networks, and IT infrastructure',
                'Assisted in data entry, management, and reporting for district-level programs',
                'Coordinated with various departments to ensure smooth ICT operations and service delivery'
            ]),
            order: 1
        },
        {
            title: 'ICT Intern',
            company: 'Climate-Smart Agriculture Youth Network | World Bank Project',
            period: '2022 - 2023',
            description: JSON.stringify([
                'Managed beneficiary database tracking over 1,000 youth participants in climate-smart agriculture programs',
                'Conducted data collection, entry, and analysis using Excel and SPSS for M&E purposes',
                'Created regular progress reports and visualizations for project stakeholders'
            ]),
            order: 2
        },
        {
            title: 'ICT & Mathematics Teacher | Lab Technician',
            company: 'Nsanama Community Day Secondary School',
            period: '2020 - 2022',
            description: JSON.stringify([
                'Taught Computer Science and Mathematics to secondary school students',
                'Managed and maintained school computer laboratory equipment and software',
                'Trained fellow teachers and students in basic ICT skills and applications',
                'Provided IT support for school administrative systems and digital records management'
            ]),
            order: 3
        },
        {
            title: 'Elections Clerk',
            company: 'Malawi Electoral Commission (MEC)',
            period: '2019 - 2020',
            description: JSON.stringify([
                'Managed voter registration data and electoral records during national elections',
                'Ensured accurate data entry and verification of voter information',
                'Coordinated with polling staff and provided administrative support during election periods',
                'Maintained confidentiality and integrity of sensitive electoral data'
            ]),
            order: 4
        }
    ]

    for (const exp of experienceData) {
        await prisma.experience.create({ data: exp })
    }

    // Education
    const educationData = [
        {
            degree: 'Bachelor of Education in Computer Science',
            institution: 'University of Malawi, Domasi College of Education',
            period: '2017 - 2021',
            details: 'Focus: Computer Science, Educational Technology, and Pedagogical Methods',
            order: 1
        }
    ]

    for (const edu of educationData) {
        await prisma.education.create({ data: edu })
    }

    // Skills
    const skills = [
        'SPSS', 'STATA', 'Power BI', 'Excel',
        'Database Management', 'ICT Support', 'Networking', 'Python', 'SQL'
    ]

    for (const skill of skills) {
        await prisma.skill.create({
            data: { name: skill, category: 'Technical' }
        })
    }

    console.log('Seeding finished.')
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
