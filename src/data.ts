export type Locale = 'cs' | 'en';
export type ProjectCategory = 'foundation' | 'roof' | 'commercial' | 'infrastructure';

export interface LocalizedText { cs: string; en: string; }
export interface Project {
  id: string;
  title: LocalizedText;
  location: LocalizedText;
  year: number;
  contractor: string;
  scope: LocalizedText;
  category: ProjectCategory;
  image: string;
}

export const translations = {
  cs: {
    navCapabilities: 'Systémy', navProjects: 'Realizace', navMethod: 'Metodika', navContact: 'Kontakt',
    heroEyebrow: 'Stavební hydroizolace · od roku 1995',
    heroTitle: 'Chráníme konstrukce před vodou.',
    heroLead: 'Technický návrh, volba systému a odpovědná realizace hydroizolací pro spodní stavby, střechy i infrastrukturu.',
    primaryCta: 'Technická konzultace', secondaryCta: 'Prohlédnout realizace',
    verified: 'Ověřené veřejné údaje', projectsCount: 'více než 200 dokončených staveb', family: 'česká rodinná firma',
    systemsTitle: 'Co potřebujete chránit?', systemsLead: 'Vyberte část stavby. Doporučíme první technický směr a otázky, které je nutné zodpovědět.',
    projectTitle: 'Databáze realizací', projectLead: 'Výběr referencí z veřejného portfolia společnosti IPRA.',
    methodTitle: 'Technika před improvizací.', contactTitle: 'Pošlete nám technické zadání.'
  },
  en: {
    navCapabilities: 'Systems', navProjects: 'Projects', navMethod: 'Method', navContact: 'Contact',
    heroEyebrow: 'Construction waterproofing · since 1995',
    heroTitle: 'We protect structures from water.',
    heroLead: 'Technical design, system selection and responsible waterproofing delivery for substructures, roofs and infrastructure.',
    primaryCta: 'Technical consultation', secondaryCta: 'Explore projects',
    verified: 'Verified public information', projectsCount: 'more than 200 completed projects', family: 'Czech family company',
    systemsTitle: 'What are you protecting?', systemsLead: 'Select the structure. We will show the first technical direction and the questions that need answering.',
    projectTitle: 'Project database', projectLead: 'A selection of references from IPRA’s public portfolio.',
    methodTitle: 'Engineering before improvisation.', contactTitle: 'Send us your technical brief.'
  }
} as const;

export const capabilities = [
  { id: 'foundation', code: 'S01', title: { cs: 'Spodní stavby', en: 'Substructures' }, summary: { cs: 'Základové jámy, suterény, tlaková voda a náročné prostupy.', en: 'Foundation pits, basements, pressurised water and demanding penetrations.' }, question: { cs: 'Jaká je hladina podzemní vody a způsob založení?', en: 'What are the groundwater conditions and foundation system?' } },
  { id: 'roof', code: 'S02', title: { cs: 'Střešní pláště', en: 'Roof envelopes' }, summary: { cs: 'Hydroizolace a zateplení plochých střech včetně detailů a odvodnění.', en: 'Waterproofing and thermal insulation of flat roofs, details and drainage.' }, question: { cs: 'Jaký je provoz střechy, spád a stav nosné konstrukce?', en: 'What is the roof use, fall and structural condition?' } },
  { id: 'pool', code: 'S03', title: { cs: 'Bazény a nádrže', en: 'Pools and tanks' }, summary: { cs: 'Systémy trvale namáhané vodou, chemií a pohybem konstrukce.', en: 'Systems permanently exposed to water, chemicals and structural movement.' }, question: { cs: 'Jaký je materiál konstrukce a chemické zatížení?', en: 'What is the structural material and chemical exposure?' } },
  { id: 'terrace', code: 'S04', title: { cs: 'Terasy a balkony', en: 'Terraces and balconies' }, summary: { cs: 'Bezpečné spády, prahy, odvodnění a návaznosti na fasádu.', en: 'Safe falls, thresholds, drainage and façade interfaces.' }, question: { cs: 'Jaká je výška detailů u dveří a způsob odvodnění?', en: 'What are the threshold heights and drainage design?' } },
  { id: 'infrastructure', code: 'S05', title: { cs: 'Mosty a tunely', en: 'Bridges and tunnels' }, summary: { cs: 'Technické izolace pro dynamicky a provozně namáhané konstrukce.', en: 'Technical insulation for dynamically and operationally stressed structures.' }, question: { cs: 'Jaké jsou pohyby konstrukce a režim realizace?', en: 'What are the structural movements and construction constraints?' } },
  { id: 'landfill', code: 'S06', title: { cs: 'Skládky', en: 'Landfills' }, summary: { cs: 'Izolační bariéry, napojení a kontrola celistvosti systému.', en: 'Barrier systems, interfaces and integrity control.' }, question: { cs: 'Jaký je požadovaný bariérový systém a kontrolní plán?', en: 'What barrier system and control plan are required?' } }
] as const;

