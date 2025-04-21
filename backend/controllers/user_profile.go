package controllers

import (
	"database/sql"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/guna3005/fitsync/db"
)

func GetUserBMI(c *gin.Context) {
	userID, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid user ID"})
		return
	}
	row := db.Conn.QueryRow("SELECT height_cm, weight_kg FROM users WHERE id = ?", userID)
	var height, weight float64
	err = row.Scan(&height, &weight)
	if err != nil {
		if err == sql.ErrNoRows {
			c.JSON(http.StatusNotFound, gin.H{"error": "user not found"})
		} else {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		}
		return
	}
	bmi := weight / ((height / 100) * (height / 100))
	c.JSON(http.StatusOK, gin.H{"user_id": userID, "bmi": bmi})
}
