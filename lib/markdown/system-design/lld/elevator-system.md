# Elevator System - Low-Level Design

## Problem Statement

Design an elevator control system for a multi-floor building that efficiently handles passenger requests while optimizing wait time and energy consumption.

## Requirements

### Functional Requirements

1. **Multiple Elevators**: Support N elevators in a building
2. **Multiple Floors**: Support M floors
3. **Request Handling**:
   - External requests (hall buttons): UP/DOWN at each floor
   - Internal requests (cabin buttons): Specific floor destinations
4. **Direction Control**: Each elevator moves UP, DOWN, or stays IDLE
5. **Optimal Dispatch**: Assign nearest available elevator to requests
6. **Door Control**: Open/close doors at floors
7. **Emergency Features**: Emergency stop, door sensors

### Non-Functional Requirements

1. **Efficiency**: Minimize average wait time
2. **Fairness**: No passenger starvation
3. **Safety**: Handle emergency situations
4. **Scalability**: Support adding more elevators
5. **Thread-safe**: Handle concurrent requests

## Design Patterns Used

1. **Strategy Pattern**: Elevator scheduling algorithms
2. **State Pattern**: Elevator states (IDLE, MOVING_UP, MOVING_DOWN)
3. **Singleton Pattern**: ElevatorController
4. **Observer Pattern**: Request notification system
5. **Factory Pattern**: Request creation

## Class Diagram


<div style="background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%); padding: 2rem; border-radius: 12px; border: 1px solid #334155; margin: 2rem 0; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.3);">
  <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1.5rem;">
    <div style="background: #0f172a; padding: 1.5rem; border-radius: 8px; border: 1px solid #1e40af;">
      <div style="color: #60a5fa; font-weight: bold; font-size: 1.125rem; margin-bottom: 1rem; padding-bottom: 0.5rem; border-bottom: 1px solid #1e40af;">Main Class</div>
      <div style="color: #94a3b8; font-size: 0.875rem; margin-bottom: 0.75rem;">
        <div style="margin-bottom: 0.5rem;">+ properties</div>
        <div style="margin-bottom: 0.5rem;">+ attributes</div>
      </div>
      <div style="border-top: 1px solid #334155; padding-top: 0.75rem; margin-top: 0.75rem; color: #94a3b8; font-size: 0.875rem;">
        <div style="margin-bottom: 0.5rem;">+ methods()</div>
        <div style="margin-bottom: 0.5rem;">+ operations()</div>
      </div>
    </div>
    <div style="background: #0f172a; padding: 1.5rem; border-radius: 8px; border: 1px solid #059669;">
      <div style="color: #34d399; font-weight: bold; font-size: 1.125rem; margin-bottom: 1rem; padding-bottom: 0.5rem; border-bottom: 1px solid #059669;">Helper Class</div>
      <div style="color: #94a3b8; font-size: 0.875rem; margin-bottom: 0.75rem;">
        <div style="margin-bottom: 0.5rem;">+ fields</div>
        <div style="margin-bottom: 0.5rem;">+ data</div>
      </div>
      <div style="border-top: 1px solid #334155; padding-top: 0.75rem; margin-top: 0.75rem; color: #94a3b8; font-size: 0.875rem;">
        <div style="margin-bottom: 0.5rem;">+ helpers()</div>
        <div style="margin-bottom: 0.5rem;">+ utilities()</div>
      </div>
    </div>
    <div style="background: #0f172a; padding: 1.5rem; border-radius: 8px; border: 1px solid #7c3aed;">
      <div style="color: #a78bfa; font-weight: bold; font-size: 1.125rem; margin-bottom: 1rem; padding-bottom: 0.5rem; border-bottom: 1px solid #7c3aed;">Interface</div>
      <div style="color: #94a3b8; font-size: 0.875rem; margin-bottom: 0.75rem;">
        <div style="margin-bottom: 0.5rem; font-style: italic;">«interface»</div>
      </div>
      <div style="border-top: 1px solid #334155; padding-top: 0.75rem; margin-top: 0.75rem; color: #94a3b8; font-size: 0.875rem;">
        <div style="margin-bottom: 0.5rem;">+ abstract methods()</div>
      </div>
    </div>
  </div>
  <div style="margin-top: 1.5rem; padding-top: 1.5rem; border-top: 1px solid #334155; color: #64748b; font-size: 0.875rem; text-align: center;">
    Arrows indicate inheritance, composition, and dependency relationships
  </div>
