function createRange(node, chars, range) {
    if (!range) {
        range = document.createRange()
        range.selectNode(node);
        range.setStart(node, 0);
    }

    if (chars.count === 0) {
        range.setEnd(node, chars.count);
    } else if (node && chars.count > 0) {
        if (node.nodeType === Node.TEXT_NODE) {
            if (node.textContent.length < chars.count) {
                chars.count -= node.textContent.length;
            } else {
                range.setEnd(node, chars.count);
                chars.count = 0;
            }
        } else {
            for (let lp = 0; lp < node.childNodes.length; lp++) {
                range = createRange(node.childNodes[lp], chars, range);
                if (chars.count === 0) break;
            }
        }
    }

    return range;
}
function setCurrentCursorPosition(node, chars) {
    if (chars >= 0) {
        let selection = window.getSelection();
        let range = createRange(node, { count: chars });

        if (range) {
            range.collapse(false);
            selection.removeAllRanges();
            selection.addRange(range);
        }
    }
}
function isChildOf(node, parent) {
    while (node !== null) {
        if (node.id === parent.id) {
            return true;
        }
        node = node.parentNode;
    }
    return false;
}

function getCurrentCursorPosition(parent) {
    let selection = window.getSelection(),
        charCount = -1,
        node;

    if (selection.focusNode && isChildOf(selection.focusNode, parent)) {
        node = selection.focusNode;
        charCount = selection.focusOffset;
        while (node) {
            if (node.id === parent.id) {
                break;
            }

            if (node.previousSibling) {
                node = node.previousSibling;
                charCount += node.textContent.length;
            } else {
                node = node.parentNode;
                if (node === null) {
                    break
                }
            }
        }
    }

    return charCount;
}
function highlightOverlimit(field, html, limit, pos){
    let start = html.slice(0, limit);
    let overlimit = html.slice(limit);
    overlimit = `<span style="background:red; color:#ffffff">${overlimit}</span>`;
    field.innerHTML = start + overlimit;
    setCurrentCursorPosition(field, pos);
}

const calcCountChar = (field, limit, highlight= true)=>{
    const html = field.innerText;
    let count = limit - html.length;
    let percent = html.length * 100 / limit;
    if (highlight && html.length > limit) {
        highlightOverlimit(field, html, limit, getCurrentCursorPosition(field))
    }
    return {
        count: count,
        percent: percent<=100 ? percent : 100.1
    }
}
export default calcCountChar;