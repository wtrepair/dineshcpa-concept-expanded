import React, { useEffect, useId, useMemo, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import { createPortal } from "react-dom";
import {
  ArrowLeft,
  ArrowRight,
  BriefcaseBusiness,
  Building2,
  Check,
  ChevronDown,
  Clock3,
  FileWarning,
  Layers,
  Landmark,
  MapPin,
  Menu,
  Phone,
  Plus,
  ReceiptText,
  ShieldCheck,
  Smartphone,
  X,
} from "lucide-react";
import "./styles.css";
import Experience from "./Experience.jsx";
import { personalServices, corporateServices, specializedServices } from "./serviceCopy.js";

const PARTNER_URL = "https://boldsmith.ca/partner/dineshcpa";

const navItems = [
  { label: "Personal", href: "#personal" },
  { label: "Services", href: "#services" },
  { label: "Corporate", href: "#corporate" },
  { label: "Industries", href: "#industries" },
  { label: "Insights", href: "#insights" },
  { label: "Contact", href: "#contact" },
];

const benefits = [
  {
    title: "Comprehensive Expertise",
    body: "From personal taxes to corporate compliance, we handle the full picture so you can focus on work, family, and growth without tax agency worry.",
    tag: "Personal | Business",
  },
  {
    title: "Cross-Border Solutions",
    body: "Canadian and cross-border tax experience helps clients keep filings, payroll, business activity, and personal obligations clear.",
    tag: "Canada | International",
  },
  {
    title: "Strategic Advantage",
    body: "Every file is approached with planning discipline: claim optimization, audit readiness, and a practical path to better financial decisions.",
    tag: "Planning | Compliance",
  },
];

const serviceFamilies = [
  {
    title: "Accounting & Reporting",
    icon: ReceiptText,
    image: "/assets/about-desk.png",
    summary:
      "Financial statements, bookkeeping review, reconciliations, cleanup projects, and month-end reporting that make tax decisions easier.",
    items: ["Financial reporting", "Monthly bookkeeping", "Bank reconciliation", "Catch-up and cleanup files"],
  },
  {
    title: "Canadian Tax Services",
    icon: Landmark,
    image: "/assets/tax-filing.png",
    summary:
      "T1, T2, trust, partnership, self-employed, rental, and investment filings with planning before the deadline becomes urgent.",
    items: ["Personal and family tax", "Corporate tax", "Trust and estate returns", "Amended and late-filed returns"],
  },
  {
    title: "Advisory & Planning",
    icon: BriefcaseBusiness,
    image: "/assets/audit-ready.png",
    summary:
      "Practical owner-level planning for cash flow, entity structure, compensation, succession, sale preparation, and risk decisions.",
    items: ["Fractional CFO support", "Entity and compensation review", "Business sale planning", "Financial modeling"],
  },
  {
    title: "CRA Review & Notice Response",
    icon: FileWarning,
    image: "/assets/tax-compliance.png",
    summary:
      "Calm response support for CRA reviews, notices, missing slips, prior-year issues, payment plans, and documentation requests.",
    items: ["CRA letter review", "Audit response", "Objection support", "Records package preparation"],
  },
  {
    title: "Payroll, HST & Employer Support",
    icon: Building2,
    image: "/assets/non-resident.png",
    summary:
      "Payroll remittances, HST/GST filings, WSIB, contractor review, taxable benefits, and deadline discipline for employers.",
    items: ["Payroll setup and remittances", "HST/GST filing", "WSIB coordination", "Taxable benefit review"],
  },
  {
    title: "Technology & Cloud Accounting",
    icon: Layers,
    image: "/assets/contact-typing.png",
    summary:
      "Accounting systems, secure document workflows, QuickBooks/Xero support, data cleanup, and repeatable processes for teams.",
    items: ["QuickBooks support", "Xero support", "Secure document flow", "Workflow and data cleanup"],
  },
];

const industries = [
  ["Alternative Investments", "Complex income, investor records, gains and losses, and disclosure-sensitive reporting."],
  ["Arts & Entertainment", "Project income, royalties, irregular payments, deductible expenses, and HST questions."],
  ["Capital Markets", "Tax-aware reporting and compliance support for investment activity and transactions."],
  ["Construction & Trades", "Job costs, payroll, equipment, HST, subcontractors, and contractor tax planning."],
  ["Consumer & Industrial Products", "Inventory, vendor records, payroll, operating expenses, and owner reporting."],
  ["Crypto & Digital Assets", "Transaction records, gains, losses, basis questions, and digital-asset reporting support."],
  ["Energy & Clean Technology", "Equipment, incentives, credits, grants, and changing compliance obligations."],
  ["Financial Services", "Records and tax support for finance teams, advisors, operators, and consultants."],
  ["Food, Beverage & Hospitality", "HST, payroll, vendor records, tips, margins, and bookkeeping support."],
  ["Government & Public Sector", "Clear records, reporting discipline, and compliance support for funded or public-facing work."],
  ["Healthcare & Clinics", "Practice tax planning, payroll, incorporation, HST issues, and clean financial operations."],
  ["Life Sciences & R&D", "SR&ED, grants, equity events, early-stage records, and investor-ready financial visibility."],
  ["Not-For-Profit & Education", "Mission-focused reporting, filings, payroll, board packages, and compliance calendars."],
  ["Private Equity & Holdcos", "Deal records, portfolio reporting, entity coordination, and tax planning support."],
  ["Professional Services", "Planning for firms, consultants, agencies, engineers, lawyers, designers, and practitioners."],
  ["Real Estate & Development", "Rental activity, HST, rebates, assignment sales, improvements, and entity planning."],
  ["Technology & SaaS", "Credits, contractor payments, subscriptions, payroll, and investor-ready records."],
  ["Retail, Ecommerce & Marketplaces", "Inventory, platform payouts, HST/PST/QST, payment processors, and cash flow visibility."],
  ["Transportation & Trucking", "Equipment, fuel, payroll, contractors, route records, and corporation tax planning."],
  ["Childcare & Personal Services", "Payroll, subsidy records, supplies, personal-service activity, and clean annual filings."],
].map(([title, summary], index) => ({ title, summary, index }));

const coverageGroups = [
  {
    title: "Tax planning and filings",
    items: [
      "T1 personal income tax",
      "T2 corporate income tax",
      "Self-employed and sole proprietor filings",
      "Partnership and trust returns",
      "Prior-year and amended returns",
      "Canadian residents with foreign income",
      "Non-resident and newcomer tax questions",
      "Estate, terminal, and final returns",
    ],
  },
  {
    title: "Accounting, payroll and systems",
    items: [
      "Monthly bookkeeping",
      "Bank and credit card reconciliation",
      "Financial reporting packages",
      "Payroll remittances",
      "HST/GST returns",
      "QuickBooks and Xero support",
      "Cloud document workflows",
      "Data cleanup and conversion projects",
    ],
  },
  {
    title: "Client types and situations",
    items: [
      "Individuals and families",
      "Small business owners",
      "Professional corporations",
      "Real estate investors",
      "Restaurants and retailers",
      "Contractors and trades",
      "Doctors, dentists and clinics",
      "Therapists and solo practitioners",
    ],
  },
  {
    title: "Ontario and Canada coverage",
    items: [
      "Mississauga and Greater Toronto Area",
      "Ontario corporations and payroll",
      "CRA reviews and notices",
      "Provincial tax coordination",
      "GST/HST account issues",
      "WSIB and employer filings",
      "Cross-province business activity",
      "Remote clients across Canada",
    ],
  },
];

const processSteps = [
  {
    title: "Organize the file",
    body: "Bring slips, bookkeeping exports, payroll summaries, notices, prior returns, and open questions into one review path.",
  },
  {
    title: "Identify the tax positions",
    body: "Review deductions, credits, shareholder activity, HST, payroll, foreign income, and prior-year risk before filing.",
  },
  {
    title: "Respond or file with support",
    body: "Prepare returns, CRA responses, workpapers, and payment planning so the next step is clear and defensible.",
  },
  {
    title: "Keep visibility through the year",
    body: "Use recurring bookkeeping, planning check-ins, and deadline tracking so decisions are made before filing season.",
  },
];

const insights = [
  {
    kind: "Article",
    title: "Smart Tax Strategies to Keep More of Your Hard-Earned Money",
    body: "How a planned review can uncover missed credits, unused deductions, and avoidable compliance risk.",
  },
  {
    kind: "Guide",
    title: "How to Optimize Your Business for Financial Growth",
    body: "Cash flow, reporting, and tax planning moves that give owners a clearer path through the year.",
  },
  {
    kind: "Update",
    title: "Understanding the Latest Tax Changes",
    body: "The practical changes individuals and businesses should review before their next filing cycle.",
  },
  {
    kind: "Checklist",
    title: "What to Gather Before Your Tax Review",
    body: "A plain-language records list for slips, bookkeeping, payroll, CRA letters, and prior-year documents.",
  },
  {
    kind: "CRA",
    title: "How to Respond When a CRA Letter Arrives",
    body: "Confirm the period, deadline, requested proof, and response path before sending documents.",
  },
  {
    kind: "Systems",
    title: "Clean Books Make Cleaner Tax Choices",
    body: "Monthly review keeps deductions, payroll, HST, vendor payments, and cash flow visible.",
  },
];

const testimonials = [
  {
    quote:
      "I have had a great experience with Dinesh Singh CPA. Their clear communication and ability to simplify complex financial matters have made managing my finances stress-free. Highly recommend.",
    person: "Josh L.",
    meta: "CEO - April 2024",
    image: "/assets/testimonial-dark.png",
  },
  {
    quote:
      "Dinesh's costs were really reasonable and the work was done incredibly quickly. I will definitely be using him moving forward.",
    person: "Murad Antia",
    meta: "March 16, 2023",
    image: "/assets/testimonial-dark-alt.png",
  },
];

const faqs = [
  {
    q: "Can you review past tax years?",
    a: "Yes. A 10-year tax review can look for missed deductions, credits, filing issues, and opportunities to recover value from prior years.",
  },
  {
    q: "Do you handle both personal and corporate tax?",
    a: "Yes. Dinesh CPA supports personal income tax, corporate tax, payroll, HST, audit readiness, planning, and advisory work.",
  },
  {
    q: "Can you support cross-border situations?",
    a: "Yes. The service model includes Canadian and international client support, with emphasis on coordinated filings and cross-border clarity.",
  },
  {
    q: "Can you help if CRA has already sent a letter?",
    a: "Yes. Dinesh CPA can review the period, deadline, requested proof, and response path before organizing a defensible package for CRA review.",
  },
  {
    q: "Do you support bookkeeping and cloud accounting?",
    a: "Yes. The expanded service model includes bookkeeping review, reconciliations, QuickBooks and Xero support, secure document workflows, and cleanup projects.",
  },
  {
    q: "Which industries do you work with?",
    a: "The site now covers a broad Canadian industry map, including real estate, construction, healthcare, technology, professional services, retail, restaurants, trucking, and not-for-profits.",
  },
];

function Logo({ large = false }) {
  return (
    <a className={`logo ${large ? "logoLarge" : ""}`} href="#top" aria-label="Dinesh CPA home">
      <span className="logoMark" aria-hidden="true">
        <span />
      </span>
      <strong>Dinesh CPA</strong>
    </a>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);
  useEffect(() => {
    function dismiss(event) {
      if (event.key === "Escape" && open) {
        setOpen(false);
        menuRef.current?.focus();
      }
    }
    document.addEventListener("keydown", dismiss);
    return () => document.removeEventListener("keydown", dismiss);
  }, [open]);
  return (
    <header className="siteHeader" id="top">
      <nav className="navShell" aria-label="Primary navigation">
        <Logo />
        <button ref={menuRef} className="menuButton" onClick={() => setOpen((value) => !value)} aria-label={open ? "Close navigation" : "Open navigation"} aria-expanded={open} aria-controls="primary-links">
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
        <div id="primary-links" className={`navLinks ${open ? "open" : ""}`}>
          {navItems.map((item) => (
            <a key={item.label} href={item.href} onClick={() => setOpen(false)}>
              {item.label}
            </a>
          ))}
        </div>
        <div className="navActions">
          <a className="button dark navCta" href="#contact">
            Let’s talk <ArrowRight size={16} aria-hidden="true" />
          </a>
        </div>
      </nav>
    </header>
  );
}

function Hero() {
  return (
    <section className="heroSection">
      <div className="heroMedia" data-scroll-scene>
        <div className="heroArtwork" aria-hidden="true" style={{ backgroundImage: "url('/assets/hero-finance.png')" }} />
        <div className="heroCopy">
          <span>Tax strategy, filings, and advisory</span>
          <h1>Clarity for complex personal and business tax</h1>
          <p>
            Dinesh CPA helps individuals, owners, and cross-border clients uncover missed savings, stay compliant, and
            plan the next move with confidence.
          </p>
          <div className="heroActions">
            <a className="button light" href="#contact">
              Book a 10-Year Review
            </a>
            <a className="textLink" href="#personal">
              Explore services
            </a>
          </div>
        </div>
        <a className="heroScrollCue" href="#benefits">Scroll to explore <ChevronDown size={18} aria-hidden="true" /></a>
      </div>
    </section>
  );
}

function Intro() {
  return (
    <section className="introPanel">
      <div className="imagePanel" data-scroll-scene>
        <img src="/assets/about-desk.png" alt="Accounting desk with notebook, calculator, pen, and coffee" />
      </div>
      <div className="introCopy">
        <h2>
          Experience Confidence
          <span>in Your Financial Future</span>
        </h2>
        <p>
          With 25 years of experience across multiple industries, DineshCPA delivers exceptional personal and corporate
          accounting solutions, leveraging the latest technology to enhance business operations.
        </p>
        <p>
          Serving clients in Canada and internationally, our team combines precision with strategic
          foresight to maximize tax efficiency and peace of mind.
        </p>
        <a className="button dark" href="#contact">
          Learn more about us
        </a>
      </div>
    </section>
  );
}

function Benefits() {
  return (
    <section className="section narrow" id="benefits">
      <SectionTitle eyebrow="Core Benefits" title="Find Cash Flow You are Missing" />
      <div className="benefitGrid">
        {benefits.map((benefit) => (
          <article className="outlineCard" key={benefit.title}>
            <h3>{benefit.title}:</h3>
            <p>{benefit.body}</p>
            <span>{benefit.tag}</span>
          </article>
        ))}
      </div>
    </section>
  );
}

function ReviewCta() {
  return (
    <section className="reviewCta" data-scroll-scene>
      <div className="reviewText">
        <strong>Maximize Your Tax Savings:</strong>
          <h2>Your 10-Year Tax Review</h2>
        <a className="button dark" href="#contact">
          Here's the next step.
        </a>
      </div>
      <img src="/assets/piggy-bank.png" alt="Piggy bank held in a hand" />
    </section>
  );
}

function ServiceDialog({ service, open, onClose }) {
  const dialogRef = useRef(null);
  const titleId = useId();
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    dialog.showModal();
    document.body.style.overflow = "hidden";
    return () => {
      dialog.close();
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);
  return createPortal(
    <dialog ref={dialogRef} className="serviceDialog" aria-labelledby={titleId} onClose={onClose} onClick={(event) => {
      if (event.target === event.currentTarget) {
        const bounds = event.currentTarget.getBoundingClientRect();
        if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) onClose();
      }
    }}>
      <button type="button" className="dialogClose" aria-label="Close service details" onClick={onClose} autoFocus><X size={22} /></button>
      <span className="dialogEyebrow">How we can help</span>
      <h2 id={titleId}>{service.title}</h2>
      <p className="serviceDialogIntro">{service.detail}</p>
      <ul className="serviceDetailList">
        {service.highlights.map((item) => <li key={item}><Check size={18} aria-hidden="true" /><span>{item}</span></li>)}
      </ul>
      <a className="button dark" href="#contact" onClick={onClose}>Talk to us about this <ArrowRight size={17} aria-hidden="true" /></a>
    </dialog>, document.body
  );
}

