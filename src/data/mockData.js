export const INITIAL_KPI = {
  totalShipments: { value: '2,845', change: '+12.4%', text: 'vs last week', trend: 'up' },
  inTransit: { value: '412', change: '+5.2%', text: 'vs last week', trend: 'up' },
  delivered: { value: '2,310', change: '+14.1%', text: 'vs last week', trend: 'up' },
  delayed: { value: '48', change: '-2.5%', text: 'vs last week', trend: 'down' },
  activeVehicles: { value: '84/95', change: '88.4%', text: 'utilization rate', trend: 'up' },
  availableDrivers: { value: '62/70', change: '88.5%', text: 'active shift', trend: 'up' }
};

export const INITIAL_SHIPMENTS = [
  {
    id: 'SHP-2026-001245',
    customer: 'TechCorp Solutions India',
    customerContact: 'Ramesh Kumar (+91 98765 43210)',
    origin: 'Hyderabad Warehouse',
    originCity: 'Hyderabad',
    destination: 'Vijayawada Tech Park',
    destinationCity: 'Vijayawada',
    destinationAddress: 'Plot 42, Auto Nagar, Vijayawada, AP 520007',
    weight: '450 kg',
    packageType: 'Electronics & Components',
    priority: 'High',
    driver: 'Rajesh Sharma',
    driverPhone: '+91 91234 56789',
    vehicle: 'AP-09-CB-4892 (Container Truck)',
    status: 'In Transit',
    eta: 'Today, 4:30 PM',
    createdDate: '2026-10-04',
    currentLocation: 'Vijayawada Highway (NH65) near Suryapet',
    distanceKm: 275,
    timeline: [
      { step: 'Order Created', time: 'Oct 04, 09:00 AM', completed: true },
      { step: 'Package Picked Up', time: 'Oct 04, 11:30 AM', completed: true },
      { step: 'Arrived at Warehouse', time: 'Oct 04, 02:15 PM', completed: true },
      { step: 'Dispatched', time: 'Oct 05, 06:00 AM', completed: true },
      { step: 'In Transit', time: 'Oct 05, 10:30 AM', completed: true, current: true },
      { step: 'Out for Delivery', time: 'Expected 02:30 PM', completed: false },
      { step: 'Delivered', time: 'Expected 04:30 PM', completed: false }
    ],
    documents: [
      { name: 'Proof_Of_Delivery_SHP1245.pdf', size: '1.2 MB', date: 'Oct 04, 2026' },
      { name: 'EWay_Bill_AP_987123.pdf', size: '850 KB', date: 'Oct 04, 2026' }
    ]
  },
  {
    id: 'SHP-2026-001246',
    customer: 'PharmaCare Global Guntur',
    customerContact: 'Dr. S. Rao (+91 98480 12345)',
    origin: 'Hyderabad Hub',
    originCity: 'Hyderabad',
    destination: 'Guntur Medical Zone',
    destinationCity: 'Guntur',
    destinationAddress: 'Main Road, Kothapet, Guntur, AP 522001',
    weight: '120 kg',
    packageType: 'Cold Storage Vaccines',
    priority: 'Express',
    driver: 'Venkatesh Rao',
    driverPhone: '+91 99887 65432',
    vehicle: 'TS-07-UE-9011 (Refrigerated Van)',
    status: 'In Transit',
    eta: 'Today, 6:15 PM',
    createdDate: '2026-10-05',
    currentLocation: 'Nalgonda Bypass',
    distanceKm: 290,
    timeline: [
      { step: 'Order Created', time: 'Oct 05, 07:00 AM', completed: true },
      { step: 'Package Picked Up', time: 'Oct 05, 08:30 AM', completed: true },
      { step: 'Arrived at Warehouse', time: 'Oct 05, 09:45 AM', completed: true },
      { step: 'Dispatched', time: 'Oct 05, 11:00 AM', completed: true },
      { step: 'In Transit', time: 'Oct 05, 01:15 PM', completed: true, current: true },
      { step: 'Out for Delivery', time: 'Expected 05:00 PM', completed: false },
      { step: 'Delivered', time: 'Expected 06:15 PM', completed: false }
    ],
    documents: [
      { name: 'ColdChain_Log_Guntur.pdf', size: '2.4 MB', date: 'Oct 05, 2026' }
    ]
  },
  {
    id: 'SHP-2026-001247',
    customer: 'Vizag Steel Spares Ltd',
    customerContact: 'K. Srinivasan (+91 94400 55443)',
    origin: 'Vijayawada Hub',
    originCity: 'Vijayawada',
    destination: 'Visakhapatnam Port Zone',
    destinationCity: 'Visakhapatnam',
    destinationAddress: 'Gajuwaka Industrial Estate, Visakhapatnam, AP 530026',
    weight: '1,800 kg',
    packageType: 'Heavy Machinery Spares',
    priority: 'Medium',
    driver: 'Srinivas Murthy',
    driverPhone: '+91 97001 22334',
    vehicle: 'AP-31-TA-1122 (Heavy Hauler Truck)',
    status: 'Delivered',
    eta: 'Delivered Yesterday',
    createdDate: '2026-10-03',
    currentLocation: 'Visakhapatnam Port Depot (Unloaded)',
    distanceKm: 350,
    timeline: [
      { step: 'Order Created', time: 'Oct 03, 08:00 AM', completed: true },
      { step: 'Package Picked Up', time: 'Oct 03, 10:00 AM', completed: true },
      { step: 'Arrived at Warehouse', time: 'Oct 03, 01:00 PM', completed: true },
      { step: 'Dispatched', time: 'Oct 03, 04:00 PM', completed: true },
      { step: 'In Transit', time: 'Oct 04, 06:00 AM', completed: true },
      { step: 'Out for Delivery', time: 'Oct 04, 02:00 PM', completed: true },
      { step: 'Delivered', time: 'Oct 04, 05:45 PM', completed: true }
    ],
    documents: [
      { name: 'Signed_POD_Vizag.pdf', size: '3.1 MB', date: 'Oct 04, 2026' }
    ]
  },
  {
    id: 'SHP-2026-001248',
    customer: 'Bengaluru E-Commerce Hub',
    customerContact: 'Ananya Reddy (+91 98111 22334)',
    origin: 'Hyderabad Warehouse',
    originCity: 'Hyderabad',
    destination: 'Bengaluru Electronic City',
    destinationCity: 'Bengaluru',
    destinationAddress: 'Phase 1, Hosur Road, Bengaluru, KA 560100',
    weight: '620 kg',
    packageType: 'Consumer Goods',
    priority: 'High',
    driver: 'Mahesh Reddy',
    driverPhone: '+91 96555 44332',
    vehicle: 'KA-51-MD-9080 (Container Heavy)',
    status: 'Delayed',
    eta: 'Tomorrow, 10:00 AM (Delayed due to heavy rain)',
    createdDate: '2026-10-04',
    currentLocation: 'Anantapur NH44 Toll Plaza (Raining)',
    distanceKm: 570,
    timeline: [
      { step: 'Order Created', time: 'Oct 04, 10:00 AM', completed: true },
      { step: 'Package Picked Up', time: 'Oct 04, 01:00 PM', completed: true },
      { step: 'Arrived at Warehouse', time: 'Oct 04, 04:00 PM', completed: true },
      { step: 'Dispatched', time: 'Oct 04, 09:00 PM', completed: true },
      { step: 'In Transit', time: 'Oct 05, 08:00 AM', completed: true, current: true },
      { step: 'Out for Delivery', time: 'Delayed', completed: false },
      { step: 'Delivered', time: 'Delayed', completed: false }
    ],
    documents: [
      { name: 'Delay_Notice_Weather_KA.pdf', size: '540 KB', date: 'Oct 05, 2026' }
    ]
  },
  {
    id: 'SHP-2026-001249',
    customer: 'Chennai Garments Express',
    customerContact: 'M. Selvam (+91 94440 99887)',
    origin: 'Vijayawada Hub',
    originCity: 'Vijayawada',
    destination: 'Chennai Central Depot',
    destinationCity: 'Chennai',
    destinationAddress: 'Guindy Industrial Estate, Chennai, TN 600032',
    weight: '310 kg',
    packageType: 'Textiles & Apparel',
    priority: 'Medium',
    driver: 'K. Karthik',
    driverPhone: '+91 98401 77665',
    vehicle: 'TN-09-AX-3311 (Cargo Van)',
    status: 'Pending',
    eta: 'Oct 07, 11:00 AM',
    createdDate: '2026-10-05',
    currentLocation: 'Vijayawada Loading Bay 3',
    distanceKm: 450,
    timeline: [
      { step: 'Order Created', time: 'Oct 05, 11:30 AM', completed: true, current: true },
      { step: 'Package Picked Up', time: 'Scheduled 03:00 PM', completed: false },
      { step: 'Arrived at Warehouse', time: 'Scheduled 06:00 PM', completed: false },
      { step: 'Dispatched', time: 'Scheduled 09:00 PM', completed: false },
      { step: 'In Transit', time: 'Scheduled Oct 06', completed: false },
      { step: 'Out for Delivery', time: 'Scheduled Oct 07', completed: false },
      { step: 'Delivered', time: 'Scheduled Oct 07', completed: false }
    ],
    documents: []
  },
  {
    id: 'SHP-2026-001250',
    customer: 'Mumbai Auto Parts Ltd',
    customerContact: 'Pravin Shah (+91 98200 11223)',
    origin: 'Hyderabad Warehouse',
    originCity: 'Hyderabad',
    destination: 'Pune Chakan Industrial Hub',
    destinationCity: 'Pune',
    destinationAddress: 'MIDC Phase II, Chakan, Pune, MH 410501',
    weight: '980 kg',
    packageType: 'Automotive Assemblies',
    priority: 'Express',
    driver: 'Prakash Patil',
    driverPhone: '+91 97660 33445',
    vehicle: 'MH-12-PQ-8877 (Multi-Axle Truck)',
    status: 'In Transit',
    eta: 'Tomorrow, 8:00 AM',
    createdDate: '2026-10-05',
    currentLocation: 'Solapur Highway (NH65)',
    distanceKm: 560,
    timeline: [
      { step: 'Order Created', time: 'Oct 05, 06:00 AM', completed: true },
      { step: 'Package Picked Up', time: 'Oct 05, 08:00 AM', completed: true },
      { step: 'Arrived at Warehouse', time: 'Oct 05, 10:00 AM', completed: true },
      { step: 'Dispatched', time: 'Oct 05, 12:30 PM', completed: true },
      { step: 'In Transit', time: 'Oct 05, 02:00 PM', completed: true, current: true },
      { step: 'Out for Delivery', time: 'Scheduled Oct 06', completed: false },
      { step: 'Delivered', time: 'Scheduled Oct 06', completed: false }
    ],
    documents: [
      { name: 'EWay_Bill_MH_109283.pdf', size: '920 KB', date: 'Oct 05, 2026' }
    ]
  }
];

