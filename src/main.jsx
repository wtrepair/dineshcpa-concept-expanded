import React, { useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  ArrowLeft,
  ArrowRight,
  Bell,
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
  Minus,
  Phone,
  Plus,
  ReceiptText,
  Search,
  ShieldCheck,
  Smartphone,
  X,
} from "lucide-react";
import "./styles.css";

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

const personalServices = [
  {
    title: "Canadian Personal Tax Return Filing",
    image: "/assets/tax-filing.png",
    detail:
      "Accurate T1 preparation for employment, self-employment, rental, investment, and family situations with deduction and credit review.",
  },
  {
    title: "Canadian Cross-Border Tax Filing",
    image: "/assets/us-tax.png",
    detail:
      "Support for Canadian residents and mobile clients with foreign income, disclosure questions, and coordinated filing needs.",
  },
  {
    title: "Tax Compliance Assurance",
    image: "/assets/tax-compliance.png",
    detail:
      "Review, response, and documentation support for CRA letters, prior filings, missing slips, and unresolved personal tax matters.",
  },
  {
    title: "Non-Resident Taxation",
    image: "/assets/non-resident.png",
    detail:
      "Advice for non-residents and newcomers dealing with Canadian source income, property, departure matters, and withholding rules.",
  },
  {
    title: "Audit Readiness Services",
    image: "/assets/audit-ready.png",
    detail:
      "Organized records, issue spotting, and response preparation so audits and reviews can be handled calmly and defensibly.",
  },
];

const corporateServices = [
  "10-Year Tax Review",
  "Canadian Business Tax Return Filing",
  "Cross-Border Business Tax Coordination",
  "GST, Payroll, and WSIB Filings",
  "Fractional CFO Services",
  "Business Sale and Succession Planning",
  "Business Incorporation",
  "Foreign Income Reporting",
  "SR&ED Support",
  "Valuations",
];

