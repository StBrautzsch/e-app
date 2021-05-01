package de.sb85.eapp.server;

import org.apache.maven.model.Model;
import org.apache.maven.model.io.xpp3.MavenXpp3Reader;
import org.codehaus.plexus.util.xml.pull.XmlPullParserException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.MediaType;

import java.io.File;
import java.io.FileReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.nio.charset.Charset;
import java.nio.charset.StandardCharsets;

@Configuration
public class ApplicationConfig {

    public final static String API_V1_PREFIX = "/api/v1";
    public final static String API_V1_BOOKING = API_V1_PREFIX + "/booking";
    public final static String API_V1_BOOKING_APPOINTMENT = API_V1_BOOKING + "/appointment";
    public final static String API_V1_PING = API_V1_PREFIX + "/ping";
    public final static String API_V1_ICAL = API_V1_PREFIX + "/ical";
    public final static String API_V1_ICAL_FEED = API_V1_PREFIX + "/ical-feeds";
    public final static String API_V1_PLANNER = API_V1_PREFIX + "/planner";
    public final static String API_V1_PLANNER_SETTINGS = API_V1_PLANNER + "/settings";
    public final static String API_V1_PLANNER_SLOT = API_V1_PLANNER + "/slot";
    public final static String API_V1_CLIENT = API_V1_PREFIX + "/client";
    public final static String API_V1_CLIENT_SETTINGS = API_V1_CLIENT + "/settings";
    public final static String API_V1_CLIENT_APPOINTMENT = API_V1_CLIENT + "/appointment";
    public final static String API_V1_ADMIN = API_V1_PREFIX + "/admin";
    public final static String API_V1_ADMIN_ACCOUNT = API_V1_ADMIN + "/account";
    public final static String API_V1_USER = API_V1_PREFIX + "/user";
    public final static String API_V1_USER_PW = API_V1_USER + "/pw";
    public final static String API_V1_USER_DATA = API_V1_USER + "/data";
    public final static String API_V1_USER_MAIL = API_V1_USER + "/mail";
    public final static String API_V1_USER_TOKEN = API_V1_USER + "/token";
    public final static String API_V1_AUTH = API_V1_PREFIX + "/auth";
    public final static String API_V1_AUTH_RENEW = API_V1_AUTH + "/renew";
    public final static String API_V1_AUTH_ACCOUNT_VERIFICATION = API_V1_AUTH + "/verify-account";
    public final static String API_V1_AUTH_MAIL_VERIFICATION = API_V1_AUTH + "/verify-mail";
    public final static String API_V1_AUTH_ACCOUNT = API_V1_AUTH + "/account";

    public final static String API_START_CLIENT_APP = "/client";
    public final static String API_START_PLANNER_APP = "/planner";

    public final static String API_LTI_CLIENT = "/lti-client";
    public final static String API_LTI_PLANNER = "/lti-planner";

    public final static String DEMO_CLIENT_APP = "/e-app-client";
    public final static String DEMO_PLANNER_APP = "/e-app-planner";

    public final static String ROLE_USER = "USER";
    public final static String ROLE_CLIENT = "CLIENT";
    public final static String ROLE_PLANNER = "PLANNER";
    public final static String ROLE_ADMIN = "ADMIN";

    public final static Charset DEFAULT_CHARSET = StandardCharsets.UTF_8;

    public final static MediaType ICAL_MEDIA_TYPE = new MediaType("text", "calendar", DEFAULT_CHARSET);

    public final static long MS_PER_SEC = 1000;
    public final static long MS_PER_MIN = MS_PER_SEC * 60;
    public final static long MS_PER_HOUR = MS_PER_MIN * 60;
    public final static long MS_PER_DAY = MS_PER_HOUR * 24;
    public final static long MS_PER_WEEK = MS_PER_DAY * 7;

    public final static long SEND_MAIL_INTERVAL = MS_PER_SEC * 10;
    public final static long CLEANUP_INTERVAL = MS_PER_HOUR;

    @Value("${admin.mail}")
    private String adminMail;
    @Value("${admin.pw}")
    private String adminPw;

    @Value("${url.planner}")
    private String urlPlanner;
    @Value("${url.client}")
    private String urlClient;

    private String version = "?";
    private String name = "?";
    private String description = "?";

    public ApplicationConfig() {
        readMavenData();
    }

    private void readMavenData() {
        try {
            Model model = getModel();
            version = model.getVersion();
            name = model.getName();
            description = model.getDescription();
        } catch (Exception e) {
        }
    }

    private Model getModel() throws IOException, XmlPullParserException {
        MavenXpp3Reader reader = new MavenXpp3Reader();
        if ((new File("pom.xml")).exists()) {
            return reader.read(new FileReader("pom.xml"));
        }
        return reader.read(
                new InputStreamReader(EAppServerApplication.class.
                        getResourceAsStream("/META-INF/maven/de.sb85/e-app-server/pom.xml")));
    }

    public String getVersion() {
        return version;
    }

    public String getName() {
        return name;
    }

    public String getDescription() {
        return description;
    }

    public String getAdminMail() {
        return adminMail;
    }

    public String getAdminPw() {
        return adminPw;
    }

    public String getUrlPlanner() {
        return urlPlanner;
    }

    public String getUrlClient() {
        return urlClient;
    }

}
