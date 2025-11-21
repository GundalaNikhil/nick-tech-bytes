# Parking Lot System - Low-Level Design

## Problem Statement

Design a parking lot system that can accommodate different types of vehicles (motorcycle, car, truck) with different parking spot sizes (compact, regular, large).

## Requirements

### Functional Requirements

1. Multiple floors with multiple parking spots
2. Different spot sizes: Compact, Regular, Large
3. Different vehicle types: Motorcycle, Car, Truck
4. Entry/exit gates with ticket generation
5. Parking fee calculation based on duration
6. Display available spots at entrance
7. Support for reserved/handicapped spots

### Non-Functional Requirements

1. Thread-safe for concurrent access
2. Extensible for new vehicle types
3. Follow SOLID principles
4. Low latency for spot allocation

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
  <div style="margin-top: 1.5rem; padding-top: 1.5rem; border-top: 1px solid #334155; display: flex; justify-content: center; align-items: center; gap: 2rem; flex-wrap: wrap;">
    <div style="display: flex; align-items: center; gap: 0.5rem; color: #94a3b8; font-size: 0.875rem;">
      <span style="color: #60a5fa;">━━━▶</span>
      <span>Dependency</span>
    </div>
    <div style="display: flex; align-items: center; gap: 0.5rem; color: #94a3b8; font-size: 0.875rem;">
      <span style="color: #34d399;">◆━━━</span>
      <span>Composition</span>
    </div>
    <div style="display: flex; align-items: center; gap: 0.5rem; color: #94a3b8; font-size: 0.875rem;">
      <span style="color: #a78bfa;">△━━━</span>
      <span>Inheritance</span>
    </div>
  </div>
</div>

## Design Patterns Used

1. **Singleton Pattern**: ParkingLot instance
2. **Factory Pattern**: Vehicle and ParkingSpot creation
3. **Strategy Pattern**: Parking fee calculation
4. **Observer Pattern**: Update availability displays

### Core Classes

```java
// Enums
public enum VehicleType {
    MOTORCYCLE, CAR, TRUCK
}

public enum SpotType {
    COMPACT, REGULAR, LARGE
}

public enum SpotStatus {
    AVAILABLE, OCCUPIED, RESERVED
}

// Vehicle Hierarchy
public abstract class Vehicle {
    protected String licensePlate;
    protected VehicleType type;

    public Vehicle(String licensePlate, VehicleType type) {
        this.licensePlate = licensePlate;
        this.type = type;
    }

    public abstract boolean canFitInSpot(ParkingSpot spot);

    // Getters
    public String getLicensePlate() { return licensePlate; }
    public VehicleType getType() { return type; }
}

public class Motorcycle extends Vehicle {
    public Motorcycle(String licensePlate) {
        super(licensePlate, VehicleType.MOTORCYCLE);
    }

    @Override
    public boolean canFitInSpot(ParkingSpot spot) {
        // Motorcycle can fit in any spot
        return true;
    }
}

public class Car extends Vehicle {
    public Car(String licensePlate) {
        super(licensePlate, VehicleType.CAR);
    }

    @Override
    public boolean canFitInSpot(ParkingSpot spot) {
        return spot.getType() == SpotType.REGULAR ||
               spot.getType() == SpotType.LARGE;
    }
}

public class Truck extends Vehicle {
    public Truck(String licensePlate) {
        super(licensePlate, VehicleType.TRUCK);
    }

    @Override
    public boolean canFitInSpot(ParkingSpot spot) {
        return spot.getType() == SpotType.LARGE;
    }
}
```

### Parking Spot

```java
public class ParkingSpot {
    private final String spotId;
    private final SpotType type;
    private SpotStatus status;
    private Vehicle currentVehicle;
    private final int floor;

    public ParkingSpot(String spotId, SpotType type, int floor) {
        this.spotId = spotId;
        this.type = type;
        this.floor = floor;
        this.status = SpotStatus.AVAILABLE;
    }

    public synchronized boolean parkVehicle(Vehicle vehicle) {
        if (status != SpotStatus.AVAILABLE) {
            return false;
        }

        if (!vehicle.canFitInSpot(this)) {
            return false;
        }

        this.currentVehicle = vehicle;
        this.status = SpotStatus.OCCUPIED;
        return true;
    }

    public synchronized void removeVehicle() {
        this.currentVehicle = null;
        this.status = SpotStatus.AVAILABLE;
    }

    public boolean isAvailable() {
        return status == SpotStatus.AVAILABLE;
    }

    // Getters
    public String getSpotId() { return spotId; }
    public SpotType getType() { return type; }
    public SpotStatus getStatus() { return status; }
    public Vehicle getCurrentVehicle() { return currentVehicle; }
    public int getFloor() { return floor; }
}
```

