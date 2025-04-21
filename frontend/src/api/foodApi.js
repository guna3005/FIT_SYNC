import api from './axios';

export const getFoodItems = () =>
  api.get('/food-items').then(res => res.data);

export const getFoodItem = id =>
  api.get(`/food-items/${id}`).then(res => res.data);
