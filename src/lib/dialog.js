import { getURLAndSearchParams, updateBrowserHistory } from "./helpers.js";

/**
 * Dialog Elements
 */
const dialogs = document.querySelectorAll("dialog");
const mobileMenuDialog = document.querySelector("[data-dialog='mobile-menu']");
const donateDialog = document.querySelector("[data-dialog='donate']");
const partnershipDialog = document.querySelector("[data-dialog='partnership']");
const promoDialog = document.querySelector("[data-dialog='promo-video']");
const youtubeDialogs = [
  ...document.querySelectorAll("[data-dialog='youtube-video']"),
];

/**
 * Button Elements
 */
const mobileMenuButton = document.querySelector("[data-open-mobile-menu]");
const donateButtons = [...document.querySelectorAll("[data-open-donate]")];
const partnershipButtons = [
  ...document.querySelectorAll("[data-open-partnership]"),
];
const promoVideoButton = document.querySelector("[data-open-promo]");
const youtubeVideoButtons = [
  ...document.querySelectorAll("[data-open-youtube]"),
];

/**
 * Helpers
 */

/**
 * Calculates the width of the browser's vertical scrollbar.
 *
 * @returns {number} The width of the scrollbar in pixels.
 */
function getScrollbarWidth() {
  return window.innerWidth - document.documentElement.clientWidth;
}

/**
 * Set vertical scrollbar width as custom property on html element
 */
function setScrollBarWidth() {
  const scrollbarWidth = getScrollbarWidth();

  document.documentElement.style.setProperty(
    "--scrollbar-width",
    scrollbarWidth + "px"
  );
}

/**
 * Close dialog
 */
dialogs.forEach((dialog) => {
  const closeButton = dialog.querySelector("button[data-close-dialog]");

  closeButton.addEventListener("click", () => {
    dialog.close();
  });

  // Close modal when click on overlay
  dialog.addEventListener("click", (event) => {
    if (event.target.nodeName === "DIALOG") {
      dialog.close();
    }
  });

  // Remove donate id from url params on dialog close
  dialog.addEventListener("close", () => {
    const { url, params } = getURLAndSearchParams();
    const param = dialog.getAttribute("data-dialog");

    // Remove dialog id as param from the url and set new url
    params.delete(param);
    url.search = params.toString();

    updateBrowserHistory(url);
  });
});

/**
 * Event Listeners
 */

document.addEventListener("DOMContentLoaded", setScrollBarWidth);

mobileMenuButton.addEventListener("click", () => {
  mobileMenuDialog.showModal();
});

donateButtons.forEach((button) => {
  button.addEventListener("click", () => {
    // Close mobile menu dialog if opened
    if (mobileMenuDialog.hasAttribute("open")) {
      mobileMenuDialog.close();
    }

    donateDialog.showModal();

    const { url, params } = getURLAndSearchParams();
    const param = donateDialog.getAttribute("data-dialog");
    const radioValue = donateDialog.querySelector(
      'input[type="radio"]:checked'
    ).value;

    // Set new param as dialog id and update url
    params.set(param, radioValue);
    url.search = params.toString();

    updateBrowserHistory(url);
  });
});

partnershipButtons.forEach((button) => {
  button.addEventListener("click", () => {
    partnershipDialog.showModal();

    const { url } = getURLAndSearchParams();
    const param = partnershipDialog.getAttribute("data-dialog");

    // Create new url with partnership param
    const modifiedUrl = `${url.origin}${url.pathname}?${param}`;

    updateBrowserHistory(modifiedUrl);
  });
});

promoVideoButton.addEventListener("click", () => {
  promoDialog.showModal();
});

youtubeVideoButtons.forEach((button, index) => {
  button.addEventListener("click", () => {
    youtubeDialogs[index].showModal();
  });
});
