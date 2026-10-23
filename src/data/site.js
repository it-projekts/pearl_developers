// ─────────────────────────────────────────────────────────────
//  All site content lives here. Edit this file to update text,
//  contact details, services, solutions and projects.
//  Values marked  // TODO  are placeholders — replace them.
// ─────────────────────────────────────────────────────────────

export const company = {
  name: 'Pearl Developers',
  legal: 'Pearl Developers Limited',
  tagline: 'Building and innovating for the Pearl of Africa.',
  email: 'pearldevelopers256@gmail.com', // TODO real email
  phone: '+256 792875432', // TODO real phone
  whatsapp: '256792875432', // TODO digits only, used for wa.me link
  address: 'Kikandwa, Kakiri, Kampala, Uganda', // TODO full office address
  hours: 'Mon – Fri, 8:00 – 18:00 EAT',
  socials: [
    { label: 'LinkedIn', href: '#' }, // TODO
    { label: 'X / Twitter', href: '#' },
    { label: 'Instagram', href: '#' },
    { label: 'Facebook', href: '#' },
    { label: 'GitHub', href: '#' },
  ],
}

// ── Services ────────────────────────────────────────────────
export const services = [
  {
    slug: 'ai-automation',
    title: 'Artificial Intelligence',
    short: 'Intelligent products with AI, machine learning and automation.',
    intro:
      'We turn data and repetitive work into leverage — from chatbots that answer customers at 3am to models that forecast stock, flag fraud and read documents.',
    items: ['AI Development', 'Generative AI & LLM apps', 'AI Chatbots & Customer Support Bots', 'AI Agents & Workflow Automation', 'Machine Learning Models', 'OpenAI / Claude Integration', 'Computer Vision'],
    hue: ['#d9c8f0', '#f6d7e2'],
  },
  {
    slug: 'software-development',
    title: 'Custom Software',
    short: 'Reliable web platforms and business software, built to fit.',
    intro:
      'Bespoke systems shaped around how your organisation actually works — secure, fast and easy for your team to adopt.',
    items: ['Custom Software Development', 'ERP & CRM Systems', 'SaaS Product Development', 'MVP Development', 'API & Systems Integration', 'Legacy Modernisation'],
    hue: ['#c9dcf2', '#efe2d4'],
  },
  {
    slug: 'mobile-apps',
    title: 'Mobile App Development',
    short: 'Native and cross‑platform apps for every device.',
    intro:
      'Polished Android and iOS apps — with offline support, mobile money payments and the performance your users expect.',
    items: ['Android App Development', 'iOS App Development', 'Flutter & React Native', 'Mobile Money Integration', 'App Store Launch & Support'],
    hue: ['#f3d2c6', '#d6d2f2'],
  },
  {
    slug: 'web-development',
    title: 'Web & Digital Experience',
    short: 'Websites and portals that look as good as they perform.',
    intro:
      'Corporate and organisational websites, e‑commerce stores and portals — designed to impress and engineered to convert.',
    items: ['Corporate & Organisational Websites', 'E‑commerce Platforms', 'Content Management Systems', 'Progressive Web Apps', 'SEO & Performance'],
    hue: ['#cfe9e1', '#e9d6ef'],
  },
  {
    slug: 'design',
    title: 'Product & UI/UX Design',
    short: 'Research‑led design that people enjoy using.',
    intro:
      'From brand and wireframes to high‑fidelity prototypes and design systems, we design products that feel effortless.',
    items: ['UX Research', 'UI Design & Prototyping', 'Design Systems', 'Brand Identity', 'Usability Testing'],
    hue: ['#f5e1c8', '#e7cde0'],
  },
  {
    slug: 'cloud-devops',
    title: 'Cloud & DevOps',
    short: 'Flexible, secure and scalable cloud infrastructure.',
    intro:
      'We deploy, monitor and scale your applications on modern cloud platforms with automated pipelines and backups.',
    items: ['Cloud Migration', 'CI/CD Pipelines', 'Hosting & Maintenance', 'Backups & Disaster Recovery', 'Performance Monitoring'],
    hue: ['#d3e1f7', '#dceee6'],
  },
  {
    slug: 'security-iot',
    title: 'Security, IoT & Embedded',
    short: 'CCTV, intrusion detection, smart sensors and robotics.',
    intro:
      'Physical and digital security under one roof — surveillance installs, network intrusion detection, smoke and sensor networks, and embedded hardware.',
    items: ['CCTV Camera Installation', 'Intrusion Detection Systems', 'Smoke & Fire Detection (IoT)', 'Embedded Systems', 'Robotics & Automation'],
    hue: ['#e0d4c8', '#cbd5ea'],
  },
  {
    slug: 'dedicated-teams',
    title: 'Dedicated Teams',
    short: 'Extend your team with experienced developers.',
    intro:
      'Hire vetted engineers, designers and project managers who plug into your workflow — full‑time, part‑time or per project.',
    items: ['Staff Augmentation', 'Hire Developers', 'Project Management', 'Technical Consulting', 'Training & Mentorship'],
    hue: ['#ecd3d9', '#d2e4ee'],
  },
]

