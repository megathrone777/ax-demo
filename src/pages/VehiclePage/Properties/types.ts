export interface TVehicleProps {
  avg_speed: number;
  local_goalpoint_radius: number;
  max_steer_angle: number;
  path_fix_radius: number;
  path_num: number;
  path_per_square_angle: number;
  path_step: number;
  square_angle_limit: number;
  square_map_size_x: number;
  square_map_size_y: number;
  square_size_x: number;
  square_size_y: number;
  vehicle_wheel_base: number;
  vehicle_wheel_width: number;
  wheel_turn_rate: number;
}

export interface TProps {
  id: number;
  ip_addr: string;
  position: TVehicle["data"]["position"];
}
