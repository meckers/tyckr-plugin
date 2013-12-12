// OBS! Starta tyckr-injection innan du använder denna (port 9889).
// Detta script injectar bara scriptet som ligger där.



chrome.tabs.onUpdated.addListener(function(e, changeInfo) {
    if (changeInfo.status === 'complete') {
        chrome.tabs.get(e, function(tab) {
            //console.log("Updated - ", tab);
            if (tab.url.indexOf('www.aftonbladet.se') !== -1) {
                console.log("injecting script", tab.id);

                chrome.tabs.executeScript(tab.id, {
                    file: 'js/jquery-1.10.2.min.js'
                }, function() {
                    chrome.tabs.executeScript(tab.id, {
                        //file: 'http://localhost:9889/public/javascripts/main.js'
                        file: 'js/injection.js'
                        //code: "alert('hejsan');"
                    }, function(e) {
                        console.log("injection callback", e);
                        chrome.tabs.executeScript(tab.id, {
                            file: 'js/onload.js'
                        });
                    });
                });


            }

            /*
             chrome.windows.get(tab.windowId, {}, function(win) {
             console.log("Window - ", win);
             } )*/
        });
    }



})