export const INITIAL_DRIVERS = [
  {
    id: 'DRV-001',
    name: 'Rajesh Sharma',
    phone: '+91 91234 56789',
    license: 'DL-09-2018-88741',
    assignedVehicle: 'AP-09-CB-4892 (Container)',
    currentLocation: 'Suryapet, NH65',
    status: 'On Delivery',
    deliveries: 342,
    rating: 4.9,
    experience: '8 years',
    assignedShipment: 'SHP-2026-001245'
  },
  {
    id: 'DRV-002',
    name: 'Venkatesh Rao',
    phone: '+91 99887 65432',
    license: 'DL-07-2019-10923',
    assignedVehicle: 'TS-07-UE-9011 (Refrigerated)',
    currentLocation: 'Nalgonda Bypass',
    status: 'On Delivery',
    deliveries: 289,
    rating: 4.8,
    experience: '6 years',
    assignedShipment: 'SHP-2026-001246'
  },
  {
    id: 'DRV-003',
    name: 'Srinivas Murthy',
    phone: '+91 97001 22334',
    license: 'DL-31-2015-55412',
    assignedVehicle: 'AP-31-TA-1122 (Heavy Truck)',
    currentLocation: 'Visakhapatnam Port',
    status: 'Available',
    deliveries: 450,
    rating: 4.95,
    experience: '11 years',
    assignedShipment: 'None'
  },
  {
    id: 'DRV-004',
    name: 'Mahesh Reddy',
    phone: '+91 96555 44332',
    license: 'DL-51-2020-44123',
    assignedVehicle: 'KA-51-MD-9080 (Container Heavy)',
    currentLocation: 'Anantapur Toll',
    status: 'On Delivery',
    deliveries: 198,
    rating: 4.7,
    experience: '5 years',
    assignedShipment: 'SHP-2026-001248'
  },
  {
    id: 'DRV-005',
    name: 'K. Karthik',
    phone: '+91 98401 77665',
    license: 'DL-09-2021-99881',
    assignedVehicle: 'TN-09-AX-3311 (Cargo Van)',
    currentLocation: 'Vijayawada Hub',
    status: 'Available',
    deliveries: 145,
    rating: 4.85,
    experience: '4 years',
    assignedShipment: 'SHP-2026-001249'
  },
  {
    id: 'DRV-006',
    name: 'Prakash Patil',
    phone: '+91 97660 33445',
    license: 'DL-12-2017-33211',
    assignedVehicle: 'MH-12-PQ-8877 (Multi-Axle)',
    currentLocation: 'Solapur Highway',
    status: 'On Delivery',
    deliveries: 310,
    rating: 4.9,
    experience: '9 years',
    assignedShipment: 'SHP-2026-001250'
  },
  {
    id: 'DRV-007',
    name: 'Amitabh Sen',
    phone: '+91 98300 44556',
    license: 'DL-10-2016-12399',
    assignedVehicle: 'Unassigned',
    currentLocation: 'Hyderabad Terminal',
    status: 'Offline',
    deliveries: 220,
    rating: 4.6,
    experience: '7 years',
    assignedShipment: 'None'
  },
  {
    id: 'DRV-008',
    name: 'Ravi Teja',
    phone: '+91 94900 11998',
    license: 'DL-09-2022-77112',
    assignedVehicle: 'Unassigned',
    currentLocation: 'Guntur Depot',
    status: 'On Leave',
    deliveries: 95,
    rating: 4.75,
    experience: '3 years',
    assignedShipment: 'None'
  }
];