function ServiceCard({ service }) {
  const [open, setOpen] = useState(false);
  return (
    <article className="serviceCard">
      <div className="serviceArtwork" aria-hidden="true" style={{ backgroundImage: `url('${service.image}')` }} />
      <div>
        <h3>{service.title}</h3>
        <p>{service.summary}</p>
      </div>
      <button type="button" className="serviceDetailsButton" onClick={() => setOpen(true)} aria-label={`Show details for ${service.title}`} aria-haspopup="dialog">
        <Plus size={24} />
      </button>
      <ServiceDialog service={service} open={open} onClose={() => setOpen(false)} />
    </article>
  );
}

function PersonalSection() {
  return (
    <section className="personalSection" id="personal">
      <div className="pageHeading">
        <h2>Personal Taxes</h2>
      </div>
      <div className="personalHero" style={{ backgroundImage: "url('/assets/personal-hero.png')" }}>
        <h2>
          <span>Think Your Taxes Are Maximized?</span>
          <strong>Let Us Show You More.</strong>
        </h2>
      </div>
      <div className="floatingNote">
        <p>
          DineshCPA offers tailored personal tax services for Canadians and clients worldwide, combining
          precision with a strategic approach and technology to uncover every possible tax advantage.
        </p>
      </div>
      <SectionTitle
        eyebrow="Core Services"
        title="10-Year Tax Review: Worried About Past Tax Mistakes?"
        subtitle="We'll Set the Record (and Savings) Straight."
      />
      <p className="centerCopy">
        Revisit past filings to look for missed deductions, credits and unresolved questions. We’ll explain the
        review process and confirm the scope and fees before work begins.
      </p>
      <SectionTitle eyebrow="Taxes, audits, strategic planning and more..." title="Giving you the confidence to focus on what matters" />
      <div className="serviceRail" aria-label="Personal tax services">
        {personalServices.map((service) => (
          <ServiceCard
            key={service.title}
            service={service}
          />
        ))}
      </div>
    </section>
  );
}

