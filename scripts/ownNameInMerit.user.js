// ==UserScript==
// @name     Bitcointalk Highlight My Name in Merit
// @version  2.0
// @grant    none
// @include        https://bitcointalk.org/index.php?topic=*
// @run-at         document-end
// ==/UserScript==

(function() {
    const scriptName = "__ownNameInMerit__"

    if (document[scriptName]) {
        return
    }

    document.querySelectorAll(".td_headerandpost").forEach(post => {
        let myName = document.querySelector("#hellomember b").textContent
        let allMerits = [...post.querySelectorAll(".smalltext i > a")]
        let myMerit = allMerits.find(e => e.textContent === myName)
        if (myMerit) {
            myMerit.style["font-weight"] = 1000
            if (allMerits.indexOf(myMerit) !== 0) {
                let myScore = myMerit.nextSibling
                post.querySelector(".smalltext i").removeChild(myMerit)
                post.querySelector(".smalltext i").removeChild(myScore)
                allMerits[0].before(myScore)
                myScore.before(myMerit)
            }
        }
    })

    document[scriptName] = true
})()
