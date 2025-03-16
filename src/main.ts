import { bangs_filtered } from "../data/bangs_filtered";
import "./style.css";

function renderHomePage() {
  document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
<h1>Quick Search<h1>
<h2>About</h2>
<ul>
    <li>Quick Search lets you define which search engine to use for each of your searches using bangs.</li>
    <li>The concept of bangs is inspired from DuckDuckGo. This tool is much faster than DuckDuckGo because all logic runs locally.</li>
    <li>Default bang is !g for Google.</li>
    <li>List of bangs: <a href="https://duckduckgo.com/bangs" target="_blank" rel="noopener noreferrer">DuckDuckGo's Bangs</a>.</li>
</ul>
<h2>Usage</h2>
<ol>
    <li>Add <i>https://search.arnavbharti.com/?s=%s</i> as your default search engine.</li>
    <li>Enter your search query in the search bar with your desired bang.</li>
</ol>
<button type="button" id="copyButton">Copy Quick Search's URL</button>
<p>
<a href="https://support.mozilla.org/en-US/kb/add-or-remove-search-engine-firefox">How to add a custom search engine in Firefox-based browsers.</a><br>
<a href="https://support.google.com/chrome/answer/95426">How to add a custom search engine in Chromium-based browsers.</a>
</p>
<footer>
    <a href="https://github.com/arnavbharti">Quick Search's GitHub</a> • <a href="https://arnavbharti.com">Arnav's Home Page</a>
</footer>
`;

  document.getElementById("copyButton")!.addEventListener("click", () => {
    navigator.clipboard
      .writeText("https://search.arnavbharti.com/?s=%s")
      .then(() => {
        alert("URL copied to clipboard!");
      })
      .catch(() => {
        alert("Failed to copy URL to clipboard.");
      });
  });
}

const query = new URLSearchParams(window.location.search).get("s");
if (query) {
  // Default to Google if no bang is provided.
  // Consider only the first matched bang.
  const bangMatch = query.match(/!\w+/);
  const bang = bangMatch ? bangMatch[0] : "!g";
  const queryWithoutBang = query.replace(bang, "").trim();
  const bangWithoutExclamation = bang.slice(1);
  const bang_data = bangs_filtered.find((b) => b.t === bangWithoutExclamation);
  window.location.href = bang_data!.u.replace(
    "{{{s}}}",
    encodeURIComponent(queryWithoutBang)
  );
} else {
  renderHomePage();
}
