export const SortClassDegreeFn = (a, b) => (a.name > b.name ? 1 : -1);

export const filterItems = (inputValue, list) => {
  if (typeof inputValue === 'string') {
    const filterValue = inputValue.toLowerCase();
    return list.filter((option) => option.name.toLowerCase().includes(filterValue));
  }
  return list.filter((option) => option.id === inputValue);
};
