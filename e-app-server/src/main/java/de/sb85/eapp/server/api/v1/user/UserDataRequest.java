package de.sb85.eapp.server.api.v1.user;

public class UserDataRequest {

    private String preName;
    private String name;
    private String tel;
    private Boolean bookingActive;
    private Boolean feedsActive;

    public UserDataRequest() {

    }

    public String getPreName() {
        return preName;
    }

    public String getName() {
        return name;
    }

    public String getTel() {
        return tel;
    }

    public Boolean getBookingActive() {
        return bookingActive;
    }

    public Boolean getFeedsActive() {
        return feedsActive;
    }

}
