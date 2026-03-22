# Pangako — Philippine Politician Promise Tracker

Pangako is a transparency-focused web application that tracks the campaign promises, projects, stances, and financial disclosures of Philippine politicians. Our goal is to fight misinformation and provide accurate, well-referenced data by creating a central source of information for all activities and projects involving public officials.

All information provided is properly referenced from credible government sources accessible by anyone. Citizens are also encouraged to contribute through our feedback submission system.

> This is a submission for the **Batang Techno InterCICSkwela Hackathon 2026** preliminary round, submitted on March 22, 2026.
> Aligned with **SDG 16: Peace, Justice and Strong Institutions**.

---

## Project Overview

Pangako addresses **Challenge #3: Transparency, Accountability, and Good Governance** by providing a platform where citizens can:
- Track politician promises and whether they were fulfilled, discontinued, or still in progress
- View politician stances on key national issues
- Access SALN (Statement of Assets, Liabilities & Net Worth) data
- Submit evidence, corrections, or new information through a feedback form

---

## Pages

| Page | Description |
|------|-------------|
| **Home** | Landing page with the Pangako branding and navigation |
| **Politicians** | Grid of all tracked politicians with search and suggestions |
| **Politician Detail** | Full profile — projects, stances, SALN, and success rate |
| **News** | News articles related to governance and politician activities |
| **Feedback** | Citizen submission form for new evidence, corrections, or tip-offs |

---

## Key Features

1. **Politician Promise Tracker** — Each politician has a list of projects tagged as Fulfilled, In Progress, or Discontinued, with a computed success rate
2. **Stance Tracker** — Tracks where each politician stands on key national issues (death penalty, divorce, federalism, etc.)
3. **SALN Viewer** — Displays declared assets, liabilities, and net worth per year with references to official sources
4. **Search with Suggestions** — Real-time search with photo and position suggestions as you type
5. **Citizen Feedback System** — Citizens can submit new evidence, corrections, new promises, or general feedback. Source URL is required for evidence-based submissions to ensure credibility
6. **Referenced Data** — Every project, stance, and SALN entry links back to a credible source (PNA, DepEd, Senate, COA, Ombudsman, etc.)
7. **Dynamic News Section** — News articles rendered from the database with full article detail pages
8. **MongoDB Backend** — All data stored in a proper database, replacing localStorage with persistent server-side storage

---

## Data Sources

All politician data is sourced from credible Philippine government and news sources:

- **COMELEC** — comelec.gov.ph
- **Philippine News Agency** — pna.gov.ph
- **Official Gazette** — officialgazette.gov.ph
- **Senate of the Philippines** — senate.gov.ph
- **House of Representatives** — congress.gov.ph
- **Commission on Audit** — coa.gov.ph
- **Office of the Ombudsman (SALN)** — ombudsman.gov.ph
- **Department of Education** — deped.gov.ph
- **Rappler, Inquirer, PhilStar** — for news and stance references

---

## How to Run

### Prerequisites
- Node.js v18+
- MongoDB (local) or MongoDB Atlas (cloud)

### Steps

1. Clone the repository
```bash
git clone https://github.com/your-repo/pangako-web-app.git
cd pangako-web-app
```

2. Install dependencies
```bash
npm install
```

3. Create a `.env` file in the root directory
```env
MONGO_URI=mongodb://localhost:27017/pangako
PORT=3000
```

4. Start MongoDB (if using local)
```bash
sudo service mongod start
```

5. Seed the database with initial data
```bash
npm run seed
```

6. Start the server
```bash
npm run dev
```

7. Open your browser and go to `http://localhost:3000`

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | HTML, CSS, Vanilla JavaScript |
| Backend | Node.js, Express.js |
| Database | MongoDB, Mongoose |
| Dev Tools | Nodemon, dotenv |

---

## Project Structure

```
pangako-web-app/
├── images/                  # Static images
├── models/                  # Mongoose schemas (Politician, News, Feedback)
├── routes/                  # Express API routes
├── controllers/             # Route handler logic
├── data/                    # Seed script for initial data
├── politicians-section/     # Politicians list and detail pages
├── news-section/            # News list and detail pages
├── feedback-section/        # Citizen feedback form
├── js/                      # Legacy data files (reference only)
├── server.js                # Express app entry point
├── index.html               # Home page
├── styles.css               # Global styles
├── page-transitions.css     # Page transition animations
├── page-transitions.js      # Page transition logic
├── package.json             # Project dependencies
├── package-lock.json        # Dependency lock file
├── .gitignore               # Git ignore rules
└── README.md                # Project documentation
```

---

## API Endpoints

### Politicians
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/politicians` | Get all politicians |
| GET | `/api/politicians/:id` | Get single politician |
| POST | `/api/politicians` | Add politician |
| PUT | `/api/politicians/:id` | Update politician |
| DELETE | `/api/politicians/:id` | Delete politician |

### News
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/news` | Get all news |
| GET | `/api/news/:id` | Get single article |
| POST | `/api/news` | Add article |
| DELETE | `/api/news/:id` | Delete article |

### Feedback
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/feedback` | Get all submissions |
| POST | `/api/feedback` | Submit feedback |
| DELETE | `/api/feedback/:id` | Delete submission |

---

## Authors

1. Beloso, Dal
2. Hallare, Eu
3. Ilagan, Vince
4. Odon, Marc
5. Tipan, Jiro

---

## Contributing

Citizens can contribute by submitting feedback through the website's feedback form. All submissions are reviewed by admins before being added to the database to ensure accuracy and credibility of sources.
