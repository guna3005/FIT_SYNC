package routes

import (
    "github.com/gin-gonic/gin"
    "github.com/guna3005/fitsync/controllers"
)

func Setup(router *gin.Engine) {
    router.GET("/exercises", controllers.GetExercises)
    router.GET("/exercises/:id", controllers.GetExerciseByID)

    router.GET("/food-items", controllers.GetFoodItems)
    router.GET("/food-items/:id", controllers.GetFoodItemByID)

    router.GET("/users/:id/food-logs", controllers.GetUserFoodLogs)
    router.POST("/users/:id/food-logs", controllers.CreateUserFoodLog)

    router.GET("/users/:id/exercise-logs", controllers.GetUserExerciseLogs)
    router.POST("/users/:id/exercise-logs", controllers.CreateUserExerciseLog)

    router.GET("/users/:id/bmi", controllers.GetUserBMI)
}
