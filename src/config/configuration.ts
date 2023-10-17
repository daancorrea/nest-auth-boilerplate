import 'dotenv/config';
export default () => {
  const envVariables = {
    PORT: null,
    MONGO_URI: null,
    JWT_EXPIRATION: null,
    FRONTEND_URL: null,
  };

  Object.keys(envVariables).forEach((x) => {
    if (process.env[x]) {
      envVariables[x] = process.env[x];
    } else {
      throw new Error(`A variável de ambiente ${x} não foi carregada.`);
    }
  });
  return envVariables;
};
