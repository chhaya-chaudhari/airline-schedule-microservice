package chhaya.chaudhari.connectionbuilderservice.dto;

import lombok.*;

import java.time.LocalTime;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ConnectedFlight {

    private String onwardFltNo;

    private String onwardDepArpt;

    private String onwardArrArpt;

    private LocalTime onwardDepTime;

    private LocalTime onwardArrTime;

    private String connFltNo;

    private String connDepArpt;

    private String connArrArpt;

    private LocalTime connDepTime;

    private LocalTime connArrTime;
}
