// src/internal/http-server/handlers/auth.go

package handlers

type User struct {
	Login    string `json:"login,omitempty"`
	Password string `json:"password,omitempty"`
}

var users []User