export const INITIAL_VEHICLES = [
  {
    id: 'VEH-001',
    number: 'AP-09-CB-4892',
    type: 'Container Truck',
    capacity: '10.0 Tons',
    capacityKg: 10000,
    currentLoadKg: 7800,
    loadPercentage: 78.0,
    driver: 'Rajesh Sharma',
    location: 'Vijayawada Highway (NH65)',
    fuelBattery: '76% (Diesel)',
    status: 'On Route',
    lastMaintenance: '2026-09-15'
  },
  {
    id: 'VEH-002',
    number: 'TS-07-UE-9011',
    type: 'Refrigerated Van',
    capacity: '3.5 Tons',
    capacityKg: 3500,
    currentLoadKg: 2400,
    loadPercentage: 68.5,
    driver: 'Venkatesh Rao',
    location: 'Nalgonda Bypass',
    fuelBattery: '88% (EV Battery)',
    status: 'On Route',
    lastMaintenance: '2026-09-28'
  },
  {
    id: 'VEH-003',
    number: 'AP-31-TA-1122',
    type: 'Heavy Hauler Truck',
    capacity: '16.0 Tons',
    capacityKg: 16000,
    currentLoadKg: 0,
    loadPercentage: 0,
    driver: 'Srinivas Murthy',
    location: 'Visakhapatnam Port Depot',
    fuelBattery: '92% (Diesel)',
    status: 'Available',
    lastMaintenance: '2026-09-10'
  },
  {
    id: 'VEH-004',
    number: 'KA-51-MD-9080',
    type: 'Container Heavy',
    capacity: '12.0 Tons',
    capacityKg: 12000,
    currentLoadKg: 10500,
    loadPercentage: 87.5,
    driver: 'Mahesh Reddy',
    location: 'Anantapur Toll Plaza',
    fuelBattery: '42% (Diesel)',
    status: 'On Route',
    lastMaintenance: '2026-08-30'
  },
  {
    id: 'VEH-005',
    number: 'TN-09-AX-3311',
    type: 'Cargo Van',
    capacity: '2.5 Tons',
    capacityKg: 2500,
    currentLoadKg: 0,
    loadPercentage: 0,
    driver: 'K. Karthik',
    location: 'Vijayawada Hub',
    fuelBattery: '95% (EV Battery)',
    status: 'Available',
    lastMaintenance: '2026-09-22'
  },
  {
    id: 'VEH-006',
    number: 'MH-12-PQ-8877',
    type: 'Multi-Axle Truck',
    capacity: '18.0 Tons',
    capacityKg: 18000,
    currentLoadKg: 14200,
    loadPercentage: 78.8,
    driver: 'Prakash Patil',
    location: 'Solapur Highway',
    fuelBattery: '65% (Diesel)',
    status: 'On Route',
    lastMaintenance: '2026-09-05'
  },
  {
    id: 'VEH-007',
    number: 'TS-09-EX-0099',
    type: 'Heavy Hauler Truck',
    capacity: '15.0 Tons',
    capacityKg: 15000,
    currentLoadKg: 0,
    loadPercentage: 0,
    driver: 'Unassigned',
    location: 'Hyderabad Logistics Bay 4',
    fuelBattery: '15% (Maintenance Scheduled)',
    status: 'Maintenance',
    lastMaintenance: '2026-06-12'
  }
];

