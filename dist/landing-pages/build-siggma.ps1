# Build signin.ai adapted HTML from Sublevel Studio source
# This script replaces all Sublevel Studio text content with signin.ai content
# while preserving the exact Three.js scene, CSS, and interactive elements.

$src = Join-Path $PSScriptRoot "..\sublevel-studio.html"
$dst = Join-Path $PSScriptRoot "signin-ai.html"

# Read source
$content = Get-Content -Path $src -Raw -Encoding UTF8

# ── HTML HEAD ─────────────────────────────────────────────────────
$content = $content -replace '<title>sublevel\.studio \| We build the stuff people remember\.</title>', '<title>signin.ai | AI-powered sales intelligence for modern teams.</title>'
$content = $content -replace 'content="sublevel\. is a digital studio &amp; brand workshop building the stuff people remember\. A single-file Three\.js experience\."', 'content="signin.ai is an AI-powered sales support and sales intelligence platform. A single-file Three.js experience."'

# ── LOADER ────────────────────────────────────────────────────────
$content = $content -replace 'loading sublevel', 'loading signin'

# ── NAVIGATION ────────────────────────────────────────────────────
$content = $content -replace 'sublevel<i>\.</i>', 'signin<i>.</i>'
$content = $content -replace 'agent@sublevel', 'agent@signin'

# ── HERO SECTION ──────────────────────────────────────────────────
$content = $content -replace 'Sublevel — studio index', 'signin.ai — intelligence index'
$content = $content -replace 'Est\. 2019', 'Est. 2024'
$content = $content -replace 'A digital studio &amp; brand workshop building the stuff people remember', 'AI-powered sales support for teams that want to sell smarter'
$content = $content -replace 'We team up with ambitious founders, scale-ups and brands to turn strategy into products, identities and experiences that actually ship\.', 'Turn sales data into actionable intelligence. Forecast demand, identify opportunities, understand customer behavior, and help your sales team make better decisions.'

# ── SHOWCASE / LOGOS SECTION ──────────────────────────────────────
$content = $content -replace 'Trusted by the builders', 'Built for sales teams'

# Logo cell aria-labels and text (company names → customer segments)
# Note: These are in the #showcase section aria-labels
$content = $content -replace 'aria-label="Northwind Labs"', 'aria-label="B2B Sales Teams"'
$content = $content -replace 'alt="Northwind Labs"', 'alt="B2B Sales Teams"'
$content = $content -replace 'aria-label="Halide"', 'aria-label="SaaS Companies"'
$content = $content -replace 'alt="Halide"', 'alt="SaaS Companies"'
$content = $content -replace 'aria-label="Quillworks"', 'aria-label="E-commerce Businesses"'
$content = $content -replace 'alt="Quillworks"', 'alt="E-commerce Businesses"'
$content = $content -replace 'aria-label="Lumenary"', 'aria-label="Financial Services"'
$content = $content -replace 'alt="Lumenary"', 'alt="Financial Services"'
$content = $content -replace 'aria-label="Kestrel"', 'aria-label="Retail"'
$content = $content -replace 'alt="Kestrel"', 'alt="Retail"'
$content = $content -replace 'aria-label="Vantagefield"', 'aria-label="Manufacturing"'
$content = $content -replace 'alt="Vantagefield"', 'alt="Manufacturing"'
$content = $content -replace 'aria-label="Cobaltine"', 'aria-label="Technology Companies"'
$content = $content -replace 'alt="Cobaltine"', 'alt="Technology Companies"'
$content = $content -replace 'aria-label="Moonrake"', 'aria-label="Growing Startups"'
$content = $content -replace 'alt="Moonrake"', 'alt="Growing Startups"'
$content = $content -replace 'aria-label="Harborlight"', 'aria-label="Enterprise Revenue"'
$content = $content -replace 'alt="Harborlight"', 'alt="Enterprise Revenue"'
$content = $content -replace 'aria-label="Meridiana"', 'aria-label="Healthcare"'
$content = $content -replace 'alt="Meridiana"', 'alt="Healthcare"'
$content = $content -replace 'aria-label="Foundryhouse"', 'aria-label="Professional Services"'
$content = $content -replace 'alt="Foundryhouse"', 'alt="Professional Services"'
$content = $content -replace 'aria-label="Signalhaus"', 'aria-label="Media &amp; Entertainment"'
$content = $content -replace 'alt="Signalhaus"', 'alt="Media &amp; Entertainment"'

# ── FEATURED PROJECTS → AI CAPABILITIES ──────────────────────────
$content = $content -replace 'Featured Projects', 'AI Capabilities'
$content = $content -replace 'Eight selected builds from the last eighteen months — brand systems, product launches and a few experiments that got out of hand\.', 'Eight core capabilities that transform how sales teams understand their customers, forecast revenue, and make better decisions.'

