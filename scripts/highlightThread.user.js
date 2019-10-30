// ==UserScript==
// @name     Bitcointalk Highlight Threads
// @version  2.0
// @grant    none
// @include        https://bitcointalk.org/index.php?board=*
// @run-at         document-end
// ==/UserScript==
(function() {
    // fill this array with keywords that you want to highlight

    /*
    key - bitcointalk board number, e.g. 1.0
    value = array of keyword strings, e.g. ["foo","bar"]
    example:
    const keywordMap = {
        "1.0": ["foo", "bar"],
    }
    */
    const keywordMap = {}

    const scriptName = "__highlightThread__"

    if (document[scriptName]) {
        return
    }

    const currentBoard = new URL(window.location).searchParams.getAll("board")

    if (!keywordMap[currentBoard]) {
        return
    }

    let keywords = keywordMap[currentBoard]

    let pattern = new RegExp(keywords.join("|"), "i")

    ;[...document.querySelectorAll("td:nth-child(3) span > a")].forEach(title => {
        let match = title.textContent.match(pattern)

        if (match) {
            title.style.color = "red"
            title.style["font-weight"] = 1000
        }
    })

    document[scriptName] = true
})()
