package chhaya.chaudhari.masterdataservice.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotNull;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Airport {

    @NotNull(message = "Code must not be null or empty")
    private String code;

    @NotNull(message = "Name must not be null or empty")
    private String name;

    @NotNull(message = "CityName must not be null or empty")
    private String cityName;

    @NotNull(message = "Co ordinates must not be null or empty")
    private String coOrdinates;

    public void setCode(String code) {
        this.code=code;
    }

}
