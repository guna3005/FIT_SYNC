package models

import "time"

type UserExerciseLog struct {
    ID         int       `json:"id"`
    UserID     int       `json:"user_id"`
    ExerciseID int       `json:"exercise_id"`
    LogDate    time.Time `json:"log_date"`
    SetNumber  int       `json:"set_number"`
    Reps       int       `json:"reps"`
    WeightKG   float64   `json:"weight_kg"`
    CreatedAt  time.Time `json:"created_at"`
}
