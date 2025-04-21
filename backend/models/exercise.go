package models

type Exercise struct {
    ID            int    `json:"id"`
    MuscleGroupID int    `json:"muscle_group_id"`
    Name          string `json:"name"`
    Description   string `json:"description"`
    VideoURL      string `json:"video_url"`
}

type MuscleGroup struct {
    ID          int    `json:"id"`
    Name        string `json:"name"`
    Description string `json:"description"`
}
