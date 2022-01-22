DROP TABLE IF EXISTS FLIGHT_SCHEDULE;

CREATE TABLE FLIGHT_SCHEDULE (
  id INT AUTO_INCREMENT PRIMARY KEY,
  flight_no NUMBER NOT NULL,
  departure_airport VARCHAR(5) NOT NULL,
  arrival_airport VARCHAR(5) NOT NULL,
  departure_time TIME NOT NULL,
  arrival_time TIME NOT NULL
);

INSERT INTO FLIGHT_SCHEDULE (flight_no, departure_airport, arrival_airport, departure_time, arrival_time) VALUES
  (501, 'BOM', 'DXB', '4:30', '6:00'),
  (2137, 'BOM', 'DXB', '5:10', '6:50'),
  (507, 'BOM', 'DXB', '15:35', '17:20'),
  (503, 'BOM', 'DXB', '19:20', '21:00'),
  (201, 'DXB', 'JFK', '8:30', '14:25'),
  (203, 'DXB', 'JFK', '2:50', '08:50'),
  (205, 'DXB', 'JFK', '9:45', '19:00'),
  (211, 'DXB', 'IAH', '9:35', '16:50');