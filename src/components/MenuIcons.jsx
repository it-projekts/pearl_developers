// Line icons for the header mega menus (24×24 grid, stroke = currentColor).
// To change one, edit its paths here; to use your own image instead,
// put it in /public/icons and add an entry to `images` below.

const P = {
  // Industries
  heart: <><path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10Z" /><path d="M8 11h2l1-2 2 4 1-2h2" /></>,
  coins: <><ellipse cx="9" cy="7" rx="5" ry="2.5" /><path d="M4 7v4c0 1.4 2.2 2.5 5 2.5s5-1.1 5-2.5V7" /><path d="M10 15.4c.9.4 2.1.6 3.5.6 2.8 0 5-1.1 5-2.5v-4c0-1.2-1.6-2.2-3.8-2.4" /><path d="M10 17v1.5c0 1.4 2.2 2.5 5 2.5s5-1.1 5-2.5v-4" /></>,
  cap: <><path d="m2 9 10-5 10 5-10 5L2 9Z" /><path d="M6 11v5c0 1.5 2.7 3 6 3s6-1.5 6-3v-5" /><path d="M22 9v6" /></>,
  bag: <><path d="M5 8h14l-1 12H6L5 8Z" /><path d="M9 8V6a3 3 0 0 1 6 0v2" /></>,
  bed: <><path d="M3 18V6" /><path d="M3 14h18v4" /><path d="M21 14v-2a3 3 0 0 0-3-3h-7v5" /><circle cx="7" cy="11" r="1.6" /></>,
  truck: <><path d="M2 6h11v10H2z" /><path d="M13 9h4l3 3.5V16h-7" /><circle cx="6" cy="17.5" r="1.8" /><circle cx="16.5" cy="17.5" r="1.8" /></>,
  sprout: <><path d="M12 21v-9" /><path d="M12 12c0-4 3-6 7-6 0 4-3 6-7 6Z" /><path d="M12 14c0-3-2.4-5-6-5 0 3 2.4 5 6 5Z" /></>,
  bank: <><path d="m3 9 9-5 9 5" /><path d="M5 9v8M9.5 9v8M14.5 9v8M19 9v8" /><path d="M3 20h18" /></>,
  house: <><path d="m3 11 9-7 9 7" /><path d="M5 10v10h14V10" /><path d="M10 20v-5h4v5" /></>,
  ticket: <><path d="M3 8a2 2 0 0 0 0 4v0a2 2 0 0 1 0 4v2h18v-2a2 2 0 0 1 0-4 2 2 0 0 0 0-4V6H3v2Z" /><path d="M14 6v12" strokeDasharray="2 2" /></>,
  shield: <><path d="M12 3 5 6v5c0 4.5 3 8 7 10 4-2 7-5.5 7-10V6l-7-3Z" /><path d="m9 12 2 2 4-4" /></>,
  rocket: <><path d="M5 19c1-3 2-4 4-4" /><path d="M14 4c3 0 6 3 6 6l-7 7-6-6 7-7Z" /><circle cx="15" cy="9" r="1.5" /></>,
  // Services
  spark: <><path d="M12 3v4M12 17v4M3 12h4M17 12h4" /><path d="M12 8.5 13.2 11 16 12l-2.8 1-1.2 2.5L10.8 13 8 12l2.8-1L12 8.5Z" /></>,
  code: <><path d="m8 7-5 5 5 5" /><path d="m16 7 5 5-5 5" /><path d="m14 4-4 16" /></>,
  phone: <><rect x="7" y="2.5" width="10" height="19" rx="2.5" /><path d="M11 18h2" /></>,
  globe: <><circle cx="12" cy="12" r="9" /><path d="M3 12h18" /><path d="M12 3c2.5 2.7 3.5 5.7 3.5 9s-1 6.3-3.5 9c-2.5-2.7-3.5-5.7-3.5-9s1-6.3 3.5-9Z" /></>,
  pen: <><path d="m15 5 4 4L8 20H4v-4L15 5Z" /><path d="m13 7 4 4" /></>,
  cloud: <><path d="M7 18a4 4 0 0 1-.6-8A5.5 5.5 0 0 1 17 8.5a4.5 4.5 0 0 1 0 9.5H7Z" /></>,
  chip: <><rect x="7" y="7" width="10" height="10" rx="1.5" /><path d="M10 3v4M14 3v4M10 17v4M14 17v4M3 10h4M3 14h4M17 10h4M17 14h4" /></>,
  team: <><circle cx="9" cy="8" r="3" /><path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6" /><circle cx="17" cy="9" r="2.4" /><path d="M16 14.2c2.8.3 5 2.6 5 5.8" /></>,
  // Solutions
  layers: <><path d="m12 3 9 5-9 5-9-5 9-5Z" /><path d="m3 13 9 5 9-5" /></>,
  wallet: <><path d="M4 7h15a1 1 0 0 1 1 1v11H5a1 1 0 0 1-1-1V7Z" /><path d="M4 7l11-3v3" /><circle cx="16" cy="13" r="1.3" /></>,
  plusCross: <><rect x="3" y="3" width="18" height="18" rx="4" /><path d="M12 8v8M8 12h8" /></>,
  book: <><path d="M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2V5Z" /><path d="M4 19a2 2 0 0 1 2-2h13" /></>,
  cart: <><path d="M3 4h2l2.4 11h10.2L20 8H6.3" /><circle cx="9" cy="19" r="1.4" /><circle cx="17" cy="19" r="1.4" /></>,
  chat: <><path d="M4 5h16v11H9l-5 4V5Z" /><path d="M8 9.5h8M8 12.5h5" /></>,
  camera: <><path d="M3 7h3l2-3h8l2 3h3v12H3V7Z" /><circle cx="12" cy="13" r="3.5" /></>,
  // Company
  info: <><circle cx="12" cy="12" r="9" /><path d="M12 11v6M12 7.5v.5" /></>,
  briefcase: <><rect x="3" y="7" width="18" height="13" rx="2" /><path d="M9 7V5h6v2M3 12h18" /></>,
  steps: <><circle cx="5" cy="6" r="2" /><circle cx="12" cy="12" r="2" /><circle cx="19" cy="18" r="2" /><path d="M7 6h3a2 2 0 0 1 2 2v2M14 12h1a2 2 0 0 1 2 2v2" /></>,
  star: <><path d="m12 3 2.7 5.6 6.1.8-4.5 4.2 1.1 6.1L12 16.8l-5.4 2.9 1.1-6.1L3.2 9.4l6.1-.8L12 3Z" /></>,
  mail: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></>,
}

