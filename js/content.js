/**
 * Site copy and links — edit this file to update your page.
 * See README.md for a section-by-section guide.
 */
window.SITE_CONTENT = {
  /** Path or URL to your headshot (square image works best; shown in a circle). */
  profileImage: "assets/Profile_Picture.jpg",

  /** Shown under the photo. */
  name: "Alex Cuellar",

  /**
   * Email shown as obfuscated text (bots). Change the display string and optional mailto.
   * Set emailMailto to "" to hide the mailto link wrapper.
   */
  email: {
    display: "alexcuel [AT] mit [DOT] edu",
    mailto: "alexcuel@mit.edu",
  },

  /** Navbar-style links under the email; use "#" until you have real URLs. */
  socialLinks: [
    { label: "Google Scholar", href: "https://scholar.google.com/citations?user=L1XFuz0AAAAJ&hl=en" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/alex-cuellar-9b917a139" },
    { label: "GitHub", href: "https://github.com/AlexCuellar" },
  ],

  /**
   * Bio paragraphs (HTML allowed for inline links). Replace with your story.
   */
  bioHtml: `
    <p>I am a PhD candidate at MIT's <a href="https://interactive.mit.edu/">Interactive Robotics Group</a> advised by Julie Shah. My research focuses on enabling robots to act and react efficiently to humans in close-proximity interaction. I explore methods that leverage multiple cycles of an interaction to personalize robot plans according to individuals' tendencies, abilities, and preferences.</p>
    <p>I completed my Master's of Engineering with the MIT EECS department under Prof. Julie Shah (2022) and competed my BS with the MIT EECS department (2021). Outside of research, I enjoy hiking, cooking, and acting with local theater groups.</p>
  `,

  /** Small credit under the sidebar; HTML allowed. */
  footerHtml:
    'Template layout for a minimal academic page. Replace this line in <code>js/content.js</code>.',

  /**
   * Publications list. For each item:
   * - title: paper title
   * - authors: array of { name, highlight?: true } — highlighted names render in italics
   * - links: resource row (Paper, Code, etc.)
   * - noteHtml: optional venue / award line (HTML)
   */
  publications: [
    {
      title: "Multi-Cycle Spatio-Temporal Adaptation in Human-Robot Teaming",
      authors: [
        { name: "Alex Cuellar", highlight: true },
        { name: "Michael Hagenow"},
        { name: "Julie Shah"}
      ],
      links: [
        { label: "Paper", href: "https://arxiv.org/pdf/2604.19670" },
        { label: "Code", href: "https://github.com/AlexCuellar/RAPIDDS" },
      ],
      noteHtml: "<p>This work has been submitted to RA-L.",
    },
    {
      title: "Exploring Roles for Radiation Safety Robots in Medical Facilities",
      authors: [
        { name: "Claire Liang"},
        { name: "Alex Cuellar", highlight: true },
        { name: "Naomi Schurr" },
        { name: "Julie Shah"}
      ],
      links: [
        { label: "Paper", href: "https://healthrobotsworkshop.github.io/assets/pdf/papers/6_Liang_paper.pdf" },
      ],
      noteHtml: "<p>This work was presented at the 2026 HRI Robots for Care Workshop.",
    },
    {
      title: "An Alignment-Based Approach to Learning Motions From Demonstrations",
      authors: [
        { name: "Alex Cuellar", highlight: true },
        { name: "Christopher Fourie"},
        { name: "Julie Shah" },
      ],
      links: [
        { label: "Paper", href: "https://arxiv.org/abs/2511.14988" },
        { label: "Code", href: "https://github.com/AlexCuellar/CALM" },
      ],
      noteHtml: "<p>This work was accepted for publication in the September 2025 edition of RA-L and will be presented at ICRA26.",
    },
    {
      title: "Inference of Human-derived Specifications of Object Placement via Demonstration",
      authors: [
        { name: "Alex Cuellar", highlight: true },
        { name: "Hosea Siu" },
        { name: "Julie Shah"},
      ],
      links: [
        { label: "Paper", href: "https://www.ijcai.org/proceedings/2025/0460.pdf" },
        { label: "Code", href: "https://github.com/AlexCuellar/PARCC" },
      ],
      noteHtml: "<p>This paper was presented at IJCAI25 and the IJCAI 2025 Workshop on User-Aligned Assessment of Adaptive AI Systems.</p>",
    },
    {
      title: "Automation from the Worker's Perspective",
      authors: [{ name: "Ben Armstrong"}, 
                { name: "Valerie K Chen" },
                { name: "Alex Cuellar", highlight: true },
                {name: "Alexandra Forsey-Smerek"},
                {name: "Julie A Shah"},
              ],
                
      links: [{ label: "Paper", href: "https://arxiv.org/pdf/2409.20387" }],
      noteHtml: "A whitepaper discussing the design and results of a survey of 5000 workers' perspective on automation.",
    },
    {
      title: "Fair contextual multi-armed bandits: Theory and experiments",
      authors: [{name: "*Yifang Chen"}, 
                {name: "Alex Cuellar", highlight: true },
                {name: "Haipeng Luo"},
                {name: "Jignesh Modi"},
                {name: "Heramb Nemlekar"},
                {name: "Stefanos Nikolaidis"},
              ],
                
      links: [{ label: "Paper", href: "https://proceedings.mlr.press/v124/chen20a/chen20a.pdf" },
              { label: "User Study Dataset", href: "https://github.com/icaros-usc/fairCB-dataset"}
      ],
      noteHtml: "<p>This work was presented at UAI 2020, and as an <a href='https://ifaamas.org/Proceedings/aamas2020/pdfs/p1810.pdf'>extended abstract</a> at AAMAS 2020. \n *All authors listed alphabetically.</p>",
    },
  ],

  /**
   * Awards — same visual pattern as Education: title, optional subtitle line (bold+italic), then bullets.
   * Use [] to hide the Awards block.
   */
  service: [
    {
      items: [
        "Served as Workflow Chair for <a href='https://aaai.org/conference/aaai/aaai-25/conference-organizers/'>AAAI 2025</a>.",
      ],
    },
  ],

  /**
   * Service — grouped like “Organizing and Service”: each object has category (bold subheading) and items.
   * Each item string may include HTML for links (same trust model as bioHtml). Use [] to hide the section.
   */
  awards: [
    {
      title: "MIT AeroAstro Distinguished Scholar Program",
      details: [
        '5 years guaranteed funding for PhD studies and discretionary funding for travel and materials (2022-2027 academic years).',
      ],
    },
    {
      title: "MIT Lemelson Fellowship",
      details: [
        'One year of guaranteed funding for PhD studies (2022-2023 academic year).',
      ],
    },
  ],

  /**
   * Education — institution name, degree line (shown bold+italic), optional detail bullets (plain text).
   * Use [] to hide the section.
   */
  education: [
    {
      institution: "Massachusetts Institute of Technology",
      degreeLine: "Ph.D. — Electrical Engineering & Computer Science (2022 – Present)",
      details: ["Interactive Robotics Group, advised by Julie Shah"],
    },
    {
      institution: "Massachusetts Institute of Technology",
      degreeLine: "M.Eng. — Electrical Engineering & Computer Science (2022)",
      details: ["MIT EECS, advised by Julie Shah"],
    },
    {
      institution: "Massachusetts Institute of Technology",
      degreeLine: "S.B. — Electrical Engineering & Computer Science (2021)",
      details: [],
    },
  ],
};
