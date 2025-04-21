package controllers

import (
	"database/sql"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/guna3005/fitsync/db"
	"github.com/guna3005/fitsync/models"
)

func GetFoodItems(c *gin.Context) {
	rows, err := db.Conn.Query("SELECT id, name, serving_size, calories_per_serv, protein_g, carbs_g, fat_g FROM food_items")
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	defer rows.Close()
	var list []models.FoodItem
	for rows.Next() {
		var f models.FoodItem
		if err := rows.Scan(&f.ID, &f.Name, &f.ServingSize, &f.CaloriesPerServ, &f.ProteinG, &f.CarbsG, &f.FatG); err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
		list = append(list, f)
	}
	c.JSON(http.StatusOK, list)
}

func GetFoodItemByID(c *gin.Context) {
	id := c.Param("id")
	row := db.Conn.QueryRow("SELECT id, name, serving_size, calories_per_serv, protein_g, carbs_g, fat_g FROM food_items WHERE id = ?", id)
	var f models.FoodItem
	err := row.Scan(&f.ID, &f.Name, &f.ServingSize, &f.CaloriesPerServ, &f.ProteinG, &f.CarbsG, &f.FatG)
	if err != nil {
		if err == sql.ErrNoRows {
			c.JSON(http.StatusNotFound, gin.H{"error": "food item not found"})
		} else {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		}
		return
	}
	c.JSON(http.StatusOK, f)
}
