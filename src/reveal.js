// Marks [data-reveal] elements with data-revealed the first time they scroll into view; the
// CSS in index.css animates them in. Also watches for elements that mount later (lazy
// sections, language changes), so components only need the attribute.
export function startReveal() {
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.dataset.revealed = '';
        observer.unobserve(entry.target);
      }
    },
    // Trigger a little before the bottom edge, so content is moving by the time it's read.
    { rootMargin: '0px 0px -8% 0px' }
  );

  const watch = (root) => {
    if (root.matches?.('[data-reveal]:not([data-revealed])')) observer.observe(root);
    root.querySelectorAll?.('[data-reveal]:not([data-revealed])').forEach((el) => observer.observe(el));
  };
  watch(document);

  const mutations = new MutationObserver((records) => {
    for (const record of records) {
      record.addedNodes.forEach((node) => node.nodeType === 1 && watch(node));
    }
  });
  mutations.observe(document.getElementById('root'), { childList: true, subtree: true });

  return () => {
    observer.disconnect();
    mutations.disconnect();
  };
}