# Card 1: Halide Launch → Sales Forecasting
$content = $content -replace 'aria-label="Halide Launch"', 'aria-label="Sales Forecasting"'
$content = $content -replace 'alt="Halide Launch"', 'alt="Sales Forecasting"'
$content = $content -replace '<p class="cats" data-ps>Websites · Marketing · IRL</p>\s*<h3 class="f-h3" data-ps>Halide Launch</h3>\s*<p class="desc f-p" data-ps>Halide.s developer summit needed a home built for the moment: live schedules, speaker reveals and a ticket drop that held up on launch day.</p>', '<p class="cats" data-ps>Forecasting · AI · Analytics</p><h3 class="f-h3" data-ps>Sales Forecasting</h3><p class="desc f-p" data-ps>Predict future sales using historical data, trends, seasonality, and AI-powered analysis to guide revenue planning.</p>'

# Card 2: Northwind Labs → Opportunity Intelligence
$content = $content -replace 'aria-label="Northwind Labs"', 'aria-label="Opportunity Intelligence"'
$content = $content -replace 'alt="Northwind Labs"', 'alt="Opportunity Intelligence"'
$content = $content -replace '<p class="cats" data-ps>Brand System · Photography</p>\s*<h3 class="f-h3" data-ps>Northwind Labs</h3>\s*<p class="desc f-p" data-ps>An energy company that had outgrown its logo\. We rebuilt the identity around the people who climb the towers\.</p>', '<p class="cats" data-ps>Prioritization · AI · Conversion</p><h3 class="f-h3" data-ps>Opportunity Intelligence</h3><p class="desc f-p" data-ps>Identify and prioritize opportunities with stronger conversion potential using AI-driven scoring.</p>'

# Card 3: Lumenary → Customer Intelligence
$content = $content -replace 'aria-label="Lumenary"', 'aria-label="Customer Intelligence"'
$content = $content -replace 'alt="Lumenary"', 'alt="Customer Intelligence"'
$content = $content -replace '<p class="cats" data-ps>Websites · Product Launch</p>\s*<h3 class="f-h3" data-ps>Lumenary</h3>\s*<p class="desc f-p" data-ps>A quiet product deserved a loud launch\. The story-driven site sold through the first hardware run in a weekend\.</p>', '<p class="cats" data-ps>Behavior · Engagement · Analysis</p><h3 class="f-h3" data-ps>Customer Intelligence</h3><p class="desc f-p" data-ps>Understand customer behavior, purchasing patterns, and engagement signals across your entire customer base.</p>'

# Card 4: Quillworks → AI Sales Assistant
$content = $content -replace 'aria-label="Quillworks"', 'aria-label="AI Sales Assistant"'
$content = $content -replace 'alt="Quillworks"', 'alt="AI Sales Assistant"'
$content = $content -replace '<p class="cats" data-ps>Identity · Print</p>\s*<h3 class="f-h3" data-ps>Quillworks</h3>\s*<p class="desc f-p" data-ps>A stationery house with a hundred-year archive and no way to show it\. We gave the catalogue a spine again\.</p>', '<p class="cats" data-ps>Insights · Recommendations · AI</p><h3 class="f-h3" data-ps>AI Sales Assistant</h3><p class="desc f-p" data-ps>Provide sales teams with contextual answers, insights, recommendations, and deal summaries on demand.</p>'

# Card 5: Kestrel Studios → Pipeline Intelligence
$content = $content -replace 'aria-label="Kestrel Studios"', 'aria-label="Pipeline Intelligence"'
$content = $content -replace 'alt="Kestrel Studios"', 'alt="Pipeline Intelligence"'
$content = $content -replace '<p class="cats" data-ps>Websites · Editorial</p>\s*<h3 class="f-h3" data-ps>Kestrel Studios</h3>\s*<p class="desc f-p" data-ps>We fused fashion drops with interactive storytelling, turning a seasonal lookbook into a world people shared\.</p>', '<p class="cats" data-ps>Deals · Risk · Revenue</p><h3 class="f-h3" data-ps>Pipeline Intelligence</h3><p class="desc f-p" data-ps>Analyze the sales pipeline and highlight bottlenecks, stalled deals, and potential revenue opportunities.</p>'

# Card 6: Cobaltine → Revenue Analytics
$content = $content -replace 'aria-label="Cobaltine"', 'aria-label="Revenue Analytics"'
$content = $content -replace 'alt="Cobaltine"', 'alt="Revenue Analytics"'
$content = $content -replace '<p class="cats" data-ps>Space Design · Wayfinding</p>\s*<h3 class="f-h3" data-ps>Cobaltine</h3>\s*<p class="desc f-p" data-ps>Six floors, one colour and a lighting rule that does the wayfinding so the signage does not have to\.</p>', '<p class="cats" data-ps>Data · Metrics · Insights</p><h3 class="f-h3" data-ps>Revenue Analytics</h3><p class="desc f-p" data-ps>Transform sales data into clear business insights and actionable revenue metrics for better planning.</p>'