export const INITIAL_WAREHOUSES = [
  {
    id: 'WH-001',
    name: 'Hyderabad Central Logistics Hub',
    city: 'Hyderabad',
    address: 'ORR Exit 10, Patancheru Industrial Area, Hyderabad, TS 502319',
    capacity: 10000,
    currentLoad: 8025,
    availableSpace: 1975,
    utilization: 80.25,
    incomingCount: 42,
    outgoingCount: 68,
    status: 'Healthy',
    manager: 'R. K. Varma'
  },
  {
    id: 'WH-002',
    name: 'Vijayawada Regional Distribution Center',
    city: 'Vijayawada',
    address: 'NH16 Bypass, Enikepadu, Vijayawada, AP 521108',
    capacity: 6500,
    currentLoad: 5850,
    availableSpace: 650,
    utilization: 90.0,
    incomingCount: 28,
    outgoingCount: 34,
    status: 'High Load',
    manager: 'G. Satyanarayana'
  },
  {
    id: 'WH-003',
    name: 'Visakhapatnam Port Express Warehouse',
    city: 'Visakhapatnam',
    address: 'Port Connectivity Highway, Gajuwaka, Visakhapatnam, AP 530026',
    capacity: 12000,
    currentLoad: 7200,
    availableSpace: 4800,
    utilization: 60.0,
    incomingCount: 55,
    outgoingCount: 40,
    status: 'Healthy',
    manager: 'C. H. Raju'
  },
  {
    id: 'WH-004',
    name: 'Guntur Transit Node',
    city: 'Guntur',
    address: 'GT Road, Auto Nagar, Guntur, AP 522001',
    capacity: 4000,
    currentLoad: 3820,
    availableSpace: 180,
    utilization: 95.5,
    incomingCount: 19,
    outgoingCount: 22,
    status: 'Critical',
    manager: 'B. Krishna'
  },
  {
    id: 'WH-005',
    name: 'Bengaluru Tech Logistics Park',
    city: 'Bengaluru',
    address: 'Hoskote Industrial Area, Bengaluru, KA 562114',
    capacity: 15000,
    currentLoad: 11400,
    availableSpace: 3600,
    utilization: 76.0,
    incomingCount: 88,
    outgoingCount: 92,
    status: 'Healthy',
    manager: 'Suresh Gowda'
  }
];

