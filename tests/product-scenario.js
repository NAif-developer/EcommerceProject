import http from 'k6/http';
import { sleep, check } from 'k6';

const BASE_URL = 'https://ecommerce-project-naiiiiif24-dev.apps.rm1.0a51.p1.openshiftapps.com';

export const options = {
  vus: __ENV.USERS ? Number(__ENV.USERS) : 50,
  duration: '30s',
};

export default function () {
 
  let home = http.get(BASE_URL);
  check(home, {
    'homepage loaded': (res) => res.status === 200,
  });

  sleep(1);

  
  let productsRes = http.get(`${BASE_URL}/api/products`);
  check(productsRes, {
    'products loaded': (res) => res.status === 200,
  });

  let products = productsRes.json();

  
  if (products.length > 0) {
    let productId = products[0]._id;

    let detailRes = http.get(`${BASE_URL}/api/products/${productId}`);
    check(detailRes, {
      'product detail loaded': (res) => res.status === 200,
    });
  }

  sleep(1);
}