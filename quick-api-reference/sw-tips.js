console.log("sw-tips.js");

//Fetch tip and save in storage
const updateTip = async () => {
  const response = await fetch("https://chrome.dev/f/extensions_tips");
  const tips = await response.json();
  const randomIndex = Math.floor(Math.random() * tips.length);
  return chrome.storage.local.set({ tip: tips[randomIndex] });
};

const ALARM_NAME = "tip";

// Check if alarm exists to avoid resetting the timer.
// The alarm might be removed when the browser session restarts
async function createAlarm() {
  if (typeof alarm === "undefined") {
    chrome.alarms.create(ALARM_NAME, {
      delayInMinutes: 1,
      periodInMinutes: 1440,
    });
    updateTip();
  }
}

createAlarm();

//Update tip once a day
chrome.alarms.onAlarm.addListener(updateTip);

//Send tip to content script via messaging
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.greeting === "tip") {
    chrome.storage.local.get("tip").then(sendResponse);
  }
});
