// src/internal/db/postgresql/db.go

package postgresql

import (
	"log"
	"os"

	"github.com/joho/godotenv"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var DB *gorm.DB

func connect() {
	err := godotenv.Load()

	if err != nil {
		log.Fatal("Failed to connect to database:", err)
	}

	dsn := os.Getenv("db_path")

	DB, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})

	if err != nil {
		log.Fatal("Failed to connect to database:", err)
	}

	log.Println("Successful connection to database!")
}
