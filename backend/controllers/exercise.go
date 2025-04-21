package controllers

import (
	"database/sql"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/guna3005/fitsync/db"
	"github.com/guna3005/fitsync/models"
)

func GetExercises(c *gin.Context) {
	rows, err := db.Conn.Query("SELECT id, muscle_group_id, name, description, COALESCE(video_url, '') FROM exercises")
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	defer rows.Close()
	var list []models.Exercise
	for rows.Next() {
		var e models.Exercise
		if err := rows.Scan(&e.ID, &e.MuscleGroupID, &e.Name, &e.Description, &e.VideoURL); err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
		list = append(list, e)
	}
	c.JSON(http.StatusOK, list)
}

func GetExerciseByID(c *gin.Context) {
	id := c.Param("id")
	row := db.Conn.QueryRow("SELECT id, muscle_group_id, name, description, COALESCE(video_url, '') FROM exercises WHERE id = ?", id)
	var e models.Exercise
	err := row.Scan(&e.ID, &e.MuscleGroupID, &e.Name, &e.Description, &e.VideoURL)
	if err != nil {
		if err == sql.ErrNoRows {
			c.JSON(http.StatusNotFound, gin.H{"error": "exercise not found"})
		} else {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		}
		return
	}
	c.JSON(http.StatusOK, e)
}
