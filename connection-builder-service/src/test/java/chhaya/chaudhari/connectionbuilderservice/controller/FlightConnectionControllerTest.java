package chhaya.chaudhari.connectionbuilderservice.controller;

import chhaya.chaudhari.connectionbuilderservice.dto.ConnectedFlight;
import chhaya.chaudhari.connectionbuilderservice.dto.FlightConnectionRequest;
import chhaya.chaudhari.connectionbuilderservice.service.FlightConnectionService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.assertj.core.util.Lists;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mockito;
import org.mockito.junit.MockitoJUnitRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.util.List;

import static org.mockito.ArgumentMatchers.isA;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;

@RunWith(MockitoJUnitRunner.class)
public class FlightConnectionControllerTest {

    private MockMvc mockMvc;

    private FlightConnectionController flightConnectionController;

    private FlightConnectionService flightConnectionService;

    public FlightConnectionControllerTest() {

        flightConnectionService = Mockito.mock(FlightConnectionService.class);
        flightConnectionController = new FlightConnectionController(flightConnectionService);
    }

    @Before
    public void setUp() {

        this.mockMvc = MockMvcBuilders.standaloneSetup(flightConnectionController).build();
    }

    @Test
    public void shouldReturnFlightConnections() throws Exception {

        ConnectedFlight connectedFlight = ConnectedFlight.builder()
                .connFltNo("501")
                .connArrArpt("DXB")
                .onwardFltNo("201")
                .onwardDepArpt("BOM")
                .build();
        List<ConnectedFlight> connectedFlights = Lists.newArrayList(connectedFlight);

        Mockito.when(flightConnectionService.getConnectedFlights(isA(FlightConnectionRequest.class))).thenReturn(connectedFlights);

        FlightConnectionRequest request = FlightConnectionRequest.builder()
                .arrivalAirport("JFK")
                .departureAirport("BOM")
                .build();

        this.mockMvc.perform(post("/api/flight-connections")
                .content(new ObjectMapper().writeValueAsString(request))
                .header("Content-Type", "application/json"))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$[0].connFltNo").value("501"))
                .andExpect(MockMvcResultMatchers.jsonPath("$[0].connArrArpt").value("DXB"))
                .andExpect(MockMvcResultMatchers.jsonPath("$[0].onwardFltNo").value("201"));
    }
}
