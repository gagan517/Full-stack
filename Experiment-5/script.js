document.addEventListener('DOMContentLoaded', () => {
  const select = document.getElementById('categorySelect');
  const productList = document.getElementById('productList');
  const products = Array.from(productList.querySelectorAll('.product-card'));
  const noResult = document.getElementById('noResult');

  // 1) Get unique categories from products
  const categorySet = new Set(products.map(p => p.dataset.category || 'Uncategorized'));
  const categories = Array.from(categorySet).sort((a,b) => a.localeCompare(b));

  // 2) Populate the dropdown
  select.innerHTML = '<option value="All">All</option>' +
    categories.map(c => `<option value="${escapeHtml(c)}">${escapeHtml(c)}</option>`).join('');

  // 3) Filtering function
  function filterProducts() {
    const chosen = select.value;
    let visibleCount = 0;

    products.forEach(p => {
      const cat = p.dataset.category || '';
      const show = (chosen === 'All') || (cat === chosen);
      p.style.display = show ? 'block' : 'none';
      if (show) visibleCount++;
    });

    noResult.style.display = visibleCount === 0 ? 'block' : 'none';
  }

  // 4) Event binding
  select.addEventListener('change', filterProducts);

  // 5) Initial load
  filterProducts();

  // Escape HTML (safe for dropdown)
  function escapeHtml(s){
    return String(s)
      .replaceAll('"', '&quot;')
      .replaceAll('<','&lt;')
      .replaceAll('>','&gt;');
  }
});
