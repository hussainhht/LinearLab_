package main

import (
	"fmt"
	"log"
	"net/http"
	"os"
	"path/filepath"
)

func main() {
	// Get the current directory
	dir, err := os.Getwd()
	if err != nil {
		log.Fatal(err)
	}

	// Set the web directory path
	webDir := filepath.Join(dir, "web")
	tempDir := filepath.Join(webDir, "temp")

	// Check if web directory exists
	if _, err := os.Stat(webDir); os.IsNotExist(err) {
		log.Fatal("Web directory not found. Please make sure 'web' folder exists.")
	}

	// Serve static files from web directory
	fs := http.FileServer(http.Dir(webDir))
	http.Handle("/style/", fs)
	http.Handle("/js/", fs)
	http.Handle("/data/", fs)

	// Serve HTML pages from temp directory
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		if r.URL.Path == "/" {
			http.ServeFile(w, r, filepath.Join(tempDir, "index.html"))
			return
		}

		// Remove leading slash from path
		path := r.URL.Path[1:]

		// If it's an HTML file request, serve from temp directory
		if filepath.Ext(path) == ".html" || filepath.Ext(path) == "" {
			if filepath.Ext(path) == "" {
				path = path + ".html"
			}
			filePath := filepath.Join(tempDir, filepath.Base(path))

			// Check if file exists
			if _, err := os.Stat(filePath); err == nil {
				http.ServeFile(w, r, filePath)
				return
			}
		}

		// For other files, try to serve from web directory
		filePath := filepath.Join(webDir, path)
		if _, err := os.Stat(filePath); err == nil {
			http.ServeFile(w, r, filePath)
			return
		}

		// File not found
		http.NotFound(w, r)
	})

	// Define the port
	port := "8080"
	if envPort := os.Getenv("PORT"); envPort != "" {
		port = envPort
	}

	fmt.Println("🎓 LinearLab Server Starting...")
	fmt.Println("📂 Serving from:", webDir)
	fmt.Println("🌐 Server running at: http://localhost:" + port)
	fmt.Println("📄 Pages available:")
	fmt.Println("   - http://localhost:" + port + " (Matrix Tools)")
	fmt.Println("   - http://localhost:" + port + "/learn.html (Learning Platform)")
	fmt.Println("   - http://localhost:" + port + "/practice.html (Practice Sets)")
	fmt.Println("   - http://localhost:" + port + "/vector_space.html (Vector Spaces)")
	fmt.Println("\n✨ Press Ctrl+C to stop the server\n")

	// Start the server
	log.Fatal(http.ListenAndServe(":"+port, nil))
}
