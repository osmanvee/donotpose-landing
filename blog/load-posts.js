(function () {
  var list = document.getElementById("blog-list");
  var posts = window.DONOTPOSE_POSTS || [];

  if (!list) return;

  list.innerHTML = posts
    .map(function (post) {
      var href = "blog/" + post.slug + "/index.html";

      return (
        '<article class="blog-entry">' +
        '<a class="blog-entry__link" href="' +
        href +
        '">' +
        '<span class="blog-entry__date">' +
        post.date +
        "</span>" +
        '<span class="blog-entry__title">' +
        post.title +
        "</span>" +
        '<span class="blog-entry__excerpt">' +
        post.excerpt +
        "</span>" +
        "</a>" +
        "</article>"
      );
    })
    .join("");
})();
