module.exports = {
  URL: 'http://localhost:3000/api',
  CSV_PATH: './data/dummy.csv',
  USERNAME: 'admin',
  PASSWORD: 'admin',
  ITEMS_SETUP: {
    COUNT: process.env.COUNT || 3,
    START_BARCODE: process.env.START_BARCODE || 8000
  }
}
