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
