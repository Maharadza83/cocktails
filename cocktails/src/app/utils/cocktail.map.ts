import { map } from 'rxjs';

export function cocktailMap() {
  const transformKeysToArray = (obj: any): any => {
    const transformedObject: any = {
      ingredients: [],
      measures: [],
    };

    for (let key in obj) {
      if (key.startsWith('strIngredient') && obj[key]) {
        transformedObject.ingredients.push(obj[key]);
      } else if (key.startsWith('strMeasure') && obj[key] !== null && obj[key].trim() !== '') {
        transformedObject.measures.push(obj[key]);
      } else if (obj[key] !== null) {
        const newKey = key.charAt(0).toLowerCase() + key.slice(1);

        if (typeof obj[key] === 'object' && obj[key] !== null) {
          transformedObject[newKey] = transformKeysToArray(obj[key]);
        } else {
          transformedObject[newKey] = obj[key];
        }
      }
    }

    return transformedObject;
  };


  return map((item) => transformKeysToArray(item));
}
