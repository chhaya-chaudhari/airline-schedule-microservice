package chhaya.chaudhari.masterdataservice.mapper;

import chhaya.chaudhari.masterdataservice.dto.UpdateAirport;
import chhaya.chaudhari.masterdataservice.entity.Airport;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface AirportMapper {

    Airport map(chhaya.chaudhari.masterdataservice.dto.Airport airport);

    chhaya.chaudhari.masterdataservice.dto.Airport map(Airport airport);

    void map(UpdateAirport updateAirport, @MappingTarget Airport airport);
}
