import Glue from 'glue';
import Manifest from './config/manifest';

const options = {
  relativeTo: __dirname,
};

const manifest = Manifest.defaultGet('/');
async function startServer() {
  try {
    const server = await Glue.compose(manifest, options);
    await server.start();
  } catch (err) {
    process.exit(1);
  }
}

startServer();
