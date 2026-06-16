export default function HelloWorld() {
  function onUserClickedButton() {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const tabId = tabs[0]?.id;
      if (tabId) {
        chrome.tabs.sendMessage(tabId, { command: 'клик' });
      }
    });
  }

    function offUserClickedButton() {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const tabId = tabs[0]?.id;
      if (tabId) {
        chrome.tabs.sendMessage(tabId, { command: 'stop' });
      }
    });
  }

  return (
    <>
      <button onClick={onUserClickedButton}>Click me</button>
      <button onClick={offUserClickedButton}>Stop me</button>
    </>
  );
}