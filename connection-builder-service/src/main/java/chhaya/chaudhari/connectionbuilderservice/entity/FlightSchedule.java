package chhaya.chaudhari.connectionbuilderservice.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import java.time.LocalTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class FlightSchedule {

    @Id
    private Long id;

    @Column(name = "FLIGHT_NO")
    private String flightNumber;

    @Column(name = "DEPARTURE_AIRPORT")
    private String departureAirport;

    @Column(name = "ARRIVAL_AIRPORT")
    private String arrivalAirport;

    @Column(name = "DEPARTURE_TIME")
    private LocalTime departureTime;

    @Column(name = "ARRIVAL_TIME")
    private LocalTime arrivalTime;
}
