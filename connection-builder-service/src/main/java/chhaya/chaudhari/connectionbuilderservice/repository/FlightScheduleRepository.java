package chhaya.chaudhari.connectionbuilderservice.repository;

import chhaya.chaudhari.connectionbuilderservice.dto.ConnectedFlight;
import chhaya.chaudhari.connectionbuilderservice.entity.FlightSchedule;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface FlightScheduleRepository extends JpaRepository<FlightSchedule, Long> {

    @Query("SELECT new chhaya.chaudhari.connectionbuilderservice.dto.ConnectedFlight(fs1.flightNumber, fs1.departureAirport, fs1.arrivalAirport, fs1.departureTime, fs1.arrivalTime, fs2.flightNumber, fs2.departureAirport, fs2.arrivalAirport, fs2.departureTime, fs2.arrivalTime)" +
            "FROM FlightSchedule fs1 INNER JOIN FlightSchedule fs2 ON fs1.arrivalAirport = fs2.departureAirport " +
            "WHERE fs1.departureAirport = ?1 AND fs2.arrivalAirport= ?2")
    List<ConnectedFlight> findConnectedFlights(String source, String destination);
}
