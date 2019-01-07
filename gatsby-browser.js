import './src/utils/theme.css';

export const onRouteUpdate = () => {
  // Load JS required for github cards
  if (document.querySelector('.github-card') !== null) {
    const script = document.createElement('script');
    script.src = "https://cdn.jsdelivr.net/github-cards/latest/widget.js";
    document.getElementsByTagName('head')[0].appendChild(script);
  }
}
