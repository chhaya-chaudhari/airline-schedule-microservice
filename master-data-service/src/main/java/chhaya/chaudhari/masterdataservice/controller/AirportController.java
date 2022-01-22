package chhaya.chaudhari.masterdataservice.controller;

import chhaya.chaudhari.masterdataservice.dto.Airport;
import chhaya.chaudhari.masterdataservice.dto.UpdateAirport;
import chhaya.chaudhari.masterdataservice.service.AirportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.websocket.server.PathParam;
import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/airports")
public class AirportController {

    private final AirportService airportService;

    public AirportController(AirportService airportService) {
        this.airportService = airportService;
    }

    @PostMapping
    public ResponseEntity<?> create(@RequestBody @Valid Airport airport) {

        airportService.create(airport);

        return ResponseEntity.created(URI.create("/airports/" + airport.getCode())).build();
    }

    @GetMapping("/{code}")
    public Airport find(@PathVariable String code) {

        return airportService.find(code);
    }

    @PutMapping("/{code}")
    public void update(@PathVariable String code, @RequestBody UpdateAirport updateAirport) {

        airportService.update(code, updateAirport);
    }

    @DeleteMapping("/{code}")
    public ResponseEntity<?> delete(@PathVariable String code) {

        airportService.delete(code);

        return ResponseEntity.noContent().build();
    }

    @GetMapping("/search-codes")
    public List<String> searchCodes(@RequestParam String code) {

        return airportService.searchCodes(code);
    }
}
