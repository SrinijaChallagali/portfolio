// Plays the hero terminal line by line once, then leaves it on screen.
(function () {
  var term = document.getElementById("term");
  var year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();
  if (!term) return;

  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce) return; // everything is already visible

  document.documentElement.classList.add("js");
  var lines = Array.prototype.slice.call(term.querySelectorAll(".t-line, .t-out"));

  function typeCommand(el, done) {
    // Commands are typed character by character; the "$ " prompt appears at once
    var prompt = el.querySelector(".t-prompt");
    var cursor = el.querySelector(".cursor");
    var text = el.textContent.replace(/^\$\s?/, "");
    el.textContent = "";
    if (prompt) { el.appendChild(prompt); el.appendChild(document.createTextNode(" ")); }
    el.classList.add("shown");
    if (cursor) { el.appendChild(cursor); return done(); }
    var node = document.createTextNode("");
    el.appendChild(node);
    var i = 0;
    (function tick() {
      node.data = text.slice(0, ++i);
      if (i < text.length) setTimeout(tick, 38);
      else setTimeout(done, 260);
    })();
  }

  var idx = 0;
  function next() {
    if (idx >= lines.length) return;
    var el = lines[idx++];
    if (el.classList.contains("t-line")) typeCommand(el, next);
    else { el.classList.add("shown"); setTimeout(next, 140); }
  }
  setTimeout(next, 450);
})();
