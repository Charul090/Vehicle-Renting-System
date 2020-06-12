CREATE TABLE car(id INT NOT NULL,
    car_name varchar(50),
    car_make varchar(50),
    car_model varchar(50),
    car_vin VARCHAR(50),
    color varchar(50),
    current_location_id int,PRIMARY KEY(id),
    FOREIGN KEY(current_location_id) REFERENCES location(id));



INSERT INTO car (id, car_name, car_make, car_vin, color, current_location_id) VALUES (1, '911', 'Porsche', 'JH4CU4F45CC086765', 'Blue',5);
INSERT INTO car (id, car_name, car_make, car_vin, color, current_location_id) VALUES (2, 'S5', 'Audi', 'WP0AA2A93BS419039', 'Pink', 6);
INSERT INTO car (id, car_name, car_make, car_vin, color, current_location_id) VALUES (3, 'Ram Van 1500', 'Dodge', '1FAHP3DN7AW744866', 'Fuscia',4 );
INSERT INTO car (id, car_name, car_make, car_vin, color, current_location_id) VALUES (4, 'Discovery', 'Land Rover', '2T2BK1BA5AC695352', 'Indigo',7 );
INSERT INTO car (id, car_name, car_make, car_vin, color, current_location_id) VALUES (5, 'G25', 'Infiniti', '5FNRL5H20CB843106', 'Orange', 3);
INSERT INTO car (id, car_name, car_make, car_vin, color, current_location_id) VALUES (6, 'Esprit', 'Lotus', '2G4GN5EX8E9390549', 'Orange', 8);
INSERT INTO car (id, car_name, car_make, car_vin, color, current_location_id) VALUES (7, 'Escape', 'Ford', '5GAKRBKD7DJ656045', 'Violet', 2);
INSERT INTO car (id, car_name, car_make, car_vin, color, current_location_id) VALUES (8, 'Commander', 'Jeep', 'WAU3GBFC7DN427977', 'Blue', 9);
INSERT INTO car (id, car_name, car_make, car_vin, color, current_location_id) VALUES (9, 'R32', 'Volkswagen', 'WAUAF78E78A701701', 'Crimson',1 );
INSERT INTO car (id, car_name, car_make, car_vin, color, current_location_id) VALUES (10, '1000', 'Pontiac', '1GYUKJEF2AR848211', 'Turquoise',10);