function CorporateSection() {
  const [selected, setSelected] = useState(null);
  return (
    <section className="darkBand" id="corporate">
      <SectionTitle eyebrow="Specialized Services" title="DineshCPA offers tailored solutions" light />
      <div className="specialGrid">
        {specializedServices.map((service) => (
          <ServiceCard key={service.title} service={service} />
        ))}
      </div>
      <div className="corporateDepth">
        <div>
          <h3>Corporate services with year-round discipline</h3>
          <p>
            From incorporation to payroll remittances, HST, T2 returns, audit support, and succession planning, the work
            is organized around clean records, timely filing, and practical owner-level decisions.
          </p>
        </div>
        <ul>
          {corporateServices.map((service) => (
            <li key={service.title}>
              <button type="button" className="corporateServiceButton" aria-haspopup="dialog" onClick={() => setSelected(service)}>
                <span>{service.title}</span><Plus size={18} aria-hidden="true" />
              </button>
            </li>
          ))}
        </ul>
      </div>
      {selected && <ServiceDialog service={selected} open onClose={() => setSelected(null)} />}
    </section>
  );
}

function TechnologyPartner() {
  return (
    <section className="section partnerSection" id="technology-partner" aria-labelledby="partner-heading">
      <div className="partnerBadge"><Layers size={28} aria-hidden="true" /><span>Technology partner</span><strong>Boldsmith</strong></div>
      <div className="partnerCopy">
        <span className="dialogEyebrow">Better systems. Clearer books.</span>
        <h2 id="partner-heading">Ask about free bookkeeping.</h2>
        <p>Explore free bookkeeping options through our technology partner, Boldsmith. Find out what’s available and how it could fit your business.</p>
      </div>
      <div className="partnerActions">
          <a className="button dark" href={PARTNER_URL} target="_blank" rel="sponsored noopener noreferrer">Explore with Boldsmith <ArrowRight size={17} aria-hidden="true" /><span className="srOnly"> (opens in a new tab)</span></a>
          <a className="textLink" href="#contact">Talk to Dinesh CPA</a>
      </div>
      <p className="partnerNote">Dinesh CPA technology partner · Referral link to Boldsmith</p>
    </section>
  );
}

