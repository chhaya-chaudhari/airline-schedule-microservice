export const gatewayUrl= "http://localhost:9090/"
export const getFlightData =  gatewayUrl +'connection-builder-service/api/flight-connections';
export const getAirportDetails = gatewayUrl +'master-data-service/api/airports';
export const searchCode = getAirportDetails+'/search-codes';
