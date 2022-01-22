package chhaya.chaudhari.connectionbuilderservice.service;

import chhaya.chaudhari.connectionbuilderservice.dto.ConnectedFlight;
import chhaya.chaudhari.connectionbuilderservice.dto.FlightConnectionRequest;
import chhaya.chaudhari.connectionbuilderservice.repository.FlightScheduleRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class FlightConnectionService {

    private static final long WAITING_TIME_MIN_HOURS = 2;
    private static final long WAITING_TIME_MAX_HOURS = 8;

    private final FlightScheduleRepository flightScheduleRepository;

    public FlightConnectionService(FlightScheduleRepository flightScheduleRepository) {
        this.flightScheduleRepository = flightScheduleRepository;
    }

    public List<ConnectedFlight> getConnectedFlights(FlightConnectionRequest request) {

        List<ConnectedFlight> connectedFlights = flightScheduleRepository.findConnectedFlights(request.getDepartureAirport(), request.getArrivalAirport());

        return connectedFlights.stream()
                .filter(connectedFlight -> isConnectionTimeValid(connectedFlight.getOnwardArrTime(), connectedFlight.getConnDepTime()))
                .collect(Collectors.toList());

    }

    private boolean isConnectionTimeValid(LocalTime arrivalTime, LocalTime departureTime) {

        long waitingHours = ChronoUnit.HOURS.between(arrivalTime, departureTime);

        // If waiting time is negative, take connecting flight's departure time to next day
        if (waitingHours < 0) {
            LocalDateTime arrivalDateTime = LocalDateTime.of(LocalDate.now(), arrivalTime);
            LocalDateTime departureDateTime = LocalDateTime.of(LocalDate.now().plusDays(1), departureTime);
            waitingHours = ChronoUnit.HOURS.between(arrivalDateTime, departureDateTime);
        }
        return waitingHours >= WAITING_TIME_MIN_HOURS && waitingHours <= WAITING_TIME_MAX_HOURS;
    }
}