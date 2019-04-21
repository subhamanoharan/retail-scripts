import axios from 'axios';
import * as config from 'config';
import axiosCookieJarSupport from 'axios-cookiejar-support';
import {CookieJar} from 'tough-cookie';

const jar = new CookieJar();

class AxiosHelper {

  getInstance(){
    const axiosInstance = axios.create({
      baseURL: config.URL,
      timeout: 25000,
      withCredentials: true,
      jar
    });
    axiosCookieJarSupport(axiosInstance);
    return axiosInstance;
  }
}

export default new AxiosHelper();
