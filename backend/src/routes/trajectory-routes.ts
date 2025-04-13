import express, { Request, Response } from "express";
import {
  getAllAirports,
  getAllTrajectories,
} from "../services/trajectory-service";

const router = express.Router();

router.get("/", (req: Request, res: Response) => {
  const { departure, arrival, startTime, endTime } = req.query;

  const all = getAllTrajectories();

  const filtered = all.filter((traj) => {
    const matchesAdep =
      !departure || traj.adep === String(departure).toUpperCase();
    const matchesAdes = !arrival || traj.ades === String(arrival).toUpperCase();

    let matchesTime = true;
    if (startTime || endTime) {
      const startIso = startTime ? String(startTime) : undefined;
      const endIso = endTime ? String(endTime) : undefined;

      const firstWaypoint = traj.waypoints[0];
      const lastWaypoint = traj.waypoints[traj.waypoints.length - 1];

      // A trajectory overlaps with the time range if:
      // 1. The first waypoint time is before or equal to the end time (if specified)
      // 2. The last waypoint time is after or equal to the start time (if specified)
      matchesTime =
        (!endIso || firstWaypoint.time <= endIso) &&
        (!startIso || lastWaypoint.time >= startIso);
    }

    return matchesAdep && matchesAdes && matchesTime;
  });

  res.json(filtered);
});

router.get("/airports", (req: Request, res: Response) => {
  const airports = getAllAirports();
  res.json(airports);
});

export default router;
