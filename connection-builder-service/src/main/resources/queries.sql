SELECT * FROM FLIGHT_SCHEDULE ;

SELECT fs1.*, fs2.*, DATEDIFF(MINUTE,fs1.arrival_time,fs2.departure_time)  FROM FLIGHT_SCHEDULE fs1, FLIGHT_SCHEDULE fs2 WHERE fs1.arrival_airport = fs2.departure_airport AND DATEDIFF(MINUTE,fs1.arrival_time,fs2.departure_time) BETWEEN 120 AND 480 ;