import React, { useState, useEffect, useMemo } from 'react';
import { LineChart, Line, BarChart, Bar, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ScatterChart, Scatter } from 'recharts';
import { Truck, AlertTriangle, Activity, Gauge, Thermometer, Droplets, Battery, MapPin, CheckCircle, Download, Wifi, Play, Pause, Wrench, Brain, Clock, TrendingUp, Settings, Users, FileText, Calendar, Map, Zap, Shield, BarChart3, Filter, Search, Bell, ChevronDown, Maximize2, DollarSign, Package, Route, Fuel, Eye, RefreshCw, Target, AlertCircle, Info, X, Plus, Edit, Trash2, Upload, Share2, CircleDot } from 'lucide-react';

// Mock API with expanded data
const mockAPI = {
  fetchVehicles: async () => ([
    { vehicleId: 'VH-001', name: 'Truck Alpha', status: 'active', health: 94, location: 'Route 66, AZ', driver: 'John Smith', mileage: 45230, fuelEfficiency: 8.2, cargo: 'Electronics', cargoWeight: 18000, lastMaintenance: '2025-09-15', nextMaintenance: '2025-11-15', lat: 35.1983, lng: -111.6513 },
    { vehicleId: 'VH-002', name: 'Truck Beta', status: 'active', health: 88, location: 'I-95 North, NC', driver: 'Sarah Johnson', mileage: 38450, fuelEfficiency: 7.8, cargo: 'Furniture', cargoWeight: 22000, lastMaintenance: '2025-09-01', nextMaintenance: '2025-11-01', lat: 35.7796, lng: -78.6382 },
    { vehicleId: 'VH-003', name: 'Truck Gamma', status: 'warning', health: 76, location: 'Highway 101, CA', driver: 'Mike Davis', mileage: 52100, fuelEfficiency: 6.5, cargo: 'Food Products', cargoWeight: 19500, lastMaintenance: '2025-08-10', nextMaintenance: '2025-10-10', lat: 37.7749, lng: -122.4194 },
    { vehicleId: 'VH-004', name: 'Truck Delta', status: 'active', health: 92, location: 'I-10 West, TX', driver: 'Emma Wilson', mileage: 41200, fuelEfficiency: 8.5, cargo: 'Auto Parts', cargoWeight: 16000, lastMaintenance: '2025-09-20', nextMaintenance: '2025-11-20', lat: 29.7604, lng: -95.3698 },
    { vehicleId: 'VH-005', name: 'Truck Epsilon', status: 'maintenance', health: 65, location: 'Service Center, FL', driver: 'N/A', mileage: 58900, fuelEfficiency: 5.8, cargo: 'N/A', cargoWeight: 0, lastMaintenance: '2025-10-01', nextMaintenance: '2025-10-05', lat: 25.7617, lng: -80.1918 },
    { vehicleId: 'VH-006', name: 'Truck Zeta', status: 'active', health: 91, location: 'I-80 East, NE', driver: 'Tom Brown', mileage: 44100, fuelEfficiency: 8.0, cargo: 'Machinery', cargoWeight: 21000, lastMaintenance: '2025-09-12', nextMaintenance: '2025-11-12', lat: 41.2565, lng: -95.9345 }
  ]),
  
  fetchAlerts: async () => ([
    { alertId: 'A-001', vehicleId: 'VH-003', title: 'Low Brake Pressure', message: 'Brake system pressure below threshold', severity: 'high', timestamp: '2 min ago', acknowledged: false },
    { alertId: 'A-002', vehicleId: 'VH-002', title: 'Tire Pressure Warning', message: 'Front left tire pressure low', severity: 'medium', timestamp: '15 min ago', acknowledged: false },
    { alertId: 'A-003', vehicleId: 'VH-005', title: 'Scheduled Maintenance Due', message: 'Oil change required within 500 miles', severity: 'low', timestamp: '1 hour ago', acknowledged: true },
    { alertId: 'A-004', vehicleId: 'VH-003', title: 'Engine Temperature High', message: 'Engine temp approaching critical', severity: 'high', timestamp: '5 min ago', acknowledged: false },
    { alertId: 'A-005', vehicleId: 'VH-001', title: 'Route Delay Predicted', message: 'Traffic congestion ahead', severity: 'low', timestamp: '30 min ago', acknowledged: true }
  ]),
  
  fetchMaintenance: async () => ([
    { id: 'M-001', vehicleId: 'VH-001', type: 'Oil Change', scheduled: '2025-11-15', status: 'scheduled', cost: 150, estimatedDuration: '2 hours', priority: 'normal' },
    { id: 'M-002', vehicleId: 'VH-003', type: 'Brake Inspection', scheduled: '2025-10-05', status: 'urgent', cost: 350, estimatedDuration: '4 hours', priority: 'high' },
    { id: 'M-003', vehicleId: 'VH-005', type: 'Transmission Service', scheduled: '2025-10-03', status: 'in-progress', cost: 800, estimatedDuration: '6 hours', priority: 'high' },
    { id: 'M-004', vehicleId: 'VH-002', type: 'Tire Rotation', scheduled: '2025-10-20', status: 'scheduled', cost: 80, estimatedDuration: '1 hour', priority: 'normal' },
    { id: 'M-005', vehicleId: 'VH-004', type: 'Annual Inspection', scheduled: '2025-10-25', status: 'scheduled', cost: 200, estimatedDuration: '3 hours', priority: 'normal' },
    { id: 'M-006', vehicleId: 'VH-006', type: 'Battery Check', scheduled: '2025-11-12', status: 'scheduled', cost: 50, estimatedDuration: '30 min', priority: 'low' }
  ]),
  
  fetchRouteData: async () => ([
    { id: 1, vehicleId: 'VH-001', route: 'Phoenix to Las Vegas', distance: 245, eta: '3:45 PM', progress: 65, delays: 0, fuelStops: 1 },
    { id: 2, vehicleId: 'VH-002', route: 'Raleigh to Boston', distance: 680, eta: '11:30 PM', progress: 45, delays: 15, fuelStops: 2 },
    { id: 3, vehicleId: 'VH-004', route: 'Houston to Dallas', distance: 240, eta: '6:30 PM', progress: 30, delays: 0, fuelStops: 0 },
    { id: 4, vehicleId: 'VH-006', route: 'Omaha to Chicago', distance: 470, eta: '9:15 PM', progress: 55, delays: 20, fuelStops: 1 }
  ]),
  
  fetchAnalytics: async () => ({
    totalMiles: 235980,
    avgFuelEfficiency: 7.5,
    totalAlerts: 12,
    activeVehicles: 5,
    maintenanceCost: 2350,
    uptime: 96.5,
    totalRevenue: 145800,
    avgDeliveryTime: 4.2,
    onTimeDelivery: 94.3,
    costPerMile: 1.85
  }),

  fetchDrivers: async () => ([
    { id: 'D-001', name: 'John Smith', vehicleId: 'VH-001', status: 'active', hoursToday: 6.5, hoursWeek: 42, rating: 4.8, completedTrips: 245 },
    { id: 'D-002', name: 'Sarah Johnson', vehicleId: 'VH-002', status: 'active', hoursToday: 7.2, hoursWeek: 45, rating: 4.9, completedTrips: 312 },
    { id: 'D-003', name: 'Mike Davis', vehicleId: 'VH-003', status: 'active', hoursToday: 5.8, hoursWeek: 38, rating: 4.6, completedTrips: 198 },
    { id: 'D-004', name: 'Emma Wilson', vehicleId: 'VH-004', status: 'active', hoursToday: 6.0, hoursWeek: 40, rating: 4.9, completedTrips: 287 },
    { id: 'D-005', name: 'Tom Brown', vehicleId: 'VH-006', status: 'active', hoursToday: 7.5, hoursWeek: 46, rating: 4.7, completedTrips: 256 }
  ]),

  fetchInventory: async () => ([
    { id: 'I-001', cargo: 'Electronics', weight: 18000, value: 125000, destination: 'Las Vegas', status: 'in-transit', vehicleId: 'VH-001' },
    { id: 'I-002', cargo: 'Furniture', weight: 22000, value: 45000, destination: 'Boston', status: 'in-transit', vehicleId: 'VH-002' },
    { id: 'I-003', cargo: 'Auto Parts', weight: 16000, value: 85000, destination: 'Dallas', status: 'in-transit', vehicleId: 'VH-004' },
    { id: 'I-004', cargo: 'Machinery', weight: 21000, value: 95000, destination: 'Chicago', status: 'in-transit', vehicleId: 'VH-006' }
  ])
};

