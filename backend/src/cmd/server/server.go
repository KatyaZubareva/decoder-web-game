// src/cmd/server/server.go
package server

import (
	"github.com/katyazubareva/course-project/src/internal/db/postgresql"
	"github.com/katyazubareva/course-project/src/http-server/middleware"
)

connect()

func main() {
	router.POST("/api/login")
	router.POST("/api/register")

	router.POST("/api/create_game")
	router.POST("/api/join_game")
	router.POST("/api/get_game_state")
	router.POST("/api/submit_hint")
	router.POST("/api/submit_guess")
}