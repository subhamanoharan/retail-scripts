import axiosHelper from './axiosHelper';

class UsersService {
  URLS: any;
  
  constructor(){
    this.URLS = {LOGIN: '/users/authenticate'};
  }

  login(email, password){
    const axiosInstance = axiosHelper.getInstance();
    return axiosInstance.post(this.URLS.LOGIN, {}, {auth: {username: email, password }})
      .catch((error) => {
        const { response: {data: {errors = ['Unable to login!']} = {}} = {}} = error;
        console.log('Error when logging in', errors);
        return Promise.reject(errors);
      });
  }
}

export default new UsersService();