export const ALERTS = [
  {
    id: 'ALT-101',
    type: 'Warning',
    title: 'Vehicle Maintenance Due',
    message: 'Vehicle TS-09-EX-0099 has exceeded 15,000 km threshold. Brake system inspection required.',
    time: '20 mins ago',
    severity: 'medium',
    actionText: 'Schedule Service'
  },
  {
    id: 'ALT-102',
    type: 'Critical',
    title: 'Warehouse Capacity Exceeded Alert',
    message: 'Guntur Transit Node capacity is at 95.5% (3,820 / 4,000 packages). Reroute incoming shipments to Vijayawada Hub.',
    time: '45 mins ago',
    severity: 'high',
    actionText: 'Trigger Rerouting'
  },
  {
    id: 'ALT-103',
    type: 'Delay',
    title: 'Delayed Shipment Alert',
    message: 'SHP-2026-001248 to Bengaluru delayed due to heavy downpour at Anantapur NH44 Toll Plaza.',
    time: '1 hour ago',
    severity: 'medium',
    actionText: 'Notify Customer'
  },
  {
    id: 'ALT-104',
    type: 'Bottleneck',
    title: 'Network Bottleneck Detected',
    message: 'Ford-Fulkerson algorithm detected capacity bottleneck on Vijayawada → Guntur edge (600 pkgs/hr max capacity vs 620 pkgs/hr demand).',
    time: '2 hours ago',
    severity: 'high',
    actionText: 'Run Optimization'
  }
];

export const NETWORK_NODES = [
  { id: 'HYD', label: 'Hyderabad Warehouse', type: 'Warehouse', capacity: 10000, current: 8025, status: 'Active' },
  { id: 'HYD_HUB', label: 'Hyderabad Hub', type: 'Hub', capacity: 5000, current: 3400, status: 'Active' },
  { id: 'VJA_HUB', label: 'Vijayawada Hub', type: 'Hub', capacity: 4500, current: 4100, status: 'High Load' },
  { id: 'GNT_NODE', label: 'Guntur Node', type: 'Node', capacity: 2000, current: 1910, status: 'Bottleneck' },
  { id: 'VSKP_PORT', label: 'Visakhapatnam Port', type: 'Hub', capacity: 8000, current: 4800, status: 'Active' },
  { id: 'BLR_HUB', label: 'Bengaluru Logistics', type: 'Warehouse', capacity: 12000, current: 9100, status: 'Active' },
  { id: 'CUST', label: 'Customer Outlets', type: 'Destination', capacity: 15000, current: 12400, status: 'Active' }
];

export const NETWORK_EDGES = [
  { source: 'HYD', target: 'HYD_HUB', capacity: 1200, currentFlow: 950, cost: 45 },
  { source: 'HYD_HUB', target: 'VJA_HUB', capacity: 1000, currentFlow: 880, cost: 120 },
  { source: 'VJA_HUB', target: 'GNT_NODE', capacity: 600, currentFlow: 590, cost: 40, bottleneck: true },
  { source: 'VJA_HUB', target: 'VSKP_PORT', capacity: 800, currentFlow: 450, cost: 180 },
  { source: 'GNT_NODE', target: 'CUST', capacity: 600, currentFlow: 590, cost: 35 },
  { source: 'HYD_HUB', target: 'BLR_HUB', capacity: 1500, currentFlow: 1100, cost: 260 }
];

