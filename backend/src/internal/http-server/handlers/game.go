// src/internal/http-server/handlers/game.go

package handlers

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

type Game struct {
	ID       string `json:"game_id"`
	Password string `json:"password"`
	Time     string `json:"phase_end_time"`
}

func get_game_state(c *gin.Context) {
	c.IndentedJSON(http.StatusOK, game)
}
