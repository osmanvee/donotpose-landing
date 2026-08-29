(function () {
  var grid = document.getElementById("story-grid");
  var pieces = window.DONOTPOSE_PIECES || [];

  if (!grid) return;

  grid.innerHTML = pieces
    .map(function (piece) {
      var href = "work/" + piece.slug + "/index.html";
      var title = piece.number + ". " + piece.name;

      return (
        '<article class="story">' +
        '<a class="story__link" href="' +
        href +
        '" aria-label="' +
        title +
        '">' +
        '<span class="story__image">' +
        '<img src="' +
        piece.image +
        '" alt="' +
        (piece.alt || piece.name) +
        '" loading="lazy" decoding="async" />' +
        "</span>" +
        '<span class="story__meta">' +
        (piece.date
          ? '<span class="story__date">' + piece.date + "</span>"
          : "") +
        '<span class="story__title">' +
        title +
        "</span>" +
        '<span class="story__profession">' +
        piece.profession +
        "</span>" +
        "</span>" +
        "</a>" +
        "</article>"
      );
    })
    .join("");
})();