function ExpandedServices() {
  return (
    <section className="section serviceDirectory" id="services">
      <SectionTitle eyebrow="Service Directory" title="Year-round support beyond the annual return" />
      <div className="directoryIntro">
        <p>
          Use this as a practical map for Canadian tax, accounting, payroll, advisory, and technology support before
          questions become deadline problems.
        </p>
      </div>
      <div className="familyGrid">
        {serviceFamilies.map((service) => {
          const Icon = service.icon;
          return (
            <article className="familyCard" key={service.title}>
              <div className="familyImage" style={{ backgroundImage: `url('${service.image}')` }}>
                <Icon size={30} />
              </div>
              <div className="familyBody">
                <h3>{service.title}</h3>
                <p>{service.summary}</p>
                <ul>
                  {service.items.map((item) => (
                    <li key={item}>
                      <Check size={15} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

function IndustrySection() {
  const [expanded, setExpanded] = useState(false);
  return (
    <section className="industryBand" id="industries">
      <div className="industryShell">
        <div className="industryLead">
          <SectionTitle eyebrow="Industries" title="Canadian tax judgment for many kinds of work" light />
          <p>
            Every category is framed through Canadian filing, HST, payroll, bookkeeping, records, and owner-planning
            needs, so industry detail connects back to the tax work that has to be done.
          </p>
        </div>
        <div>
        <div id="industry-list" className={`industryGrid ${expanded ? "expanded" : ""}`}>
          {industries.map((industry) => (
            <article key={industry.title}>
              <span>{String(industry.index + 1).padStart(2, "0")}</span>
              <h3>{industry.title}</h3>
              <p>{industry.summary}</p>
            </article>
          ))}
        </div>
        <button type="button" className="industryToggle button light" aria-expanded={expanded} aria-controls="industry-list" onClick={() => setExpanded(!expanded)}>
          {expanded ? "Show fewer industries" : `View all ${industries.length} industries`} <ChevronDown className={expanded ? "rotated" : ""} size={18} />
        </button>
        </div>
      </div>
    </section>
  );
}

function CoverageSection() {
  return (
    <section className="section coverageSection">
      <SectionTitle eyebrow="Coverage Map" title="Detailed situations Dinesh CPA can support" />
      <div className="coverageGrid">
        {coverageGroups.map((group) => (
          <article className="coverageCard" key={group.title}>
            <h3>{group.title}</h3>
            <ul>
              {group.items.map((item) => (
                <li key={item}>
                  <ShieldCheck size={16} />
                  {item}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}

function ProcessSection() {
  return (
    <section className="processSection">
      <div className="processMedia" data-scroll-scene>
        <img src="/assets/contact-typing.png" alt="Hands typing on a laptop for tax planning" />
      </div>
      <div className="processCopy">
        <SectionTitle eyebrow="How Work Moves" title="From tax question to organized next step" />
        <div className="processList">
          {processSteps.map((step, index) => (
            <article key={step.title}>
              <span>{index + 1}</span>
              <div>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Insights() {
  return (
    <section className="section" id="insights">
      <SectionTitle eyebrow="Blog" title="Insights & Resources for Smart Tax Planning" />
      <div className="insightGrid">
        {insights.map((post, index) => (
          <article className="insightCard" key={post.title}>
            <div
              className="insightImage"
              style={{
                backgroundImage: `url('/assets/${[
                  "about-desk.png",
                  "audit-ready.png",
                  "contact-typing.png",
                  "tax-filing.png",
                  "tax-compliance.png",
                  "personal-hero.png",
                ][index]}')`,
              }}
            />
            <span>{post.kind}</span>
            <h3>{post.title}</h3>
            <p>{post.body}</p>
            <a href="#contact">Learn More</a>
          </article>
        ))}
      </div>
      <a className="button dark centered" href="#contact">
        More Insights
      </a>
    </section>
  );
}

function Testimonials() {
  const [index, setIndex] = useState(0);
  const current = testimonials[index];
  return (
    <section className="testimonialSection" style={{ backgroundImage: `url('${current.image}')` }}>
      <button
        className="testimonialArrow left"
        aria-label="Previous testimonial"
        onClick={() => setIndex((value) => (value + testimonials.length - 1) % testimonials.length)}
      >
        <ArrowLeft size={28} />
      </button>
      <div className="testimonialContent" key={index} aria-live="polite" aria-atomic="true">
        <SectionTitle eyebrow="Testimonials" title="What Our Clients Are Saying" light />
        <blockquote>
          <strong>{current.quote.split(".")[0]}.</strong>
          <span>{current.quote.split(".").slice(1).join(".").trim()}</span>
        </blockquote>
        <p>
          <b>{current.person}</b>
          <small>{current.meta}</small>
        </p>
      </div>
      <button
        className="testimonialArrow right"
        aria-label="Next testimonial"
        onClick={() => setIndex((value) => (value + 1) % testimonials.length)}
      >
        <ArrowRight size={28} />
      </button>
    </section>
  );
}

function ContactSection() {
  const [submitted, setSubmitted] = useState(false);
  return (
    <section className="contactSection" id="contact">
      <div className="pageHeading">
        <h2>Contact Us</h2>
      </div>
      <div className="contactHero" style={{ backgroundImage: "url('/assets/contact-typing.png')" }}>
        <h2>Get In Touch</h2>
        <a className="button dark" href="#message-form">Questions?</a>
      </div>
      <div className="contactCards">
        <article className="outlineCard">
          <Clock3 size={44} />
          <h3>Company Information:</h3>
          <p>Dinesh Singh, CPA</p>
          <p>Dinesh Professional Corporation</p>
        </article>
        <article className="outlineCard">
          <MapPin size={48} />
          <h3>Address:</h3>
          <p>2985 Drew Road, Suite 216</p>
          <p>Mississauga, ON L4T 0A7</p>
        </article>
        <article className="outlineCard">
          <Smartphone size={45} />
          <h3>Call or Email</h3>
          <p><a href="tel:+18553463741">+1 (855) DINESH1</a></p>
          <p><a href="mailto:info@dineshcpa.ca">info@dineshcpa.ca</a></p>
        </article>
      </div>
      <div className="contactGrid">
        <form
          id="message-form"
          className="contactForm"
          onSubmit={(event) => {
            event.preventDefault();
            setSubmitted(true);
          }}
        >
          <label className="srOnly" htmlFor="contact-name">Name (required)</label>
          <input id="contact-name" name="name" autoComplete="name" required placeholder="Name *" />
          <label className="srOnly" htmlFor="contact-email">Email address (required)</label>
          <input id="contact-email" name="email" autoComplete="email" required type="email" placeholder="Email Address *" />
          <label className="srOnly" htmlFor="contact-phone">Phone number (optional)</label>
          <input id="contact-phone" name="phone" autoComplete="tel" type="tel" placeholder="Phone Number" />
          <label className="srOnly" htmlFor="contact-message">Message (required)</label>
          <textarea id="contact-message" name="message" required placeholder="Message *" />
          <button className="button dark" type="submit">
            {submitted ? "Message Ready" : "Message"}
          </button>
        </form>
        <div className="mapFrame">
          <img src="/assets/map.png" alt="Map showing the Mississauga office area" />
          <span><MapPin size={22} /></span>
        </div>
      </div>
      <div className="credentialStrip" aria-label="Professional credential logos">
        {["credential-cpa-ca.png", "credential-cpa.png", "credential-agent.png", "credential-cbta.png", "credential-hlb.png"].map((asset) => (
          <img key={asset} src={`/assets/${asset}`} alt="" />
        ))}
      </div>
    </section>
  );
}

function Faqs() {
  const [open, setOpen] = useState(0);
  return (
    <section className="section faqSection" id="faqs">
      <SectionTitle eyebrow="FAQs" title="Clear answers before you start" />
      <div className="faqList">
        {faqs.map((item, index) => (
          <article className={`faqItem ${open === index ? "open" : ""}`} key={item.q}>
            <button aria-expanded={open === index} aria-controls={`faq-answer-${index}`} onClick={() => setOpen(open === index ? -1 : index)}>
              {item.q}
              <ChevronDown className={open === index ? "rotated" : ""} size={22} />
            </button>
            <div id={`faq-answer-${index}`} className="faqAnswer" aria-hidden={open !== index}><div><p>{item.a}</p></div></div>
          </article>
        ))}
      </div>
    </section>
  );
}

function Footer() {
  const [email, setEmail] = useState("");
  const subscribed = useMemo(() => email.includes("@"), [email]);
  return (
    <footer className="siteFooter">
      <div className="footerCta">
        <div>
          <h2>Ready to optimize your financial future?</h2>
          <p>Discover the value DineshCPA can bring to your personal and business finances.</p>
        </div>
        <Logo large />
      </div>
      <div className="footerGrid">
        <div>
          <a className="button dark" href="#contact">Book a 10-Year Review</a>
          <a className="button ghost" href="#contact">Schedule a Consultation</a>
          <div className="socials">
            {["ig", "f", "yt", "in"].map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
          <p className="finePrint">© 2026 Dinesh CPA. All rights reserved.</p>
        </div>
        <div className="footerList">
          <h3>Home</h3>
          <a href="#personal">Personal</a>
          <a href="#services">Services</a>
          <a href="#corporate">Corporate</a>
          <a href="#industries">Industries</a>
          <a href="#insights">Insights</a>
          <a href="#faqs">FAQs</a>
          <a href={PARTNER_URL} target="_blank" rel="sponsored noopener noreferrer">Technology partner: Boldsmith<span className="srOnly"> (opens in a new tab)</span></a>
        </div>
        <div className="footerList">
          <h3>Corporate</h3>
          {corporateServices.slice(0, 8).map((item) => (
              <a href="#corporate" key={item.title}>{item.title}</a>
          ))}
        </div>
        <form
          className="subscribeForm"
          onSubmit={(event) => {
            event.preventDefault();
          }}
        >
          <h3>Subscribe to our email</h3>
          <p>Stay informed with the most recent financial and business updates by subscribing to our blog.</p>
          <div>
            <input placeholder="First & Last Name" />
            <input value={email} onChange={(event) => setEmail(event.target.value)} placeholder="Email" />
            <button type="submit">{subscribed ? "Signed up" : "Sign up"}</button>
          </div>
          <small>Dinesh CPA Terms of Service and Privacy Statement</small>
        </form>
      </div>
    </footer>
  );
}

function SectionTitle({ eyebrow, title, subtitle, light = false }) {
  return (
    <div className={`sectionTitle ${light ? "light" : ""}`}>
      <span>{eyebrow}</span>
      <h2>{title}</h2>
      {subtitle && <strong>{subtitle}</strong>}
    </div>
  );
}

function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Intro />
        <Benefits />
        <ReviewCta />
        <PersonalSection />
        <ExpandedServices />
        <TechnologyPartner />
        <CorporateSection />
        <IndustrySection />
        <CoverageSection />
        <ProcessSection />
        <Insights />
        <Testimonials />
        <ContactSection />
        <Faqs />
      </main>
      <Footer />
      <Experience />
    </>
  );
}

createRoot(document.getElementById("root")).render(<App />);
