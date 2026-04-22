(function () {
  function escapeHtml(s) {
    var d = document.createElement("div");
    d.textContent = s;
    return d.innerHTML;
  }

  function renderAuthors(parts) {
    return parts
      .map(function (a) {
        var n = escapeHtml(a.name);
        return a.highlight ? "<em>" + n + "</em>" : n;
      })
      .join(", ");
  }

  function renderCvEntry(entry) {
    var parts =
      '<div class="cv-entry">' +
      '<h3 class="cv-heading">' +
      escapeHtml(entry.heading) +
      "</h3>";
    if (entry.emphasisLine) {
      parts +=
        '<p class="cv-emphasis"><strong><em>' +
        escapeHtml(entry.emphasisLine) +
        "</em></strong></p>";
    }
    if (entry.details && entry.details.length) {
      parts +=
        '<ul class="cv-bullets">' +
        entry.details
          .map(function (d) {
            return "<li>" + escapeHtml(d) + "</li>";
          })
          .join("") +
        "</ul>";
    }
    parts += "</div>";
    return parts;
  }

  function renderServiceCategory(cat) {
    var items = (cat.items || [])
      .map(function (it) {
        var html = typeof it === "string" ? it : it.html;
        return "<li>" + html + "</li>";
      })
      .join("");
    return (
      '<div class="service-category">' +
      '<h3 class="service-category-title">' +
      escapeHtml(cat.category) +
      "</h3>" +
      (items ? '<ul class="cv-bullets service-items">' + items + "</ul>" : "") +
      "</div>"
    );
  }

  function renderPublication(pub) {
    var linksHtml = pub.links
      .map(function (l, i) {
        var inner = '<a href="' + escapeHtml(l.href) + '">' + escapeHtml(l.label) + "</a>";
        if (i === 0) return inner;
        return '<span class="sep">|</span>' + inner;
      })
      .join("");

    var note = pub.noteHtml
      ? '<div class="pub-note">' + pub.noteHtml + "</div>"
      : "";

    return (
      '<article class="publication">' +
      '<h3 class="pub-title">' +
      escapeHtml(pub.title) +
      "</h3>" +
      '<p class="pub-authors">' +
      renderAuthors(pub.authors) +
      "</p>" +
      '<p class="pub-links">' +
      linksHtml +
      "</p>" +
      note +
      "</article>"
    );
  }

  document.addEventListener("DOMContentLoaded", function () {
    var c = window.SITE_CONTENT;
    if (!c) return;

    if (c.name) document.title = c.name;

    var img = document.getElementById("profile-img");
    if (img) {
      img.src = c.profileImage;
      img.alt = c.name ? "Photo of " + c.name : "";
    }

    var nameEl = document.getElementById("site-name");
    if (nameEl) nameEl.textContent = c.name;

    var emailLine = document.getElementById("email-line");
    if (emailLine && c.email) {
      var display = escapeHtml(c.email.display);
      var mailto = c.email.mailto;
      if (mailto) {
        emailLine.innerHTML = '<a href="' + escapeHtml(mailto) + '">' + display + "</a>";
      } else {
        emailLine.textContent = c.email.display;
      }
    }

    var socialLine = document.getElementById("social-line");
    if (socialLine && c.socialLinks && c.socialLinks.length) {
      socialLine.innerHTML = c.socialLinks
        .map(function (l, i) {
          var link =
            '<a href="' + escapeHtml(l.href) + '">' + escapeHtml(l.label) + "</a>";
          if (i === 0) return link;
          return '<span class="sep">|</span>' + link;
        })
        .join("");
    }

    var bio = document.getElementById("bio");
    if (bio && c.bioHtml) bio.innerHTML = c.bioHtml.trim();

    var foot = document.getElementById("sidebar-footer");
    if (foot && c.footerHtml) foot.innerHTML = c.footerHtml;

    var list = document.getElementById("publications");
    if (list && c.publications) {
      list.innerHTML = c.publications.map(renderPublication).join("");
    }

    function sectionHasContent(arr) {
      return Array.isArray(arr) && arr.length > 0;
    }

    function setCvBlock(blockId, innerId, visible, html) {
      var block = document.getElementById(blockId);
      var inner = document.getElementById(innerId);
      if (!block) return;
      if (visible) {
        block.hidden = false;
        if (inner) inner.innerHTML = html;
      } else {
        block.hidden = true;
        if (inner) inner.innerHTML = "";
      }
    }

    var awards = c.awards;
    setCvBlock(
      "block-awards",
      "awards",
      sectionHasContent(awards),
      sectionHasContent(awards)
        ? awards
            .map(function (a) {
              return renderCvEntry({
                heading: a.title,
                emphasisLine: a.subtitle || "",
                details: a.details || [],
              });
            })
            .join("")
        : ""
    );

    var service = c.service;
    setCvBlock(
      "block-service",
      "service",
      sectionHasContent(service),
      sectionHasContent(service) ? service.map(renderServiceCategory).join("") : ""
    );

    var education = c.education;
    setCvBlock(
      "block-education",
      "education",
      sectionHasContent(education),
      sectionHasContent(education)
        ? education
            .map(function (e) {
              return renderCvEntry({
                heading: e.institution,
                emphasisLine: e.degreeLine || "",
                details: e.details || [],
              });
            })
            .join("")
        : ""
    );
  });
})();
