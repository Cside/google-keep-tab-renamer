const main = () => {
  console.log('main');
};

chrome.runtime.onMessage.addListener(({ type }: { type: string }) => {
  if (type !== 'CHANGE_HISTORY') return;

  main();
  // const id = setInterval(() => {
  //   // wait for?

  //   clearInterval(id);
  //   main();
  // }, 50);
});

main();