const FleetDigitalTwin = () => {
  // Core State
  const [vehicles, setVehicles] = useState([]);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [telemetryData, setTelemetryData] = useState([]);
  const [activeTab, setActiveTab] = useState('overview');
  const [alerts, setAlerts] = useState([]);
  const [isStreaming, setIsStreaming] = useState(true);
  const [maintenanceSchedule, setMaintenanceSchedule] = useState([]);
  const [routeData, setRouteData] = useState([]);
  const [analytics, setAnalytics] = useState(null);
  const [drivers, setDrivers] = useState([]);
  const [inventory, setInventory] = useState([]);
  
  // UI State
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showNotifications, setShowNotifications] = useState(false);
  const [viewMode, setViewMode] = useState('grid');
  const [selectedTimeRange, setSelectedTimeRange] = useState('24h');
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [expandedChart, setExpandedChart] = useState(null);
  
  // Historical Data
  const [historicalData, setHistoricalData] = useState([]);
  const [fuelTrends, setFuelTrends] = useState([]);
  const [performanceMetrics, setPerformanceMetrics] = useState([]);

  useEffect(() => {
    loadInitialData();
    generateHistoricalData();
  }, []);

  const loadInitialData = async () => {
    try {
      const [vehiclesData, alertsData, maintenanceData, routes, analyticsData, driversData, inventoryData] = await Promise.all([
        mockAPI.fetchVehicles(),
        mockAPI.fetchAlerts(),
        mockAPI.fetchMaintenance(),
        mockAPI.fetchRouteData(),
        mockAPI.fetchAnalytics(),
        mockAPI.fetchDrivers(),
        mockAPI.fetchInventory()
      ]);
      
      setVehicles(vehiclesData);
      if (vehiclesData.length > 0) setSelectedVehicle(vehiclesData[0]);
      setAlerts(alertsData);
      setMaintenanceSchedule(maintenanceData);
      setRouteData(routes);
      setAnalytics(analyticsData);
      setDrivers(driversData);
      setInventory(inventoryData);
    } catch (error) {
      console.error('Error loading data:', error);
    }
  };

  const generateHistoricalData = () => {
    const historical = [];
    const fuel = [];
    const performance = [];
    
    for (let i = 0; i < 24; i++) {
      const hour = `${i}:00`;
      historical.push({
        hour,
        avgSpeed: Math.random() * 30 + 40,
        fuelConsumption: Math.random() * 5 + 5,
        alerts: Math.floor(Math.random() * 3),
        efficiency: Math.random() * 2 + 7
      });
      
      fuel.push({
        hour,
        consumption: Math.random() * 8 + 5,
        cost: Math.random() * 40 + 20,
        efficiency: Math.random() * 3 + 6
      });
      
      performance.push({
        hour,
        uptime: Math.random() * 10 + 90,
        utilization: Math.random() * 20 + 70,
        productivity: Math.random() * 15 + 80
      });
    }
    
    setHistoricalData(historical);
    setFuelTrends(fuel);
    setPerformanceMetrics(performance);
  };

  // Real-time telemetry streaming
  useEffect(() => {
    if (!isStreaming || !selectedVehicle) return;
    
    const interval = setInterval(() => {
      const newDataPoint = {
        vehicleId: selectedVehicle.vehicleId,
        time: new Date().toLocaleTimeString(),
        timestamp: Date.now(),
        speed: Math.random() * 80 + 20,
        engineTemp: Math.random() * 30 + 70,
        fuelLevel: Math.random() * 40 + 40,
        battery: Math.random() * 20 + 75,
        rpm: Math.random() * 2000 + 1000,
        oilPressure: Math.random() * 20 + 40,
        coolantTemp: Math.random() * 20 + 80,
        tirePressure: Math.random() * 5 + 30,
        throttle: Math.random() * 100,
        brakeTemp: Math.random() * 50 + 100
      };
      setTelemetryData(prev => [...prev.slice(-29), newDataPoint]);
    }, 2000);
    
    return () => clearInterval(interval);
  }, [isStreaming, selectedVehicle]);

  // Utility Functions
  const getStatusColor = (status) => {
    const colors = {
      active: 'bg-green-500',
      warning: 'bg-yellow-500',
      maintenance: 'bg-orange-500',
      offline: 'bg-gray-500'
    };
    return colors[status] || 'bg-gray-500';
  };

  const getHealthColor = (health) => {
    if (health >= 90) return 'text-green-400';
    if (health >= 75) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getSeverityColor = (severity) => {
    const colors = {
      high: 'border-red-500 bg-red-900/50',
      medium: 'border-yellow-500 bg-yellow-900/50',
      low: 'border-blue-500 bg-blue-900/50'
    };
    return colors[severity] || 'border-gray-500 bg-gray-900/50';
  };

  const getSeverityBadgeColor = (severity) => {
    const colors = {
      high: 'bg-red-500',
      medium: 'bg-yellow-500',
      low: 'bg-blue-500'
    };
    return colors[severity] || 'bg-gray-500';
  };

  // Filtered and computed data
  const filteredVehicles = useMemo(() => {
    return vehicles.filter(v => {
      const matchesSearch = v.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           v.vehicleId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           v.driver?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter = filterStatus === 'all' || v.status === filterStatus;
      return matchesSearch && matchesFilter;
    });
  }, [vehicles, searchTerm, filterStatus]);

  const unacknowledgedAlerts = useMemo(() => 
    alerts.filter(a => !a.acknowledged), [alerts]
  );

  const urgentMaintenance = useMemo(() => 
    maintenanceSchedule.filter(m => m.status === 'urgent' || m.status === 'in-progress'), 
    [maintenanceSchedule]
  );

  const latest = telemetryData[telemetryData.length - 1] || {};
  
  const diagnostics = [
    { component: 'Engine', health: 94, status: 'optimal', lastCheck: '2 days ago', nextCheck: '28 days', temperature: latest.engineTemp || 85, pressure: latest.oilPressure || 45 },
    { component: 'Transmission', health: 88, status: 'good', lastCheck: '5 days ago', nextCheck: '25 days', temperature: 75, pressure: 52 },
    { component: 'Brakes', health: 76, status: 'warning', lastCheck: '1 day ago', nextCheck: '3 days', temperature: latest.brakeTemp || 150, pressure: 48 },
    { component: 'Cooling System', health: 91, status: 'optimal', lastCheck: '3 days ago', nextCheck: '27 days', temperature: latest.coolantTemp || 90, pressure: 38 },
    { component: 'Electrical', health: 85, status: 'good', lastCheck: '7 days ago', nextCheck: '23 days', temperature: 45, pressure: 42 }
  ];

  const fleetStatusData = [
    { name: 'Active', value: vehicles.filter(v => v.status === 'active').length, color: '#10b981' },
    { name: 'Warning', value: vehicles.filter(v => v.status === 'warning').length, color: '#f59e0b' },
    { name: 'Maintenance', value: vehicles.filter(v => v.status === 'maintenance').length, color: '#f97316' }
  ];

  const efficiencyComparison = vehicles.map(v => ({
    name: v.name.split(' ')[1],
    efficiency: v.fuelEfficiency,
    mileage: v.mileage / 1000
  }));

  // Render Functions
  const renderVehicleCard = (v) => (
    <div 
      key={v.vehicleId} 
      onClick={() => setSelectedVehicle(v)}
      className={`p-4 rounded-lg cursor-pointer transition-all hover:scale-105 ${
        selectedVehicle?.vehicleId === v.vehicleId 
          ? 'bg-gradient-to-br from-cyan-600 to-blue-600 shadow-lg ring-2 ring-cyan-400' 
          : 'bg-slate-800 hover:bg-slate-700'
      }`}
    >
      <div className="flex items-center justify-between mb-2">
        <Truck className="w-6 h-6" />
        <div className={`w-3 h-3 rounded-full ${getStatusColor(v.status)} animate-pulse`} />
      </div>
      <h3 className="font-semibold text-sm">{v.name}</h3>
      <p className="text-xs text-slate-300">{v.vehicleId}</p>
      <div className="mt-2 space-y-1">
        <div className="flex items-center justify-between text-xs">
          <span className="text-slate-400">Health:</span>
          <span className={`font-bold ${getHealthColor(v.health)}`}>{v.health}%</span>
        </div>
        <div className="flex items-center justify-between text-xs">
          <span className="text-slate-400">Driver:</span>
          <span className="text-slate-200 truncate ml-2">{v.driver}</span>
        </div>
        <div className="flex items-center justify-between text-xs">
          <span className="text-slate-400">MPG:</span>
          <span className="text-slate-200">{v.fuelEfficiency}</span>
        </div>
      </div>
    </div>
  );

  const renderOverviewTab = () => (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        <div className="bg-slate-800 rounded-lg p-4 border-l-4 border-green-500">
          <Activity className="w-6 h-6 text-green-400 mb-2" />
          <p className="text-xs text-slate-400">Active Vehicles</p>
          <p className="text-2xl font-bold">{analytics?.activeVehicles || 0}</p>
        </div>
        <div className="bg-slate-800 rounded-lg p-4 border-l-4 border-blue-500">
          <TrendingUp className="w-6 h-6 text-blue-400 mb-2" />
          <p className="text-xs text-slate-400">Total Miles</p>
          <p className="text-2xl font-bold">{(analytics?.totalMiles || 0).toLocaleString()}</p>
        </div>
        <div className="bg-slate-800 rounded-lg p-4 border-l-4 border-cyan-500">
          <Gauge className="w-6 h-6 text-cyan-400 mb-2" />
          <p className="text-xs text-slate-400">Avg Efficiency</p>
          <p className="text-2xl font-bold">{analytics?.avgFuelEfficiency || 0} MPG</p>
        </div>
        <div className="bg-slate-800 rounded-lg p-4 border-l-4 border-yellow-500">
          <AlertTriangle className="w-6 h-6 text-yellow-400 mb-2" />
          <p className="text-xs text-slate-400">Active Alerts</p>
          <p className="text-2xl font-bold">{unacknowledgedAlerts.length}</p>
        </div>
        <div className="bg-slate-800 rounded-lg p-4 border-l-4 border-purple-500">
          <DollarSign className="w-6 h-6 text-purple-400 mb-2" />
          <p className="text-xs text-slate-400">Revenue</p>
          <p className="text-2xl font-bold">${(analytics?.totalRevenue || 0).toLocaleString()}</p>
        </div>
        <div className="bg-slate-800 rounded-lg p-4 border-l-4 border-orange-500">
          <Target className="w-6 h-6 text-orange-400 mb-2" />
          <p className="text-xs text-slate-400">On-Time Rate</p>
          <p className="text-2xl font-bold">{analytics?.onTimeDelivery || 0}%</p>
        </div>
      </div>

      {/* Real-time Telemetry */}
      <div className="bg-slate-800 rounded-lg p-6 shadow-xl">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold flex items-center">
            <Activity className="w-5 h-5 mr-2 text-cyan-400" />
            Real-Time Telemetry - {selectedVehicle?.name || 'No Vehicle Selected'}
          </h3>
          <div className="flex gap-2">
            <button 
              onClick={() => setIsStreaming(!isStreaming)}
              className={`px-4 py-2 rounded flex items-center transition-colors ${
                isStreaming ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'
              }`}
            >
              {isStreaming ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
              {isStreaming ? 'Stop' : 'Start'}
            </button>
            <button className="px-4 py-2 rounded bg-slate-700 hover:bg-slate-600 flex items-center">
              <Download className="w-4 h-4 mr-2" />
              Export
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-6">
          <div className="bg-slate-700/50 rounded-lg p-4">
            <Gauge className="w-8 h-8 text-cyan-400 mb-2" />
            <p className="text-xs text-slate-400">Speed</p>
            <p className="text-2xl font-bold">{latest.speed?.toFixed(0) || 0} <span className="text-sm">mph</span></p>
          </div>
          <div className="bg-slate-700/50 rounded-lg p-4">
            <Thermometer className="w-8 h-8 text-orange-400 mb-2" />
            <p className="text-xs text-slate-400">Engine Temp</p>
            <p className="text-2xl font-bold">{latest.engineTemp?.toFixed(0) || 0}<span className="text-sm">°C</span></p>
          </div>
          <div className="bg-slate-700/50 rounded-lg p-4">
            <Droplets className="w-8 h-8 text-blue-400 mb-2" />
            <p className="text-xs text-slate-400">Fuel Level</p>
            <p className="text-2xl font-bold">{latest.fuelLevel?.toFixed(0) || 0}<span className="text-sm">%</span></p>
          </div>
          <div className="bg-slate-700/50 rounded-lg p-4">
            <Battery className="w-8 h-8 text-green-400 mb-2" />
            <p className="text-xs text-slate-400">Battery</p>
            <p className="text-2xl font-bold">{latest.battery?.toFixed(0) || 0}<span className="text-sm">%</span></p>
          </div>
          <div className="bg-slate-700/50 rounded-lg p-4">
            <Activity className="w-8 h-8 text-purple-400 mb-2" />
            <p className="text-xs text-slate-400">RPM</p>
            <p className="text-2xl font-bold">{latest.rpm?.toFixed(0) || 0}</p>
          </div>
          <div className="bg-slate-700/50 rounded-lg p-4">
            <Zap className="w-8 h-8 text-yellow-400 mb-2" />
            <p className="text-xs text-slate-400">Throttle</p>
            <p className="text-2xl font-bold">{latest.throttle?.toFixed(0) || 0}<span className="text-sm">%</span></p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h4 className="text-sm font-semibold mb-3 text-slate-300">Speed & Temperature</h4>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={telemetryData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="time" stroke="#94a3b8" fontSize={11} />
                <YAxis stroke="#94a3b8" fontSize={11} />
                <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '6px' }} />
                <Legend />
                <Line type="monotone" dataKey="speed" stroke="#06b6d4" strokeWidth={2} dot={false} name="Speed (mph)" />
                <Line type="monotone" dataKey="engineTemp" stroke="#f97316" strokeWidth={2} dot={false} name="Temp (°C)" />
              </LineChart>
            </ResponsiveContainer>
          </div>
          
          <div>
            <h4 className="text-sm font-semibold mb-3 text-slate-300">Fuel & Battery</h4>
            <ResponsiveContainer width="100%" height={250}>
              <AreaChart data={telemetryData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="time" stroke="#94a3b8" fontSize={11} />
                <YAxis stroke="#94a3b8" fontSize={11} />
                <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '6px' }} />
                <Legend />
                <Area type="monotone" dataKey="fuelLevel" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} name="Fuel (%)" />
                <Area type="monotone" dataKey="battery" stroke="#10b981" fill="#10b981" fillOpacity={0.6} name="Battery (%)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Diagnostics and Alerts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-slate-800 rounded-lg p-6 shadow-xl">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <Brain className="w-5 h-5 mr-2 text-cyan-400" />
            AI-Powered Diagnostics
          </h3>
          <div className="space-y-3">
            {diagnostics.map((d, i) => (
              <div key={i} className="bg-slate-700/50 rounded-lg p-4 hover:bg-slate-700 transition-colors">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold">{d.component}</span>
                  <div className="flex items-center gap-2">
                    <span className={`text-xs px-2 py-1 rounded ${
                      d.status === 'optimal' ? 'bg-green-500/20 text-green-400' :
                      d.status === 'good' ? 'bg-blue-500/20 text-blue-400' :
                      'bg-yellow-500/20 text-yellow-400'
                    }`}>
                      {d.status}
                    </span>
                    <span className={getHealthColor(d.health)}>{d.health}%</span>
                  </div>
                </div>
                <div className="w-full bg-slate-600 rounded-full h-2 mb-2">
                  <div 
                    className={`h-2 rounded-full transition-all ${
                      d.health >= 90 ? 'bg-green-500' : 
                      d.health >= 75 ? 'bg-yellow-500' : 
                      'bg-red-500'
                    }`} 
                    style={{ width: `${d.health}%` }} 
                  />
                </div>
                <div className="flex justify-between text-xs text-slate-400">
                  <span>Last: {d.lastCheck}</span>
                  <span>Next: {d.nextCheck}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-slate-800 rounded-lg p-6 shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold flex items-center">
              <AlertTriangle className="w-5 h-5 mr-2 text-yellow-400" />
              Active Alerts ({unacknowledgedAlerts.length})
            </h3>
            <button className="text-xs text-cyan-400 hover:text-cyan-300">View All</button>
          </div>
          {unacknowledgedAlerts.length === 0 ? (
            <div className="text-center py-12">
              <CheckCircle className="w-16 h-16 mx-auto mb-3 text-green-500" />
              <p className="text-slate-400 font-medium">All Systems Operational</p>
              <p className="text-xs text-slate-500 mt-1">No active alerts at this time</p>
            </div>
          ) : (
            <div className="space-y-3">
              {unacknowledgedAlerts.slice(0, 5).map((a) => (
                <div key={a.alertId} className={`border-l-4 p-4 rounded-r-lg ${getSeverityColor(a.severity)}`}>
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`px-2 py-0.5 text-xs rounded ${getSeverityBadgeColor(a.severity)}`}>
                          {a.severity}
                        </span>
                        <span className="text-xs text-slate-400">{a.timestamp}</span>
                      </div>
                      <p className="font-semibold text-sm">{a.title}</p>
                      <p className="text-xs text-slate-300 mt-1">{a.message}</p>
                      <p className="text-xs text-slate-500 mt-1">Vehicle: {a.vehicleId}</p>
                    </div>
                    <button className="text-slate-400 hover:text-slate-200">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const renderAnalyticsTab = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-slate-800 rounded-lg p-6 shadow-xl">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <CircleDot className="w-5 h-5 mr-2 text-cyan-400" />
            Fleet Status Distribution
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={fleetStatusData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {fleetStatusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-slate-800 rounded-lg p-6 shadow-xl">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <BarChart3 className="w-5 h-5 mr-2 text-cyan-400" />
            Fuel Efficiency Comparison
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={efficiencyComparison}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="name" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155' }} />
              <Legend />
              <Bar dataKey="efficiency" fill="#06b6d4" name="MPG" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-slate-800 rounded-lg p-6 shadow-xl">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <TrendingUp className="w-5 h-5 mr-2 text-cyan-400" />
            24-Hour Performance Trends
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={historicalData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="hour" stroke="#94a3b8" fontSize={10} />
              <YAxis stroke="#94a3b8" />
              <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155' }} />
              <Legend />
              <Line type="monotone" dataKey="avgSpeed" stroke="#06b6d4" strokeWidth={2} name="Avg Speed" />
              <Line type="monotone" dataKey="efficiency" stroke="#10b981" strokeWidth={2} name="Efficiency" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-slate-800 rounded-lg p-6 shadow-xl">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <Fuel className="w-5 h-5 mr-2 text-cyan-400" />
            Fuel Consumption & Cost
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={fuelTrends}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="hour" stroke="#94a3b8" fontSize={10} />
              <YAxis stroke="#94a3b8" />
              <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155' }} />
              <Legend />
              <Area type="monotone" dataKey="consumption" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.6} name="Consumption (gal)" />
              <Area type="monotone" dataKey="cost" stroke="#ef4444" fill="#ef4444" fillOpacity={0.6} name="Cost ($)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-lg p-6 shadow-xl">
          <Shield className="w-10 h-10 mb-3 opacity-80" />
          <p className="text-sm opacity-90">Fleet Uptime</p>
          <p className="text-3xl font-bold">{analytics?.uptime || 0}%</p>
          <p className="text-xs mt-2 opacity-75">+2.3% from last month</p>
        </div>

        <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg p-6 shadow-xl">
          <DollarSign className="w-10 h-10 mb-3 opacity-80" />
          <p className="text-sm opacity-90">Cost per Mile</p>
          <p className="text-3xl font-bold">${analytics?.costPerMile || 0}</p>
          <p className="text-xs mt-2 opacity-75">-0.15 from last month</p>
        </div>

        <div className="bg-gradient-to-br from-purple-600 to-purple-700 rounded-lg p-6 shadow-xl">
          <Clock className="w-10 h-10 mb-3 opacity-80" />
          <p className="text-sm opacity-90">Avg Delivery Time</p>
          <p className="text-3xl font-bold">{analytics?.avgDeliveryTime || 0}h</p>
          <p className="text-xs mt-2 opacity-75">-0.5h from last month</p>
        </div>
      </div>
    </div>
  );

  const renderMaintenanceTab = () => (
    <div className="space-y-6">
      <div className="bg-slate-800 rounded-lg p-6 shadow-xl">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold flex items-center">
            <Wrench className="w-5 h-5 mr-2 text-cyan-400" />
            Maintenance Schedule
          </h3>
          <button className="px-4 py-2 bg-cyan-600 hover:bg-cyan-700 rounded flex items-center text-sm">
            <Plus className="w-4 h-4 mr-2" />
            Schedule Maintenance
          </button>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {maintenanceSchedule.map((m) => (
            <div key={m.id} className={`p-4 rounded-lg border-l-4 ${
              m.status === 'urgent' ? 'bg-red-900/30 border-red-500' :
              m.status === 'in-progress' ? 'bg-yellow-900/30 border-yellow-500' :
              'bg-slate-700/50 border-slate-500'
            }`}>
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h4 className="font-semibold">{m.type}</h4>
                    <span className={`text-xs px-2 py-1 rounded ${
                      m.status === 'urgent' ? 'bg-red-500' :
                      m.status === 'in-progress' ? 'bg-yellow-500' :
                      'bg-slate-600'
                    }`}>
                      {m.status}
                    </span>
                    <span className={`text-xs px-2 py-1 rounded ${
                      m.priority === 'high' ? 'bg-orange-500/30 text-orange-400' :
                      m.priority === 'normal' ? 'bg-blue-500/30 text-blue-400' :
                      'bg-slate-500/30 text-slate-400'
                    }`}>
                      {m.priority} priority
                    </span>
                  </div>
                  <div className="grid grid-cols-4 gap-4 text-sm">
                    <div>
                      <p className="text-slate-400 text-xs">Vehicle</p>
                      <p className="font-medium">{m.vehicleId}</p>
                    </div>
                    <div>
                      <p className="text-slate-400 text-xs">Scheduled Date</p>
                      <p className="font-medium">{m.scheduled}</p>
                    </div>
                    <div>
                      <p className="text-slate-400 text-xs">Est. Duration</p>
                      <p className="font-medium">{m.estimatedDuration}</p>
                    </div>
                    <div>
                      <p className="text-slate-400 text-xs">Est. Cost</p>
                      <p className="font-medium">${m.cost}</p>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="p-2 bg-slate-700 hover:bg-slate-600 rounded">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button className="p-2 bg-slate-700 hover:bg-slate-600 rounded">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-slate-800 rounded-lg p-6 shadow-xl">
          <h4 className="text-sm font-semibold mb-4 text-slate-300">Maintenance Costs (Monthly)</h4>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={[
              { month: 'Jul', cost: 1800 },
              { month: 'Aug', cost: 2200 },
              { month: 'Sep', cost: 1950 },
              { month: 'Oct', cost: 2350 }
            ]}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="month" stroke="#94a3b8" fontSize={11} />
              <YAxis stroke="#94a3b8" fontSize={11} />
              <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155' }} />
              <Bar dataKey="cost" fill="#f59e0b" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-slate-800 rounded-lg p-6 shadow-xl">
          <h4 className="text-sm font-semibold mb-4 text-slate-300">Service Type Distribution</h4>
          <div className="space-y-3">
            {[
              { type: 'Oil Change', count: 8, percent: 35 },
              { type: 'Brake Service', count: 5, percent: 22 },
              { type: 'Tire Service', count: 6, percent: 26 },
              { type: 'Inspection', count: 4, percent: 17 }
            ].map((item, i) => (
              <div key={i}>
                <div className="flex justify-between text-sm mb-1">
                  <span>{item.type}</span>
                  <span className="text-slate-400">{item.count}</span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-2">
                  <div className="bg-cyan-500 h-2 rounded-full" style={{ width: `${item.percent}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-slate-800 rounded-lg p-6 shadow-xl">
          <h4 className="text-sm font-semibold mb-4 text-slate-300">Upcoming This Week</h4>
          <div className="space-y-3">
            {maintenanceSchedule.filter(m => m.status !== 'completed').slice(0, 4).map((m) => (
              <div key={m.id} className="bg-slate-700/50 rounded p-3">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium">{m.type}</span>
                  <span className="text-xs text-slate-400">{m.scheduled}</span>
                </div>
                <div className="text-xs text-slate-400">{m.vehicleId}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderRoutesTab = () => (
    <div className="space-y-6">
      <div className="bg-slate-800 rounded-lg p-6 shadow-xl">
        <h3 className="text-lg font-semibold mb-6 flex items-center">
          <Route className="w-5 h-5 mr-2 text-cyan-400" />
          Active Routes & Deliveries
        </h3>
        
        <div className="grid grid-cols-1 gap-4">
          {routeData.map((route) => {
            const vehicle = vehicles.find(v => v.vehicleId === route.vehicleId);
            return (
              <div key={route.id} className="bg-slate-700/50 rounded-lg p-5 hover:bg-slate-700 transition-colors">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="bg-cyan-600 p-3 rounded-lg">
                      <Truck className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-semibold">{route.route}</h4>
                      <p className="text-sm text-slate-400">{vehicle?.name} - {route.vehicleId}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-cyan-400">{route.progress}%</p>
                    <p className="text-xs text-slate-400">Complete</p>
                  </div>
                </div>

                <div className="w-full bg-slate-600 rounded-full h-3 mb-4">
                  <div 
                    className="bg-gradient-to-r from-cyan-500 to-blue-500 h-3 rounded-full transition-all"
                    style={{ width: `${route.progress}%` }}
                  />
                </div>

                <div className="grid grid-cols-4 gap-4 text-sm">
                  <div>
                    <p className="text-slate-400 text-xs mb-1">Distance</p>
                    <p className="font-medium">{route.distance} mi</p>
                  </div>
                  <div>
                    <p className="text-slate-400 text-xs mb-1">ETA</p>
                    <p className="font-medium">{route.eta}</p>
                  </div>
                  <div>
                    <p className="text-slate-400 text-xs mb-1">Delays</p>
                    <p className={`font-medium ${route.delays > 0 ? 'text-yellow-400' : 'text-green-400'}`}>
                      {route.delays > 0 ? `+${route.delays} min` : 'On Time'}
                    </p>
                  </div>
                  <div>
                    <p className="text-slate-400 text-xs mb-1">Fuel Stops</p>
                    <p className="font-medium">{route.fuelStops}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-slate-800 rounded-lg p-6 shadow-xl">
          <h4 className="text-sm font-semibold mb-4 text-slate-300">Route Performance</h4>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={routeData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="route" stroke="#94a3b8" fontSize={10} />
              <YAxis stroke="#94a3b8" fontSize={11} />
              <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155' }} />
              <Legend />
              <Bar dataKey="progress" fill="#06b6d4" name="Progress %" />
              <Bar dataKey="delays" fill="#f59e0b" name="Delays (min)" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-slate-800 rounded-lg p-6 shadow-xl">
          <h4 className="text-sm font-semibold mb-4 text-slate-300">Delivery Statistics</h4>
          <div className="space-y-4">
            <div className="bg-slate-700/50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-slate-400">On-Time Delivery Rate</span>
                <span className="text-xl font-bold text-green-400">94.3%</span>
              </div>
              <div className="w-full bg-slate-600 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: '94.3%' }} />
              </div>
            </div>

            <div className="bg-slate-700/50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-slate-400">Average Delay</span>
                <span className="text-xl font-bold text-yellow-400">8.5 min</span>
              </div>
            </div>

            <div className="bg-slate-700/50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-slate-400">Completed Today</span>
                <span className="text-xl font-bold text-cyan-400">12</span>
              </div>
            </div>

            <div className="bg-slate-700/50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-slate-400">In Progress</span>
                <span className="text-xl font-bold text-blue-400">4</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderDriversTab = () => (
    <div className="space-y-6">
      <div className="bg-slate-800 rounded-lg p-6 shadow-xl">
        <h3 className="text-lg font-semibold mb-6 flex items-center">
          <Users className="w-5 h-5 mr-2 text-cyan-400" />
          Driver Management
        </h3>

        <div className="grid grid-cols-1 gap-4">
          {drivers.map((driver) => (
            <div key={driver.id} className="bg-slate-700/50 rounded-lg p-5 hover:bg-slate-700 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 flex-1">
                  <div className="bg-cyan-600 p-4 rounded-full">
                    <Users className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg">{driver.name}</h4>
                    <div className="flex items-center gap-4 mt-1">
                      <span className="text-sm text-slate-400">{driver.id}</span>
                      <span className={`text-xs px-2 py-1 rounded ${
                        driver.status === 'active' ? 'bg-green-500/20 text-green-400' : 'bg-slate-500/20 text-slate-400'
                      }`}>
                        {driver.status}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-4 gap-6 text-center">
                  <div>
                    <p className="text-xs text-slate-400 mb-1">Rating</p>
                    <div className="flex items-center gap-1">
                      <span className="text-lg font-bold text-yellow-400">{driver.rating}</span>
                      <span className="text-xs text-slate-400">/ 5.0</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 mb-1">Hours Today</p>
                    <p className="text-lg font-bold">{driver.hoursToday}h</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 mb-1">Hours This Week</p>
                    <p className="text-lg font-bold">{driver.hoursWeek}h</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 mb-1">Completed Trips</p>
                    <p className="text-lg font-bold">{driver.completedTrips}</p>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-slate-600">
                <div className="flex items-center justify-between">
                  <div className="text-sm">
                    <span className="text-slate-400">Assigned Vehicle: </span>
                    <span className="font-medium">{driver.vehicleId}</span>
                  </div>
                  <div className="flex gap-2">
                    <button className="px-3 py-1 bg-cyan-600 hover:bg-cyan-700 rounded text-sm">
                      View Details
                    </button>
                    <button className="px-3 py-1 bg-slate-600 hover:bg-slate-500 rounded text-sm">
                      Contact
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-slate-800 rounded-lg p-6 shadow-xl">
          <h4 className="text-sm font-semibold mb-4 text-slate-300">Driver Performance Ratings</h4>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={drivers.map(d => ({ name: d.name.split(' ')[0], rating: d.rating }))}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="name" stroke="#94a3b8" fontSize={11} />
              <YAxis stroke="#94a3b8" fontSize={11} domain={[0, 5]} />
              <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155' }} />
              <Bar dataKey="rating" fill="#fbbf24" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-slate-800 rounded-lg p-6 shadow-xl">
          <h4 className="text-sm font-semibold mb-4 text-slate-300">Hours of Service Compliance</h4>
          <div className="space-y-4">
            {drivers.map((driver) => (
              <div key={driver.id} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>{driver.name.split(' ')[0]}</span>
                  <span className={driver.hoursWeek > 60 ? 'text-red-400' : 'text-green-400'}>
                    {driver.hoursWeek}/70h
                  </span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${driver.hoursWeek > 60 ? 'bg-red-500' : 'bg-green-500'}`}
                    style={{ width: `${(driver.hoursWeek / 70) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderInventoryTab = () => (
    <div className="space-y-6">
      <div className="bg-slate-800 rounded-lg p-6 shadow-xl">
        <h3 className="text-lg font-semibold mb-6 flex items-center">
          <Package className="w-5 h-5 mr-2 text-cyan-400" />
          Cargo & Inventory Tracking
        </h3>

        <div className="grid grid-cols-1 gap-4">
          {inventory.map((item) => (
            <div key={item.id} className="bg-slate-700/50 rounded-lg p-5 hover:bg-slate-700 transition-colors">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="bg-purple-600 p-3 rounded-lg">
                    <Package className="w-6 h-6" />
                  </div>
<div>
                    <h4 className="font-semibold">{item.cargo}</h4>
                    <p className="text-sm text-slate-400">{item.id}</p>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded text-xs ${
                  item.status === 'in-transit' ? 'bg-blue-500/20 text-blue-400' :
                  item.status === 'delivered' ? 'bg-green-500/20 text-green-400' :
                  'bg-yellow-500/20 text-yellow-400'
                }`}>
                  {item.status}
                </span>
              </div>

              <div className="grid grid-cols-4 gap-4 text-sm">
                <div>
                  <p className="text-slate-400 text-xs mb-1">Weight</p>
                  <p className="font-medium">{item.weight.toLocaleString()} lbs</p>
                </div>
                <div>
                  <p className="text-slate-400 text-xs mb-1">Value</p>
                  <p className="font-medium text-green-400">${item.value.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-slate-400 text-xs mb-1">Destination</p>
                  <p className="font-medium">{item.destination}</p>
                </div>
                <div>
                  <p className="text-slate-400 text-xs mb-1">Vehicle</p>
                  <p className="font-medium">{item.vehicleId}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-slate-800 rounded-lg p-6 shadow-xl">
          <h4 className="text-sm font-semibold mb-4 text-slate-300">Total Cargo Value</h4>
          <div className="text-center py-6">
            <DollarSign className="w-12 h-12 mx-auto mb-3 text-green-400" />
            <p className="text-3xl font-bold text-green-400">
              ${inventory.reduce((sum, item) => sum + item.value, 0).toLocaleString()}
            </p>
            <p className="text-xs text-slate-400 mt-2">In Transit</p>
          </div>
        </div>

        <div className="bg-slate-800 rounded-lg p-6 shadow-xl">
          <h4 className="text-sm font-semibold mb-4 text-slate-300">Total Weight</h4>
          <div className="text-center py-6">
            <Package className="w-12 h-12 mx-auto mb-3 text-blue-400" />
            <p className="text-3xl font-bold text-blue-400">
              {(inventory.reduce((sum, item) => sum + item.weight, 0) / 1000).toFixed(1)}
            </p>
            <p className="text-xs text-slate-400 mt-2">Tons</p>
          </div>
        </div>

        <div className="bg-slate-800 rounded-lg p-6 shadow-xl">
          <h4 className="text-sm font-semibold mb-4 text-slate-300">Active Shipments</h4>
          <div className="text-center py-6">
            <Truck className="w-12 h-12 mx-auto mb-3 text-cyan-400" />
            <p className="text-3xl font-bold text-cyan-400">
              {inventory.filter(i => i.status === 'in-transit').length}
            </p>
            <p className="text-xs text-slate-400 mt-2">Currently Moving</p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white p-6">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Fleet Digital Twin Platform
          </h1>
          <p className="text-slate-400">Edge IoT Telemetry & AI-Powered Diagnostics System</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative">
            <button 
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-3 bg-slate-800 hover:bg-slate-700 rounded-lg relative"
            >
              <Bell className="w-5 h-5" />
              {unacknowledgedAlerts.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {unacknowledgedAlerts.length}
                </span>
              )}
            </button>
          </div>
          <button className="p-3 bg-slate-800 hover:bg-slate-700 rounded-lg">
            <Settings className="w-5 h-5" />
          </button>
          <div className="bg-slate-800 rounded-lg px-4 py-2">
            <p className="text-xs text-slate-400">Current User</p>
            <p className="font-semibold">Admin</p>
          </div>
        </div>
      </div>

      <div className="mb-6 flex gap-4 items-center">
        <div className="flex-1 relative">
          <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search vehicles, drivers, or routes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-800 border border-slate-700 rounded-lg pl-10 pr-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
        </div>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
        >
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="warning">Warning</option>
          <option value="maintenance">Maintenance</option>
        </select>
        <div className="flex gap-2 bg-slate-800 rounded-lg p-1">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded ${viewMode === 'grid' ? 'bg-cyan-600' : 'hover:bg-slate-700'}`}
          >
            <BarChart3 className="w-5 h-5" />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-2 rounded ${viewMode === 'list' ? 'bg-cyan-600' : 'hover:bg-slate-700'}`}
          >
            <FileText className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Fleet Overview ({filteredVehicles.length} vehicles)</h2>
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-cyan-600 hover:bg-cyan-700 rounded flex items-center text-sm">
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh Data
            </button>
            <button className="px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded flex items-center text-sm">
              <Download className="w-4 h-4 mr-2" />
              Export Report
            </button>
          </div>
        </div>
        
        <div className={`grid gap-4 ${
          viewMode === 'grid' 
            ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
            : 'grid-cols-1'
        }`}>
          {filteredVehicles.map(renderVehicleCard)}
        </div>
      </div>

      <div className="mb-6 flex gap-2 overflow-x-auto bg-slate-800 rounded-lg p-2">
        {[
          { id: 'overview', label: 'Overview', icon: Activity },
          { id: 'analytics', label: 'Analytics', icon: BarChart3 },
          { id: 'maintenance', label: 'Maintenance', icon: Wrench },
          { id: 'routes', label: 'Routes', icon: Route },
          { id: 'drivers', label: 'Drivers', icon: Users },
          { id: 'inventory', label: 'Inventory', icon: Package }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg whitespace-nowrap transition-all ${
              activeTab === tab.id
                ? 'bg-cyan-600 text-white'
                : 'text-slate-400 hover:text-white hover:bg-slate-700'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </button>
        ))}
      </div>

      <div>
        {activeTab === 'overview' && renderOverviewTab()}
        {activeTab === 'analytics' && renderAnalyticsTab()}
        {activeTab === 'maintenance' && renderMaintenanceTab()}
        {activeTab === 'routes' && renderRoutesTab()}
        {activeTab === 'drivers' && renderDriversTab()}
        {activeTab === 'inventory' && renderInventoryTab()}
      </div>

      {showNotifications && (
        <div className="fixed top-20 right-6 w-96 bg-slate-800 border border-slate-700 rounded-lg shadow-2xl p-4 z-50 max-h-96 overflow-y-auto">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold flex items-center">
              <Bell className="w-4 h-4 mr-2" />
              Notifications
            </h3>
            <button onClick={() => setShowNotifications(false)}>
              <X className="w-4 h-4" />
            </button>
          </div>
          <div className="space-y-2">
            {unacknowledgedAlerts.map((alert) => (
              <div key={alert.alertId} className={`p-3 rounded border-l-4 ${getSeverityColor(alert.severity)}`}>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="font-medium text-sm">{alert.title}</p>
                    <p className="text-xs text-slate-400 mt-1">{alert.message}</p>
                    <p className="text-xs text-slate-500 mt-1">{alert.timestamp}</p>
                  </div>
                  <button className="text-slate-400 hover:text-white">
                    <X className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="mt-8 pt-6 border-t border-slate-700 flex items-center justify-between text-sm text-slate-400">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <Wifi className="w-4 h-4 text-green-400" />
            <span>System Connected</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            <span>Last Update: {new Date().toLocaleTimeString()}</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <span>Fleet Digital Twin v2.0</span>
          <span>|</span>
          <span>© 2025 All Rights Reserved</span>
        </div>
      </div>
    </div>
  );
};

export default FleetDigitalTwin;
