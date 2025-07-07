import axios from 'axios';

export async function getCountries() {
  try {
    const res = await axios.get('https://restcountries.com/v2/all?fields=name,flag');
    return res.data;
  } catch {
    throw new Error('Could not fetch countries');
  }
}