</div>

### Core Enums

```java
public enum Direction {
    UP, DOWN, IDLE
}

public enum ElevatorState {
    IDLE, MOVING_UP, MOVING_DOWN, DOOR_OPEN, MAINTENANCE
}

public enum RequestType {
    EXTERNAL, // Hall button
    INTERNAL  // Cabin button
}
```

### Request Class

```java
public class Request {
    private final int floor;
    private final Direction direction;
    private final RequestType type;
    private final long timestamp;

    public Request(int floor, Direction direction, RequestType type) {
        this.floor = floor;
        this.direction = direction;
        this.type = type;
        this.timestamp = System.currentTimeMillis();
    }

    // Getters
    public int getFloor() { return floor; }
    public Direction getDirection() { return direction; }
    public RequestType getType() { return type; }
    public long getTimestamp() { return timestamp; }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Request request = (Request) o;
        return floor == request.floor &&
               direction == request.direction;
    }

    @Override
    public int hashCode() {
        return Objects.hash(floor, direction);
    }
}
```

### Elevator Class

```java
public class Elevator {
    private final int elevatorId;
    private int currentFloor;
    private Direction currentDirection;
    private ElevatorState state;

    // Priority queues for efficient floor selection
    private final PriorityQueue<Integer> upQueue;    // Min heap
    private final PriorityQueue<Integer> downQueue;  // Max heap

    private final Set<Integer> currentRequests;
    private final int minFloor;
    private final int maxFloor;

    public Elevator(int elevatorId, int minFloor, int maxFloor) {
        this.elevatorId = elevatorId;
        this.currentFloor = 0; // Ground floor
        this.currentDirection = Direction.IDLE;
        this.state = ElevatorState.IDLE;
        this.minFloor = minFloor;
        this.maxFloor = maxFloor;

        // Min heap for upward movement (ascending order)
        this.upQueue = new PriorityQueue<>();

        // Max heap for downward movement (descending order)
        this.downQueue = new PriorityQueue<>(Collections.reverseOrder());

        this.currentRequests = new HashSet<>();
    }

    /**
     * Add a destination floor to the elevator's queue
     */
    public synchronized void addDestination(int floor, Direction requestDirection) {
        if (floor < minFloor || floor > maxFloor) {
            throw new IllegalArgumentException("Invalid floor: " + floor);
        }

        if (floor == currentFloor) {
            return; // Already at floor
        }

        currentRequests.add(floor);

        // Add to appropriate queue based on request direction
        if (floor > currentFloor) {
            upQueue.offer(floor);
        } else {
            downQueue.offer(floor);
        }

        // Start moving if idle
        if (state == ElevatorState.IDLE) {
            processNextDestination();
        }
    }

    /**
     * Move elevator and handle requests
     */
    public synchronized void move() {
        if (state == ElevatorState.MAINTENANCE) {
            return;
        }

        // Check if reached destination
        if (hasReachedDestination()) {
            handleArrival();
            return;
        }

        // Continue moving in current direction
        if (currentDirection == Direction.UP) {
            currentFloor++;
            state = ElevatorState.MOVING_UP;
        } else if (currentDirection == Direction.DOWN) {
            currentFloor--;
            state = ElevatorState.MOVING_DOWN;
        }

        System.out.println("Elevator " + elevatorId +
                         " at floor " + currentFloor +
                         " moving " + currentDirection);
    }

    private boolean hasReachedDestination() {
        return currentRequests.contains(currentFloor);
    }

    private void handleArrival() {
        System.out.println("Elevator " + elevatorId +
                         " arrived at floor " + currentFloor);

        state = ElevatorState.DOOR_OPEN;
        currentRequests.remove(currentFloor);

        // Remove from appropriate queue
        upQueue.remove(currentFloor);
        downQueue.remove(currentFloor);

        // Simulate door open/close time
        try {
            Thread.sleep(2000); // 2 seconds
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }

        // Process next destination
        processNextDestination();
    }

    private void processNextDestination() {
        // Check current direction queue first
        if (currentDirection == Direction.UP && !upQueue.isEmpty()) {
            currentDirection = Direction.UP;
            state = ElevatorState.MOVING_UP;
        } else if (currentDirection == Direction.DOWN && !downQueue.isEmpty()) {
            currentDirection = Direction.DOWN;
            state = ElevatorState.MOVING_DOWN;
        }
        // Switch direction if current queue empty
        else if (!upQueue.isEmpty()) {
            currentDirection = Direction.UP;
            state = ElevatorState.MOVING_UP;
        } else if (!downQueue.isEmpty()) {
            currentDirection = Direction.DOWN;
            state = ElevatorState.MOVING_DOWN;
        }
        // No more requests
        else {
            currentDirection = Direction.IDLE;
            state = ElevatorState.IDLE;
            System.out.println("Elevator " + elevatorId + " is now IDLE");
        }
    }

    /**
     * Calculate cost to serve a request (for scheduling)
     * Lower cost = better candidate
     */
    public int calculateCost(Request request) {
        int targetFloor = request.getFloor();
        Direction requestDir = request.getDirection();

        // If elevator is idle, cost is just the distance
        if (state == ElevatorState.IDLE) {
            return Math.abs(currentFloor - targetFloor);
        }

        // If elevator is moving in same direction and request is on the way
        if (currentDirection == requestDir) {
            if ((currentDirection == Direction.UP &&
                 targetFloor >= currentFloor) ||
                (currentDirection == Direction.DOWN &&
                 targetFloor <= currentFloor)) {
                return Math.abs(currentFloor - targetFloor);
            }
        }

        // Otherwise, elevator needs to finish current direction first
        // High cost to discourage assignment
        return Integer.MAX_VALUE / 2;
    }

    public boolean isIdle() {
        return state == ElevatorState.IDLE;
    }

    // Getters
    public int getElevatorId() { return elevatorId; }
    public int getCurrentFloor() { return currentFloor; }
    public Direction getCurrentDirection() { return currentDirection; }
    public ElevatorState getState() { return state; }
}
```

