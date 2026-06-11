export default function HelloWorld() {
  function onUserClickedButton() {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const tabId = tabs[0]?.id;
      if (tabId) {
        chrome.tabs.sendMessage(tabId, { command: 'клик' });
      }
    });
  }

  return (
    <>
      <button onClick={onUserClickedButton}>Click me</button>
    </>
  );
}