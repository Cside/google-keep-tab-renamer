const serviceName = 'Google Keep';

const main = () => {
  if (['#home', '#search'].some((hash) => location.hash === hash)) {
    document.title = serviceName;
  } else if (location.hash.startsWith('#label/')) {
    document.title = decodeURIComponent(location.hash).replace(/^#label\//, '');
  } else if (location.hash.startsWith('#NOTE/')) {
    const title =
      document.querySelector<HTMLElement>('[contenteditable=true][spellcheck=true]')?.textContent ||
      serviceName;
    if (title) document.title = title;
  } else if (location.hash.startsWith('#search/text')) {
    const $input = document.querySelector<HTMLInputElement>('input[name="q"]');
    if (!$input) throw new Error('input[name="q"] is not found');
    document.title = $input.value;
  } else {
    // query in location.hash includes commas
    const $heading = document.querySelector('[role="heading"]');
    if (!$heading) throw new Error('[role="heading"] is not found');
    if ($heading.textContent !== null && $heading.textContent?.length > 0)
      document.title = $heading.textContent;
  }
};

chrome.runtime.onMessage.addListener(({ type }: { type: string }) => {
  if (type === 'CHANGE_HISTORY') main();
});

main();
