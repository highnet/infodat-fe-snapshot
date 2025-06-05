/* @copyright Stadt Wien - Wiener Melange 200 */
function filterOptions(originalOptions, needle) {
  return originalOptions.filter(item => {
    let match = false;
    if (!item.children.length) {
      match = item.text.toLowerCase().includes(needle);
    } else {
      item.children = item.children.filter(subitem =>
        subitem.text.toLowerCase().includes(needle)
      );
      match = item.children.length > 0;
    }
    return match;
  });
}

function markOption(renderedOptions, index) {
  const option = renderedOptions[index];
  // Only scroll if there are more than 5 items
  option.scrollIntoView(index > 5);
  return option;
}

export { filterOptions, markOption };
