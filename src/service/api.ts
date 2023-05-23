import axios, {Method} from 'axios';
import {DOMAIN_URI, API_URI} from './apiConstants';
import {KeyValModel} from "../models/global.model";

export default class Api {
  static methods = {
    GET: 'get',
    POST: 'post',
    PATCH: 'patch',
    PUT: 'put',
    DELETE: 'delete',
  };

  static composeRouteUrl(route: string) {
    if (route.startsWith('http')) {
      return route;
    }
    return `${DOMAIN_URI}${API_URI}${route}`;
  }

  static get(route: string, params: KeyValModel, appendHeaders?: KeyValModel, newHeaders?: KeyValModel) {
    return Api.request(
      route,
      params,
      undefined,
      'get',
      appendHeaders,
      newHeaders,
    );
  }

  static put(route: string, params: KeyValModel | undefined, data: any) {
    return Api.request(route, params, data, 'put');
  }

  static patch(route: string, params: KeyValModel | undefined, data: any) {
    return Api.request(route, params, data, 'PATCH');
  }

  static post(route: string, data: any, appendHeaders?: KeyValModel, newHeaders?: KeyValModel) {
    return Api.request(
      route,
      undefined,
      data,
      'post',
      appendHeaders,
      newHeaders,
    );
  }

  static delete(route: string, params: KeyValModel, data: any) {
    return Api.request(route, params, data, 'DELETE');
  }

  static request(route: string, params: KeyValModel | undefined, data: any, method: Method, appendHeaders?: KeyValModel, newHeaders?: KeyValModel) {
    const url = Api.composeRouteUrl(route);
    let headers: KeyValModel = {
      Accept: 'application/json',
      'Content-Type': 'application/json; charset=utf-8',
      'X-Requested-With': 'XMLHttpRequest',
    };

    const token = localStorage.getItem('token');

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    if (appendHeaders) {
      headers = {...headers, ...appendHeaders};
    }

    if (newHeaders) {
      headers = newHeaders;
    }

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
        throw err;
      });
  }
}
