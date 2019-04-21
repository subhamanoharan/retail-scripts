import * as config from 'config';
import * as P from 'bluebird';
import * as faker from 'faker';

import itemsService from './itemsService';
import usersService from './usersService';

const setupItems = async () => {
  console.log('Setting up items');
  return P.mapSeries(Array.from(Array(config.ITEMS_SETUP.COUNT)), async (d, i) => {
    const item = {name: faker.commerce.productName(), sp: Number(faker.commerce.price()),
      barcode: `${config.ITEMS_SETUP.START_BARCODE+i}`};
    console.log('Setting up-->', item);
    return itemsService.add(item)
  })
}

const setup = async () => {
  try{
    await usersService.login(config.USERNAME, config.PASSWORD);
    await setupItems();
  } catch(e){
    console.log('Something went wrong', e);
  }
};

setup();
