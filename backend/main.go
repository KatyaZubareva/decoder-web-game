// main.go

package main

import (
	"net/http"

	"github.com/gorilla/mux"
)

func main() {
	router := mux.NewRouter()

	router.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {})

	http.ListenAndServe(":8000", router)
}