// ── Ready‑made solutions (systems catalogue) ────────────────
export const solutionGroups = [
  {
    key: 'enterprise',
    title: 'Enterprise & Operations',
    blurb: 'Run the whole organisation from one place.',
    items: [
      ['ERP Systems', 'Finance, procurement, HR and operations in one integrated platform.'],
      ['CRM Systems', 'Track leads, customers, deals and follow‑ups.'],
      ['Business Management Systems', 'Everyday operations, sales and reporting for SMEs.'],
      ['Inventory Management', 'Stock levels, suppliers, transfers and alerts.'],
      ['Point of Sale (POS)', 'Fast checkout, receipts, shifts and stock sync.'],
      ['Employee Management', 'Staff records, attendance, leave and payroll.'],
      ['Project Management', 'Plans, milestones, budgets and team workload.'],
      ['Task Management', 'Boards, assignments and deadlines for teams.'],
      ['Information Systems', 'Custom records and reporting for institutions.'],
      ['Performance & Productivity Assessment', 'Goals, appraisals and productivity scoring.'],
    ],
  },
  {
    key: 'finance',
    title: 'Finance & SACCO',
    blurb: 'Digital money, managed with care.',
    items: [
      ['SACCO Management Systems', 'Members, savings, shares, loans, dividends and statements.'],
      ['Loan & Microfinance Apps', 'Applications, scoring, disbursement and repayment tracking.'],
      ['Mobile Money & Payments', 'MTN MoMo, Airtel Money and card integrations.'],
      ['Charity & Donation Platforms', 'Campaigns, donors, pledges and transparent reporting.'],
    ],
  },
  {
    key: 'health',
    title: 'Health & Hospitality',
    blurb: 'Care and comfort, beautifully run.',
    items: [
      ['Hospital Management Systems', 'Patients, appointments, pharmacy, lab and billing.'],
      ['Hotel Management Systems', 'Reservations, rooms, housekeeping and front desk.'],
      ['Restaurant Management', 'Tables, kitchen display, menus and orders.'],
      ['Food Ordering & Delivery', 'Customer app, rider app and restaurant dashboard.'],
      ['Tourism & Travel Systems', 'Tours, bookings, itineraries and travel apps.'],
    ],
  },
  {
    key: 'education',
    title: 'Education & Public Sector',
    blurb: 'Institutions that run like clockwork.',
    items: [
      ['School Management Systems', 'Admissions, fees, report cards, timetables and parents portal.'],
      ['eLearning Platforms', 'Courses, quizzes, live classes and certificates.'],
      ['Voting & Election Systems', 'Secure, auditable digital elections.'],
      ['Survey & Opinion Polls', 'Questionnaires, sampling and live analytics.'],
      ['Job Application Systems', 'Postings, applications, shortlisting and interviews.'],
      ['Park & Facility Management', 'Visitors, gates, tickets and facility bookings.'],
    ],
  },
  {
    key: 'commerce',
    title: 'Commerce, Transport & Property',
    blurb: 'Platforms for buying, moving and living.',
    items: [
      ['E‑commerce Platforms', 'Online stores, marketplaces and vendor dashboards.'],
      ['Taxi Park Management', 'Vehicles, routes, dues, drivers and daily collections.'],
      ['Real Estate Management', 'Properties, tenants, rent collection and maintenance.'],
      ['Event Management', 'Events, registrations, guests and check‑in.'],
      ['Ticketing Systems', 'Event tickets, QR validation and support ticketing.'],
      ['Farm Management Systems', 'Crops, livestock, inputs, yields and farm finances.'],
    ],
  },
  {
    key: 'communication',
    title: 'Communication & AI',
    blurb: 'Conversations at scale.',
    items: [
      ['Chat & Messaging Apps', 'Real‑time messaging, groups, media and calls.'],
      ['Customer Support Chatbots', 'AI assistants on web, WhatsApp and social.'],
      ['Content Management Systems', 'Publish and manage content without code.'],
      ['Organisational Websites', 'Professional sites for companies, NGOs and churches.'],
    ],
  },
  {
    key: 'security',
    title: 'Security & IoT',
    blurb: 'Protect people, places and networks.',
    items: [
      ['CCTV Camera Installations', 'Design, supply, installation and remote viewing.'],
      ['Intrusion Detection Systems', 'Network monitoring and threat alerts (Suricata‑based).'],
      ['Smoke & Fire Detection', 'Connected sensors with SMS and app alerts.'],
      ['Embedded Systems & Robotics', 'Microcontrollers, automation and prototypes.'],
    ],
  },
]

