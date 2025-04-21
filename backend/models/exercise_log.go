package models

import "time"

type UserFoodLog struct {
    ID         int       `json:"id"`
    UserID     int       `json:"user_id"`
    FoodItemID int       `json:"food_item_id"`
    Quantity   float64   `json:"quantity"`
    LogDate    time.Time `json:"log_date"`
    CreatedAt  time.Time `json:"created_at"`
}
