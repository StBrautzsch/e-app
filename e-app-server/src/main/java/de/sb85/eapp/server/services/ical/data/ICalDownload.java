package de.sb85.eapp.server.services.ical.data;

import de.sb85.eapp.server.services.DataBasics;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Lob;

@Entity
public class ICalDownload extends DataBasics {

    @Lob
    private String ical;
    @Column(unique = true)
    private String reference;

    public ICalDownload() {
        super();
    }

    public ICalDownload(String ical) {
        super();
        this.ical = ical;
        this.reference = org.apache.commons.codec.digest.DigestUtils.sha256Hex(
                Integer.toString(this.hashCode() * ical.hashCode()));
    }

    public String getIcal() {
        return ical;
    }

    public String getReference() {
        return reference;
    }

}
