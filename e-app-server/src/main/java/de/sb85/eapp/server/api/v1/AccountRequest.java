package de.sb85.eapp.server.api.v1;

public class AccountRequest extends UserResponseRequestBasics {

    private Boolean clientActive;
    private Boolean plannerActive;
    private Boolean active;
    private Boolean bookingActive;

    public AccountRequest() {
        super();
    }

    public Boolean getClientActive() {
        return clientActive;
    }

    public Boolean getPlannerActive() {
        return plannerActive;
    }

    public Boolean getActive() {
        return active;
    }

    public Boolean getBookingActive() {
        return bookingActive;
    }

}
