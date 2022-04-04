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

waitForKeyElements(".CommentComposer-uploadAttachmentsButton", addButton);

function addButton(buttons) {
    var before_button = buttons[0];
    let button = document.createElement("button");
    button.innerHTML = "Report";
    button.onclick = addComment;
    before_button.after(button);
}

function addComment() {
    var text_area = document.querySelector(".ProseMirror-focused");
    clearArea(text_area);
    pasteComment(text_area);
}

function clearArea(text_area) {
    while (text_area.firstChild) {
        text_area.removeChild(text_area.firstChild);
    }
}

function pasteComment(text_area) {
    appendParagraph(text_area, "PR:", true);
    appendParagraph(text_area, "");
    appendParagraph(text_area, "Что было сделано:", true);
    appendParagraph(text_area, "");
    appendParagraph(text_area, "Что могло быть задето:", true);
    appendParagraph(text_area, "Вроде ничего");
    appendParagraph(text_area, "Где удалось проверить:", true);
    appendParagraph(text_area, "Dev-окружение, тесты");
}

function appendParagraph(parent, text, bold = false) {
    let para = document.createElement("p");
    let node = document.createTextNode(text);
    if (bold) {
        let strong = document.createElement("strong");
        para.appendChild(strong);
        strong.appendChild(node);
    } else {
        para.appendChild(node);
    }
    parent.appendChild(para);
}