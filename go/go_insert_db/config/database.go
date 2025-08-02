package config

import (
	"database/sql"
	"fmt"
	"os"

	_ "github.com/lib/pq"
)
var db *sql.DB

type DBConfig struct {
	Host     string
	User     string
	DBName   string
	Password string
	Port     string
}

func BuildDBConfig() *DBConfig {
	dbConfig := DBConfig{
		Host:     os.Getenv("DB_HOST"),
		User:     os.Getenv("DB_USER"),
		Password: os.Getenv("DB_PASSWORD"),
		DBName:   os.Getenv("DB_NAME"),
		Port:     os.Getenv("DB_PORT"),
	}
	return &dbConfig
}

func DbURL(dbConfig *DBConfig) string {
	return fmt.Sprintf("host=%s port=%s user=%s password=%s dbname=%s sslmode=disable",
        dbConfig.Host,
		dbConfig.Port,
		dbConfig.User,
		dbConfig.Password,
		dbConfig.DBName,
	)
}

func SetupDB() (*sql.DB, error) {
	dbDriver := "postgres"
	var err error
	db, err = sql.Open(dbDriver, DbURL(BuildDBConfig()))
	return db, err
}