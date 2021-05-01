package de.sb85.eapp.server.services.mail.data;

import de.sb85.eapp.server.services.DataBasics;

import javax.persistence.Entity;
import javax.persistence.Lob;

@Entity
public class MailQueue extends DataBasics {

    private String to;
    @Lob
    private String html;
    @Lob
    private String iCal = null;
    private String subject;
    private Boolean send = false;
    private Boolean error = false;
    private Integer errorCounter = 0;
    private String lastErrorMsg;

    public MailQueue() {
        super();
    }

    public MailQueue(String to, String subject, String html, String iCal) {
        super();
        this.to = to;
        this.subject = subject;
        this.html = html;
        this.iCal = iCal;
    }

    public MailQueue(String to, String subject, String html) {
        super();
        this.to = to;
        this.subject = subject;
        this.html = html;
    }

    public MailQueue(String to, String subject, String html, Boolean error) {
        super();
        this.to = to;
        this.subject = subject;
        this.html = html;
        this.error = error;
    }

    public String getTo() {
        return to;
    }

    public String getHtml() {
        return html;
    }

    public String getSubject() {
        return subject;
    }

    public Boolean getSend() {
        return send;
    }

    public void setSend() {
        setModifyDate();
        this.send = true;
    }

    public void addErrorCounter(String msg) {
        setModifyDate();
        this.lastErrorMsg = msg.substring(0, 255);
        this.errorCounter++;
    }

    public Integer getErrorCounter() {
        return errorCounter;
    }

    public String getLastErrorMsg() {
        return lastErrorMsg;
    }

    public void setError() {
        setModifyDate();
        this.error = true;
    }

    public Boolean getError() {
        return error;
    }

    public String getICal() {
        return iCal;
    }

}
