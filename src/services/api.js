import {
  INITIAL_SHIPMENTS,
  INITIAL_DRIVERS,
  INITIAL_VEHICLES,
  INITIAL_WAREHOUSES,
  DSA_CATEGORIES
} from '../data/mockData';

export const BASE_URL = import.meta.env?.VITE_API_BASE_URL || 'http://localhost:9090/api';

// Helper function to safely fetch from Spring Boot REST API with fallback to local mock data
async function fetchWithFallback(endpoint, options = {}, mockFallback = null) {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 1200); // 1.2s timeout before fallback

    const response = await fetch(`${BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      },
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (response.ok) {
      return await response.json();
    }
  } catch (error) {
    // Console debug for Spring Boot API connectivity
    console.debug(`FleetFlow API Connection to ${BASE_URL}${endpoint} unreachable. Operating in Offline/Mock mode.`, error.message);
  }

  // Fallback to local mock data
  return mockFallback;
}

export const fleetApi = {
  // Shipments API
  async getShipments() {
    const data = await fetchWithFallback('/shipments', { method: 'GET' }, INITIAL_SHIPMENTS);
    return data || INITIAL_SHIPMENTS;
  },

  async getShipmentById(id) {
    const data = await fetchWithFallback(`/shipments/${id}`, { method: 'GET' }, null);
    if (data) return data;
    return INITIAL_SHIPMENTS.find((s) => s.id === id) || INITIAL_SHIPMENTS[0];
  },

  async createShipment(shipmentData) {
    const newShipment = {
      id: `SHP-2026-${Math.floor(100000 + Math.random() * 900000)}`,
      status: 'Pending',
      createdDate: new Date().toISOString().split('T')[0],
      currentLocation: `${shipmentData.originWarehouse || 'Origin Warehouse'} Loading Bay`,
      distanceKm: Math.floor(150 + Math.random() * 450),
      timeline: [
        { step: 'Order Created', time: 'Just now', completed: true, current: true },
        { step: 'Package Picked Up', time: 'Scheduled', completed: false },
        { step: 'Arrived at Warehouse', time: 'Scheduled', completed: false },
        { step: 'Dispatched', time: 'Scheduled', completed: false },
        { step: 'In Transit', time: 'Scheduled', completed: false },
        { step: 'Out for Delivery', time: 'Scheduled', completed: false },
        { step: 'Delivered', time: 'Scheduled', completed: false }
      ],
      documents: [],
      ...shipmentData
    };

    const result = await fetchWithFallback('/shipments', {
      method: 'POST',
      body: JSON.stringify(shipmentData)
    }, newShipment);

    return result || newShipment;
  },

  // Drivers API
  async getDrivers() {
    const data = await fetchWithFallback('/drivers', { method: 'GET' }, INITIAL_DRIVERS);
    return data || INITIAL_DRIVERS;
  },

  // Vehicles API
  async getVehicles() {
    const data = await fetchWithFallback('/vehicles', { method: 'GET' }, INITIAL_VEHICLES);
    return data || INITIAL_VEHICLES;
  },

  // Warehouses API
  async getWarehouses() {
    const data = await fetchWithFallback('/warehouses', { method: 'GET' }, INITIAL_WAREHOUSES);
    return data || INITIAL_WAREHOUSES;
  },

  // Routes & Optimization API
  async optimizeRoute(routeParams) {
    const mockRouteResult = {
      algorithm: routeParams.algorithm || 'Dijkstra',
      source: routeParams.source || 'Hyderabad Warehouse',
      destination: routeParams.destination || 'Vijayawada Hub',
      path: [
        routeParams.source || 'Hyderabad Warehouse',
        'Suryapet Hub',
        'Nandigama Transit Node',
        routeParams.destination || 'Vijayawada Hub'
      ],
      distanceKm: 274.5,
      estimatedHours: '4 hrs 15 mins',
      stopsCount: 2,
      estimatedCost: '₹ 12,450',
      fuelConsumption: '38.5 Liters',
      co2SavedKg: '14.2 kg'
    };

    const data = await fetchWithFallback('/routes/optimize', {
      method: 'POST',
      body: JSON.stringify(routeParams)
    }, mockRouteResult);

    return data || mockRouteResult;
  },

  // DSA Lab Java API Integration
  async runDSAAlgorithm(algoId, payload) {
    const startTime = performance.now();
    
    // Simulate backend response structure ready for Spring Boot @RestController
    const mockResult = generateMockDSAResult(algoId, payload);

    const apiResult = await fetchWithFallback(`/dsa/${algoId}`, {
      method: 'POST',
      body: JSON.stringify(payload)
    }, mockResult);

    const executionTimeMs = (performance.now() - startTime).toFixed(2);

    return {
      ...(apiResult || mockResult),
      clientExecutionTimeMs: executionTimeMs
    };
  }
};

// Internal helper to generate realistic DSA algorithm outputs for frontend preview
function generateMockDSAResult(algoId, payload) {
  switch (algoId) {
    // String Algorithms
    case 'kmp':
      return {
        algorithm: 'Knuth-Morris-Pratt (KMP)',
        status: 'SUCCESS',
        pattern: payload?.pattern || 'SHP-2026',
        text: payload?.text || 'HYD-SHP-2026-VJA-001245',
        lpsArray: [0, 0, 0, 0, 1, 2, 3, 4],
        matchesFound: [4, 25],
        matchCount: 2,
        timeComplexity: 'O(N + M)',
        spaceComplexity: 'O(M)',
        log: 'Constructed LPS array in 0.4ms. Performed pattern matching scan across 36 characters. Found 2 matches at indices [4, 25].'
      };
    case 'z-algo':
      return {
        algorithm: 'Z Algorithm',
        status: 'SUCCESS',
        pattern: payload?.pattern || 'EXPRESS',
        text: payload?.text || 'EXPRESS_SHIPMENT_EXPRESS_LOGISTICS',
        zArray: [35, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 0, 0, 0, 0, 0, 0, 0],
        matchesFound: [0, 17],
        matchCount: 2,
        timeComplexity: 'O(N)',
        spaceComplexity: 'O(N)',
        log: 'Built Z-box window [L, R]. Computed longest match lengths. Exact matches at index 0 and 17.'
      };
    case 'rabin-karp':
      return {
        algorithm: 'Rabin-Karp Rolling Hash',
        status: 'SUCCESS',
        pattern: payload?.pattern || 'HYD77123',
        hashValue: '9841203',
        matchCount: 1,
        matchesFound: [9],
        timeComplexity: 'O(N + M) Avg',
        spaceComplexity: 'O(1)',
        log: 'Calculated rolling hash with prime modulus 101. Avoided 22 character comparisons via hash pre-check.'
      };
    case 'aho-corasick':
      return {
        algorithm: 'Aho-Corasick Multi-Pattern Automaton',
        status: 'SUCCESS',
        keywords: ['OVERHEAT', 'BRAKE', 'DELAY'],
        detectedAlerts: [
          { keyword: 'OVERHEAT', index: 21 },
          { keyword: 'BRAKE', index: 30 },
          { keyword: 'DELAY', index: 42 }
        ],
        timeComplexity: 'O(N + L + Z)',
        spaceComplexity: 'O(L × Σ)',
        log: 'Constructed Trie with BFS failure links. Scanned 48 chars of telemetry stream. Identified 3 security keywords.'
      };

    // Suffix Structures
    case 'suffix-array':
      return {
        algorithm: 'Suffix Array (Manber-Myers)',
        status: 'SUCCESS',
        text: payload?.text || 'HYDERABAD_VIJAYAWADA_GUNTUR$',
        suffixRank: [28, 12, 4, 19, 0, 15, 8, 22],
        timeComplexity: 'O(N log N)',
        spaceComplexity: 'O(N)',
        log: 'Generated 29 suffix strings. Lexicographically sorted suffixes in 0.8ms.'
      };
    case 'lcp-kasai':
      return {
        algorithm: 'LCP Array (Kasai\'s Linear Algorithm)',
        status: 'SUCCESS',
        lcpValues: [0, 1, 4, 2, 0, 5, 3, 1],
        longestRepeatedSubstring: 'ROUTE_HYD',
        timeComplexity: 'O(N)',
        spaceComplexity: 'O(N)',
        log: 'Iterated through suffixes using inverse suffix array. Discovered maximum repeated route substring length of 9.'
      };
    case 'suffix-tree':
      return {
        algorithm: 'Suffix Tree (Ukkonen\'s Algorithm)',
        status: 'SUCCESS',
        nodesCreated: 42,
        leafCount: 18,
        timeComplexity: 'O(N)',
        spaceComplexity: 'O(N)',
        log: 'Built implicit suffix tree using active point, active edge, and suffix links. Compression ratio: 64%.'
      };

    // Dynamic Programming
    case 'levenshtein':
      return {
        algorithm: 'Levenshtein Edit Distance',
        status: 'SUCCESS',
        str1: payload?.str1 || 'Vijaywada Tech Park',
        str2: payload?.str2 || 'Vijayawada Tech Park',
        editDistance: 1,
        operations: ['Insert "a" at index 5'],
        timeComplexity: 'O(N × M)',
        spaceComplexity: 'O(N × M)',
        log: 'Computed 2D DP matrix. Fuzzy match score: 96.5% similarity.'
      };
    case 'bitmask-dp':
      return {
        algorithm: 'Bitmask Dynamic Programming (TSP)',
        status: 'SUCCESS',
        visitedStops: ['Hyderabad Hub', 'Suryapet', 'Vijayawada', 'Guntur', 'Tenali'],
        optimalRoute: ['Hyderabad Hub', 'Suryapet', 'Vijayawada', 'Tenali', 'Guntur', 'Hyderabad Hub'],
        minCost: '418.5 km',
        substatesEvaluated: 80,
        timeComplexity: 'O(2^N × N²)',
        spaceComplexity: 'O(2^N × N)',
        log: 'Memoized bitmask state dp[mask][u]. Evaluated 2^5 = 32 subsets with 80 total transitions.'
      };
    case 'mcm':
      return {
        algorithm: 'Matrix Chain Multiplication',
        status: 'SUCCESS',
        minScalarMultiplications: 4500,
        optimalParenthesization: '((M1 x (M2 x M3)) x M4)',
        timeComplexity: 'O(N³)',
        spaceComplexity: 'O(N²)',
        log: 'Evaluated 4x4 DP table for chain lengths 2 to 4. Optimal multiplication sequence determined.'
      };
    case 'optimal-bst':
      return {
        algorithm: 'Optimal Binary Search Tree',
        status: 'SUCCESS',
        expectedSearchCost: 1.75,
        rootStructure: 'SKU_C at Root (SKU_A left, SKU_D right)',
        timeComplexity: 'O(N³)',
        spaceComplexity: 'O(N²)',
        log: 'Built cost matrix e[i][j] for 4 high-frequency warehouse SKUs. Minimized expected access lookup time.'
      };

    // Graph Algorithms
    case 'dijkstra':
      return {
        algorithm: 'Dijkstra Shortest Path',
        status: 'SUCCESS',
        source: payload?.source || 'Hyderabad Central Hub',
        destination: payload?.destination || 'Guntur Transit Node',
        shortestPath: ['Hyderabad Central Hub', 'Hyderabad Hub', 'Vijayawada Hub', 'Guntur Transit Node'],
        totalDistanceKm: 315.0,
        estimatedTime: '5 hrs 20 mins',
        timeComplexity: 'O((V + E) log V)',
        spaceComplexity: 'O(V)',
        log: 'Initialized Min-Heap priority queue with 7 nodes. Expanded 14 edges. Optimal shortest path calculated.'
      };
    case 'ford-fulkerson':
    case 'edmonds-karp':
      return {
        algorithm: 'Ford-Fulkerson / Edmonds-Karp Network Flow',
        status: 'SUCCESS',
        maxFlow: '1,850 packages / hr',
        bottleneckEdge: 'Vijayawada Hub → Guntur Node (600 pkgs/hr capacity limit)',
        augmentingPaths: 4,
        timeComplexity: 'O(V × E²)',
        spaceComplexity: 'O(V + E)',
        log: 'Ran BFS augmenting path search. Path 1: 950 capacity. Path 2: 500 capacity. Path 3: 400 capacity. Max flow saturated at 1,850 pkgs/hr.'
      };
    case 'bipartite-matching':
      return {
        algorithm: 'Bipartite Matching (Hopcroft-Karp)',
        status: 'OPTIMAL_ASSIGNMENT',
        matchings: [
          { driver: 'Rajesh Sharma (DRV-001)', task: 'SHP-2026-001245 (Express Electronics)', distance: '4.2 km' },
          { driver: 'Venkatesh Rao (DRV-002)', task: 'SHP-2026-001246 (Cold Storage Pharma)', distance: '2.1 km' },
          { driver: 'K. Karthik (DRV-005)', task: 'SHP-2026-001249 (Garments Vijayawada)', distance: '6.8 km' },
          { driver: 'Prakash Patil (DRV-006)', task: 'SHP-2026-001250 (Auto Assemblies)', distance: '8.0 km' }
        ],
        matchedCount: 4,
        totalDrivers: 4,
        timeComplexity: 'O(E × √V)',
        spaceComplexity: 'O(V + E)',
        log: 'Built augmenting paths using BFS layer graph and DFS blocking flow. Achieved 100% driver-to-task assignment.'
      };
    case 'min-cut':
      return {
        algorithm: 'Min-Cut Theorem (Max-Flow Min-Cut)',
        status: 'SUCCESS',
        minCutEdges: ['Vijayawada Hub → Guntur Node'],
        cutCapacity: '600 packages / hr',
        sourcePartition: ['HYD', 'HYD_HUB', 'VJA_HUB', 'VSKP_PORT'],
        sinkPartition: ['GNT_NODE', 'CUST'],
        timeComplexity: 'O(V × E²)',
        spaceComplexity: 'O(V + E)',
        log: 'Identified S-T cut boundary isolating reachable nodes from source. Minimum cut capacity equals max network flow.'
      };

    // NP-Completeness & Approximation
    case '3-sat':
      return {
        algorithm: '3-SAT Solver (DPLL)',
        status: 'SATISFIABLE',
        assignments: { x1: true, x2: false, x3: true, x4: true },
        clauseCount: 8,
        timeComplexity: 'O(2^N) NP-Complete',
        spaceComplexity: 'O(N)',
        log: 'Performed unit propagation and pure literal elimination. Verified all 8 vehicle rule clauses as satisfied.'
      };
    case 'clique':
      return {
        algorithm: 'Maximum Clique (Bron-Kerbosch)',
        status: 'SUCCESS',
        maxCliqueNodes: ['HYD_HUB', 'VJA_HUB', 'GNT_NODE', 'VSKP_PORT'],
        cliqueSize: 4,
        timeComplexity: 'O(3^(V/3)) NP-Complete',
        spaceComplexity: 'O(V)',
        log: 'Evaluated recursive vertex expansion with pivoting. Identified 4-hub fully connected express network.'
      };
    case 'independent-set':
      return {
        algorithm: 'Maximum Independent Set',
        status: 'SUCCESS',
        independentTasks: ['Task #1 (09:00-11:00)', 'Task #3 (11:30-13:00)', 'Task #6 (14:00-16:00)'],
        setSize: 3,
        timeComplexity: 'O(2^V × V)',
        spaceComplexity: 'O(V)',
        log: 'Reduced problem to complement of max clique. Selected 3 conflict-free delivery windows.'
      };
    case 'vertex-cover':
      return {
        algorithm: 'Vertex Cover (Exact)',
        status: 'OPTIMAL_COVER',
        coverVertices: ['HYD_HUB', 'VJA_HUB', 'GNT_NODE'],
        minCoverSize: 3,
        timeComplexity: 'O(2^V × E)',
        spaceComplexity: 'O(V)',
        log: 'Found minimum subset of 3 hub nodes that cover all 12 inter-city route corridors.'
      };
    case 'vertex-cover-2approx':
      return {
        algorithm: 'Vertex Cover 2-Approximation',
        status: 'SUCCESS',
        coverVertices: ['HYD_HUB', 'VJA_HUB', 'GNT_NODE', 'VSKP_PORT'],
        approxRatio: '1.33x Optimal (Max 2.0x)',
        timeComplexity: 'O(V + E)',
        spaceComplexity: 'O(V)',
        log: 'Greedily selected maximal matching edge endpoints. Placed 4 mobile emergency units in linear time O(V+E).'
      };

    // Randomized & Parallel
    case 'randomized-quicksort':
      return {
        algorithm: 'Randomized QuickSort',
        status: 'SUCCESS',
        sortedElementsCount: 20,
        pivotChoices: [14, 7, 19, 3],
        timeComplexity: 'O(N log N) Expected',
        spaceComplexity: 'O(log N)',
        log: 'Selected random pivots avoiding O(N²) degradation. Sorted 20 tracking timestamps in 0.2ms.'
      };
    case 'reservoir-sampling':
      return {
        algorithm: 'Reservoir Sampling (Algorithm R)',
        status: 'SUCCESS',
        sampleSize: 5,
        streamProcessedCount: 1000,
        sampledTelemetryPoints: ['GPS_34', 'GPS_189', 'GPS_402', 'GPS_721', 'GPS_980'],
        timeComplexity: 'O(N)',
        spaceComplexity: 'O(K)',
        log: 'Processed 1,000 continuous GPS stream points. Maintained uniform random distribution for k=5 sample buffer.'
      };
    case 'miller-rabin':
      return {
        algorithm: 'Miller-Rabin Primality Test',
        status: 'PROBABLY_PRIME',
        testedNumber: payload?.number || 10007,
        confidence: '99.9999% (5 iterations)',
        timeComplexity: 'O(K log³ N)',
        spaceComplexity: 'O(1)',
        log: 'Decomposed N-1 into 2^s * d. Verified strong pseudoprime witnesses against random bases.'
      };
    case 'bloom-filter':
      return {
        algorithm: 'Bloom Filter Lookup',
        status: 'POSSIBLY_IN_SET',
        queryId: payload?.queryId || 'SHP-2026-001245',
        hashFunctionsCount: 3,
        falsePositiveRate: '0.8%',
        timeComplexity: 'O(K)',
        spaceComplexity: 'O(M) Bit Array',
        log: 'Evaluated Murmur3, FNV1a, and CityHash. All 3 bit positions set to 1. Tracking ID exists in fast cache.'
      };
    case 'parallel-reduce':
      return {
        algorithm: 'Parallel Reduce (Brent\'s Theorem)',
        status: 'SUCCESS',
        totalAggregated: '14,890 Liters Fuel',
        coresUsed: 8,
        speedupRatio: '6.4x speedup',
        timeComplexity: 'O(N / P + log N)',
        spaceComplexity: 'O(P)',
        log: 'Divided 10,000 data elements across 8 parallel worker threads. Tree reduction completed in log2(8) steps.'
      };

    default:
      return {
        algorithm: algoId.toUpperCase(),
        status: 'SUCCESS',
        output: 'Algorithm executed successfully against local simulation data.',
        timeComplexity: 'O(N log N)',
        spaceComplexity: 'O(N)',
        log: `Executed ${algoId} with parameter payload. All graph constraints and state transitions verified.`
      };
  }
}
