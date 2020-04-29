// ==UserScript==
// @name         Immersive YouTube video watch
// @namespace    asielorz
// @version      0.1
// @include      https://www.youtube.com/watch?v=*
// @description  Remove distractions in youtube
// @author       asielorz
//
// ==/UserScript==

(async function() {
    'use strict';

    const check_one_result = (query_result) =>
    {
        if (query_result.length === 0)
        {
            //alert("Failed to find " + query_name);
            return false;
        }

        if (query_result.length !== 1)
        {
            //alert("More than 1 result (" + query_result.length + ") got when looking for " + query_name);
            return false;
        }

        return true;
    };

    const find_and_remove_if_one = (query_string) =>
    {
        const query_result = document.querySelectorAll(query_string);
        if (check_one_result(query_result) === true)
        {
            query_result[0].remove();
            return true;
        }
        return false;
    };

    const sleep = async (ms) =>
    {
        return new Promise(resolve => setTimeout(resolve, ms));
    };

    const divs = [
        { query : "div#columns > div#secondary > div#secondary-inner", name : "recommended videos column" },
        { query : "ytd-comments#comments", name : "comments section" },
        { query : "div#info-contents > ytd-video-primary-info-renderer > div#container > div#info", name : "video info" },
        { query : "div#player ~ div#meta", name : "video description" },
    ];
    let removed = [false, false, false, false];

    for (let i = 0; i < 10; ++i)
    {
        let all_removed = true;

        for (let j = 0; j < divs.length; ++j)
        {
            if (!removed[j])
            {
                if (find_and_remove_if_one(divs[j].query))
                {
                    removed[j] = true;
                }
                else
                {
                    all_removed = false;
                }
            }
        }

        if (all_removed)
        {
            break;
        }
        else
        {
            await sleep(1000);
        }
    }

    for (let i = 0; i < divs.length; ++i)
    {
        if (!removed[i])
        {
            alert("Could not remove " + divs[i].name);
        }
    }
})();