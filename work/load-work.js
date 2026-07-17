(function () {
  var grid = document.getElementById("story-grid");
  var pieces = window.DONOTPOSE_PIECES || [];

  if (!grid) return;

  grid.innerHTML = pieces
    .map(function (piece) {
      var href = "work/" + piece.slug + "/";
      var meta =
        piece.type + (piece.duration ? " · " + piece.duration : "");
      var summary = piece.summary
        ? '<p class="story__summary">' + piece.summary + "</p>"
        : "";
      var featuredClass = piece.featured ? " story--featured" : "";

      return (
        '<article class="story' +
        featuredClass +
        '">' +
        '<a class="story__image" href="' +
        href +
        '" aria-label="Read ' +
        piece.title +
        '">' +
        '<img src="' +
        piece.image +
        '" alt="' +
        piece.alt +
        '" />' +
        '<span class="story__number">' +
        piece.number +
        "</span>" +
        "</a>" +
        '<div class="story__meta">' +
        "<p>" +
        meta +
        "</p>" +
        "<h3><a href=\"" +
        href +
        '">' +
        piece.title +
        "</a></h3>" +
        summary +
        "</div>" +
        "</article>"
      );
    })
    .join("");
})();
