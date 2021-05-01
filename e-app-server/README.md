# E-APP-Server

This Java [Spring](https://spring.io/) project represents the back-end of the E-APP system, an appointment allocation system with optimization for university sector.
This runnable prototype was developed in the scope of the master thesis of Stefan Brautzsch at [Technische Hochschule Brandenburg](https://www.th-brandenburg.de/).

In addition to this application server (E-APP-Server), the web apps E-APP-Planner and E-APP-Client are part of the system.

## Install and Build

[OpenJDK](https://openjdk.java.net/) 11 or higher is required. The environment variable JAVA_HOME must be set.

1. [Download](https://jdk.java.net/) and install OpenJDK 11 or higher and set the environment variable JAVA_HOME
2. In the shell, go to the source code directory of the `e-app-server` project
3. Run for Windows `mvnw.cmd clean install` or for Linux/macOS `mvnw clean install`

The runnable JAR build artifact will be stored in the `target/` directory.

## Use for demo mode

The E-APP-Server can be started in a demo mode without persistent data storage. 
In the process, the E-APP-Planner and E-APP-Client web apps are deployed in a demo mode.

Run the JAR file with the parameter: `--spring.profiles.active=demo`

Example: `java -jar e-app-server-0.6.0.jar --spring.profiles.active=demo`

The build with demo environment of the web apps is stored at `src/main/resources/static/`.

After starting, the web apps can be launched at the following URL:
* E-APP-Planner: `http://localhost:48080/e-app-planner`
* E-APP-Client: `http://localhost:48080/e-app-client`

## Use for production

### Configuration
The configuration file `application-prod.properties` is required for productive use.
Use the `src\main\resources\application-prod.properties` file as a template.
The parameters are provided with comments for documentation.
Check out the [Spring documentation](https://docs.spring.io/spring-boot/docs/2.4.1/reference/html/) for further assistance.

### Run
Configuration file `application-prod.properties` and the runnable JAR build artifact must be located in the same directory.

1. In the shell, go to the directory with configuration file and JAR file
2. Run the JAR file with the parameter: `--spring.profiles.active=prod`
   
Example: `java -jar e-app-server-0.6.0.jar --spring.profiles.active=prod`

## Moodle Integration

The system can be integrated into [Moodle](https://moodle.org/) as an [external tool](https://docs.moodle.org/310/en/External_tool).
The Moodle administrator will need the values of the following configuration parameters from the configuration file `application-prod.properties`:
* `lti.moodle.planner.key`
* `lti.moodle.planner.secret`
* `lti.moodle.client.key`
* `lti.moodle.client.secret`

Separate external tools are set up for both web apps, where the URL is the URL of the E-APP-Server extended by `/lti-client` or `/lti-planner`.
Select `LTI 1.0/1.1` as the LTI version.

Example URL: `https://example.com:8080/lti-client`

When accessing via Moodle, required users and roles are assigned automatically.
The external tools in Moodle may only be accessible to the group of people who are allowed to access the E-APP system with the corresponding role.
This responsibility is therefore placed on the Moodle administrators and course trainers.

## Further help

For further assistance, see the file [HELP.md](HELP.md).