# Card 7: Shop Moonrake → Performance Intelligence
$content = $content -replace 'aria-label="Shop Moonrake"', 'aria-label="Performance Intelligence"'
$content = $content -replace 'alt="Shop Moonrake"', 'alt="Performance Intelligence"'
$content = $content -replace '<p class="cats" data-ps>Commerce · Campaign</p>\s*<h3 class="f-h3" data-ps>Shop Moonrake</h3>\s*<p class="desc f-p" data-ps>A creator with millions of viewers needed a storefront that felt like the videos: fast, loud, impossible to scroll past\.</p>', '<p class="cats" data-ps>Teams · Metrics · Coaching</p><h3 class="f-h3" data-ps>Performance Intelligence</h3><p class="desc f-p" data-ps>Help sales managers understand team performance, identify coaching opportunities, and improve results.</p>'

# Card 8: Signalhaus → Decision Support
$content = $content -replace 'aria-label="Signalhaus"', 'aria-label="Decision Support"'
$content = $content -replace 'alt="Signalhaus"', 'alt="Decision Support"'
$content = $content -replace '<p class="cats" data-ps>Product · Interface</p>\s*<h3 class="f-h3" data-ps>Signalhaus</h3>\s*<p class="desc f-p" data-ps>A desktop radio with one knob and no screen\. Most of the work was deciding what to leave out\.</p>', '<p class="cats" data-ps>Strategy · Risk · Planning</p><h3 class="f-h3" data-ps>Decision Support</h3><p class="desc f-p" data-ps>Assist sales teams and managers in making data-backed decisions with confidence and clarity.</p>'

# ── CAPABILITIES SECTION ──────────────────────────────────────────
$content = $content -replace "We're here to make the extraordinary\.", "Intelligence that drives revenue."
$content = $content -replace 'No shortcuts — just bold, precise work that raises the bar &amp; leaves a mark\.', 'From forecasting to decision support, every capability is built to turn your sales data into a competitive advantage.'

# Capability 1: Websites & Features → Sales Forecasting
$content = $content -replace '<h3 class="f-h4" data-ps><a class="actionable" href="#showcase">Websites &amp; Features</a></h3>\s*<p class="f-h4" data-ps>From pre-launch teasers to full redesigns, we design and engineer sites that earn attention and turn it into action\.</p>\s*<div class="tags f-p"><span>Product Strategy</span><span>UX/UI Design</span><span>Engineering</span><span>3D &amp; Motion</span></div>', '<h3 class="f-h4" data-ps><a class="actionable" href="#showcase">Sales Forecasting</a></h3><p class="f-h4" data-ps>Predict future sales using historical data, trends, seasonality, and AI-powered analysis.</p><div class="tags f-p"><span>Historical Analysis</span><span>Trend Detection</span><span>AI Models</span><span>Seasonality</span></div>'

# Capability 2: Visual Branding → Opportunity Intelligence
$content = $content -replace '<h3 class="f-h4" data-ps><a class="actionable" href="#showcase">Visual Branding</a></h3>\s*<p class="f-h4" data-ps>From lean identities for new companies to full brand platforms for category leaders, we build systems that scale without going stale\.</p>\s*<div class="tags f-p"><span>Visual Identity</span><span>Brand Systems</span></div>', '<h3 class="f-h4" data-ps><a class="actionable" href="#showcase">Opportunity Intelligence</a></h3><p class="f-h4" data-ps>Identify and prioritize high-value opportunities with stronger conversion potential.</p><div class="tags f-p"><span>AI Scoring</span><span>Prioritization</span><span>Conversion Analysis</span></div>'

# Capability 3: IRL Experience Design → Customer Intelligence
$content = $content -replace '<h3 class="f-h4" data-ps><a class="actionable" href="#showcase">IRL Experience Design</a></h3>\s*<p class="f-h4" data-ps>From annual summits to weekend pop-ups, we design in-person moments people remember long after the doors close\.</p>\s*<div class="tags f-p"><span>Visual Identity</span><span>Space Design</span><span>Keynote Design</span><span>Digital &amp; Interactive</span></div>', '<h3 class="f-h4" data-ps><a class="actionable" href="#showcase">Customer Intelligence</a></h3><p class="f-h4" data-ps>Understand customer behavior, purchasing patterns, and engagement across your entire customer base.</p><div class="tags f-p"><span>Behavior Analysis</span><span>Engagement</span><span>Segmentation</span><span>Patterns</span></div>'

