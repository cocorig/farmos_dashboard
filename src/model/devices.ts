export interface DataOption extends DeviceData {
  data_name: string;
}

export interface DeviceProps {
  device_name: string;
  data_options: DataOption[];
}

export type DeviceData = {
  unit: string;
  nvalue: number;
  obs_time: string;
};
