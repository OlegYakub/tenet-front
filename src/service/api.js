import axios from 'axios';
import {globals} from '../store/globals';
import {DOMAIN_URI, API_URI} from './apiConstants';
// import navService from '../navigation/service';
// import { LOGIN as LOGIN_SCREEN } from '../navigation/screenTypes';

export default class Api {
  static methods = {
    GET: 'get',
    POST: 'post',
    PATCH: 'patch',
    PUT: 'put',
    DELETE: 'delete',
  };

  static get initialStatus() {
    return {
      loading: false,
      loaded: false,
      fail: false,
    };
  }

  static get requestStatus() {
    return {
      loading: true,
      loaded: false,
      fail: false,
    };
  }

  static get successStatus() {
    return {
      loading: false,
      loaded: true,
      fail: false,
    };
  }

  static get failStatus() {
    return {
      loading: false,
      loaded: false,
      fail: true,
    };
  }

  static actionsStack = [];

  static callLastActions() {
    if (Api.actionsStack.length) {
      for (let i = 0; i < Api.actionsStack.length; i++) {
        globals.store.dispatch(Api.actionsStack[i]);
      }
    }
  }

  static composeRouteUrl(route) {
    if (route.startsWith('http')) {
      return route;
    }
    return `${DOMAIN_URI}${API_URI}${route}`;
  }

  static get(route, params, appendHeaders, newHeaders) {
    return Api.request(
      route,
      params,
      undefined,
      Api.methods.GET,
      appendHeaders,
      newHeaders,
    );
  }

  static put(route, params, data) {
    return Api.request(route, params, data, Api.methods.PUT);
  }

  static patch(route, params, data) {
    return Api.request(route, params, data, Api.methods.PATCH);
  }

  static post(route, data, appendHeaders, newHeaders) {
    return Api.request(
      route,
      undefined,
      data,
      Api.methods.POST,
      appendHeaders,
      newHeaders,
    );
  }

  static delete(route, params, data) {
    return Api.request(route, params, data, Api.methods.DELETE);
  }

  // static uploadImage(url, image, params = {}) {
  //   const data = {
  //     uri: image.path,
  //     type: image.mime,
  //     name: image.path.substring(image.path.lastIndexOf('/') + 1),
  //   };
  //   const form = new FormData();
  //
  //   form.append('file', data, 'here_can_be_static_name.jpg');
  //   for (let param in params) {
  //     form.append(param, params[param]);
  //   }
  //
  //   const headers = {
  //     'Content-Type': 'multipart/form-data',
  //   };
  //   const {token} = globals.store.getState().auth;
  //   if (token) {
  //     headers.Authorization = `Bearer ${token}`;
  //   }
  //   return axios({
  //     method: Api.methods.POST,
  //     url: Api.composeRouteUrl(url),
  //     headers,
  //     data: form,
  //   })
  //     .then((resp) => resp.data)
  //     .catch((err) => {
  //       Api.handleError(err);
  //       throw err;
  //     });
  // }

  static request(route, params, data, method, appendHeaders, newHeaders) {
    const url = Api.composeRouteUrl(route, params);
    let headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json; charset=utf-8',
      'X-Requested-With': 'XMLHttpRequest',
    };

    // const {token} = globals.store.getState().auth;
    const token = localStorage.getItem('token');
    console.log('token API!!!', token);

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    if (appendHeaders) {
      headers = {...headers, ...appendHeaders};
    }

    if (newHeaders) {
      headers = newHeaders;
    }

    console.log('REQUEST URL ->', url);

    return axios({
      method,
      url,
      headers,
      params,
      data,
    })
      .then((resp) => {
        return resp.data;
      })
      .catch((err) => {
        console.log('RESP ERR ->', err.response);

        Api.handleError(err, route);
        throw err;
      });
  }

  static handleError(error, route) {
    const response = error.response || error;

    if (Number(response.status) === 401) {
    }
  }
}
