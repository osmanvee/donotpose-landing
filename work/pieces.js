/**
 * DoNotPose work catalog
 * Add a new object to this array to publish a piece.
 * Remove an object to take it off the homepage.
 * Order here = order on the page.
 *
 * Fields:
 *   number     — shown as "1. Xavier"
 *   name       — artist / subject name
 *   date       — shown above the title
 *   profession — line under the title
 *   slug       — folder name under work/
 *   image      — path from the site root
 */
window.DONOTPOSE_PIECES = [
  {
    slug: "xavier",
    number: "1",
    name: "Xavier",
    date: "August 6 2026",
    profession: "Motion Photographer",
    image: "work/xavier/assets/xavier-thumbnail.png",
    alt: "Xavier",
  },
  {
    slug: "bernie",
    number: "2",
    name: "Bernie",
    date: "August 18 2026",
    profession: "Gardener, landscape artist, musician, filmmaker",
    image: "work/bernie/assets/bernie-thumb.png",
    alt: "Bernie",
  },
];
