function FilterButtons({ currentFilter, onFilterChange }) {
  const filters = [
    { key: 'all', label: 'All' },
    { key: 'active', label: 'Active' },
    { key: 'completed', label: 'Completed' }
  ];

  return (
    <div className="filter-buttons">
      {filters.map(({ key, label }) => (
        <button
          key={key}
          className={currentFilter === key ? 'filter-btn active' : 'filter-btn'}
          onClick={() => onFilterChange(key)}
        >
          {label}
        </button>
      ))}
    </div>
  );
}

export default FilterButtons;