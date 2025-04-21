package controllers

import (
	"net/http"
	"strconv"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/guna3005/fitsync/db"
	"github.com/guna3005/fitsync/models"
)

func GetUserFoodLogs(c *gin.Context) {
	userID := c.Param("id")
	rows, err := db.Conn.Query(
		"SELECT id, user_id, food_item_id, quantity, log_date, created_at FROM user_food_logs WHERE user_id = ? ORDER BY log_date",
		userID,
	)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	defer rows.Close()
	var list []models.UserFoodLog
	for rows.Next() {
		var l models.UserFoodLog
		if err := rows.Scan(&l.ID, &l.UserID, &l.FoodItemID, &l.Quantity, &l.LogDate, &l.CreatedAt); err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
		list = append(list, l)
	}
	c.JSON(http.StatusOK, list)
}

func CreateUserFoodLog(c *gin.Context) {
	userID, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid user ID"})
		return
	}
	var input struct {
		FoodItemID int     `json:"food_item_id"`
		Quantity   float64 `json:"quantity"`
		LogDate    string  `json:"log_date"`
	}
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	date, err := time.Parse("2006-01-02", input.LogDate)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid date format"})
		return
	}
	res, err := db.Conn.Exec(
		"INSERT INTO user_food_logs (user_id, food_item_id, quantity, log_date) VALUES (?, ?, ?, ?)",
		userID, input.FoodItemID, input.Quantity, date,
	)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	id, _ := res.LastInsertId()
	c.JSON(http.StatusCreated, gin.H{"id": id})
}

func GetUserExerciseLogs(c *gin.Context) {
	userID := c.Param("id")
	rows, err := db.Conn.Query(
		"SELECT id, user_id, exercise_id, log_date, set_number, reps, weight_kg, created_at FROM user_exercise_logs WHERE user_id = ? ORDER BY log_date",
		userID,
	)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	defer rows.Close()
	var list []models.UserExerciseLog
	for rows.Next() {
		var l models.UserExerciseLog
		if err := rows.Scan(&l.ID, &l.UserID, &l.ExerciseID, &l.LogDate, &l.SetNumber, &l.Reps, &l.WeightKG, &l.CreatedAt); err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
		list = append(list, l)
	}
	c.JSON(http.StatusOK, list)
}

func CreateUserExerciseLog(c *gin.Context) {
	userID, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid user ID"})
		return
	}
	var input struct {
		ExerciseID int     `json:"exercise_id"`
		LogDate    string  `json:"log_date"`
		SetNumber  int     `json:"set_number"`
		Reps       int     `json:"reps"`
		WeightKG   float64 `json:"weight_kg"`
	}
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	date, err := time.Parse("2006-01-02", input.LogDate)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid date format"})
		return
	}
	res, err := db.Conn.Exec(
		"INSERT INTO user_exercise_logs (user_id, exercise_id, log_date, set_number, reps, weight_kg) VALUES (?, ?, ?, ?, ?, ?)",
		userID, input.ExerciseID, date, input.SetNumber, input.Reps, input.WeightKG,
	)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	id, _ := res.LastInsertId()
	c.JSON(http.StatusCreated, gin.H{"id": id})
}
