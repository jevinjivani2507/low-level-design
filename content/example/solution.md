---
title: "Parking Lot System"
---

# Solution: Parking Lot System

## Class Diagram

The main classes are:

- **ParkingLot** — singleton, manages floors
- **ParkingFloor** — contains spots
- **ParkingSpot** — abstract base; subtypes: `MotorcycleSpot`, `CompactSpot`, `LargeSpot`
- **Vehicle** — abstract base; subtypes: `Motorcycle`, `Car`, `Bus`
- **Ticket** — issued when a vehicle is parked

## Key Classes

```python
class VehicleType(Enum):
    MOTORCYCLE = 1
    CAR = 2
    BUS = 3

class ParkingSpotType(Enum):
    MOTORCYCLE = 1
    COMPACT = 2
    LARGE = 3

class ParkingSpot:
    def __init__(self, spot_type: ParkingSpotType):
        self.spot_type = spot_type
        self.vehicle = None

    def is_available(self) -> bool:
        return self.vehicle is None

    def park(self, vehicle: "Vehicle"):
        self.vehicle = vehicle

    def remove_vehicle(self):
        self.vehicle = None
```

## Parking Strategy

Use the **Strategy Pattern** so different vehicle types can have different spot-finding logic:

```python
class ParkingStrategy(ABC):
    @abstractmethod
    def find_spot(self, floor: "ParkingFloor") -> Optional[ParkingSpot]:
        pass

class MotorcycleParkingStrategy(ParkingStrategy):
    def find_spot(self, floor):
        # Can park in any spot
        for spot in floor.spots:
            if spot.is_available():
                return spot
        return None
```

## Concurrency

Use a **lock per floor** to allow parallel parking across floors while serializing within a floor. This avoids a global lock bottleneck.

```python
import threading

class ParkingFloor:
    def __init__(self, spots):
        self.spots = spots
        self._lock = threading.Lock()

    def park_vehicle(self, vehicle, strategy):
        with self._lock:
            spot = strategy.find_spot(self)
            if spot:
                spot.park(vehicle)
                return Ticket(vehicle, spot)
        return None
```
