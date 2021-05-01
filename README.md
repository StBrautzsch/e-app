# E-APP

This is the repository of the E-APP system, an appointment allocation system with optimization for university sector.
This runnable prototype was developed in the scope of the master thesis of Stefan Brautzsch at [Technische Hochschule Brandenburg](https://www.th-brandenburg.de/).

It consists of two components:
* Angular project [e-app-pwa](e-app-pwa) for the front-end
* Java Spring project [e-app-server](e-app-server) for the back-end

## Live demo

1. [Download](https://github.com/StBrautzsch/e-app/releases/tag/0.6.0) the ZIP file for your platform (win, linux or mac)
2. Unzip the file
3. In the shell, go to the unzipped directory
4. Run the start script (`start_win.bat`, `start_linux.sh` or `start_mac.command`)

Alternatively, download the JAR file and start the system manually. A JDK version 12 or higher is required:

`java -jar e-app-server-0.6.0.jar --spring.profiles.active=demo`

After starting, the Web Apps can be launched at the following URL:
* E-APP-Planner: `http://localhost:48080/e-app-planner`
* E-APP-Client: `http://localhost:48080/e-app-client`

Network ports 48080 must be available.

## Screenshots

### E-APP-Planner
![E-APP-Planner](https://user-images.githubusercontent.com/32307692/116778183-baaea980-aa70-11eb-9b51-3f8781db197f.png)
![E-APP-Planner](https://user-images.githubusercontent.com/32307692/116778182-baaea980-aa70-11eb-9016-fb4714c891dc.png)

### E-APP-Client
![E-APP-Client](https://user-images.githubusercontent.com/32307692/116778181-ba161300-aa70-11eb-9001-e3d2700b8f76.png)