### Parking Floor

```java
public class ParkingFloor {
    private final int floorNumber;
    private final Map<SpotType, List<ParkingSpot>> spotsByType;

    public ParkingFloor(int floorNumber) {
        this.floorNumber = floorNumber;
        this.spotsByType = new HashMap<>();
        for (SpotType type : SpotType.values()) {
            spotsByType.put(type, new ArrayList<>());
        }
    }

    public void addParkingSpot(ParkingSpot spot) {
        spotsByType.get(spot.getType()).add(spot);
    }

    public ParkingSpot findAvailableSpot(Vehicle vehicle) {
        // Try to find optimal spot first
        SpotType preferredType = getPreferredSpotType(vehicle.getType());

        for (ParkingSpot spot : spotsByType.get(preferredType)) {
            if (spot.isAvailable() && vehicle.canFitInSpot(spot)) {
                return spot;
            }
        }

        // If preferred not available, try other compatible spots
        for (List<ParkingSpot> spots : spotsByType.values()) {
            for (ParkingSpot spot : spots) {
                if (spot.isAvailable() && vehicle.canFitInSpot(spot)) {
                    return spot;
                }
            }
        }

        return null;
    }

    private SpotType getPreferredSpotType(VehicleType vehicleType) {
        switch (vehicleType) {
            case MOTORCYCLE:
                return SpotType.COMPACT;
            case CAR:
                return SpotType.REGULAR;
            case TRUCK:
                return SpotType.LARGE;
            default:
                return SpotType.REGULAR;
        }
    }

    public int getAvailableSpots(SpotType type) {
        return (int) spotsByType.get(type).stream()
                .filter(ParkingSpot::isAvailable)
                .count();
    }

    public int getFloorNumber() {
        return floorNumber;
    }
}
```

### Parking Ticket

```java
public class ParkingTicket {
    private final String ticketId;
    private final String licensePlate;
    private final LocalDateTime entryTime;
    private LocalDateTime exitTime;
    private final ParkingSpot spot;
    private double fee;
    private boolean isPaid;

    public ParkingTicket(String licensePlate, ParkingSpot spot) {
        this.ticketId = generateTicketId();
        this.licensePlate = licensePlate;
        this.spot = spot;
        this.entryTime = LocalDateTime.now();
        this.isPaid = false;
    }

    private String generateTicketId() {
        return "TKT-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase();
    }

    public void markExit() {
        this.exitTime = LocalDateTime.now();
    }

    public long getParkingDurationInMinutes() {
        LocalDateTime end = exitTime != null ? exitTime : LocalDateTime.now();
        return ChronoUnit.MINUTES.between(entryTime, end);
    }

    // Getters and setters
    public String getTicketId() { return ticketId; }
    public String getLicensePlate() { return licensePlate; }
    public LocalDateTime getEntryTime() { return entryTime; }
    public ParkingSpot getSpot() { return spot; }
    public double getFee() { return fee; }
    public void setFee(double fee) { this.fee = fee; }
    public boolean isPaid() { return isPaid; }
    public void setPaid(boolean paid) { isPaid = paid; }
}
```

### Fee Calculator (Strategy Pattern)

```java
public interface FeeCalculationStrategy {
    double calculateFee(ParkingTicket ticket);
}

public class HourlyFeeStrategy implements FeeCalculationStrategy {
    private static final double RATE_PER_HOUR = 5.0;
    private static final double FIRST_HOUR_FREE = 1.0;

    @Override
    public double calculateFee(ParkingTicket ticket) {
        long minutes = ticket.getParkingDurationInMinutes();
        double hours = Math.ceil(minutes / 60.0);

        if (hours <= FIRST_HOUR_FREE) {
            return 0.0;
        }

        return (hours - FIRST_HOUR_FREE) * RATE_PER_HOUR;
    }
}

public class FlatFeeStrategy implements FeeCalculationStrategy {
    private static final double FLAT_FEE = 10.0;

    @Override
    public double calculateFee(ParkingTicket ticket) {
        return FLAT_FEE;
    }
}
```