const specializedServices = [
  {
    title: "Pre-Construction Assignment and HST Solutions",
    image: "/assets/non-resident.png",
    body: "GST/HST review, rebate support, and planning around property transactions where details can change the outcome.",
  },
  {
    title: "Canadian Cross-Border Tax Services",
    image: "/assets/us-tax.png",
    body: "Coordinated filings and guidance for Canadian individuals, owners, and mobile professionals with foreign activity.",
  },
  {
    title: "Rebate Filing and Property Declarations",
    image: "/assets/piggy-bank.png",
    body: "Structured support for rebates, declarations, and compliance-sensitive property documents.",
  },
  {
    title: "Student Tax Return Special",
    image: "/assets/about-desk.png",
    body: "Simple, cost-conscious filing support for students and recent graduates building good habits early.",
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
  return (
    <header className="siteHeader" id="top">
      <div className="marketsBar" aria-label="Market data strip">
        {["Ethereum 1734.4", "S&P 500 4538.9", "EUR to USD 1.0907", "US 100 14373.2", "NVDA 485.48", "META 300.15"].map(
          (item, index) => (
            <span key={item} className={index % 2 ? "down" : "up"}>
              {item}
            </span>
          ),
        )}
        <a href="#insights">Visit Markets Data</a>
      </div>
      <nav className="navShell" aria-label="Primary navigation">
        <Logo />
        <button className="menuButton" onClick={() => setOpen((value) => !value)} aria-label="Toggle navigation">
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
        <div className={`navLinks ${open ? "open" : ""}`}>
          {navItems.map((item) => (
            <a key={item.label} href={item.href} onClick={() => setOpen(false)}>
              {item.label}
            </a>
          ))}
        </div>
        <div className="navActions">
          <label className="searchBox">
            <span className="srOnly">Search</span>
            <input placeholder="Last Name" />
            <Search size={14} />
          </label>
          <a className="signIn" href="#contact">
            Sign In
          </a>
          <Bell size={17} aria-hidden="true" />
        </div>
      </nav>
    </header>
  );
}

function Hero() {
  return (
    <section className="heroSection">
      <div className="heroMedia" style={{ backgroundImage: "url('/assets/hero-finance.png')" }}>
        <div className="heroCopy">
          <span>Tax strategy, filings, and advisory</span>
          <h1>Clarity for complex personal and business tax</h1>
          <p>
            Dinesh CPA helps individuals, owners, and cross-border clients uncover missed savings, stay compliant, and
            plan the next move with confidence.
          </p>
          <div className="heroActions">
            <a className="button light" href="#contact">
              Book Free 10-Year Review
            </a>
            <a className="textLink" href="#personal">
              Explore services
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function Intro() {
  return (
    <section className="introPanel">
      <div className="imagePanel">
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
    <section className="reviewCta">
      <div className="reviewText">
        <strong>Maximize Your Tax Savings:</strong>
        <h2>Free 10-Year Tax Review</h2>
        <a className="button dark" href="#contact">
          Here's the next step.
        </a>
      </div>
      <img src="/assets/piggy-bank.png" alt="Piggy bank held in a hand" />
    </section>
  );
}

function ServiceCard({ service, active, onToggle }) {
  return (
    <article className={`serviceCard ${active ? "active" : ""}`} style={{ backgroundImage: `url('${service.image}')` }}>
      <div>
        <h3>{service.title}</h3>
        <p>{service.detail || service.body}</p>
      </div>
      <button onClick={onToggle} aria-label={`Show details for ${service.title}`}>
        {active ? <Minus size={24} /> : <Plus size={24} />}
      </button>
    </article>
  );
}

function PersonalSection() {
  const [active, setActive] = useState(0);
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
        A risk-free way to revisit your taxes with no upfront cost. We uncover missed deductions, with only a small
        admin fee and a 10% contingency on recovered funds.
      </p>
      <SectionTitle eyebrow="Taxes, audits, strategic planning and more..." title="Giving you the confidence to focus on what matters" />
      <div className="serviceRail" aria-label="Personal tax services">
        {personalServices.map((service, index) => (
          <ServiceCard
            key={service.title}
            service={service}
            active={active === index}
            onToggle={() => setActive(active === index ? -1 : index)}
          />
        ))}
      </div>
    </section>
  );
}

function CorporateSection() {
  return (
    <section className="darkBand" id="corporate">
      <SectionTitle eyebrow="Specialized Services" title="DineshCPA offers tailored solutions" light />
      <div className="specialGrid">
        {specializedServices.map((service, index) => (
          <ServiceCard key={service.title} service={service} active={index === 0} onToggle={() => {}} />
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
            <li key={service}>
              <Check size={17} />
              {service}
            </li>
          ))}
        </ul>
      </div>
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
        <div className="industryGrid">
          {industries.map((industry) => (
            <article key={industry.title}>
              <span>{String(industry.index + 1).padStart(2, "0")}</span>
              <h3>{industry.title}</h3>
              <p>{industry.summary}</p>
            </article>
          ))}
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
      <div className="processMedia">
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
      <div className="testimonialContent">
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
          <p>+1 (855) DINESH1</p>
          <p>info@dineshcpa.ca</p>
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
          <input required placeholder="Name *" />
          <input required type="email" placeholder="Email Address *" />
          <input placeholder="Phone Number" />
          <textarea required placeholder="Message *" />
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
          <article className="faqItem" key={item.q}>
            <button onClick={() => setOpen(open === index ? -1 : index)}>
              {item.q}
              <ChevronDown className={open === index ? "rotated" : ""} size={22} />
            </button>
            {open === index && <p>{item.a}</p>}
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
          <a className="button dark" href="#contact">Book Free 10-Year Review</a>
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
        </div>
        <div className="footerList">
          <h3>Corporate</h3>
          {corporateServices.slice(0, 8).map((item) => (
            <a href="#corporate" key={item}>{item}</a>
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
    </>
  );
}

createRoot(document.getElementById("root")).render(<App />);
