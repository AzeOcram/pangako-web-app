import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Politician from '../models/Politician.js';
import NewsModel from '../models/News.js';

dotenv.config();

const politicians = [
  {
    firstname: 'BONGBONG',
    lastname: 'MARCOS',
    order: 1,
    fullname: 'Ferdinand Romualdez Marcos Jr.',
    photo: '/images/marcos.png',
    position: 'President',
    party: 'Partido Federal ng Pilipinas (PFP)',
    term: '2022 – 2028',
    successRate: '45%',
    projects: [
      { name: 'Adopt-a-Farm Program', status: 'Fulfilled', description: 'Distributed farm inputs to 250,000 farmers across Luzon, Visayas, and Mindanao.', reference: 'https://www.da.gov.ph/president-marcos-unveils-das-agri-puhunan-program-targeting-1-2-million-hectares-with-low-cost-credit-and-market-support/' },
      { name: 'Maharlika Investment Fund', status: 'Fulfilled', description: 'Signed RA 11954 on July 18, 2023, establishing the Philippines\' first sovereign wealth fund to attract foreign investment.', reference: 'https://pco.gov.ph/news_releases/pbbm-signs-maharlika-investment-fund-act-phs-first-ever-sovereign-wealth-fund/' },
      { name: 'Rice Tariffication Law Amendment', status: 'In Progress', description: 'Proposed amendments to stabilize rice prices for consumers and farmers.', reference: 'https://www.da.gov.ph/' },
      { name: 'Free Irrigation for Farmers', status: 'In Progress', description: 'Nationwide rollout of free irrigation services for small-scale farmers via NIA solar-powered projects.', reference: 'https://www.nia.gov.ph/content/nia-supports-agri-plans-president-marcos' },
      { name: 'Anti-Illegal Drugs Campaign', status: 'In Progress', description: 'Continuation of the anti-drug campaign through proper legal channels.', reference: 'https://www.pna.gov.ph/' },
      { name: 'Salary Increase for Teachers', status: 'Discontinued', description: 'Proposed across-the-board salary increase for public school teachers was shelved due to budget constraints.', reference: 'https://www.deped.gov.ph/' },
    ],
    stances: [
      { issue: 'Same-Sex Marriage', stance: 'Agree', reference: 'https://www.gmanetwork.com/news/topstories/nation/555655/bongbong-marcos-on-same-sex-marriage-vox-populi-vox-dei/story/' },
      { issue: 'Death Penalty', stance: 'Disagree', reference: 'https://mb.com.ph/2022/09/14/marcos-still-conflicted-about-death-penalty' },
      { issue: 'Divorce Legalization', stance: 'Agree', reference: 'https://www.philstar.com/headlines/2022/03/19/2168525/marcos-open-divorce-but-dont-make-it-easy' },
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
      { name: 'MATATAG Curriculum', status: 'In Progress', description: 'Launched a revised K-12 curriculum to address learning losses from the pandemic.', reference: 'https://www.deped.gov.ph/matatag-curriculum/' },
      { name: 'School-Based Feeding Program', status: 'In Progress', description: 'Expanded feeding programs in all public elementary schools nationwide.', reference: 'https://www.deped.gov.ph/' },
      { name: 'Address Textbook Shortage', status: 'In Progress', description: 'Procurement of new textbooks initiated but backlogs remain in many schools.', reference: 'https://www.deped.gov.ph/' },
    ],
    stances: [
      { issue: 'Same-Sex Marriage', stance: 'Disagree', reference: 'https://mb.com.ph/2023/2/16/vp-duterte-denies-supporting-same-sex-marriage-in-ph' },
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
    firstname: 'BONG',
    lastname: 'GO',
    order: 4,
    fullname: 'Christopher Lawrence "Bong" Go',
    photo: '/images/go.png',
    position: 'Senator',
    party: 'PDP-Laban',
    term: '2019 – 2025',
    successRate: '50%',
    projects: [
      { name: 'Malasakit Centers Act (RA 11463)', status: 'Fulfilled', description: 'Authored and sponsored RA 11463, establishing one-stop shops in DOH hospitals for financial assistance to indigent patients. Over 17 million Filipinos served.', reference: 'https://www.pna.gov.ph/articles/1087835' },
      { name: 'Medical Assistance to Indigent Patients Act', status: 'Fulfilled', description: 'Authored law expanding medical assistance to poor and indigent patients nationwide.', reference: 'https://ldr.senate.gov.ph/subject/malasakit-centers' },
      { name: 'Philippine Sports Training Center Act', status: 'In Progress', description: 'Pushing for the establishment of a world-class sports training facility for Filipino athletes.', reference: 'https://www.senate.gov.ph/' },
    ],
    stances: [
      { issue: 'Death Penalty', stance: 'Agree', reference: 'https://www.rappler.com/' },
      { issue: 'West Philippine Sea Arbitration', stance: 'Agree', reference: 'https://www.senate.gov.ph/' },
      { issue: 'Mandatory ROTC', stance: 'Agree', reference: 'https://www.senate.gov.ph/' },
    ],
    saln: [
      { year: '2019', assets: '₱38,961,465', liabilities: '₱20,570,452', networth: '₱18,391,013', reference: 'https://legacy.senate.gov.ph/2019%20SALN%20table%20summary%20Senate%20website.pdf' },
      { year: '2020', assets: '₱42,357,371', liabilities: '₱20,082,862', networth: '₱22,274,509', reference: 'https://web.senate.gov.ph/2020%20SALN%20table%20summary.pdf' },
      { year: '2025', assets: '₱44,531,513', liabilities: '₱12,100,000', networth: '₱32,431,513', reference: 'https://www.abs-cbn.com/news/nation/2025/10/29/all-24-senators-of-20th-congress-release-salns-1343' },
    ],
  },
  {
    firstname: 'IMEE',
    lastname: 'MARCOS',
    order: 5,
    fullname: 'Maria Imelda Josefa Marcos',
    photo: '/images/marcosIR.png',
    position: 'Senator',
    party: 'Nacionalista Party',
    term: '2019 – 2025',
    successRate: '45%',
    projects: [
      { name: 'Free Legal Assistance Act', status: 'Fulfilled', description: 'Authored law expanding free legal aid to indigent clients through the Public Attorney\'s Office.', reference: 'https://www.senate.gov.ph/' },
      { name: 'Philippine Creative Industries Development Act', status: 'Fulfilled', description: 'Established a framework to support and develop Philippine creative industries.', reference: 'https://www.senate.gov.ph/' },
      { name: 'Internet Transaction Act', status: 'In Progress', description: 'Pushing for stronger consumer protection measures for online transactions.', reference: 'https://www.senate.gov.ph/' },
    ],
    stances: [
      { issue: 'Death Penalty', stance: 'Agree', reference: 'https://www.rappler.com/' },
      { issue: 'West Philippine Sea Arbitration', stance: 'Agree', reference: 'https://www.senate.gov.ph/' },
      { issue: 'Federalism', stance: 'Agree', reference: 'https://www.senate.gov.ph/' },
    ],
    saln: [
      { year: '2019', assets: '₱45,020,467', liabilities: '₱11,000,000', networth: '₱34,020,467', reference: 'https://legacy.senate.gov.ph/2019%20SALN%20table%20summary%20Senate%20website.pdf' },
      { year: '2020', assets: '₱52,270,467', liabilities: '₱16,000,000', networth: '₱36,270,467', reference: 'https://web.senate.gov.ph/2020%20SALN%20table%20summary.pdf' },
      { year: '2025', assets: '₱164,995,467', liabilities: '₱0', networth: '₱164,995,467', reference: 'https://www.abs-cbn.com/news/nation/2025/10/29/all-24-senators-of-20th-congress-release-salns-1343' },
    ],
  },
  {
    firstname: 'RONALD',
    lastname: 'DELA ROSA',
    order: 6,
    fullname: 'Ronald "Bato" dela Rosa',
    photo: '/images/delarosa.png',
    position: 'Senator',
    party: 'PDP-Laban',
    term: '2019 – 2025',
    successRate: '40%',
    projects: [
      { name: 'Anti-Drug Campaign Legislation', status: 'In Progress', description: 'Pushing for stronger anti-drug laws to support the government\'s war on drugs through legal channels.', reference: 'https://www.senate.gov.ph/' },
      { name: 'PNP Modernization Act', status: 'In Progress', description: 'Advocating for increased budget and modernization of the Philippine National Police.', reference: 'https://www.senate.gov.ph/' },
      { name: 'National ID System Implementation', status: 'Fulfilled', description: 'Supported full implementation of the Philippine Identification System (PhilSys).', reference: 'https://www.senate.gov.ph/' },
    ],
    stances: [
      { issue: 'Death Penalty', stance: 'Agree', reference: 'https://www.rappler.com/' },
      { issue: 'Same-Sex Marriage', stance: 'Disagree', reference: 'https://www.rappler.com/' },
      { issue: 'West Philippine Sea Arbitration', stance: 'Agree', reference: 'https://www.senate.gov.ph/' },
      { issue: 'Mandatory ROTC', stance: 'Agree', reference: 'https://www.senate.gov.ph/' },
    ],
    saln: [
      { year: '2019', assets: '₱36,265,532', liabilities: '₱3,240,290', networth: '₱33,025,241', reference: 'https://legacy.senate.gov.ph/2019%20SALN%20table%20summary%20Senate%20website.pdf' },
      { year: '2020', assets: '₱36,985,721', liabilities: '₱2,602,585', networth: '₱34,383,136', reference: 'https://web.senate.gov.ph/2020%20SALN%20table%20summary.pdf' },
      { year: '2025', assets: '₱61,314,074', liabilities: '₱29,021,056', networth: '₱32,293,018', reference: 'https://www.abs-cbn.com/news/nation/2025/10/29/all-24-senators-of-20th-congress-release-salns-1343' },
    ],
  },
  {
    firstname: 'BAM',
    lastname: 'AQUINO',
    order: 7,
    fullname: 'Paolo Benigno "Bam" Aquino IV',
    photo: '/images/aquinoB.png',
    position: 'Senator',
    party: 'Liberal Party',
    term: '2022 – 2028',
    successRate: '67%',
    projects: [
      { name: 'Go Negosyo Act (RA 10644)', status: 'Fulfilled', description: 'Authored law establishing Negosyo Centers in all municipalities to support micro, small and medium enterprises nationwide.', reference: 'https://ldr.senate.gov.ph/senator/aquino-iv-paolo-benigno-bam' },
      { name: 'Free Internet Access in Public Places Act', status: 'Fulfilled', description: 'Principal sponsor of law mandating free internet access in public schools, libraries, and government offices.', reference: 'https://web.senate.gov.ph/press_release/2017/0724_aquino1.asp' },
      { name: 'Universal Pre-School Education Act', status: 'In Progress', description: 'Pushing for mandatory and free pre-school education for all Filipino children.', reference: 'https://www.senate.gov.ph/' },
    ],
    stances: [
      { issue: 'Same-Sex Marriage', stance: 'Disagree', reference: 'https://www.rappler.com/philippines/elections/229544-opposition-bets-differ-conservative-issues/' },
      { issue: 'Death Penalty', stance: 'Disagree', reference: 'https://en.wikipedia.org/wiki/Bam_Aquino' },
      { issue: 'Divorce Legalization', stance: 'Disagree', reference: 'https://www.rappler.com/philippines/elections/229544-opposition-bets-differ-conservative-issues/' },
      { issue: 'West Philippine Sea Arbitration', stance: 'Agree', reference: 'https://www.senate.gov.ph/' },
    ],
    saln: [
      { year: '2017', assets: '₱39,192,744', liabilities: '₱0', networth: '₱39,192,744', reference: 'https://www.rappler.com/philippines/202728-senators-2017-saln-villar-pacquiao-richest/' },
      { year: '2018', assets: '₱47,901,749', liabilities: '₱2,696,611', networth: '₱45,205,138', reference: 'https://legacy.senate.gov.ph/Summary%202018%20SALN.pdf' },
      { year: '2025', assets: '₱86,553,651', liabilities: '₱0', networth: '₱86,553,651', reference: 'https://www.abs-cbn.com/news/nation/2025/10/29/all-24-senators-of-20th-congress-release-salns-1343' },
    ],
  },
  {
    firstname: 'RISA',
    lastname: 'HONTIVEROS',
    order: 8,
    fullname: 'Risa Hontiveros-Baraquel',
    photo: '/images/hontiveros.png',
    position: 'Senator',
    party: 'Akbayan',
    term: '2022 – 2028',
    successRate: '100%',
    projects: [
      { name: 'Safe Spaces Act (RA 11313)', status: 'Fulfilled', description: 'Authored the Bawal Bastos Law expanding protections against gender-based harassment in public spaces, workplaces, and online.', reference: 'https://legacy.senate.gov.ph/press_release/2019/0529_hontiveros1.asp' },
      { name: 'Mental Health Act (RA 11036)', status: 'Fulfilled', description: 'Principally authored the Philippine Mental Health Act, providing the first legal framework for mental health care in the country.', reference: 'https://issuances-library.senate.gov.ph/senator/hontiveros-risa' },
      { name: 'Expanded Maternity Leave Law (RA 11210)', status: 'Fulfilled', description: 'Authored law expanding maternity leave to 105 days for female workers in both public and private sectors.', reference: 'https://senrisahontiveros.com/legislation/' },
    ],
    stances: [
      { issue: 'Same-Sex Marriage', stance: 'Agree', reference: 'https://en.wikipedia.org/wiki/Risa_Hontiveros' },
      { issue: 'Death Penalty', stance: 'Disagree', reference: 'https://en.wikipedia.org/wiki/Risa_Hontiveros' },
      { issue: 'Divorce Legalization', stance: 'Agree', reference: 'https://legacy.senate.gov.ph/press_release/2023/0418_hontiveros2.asp' },
      { issue: 'West Philippine Sea Arbitration', stance: 'Agree', reference: 'https://www.senate.gov.ph/' },
    ],
    saln: [
      { year: '2019', assets: '₱16,050,112', liabilities: '₱0', networth: '₱16,050,112', reference: 'https://legacy.senate.gov.ph/2019%20SALN%20table%20summary%20Senate%20website.pdf' },
      { year: '2020', assets: '₱16,720,360', liabilities: '₱0', networth: '₱16,720,360', reference: 'https://web.senate.gov.ph/2020%20SALN%20table%20summary.pdf' },
      { year: '2024', assets: '₱19,884,098', liabilities: '₱897,840', networth: '₱18,986,258', reference: 'https://www.facebook.com/share/p/1TU7ZSVPjq/' },
    ],
  },
];

const news = [
  {
    title: 'Marcos signs EO to lower rice prices amid public outcry',
    date: 'September 2023',
    image: '/images/marcosEO.png',
    summary: 'President Marcos signed Executive Order No. 39, imposing a price cap on rice sold in public markets nationwide.',
    body: [
      'President Ferdinand Marcos Jr. signed Executive Order No. 39 on August 31, 2023, placing a price ceiling of ₱41 per kilogram on regular milled rice and ₱45 per kilogram on well-milled rice sold in public markets and supermarkets across the country.',
      'The order came amid rising prices of the staple grain, which had breached ₱60 per kilogram in some markets despite government efforts to stabilize supply. The National Economic and Development Authority reported rice inflation rose from 1% in January 2022 to 4.2% in July 2023.',
      'Agriculture Secretary Francisco Tiu Laurel Jr. said the government would work with private traders and importers to ensure adequate supply to sustain the price cap. The EO took effect on September 5, 2023 and was later lifted on October 4, 2023 after rice prices began declining.',
    ],
    reference: 'https://pco.gov.ph/news_releases/pbbm-sets-price-ceilings-on-rice-nationwide/',
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
    reference: 'https://www.senate.gov.ph/',
  },
  {
    title: 'DepEd rolls out MATATAG curriculum to all public schools',
    date: 'August 2023',
    image: '/images/matatag.png',
    summary: 'The Department of Education launched the MATATAG Curriculum on August 10, 2023, with phased implementation starting School Year 2024-2025.',
    body: [
      'The Department of Education officially launched the MATATAG Curriculum on August 10, 2023, led by Vice President and Education Secretary Sara Duterte at Sofitel Hotel in Pasay City.',
      'The revised K to 10 curriculum decongests the old K-12 curriculum from more than 11,000 competencies to 3,600, focusing on foundational skills such as literacy, numeracy, and socio-emotional development for Kindergarten to Grade 3 learners.',
      'Phased implementation began in School Year 2024-2025 for Kindergarten, Grades 1, 4, and 7. Grades 2, 5, and 8 follow in SY 2025-2026, with full rollout to Grade 10 by SY 2027-2028.',
    ],
    reference: 'https://www.pna.gov.ph/articles/1207588',
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