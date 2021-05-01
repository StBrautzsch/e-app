package de.sb85.eapp.server.api.v1;

import de.sb85.eapp.server.services.user.data.User;

public abstract class UserResponseRequestBasics {

    protected Integer id;
    protected String preName;
    protected String name;
    protected String tel;
    protected String mail;
    protected String mailChange;
    protected Boolean admin;
    protected Boolean bookingActive;
    protected Boolean systemUser;
    protected String feedsRef;
    protected Boolean feedsActive;

    protected UserResponseRequestBasics() {
    }

    protected UserResponseRequestBasics(User user) {
        this.id = user.getId();
        this.mail = user.getMail();
        this.preName = user.getPreName();
        this.name = user.getName();
        this.tel = user.getTel();
        this.mailChange = user.getMailChange();
        this.admin = user.getAdmin();
        this.bookingActive = user.getBookingActive();
        this.systemUser = user.isSystemUser();
        this.feedsRef = user.getFeedsRef();
        this.feedsActive = false;
        if(user.getFeedsRef() != null) {
            this.feedsActive = true;
        }
    }

    public Integer getId() {
        return id;
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

    public String getMail() {
        return mail;
    }

    public String getMailChange() {
        return mailChange;
    }

    public Boolean getAdmin() {
        return admin;
    }

    public Boolean getBookingActive() {
        return bookingActive;
    }

    public Boolean getSystemUser() {
        return systemUser;
    }

    public String getFeedsRef() {
        return feedsRef;
    }

    public Boolean getFeedsActive() {
        return feedsActive;
    }

}
