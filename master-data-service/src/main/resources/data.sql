DROP TABLE IF EXISTS AIRPORT;

CREATE TABLE AIRPORT (
  id INT AUTO_INCREMENT  PRIMARY KEY,
  code VARCHAR(5) NOT NULL UNIQUE,
  name VARCHAR(100) NOT NULL,
  city_name VARCHAR(30) NOT NULL,
  co_ordinates VARCHAR(100) NOT NULL
);

INSERT INTO AIRPORT (code, name, city_name, co_ordinates) VALUES
  ('BOM', 'Chhatrapati Shivaji Maharaj International Airport', 'Mumbai', '19°05′19″N 72°52′05″E'),
  ('DXB', 'Dubai Internation Airport', 'Dubai', '25°15′10″N 055°21′52″E'),
  ('JFK', 'John F. Kennedy International Airport', 'New York', '40°38′23″N 073°46′44″W'),
  ('IAH', 'George Bush Intercontinental Airport', 'Houston', '29°59′04″N 095°20′29″W');