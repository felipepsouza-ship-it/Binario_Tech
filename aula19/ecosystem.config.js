module.exports = {
  apps: [
    {
      name: "api-telemetria",
      script: "./server.js",
      max_memory_restart: "100M",
      env: {
        NODE_ENV: "development",
        PORT: 3000,
        DB_HOST: "localhost",
        LOG_LEVEL: "debug"
      },
      env_production: {
        NODE_ENV: "production",
        PORT: 8080,
        DB_HOST: "prod-db.binario.internal",
        LOG_LEVEL: "info"
      }
    }
  ]
};
