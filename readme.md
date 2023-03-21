# EK Flight Connections Search

A multi-module project including UI to search flight connections. Each module is a Spring Boot service and can be run individually. They are:
1. Master Data Service
2. Connection Builder Service
3. API Gateway Service
4. Flight Connections Search UI

## Install maven for ubuntu
```
sudo apt update
```
sudo apt install maven
```

## Build

Project build can be done by following command from the root directory.

```bash
mvn clean install
```
## Run
Each service can be run by the following command.
```
mvn spring-boot:run
```
## UI Access

User interface can be accessed by hitting the following url in Browser.
```
http://localhost:8090
```
## Code Coverage

To generate the code coverage
```
mvn -f pom.xml org.jacoco:jacoco-maven-plugin:prepare-agent clean install sonar:sonar 
```