export const solutionCount = solutionGroups.reduce((n, g) => n + g.items.length, 0)

// TODO adjust to your real numbers
export const stats = [
  { value: solutionCount, suffix: '', label: 'Ready-to-deploy systems' },
  { value: 120, suffix: '+', label: 'Projects delivered' },
  { value: 12, suffix: '', label: 'Industries served' },
  { value: 98, suffix: '%', label: 'Client retention' },
]


// ── Industries ──────────────────────────────────────────────
export const industries = [
  { title: 'Healthcare', text: 'Hospital, clinic and pharmacy software for providers and patients.', apps: ['Hospital Management', 'Doctor Appointments', 'Pharmacy & Lab'] },
  { title: 'Finance & SACCOs', text: 'Core systems for SACCOs, microfinance and digital lenders.', apps: ['SACCO Systems', 'Loan Apps', 'Mobile Money'] },
  { title: 'Education', text: 'Platforms for schools, universities, tutors and learners.', apps: ['School Management', 'eLearning', 'Student Portals'] },
  { title: 'Retail & eCommerce', text: 'Stores, marketplaces, POS and inventory for brands and shops.', apps: ['E‑commerce', 'POS', 'Inventory'] },
  { title: 'Hospitality & Tourism', text: 'Hotels, restaurants, tour operators and travel businesses.', apps: ['Hotel Systems', 'Restaurant Systems', 'Travel Apps'] },
  { title: 'Transport & Logistics', text: 'Taxi parks, fleets, deliveries and dispatch.', apps: ['Taxi Park Mgmt', 'Delivery Apps', 'Fleet Tracking'] },
  { title: 'Agriculture', text: 'Farm records, cooperatives and agri‑value chains.', apps: ['Farm Management', 'Cooperatives', 'Market Linkage'] },
  { title: 'Government & NGOs', text: 'Transparent systems for public bodies and non‑profits.', apps: ['Voting Systems', 'Donations', 'Surveys'] },
  { title: 'Real Estate', text: 'Property, tenant and rent management.', apps: ['Property Mgmt', 'Rent Collection', 'Listings'] },
  { title: 'Events & Media', text: 'Ticketing, events and content experiences.', apps: ['Ticketing', 'Event Mgmt', 'Streaming'] },
  { title: 'Security', text: 'Surveillance, intrusion detection and safety sensors.', apps: ['CCTV', 'IDS', 'Smoke Detection'] },
  { title: 'Startups', text: 'MVPs and SaaS products, from idea to launch.', apps: ['MVP', 'SaaS', 'AI Products'] },
]

// ── Selected work (case studies) ────────────────────────────
// TODO replace with your real projects (client names, links, images)
export const projectFilters = ['All', 'Systems', 'Mobile', 'Web', 'AI', 'IoT']

