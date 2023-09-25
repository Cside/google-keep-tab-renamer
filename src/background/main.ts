import manifest from '../../manifest.json';

const urlPrefix = (() => {
  const prefix = manifest.content_scripts[0]?.matches[0];
  if (!prefix) throw new Error('manifest.content_scripts[0].matches[0] is not found');
  return prefix.replace(/\*$/, '');
})();

chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  const url = tab.url;
  if (!url) throw new Error('tab.url is not found');
  if (url.startsWith(urlPrefix) && changeInfo.status === 'complete')
    await chrome.tabs.sendMessage(tabId, { type: 'CHANGE_HISTORY' });
});
