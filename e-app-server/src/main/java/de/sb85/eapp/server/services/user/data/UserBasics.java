package de.sb85.eapp.server.services.user.data;

import de.sb85.eapp.server.ApplicationConfig;
import de.sb85.eapp.server.services.DataBasics;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Encoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.crypto.SecretKey;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Inheritance;
import javax.persistence.InheritanceType;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;
import java.util.List;

@Entity
@Inheritance(strategy = InheritanceType.TABLE_PER_CLASS)
public abstract class UserBasics extends DataBasics implements UserDetails {

    public final static String ERR_NO_VERIFICATION = "No verification process!";
    public final static String ERR_VERIFICATION_INVALID = "Verification invalid!";

    public final static String ROLE_PREFIX = "ROLE_";

    @Column(unique = true)
    private String mail;

    @Column(unique = true)
    private String moodleUserId;

    private String pwHash;
    private String tokenKey;
    private String mailChange;
    private boolean systemUser;
    private String mailVerificationCode;
    private String accountVerificationCode;
    private boolean active = true;
    private Date lastContact;

    public UserBasics() {
        super();
    }

    public UserBasics(String mail, String pwHash, boolean systemUser, boolean verification) {
        super();
        this.mail = mail;
        this.pwHash = pwHash;
        this.systemUser = systemUser;
//        this.moodleUserId = String.valueOf(0 - this.mail.hashCode());
        clearMailChange();
        renewTokenKey();
        initAccountVerification(mail, verification);
    }

    private void initAccountVerification(String mail, boolean verification) {
        if (verification) {
            this.accountVerificationCode = org.apache.commons.codec.digest.DigestUtils.sha256Hex(
                    Integer.toString(mail.hashCode() * mail.hashCode() * mail.hashCode()));
        } else {
            clearAccountVerification();
        }
    }

    public void renewTokenKey() {
        SecretKey key = Keys.secretKeyFor(SignatureAlgorithm.HS256);
        tokenKey = Encoders.BASE64.encode(key.getEncoded());
    }

    public boolean isMailVerification() {
        return (mailChange != null) && !mailChange.isEmpty() &&
                (mailVerificationCode != null) && !mailVerificationCode.isEmpty();
    }

    public boolean isAccountVerification() {
        return (accountVerificationCode != null) && !accountVerificationCode.isEmpty();
    }

    public void clearMailChange() {
        this.mailChange = "";
        this.mailVerificationCode = "";
    }

    public void clearAccountVerification() {
        this.accountVerificationCode = null;
    }

    public void mailVerification(String code) throws Exception {
        if (!isMailVerification()) {
            throw new Exception(ERR_NO_VERIFICATION);
        }
        if (!code.equals(mailVerificationCode)) {
            throw new Exception(ERR_VERIFICATION_INVALID);
        }
        mailChange();
    }

    private void mailChange() {
        setModifyDate();
        mail = mailChange;
        clearMailChange();
        renewTokenKey();
    }

    public void accountVerification(String code) throws Exception {
        if (!isAccountVerification()) {
            throw new Exception(ERR_NO_VERIFICATION);
        }
        if (!code.equals(accountVerificationCode)) {
            throw new Exception(ERR_VERIFICATION_INVALID);
        }
        clearAccountVerification();
    }


    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        List<GrantedAuthority> grantedAuthorities = new ArrayList<>();
        setRoles(grantedAuthorities);
        return grantedAuthorities;
    }

    protected void setRoles(List<GrantedAuthority> grantedAuthorities) {
        grantedAuthorities.add(new SimpleGrantedAuthority(ROLE_PREFIX + ApplicationConfig.ROLE_USER));
    }

    @Override
    public String getPassword() {
        return pwHash;
    }

    @Override
    public String getUsername() {
        return mail;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        if (accountVerificationCode != null) {
            return false;
        }
        return active;
    }

    public String getMail() {
        return mail;
    }

    public void setMail(String mail) {
        setModifyDate();
        this.mail = mail;
    }

    public String getPwHash() {
        return pwHash;
    }

    public void setPwHash(String pwHash) {
        setModifyDate();
        renewTokenKey();
        this.pwHash = pwHash;
    }

    public void setMailChange(String mailChange) {
        setModifyDate();
        this.mailChange = mailChange;
        this.mailVerificationCode = org.apache.commons.codec.digest.DigestUtils.sha256Hex(
                Integer.toString(mailChange.hashCode() * mail.hashCode() * getId()));
    }

    public String getTokenKey() {
        return tokenKey;
    }

    public boolean isSystemUser() {
        return systemUser;
    }

    public String getMailVerificationCode() {
        return mailVerificationCode;
    }

    public String getMailChange() {
        return mailChange;
    }

    public void setActive(boolean active) {
        setModifyDate();
        this.active = active;
    }

    public boolean isActive() {
        return active;
    }

    public String getAccountVerificationCode() {
        return accountVerificationCode;
    }

    public Date getLastContact() {
        return lastContact;
    }

    public void setLastContact() {
        setModifyDate();
        this.lastContact = new Date();
    }

    public String getMoodleUserId() {
        return moodleUserId;
    }

    public void setMoodleUserId(String moodleUserId) {
        setModifyDate();
        this.moodleUserId = moodleUserId;
    }

}