export const DSA_CATEGORIES = [
  {
    name: 'STRING ALGORITHMS',
    algorithms: [
      {
        id: 'kmp',
        name: 'Knuth-Morris-Pratt (KMP)',
        problem: 'Fast pattern matching in logistics tracking strings & OCR parcel labels.',
        complexity: 'O(N + M) Time | O(M) Space',
        description: 'Computes the Longest Prefix Suffix (LPS) array to skip redundant comparisons during barcode and shipment tracking string verification.',
        sampleInput: { text: 'HYD-SHP-2026-VJA-001245-HYD-SHP-2026', pattern: 'SHP-2026' }
      },
      {
        id: 'z-algo',
        name: 'Z Algorithm',
        problem: 'Exact prefix pattern matching in customer invoice & tracking codes.',
        complexity: 'O(N) Time | O(N) Space',
        description: 'Constructs the Z-array where Z[i] is the length of the longest substring starting from i that matches the prefix of string S.',
        sampleInput: { text: 'EXPRESS_SHIPMENT_EXPRESS_LOGISTICS', pattern: 'EXPRESS' }
      },
      {
        id: 'rabin-karp',
        name: 'Rabin-Karp Algorithm',
        problem: 'Multi-pattern hashing search for batch package tracking codes.',
        complexity: 'O(N + M) Avg Time | O(1) Space',
        description: 'Uses rolling hash functions to quickly filter out mismatching substrings before performing exact character verification.',
        sampleInput: { text: 'VJA998234HYD77123GNT882341', pattern: 'HYD77123' }
      },
      {
        id: 'aho-corasick',
        name: 'Aho-Corasick Automaton',
        problem: 'Simultaneous multi-keyword filtering on real-time driver telemetry logs.',
        complexity: 'O(N + L + Z) Time | O(L × Σ) Space',
        description: 'Constructs a trie with failure links to detect multiple restricted cargo terms or speed violation keywords in telemetry streams in a single pass.',
        sampleInput: { text: 'SPEED_WARNING_ENGINE_OVERHEAT_BRAKE_ISSUE_DELAY', pattern: 'OVERHEAT,BRAKE,DELAY' }
      }
    ]
  },
  {
    name: 'SUFFIX STRUCTURES',
    algorithms: [
      {
        id: 'suffix-array',
        name: 'Suffix Array',
        problem: 'Sub-string indexing & query lookup over legacy logistics logs.',
        complexity: 'O(N log N) Time | O(N) Space',
        description: 'Sorts all suffixes of a text lexicographically to enable O(M log N) pattern matching using binary search.',
        sampleInput: { text: 'HYDERABAD_VIJAYAWADA_GUNTUR_VISAKHAPATNAM$' }
      },
      {
        id: 'lcp-kasai',
        name: 'LCP Array / Kasai Algorithm',
        problem: 'Finding longest repeated shipment routes & address patterns.',
        complexity: 'O(N) Time | O(N) Space',
        description: 'Computes the Longest Common Prefix (LCP) values between adjacent suffixes in a Suffix Array in linear time.',
        sampleInput: { text: 'ROUTE_HYD_VJA_ROUTE_HYD_GNT$' }
      },
      {
        id: 'suffix-tree',
        name: 'Suffix Tree (Ukkonen)',
        problem: 'Full compressed trie of all suffixes for instant route substring matching.',
        complexity: 'O(N) Time | O(N) Space',
        description: 'Linear time suffix tree construction algorithm allowing topological substring operations and max repeated route analysis.',
        sampleInput: { text: 'FLEETFLOW_LOGISTICS$' }
      }
    ]
  },
  {
    name: 'DYNAMIC PROGRAMMING',
    algorithms: [
      {
        id: 'levenshtein',
        name: 'Levenshtein Distance',
        problem: 'Fuzzy address matching & autocorrect for customer destination inputs.',
        complexity: 'O(N × M) Time | O(N × M) Space',
        description: 'Calculates the minimum edit operations (insertions, deletions, substitutions) required to transform one address string into another.',
        sampleInput: { str1: 'Vijaywada Tech Park', str2: 'Vijayawada Tech Park' }
      },
      {
        id: 'bitmask-dp',
        name: 'Bitmask DP (TSP Route Optimization)',
        problem: 'Optimal multi-stop delivery vehicle routing (Traveling Salesperson Problem).',
        complexity: 'O(2^N × N^2) Time | O(2^N × N) Space',
        description: 'Solves exact TSP for up to 20 delivery destinations per vehicle using subset bitmask states and memoization.',
        sampleInput: { stopsCount: 5, cities: ['Hyderabad Hub', 'Suryapet', 'Vijayawada', 'Guntur', 'Tenali'] }
      },
      {
        id: 'mcm',
        name: 'Matrix Chain Multiplication',
        problem: 'Optimal cost order evaluation for multi-stage logistics fee computations.',
        complexity: 'O(N^3) Time | O(N^2) Space',
        description: 'Determines the optimal parenthesization of matrix multiplication sequence to minimize scalar multiplications.',
        sampleInput: { dimensions: '10, 30, 5, 60, 15, 20' }
      },
      {
        id: 'optimal-bst',
        name: 'Optimal Binary Search Tree',
        problem: 'Frequency-weighted search trees for ultra-fast warehouse SKU retrieval.',
        complexity: 'O(N^3) Time | O(N^2) Space',
        description: 'Constructs a BST that minimizes the expected search time given access probabilities for different warehouse SKUs.',
        sampleInput: { keys: 'SKU_A, SKU_B, SKU_C, SKU_D', frequencies: '0.35, 0.15, 0.40, 0.10' }
      }
    ]
  },
  {
    name: 'GRAPH ALGORITHMS',
    algorithms: [
      {
        id: 'dijkstra',
        name: 'Dijkstra Shortest Path',
        problem: 'Find minimum distance / time path from warehouse to final delivery hub.',
        complexity: 'O((V + E) log V) Time | O(V) Space',
        description: 'Uses a Priority Queue (Min-Heap) to iteratively expand shortest path distances from a source node to all reachable graph nodes.',
        sampleInput: { source: 'Hyderabad Central Hub', destination: 'Guntur Transit Node' }
      },
      {
        id: 'ford-fulkerson',
        name: 'Ford-Fulkerson Algorithm',
        problem: 'Max flow capacity calculation across inter-city highway logistics channels.',
        complexity: 'O(E × MaxFlow) Time | O(V + E) Space',
        description: 'Computes maximum network throughput by finding augmenting paths in a residual capacity graph using DFS.',
        sampleInput: { source: 'Hyderabad Depot', sink: 'Vijayawada Outlet' }
      },
      {
        id: 'edmonds-karp',
        name: 'Edmonds-Karp Algorithm',
        problem: 'BFS-based Max Flow determination ensuring polynomial runtime guaranteed.',
        complexity: 'O(V × E^2) Time | O(V + E) Space',
        description: 'Implementation of Ford-Fulkerson that uses BFS to find the shortest augmenting paths in terms of edge count.',
        sampleInput: { source: 'Hyderabad Central Hub', sink: 'Visakhapatnam Port' }
      },
      {
        id: 'bipartite-matching',
        name: 'Bipartite Matching (Hopcroft-Karp)',
        problem: 'Optimal assignment of available drivers to pending delivery task orders.',
        complexity: 'O(E × √V) Time | O(V + E) Space',
        description: 'Finds maximum cardinality bipartite matching between the set of Drivers and the set of Delivery Tasks.',
        sampleInput: { driversCount: 4, tasksCount: 4 }
      },
      {
        id: 'min-cut',
        name: 'Min-Cut Theorem (Max-Flow Min-Cut)',
        problem: 'Identify critical bottleneck edges in the state logistics grid.',
        complexity: 'O(V × E^2) Time | O(V + E) Space',
        description: 'Identifies the minimum weight cut of edges whose removal completely disconnects the source warehouse from the target sink.',
        sampleInput: { source: 'HYD_HUB', sink: 'GNT_NODE' }
      }
    ]
  },
  {
    name: 'NP-COMPLETE / APPROXIMATION',
    algorithms: [
      {
        id: '3-sat',
        name: '3-SAT Solver',
        problem: 'Complex Boolean constraint checking for multi-warehouse driver scheduling rules.',
        complexity: 'O(2^N) NP-Complete | Polynomial Verification',
        description: 'Determines if a 3-Conjunctive Normal Form (3-CNF) Boolean formula can be satisfied for vehicle compliance constraints.',
        sampleInput: { clauses: '(x1 ∨ ¬x2 ∨ x3) ∧ (¬x1 ∨ x4 ∨ ¬x3)' }
      },
      {
        id: 'clique',
        name: 'Maximum Clique',
        problem: 'Discovering fully connected sub-networks of high-density warehouse hubs.',
        complexity: 'O(2^V × V) NP-Complete',
        description: 'Finds the largest complete subgraph where every pair of warehouse vertices is directly connected by dedicated express corridors.',
        sampleInput: { nodes: 6, edges: 11 }
      },
      {
        id: 'independent-set',
        name: 'Maximum Independent Set',
        problem: 'Selecting non-conflicting delivery time windows & non-overlapping truck routes.',
        complexity: 'O(2^V × V) NP-Complete',
        description: 'Selects the largest subset of nodes such that no two nodes in the subset are adjacent in the route conflict graph.',
        sampleInput: { tasksCount: 6 }
      },
      {
        id: 'vertex-cover',
        name: 'Vertex Cover (Exact)',
        problem: 'Finding minimum location checkpoints to monitor all logistics transit routes.',
        complexity: 'O(2^V × E) NP-Complete',
        description: 'Finds the smallest subset of hub vertices such that every highway edge is incident to at least one selected vertex.',
        sampleInput: { vertices: 8, edges: 12 }
      },
      {
        id: 'vertex-cover-2approx',
        name: 'Vertex Cover 2-Approximation',
        problem: 'Fast polynomial time placement of emergency mobile repair units to cover all route corridors.',
        complexity: 'O(V + E) Time | 2-Approximation Ratio',
        description: 'Greedily selects endpoints of maximal matching edges to cover all edges with at most twice the optimal number of inspection stations.',
        sampleInput: { vertices: 8, edges: 12 }
      }
    ]
  },
  {
    name: 'RANDOMIZED / PARALLEL',
    algorithms: [
      {
        id: 'randomized-quicksort',
        name: 'Randomized QuickSort',
        problem: 'High-throughput sorting of millions of incoming shipment timestamp streams.',
        complexity: 'O(N log N) Expected Time | O(log N) Space',
        description: 'Uses a randomly chosen pivot to avoid worst-case O(N^2) performance when sorting pre-sorted tracking sequences.',
        sampleInput: { arraySize: 20 }
      },
      {
        id: 'reservoir-sampling',
        name: 'Reservoir Sampling',
        problem: 'Uniform random sampling from an infinite stream of live GPS telemetry points.',
        complexity: 'O(N) Time | O(K) Space',
        description: 'Selects k random samples from an unknown or streaming input of n items in a single pass without loading all items into memory.',
        sampleInput: { streamSize: 1000, sampleSize: 5 }
      },
      {
        id: 'miller-rabin',
        name: 'Miller-Rabin Primality Test',
        problem: 'Probabilistic primality test for cryptographic key generation securing e-Way bills.',
        complexity: 'O(K log³ N) Time | O(1) Space',
        description: 'Determines whether a large integer is prime using Fermat\'s Little Theorem and strong pseudoprime verification.',
        sampleInput: { number: 10007, iterations: 5 }
      },
      {
        id: 'bloom-filter',
        name: 'Bloom Filter',
        problem: 'Space-efficient probabilistic test for tracking ID existence in cache.',
        complexity: 'O(K) Time | Bit Array Space',
        description: 'Probabilistic data structure that quickly checks if a Tracking ID has definitely NOT been processed or POSSIBLY has been processed.',
        sampleInput: { queryId: 'SHP-2026-001245' }
      },
      {
        id: 'parallel-reduce',
        name: 'Parallel Reduce & Brent\'s Theorem',
        problem: 'Multi-threaded aggregation of network-wide fuel consumption data.',
        complexity: 'O(N / P + log N) Time | Brent\'s Theorem Bound',
        description: 'Parallel tree-reduction algorithm utilizing multi-core workers to aggregate heavy logistics metrics with provable speedup.',
        sampleInput: { elements: 10000, cores: 8 }
      }
    ]
  }
];

