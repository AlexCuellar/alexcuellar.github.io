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
  });
})();
