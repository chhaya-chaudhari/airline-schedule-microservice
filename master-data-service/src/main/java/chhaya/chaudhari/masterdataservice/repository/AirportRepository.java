package chhaya.chaudhari.masterdataservice.repository;

import chhaya.chaudhari.masterdataservice.entity.Airport;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AirportRepository extends JpaRepository<Airport, Long> {

    Airport findByCode(String code);

    @Query("SELECT a.code FROM Airport a WHERE a.code LIKE :code%")
    List<String> findAirportCodes(@Param("code") String code);
}
