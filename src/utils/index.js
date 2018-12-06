export const detailHeadertext = (itemArray, name) => {
  if(itemArray) {
    return `${itemArray.length > 1 ? itemArray.length : ''} ${name}`;
  } else {
    return name;
  }
}
