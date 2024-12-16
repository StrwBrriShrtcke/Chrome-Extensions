const article = document.querySelector("article");

if (article) {
  const text = article.textContent;

  // `document.querySelector` may return null if the selector doesn't match anything.

  const wordMatchRegExp = /[^\s]+/g; //regular expression
  const words = text.matchAll(wordMatchRegExp);
  //matchAll returns an iterator, convert to array to get word count
  const wordCount = [...words].length;
  const readingTime = Math.round(wordCount / 200);
  const badge = document.createElement("p");
  //Use the same styling as the publish information in an article's header
  //badge.classList.add("color-secondary-text", "type--caption");
  badge.textContent = `⏱️  ${readingTime} min read`;

  //support for API reference docs
  const heading = article.querySelector("h1");
  //support for article docs with date
  const date = article.querySelector("time")?.parentNode;

  (date ?? heading).insertAdjacentElement("afterend", badge);
}
