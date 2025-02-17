import { API_CONFIG } from './config';

const fetchData = async <T>(url: string): Promise<T> => {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Weather Api Error: ${response.statusText}`);
  }
  return response.json();
};

await fetchData(API_CONFIG.BASE_URL);