export const CUSTOMERS = [
  { id: 'CUST-101', name: 'TechCorp Solutions India', contact: 'Ramesh Kumar', phone: '+91 98765 43210', city: 'Vijayawada', activeShipments: 4, totalRevenue: '₹ 14,80,000', rating: 4.9 },
  { id: 'CUST-102', name: 'PharmaCare Global Guntur', contact: 'Dr. S. Rao', phone: '+91 98480 12345', city: 'Guntur', activeShipments: 2, totalRevenue: '₹ 22,50,000', rating: 4.8 },
  { id: 'CUST-103', name: 'Vizag Steel Spares Ltd', contact: 'K. Srinivasan', phone: '+91 94400 55443', city: 'Visakhapatnam', activeShipments: 6, totalRevenue: '₹ 45,00,000', rating: 5.0 },
  { id: 'CUST-104', name: 'Bengaluru E-Commerce Hub', contact: 'Ananya Reddy', phone: '+91 98111 22334', city: 'Bengaluru', activeShipments: 12, totalRevenue: '₹ 89,20,000', rating: 4.7 }
];

export const DOCUMENTS = [
  { id: 'DOC-901', name: 'Proof_Of_Delivery_SHP1245.pdf', type: 'POD', shipmentId: 'SHP-2026-001245', date: '2026-10-04', size: '1.2 MB', status: 'Verified' },
  { id: 'DOC-902', name: 'EWay_Bill_AP_987123.pdf', type: 'E-Way Bill', shipmentId: 'SHP-2026-001245', date: '2026-10-04', size: '850 KB', status: 'Active' },
  { id: 'DOC-903', name: 'ColdChain_Log_Guntur.pdf', type: 'Quality Log', shipmentId: 'SHP-2026-001246', date: '2026-10-05', size: '2.4 MB', status: 'Verified' },
  { id: 'DOC-904', name: 'Customs_Clearance_Vizag.pdf', type: 'Customs', shipmentId: 'SHP-2026-001247', date: '2026-10-03', size: '4.1 MB', status: 'Approved' }
];
