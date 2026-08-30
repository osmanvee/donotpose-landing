/**
 * DoNotPose analytics config
 *
 * Setup:
 * 1. Copy analytics/setup.gs into Apps Script (bound to your Google Sheet)
 * 2. Deploy → New deployment → Web app
 *    - Execute as: Me
 *    - Who has access: Anyone
 * 3. Paste the Web App URL below
 * 4. First time only: open the URL in Chrome → Advanced → "Go to … (unsafe)"
 *    (This is YOUR script on YOUR sheet — safe for you to approve once.)
 * 5. Set dashboardKey to a private string (matches setup.gs DASHBOARD_KEY)
 */
window.DONOTPOSE_ANALYTICS = {
  endpoint: "https://script.google.com/macros/s/AKfycbxf-oJaBmgMv-mgfdd23GRBZS7ihHYUuhSEXpFDFdji5MC__tj9hwzvU2dfHU7GFiV2Iw/exec",
  dashboardKey: "donotpose",
};
