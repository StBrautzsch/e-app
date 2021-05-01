package de.sb85.eapp.server.services.user.data;

import de.sb85.eapp.server.services.DataBasics;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;

@Entity
public class Client extends DataBasics {

    @OneToOne(targetEntity = ClientSettings.class, cascade = CascadeType.ALL)
    @JoinColumn(unique = true)
    private ClientSettings settings;

    public Client() {
        super();
        settings = new ClientSettings();
    }

    public ClientSettings getSettings() {
        return settings;
    }

}