# Capability 4: Marketing Execution → AI Sales Assistant
$content = $content -replace '<h3 class="f-h4" data-ps><a class="actionable" href="#showcase">Marketing Execution</a></h3>\s*<p class="f-h4" data-ps>From brand to product marketing, we plug into marketing teams to ship the assets that drive awareness, demand and conversion\.</p>\s*<div class="tags f-p"><span>Campaign Content</span><span>Growth Experiments</span><span>Sales Materials</span></div>', '<h3 class="f-h4" data-ps><a class="actionable" href="#showcase">AI Sales Assistant</a></h3><p class="f-h4" data-ps>Give sales teams contextual insights, summaries, and recommendations whenever they need them.</p><div class="tags f-p"><span>Contextual Answers</span><span>Deal Summaries</span><span>Recommendations</span></div>'

# ── CONTACT SECTION ──────────────────────────────────────────────
$content = $content -replace "Let's build something loud\.", 'Let intelligence drive your revenue.'
$content = $content -replace 'hello@sublevel\.studio', 'hello@signin.ai'

# ── NEWSLETTER / FOOTER ──────────────────────────────────────────
$content = $content -replace 'Newsletter — dispatch 026', 'Updates — dispatch 001'
$content = $content -replace 'Want the good stuff first\?', 'Stay ahead with sales intelligence.'
$content = $content -replace 'Drops, experiments and the occasional bad idea, sent no more than once a month\.', 'AI insights, product updates, and practical sales intelligence, delivered monthly.'
$content = $content -replace 'placeholder="you@studio\.com"', 'placeholder="you@company.com"'
$content = $content -replace 'Count me in', 'Subscribe'
$content = $content -replace 'Welcome aboard', 'You are on the list.'
$content = $content -replace 'No spam\. Unsubscribe in one click\.', 'No spam. Unsubscribe anytime.'

# ── SVG MARK ──────────────────────────────────────────────────────
$content = $content -replace 'aria-label="SUBLEVEL\.26"', 'aria-label="signin.ai"'
$content = $content -replace 'SUBLEVEL\.26</text>', 'signin.ai</text>'

# ── FOOTER LINKS ─────────────────────────────────────────────────
$content = $content -replace '<a class="blink" href="#top">Home</a><a class="blink" href="#services">Services</a><a class="blink" href="#showcase">Showcase</a><a class="blink" href="#people">People</a><a class="blink" href="#blog">Blog</a><a class="blink" href="#lab">Lab</a><a class="blink" href="mailto:hello@sublevel\.studio">Contact Us</a>', '<a class="blink" href="#top">Home</a><a class="blink" href="#services">Product</a><a class="blink" href="#showcase">Intelligence</a><a class="blink" href="#people">Use Cases</a><a class="blink" href="#blog">Lab</a><a class="blink" href="#lab">How It Works</a><a class="blink" href="mailto:hello@signin.ai">Contact</a>'

# ── MENU LINKS ───────────────────────────────────────────────────
$content = $content -replace '<a href="#top">Home</a><a href="#showcase">Work</a><a href="#services">Services</a><a href="#people">People</a><a href="#blog">Blog</a><a href="#lab">Lab</a><a href="mailto:hello@sublevel\.studio">Contact</a>', '<a href="#top">Home</a><a href="#showcase">Intelligence</a><a href="#services">Product</a><a href="#people">Use Cases</a><a href="#blog">Lab</a><a href="#lab">How It Works</a><a href="mailto:hello@signin.ai">Contact</a>'

# ── MENU FOOT ────────────────────────────────────────────────────
$content = $content -replace '<p><b>hello@sublevel\.studio</b></p>', '<p><b>hello@signin.ai</b></p>'
$content = $content -replace '<p>Kyoto &amp; remote · open late</p>', '<p>Remote · worldwide · always on</p>'
$content = $content -replace '<p>Est\. 2019 · dispatch 026</p>', '<p>Est. 2024 · dispatch 001</p>'

# ── NAV BAR PILLBAR ──────────────────────────────────────────────
# Nav: Home, Work → Intelligence, Services, Lab → How It Works
$content = $content -replace '<a class="active blink" href="#top">Home</a>\s*<a class="blink" href="#showcase">Work</a>\s*<a class="blink" href="#services">Services</a>\s*<a class="blink" href="#lab">Lab</a>', '<a class="active blink" href="#top">Home</a><a class="blink" href="#showcase">Intelligence</a><a class="blink" href="#services">Product</a><a class="blink" href="#lab">How It Works</a>'

# ── COPYRIGHT ─────────────────────────────────────────────────────
$content = $content -replace '© sublevel\.studio LLC 2026 all rights reserved', '© signin.ai 2024 — AI-powered sales intelligence'

