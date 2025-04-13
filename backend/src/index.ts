import express from 'express';
import trajectoryRoutes from './routes/trajectory-routes';
import cors from 'cors';
import { loadTrajectories } from './services/trajectory-service';

const app = express();
const PORT = 8080;

app.use(cors());
app.use(express.json());
app.use('/api/trajectories', trajectoryRoutes);

loadTrajectories().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
  });
});
