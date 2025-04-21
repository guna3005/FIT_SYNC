import api from './axios';

export const getExercises = () =>
  api.get('/exercises').then(res => res.data);

export const getExercise = id =>
  api.get(`/exercises/${id}`).then(res => res.data);
