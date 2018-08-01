import { apiConfigs } from '../configs/apiConfigs';

abstract class BaseProvider {
  protected get<T>(url: string): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      const uri = `${apiConfigs.apiUrl}/${url}`;

      xhr.open('GET', uri);
      xhr.send();
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            const response = JSON.parse(xhr.response);
            resolve(response);
          } else {
            reject(xhr);
          }
        }
      };

    });
  }
}

export { BaseProvider };