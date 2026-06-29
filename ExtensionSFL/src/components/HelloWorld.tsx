import { useState } from "react";

export default function HelloWorld() {

const [isActive, setIsActive] = useState(false);

  function onUserClickedButton() {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const tabId = tabs[0]?.id;
      if (tabId) {
        chrome.tabs.sendMessage(tabId, { command: 'start' });
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
  };


      function sloyMoy() {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const tabId = tabs[0]?.id;
      if (tabId) {
        chrome.tabs.sendMessage(tabId, { command: 'step' });
      }
    });
  }

  return (
    <>
      <button onClick={() => {
      onUserClickedButton();
      setIsActive(prev => !prev);
    }}>Click me{isActive ? '✅' : '❌'}</button>
      <button onClick={() => {
      offUserClickedButton();
      setIsActive(prev => !prev);
    }}>Stop me</button>
          <button onClick={() => {
      sloyMoy();
      setIsActive(prev => !prev);
    }}>Step</button>
    </>
  );
}