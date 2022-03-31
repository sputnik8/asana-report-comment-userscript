// ==UserScript==
// @name         Asana report comment template
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Added comment to task
// @author       Dmitrii Salnikov
// @match        https://app.asana.com/0/*
// @icon         https://www.google.com/s2/favicons?domain=app.asana.com
// @grant        none
// @require      http://ajax.googleapis.com/ajax/libs/jquery/2.1.0/jquery.min.js
// @require      https://gist.github.com/raw/2625891/waitForKeyElements.js
// ==/UserScript==

waitForKeyElements("[aria-label='Edit comment']", addComment);

function addComment(text_areas) {
    var text_area = text_areas[0];
    //if (text_area.firstChild.innerText === "\n") {
        clearArea(text_area);
        pasteComment(text_area);
    //}
}

function clearArea(text_area) {
    while (text_area.firstChild) {
        text_area.removeChild(text_area.firstChild);
    }
}

function pasteComment(text_area) {
    appendParagraph(text_area, "PR:");
    appendParagraph(text_area, "");
    appendParagraph(text_area, "Что было сделано:");
    appendParagraph(text_area, "");
    appendParagraph(text_area, "Что могло быть задето:");
    appendParagraph(text_area, "Вроде ничего");
    appendParagraph(text_area, "Где удалось проверить:");
    appendParagraph(text_area, "Dev-окружение, тесты");
}

function appendParagraph(parent, text) {
    const para = document.createElement("p");
    const node = document.createTextNode(text);
    para.appendChild(node);
    parent.appendChild(para);
}