import Axios from 'axios';
import {base_url} from './urls';

export const api = Axios.create({
  baseURL: base_url,
});
