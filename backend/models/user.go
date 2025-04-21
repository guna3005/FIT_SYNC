package models

import "time"

type User struct {
    ID        int       `json:"id"`
    Name      string    `json:"name"`
    HeightCM  float64   `json:"height_cm"`
    WeightKG  float64   `json:"weight_kg"`
    CreatedAt time.Time `json:"created_at"`
}
