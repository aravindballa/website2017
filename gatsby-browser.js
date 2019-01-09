import './src/utils/theme.css';

export const onRouteUpdate = () => {
  // Load JS required for github cards
  if (document.querySelector('.github-card') !== null) {
    const cards = document.querySelectorAll('.github-card');
    for (let card of cards) {
      const username = card.dataset.user;
      const repo = card.dataset.repo;

      fetch(`https://api.github.com/repos/${username}/${repo}`)
        .then(res => res.json())
        .then(data => {
          card.innerHTML = `
          <div class="card">
            <div class="main">
              <div class="user"><img class="avatar" src="${data.owner.avatar_url}" width="50" height="50"/>
                <div class="user-details">
                  <h3><a href="https://github.com/${data.full_name}" target="_blank">${data.name}</a></h3>
                  <p class="desc">${data.description || 'Visit the repo for more info...'}</p>
                </div>
              </div>
            </div>
            <div class="stats">
              <span class="summary">
              <span><b>${data.stargazers_count}</b> Stars</span> | 
              <span><b>${data.forks}</b> Forks</span>
              </span>
            </div>
          </div>
          <p class="card-caption">
            <a href="https://github.com/${data.full_name}" target="_blank">https://github.com/${data.full_name}</a>
          </p>
          `;
        });
    }
  }

}
