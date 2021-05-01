package de.sb85.eapp.server.api.v1.booking;

import de.sb85.eapp.server.api.v1.BookingRequest;

public class BookingAnonymRequest extends BookingRequest {

    private String name;
    private String mail;
    private String tel;

    BookingAnonymRequest() {
        super();
    }

    public String getName() {
        return name;
    }

    public String getMail() {
        return mail;
    }

    public String getTel() {
        return tel;
    }

}
