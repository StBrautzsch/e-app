package de.sb85.eapp.server.services.booking.data;

import de.sb85.eapp.server.services.DataBasics;

import javax.persistence.Entity;

@Entity
public class AnonymClient extends DataBasics {

    private String mail;
    private String name;
    private String tel;

    public AnonymClient() {
        super();
    }

    public AnonymClient(String mail, String name, String tel) {
        super();
        this.mail = mail;
        this.name = name;
        this.tel = tel;

    }

    public String getMail() {
        return mail;
    }

    public String getName() {
        return name;
    }

    public String getTel() {
        return tel;
    }

}