const byTitle = {
  // Industries
  'Healthcare': 'heart', 'Finance & SACCOs': 'coins', 'Education': 'cap', 'Retail & eCommerce': 'bag',
  'Hospitality & Tourism': 'bed', 'Transport & Logistics': 'truck', 'Agriculture': 'sprout',
  'Government & NGOs': 'bank', 'Real Estate': 'house', 'Events & Media': 'ticket', 'Security': 'shield', 'Startups': 'rocket',
  // Services
  'Artificial Intelligence': 'spark', 'Custom Software': 'code', 'Mobile App Development': 'phone',
  'Web & Digital Experience': 'globe', 'Product & UI/UX Design': 'pen', 'Cloud & DevOps': 'cloud',
  'Security, IoT & Embedded': 'chip', 'Dedicated Teams': 'team',
  // Solutions
  'Enterprise & Operations': 'layers', 'Finance & SACCO': 'wallet', 'Health & Hospitality': 'plusCross',
  'Education & Public Sector': 'book', 'Commerce, Transport & Property': 'cart', 'Communication & AI': 'chat', 'Security & IoT': 'camera',
  // Company
  'About Us': 'info', 'Our Work': 'briefcase', 'How We Work': 'steps', 'Careers': 'star', 'Contact Us': 'mail',
}

// Optional: use your own pictures, e.g. { 'Healthcare': '/icons/healthcare.png' }
const images = {}

export function MenuIcon({ title }) {
  if (images[title]) return <img src={images[title]} alt="" />
  const p = P[byTitle[title]]
  if (!p) return title[0]
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {p}
    </svg>
  )
}
