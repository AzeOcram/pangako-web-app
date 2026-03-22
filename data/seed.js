import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Politician from '../models/Politician.js';
import NewsModel from '../models/News.js';

dotenv.config();

const politicians = [
  {
    firstname: 'BONG BONG',
    lastname: 'MARCOS',
    order: 1,
    fullname: 'Ferdinand Romualdez Marcos Jr.',
    photo: '/images/marcos.png',
    position: 'President',
    party: 'Partido Federal ng Pilipinas (PFP)',
    term: '2022 – 2028',
    successRate: '64%',
    projects: [
      { name: 'Adopt-a-Farm Program', status: 'Fulfilled', description: 'Distributed farm inputs to 250,000 farmers across Luzon, Visayas, and Mindanao.', reference: 'https://www.da.gov.ph/' },
      { name: 'Maharlika Investment Fund', status: 'Fulfilled', description: 'Established a sovereign wealth fund to attract foreign investment.', reference: 'https://www.officialgazette.gov.ph/' },
      { name: 'Rice Tariffication Law Amendment', status: 'In Progress', description: 'Proposed amendments to stabilize rice prices for consumers and farmers.', reference: 'https://www.da.gov.ph/' },
      { name: 'Free Irrigation for Farmers', status: 'In Progress', description: 'Nationwide rollout of free irrigation services for small-scale farmers.', reference: 'https://www.da.gov.ph/' },
      { name: 'Anti-Illegal Drugs Campaign', status: 'In Progress', description: 'Continuation of the anti-drug campaign through proper legal channels.', reference: 'https://www.pna.gov.ph/' },
      { name: 'Salary Increase for Teachers', status: 'Discontinued', description: 'Proposed across-the-board salary increase for public school teachers was shelved due to budget constraints.', reference: 'https://www.deped.gov.ph/' },
    ],
    stances: [
      { issue: 'Same-Sex Marriage', stance: 'Disagree', reference: 'https://www.rappler.com/' },
      { issue: 'Death Penalty', stance: 'Agree', reference: 'https://www.rappler.com/' },
      { issue: 'Divorce Legalization', stance: 'Disagree', reference: 'https://www.rappler.com/' },
      { issue: 'Federalism', stance: 'Agree', reference: 'https://www.rappler.com/' },
      { issue: 'West Philippine Sea Arbitration', stance: 'Agree', reference: 'https://www.pna.gov.ph/' },
      { issue: 'Mandatory ROTC', stance: 'Agree', reference: 'https://www.pna.gov.ph/' },
    ],
    saln: [
      { year: '2022', assets: '₱960,700,422', liabilities: '₱0', networth: '₱960,700,422', reference: 'https://saln.bettergov.ph/saln/ferdinand-marcos-jr./2022-marcos-jr..pdf' },
      { year: '2023', assets: '₱1,157,867,589', liabilities: '₱0', networth: '₱1,157,867,589', reference: 'https://saln.bettergov.ph/saln/ferdinand-marcos-jr./2023-marcos-jr..pdf' },
      { year: '2024', assets: '₱1,375,378,063', liabilities: '₱0', networth: '₱1,375,378,063', reference: 'https://saln.bettergov.ph/saln/ferdinand-marcos-jr./2024-marcos-jr..pdf' },
    ],
  },
  {
    firstname: 'SARA',
    lastname: 'DUTERTE',
    order: 2,
    fullname: 'Sara Zimmerman Duterte-Carpio',
    photo: '/images/duterte.png',
    position: 'Vice President',
    party: 'Hugpong ng Pagbabago',
    term: '2022 – 2028',
    successRate: '50%',
    projects: [
      { name: 'MATATAG Curriculum', status: 'In Progress', description: 'Launched a revised K-12 curriculum to address learning losses from the pandemic.', reference: 'https://www.deped.gov.ph/' },
      { name: 'School-Based Feeding Program', status: 'In Progress', description: 'Expanded feeding programs in all public elementary schools nationwide.', reference: 'https://www.deped.gov.ph/' },
      { name: 'Address Textbook Shortage', status: 'In Progress', description: 'Procurement of new textbooks initiated but backlogs remain in many schools.', reference: 'https://www.deped.gov.ph/' },
    ],
    stances: [
      { issue: 'Same-Sex Marriage', stance: 'Disagree', reference: 'https://www.rappler.com/' },
      { issue: 'Death Penalty', stance: 'Agree', reference: 'https://www.rappler.com/' },
      { issue: 'Divorce Legalization', stance: 'Disagree', reference: 'https://www.rappler.com/' },
      { issue: 'Mandatory ROTC', stance: 'Agree', reference: 'https://www.pna.gov.ph/' },
    ],
    saln: [
      { year: '2022', assets: '₱74,808,841', liabilities: '₱3,150,000', networth: '₱71,658,841', reference: 'https://saln.bettergov.ph/saln/sara-duterte/2022-sara-duterte.pdf' },
      { year: '2023', assets: '₱80,058,841', liabilities: '₱2,550,000', networth: '₱77,508,841', reference: 'https://saln.bettergov.ph/saln/sara-duterte/2023-sara-duterte.pdf' },
      { year: '2024', assets: '₱98,462,370', liabilities: '₱9,950,000', networth: '₱88,512,370', reference: 'https://saln.bettergov.ph/saln/sara-duterte/2024-sara-duterte.pdf' },
    ],
  },
  {
    firstname: 'FRANCIS',
    lastname: 'ESCUDERO',
    order: 3,
    fullname: 'Francis Joseph G. Escudero',
    photo: '/images/escudero.png',
    position: 'Senate President',
    party: 'NPC',
    term: '2022 – 2028',
    successRate: '55%',
    projects: [
      { name: 'Magna Carta for Filipino Seafarers', status: 'Fulfilled', description: 'Passed legislation to strengthen protections and benefits for Filipino seafarers.', reference: 'https://www.senate.gov.ph/' },
      { name: 'Anti-Agricultural Smuggling Act', status: 'Fulfilled', description: 'Authored law imposing heavier penalties on agricultural smugglers.', reference: 'https://www.senate.gov.ph/' },
      { name: 'National Land Use Act', status: 'In Progress', description: 'Pushing for passage of a national land use policy to rationalize land allocation.', reference: 'https://www.senate.gov.ph/' },
    ],
    stances: [
      { issue: 'Death Penalty', stance: 'Agree', reference: 'https://www.senate.gov.ph/' },
      { issue: 'Divorce Legalization', stance: 'Disagree', reference: 'https://www.rappler.com/' },
      { issue: 'West Philippine Sea Arbitration', stance: 'Agree', reference: 'https://www.senate.gov.ph/' },
    ],
    saln: [
      { year: '2017', assets: '₱8,502,082', liabilities: '₱0', networth: '₱8,502,082', reference: 'https://www.rappler.com/philippines/202728-senators-2017-saln-villar-pacquiao-richest/' },
      { year: '2018', assets: '₱15,575,228', liabilities: '₱5,000,000', networth: '₱10,575,228', reference: 'https://legacy.senate.gov.ph/Summary%202018%20SALN.pdf' },
      { year: '2024', assets: '₱18,840,083', liabilities: '₱0', networth: '₱18,840,083', reference: 'https://www.abs-cbn.com/news/nation/2025/10/29/all-24-senators-of-20th-congress-release-salns-1343' },
    ],
  },
  {
    firstname: 'MARTIN',
    lastname: 'ROMUALDEZ',
    order: 4,
    fullname: 'Ferdinand Martin Gerardo Romualdez',
    photo: '/images/romualdez.png',
    position: 'House Speaker',
    party: 'Lakas-CMD',
    term: '2022 – 2025',
    successRate: '60%',
    projects: [
      { name: 'Ease of Doing Business Act Implementation', status: 'Fulfilled', description: 'Pushed for stricter implementation of the EODB Act across all government agencies.', reference: 'https://www.congress.gov.ph/' },
      { name: 'Mandatory ROTC Bill', status: 'In Progress', description: 'Championing the mandatory ROTC bill for senior high school students.', reference: 'https://www.congress.gov.ph/' },
      { name: 'Barangay Development Fund Increase', status: 'In Progress', description: 'Advocating for increased barangay development funds in the national budget.', reference: 'https://www.congress.gov.ph/' },
    ],
    stances: [
      { issue: 'Mandatory ROTC', stance: 'Agree', reference: 'https://www.congress.gov.ph/' },
      { issue: 'Death Penalty', stance: 'Agree', reference: 'https://www.rappler.com/' },
      { issue: 'West Philippine Sea Arbitration', stance: 'Agree', reference: 'https://www.congress.gov.ph/' },
    ],
    saln: [
      { year: '2022', assets: '₱120,000,000', liabilities: '₱5,000,000', networth: '₱115,000,000', reference: 'https://www.ombudsman.gov.ph/' },
      { year: '2023', assets: '₱135,000,000', liabilities: '₱4,500,000', networth: '₱130,500,000', reference: 'https://www.ombudsman.gov.ph/' },
    ],
  },
];