# ── MACHINE-READABLE INDEX (pre tag) ─────────────────────────────
$content = $content -replace 'SUBLEVEL\.STUDIO :: MACHINE-READABLE INDEX', 'signin.ai :: MACHINE-READABLE INDEX'
$content = $content -replace '# PLAIN-TEXT MIRROR OF SUBLEVEL\.STUDIO FOR AI AGENTS, CRAWLERS, AND HUMANS WHO PREFER IT RAW\.', '# PLAIN-TEXT MIRROR OF signin.ai FOR AI AGENTS, CRAWLERS, AND HUMANS WHO PREFER IT RAW.'
$content = $content -replace 'NAME \.{10,} SUBLEVEL\.STUDIO', 'NAME .......... signin.ai'
$content = $content -replace 'AKA \.{10,} SUBLEVEL, SBLVL, SUBLEVELSTUDIO', 'AKA ........... signin, signinAI, signin-AI'
$content = $content -replace 'FOUNDED \.{10,} 2021', 'FOUNDED ....... 2024'
$content = $content -replace 'LOCATION \.{10,} PORTO, PORTUGAL \(PT\)', 'LOCATION ...... WORLDWIDE'
$content = $content -replace 'AREA_SERVED \.{10,} WORLDWIDE', 'AREA_SERVED ... WORLDWIDE'
$content = $content -replace 'SERVICES \.{10,} WEBSITE DESIGN AND ENGINEERING, VISUAL BRAND IDENTITY, REAL-TIME 3D EXPERIENCES, MARKETING EXECUTION, PRODUCT ENGINEERING', 'SERVICES ...... SALES FORECASTING, OPPORTUNITY INTELLIGENCE, CUSTOMER INTELLIGENCE, AI SALES ASSISTANT, PIPELINE INTELLIGENCE, REVENUE ANALYTICS'
$content = $content -replace 'CLIENTS \.{10,} NORTHWIND LABS, HALIDE, QUILLWORKS, LUMENARY, KESTREL, VANTAGEFIELD, COBALTINE, MOONRAKE, HARBORLIGHT', 'CLIENTS ....... B2B SALES TEAMS, SAAS COMPANIES, E-COMMERCE BUSINESSES, FINANCIAL SERVICES, RETAIL, MANUFACTURING, TECHNOLOGY COMPANIES'
$content = $content -replace 'KNOWS_ABOUT \.{10,} WEB DESIGN, BRAND IDENTITY, WEBGL, THREE\.JS, MOTION, TYPEFACE DESIGN, GROWTH MARKETING', 'KNOWS_ABOUT ... SALES INTELLIGENCE, PREDICTIVE ANALYTICS, CUSTOMER BEHAVIOR, PIPELINE MANAGEMENT, REVENUE FORECASTING, AI/ML'
$content = $content -replace 'SUBLEVEL\.STUDIO IS A PORTO-BASED DIGITAL DESIGN AND ENGINEERING STUDIO\. WE BUILD HIGH-PERFORMANCE WEBSITES, BRAND SYSTEMS AND REAL-TIME 3D EXPERIENCES FOR TECHNOLOGY COMPANIES AND CREATORS\.', 'signin.ai IS AN AI-POWERED SALES SUPPORT AND SALES INTELLIGENCE PLATFORM. WE HELP SALES TEAMS TURN BUSINESS AND SALES DATA INTO ACTIONABLE INTELLIGENCE.'
$content = $content -replace 'FOUNDED IN 2021, THE STUDIO PARTNERS WITH STARTUPS AND ESTABLISHED BRANDS ACROSS EUROPE AND NORTH AMERICA, FROM FIRST IDENTITY TO PRODUCTION ENGINEERING\.', 'signin.ai USES PREDICTIVE ANALYTICS, MACHINE LEARNING, AND AI TO HELP TEAMS FORECAST SALES, IDENTIFY OPPORTUNITIES, UNDERSTAND CUSTOMERS, AND MAKE BETTER DECISIONS.'
$content = $content -replace '── CAPABILITIES ──────────────────────────────────────────────────', '── CAPABILITIES ──────────────────────────────────────────────────'

# ── JAVASCRIPT TEXT STRINGS ──────────────────────────────────────
# Canvas texture: neon sign 'sublevel.' → 'signin.'
$content = $content -replace "g\.strokeText\('sublevel\.',", "g.strokeText('signin.',"
$content = $content -replace "g\.fillText\('sublevel\.',", "g.fillText('signin.',"

# Canvas texture: 'SUBLEVEL' → 'signin'
$content = $content -replace "g\.fillText\('SUBLEVEL',", "g.fillText('signin',"

# Canvas texture: 'SBLVL' → 'SGMA'
$content = $content -replace "g\.strokeText\('SBLVL',", "g.strokeText('SGMA',"
$content = $content -replace "g\.fillText\('SBLVL',", "g.fillText('SGMA',"

# Marquee ticker: 'SUBLEVEL   ///   WE BUILD THE STUFF PEOPLE REMEMBER' → signin.ai
$content = $content -replace "SUBLEVEL   ///   WE BUILD THE STUFF PEOPLE REMEMBER   ///   OPEN LATE   ///   NOW PLA", "signin.ai   ///   SALES INTELLIGENCE THAT DRIVES REVENUE   ///   AI-POWERED   ///   NOW REA"

