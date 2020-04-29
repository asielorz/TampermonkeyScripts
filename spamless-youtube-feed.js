// ==UserScript==
// @name         Spamless youtube feed
// @namespace    asielorz
// @version      0.1
// @description  Remove short videos from youtube main page
// @author       asielorz
// @match        https://www.youtube.com/
// @grant        none
// ==/UserScript==

(async function() {
    'use strict';

    const current_date = new Date();
    if (current_date.getHours() > 20 || current_date.getHours() < 2)
    {
        return;
    }

    const sleep = async (ms) =>
    {
        return new Promise(resolve => setTimeout(resolve, ms));
    };

    while (true)
    {
        for (const elem of document.querySelectorAll("div#contents div#content"))
        {
            let duration = elem.outerText.split('\n')[0].split(':');
            if (duration.length == 3)
            {
                continue;
            }

            let minutes = parseInt(elem.outerText.split('\n')[0].split(':')[0])
            if (minutes === NaN || minutes < 30)
            {
                elem.remove();
            }
        }
        await sleep(1000);
    }
})();