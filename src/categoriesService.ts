import axiosHelper from './axiosHelper';

class CategoriesService {
  URLS: any;
  constructor(){
    this.URLS = {ADD: '/categories'};
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

export default new CategoriesService();
