// ==UserScript==
// @name     Display earned merit with remote API
// @version  2.0
// @grant    none
// @include        https://bitcointalk.org/index.php?topic=*
// @run-at         document-end
// ==/UserScript==

(function() {
    const scriptName = "__displayEmerit__"

    if (document[scriptName]) {
        return
    }

    const getMeritsFromApi = async function(ids) {
        return await fetch(`https://bct-quote-notifier.herokuapp.com/api/merit/v1/profiles/?ids=${ids.join(",")}`).then(
            r => r.json()
        )
    }

    const insertEmerit = function(meritNode, eMerit) {
        try {
            let eMeritNode = document.createElement("text")
            meritNode.after(eMeritNode)
            meritNode.after(document.createElement("br"))
            eMeritNode.textContent = `eMerit: ${eMerit}`
        } catch (e) {
            console.error(e)
        }
    }

    let main = async function() {
        if (document.eMeritShown) return
        document.eMeritShown = true
        let posters = new Map([])
        for (const node of document.querySelectorAll(".poster_info > .smalltext")) {
            try {
                const meritNode = [...node.childNodes].find(e => e.textContent.match(/Merit/))

                const userId = [...node.childNodes]
                    .find(e => e.href && e.href.match(/action=profile;u=/))
                    .href.split(";u=")[1]

                if (meritNode && userId) {
                    let poster = posters.get(userId)
                    if (poster) {
                        poster.meritNodes.push(meritNode)
                    } else {
                        posters.set(userId, { meritNodes: [meritNode] })
                    }
                }
            } catch (e) {
                console.error(e)
            }
        }

        let earnedMerits = await getMeritsFromApi([...posters].map(poster => poster[0]))

        earnedMerits
            .filter(e => e !== null)
            .forEach(e => {
                let poster = posters.get(e.id.toString())
                if (poster) {
                    poster.earned = e.earned
                }
            })

        for (let [, poster] of posters) {
            try {
                poster.meritNodes.forEach(node => {
                    insertEmerit(node, poster.earned || 0)
                })
            } catch (e) {
                console.error(e)
            }
        }
    }

    main()

    document[scriptName] = true
})()