### Parking Lot (Singleton)

```java
public class ParkingLot {
    private static ParkingLot instance;
    private final String name;
    private final List<ParkingFloor> floors;
    private final Map<String, ParkingTicket> activeTickets;
    private FeeCalculationStrategy feeStrategy;

    private ParkingLot(String name, int numFloors) {
        this.name = name;
        this.floors = new ArrayList<>();
        this.activeTickets = new ConcurrentHashMap<>();
        this.feeStrategy = new HourlyFeeStrategy();

        // Initialize floors
        for (int i = 0; i < numFloors; i++) {
            floors.add(new ParkingFloor(i));
        }
    }

    public static synchronized ParkingLot getInstance(String name, int numFloors) {
        if (instance == null) {
            instance = new ParkingLot(name, numFloors);
        }
        return instance;
    }

    public ParkingTicket parkVehicle(Vehicle vehicle) {
        // Find available spot across all floors
        for (ParkingFloor floor : floors) {
            ParkingSpot spot = floor.findAvailableSpot(vehicle);
            if (spot != null && spot.parkVehicle(vehicle)) {
                ParkingTicket ticket = new ParkingTicket(
                    vehicle.getLicensePlate(),
                    spot
                );
                activeTickets.put(ticket.getTicketId(), ticket);
                return ticket;
            }
        }

        return null; // No spot available
    }

    public double unparkVehicle(String ticketId) {
        ParkingTicket ticket = activeTickets.get(ticketId);
        if (ticket == null) {
            throw new IllegalArgumentException("Invalid ticket");
        }

        ticket.markExit();
        double fee = feeStrategy.calculateFee(ticket);
        ticket.setFee(fee);

        // Remove vehicle from spot
        ticket.getSpot().removeVehicle();

        // Remove ticket from active tickets
        activeTickets.remove(ticketId);

        return fee;
    }

    public void displayAvailability() {
        System.out.println("=== " + name + " Availability ===");
        for (ParkingFloor floor : floors) {
            System.out.println("Floor " + floor.getFloorNumber() + ":");
            for (SpotType type : SpotType.values()) {
                int available = floor.getAvailableSpots(type);
                System.out.println("  " + type + ": " + available + " spots");
            }
        }
    }

    public void setFeeStrategy(FeeCalculationStrategy strategy) {
        this.feeStrategy = strategy;
    }

    public void addParkingSpot(int floorNumber, ParkingSpot spot) {
        if (floorNumber < floors.size()) {
            floors.get(floorNumber).addParkingSpot(spot);
        }
    }
}
```

## Usage Example

```java
public class ParkingLotDemo {
    public static void main(String[] args) {
        // Initialize parking lot
        ParkingLot parkingLot = ParkingLot.getInstance("City Center Parking", 3);

        // Add parking spots
        for (int floor = 0; floor < 3; floor++) {
            for (int i = 0; i < 10; i++) {
                parkingLot.addParkingSpot(floor,
                    new ParkingSpot("F" + floor + "-C" + i, SpotType.COMPACT, floor));
            }
            for (int i = 0; i < 20; i++) {
                parkingLot.addParkingSpot(floor,
                    new ParkingSpot("F" + floor + "-R" + i, SpotType.REGULAR, floor));
            }
            for (int i = 0; i < 5; i++) {
                parkingLot.addParkingSpot(floor,
                    new ParkingSpot("F" + floor + "-L" + i, SpotType.LARGE, floor));
            }
        }

        // Display initial availability
        parkingLot.displayAvailability();

        // Park vehicles
        Vehicle car1 = new Car("ABC-123");
        ParkingTicket ticket1 = parkingLot.parkVehicle(car1);
        System.out.println("Car parked. Ticket: " + ticket1.getTicketId());

        Vehicle motorcycle = new Motorcycle("XYZ-789");
        ParkingTicket ticket2 = parkingLot.parkVehicle(motorcycle);
        System.out.println("Motorcycle parked. Ticket: " + ticket2.getTicketId());

        // Display updated availability
        parkingLot.displayAvailability();

        // Simulate some time passing
        try { Thread.sleep(2000); } catch (InterruptedException e) {}

        // Unpark vehicle
        double fee = parkingLot.unparkVehicle(ticket1.getTicketId());
        System.out.println("Car unparked. Fee: $" + fee);

        // Display final availability
        parkingLot.displayAvailability();
    }
}
```

