import DOMPurify from 'dompurify';

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
export function setCurrentCursorPosition(node, chars) {
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

export function getCurrentCursorPosition(parent) {
    let selection = window.getSelection(),
        charCount = -1,
        node;

    if (selection.focusNode && isChildOf(selection.focusNode, parent)) {
        node = selection.focusNode;
        charCount = selection.focusOffset;
        while (node) {
            if (node === parent) {
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

export function highlightOverlimit(field, string, excess){
    let pos = getCurrentCursorPosition(field);
    let overLimit = Math.abs(excess);
    let limit = string.length - overLimit;
    let newString = `${string.slice(0, limit)}<span style="background:red; color:#ffffff">${string.slice(limit)}</span>`;
    field.innerHTML = newString;
    setCurrentCursorPosition(field, pos);
    return newString;
}

const calcCountChar = (html, limit)=>{
    let cleanText = DOMPurify.sanitize(html,{ USE_PROFILES: { html: false } });
    let percent = cleanText.length * 100 / limit;
    return {
        count: limit - cleanText.length,
        percent: percent<=100 ? percent : 100.1
    }
}
export default calcCountChar;