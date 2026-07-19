import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
  vus: 500,
  duration: '30s',
};

export default function () {
  http.get('https://ecommerce-project-naiiiiif24-dev.apps.rm1.0a51.p1.openshiftapps.com');
  sleep(1);
}