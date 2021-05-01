package de.sb85.eapp.server.security.lti.data;

import de.sb85.eapp.server.security.lti.exceptions.LtiRequestInvalidException;

import javax.servlet.http.HttpServletRequest;

public class LtiRequest {

    private static final String LTI_PARA_MAIL = "lis_person_contact_email_primary";
    private static final String LTI_PARA_KEY = "oauth_consumer_key";
    private static final String LTI_PARA_PRE_NAME = "lis_person_name_given";
    private static final String LTI_PARA_NAME = "lis_person_name_full";
    private static final String LTI_TITLE = "resource_link_title";
    private static final String LTI_URL = "lis_outcome_service_url";
    private static final String LTI_ID = "user_id";

    private final String mail;
    private final String preName;
    private final String name;
    private final String key;
    private final String title;
    private final String url;
    private final String id;

    private final HttpServletRequest request;

    public LtiRequest(HttpServletRequest request) throws LtiRequestInvalidException {
        this.request = request;
        this.mail = readRequestParameter(LTI_PARA_MAIL, true);
        this.preName = readRequestParameter(LTI_PARA_PRE_NAME, true);
        this.name = readRequestParameter(LTI_PARA_NAME, true);
        this.key = readRequestParameter(LTI_PARA_KEY, true);
        this.title = readRequestParameter(LTI_TITLE, false);
        this.url = readRequestParameter(LTI_URL, true);
        this.id = readRequestParameter(LTI_ID, true);
    }

    private String readRequestParameter(String para, boolean required) throws LtiRequestInvalidException {
        String value = request.getParameter(para);
        if (value == null) {
            if(required) {
                throw new LtiRequestInvalidException();
            } else {
                value = "";
            }
        }
        return value;
    }

    public String getMail() {
        return mail;
    }

    public String getPreName() {
        return preName;
    }

    public String getName() {
        return name;
    }

    public String getKey() {
        return key;
    }

    public String getTitle() {
        return title;
    }

    public String getUrl() {
        return url;
    }

    public String getId() {
        return id;
    }

}
