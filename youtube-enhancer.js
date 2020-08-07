// ==UserScript==
// @name         Youtube enhancer
// @namespace    asielorz
// @version      0.1
// @description  Remove short videos from youtube main page
// @author       asielorz
// @match        https://www.youtube.com/*
// @grant        none
// ==/UserScript==

function spamless_feed()
{
    const current_date = new Date();
    if (current_date.getHours() < 20 && current_date.getHours() > 2)
    {
        let something_removed = false;

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
                something_removed = true;
            }
        }

        if (something_removed)
        {
            return 100;
        }
        else
        {
            return 1000;
        }
    }
    else
    {
        return 1000;
    }
};

function immersive_watch()
{
    const find_and_remove_if_one = (query_string) =>
    {
        const query_result = document.querySelectorAll(query_string);
        if (query_result.length === 1)
        {
            query_result[0].remove();
            return true;
        }
        return false;
    };

    const divs = [
        { query : "div#columns > div#secondary > div#secondary-inner", name : "recommended videos column" },
        { query : "ytd-comments#comments", name : "comments section" },
        { query : "div#info-contents > ytd-video-primary-info-renderer > div#container > div#info > div#menu-container", name : "video info" },
        { query : "div#info-contents > ytd-video-primary-info-renderer > div#container > div#info > div#info-text > div#count", name : "visit count" },
        { query : "div#info-contents > ytd-video-primary-info-renderer > div#container > div#info > div#info-text > div#date > span#dot", name : "dot between visit count and date" },
        { query : "div#player ~ div#meta", name : "video description" },
    ];

    for (let j = 0; j < divs.length; ++j)
    {
        find_and_remove_if_one(divs[j].query);
    }

    return 1000;
};

(async function()
{
    'use strict';

    const sleep = async (ms) =>
    {
        return new Promise(resolve => setTimeout(resolve, ms));
    };

    while (true)
    {
        const url = document.location.href;
        if (url === "https://www.youtube.com/")
        {
            const wait_amount = spamless_feed();
            await sleep(wait_amount);
        }
        else if (url.match("https://www.youtube.com/watch*"))
        {
            const wait_amount = immersive_watch();
            await sleep(wait_amount);
        }
        else
        {
            await sleep(1000);
        }
    }
})();