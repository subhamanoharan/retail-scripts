import * as fs from 'fs';
import * as config from 'config';

import * as csvParser from 'neat-csv';

export default async () => {
  const data = fs.readFileSync(config.CSV_PATH, {encoding: 'utf8'});
  const parsedData = await csvParser(data);
  return parsedData;
}
