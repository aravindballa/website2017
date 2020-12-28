const updateFavicon = (isDark) => {
  const faviconEL = document.querySelector('link[rel="icon"]');
  faviconEL.href = isDark ? '/logo-dark.png' : '/icons/icon-48x48.png';
};

export const onRouteUpdate = () => {
  // Load JS required for github cards
  if (document.querySelector('.github-card') !== null) {
    const cards = document.querySelectorAll('.github-card');
    for (let card of cards) {
      const username = card.dataset.user;
      const repo = card.dataset.repo;

      fetch(`https://api.github.com/repos/${username}/${repo}`)
        .then((res) => res.json())
        .then((data) => {
          card.innerHTML = `
          <div class="mx-auto rounded border border-foreground max-w-md text-base">
            <div class="border-b-2 border-foreground p-4">
              <div class="flex"><img class="rounded-full border-2 border-foreground w-16 h-16" src="${
                data.owner.avatar_url
              }" width="64" height="64"/>
                <div class="ml-4">
                  <h3 class="m-0 mb-2"><a href="https://github.com/${
                    data.full_name
                  }" target="_blank">${data.name}</a></h3>
                  <p class="desc">${data.description || 'Visit the repo for more info...'}</p>
                </div>
              </div>
            </div>
            <div class="py-2 px-4 text-right text-sm">
              <span><b>${data.stargazers_count}</b> Stars</span> | 
              <span><b>${data.forks}</b> Forks</span>
            </div>
          </div>
          <p class="mt-1 text-center text-xs">
            <a class="text-gray-400 dark:text-gray-600" href="https://github.com/${
              data.full_name
            }" target="_blank">https://github.com/${data.full_name}</a>
          </p>
          `;
        });
    }
  }

  // <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
  if (document.querySelector('.twitter-tweet')) {
    const scriptEl = document.createElement('script');
    scriptEl.setAttribute('src', 'https://platform.twitter.com/widgets.js');
    scriptEl.setAttribute('async', true);
    document.head.appendChild(scriptEl);
  }

  if (document.querySelector('.instagram-media')) {
    const scriptEl = document.createElement('script');
    scriptEl.setAttribute('src', '//www.instagram.com/embed.js');
    scriptEl.setAttribute('async', true);
    document.head.appendChild(scriptEl);
  }

  const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
  darkModeMediaQuery.addListener((e) => {
    updateFavicon(e.matches);
    document.querySelector('body').classList.remove('theme-dark', 'theme-light');
    document.querySelector('body').classList.add(e.matches ? 'theme-dark' : 'theme-light');
  });
  if (darkModeMediaQuery.matches) updateFavicon(true);
};

export const onServiceWorkerUpdateFound = () => {
  if (window.localStorage) {
    window.localStorage.setItem('sw-updated', 'true');
  }
};
