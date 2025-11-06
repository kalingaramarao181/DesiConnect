const ENV = {
    development: {
      baseUrl: "http://localhost:5000/api",
    },
    production: {
      baseUrl: "https://your-live-api.com/api",
    },
  };
  
  const currentEnv = process.env.REACT_APP_ENV || "development";
  
  export const baseUrl = ENV[currentEnv].baseUrl;

  export const baseUrlImg = `http://localhost:5000`;
  