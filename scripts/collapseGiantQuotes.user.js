// ==UserScript==
// @name     Bitcointalk Remove Giant Quotes
// @version  1.0
// @grant    none
// @include        https://bitcointalk.org/index.php?topic=*
// @run-at         document-end
// ==/UserScript==

;(function() {
    //maximum quote height in pixels
    const MAX_QUOTE_HEIGHT = window.innerHeight * 0.9

    const scriptName = "__removeGiantQuotes__"

    if (document[scriptName]) {
        return
    }

    for (const quote of document.querySelectorAll(".post > .quote")) {
        if (quote.scrollHeight > MAX_QUOTE_HEIGHT) {
            quote.hidden = true
            let btn = document.createElement("button")
            btn.textContent = "show oversized quote"
            btn.addEventListener("click", event => {
                quote.hidden = !quote.hidden
                btn.textContent = quote.style.display === "none" ? "show oversized quote" : "hide oversized quote"
                event.preventDefault()
            })
            quote.parentElement.insertBefore(btn, quote)
        }
    }

    document[scriptName] = true
})()
