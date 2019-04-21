import axiosHelper from './axiosHelper';

class ItemsService {
  URLS: any;
  constructor(){
    this.URLS = {ADD: '/items'};
  }

  getPayload(data){
    return data;
  }

  add(data){
    const axiosInstance = axiosHelper.getInstance();
    return axiosInstance.post(this.URLS.ADD, this.getPayload(data))
      .catch((error) => {
        const { response: {data: {errors = ['Unable to add!']} = {}} = {}} = error;
        console.log('Error when adding:', errors, 'where data:', data);
        return Promise.reject(errors);
      });
  }
}

export default new ItemsService();