# Arcade game: 'SUBLEVEL DEFENDER' → 'signin DEFENDER'
$content = $content -replace "SUBLEVEL DEFENDER", "signin DEFENDER"

# Arcade game header text
$content = $content -replace "g\.fillText\('1 PLAYER'", "g.fillText('1 PLAYER'"

# ── MACHINE INDEX ASCII ART ──────────────────────────────────────
# The ASCII art banner says SUBLEVEL - replace with simplified signin
$content = $content -replace 'SUBLEVEL\.STUDIO :: MACHINE-READABLE INDEX', 'signin.ai :: MACHINE-READABLE INDEX'

# ── CRT TERMINAL / SUBLEVEL_LOG ──────────────────────────────────
# These are the terminal lines that appear in the machine-readable view
# The ASCII art block is in SUBLEVEL_LOG JS array - need to replace specific strings
$content = $content -replace '"SUBLEVEL\.STUDIO :: MACHINE-READABLE INDEX"', '"signin.ai :: MACHINE-READABLE INDEX"'
$content = $content -replace '"# PLAIN-TEXT MIRROR OF SUBLEVEL\.STUDIO FOR AI AGENTS, CRAWLERS, AND HUMANS WHO"', '"# PLAIN-TEXT MIRROR OF signin.ai FOR AI AGENTS, CRAWLERS, AND HUMANS WHO"'
$content = $content -replace '"  PREFER IT RAW\."', '"  PREFER IT RAW."'
$content = $content -replace '"NAME \.{10,} SUBLEVEL\.STUDIO"', '"NAME .......... signin.ai"'
$content = $content -replace '"AKA \.{10,} SUBLEVEL, SBLVL, SUBLEVELSTUDIO"', '"AKA ........... signin, signinAI"'
$content = $content -replace '"FOUNDED \.{10,} 2021"', '"FOUNDED ....... 2024"'
$content = $content -replace '"LOCATION \.{10,} PORTO, PORTUGAL \(PT\)"', '"LOCATION ...... WORLDWIDE"'
$content = $content -replace '"SUBLEVEL\.STUDIO IS A PORTO-BASED DIGITAL DESIGN AND ENGINEERING STUDIO\. WE"', '"signin.ai IS AN AI-POWERED SALES SUPPORT AND SALES INTELLIGENCE PLATFORM. WE"'
$content = $content -replace '"  BUILD HIGH-PERFORMANCE WEBSITES, BRAND SYSTEMS AND REAL-TIME 3D EXPERIENCES"', '"  HELP SALES TEAMS TURN BUSINESS AND SALES DATA INTO ACTIONABLE INTELLIGENCE."'
$content = $content -replace '"  FOR TECHNOLOGY COMPANIES AND CREATORS\."', '"  FORECAST SALES, IDENTIFY OPPORTUNITIES, AND MAKE BETTER DECISIONS."'
$content = $content -replace '"FOUNDED IN 2021, THE STUDIO PARTNERS WITH STARTUPS AND ESTABLISHED BRANDS"', '"signin.ai USES PREDICTIVE ANALYTICS AND MACHINE LEARNING TO DELIVER SALES"'
$content = $content -replace '"  ACROSS EUROPE AND NORTH AMERICA, FROM FIRST IDENTITY TO PRODUCTION"', '"  INTELLIGENCE. FROM FORECASTING TO DECISION SUPPORT."'
$content = $content -replace '"  ENGINEERING\."', '"  FULLY AI-POWERED."'
$content = $content -replace '"SERVICES \.{10,} WEBSITE DESIGN AND ENGINEERING, VISUAL BRAND IDENTITY, REAL-"', '"SERVICES ...... SALES FORECASTING, OPPORTUNITY INTELLIGENCE, CUSTOMER"'
$content = $content -replace '"  TIME 3D EXPERIENCES, MARKETING EXECUTION, PRODUCT ENGINEERING"', '"  INTELLIGENCE, AI SALES ASSISTANT, PIPELINE INTELLIGENCE, REVENUE ANALYTICS"'
$content = $content -replace '"CLIENTS \.{10,} NORTHWIND LABS, HALIDE, QUILLWORKS, LUMENARY, KESTREL,"', '"CLIENTS ....... B2B SALES TEAMS, SAAS COMPANIES, E-COMMERCE, FINANCIAL"'
$content = $content -replace '"  VANTAGEFIELD, COBALTINE, MOONRAKE, HARBORLIGHT"', '"  SERVICES, RETAIL, MANUFACTURING, TECHNOLOGY COMPANIES"'
$content = $content -replace '"KNOWS_ABOUT \.{10,} WEB DESIGN, BRAND IDENTITY, WEBGL, THREE\.JS, MOTION, TYPEFACE"', '"KNOWS_ABOUT ... SALES INTELLIGENCE, PREDICTIVE ANALYTICS, CUSTOMER BEHAVIOR"'
$content = $content -replace '"  DESIGN, GROWTH MARKETING"', '"  PIPELINE MANAGEMENT, REVENUE FORECASTING, AI/ML"'
$content = $content -replace '/AI/HOME  /AI/SERVICES  /AI/SHOWCASE  /AI/PEOPLE  /AI/BLOG  /AI/LAB  /AI/FAQ  /AI/CONTACT', '/AI/HOME  /AI/PRODUCT  /AI/INTELLIGENCE  /AI/USE-CASES  /AI/LAB  /AI/HOW-IT-WORKS  /AI/CONTACT'

