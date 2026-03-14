/** Simple hash-based router: #category/slug */
export function createRouter(onNavigate) {
  function handleHash() {
    const hash = location.hash.replace(/^#\/?/, '');
    if (hash) onNavigate(hash);
  }

  window.addEventListener('hashchange', handleHash);
  // initial load
  if (location.hash) handleHash();

  return {
    navigate(path) {
      location.hash = '#/' + path;
    },
    destroy() {
      window.removeEventListener('hashchange', handleHash);
    }
  };
}
