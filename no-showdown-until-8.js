// ==UserScript==
// @name         No showdown until 8
// @namespace    asielorz
// @version      0.1
// @description  Block some pages before 20:00
// @author       asielorz
// @match        https://play.pokemonshowdown.com/*
// @match        https://store.steampowered.com/*
// @match        https://www.humblebundle.com/*
// @match        https://twitter.com/*
// @match        https://*.reddit.com/*
// @match        https://xkcd.com/
// @match        https://dilbert.com/*
// @match        https://www.smbc-comics.com/
// @match        http://minesweeperonline.com/*
// @grant        none
// ==/UserScript==

(async function() {
    'use strict';

    const current_date = new Date();
    if (current_date.getHours() < 20 && current_date.getHours() > 2)
    {
        const sleep = async (ms) =>
        {
            return new Promise(resolve => setTimeout(resolve, ms));
        };

        document.querySelectorAll("body")[0].remove();
        await sleep(10);
        alert("You cannot use this page until 20:00");
    }
})();