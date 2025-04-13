import { z } from "zod";

export const WaypointSchema = z.object({
  longitude: z.number(),
  latitude: z.number(),
  altitude: z.number(),
  time: z.string().datetime(),
  name: z.string(),
});

export const TrajectorySchema = z.object({
  id: z.number(),
  adep: z.string(),
  ades: z.string(),
  waypoints: z.array(WaypointSchema),
});

export type Waypoint = z.infer<typeof WaypointSchema>;
export type Trajectory = z.infer<typeof TrajectorySchema>;

export enum AirportType {
  DEPARTURE = "departure",
  ARRIVAL = "arrival",
  BOTH = "both",
}

export interface Airports {
  code: string;
  count: number;
  type: AirportType;
}
