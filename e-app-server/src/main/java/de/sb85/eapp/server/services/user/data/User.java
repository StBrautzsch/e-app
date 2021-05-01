package de.sb85.eapp.server.services.user.data;

import de.sb85.eapp.server.ApplicationConfig;
import de.sb85.eapp.server.api.v1.AccountRequest;
import de.sb85.eapp.server.api.v1.user.UserDataRequest;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.OneToOne;
import java.util.List;

@Entity
public class User extends UserBasics {

    @OneToOne(targetEntity = Client.class, cascade = CascadeType.ALL)
    private Client client = null;
    private Boolean clientActive = false;

    @OneToOne(targetEntity = Planner.class, cascade = CascadeType.ALL)
    private Planner planner = null;
    private Boolean plannerActive = false;
    private Boolean admin = false;
    private Boolean bookingActive = true;

    private String preName;
    private String name;
    private String tel;

    @Column(unique = true)
    private String feedsRef = null;


    public User() {
        super();
    }

    public User(String mail, String pwHash, String preName, String name, String tel, boolean systemUser, boolean verification) {
        super(mail, pwHash, systemUser, verification);
        this.preName = preName;
        this.name = name;
        this.tel = tel;
    }

    public String mergeName() {
        if ((preName != null) && !preName.isEmpty()) {
            return preName + " " + name;
        }
        return name;
    }

    public void updateData(UserDataRequest data) {
        setName(data.getName());
        setPreName(data.getPreName());
        setTel(data.getTel());
        setBookingActive(data.getBookingActive());
    }

    public void updateAccount(AccountRequest data) {
        setName(data.getName());
        setPreName(data.getPreName());
        setTel(data.getTel());
        setMail(data.getMail());
        setClientActive(data.getClientActive());
        setPlannerActive(data.getPlannerActive());
        setAdmin(data.getAdmin());
        setActive(data.getActive());
        setBookingActive(data.getBookingActive());
    }

    public void setPreName(String preName) {
        setModifyDate();
        this.preName = preName;
    }

    public void setName(String name) {
        setModifyDate();
        this.name = name;
    }

    public void setTel(String tel) {
        setModifyDate();
        this.tel = tel;
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

    public Client getClient() {
        return client;
    }

    public Planner getPlanner() {
        return planner;
    }


    public boolean isPlanner() {
        return (planner != null) && plannerActive;
    }

    public boolean isClient() {
        return (client != null) && clientActive;
    }

    public Boolean getClientActive() {
        return clientActive;
    }

    public void setClientActive(Boolean clientActive) {
        if (this.clientActive != clientActive) {
            setModifyDate();
            if (client == null) client = new Client();
            this.clientActive = clientActive;
        }
    }

    public Boolean getPlannerActive() {
        return plannerActive;
    }

    public void setPlannerActive(Boolean plannerActive) {
        if (this.plannerActive != plannerActive) {
            setModifyDate();
            if (planner == null) planner = new Planner();
            this.plannerActive = plannerActive;
        }
    }

    public Boolean getAdmin() {
        return admin;
    }

    public void setAdmin(Boolean admin) {
        setModifyDate();
        this.admin = admin;
    }

    public Boolean getBookingActive() {
        return bookingActive;
    }

    public void setBookingActive(Boolean bookingActive) {
        setModifyDate();
        this.bookingActive = bookingActive;
    }

    public String getFeedsRef() {
        return feedsRef;
    }

    public void setFeedsRef(String feedsRef) {
        setModifyDate();
        this.feedsRef = feedsRef;
    }

    @Override
    protected void setRoles(List<GrantedAuthority> grantedAuthorities) {
        super.setRoles(grantedAuthorities);
        setPlannerRoles(grantedAuthorities);
        setClientRole(grantedAuthorities);
    }

    private void setClientRole(List<GrantedAuthority> grantedAuthorities) {
        if (isClient()) {
            grantedAuthorities.add(new SimpleGrantedAuthority(ROLE_PREFIX + ApplicationConfig.ROLE_CLIENT));
        }
    }

    private void setPlannerRoles(List<GrantedAuthority> grantedAuthorities) {
        if (isPlanner()) {
            grantedAuthorities.add(new SimpleGrantedAuthority(ROLE_PREFIX + ApplicationConfig.ROLE_PLANNER));
            if (getAdmin()) {
                grantedAuthorities.add(new SimpleGrantedAuthority(ROLE_PREFIX + ApplicationConfig.ROLE_ADMIN));
            }
        }
    }

}