### Elevator Controller (Singleton)

```java
public class ElevatorController {
    private static ElevatorController instance;

    private final List<Elevator> elevators;
    private final Queue<Request> pendingRequests;
    private final ElevatorScheduler scheduler;
    private final ExecutorService executorService;

    private final int minFloor;
    private final int maxFloor;

    private ElevatorController(int numElevators, int minFloor, int maxFloor) {
        this.minFloor = minFloor;
        this.maxFloor = maxFloor;
        this.elevators = new ArrayList<>();
        this.pendingRequests = new ConcurrentLinkedQueue<>();
        this.scheduler = new NearestCarScheduler();

        // Initialize elevators
        for (int i = 0; i < numElevators; i++) {
            elevators.add(new Elevator(i, minFloor, maxFloor));
        }

        // Thread pool for elevator movement
        this.executorService = Executors.newFixedThreadPool(numElevators);

        // Start elevator threads
        startElevators();
    }

    public static synchronized ElevatorController getInstance(
            int numElevators, int minFloor, int maxFloor) {
        if (instance == null) {
            instance = new ElevatorController(numElevators, minFloor, maxFloor);
        }
        return instance;
    }

    /**
     * Handle external request (hall button)
     */
    public void requestElevator(int floor, Direction direction) {
        Request request = new Request(floor, direction, RequestType.EXTERNAL);
        System.out.println("External request: Floor " + floor +
                         " Direction " + direction);

        Elevator bestElevator = scheduler.selectElevator(elevators, request);

        if (bestElevator != null) {
            bestElevator.addDestination(floor, direction);
        } else {
            pendingRequests.offer(request);
        }
    }

    /**
     * Handle internal request (cabin button)
     */
    public void selectFloor(int elevatorId, int floor) {
        if (elevatorId < 0 || elevatorId >= elevators.size()) {
            throw new IllegalArgumentException("Invalid elevator ID");
        }

        Elevator elevator = elevators.get(elevatorId);
        Direction direction = floor > elevator.getCurrentFloor() ?
                             Direction.UP : Direction.DOWN;

        System.out.println("Internal request: Elevator " + elevatorId +
                         " to floor " + floor);

        elevator.addDestination(floor, direction);
    }

    private void startElevators() {
        for (Elevator elevator : elevators) {
            executorService.submit(() -> {
                while (!Thread.currentThread().isInterrupted()) {
                    elevator.move();
                    try {
                        Thread.sleep(1000); // 1 second per floor
                    } catch (InterruptedException e) {
                        Thread.currentThread().interrupt();
                        break;
                    }
                }
            });
        }
    }

    public void displayStatus() {
        System.out.println("\n=== Elevator Status ===");
        for (Elevator elevator : elevators) {
            System.out.println("Elevator " + elevator.getElevatorId() +
                             ": Floor " + elevator.getCurrentFloor() +
                             " | State: " + elevator.getState() +
                             " | Direction: " + elevator.getCurrentDirection());
        }
        System.out.println("=======================\n");
    }

    public void shutdown() {
        executorService.shutdown();
    }
}
```

