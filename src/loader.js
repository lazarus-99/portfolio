// Fades out the loader from index.html once the app has rendered and the fonts are in, so the
// first thing people see is the finished page. Waits at most 1.5s for the fonts.
export function hideLoader() {
  const loader = document.getElementById('app-loader');
  if (!loader || loader.classList.contains('is-done')) return;
  const fonts = Promise.race([document.fonts.ready, new Promise((resolve) => setTimeout(resolve, 1500))]);
  fonts.then(() => {
    requestAnimationFrame(() => {
      loader.classList.add('is-done');
      // Starts the hero's entrance as the loader fades, so it isn't spent behind the loader.
      document.documentElement.classList.add('is-loaded');
      setTimeout(() => loader.remove(), 500);
    });
  });
}
