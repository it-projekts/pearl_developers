// Short ICT courses shown on /online_study. Edit, add or remove freely: each entry is
// c(slug, title, area, level, description, tools, [classes]) and each class is one live lesson.

// Live lessons run on Jitsi Meet. meet.jit.si is free, but the host must sign in there to open the
// room, and it must run in its own tab. With your own Jitsi server, put its domain here and set
// embed to true to keep lessons inside this website.
export const classroom = { domain: 'meet.jit.si', embed: false }

const c = (slug, title, cat, level, text, tools, classes) => ({ slug, title, cat, level, text, tools, classes })

export const courses = [
  c('computer-basics', 'Computer Basics', 'Essentials', 'Beginner', 'Start from zero: use a computer, manage files and work online with confidence.', 'Windows, web browser',
    ['Parts of a computer and starting up', 'Windows desktop, settings and apps', 'Files, folders and flash disks', 'Typing and keyboard shortcuts', 'Internet search and safe browsing', 'Printing, updates and simple fixes']),
  c('microsoft-office', 'Microsoft Office', 'Essentials', 'Beginner', 'Write documents, build spreadsheets and present ideas for school or the office.', 'Word, Excel, PowerPoint',
    ['Word: letters, reports and formatting', 'Word: tables, styles and mail merge', 'Excel: cells, formulas and formatting', 'Excel: charts, sorting and filters', 'PowerPoint: slides that are easy to follow', 'Final task: report, budget and presentation']),
  c('email-online-tools', 'Email and Online Work Tools', 'Essentials', 'Beginner', 'Communicate and share work the way modern offices do.', 'Gmail, Google Drive, Docs, Meet',
    ['Creating and securing an email account', 'Writing professional emails', 'Google Drive: storing and sharing files', 'Docs, Sheets and Forms together', 'Video meetings and calendars']),
  c('advanced-excel', 'Advanced Excel', 'Essentials', 'Intermediate', 'Turn raw numbers into reports people can act on.', 'Excel',
    ['Lookup and logical functions', 'Cleaning messy data', 'Pivot tables and pivot charts', 'Dashboards', 'Macros for repeated work', 'Project: a monthly business report']),

  c('programming-python', 'Programming with Python', 'Programming', 'Beginner', 'Learn to think like a programmer and write useful programs.', 'Python, VS Code',
    ['Installing Python and your first program', 'Variables, input and decisions', 'Loops and lists', 'Functions and modules', 'Files and errors', 'Objects and classes', 'Project: a small record keeper']),
  c('web-design', 'Website Design', 'Programming', 'Beginner', 'Build web pages that look right on phones and computers.', 'HTML, CSS, VS Code',
    ['How websites work', 'HTML pages, links and images', 'Forms and tables', 'CSS colours, text and spacing', 'Layouts with Flexbox and Grid', 'Making pages fit phones', 'Project: publish your own site']),
  c('javascript-react', 'JavaScript and React', 'Programming', 'Intermediate', 'Make websites interactive and build modern web apps.', 'JavaScript, React, Git',
    ['JavaScript basics', 'Working with the page and events', 'Fetching data from an API', 'React components and props', 'State and forms', 'Pages and routing', 'Project: deploy a React app']),
  c('backend-apis', 'Backend and APIs', 'Programming', 'Intermediate', 'Write the server side of an app: accounts, data and security.', 'Node.js, Express, PostgreSQL',
    ['How servers and HTTP work', 'Building routes with Express', 'Connecting a database', 'Sign-up, login and permissions', 'Testing an API', 'Project: deploy an API']),
  c('mobile-apps', 'Mobile App Development', 'Programming', 'Intermediate', 'Create Android and iPhone apps from one codebase.', 'Flutter, Dart',
    ['Setting up Flutter and Dart basics', 'Widgets and layouts', 'Screens and navigation', 'Forms and saved data', 'Connecting to an API', 'Project: build and package an app']),
  c('wordpress', 'WordPress Websites', 'Programming', 'Beginner', 'Launch and run a business website without writing code.', 'WordPress, WooCommerce',
    ['Domains, hosting and installing WordPress', 'Themes, pages and menus', 'Useful plugins', 'Setting up an online shop', 'Security, backups and speed']),
  c('git-github', 'Git and GitHub', 'Programming', 'Beginner', 'Save your code history and work with other developers.', 'Git, GitHub',
    ['Commits and history', 'Branches and merging', 'GitHub and pull requests', 'Fixing conflicts and publishing']),

  c('databases-sql', 'Databases and SQL', 'Data & AI', 'Beginner', 'Design a database and ask it questions.', 'MySQL, PostgreSQL',
    ['Tables, keys and relationships', 'Selecting and filtering data', 'Joining tables', 'Grouping and totals', 'Designing a database', 'Project: a school or shop database']),
  c('data-analysis', 'Data Analysis', 'Data & AI', 'Intermediate', 'Find patterns in data and explain them clearly.', 'Excel, Power BI, Python',
    ['Asking the right questions', 'Cleaning data', 'Charts that tell the truth', 'Power BI reports', 'Analysis with Python pandas', 'Project: present your findings']),
  c('ai-tools', 'Using AI at Work', 'Data & AI', 'Beginner', 'Use AI assistants well, and know where they go wrong.', 'Claude, ChatGPT, Gemini',
    ['What AI can and cannot do', 'Writing good prompts', 'AI for writing, research and spreadsheets', 'Checking answers and protecting privacy', 'Automating a daily task']),
  c('machine-learning', 'Machine Learning Foundations', 'Data & AI', 'Advanced', 'Train, test and explain your first models.', 'Python, scikit-learn',
    ['Preparing data', 'Predicting numbers', 'Predicting categories', 'Measuring a model fairly', 'Introduction to neural networks', 'Project: train and present a model']),

  c('graphic-design', 'Graphic Design', 'Design & Media', 'Beginner', 'Design posters, logos and social media graphics.', 'Photoshop, Illustrator, Canva',
    ['Colour, type and layout', 'Canva for quick designs', 'Photoshop: editing photos', 'Illustrator: logos and shapes', 'Preparing work for print and web', 'Project: a brand kit']),
  c('ui-ux', 'UI/UX Design', 'Design & Media', 'Intermediate', 'Plan and design apps people find easy to use.', 'Figma',
    ['Understanding users', 'Flows and wireframes', 'Figma basics', 'Components and design systems', 'Prototypes and user testing', 'Project: an app prototype']),
  c('video-editing', 'Video Editing', 'Design & Media', 'Beginner', 'Cut, caption and publish videos for work or social media.', 'CapCut, Premiere Pro',
    ['Shooting usable footage', 'Cutting and arranging', 'Sound and music', 'Captions, titles and colour', 'Exporting and publishing']),
  c('digital-marketing', 'Digital Marketing', 'Design & Media', 'Beginner', 'Reach customers through search, social media and email.', 'Meta Business, Google Ads, Analytics',
    ['Knowing your customer', 'Content for social media', 'Getting found on Google', 'Running paid adverts', 'Email and WhatsApp marketing', 'Measuring results']),

  c('computer-networking', 'Computer Networking', 'Networks & Security', 'Beginner', 'Set up and fix office and home networks.', 'Cisco Packet Tracer',
    ['How networks work', 'Cables, switches and routers', 'IP addresses and subnets', 'Wireless networks', 'Configuring a router', 'Finding and fixing faults']),
  c('cybersecurity', 'Cybersecurity Essentials', 'Networks & Security', 'Beginner', 'Protect people, devices and data from common attacks.', 'Wireshark, password managers',
    ['Threats and how attacks happen', 'Passwords and two-step login', 'Spotting phishing and scams', 'Securing devices and networks', 'Backups and recovery', 'Responding to an incident']),
  c('linux-cloud', 'Linux and Cloud Basics', 'Networks & Security', 'Intermediate', 'Run servers and put applications online.', 'Ubuntu, AWS, Docker',
    ['Linux command line', 'Users, files and permissions', 'Cloud services explained', 'Launching a server', 'Containers with Docker', 'Project: host a website']),
  c('computer-repair', 'Computer Repair and Maintenance', 'Networks & Security', 'Beginner', 'Diagnose, upgrade and look after computers.', 'Windows, diagnostic tools',
    ['Inside a computer', 'Safe handling and assembly', 'Installing Windows and drivers', 'Finding hardware faults', 'Viruses and data recovery', 'Planned maintenance']),
  c('cctv-iot', 'CCTV and IoT', 'Networks & Security', 'Intermediate', 'Plan camera systems and connect smart devices.', 'IP cameras, Arduino',
    ['Camera types and site planning', 'Recorders, storage and remote viewing', 'Arduino basics', 'Sensors and alerts', 'Project: a connected alarm']),
]
export const courseCats = ['All', ...new Set(courses.map((x) => x.cat))]
export const courseBySlug = (slug) => courses.find((x) => x.slug === slug)