# ── TERMINAL STATUS CYCLES ───────────────────────────────────────
# termstatus shows various states - these are fine to keep as is

# ── MAILTO LINKS ─────────────────────────────────────────────────
# Global replace any remaining mailto:hello@sublevel.studio
$content = $content -replace 'mailto:hello@sublevel\.studio', 'mailto:hello@signin.ai'

# ── CRT GAME ENTRY ───────────────────────────────────────────────
$content = $content -replace "title: 'Sublevel Defender'", "title: 'signin Defender'"
$content = $content -replace "desc: 'The lobby arcade game\. Click the cabinet to play\.'", "desc: 'The lobby arcade game. Click the cabinet to play.'"
$content = $content -replace "kind: 'Lab · Game'", "kind: 'Lab · Game'"

# ── ABOUT SECTION IN MACHINE INDEX ──────────────────────────────
# The # ABOUT section in the pre tag  
$content = $content -replace '── ABOUT ─────────────────────────────────────────────────────────', '── ABOUT ─────────────────────────────────────────────────────────'

# ── DIAGNOSTICS / SERVICES IN MACHINE INDEX ─────────────────────
$content = $content -replace '\* WEBSITES &amp; FEATURES', '* SALES FORECASTING'
$content = $content -replace 'FROM PRE-LAUNCH TEASERS TO FULL REDESIGNS, WE DESIGN AND ENGINEER SITES THAT', 'PREDICT FUTURE SALES USING HISTORICAL DATA, TRENDS, SEASONALITY, AND'
$content = $content -replace '  EARN ATTENTION AND TURN IT INTO ACTION\.', '  AI-POWERED ANALYSIS TO GUIDE REVENUE PLANNING.'
$content = $content -replace '\[PRODUCT STRATEGY\] \[UX/UI DESIGN\] \[ENGINEERING\] \[3D &amp; MOTION\]', '[HISTORICAL ANALYSIS] [TREND DETECTION] [AI MODELS] [SEASONALITY]'
$content = $content -replace '\* VISUAL BRANDING', '* OPPORTUNITY INTELLIGENCE'
$content = $content -replace 'FROM LEAN IDENTITIES FOR NEW COMPANIES TO FULL BRAND PLATFORMS FOR CATEGORY', 'IDENTIFY AND PRIORITIZE HIGH-VALUE OPPORTUNITIES WITH STRONGER'
$content = $content -replace '  LEADERS, WE BUILD SYSTEMS THAT SCALE WITHOUT GOING STALE\.', '  CONVERSION POTENTIAL USING AI-DRIVEN SCORING.'
$content = $content -replace '\[VISUAL IDENTITY\] \[BRAND SYSTEMS\]', '[AI SCORING] [PRIORITIZATION] [CONVERSION ANALYSIS]'
$content = $content -replace '\* IRL EXPERIENCE DESIGN', '* CUSTOMER INTELLIGENCE'
$content = $content -replace 'FROM ANNUAL SUMMITS TO WEEKEND POP-UPS, WE DESIGN IN-PERSON MOMENTS PEOPLE', 'UNDERSTAND CUSTOMER BEHAVIOR, PURCHASING PATTERNS, AND ENGAGEMENT'
$content = $content -replace '  REMEMBER LONG AFTER THE DOORS CLOSE\.', '  ACROSS YOUR ENTIRE CUSTOMER BASE.'
$content = $content -replace '\[VISUAL IDENTITY\] \[SPACE DESIGN\] \[KEYNOTE DESIGN\] \[DIGITAL &amp; INTERACTIVE\]', '[BEHAVIOR ANALYSIS] [ENGAGEMENT] [SEGMENTATION] [PATTERNS]'
$content = $content -replace '\* MARKETING EXECUTION', '* PIPELINE INTELLIGENCE'
$content = $content -replace 'FROM BRAND TO PRODUCT MARKETING, WE PLUG INTO MARKETING TEAMS TO SHIP THE', 'ANALYZE THE SALES PIPELINE AND HIGHLIGHT BOTTLENECKS, STALLED DEALS, AND'
$content = $content -replace '  ASSETS THAT DRIVE AWARENESS, DEMAND AND CONVERSION\.', '  POTENTIAL REVENUE OPPORTUNITIES.'
$content = $content -replace '\[CAMPAIGN CONTENT\] \[GROWTH EXPERIMENTS\] \[SALES MATERIALS\]', '[DEALS] [RISK] [REVENUE] [PIPELINE HEALTH]'

