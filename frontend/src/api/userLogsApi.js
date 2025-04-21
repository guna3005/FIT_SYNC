import api from './axios';

// supply userId (e.g. 1) when calling these:
export const getUserFoodLogs = userId =>
  api.get(`/users/${userId}/food-logs`).then(res => res.data);

export const createUserFoodLog = (userId, foodItemId, quantity, logDate) =>
  api
    .post(`/users/${userId}/food-logs`, {
      food_item_id: foodItemId,
      quantity,
      log_date: logDate,
    })
    .then(res => res.data);

export const getUserExerciseLogs = userId =>
  api.get(`/users/${userId}/exercise-logs`).then(res => res.data);

export const createUserExerciseLog = (
  userId,
  exerciseId,
  logDate,
  setNumber,
  reps,
  weightKg
) =>
  api
    .post(`/users/${userId}/exercise-logs`, {
      exercise_id: exerciseId,
      log_date: logDate,
      set_number: setNumber,
      reps,
      weight_kg: weightKg,
    })
    .then(res => res.data);

export const getUserBMI = userId =>
  api.get(`/users/${userId}/bmi`).then(res => res.data);
