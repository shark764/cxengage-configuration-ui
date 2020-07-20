export const detailHeaderText = (itemArray, name) => {
  if (itemArray) {
    return `${itemArray.length > 1 ? itemArray.length : ''} ${name}`;
  } else {
    return name;
  }
};

export const parentUrl = document.referrer;
