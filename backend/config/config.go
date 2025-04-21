package config

import "os"

type Config struct {
	DBUser string
	DBPass string
	DBHost string
	DBName string
	Port   string
}

func Load() Config {
	return Config{
		DBUser: env("DB_USER", "root"),
		DBPass: env("DB_PASS", "12345678"),
		DBHost: env("DB_HOST", "127.0.0.1:3306"),
		DBName: env("DB_NAME", "fitsync"),
		Port:   env("PORT", "8080"),
	}
}

func env(key, fallback string) string {
	if v := os.Getenv(key); v != "" {
		return v
	}
	return fallback
}