## Key Design Decisions

### 1. Thread Safety

- Used `synchronized` methods for parking/unparking
- `ConcurrentHashMap` for active tickets
- Prevents race conditions during spot allocation

### 2. Extensibility

- Abstract `Vehicle` class allows new vehicle types
- Strategy pattern for fee calculation
- Factory pattern for creating vehicles/spots

### 3. Optimization

- Spots grouped by type for faster lookups
- Preferred spot allocation (compact for motorcycle)
- O(1) ticket lookup using HashMap

## Trade-offs

| Decision                 | Pros                   | Cons                                   |
| ------------------------ | ---------------------- | -------------------------------------- |
| Singleton ParkingLot     | Single source of truth | Difficult to test, global state        |
| Synchronized methods     | Thread-safe            | Performance bottleneck under high load |
| In-memory tickets        | Fast access            | Lost on restart (needs persistence)    |
| Spot allocation strategy | Optimal space usage    | May not always find best spot          |

## 💡 Interview Tips & Out-of-the-Box Thinking

### Common Pitfalls

- **Not handling concurrent access**: Multiple gates trying to assign same spot - must use synchronization or locks
- **Forgetting vehicle size compatibility**: Truck can't fit in compact spot - need validation
- **Hardcoding spot allocation**: Should be strategy pattern for different algorithms (nearest, cheapest, etc.)
- **Not considering scalability**: Single lock on parking lot won't scale - need per-floor or per-spot locking

### Design Pattern Recognition

- **Singleton**: ParkingLot instance (one per physical location)
- **Factory Pattern**: Create different vehicle types
- **Strategy Pattern**: Different fee calculation strategies (hourly, daily, flat rate)
- **Observer Pattern**: Notify display boards when availability changes
- **State Pattern**: Vehicle spot status (Available → Reserved → Occupied)

### Advanced Considerations

- **Fine-grained locking**: Lock per floor instead of entire parking lot (reduces contention)
- **Optimistic locking**: Use version numbers for spot assignment to handle race conditions
- **Spot reservation expiry**: Reserved spots should auto-release if vehicle doesn't arrive in 15 min
- **Dynamic pricing**: Charge more for spots closer to entrance or during peak hours
- **Handicapped spots compliance**: Legal requirement to reserve certain percentage

### Creative Solutions

- **Smart parking guidance**: Use sensors and LED indicators to guide drivers to available spots
- **Predictive availability**: ML to predict when spots will free up based on historical data
- **Valet mode**: Allow valet parking where staff can park tighter/stack vehicles
- **EV charging integration**: Reserve spots with charging stations for electric vehicles
- **Multi-entrance optimization**: Route vehicles to floor with most availability

### Trade-off Discussions

- **HashMap vs Database**: In-memory (fast, volatile) vs Persistent storage (slower, durable)
- **Synchronized vs Lock**: Method-level sync (simple) vs ReentrantLock (fine control)
- **First-available vs Optimal**: Quick allocation vs Best spot near entrance (more compute)
- **Pre-allocation vs On-demand**: Reserve spots vs Allocate when vehicle enters

### Edge Cases to Mention

- **Spot released but ticket exists**: Payment processed but spot was reassigned due to bug (Answer: Transaction log for reconciliation)
- **Vehicle parked in wrong spot type**: Motorcycle in large spot - waste of space (Answer: Policy decision + pricing penalty)
- **Ticket lost by customer**: Can't identify which spot (Answer: License plate lookup + ID verification)
- **Multiple entrances simultaneously**: Same spot assigned to two vehicles (Answer: Distributed lock with TTL)
- **Payment failure but gate opened**: Vehicle exits without paying (Answer: License plate capture + billing later)
- **Fire evacuation**: All gates must open immediately (Answer: Emergency override mode)

## Follow-up Enhancements

1. **Persistence**: Add database layer for tickets and spots
2. **Payment Integration**: Support multiple payment methods
3. **Reservation System**: Allow advance booking
4. **Analytics**: Track usage patterns, revenue
5. **Multi-level Locking**: Fine-grained locks per floor
6. **Event-driven**: Use events for availability updates
