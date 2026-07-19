import http from 'k6/http';
import { check, sleep } from 'k6';

const BASE_URL =
  'https://ecommerce-project-naiiiiif24-dev.apps.rm1.0a51.p1.openshiftapps.com';

export const options = {
  vus: 10,
  duration: '30s',

  thresholds: {
    http_req_failed: ['rate<0.01'],
    http_req_duration: ['p(95)<2000'],
    checks: ['rate>0.95'],
  },
};

export default function () {
  // 1. Open the website
  const homeResponse = http.get(BASE_URL);

  check(homeResponse, {
    'website opened successfully': (response) =>
      response.status === 200,
  });

  sleep(1);

  // 2. Retrieve available products
  const productsResponse = http.get(`${BASE_URL}/api/products`);

  const productsPassed = check(productsResponse, {
    'products loaded successfully': (response) =>
      response.status === 200,

    'product list is not empty': (response) => {
      try {
        const products = response.json();
        return Array.isArray(products) && products.length > 0;
      } catch {
        return false;
      }
    },
  });

  if (!productsPassed) {
    sleep(1);
    return;
  }

  const products = productsResponse.json();
  const product = products[0];

  // 3. Add the selected product to the cart
  const cartData = JSON.stringify({
    productId: product._id,
    name: product.name || product.title || 'Test product',
    price: product.price || 0,
  });

  const requestParameters = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const addResponse = http.post(
    `${BASE_URL}/api/cart/add`,
    cartData,
    requestParameters
  );

  check(addResponse, {
    'product added to cart': (response) =>
      response.status === 201,
  });

  sleep(1);

  // 4. View the cart
  const cartResponse = http.get(`${BASE_URL}/api/cart`);

  check(cartResponse, {
    'cart loaded successfully': (response) =>
      response.status === 200,

    'cart response is an array': (response) => {
      try {
        return Array.isArray(response.json());
      } catch {
        return false;
      }
    },
  });

  sleep(1);

  // 5. Remove the selected product
  const removeResponse = http.del(
    `${BASE_URL}/api/cart/remove/${product._id}`
  );

  check(removeResponse, {
    'product removed from cart': (response) =>
      response.status === 200,
  });

  sleep(1);
}