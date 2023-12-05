export interface TagScanData {
  id: string;
  deviceId: string;
  name: string;
  rssi: number;
  deviceType: string;
  timestamp: number;
  antenna?: string;
  scanDevice: string;
}
