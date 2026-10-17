/* Relearn 搜索接口：支持中文词组及空格分隔的多个关键词。 */
(function () {
  'use strict';
  let pages = [];
  const normalize = value => String(value || '').normalize('NFKC').toLocaleLowerCase('zh-CN');

  function init() {
    const url = window.relearn.index_js_url;
    if (!url) return;
    const script = document.createElement('script');
    script.src = url;
    script.async = true;
    script.onload = function () {
      pages = relearn_searchindex.map((page, index) => ({
        page, index: String(index),
        title: normalize(page.title),
        tags: normalize((page.tags || []).join(' ')),
        content: normalize(page.content),
      }));
      window.relearn.isSearchEngineReady = true;
      window.relearn.executeInitialSearch();
    };
    script.onerror = function () {
      document.querySelectorAll('[data-search-input]').forEach(input => {
        input.placeholder = '搜索暂时不可用，请刷新页面';
      });
    };
    document.head.appendChild(script);
  }

  function search(term) {
    const terms = [...new Set(normalize(term).trim().split(/\s+/u).filter(Boolean))];
    if (!terms.length) return [];
    return pages.map(item => {
      let score = 0;
      for (const word of terms) {
        const inTitle = item.title.includes(word);
        const inTags = item.tags.includes(word);
        const inContent = item.content.includes(word);
        if (!inTitle && !inTags && !inContent) return null;
        score += (inTitle ? 20 : 0) + (inTags ? 10 : 0) + (inContent ? 1 : 0);
        if (item.title === word) score += 20;
      }
      return { index: item.index, page: item.page, matches: terms, score };
    }).filter(Boolean).sort((a, b) => b.score - a.score);
  }

  window.relearn = window.relearn || {};
  window.relearn.search = window.relearn.search || {};
  window.relearn.search.adapter = { init, search };
})();
