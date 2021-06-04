export const detailHeaderText = (itemArray, name) => {
  if (itemArray) {
    return `${itemArray.length > 1 ? itemArray.length : ''} ${name}`;
  } else {
    return name;
  }
};

export const parentUrl = document.referrer;

const cloneObject = obj => Object.assign({}, obj);

export const renameObjectKey = (object, key, newKey) => {
  const clonedObj = cloneObject(object);
  const targetKey = clonedObj[key];
  delete clonedObj[key];
  clonedObj[newKey] = targetKey;
  return clonedObj;
};

// Sort method to sort strings in entity tables
export const customSortStringMethod = (a, b) => {
  let tempArray = [];
  tempArray = [a, b];

  const collator = new Intl.Collator(undefined, { numeric: true, sensitivity: 'base' });
  tempArray.sort(collator.compare);

  if (tempArray[0] === a) {
    return -1;
  } else {
    return 1;
  }
};