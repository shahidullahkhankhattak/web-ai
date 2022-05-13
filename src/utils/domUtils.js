export function listenDomChanges($elem, cb) { // $elem should be a dom element, callback to run after listening to changes.
  const config = { childList: true, subtree: true };

  const callback = function (mutationsList) {
    for (let mutation of mutationsList) {
      if (mutation.type === 'childList') {
        cb();
      }
    }
  };

  const observer = new MutationObserver(callback);
  observer.observe($elem, config);
}