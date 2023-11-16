chrome.browserAction.onClicked.addListener(function(e){
    chrome.tabs.executeScript(e.id,{
        file:"xuanjianghui.js"
    })
})