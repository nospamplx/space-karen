(() => {
    const regExFull = new RegExp("elon(.*)musk", "ig");
    const regExFirstName = new RegExp("elon", "ig");
    const regExLastName = new RegExp("musk", "ig");
    const INACCURACIES_ELON_QUERY = '//text()[contains(translate(., "ELON", "elon"), "elon")]';
    const INACCURACIES_MUSK_QUERY = '//text()[contains(translate(., "MUSK", "musk"), "musk")]';
    const REAL_NAME = "Space Karen"

    const apply_corrections = () => {
        const correct = (t) => t.replace(regExFull, REAL_NAME).replace(regExFirstName, REAL_NAME).replace(regExLastName, REAL_NAME);
        const collect = (i) => {let c = []; let item; while (item = i.iterateNext()) {c.push(item.parentElement);} return c;}
        [INACCURACIES_ELON_QUERY, INACCURACIES_MUSK_QUERY].forEach((query) => {
            let inaccuracies = document.evaluate(query, document, null, XPathResult.ANY_TYPE, null);
            collect(inaccuracies).forEach((p) => p.textContent = correct(p.textContent));
        })
    }

    const m = new MutationObserver(apply_corrections);
    m.observe(window.document, {childList: true, subtree: true});
})();