package de.sb85.eapp.server.services.booking.data;

import de.sb85.eapp.server.services.DataBasics;
import de.sb85.eapp.server.services.user.data.Client;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;

@Entity
public class Booking extends DataBasics {

    @OneToOne(targetEntity = Client.class)
    private Client authClient;

    @OneToOne(targetEntity = AnonymClient.class, cascade = CascadeType.ALL)
    @JoinColumn(unique = true)
    private AnonymClient anonymClient;

    private String remark;
    private String reference;

    public Booking() {
        super();
    }

    public Booking(Client authClient, String remark) {
        super();
        this.authClient = authClient;
        this.remark = remark;
    }

    public Booking(AnonymClient anonymClient, String remark) {
        super();
        this.anonymClient = anonymClient;
        this.remark = remark;
        this.reference = org.apache.commons.codec.digest.DigestUtils.sha256Hex(
                Integer.toString(this.hashCode() * anonymClient.hashCode() *
                        anonymClient.getMail().hashCode() * anonymClient.getName().hashCode()));
    }

    public boolean isClientAuth() {
        if (authClient != null) {
            return true;
        }
        return false;
    }

    public boolean isClientAnonym() {
        if (anonymClient != null) {
            return true;
        }
        return false;
    }

    public void setRemark(String remark) {
        setModifyDate();
        this.remark = remark;
    }

    public Client getAuthClient() {
        return authClient;
    }

    public AnonymClient getAnonymClient() {
        return anonymClient;
    }

    public String getRemark() {
        return remark;
    }

    public String getReference() {
        return reference;
    }

}
