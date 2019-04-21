import * as config from 'config';
import * as P from 'bluebird';

import csvParse from './csvParser';
import itemsService from './itemsService';
import categoriesService from './categoriesService';
import usersService from './usersService';

const setupCategories = async(data) => {
  const categories = Object.keys(data.reduce((acc, {Category}) => ({...acc, [Category]: []}), {}));
  console.log('Setting up categories');
  return P.mapSeries(categories, async (c) => {
    console.log('Setting up-->', c)
    return categoriesService.add({name: c})
      .catch((errors) => {
        console.log('------',errors === [ `Category "${c}"  already exists!`])
        if(errors[0] === `Category "${c}"  already exists!`) return;
        return Promise.reject(errors);
      });
  })
}

const setupItems = async (data) => {
  console.log('Setting up items');
  return P.mapSeries(data, async ({Name, Price, Barcode, Category}) => {
    console.log('Setting up-->', {Name, Price, Barcode, Category})
    return itemsService.add({
      name: Name, barcode: Barcode, sp: Number(Price), byWeight: true, category: Category
    })
  })
}
const setup = async () => {
  const data = await csvParse();
  try{
    await usersService.login(config.USERNAME, config.PASSWORD);
    await setupCategories(data);
    await setupItems(data);
  } catch(e){
    console.log('Something went wrong', e);
  }
};

setup();
