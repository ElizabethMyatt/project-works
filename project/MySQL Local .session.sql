CREATE TABLE airline_delay_cause (
    carrier VARCHAR(10),
    airport VARCHAR(10),
    month INT,
    arr_flights INT,
    weather_ct INT,
    nas_ct INT,
    security_ct INT,
    late_aircraft_ct INT,
    weather_delay INT,
    nas_delay INT,
    carrier_delay INT,
    arr_delay INT
);


LOAD DATA INFILE '/path/to/Airline_Delay_Cause.csv'
INTO TABLE airline_delay_cause
FIELDS TERMINATED BY ',' 
LINES TERMINATED BY '\n'
IGNORE 1 ROWS
(carrier, airport, month, arr_flights, weather_ct, nas_ct, security_ct, late_aircraft_ct, weather_delay, nas_delay, carrier_delay, arr_delay);


SELECT * FROM airline_delay_cause LIMIT 10;


SHOW TABLES;
DESCRIBE airline_delay_cause;

DROP TABLE airline_delay_cause;