### Scheduling Strategy (Strategy Pattern)

```java
public interface ElevatorScheduler {
    Elevator selectElevator(List<Elevator> elevators, Request request);
}

/**
 * Nearest Car Algorithm
 * Assigns request to elevator with lowest cost
 */
public class NearestCarScheduler implements ElevatorScheduler {
    @Override
    public Elevator selectElevator(List<Elevator> elevators, Request request) {
        Elevator bestElevator = null;
        int minCost = Integer.MAX_VALUE;

        for (Elevator elevator : elevators) {
            int cost = elevator.calculateCost(request);
            if (cost < minCost) {
                minCost = cost;
                bestElevator = elevator;
            }
        }

        return bestElevator;
    }
}

/**
 * Round Robin Scheduler
 * Distributes load evenly
 */
public class RoundRobinScheduler implements ElevatorScheduler {
    private int lastAssigned = -1;

    @Override
    public synchronized Elevator selectElevator(
            List<Elevator> elevators, Request request) {
        lastAssigned = (lastAssigned + 1) % elevators.size();
        return elevators.get(lastAssigned);
    }
}
```

## Usage Example

```java
public class ElevatorSystemDemo {
    public static void main(String[] args) throws InterruptedException {
        // Initialize: 3 elevators, floors 0-10
        ElevatorController controller =
            ElevatorController.getInstance(3, 0, 10);

        // Simulate requests
        controller.requestElevator(5, Direction.UP);   // Person at floor 5 going up
        Thread.sleep(1000);

        controller.requestElevator(3, Direction.DOWN); // Person at floor 3 going down
        Thread.sleep(1000);

        controller.selectFloor(0, 8);  // Person in elevator 0 selects floor 8
        Thread.sleep(2000);

        controller.displayStatus();

        // More requests
        controller.requestElevator(7, Direction.UP);
        controller.requestElevator(2, Direction.DOWN);
        controller.selectFloor(1, 6);

        Thread.sleep(5000);
        controller.displayStatus();

        // Shutdown
        Thread.sleep(20000);
        controller.shutdown();
    }
}
```

## Scheduling Algorithms

### 1. SCAN (Elevator Algorithm)

```
- Move in one direction until no more requests
- Then reverse direction
- Similar to disk scheduling
```

### 2. LOOK

```
- Like SCAN but reverses when last request reached
- More efficient than SCAN
```

### 3. Nearest Car

```
- Assign request to elevator with minimum cost
- Cost = distance + direction compatibility
```

## Advanced Features

### 1. Destination Control System (DCS)

```java
// Users select destination at hall, not just direction
public void advancedRequest(int currentFloor, int destinationFloor) {
    Direction direction = destinationFloor > currentFloor ?
                         Direction.UP : Direction.DOWN;

    // Group passengers going to similar floors
    // Assign specific elevator
    Elevator assignedElevator =
        selectOptimalElevator(currentFloor, destinationFloor, direction);

    System.out.println("Please board Elevator " +
                      assignedElevator.getElevatorId());
}
```

### 2. Peak Traffic Handling

```java
// Morning rush: Send all elevators to ground floor
// Evening rush: Distribute across building
public void handlePeakHours(PeakType peakType) {
    if (peakType == PeakType.MORNING_RUSH) {
        for (Elevator elevator : elevators) {
            if (elevator.isIdle()) {
                elevator.addDestination(0, Direction.IDLE);
            }
        }
    }
}
```

## Testing

