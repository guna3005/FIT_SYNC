package main

import (
	"log"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/guna3005/fitsync/config"
	"github.com/guna3005/fitsync/db"
	"github.com/guna3005/fitsync/routes"
)

func main() {
	// load config & init DB
	cfg := config.Load()
	database, err := db.Init(cfg)
	if err != nil {
		log.Fatalf("db error: %v", err)
	}
	defer database.Close()

	// create router
	router := gin.Default()

	// CORS config: allow your React dev origin
	router.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:3000"},
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Accept"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
		MaxAge:           12 * time.Hour,
	}))

	// wire up your routes
	routes.Setup(router)

	log.Printf("Listening on :%s\n", cfg.Port)
	router.Run(":" + cfg.Port)
}
