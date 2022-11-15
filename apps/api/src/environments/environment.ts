export const environment = {
  production: false,
  mongodb_uri: `mongodb://${process.env.MONGO_HOST}/${process.env.MONGO_DATABASE}?retryWrites=true&w=majority`
};