export const projects = [
  { title: 'Kiguma SACCO Suite', category: 'Systems', kind: 'Core banking & member portal', year: '2026', palette: ['#e7d6f3', '#f7e3d6', '#b9c4ef'], shape: 'rings' },
  { title: 'Campus One', category: 'Systems', kind: 'School management platform', year: '2025', palette: ['#d7e7f6', '#f4ead9', '#c7b6e6'], shape: 'grid' },
  { title: 'Mediq HMS', category: 'Systems', kind: 'Hospital management system', year: '2025', palette: ['#d3efe6', '#eef0f6', '#a9d0e8'], shape: 'pulse' },
  { title: 'Ride & Route', category: 'Mobile', kind: 'Taxi park & fleet app', year: '2025', palette: ['#f6dccf', '#f3efe7', '#e5b9a8'], shape: 'wave' },
  { title: 'Ask Pearl', category: 'AI', kind: 'Customer support chatbot', year: '2026', palette: ['#e4d9f7', '#fbe7ef', '#c2b0ee'], shape: 'orb' },
  { title: 'Market Bloom', category: 'Web', kind: 'Multi‑vendor e‑commerce', year: '2024', palette: ['#f7e6cf', '#f6dfe3', '#ecc49b'], shape: 'arch' },
  { title: 'Sentinel Watch', category: 'IoT', kind: 'Intrusion & smoke detection', year: '2025', palette: ['#d6dbe8', '#e9e4dc', '#9fb0cf'], shape: 'radar' },
  { title: 'Ballot Clear', category: 'Systems', kind: 'Secure digital voting', year: '2024', palette: ['#e1ecd9', '#f3eee4', '#b7d1a8'], shape: 'grid' },
  { title: 'Feast Express', category: 'Mobile', kind: 'Food ordering & delivery', year: '2024', palette: ['#fbd9cf', '#fbefe1', '#f0a993'], shape: 'wave' },
  { title: 'Vision Count', category: 'AI', kind: 'Computer‑vision stock counting', year: '2026', palette: ['#d8e3f5', '#efe7f5', '#a7bce6'], shape: 'orb' },
  { title: 'Kindred Giving', category: 'Web', kind: 'Charity & donations platform', year: '2025', palette: ['#f3e0e6', '#f2ece3', '#d9a9ba'], shape: 'arch' },
  { title: 'Agro Ledger', category: 'Mobile', kind: 'Farm management app', year: '2025', palette: ['#e2ecd0', '#f4f0e2', '#bfd39a'], shape: 'rings' },
]

// ── Values & process ────────────────────────────────────────
export const values = [
  { title: 'Integrity', text: 'We keep our word, price honestly and protect your data as if it were our own.' },
  { title: 'Craft', text: 'Like a pearl, great software is built layer by layer. We sweat the details.' },
  { title: 'Transparency', text: 'Clear timelines, open communication and progress you can see every week.' },
  { title: 'Partnership', text: 'We stay after launch — supporting, improving and growing with you.' },
]

export const process = [
  { title: 'Discover', text: 'Workshops to understand your goals, users and constraints.' },
  { title: 'Design', text: 'Wireframes and prototypes you can click before we code.' },
  { title: 'Build', text: 'Agile sprints with weekly demos and a staging link.' },
  { title: 'Launch', text: 'Testing, deployment, training and a smooth go‑live.' },
  { title: 'Grow', text: 'Support, analytics and new features as you scale.' },
]

export const testimonials = [
  // TODO replace with real client quotes (with permission)
  { quote: 'Add a real client quote here — what changed for them after working with Pearl Developers.', name: 'Client name', role: 'Title, Organisation' },
  { quote: 'A second testimonial goes here. Short, specific and about outcomes works best.', name: 'Client name', role: 'Title, Organisation' },
  { quote: 'A third testimonial. Mention speed, quality, support or measurable results.', name: 'Client name', role: 'Title, Organisation' },
]

export const team = [
  // TODO replace with your real team (add photo: '/team/name.jpg' in /public/team)
  { name: 'Team Member', role: 'Founder & CEO' },
  { name: 'Team Member', role: 'Lead Engineer' },
  { name: 'Team Member', role: 'Product Designer' },
  { name: 'Team Member', role: 'Mobile Lead' },
  { name: 'Team Member', role: 'Project Manager' },
]
