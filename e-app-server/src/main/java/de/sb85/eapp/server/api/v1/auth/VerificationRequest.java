package de.sb85.eapp.server.api.v1.auth;

public class VerificationRequest {

    private Integer userId;
    private String verifikationCode;
    private String password;

    public VerificationRequest() {
    }

    public VerificationRequest(String username, String password) {
    }

    public Integer getUserId() {
        return userId;
    }

    public String getVerifikationCode() {
        return verifikationCode;
    }

    public String getPassword() {
        return password;
    }

}
