import app from './src/app.js';

import { PORT } from './src/config/env.config.js';

app.listen(PORT, () => {
  console.log('Server listening on port', PORT);
});