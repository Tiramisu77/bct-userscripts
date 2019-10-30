// ==UserScript==
// @name     Bitcointalk Sort By Merit
// @version  2.0
// @grant    none
// @include        https://bitcointalk.org/index.php?topic=*
// @run-at         document-end
// ==/UserScript==

(function() {
    const scriptName = "__sortByMerit__"

    if (document[scriptName]) {
        return
    }

    const sortBtn = document.createElement("a")
    sortBtn.href = "javascript:void(0)"
    sortBtn.textContent = "sort by merit"

    const threadButtons = document.querySelector("td.mirrortab_back")

    threadButtons.prepend(document.createTextNode(" | "))
    threadButtons.prepend(sortBtn)

    sortBtn.addEventListener("click", sortByMerit)

    function sortByMerit() {
        const table = document.querySelector("#bodyarea .bordercolor > tbody")
        const posts = [...table.rows]
            .map(post => {
                try {
                    const merit = [...post.querySelectorAll(".td_headerandpost .smalltext i > a")]
                        .map(e => {
                            return parseInt(e.nextSibling.textContent.match(/\((.*)\)/)[1])
                        })
                        .reduce((acc, e) => acc + e, 0)

                    return { merit, post }
                } catch (e) {
                    console.error(e)
                }
            })
            .sort(({ merit: merit1 }, { merit: merit2 }) => merit2 - merit1)

        posts.forEach(({ post }) => {
            try {
                table.append(post)
            } catch (e) {
                console.error(e)
            }
        })
    }

    document[scriptName] = true
})()