# ── SELECTED_WORK IN MACHINE INDEX ──────────────────────────────
$content = $content -replace '── SELECTED_WORK ─────────────────────────────────────────────────', '── AI CAPABILITIES ─────────────────────────────────────────────────'
$content = $content -replace '- HALIDE LAUNCH — A REAL-TIME SUMMIT SITE WITH LIVE SCHEDULES, SPEAKER REVEALS AND A TICKET DROP BUILT FOR LAUNCH-DAY TRAFFIC\.', '- SALES FORECASTING — PREDICT FUTURE SALES USING HISTORICAL DATA, TRENDS, AND AI-POWERED ANALYSIS.'
$content = $content -replace '- LUMENARY — A STORY-DRIVEN LAUNCH SITE FOR A FIRST HARDWARE RELEASE THAT SOLD THROUGH IN A WEEKEND\.', '- OPPORTUNITY INTELLIGENCE — IDENTIFY AND PRIORITIZE OPPORTUNITIES WITH STRONGER CONVERSION POTENTIAL.'
$content = $content -replace '- KESTREL STUDIOS — A SEASONAL LOOKBOOK TURNED INTO A BROWSABLE, SHAREABLE WORLD\.', '- CUSTOMER INTELLIGENCE — UNDERSTAND CUSTOMER BEHAVIOR, PURCHASING PATTERNS, AND ENGAGEMENT.'
$content = $content -replace '- SHOP MOONRAKE — A CREATOR STOREFRONT THAT FEELS LIKE THE VIDEOS: FAST, LOUD, IMPOSSIBLE TO SCROLL PAST\.', '- PIPELINE INTELLIGENCE — ANALYZE PIPELINE HEALTH, IDENTIFY RISKS, AND FIND REVENUE OPPORTUNITIES.'

# ── LAB IN MACHINE INDEX ─────────────────────────────────────────
$content = $content -replace '── LAB ───────────────────────────────────────────────────────────', '── DEMO ───────────────────────────────────────────────────────────'
$content = $content -replace '- SUBLEVEL DEFENDER — PLAYABLE ON THE ARCADE CABINET IN THE 3D LOBBY \(CLICK IT\)\.', '- signin DEFENDER — PLAYABLE ON THE ARCADE CABINET IN THE 3D LOBBY (CLICK IT).'
$content = $content -replace '- SBLVL SHOT — DRAG-TO-THROW BASKETBALL ON THE LOBBY HOOP \(CLICK THE BACKBOARD\)\.', '- signin SHOT — DRAG-TO-THROW BASKETBALL ON THE LOBBY HOOP (CLICK THE BACKBOARD).'

# ── OPEN_POSITIONS IN MACHINE INDEX ─────────────────────────────
$content = $content -replace '── OPEN_POSITIONS ────────────────────────────────────────────────', '── TEAM ────────────────────────────────────────────────────────────'
$content = $content -replace '- VISUAL DESIGNER \(DESIGN, REMOTE / PORTO\)', '- SALES ANALYSTS'
$content = $content -replace '- CREATIVE DEVELOPER \(ENGINEERING, REMOTE\)', '- REVENUE OPERATIONS'

# ── CONTACT IN MACHINE INDEX ─────────────────────────────────────
$content = $content -replace 'GENERAL \.{10,} HELLO@SUBLEVEL\.STUDIO', 'GENERAL ....... HELLO@signin.ai'
$content = $content -replace 'NEW BUSINESS \.{10,} SALES@SUBLEVEL\.STUDIO', 'NEW BUSINESS .. SALES@signin.ai'
# '/AI/CONTACT' is fine as-is

# ── window.__sblvl debug API ─────────────────────────────────────
$content = $content -replace 'window\.__sblvl', 'window.__sigmameta'

# ── injectable so the sublevel ───────────────────────────────────
$content = $content -replace 'injectable so the sublevel', 'injectable so the signin'

# ── TV CAPTION ENTRIES (JS array) ────────────────────────────────
# These appear as TV screen content in the 3D lobby
$content = $content -replace "title: 'Kestrel Studios', kind: 'Website · Lookbook'", "title: 'Pipeline Intelligence', kind: 'AI · Pipeline'"

# Write output
Set-Content -Path $dst -Value $content -Encoding UTF8 -NoNewline

Write-Host "Done! Created signin-ai.html"
$fileSize = (Get-Item $dst).Length
Write-Host "File size: $([math]::Round($fileSize / 1MB, 2)) MB"
