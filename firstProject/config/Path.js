export default class path {
  static BASE_URL = 'http://localhost:3001';

  static LOGIN_AUTHENTICATION = path.BASE_URL + '/userauth';

  static UPDATE_NUMBER_PROFILE = path.BASE_URL + '/updateData/numberandprofile';

  static ADD_SERVICE = path.BASE_URL + '/service/addservice';

  static GET_USER_SERVICES = path.BASE_URL + '/service/getalluserservices';

  static GET_SERVICES = path.BASE_URL + '/service/getservices';
}