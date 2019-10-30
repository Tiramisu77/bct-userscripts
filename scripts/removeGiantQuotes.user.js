// ==UserScript==
// @name     Bitcointalk Remove Giant Quotes
// @version  1.0
// @grant    none
// @include        https://bitcointalk.org/index.php?topic=*
// @run-at         document-end
// ==/UserScript==

(function() {
    //maximum quote height in pixels
    const MAX_QUOTE_HEIGHT = 1200

    const scriptName = "__removeGiantQuotes__"

    if (document[scriptName]) {
        return
    }

    document.querySelectorAll(".post > .quote").forEach(quote => {
        if (quote.offsetHeight > MAX_QUOTE_HEIGHT) {
            quote.style.display = "none"
            let btn = document.createElement("button")
            btn.textContent = "show oversized quote"
            btn.addEventListener("click", event => {
                quote.style.display = quote.style.display === "none" ? "block" : "none"
                btn.textContent = quote.style.display === "none" ? "show oversized quote" : "hide oversized quote"
                event.preventDefault()
            })
            quote.parentElement.insertBefore(btn, quote)
        }
    })

    document[scriptName] = true
})()
