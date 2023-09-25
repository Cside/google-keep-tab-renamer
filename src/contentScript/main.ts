const serviceName = 'Google Keep';

const main = () => {
  if (['#home', '#search'].some((hash) => location.hash === hash)) {
    document.title = '';
  } else if (location.hash.startsWith('#label/')) {
    document.title = decodeURIComponent(location.hash).replace(/^#label\//, '');
  } else if (location.hash.startsWith('#NOTE/')) {
    document.title =
      document.querySelector<HTMLElement>('[contenteditable=true][spellcheck=true]')?.textContent ||
      '';
  } else if (location.hash.startsWith('#search/text')) {
    // Use value in input element because the query in location.hash includes commas
    const $input = document.querySelector<HTMLInputElement>('input[name="q"]');
    if (!$input) throw new Error('input[name="q"] is not found');
    document.title = $input.value;
  } else {
    const $heading = document.querySelector('[role="heading"]');
    if (!$heading) throw new Error('[role="heading"] is not found');
    document.title =
      $heading.textContent !== null && $heading.textContent.length > 0 ? $heading.textContent : '';
  }
  if (document.title === '') {
    document.title = serviceName;
  } else {
    document.title += ` - ${serviceName}`;
  }
};

chrome.runtime.onMessage.addListener(({ type }: { type: string }) => {
  if (type === 'CHANGE_HISTORY') main();
});

main();
