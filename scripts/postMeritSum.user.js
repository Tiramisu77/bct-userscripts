// ==UserScript==
// @name     Bitcointalk Post Merit Sum
// @version  2.0
// @grant    none
// @include        https://bitcointalk.org/index.php?topic=*
// @run-at         document-end
// ==/UserScript==

(function() {
    const scriptName = "__postMeritSum__"

    if (document[scriptName]) {
        return
    }

    [...document.querySelectorAll(".td_headerandpost")].forEach(post => {
        try {
            let sum = [...post.querySelectorAll(".smalltext i > a")]
                .map(e => {
                    return parseInt(e.nextSibling.textContent.match(/\((.*)\)/)[1])
                })
                .reduce((acc, e) => acc + e, 0)
            if (sum > 0) {
                let sumElement = document.createElement("span")
                sumElement.textContent = `Total merit: ${sum} | `
                post.querySelector(".smalltext i").prepend(sumElement)
            }
        } catch (e) {
            console.error(e)
        }
    })

    document[scriptName] = true
})()