export const projects: readonly Project[] = [
  { id:'quadrio', title:{cs:'Multifunkční objekt QUADRIO',en:'QUADRIO mixed-use development'}, location:{cs:'Praha, Národní třída',en:'Prague, Národní třída'}, year:2014, contractor:'Metrostav a.s., divize 3', scope:{cs:'Hydroizolace základové jámy a střešních plášťů',en:'Foundation pit and roof-envelope waterproofing'}, category:'roof', image:'./assets/project-quadrio.svg' },
  { id:'z2-karlin', title:{cs:'Administrativní budova Z2 Karlín',en:'Z2 Karlín office building'}, location:{cs:'Praha, Karlín',en:'Prague, Karlín'}, year:2012, contractor:'SWIETELSKY s.r.o.', scope:{cs:'Hydroizolace základové jámy a střešních plášťů',en:'Foundation pit and roof-envelope waterproofing'}, category:'foundation', image:'./assets/project-karlin.svg' },
  { id:'palladium', title:{cs:'Nákupní centrum Palladium',en:'Palladium shopping centre'}, location:{cs:'Praha, Náměstí Republiky',en:'Prague, Republic Square'}, year:2009, contractor:'STRABAG ČR, a.s.', scope:{cs:'Hydroizolace vjezdových tunelů garáží a střešních plášťů',en:'Waterproofing of garage access tunnels and roof envelopes'}, category:'infrastructure', image:'./assets/project-palladium.svg' },
  { id:'porsche', title:{cs:'Autosalon Porsche Praha Prosek',en:'Porsche Prague Prosek showroom'}, location:{cs:'Praha, Prosek',en:'Prague, Prosek'}, year:2009, contractor:'SWIETELSKY s.r.o.', scope:{cs:'Hydroizolační práce na objektu',en:'Building waterproofing works'}, category:'commercial', image:'./assets/project-porsche.svg' },
  { id:'river-city', title:{cs:'River City Prague',en:'River City Prague'}, location:{cs:'Praha, Rohanský ostrov',en:'Prague, Rohanský Island'}, year:2005, contractor:'STRABAG ČR, a.s.', scope:{cs:'Hydroizolace základové jámy a střešního pláště',en:'Foundation pit and roof-envelope waterproofing'}, category:'foundation', image:'./assets/project-river.svg' },
  { id:'marriott', title:{cs:'Milenium Plaza Prague — Hotel Marriott',en:'Milenium Plaza Prague — Hotel Marriott'}, location:{cs:'Praha, Masarykovo nádraží',en:'Prague, Masaryk Railway Station'}, year:2000, contractor:'ILBAU Ges. m. b. H.', scope:{cs:'Hydroizolace základové jámy',en:'Foundation pit waterproofing'}, category:'foundation', image:'./assets/project-marriott.svg' }
] as const;