```java
@Test
public void testSingleRequest() {
    ElevatorController controller =
        ElevatorController.getInstance(2, 0, 10);

    controller.requestElevator(5, Direction.UP);

    // Wait for elevator to reach
    Thread.sleep(6000);

    // Verify elevator at floor 5
    assertTrue(isAnyElevatorAtFloor(5));
}

@Test
public void testMultipleRequests() {
    controller.requestElevator(3, Direction.UP);
    controller.requestElevator(7, Direction.DOWN);
    controller.requestElevator(5, Direction.UP);

    // Verify all requests eventually served
    // No starvation
}
```

## Trade-offs

| Aspect         | Decision                | Trade-off                            |
| -------------- | ----------------------- | ------------------------------------ |
| Scheduling     | Nearest Car             | Optimal wait time vs. complex logic  |
| Data Structure | Priority Queues         | Efficient floor selection vs. memory |
| Threading      | One thread per elevator | Realistic simulation vs. overhead    |
| State          | Enum-based              | Type safety vs. flexibility          |

## 💡 Interview Tips & Out-of-the-Box Thinking

### Common Pitfalls

- **Not considering direction**: Elevator going up shouldn't pick down requests (violates user expectations)
- **Starvation problem**: Upper floors never serviced if ground floor keeps requesting
- **Concurrent modification**: Multiple threads modifying request queue without synchronization
- **Not handling emergency stop**: Fire alarm should immediately change behavior

### Design Pattern Recognition

- **Strategy Pattern**: Different scheduling algorithms (Nearest Car, SCAN, LOOK, Zoning)
- **State Pattern**: Elevator states (IDLE, MOVING_UP, MOVING_DOWN, DOOR_OPEN, MAINTENANCE)
- **Singleton Pattern**: Single controller coordinating all elevators
- **Observer Pattern**: Notify display panels when elevator arrives

### Advanced Considerations

- **Starvation prevention**: Aging algorithm - increase priority of long-waiting requests
- **Energy optimization**: Park idle elevators at predicted high-demand floors (ML-based)
- **Zone-based dispatch**: High-rise buildings split into zones to reduce travel time
- **Double-deck elevators**: Two cabins stacked - serve even/odd floors simultaneously
- **Destination dispatch**: User enters destination floor at lobby (not in cabin) for optimal grouping

### Creative Solutions

- **Predictive dispatching**: During morning rush, pre-position elevators at ground floor
- **Express elevators**: Non-stop to top floors during peak hours
- **AI-based learning**: Learn building traffic patterns and adapt scheduling
- **Priority lanes**: VIP floors get faster service
- **Group dispatch optimization**: Assign multiple requests to single elevator based on direction

### Trade-off Discussions

- **FCFS vs Optimization**: Fair but inefficient vs Optimal but complex
- **Centralized vs Decentralized**: Single controller (easier coordination) vs Each elevator independent (fault tolerant)
- **Real-time vs Batch**: Immediate response vs Group requests for efficiency
- **Simple vs Smart**: Nearest car (simple, good enough) vs Machine learning (complex, optimal)

### Edge Cases to Mention

- **All elevators on same floor**: How to distribute next request? (Answer: Round-robin or load balancing)
- **Request from current floor**: Should doors reopen if recently closed? (Answer: Timeout threshold)
- **Opposite direction request**: Elevator at floor 5 going up, user at 5 wants down (Answer: Skip, serve on return)
- **Emergency override**: Fire alarm triggers - all elevators to ground floor (Answer: Clear queue, priority mode)
- **Maximum weight exceeded**: Doors keep reopening (Answer: Force people to exit, audio warning)
- **Maintenance mode during peak**: One elevator down during rush hour (Answer: Redistribute load, notify users)

## Follow-up Questions

1. **How to handle elevator breakdown?**

   - Mark elevator as MAINTENANCE
   - Redistribute requests to other elevators
   - Send notification to maintenance

2. **How to optimize for energy efficiency?**

   - Group nearby requests
   - Reduce unnecessary movements
   - Park idle elevators at strategic floors

3. **How to implement emergency mode?**

   - Priority queue for emergency requests
   - Clear all normal requests
   - Direct elevators to emergency floor

4. **How to handle overweight scenario?**
   - Weight sensors in cabin
   - Reject new internal requests if overweight
   - Alert to reduce load
