const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000';

export const fetchVehicles = async () => {
  const response = await fetch(`${API_URL}/vehicles`);
  return response.json();
};

export const fetchTelemetry = async (vehicleId) => {
  const response = await fetch(`${API_URL}/telemetry/${vehicleId}?limit=30`);
  return response.json();
};

export const postTelemetry = async (data) => {
  const response = await fetch(`${API_URL}/telemetry`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  return response.json();
};

export const fetchAlerts = async () => {
  const response = await fetch(`${API_URL}/alerts`);
  return response.json();
};

export const fetchMaintenance = async () => {
  const response = await fetch(`${API_URL}/maintenance`);
  return response.json();
};
