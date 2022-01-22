package chhaya.chaudhari.masterdataservice.service;

import chhaya.chaudhari.masterdataservice.dto.Airport;
import chhaya.chaudhari.masterdataservice.dto.UpdateAirport;
import chhaya.chaudhari.masterdataservice.exception.ObjectAlreadyExistsException;
import chhaya.chaudhari.masterdataservice.mapper.AirportMapper;
import chhaya.chaudhari.masterdataservice.repository.AirportRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import java.sql.SQLException;
import java.sql.SQLIntegrityConstraintViolationException;
import java.util.List;

@Service
public class AirportService {

    private final AirportRepository airportRepository;

    private final AirportMapper airportMapper;

    public AirportService(AirportRepository airportRepository, AirportMapper airportMapper) {
        this.airportRepository = airportRepository;
        this.airportMapper = airportMapper;
    }

    public void create(Airport airport) {

        chhaya.chaudhari.masterdataservice.entity.Airport airportEntity = airportMapper.map(airport);

        try {
            airportRepository.save(airportEntity);

        } catch (DataIntegrityViolationException e) {

            throw new ObjectAlreadyExistsException("Airport with code " + airport.getCode() + " is already exists.");
        }
    }

    public Airport find(String code) {

        chhaya.chaudhari.masterdataservice.entity.Airport airport = airportRepository.findByCode(code);

        return airportMapper.map(airport);

    }

    public void update(String code, UpdateAirport updateAirport) {

        chhaya.chaudhari.masterdataservice.entity.Airport airport = airportRepository.findByCode(code);

        airportMapper.map(updateAirport, airport);

        airportRepository.save(airport);

    }

    public void delete(String code) {

        chhaya.chaudhari.masterdataservice.entity.Airport airport = airportRepository.findByCode(code);

        airportRepository.delete(airport);

    }

    public List<String> searchCodes(String code) {

        return airportRepository.findAirportCodes(code.toUpperCase());
    }
}
