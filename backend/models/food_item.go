package models

type FoodItem struct {
    ID              int     `json:"id"`
    Name            string  `json:"name"`
    ServingSize     string  `json:"serving_size"`
    CaloriesPerServ int     `json:"calories_per_serv"`
    ProteinG        float64 `json:"protein_g"`
    CarbsG          float64 `json:"carbs_g"`
    FatG            float64 `json:"fat_g"`
}
