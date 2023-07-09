import axios from 'axios';
const chuckNorrisGetQuoteService = async () => {
  if (!process.env.API_URL) {
    throw new Error('API_URL missing');
  }
  const response = await axios.get(process.env.API_URL);
  return response.data;
};

export { chuckNorrisGetQuoteService };
