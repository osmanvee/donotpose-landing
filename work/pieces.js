/**
 * DoNotPose work catalog
 * Add a new object to this array to publish a piece.
 * Remove an object to take it off the homepage.
 * Order here = order on the page (newest / featured first).
 *
 * Fields:
 *   number     — shown as "1. Xavier"
 *   name       — artist / subject name
 *   date       — shown above the title
 *   profession — line under the title
 *   slug       — folder name under work/
 *   image      — path from the site root
 *   latest     — optional; shows "Latest" on the thumbnail
 */
window.DONOTPOSE_PIECES = [
  {
    slug: "brett",
    number: "4",
    name: "Brett",
    date: "October 15 2026",
    profession: "Furniture Designer",
    image: "work/brett/assets/brett-thumbnail-opt.png",
    alt: "Brett Paulin",
    latest: true,
  },
  {
    slug: "victor",
    number: "3",
    name: "Victor",
    date: "August 29 2026",
    profession: "Film-only photographer",
    image: "work/victor/assets/victor-mora-thumbnail-opt.jpg",
    alt: "Victor",
  },
  {
    slug: "bernie",
    number: "2",
    name: "Bernie",
    date: "August 18 2026",
    profession: "Gardener, landscape artist, musician, filmmaker",
    image: "work/bernie/assets/bernie-thumb-opt.jpg",
    alt: "Bernie",
  },
  {
    slug: "xavier",
    number: "1",
    name: "Xavier",
    date: "August 6 2026",
    profession: "Motion Photographer",
    image: "work/xavier/assets/xavier-thumbnail-opt.jpg",
    alt: "Xavier",
  },
];
