/**
 * Site copy and links — edit this file to update your page.
 * See README.md for a section-by-section guide.
 */
window.SITE_CONTENT = {
  /** Path or URL to your headshot (square image works best; shown in a circle). */
  profileImage: "assets/profile.svg",

  /** Shown under the photo. */
  name: "Your Name",

  /**
   * Email shown as obfuscated text (bots). Change the display string and optional mailto.
   * Set emailMailto to "" to hide the mailto link wrapper.
   */
  email: {
    display: "yourname [AT] university [DOT] edu",
    mailto: "#",
  },

  /** Navbar-style links under the email; use "#" until you have real URLs. */
  socialLinks: [
    { label: "LinkedIn", href: "#" },
    { label: "GitHub", href: "#" },
    { label: "Twitter", href: "#" },
  ],

  /**
   * Bio paragraphs (HTML allowed for inline links). Replace with your story.
   */
  bioHtml: `
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Current role and <a href="#">affiliation link</a>.</p>
    <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Education and prior work with <a href="#">another lab</a> and collaborators.</p>
    <p>Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Research interests include lorem, ipsum, and dolor sit amet.</p>
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
      title: "Research Paper Title One",
      authors: [
        { name: "Author One" },
        { name: "Your Name", highlight: true },
        { name: "Author Three" },
      ],
      links: [
        { label: "Paper", href: "#" },
        { label: "Website", href: "#" },
        { label: "Code", href: "#" },
      ],
      noteHtml: "<p>This work was accepted at Example Conference 20XX. <a href=\"#\">Oral presentation</a>.</p>",
    },
    {
      title: "Research Paper Title Two",
      authors: [
        { name: "Author Alpha" },
        { name: "Author Beta" },
        { name: "Your Name", highlight: true },
      ],
      links: [
        { label: "Paper", href: "#" },
        { label: "Models", href: "#" },
        { label: "Colab", href: "#" },
      ],
      noteHtml: "<p>Featured in the annual <a href=\"#\">State of AI</a> report.</p>",
    },
    {
      title: "Research Paper Title Three",
      authors: [{ name: "Your Name", highlight: true }, { name: "Author Two" }],
      links: [{ label: "Paper", href: "#" }],
      noteHtml: "",
    },
  ],
};
