import users from './users';


function register(server) {
  const routes = [users];
  routes.forEach((item) => {
    server.route(item);
  });
}

const name = 'blog';

export { register, name };