const news = [
  {
    title: 'Marcos signs EO to lower rice prices amid public outcry',
    date: 'March 2026',
    image: '/images/marcosEO.png',
    summary: 'President Marcos signed an executive order imposing a price cap on rice sold in public markets nationwide.',
    body: [
      'President Ferdinand Marcos Jr. signed Executive Order No. 23, placing a price ceiling on regular milled rice and well-milled rice sold in public markets and supermarkets across the country.',
      'The order comes amid rising prices of the staple grain, which has remained above P50 per kilogram despite government efforts to stabilize the market.',
      'Agriculture Secretary Francisco Tiu Laurel Jr. said the government would work with private traders and importers to ensure adequate supply to sustain the price cap.',
    ],
  },
  {
    title: 'Senate approves bill expanding Universal Health Care coverage',
    date: 'February 2026',
    image: '/images/senate.png',
    summary: 'The Senate passed amendments to the Universal Health Care Act expanding coverage to include mental health services.',
    body: [
      'The Philippine Senate unanimously approved a bill amending the Universal Health Care Act to include comprehensive mental health services under PhilHealth coverage.',
      'Senate President Francis Escudero, who co-authored the measure, said the amendment addresses a critical gap in healthcare access for millions of Filipinos.',
      'The bill now heads to the House of Representatives for concurrence before it is transmitted to Malacañang for signing.',
    ],
  },
  {
    title: 'DepEd rolls out MATATAG curriculum to all public schools',
    date: 'January 2026',
    image: '/images/matatag.png',
    summary: 'The Department of Education begins full implementation of the MATATAG curriculum across all public schools.',
    body: [
      'The Department of Education officially launched the full rollout of the MATATAG curriculum to all public elementary and junior high schools nationwide.',
      'The revised curriculum, which focuses on foundational literacy and numeracy, was piloted in select schools in 2024 before the nationwide expansion.',
      'Education officials said the curriculum is designed to address the significant learning losses experienced by students during the COVID-19 pandemic.',
    ],
  },
];

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    await Politician.deleteMany({});
    await NewsModel.deleteMany({});
    console.log('Cleared existing data');

    await Politician.insertMany(politicians);
    console.log(`Inserted ${politicians.length} politicians`);

    await NewsModel.insertMany(news);
    console.log(`Inserted ${news.length} news articles`);

    console.log('Seed complete!');
    process.exit(0);
  } catch (err) {
    console.error('Seed error:', err);
    process.exit(1);
  }
};

seed();
