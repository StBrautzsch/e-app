package de.sb85.eapp.server.api.v1.admin.account;

public class AccountTransactionRequest {

    private Integer id;
    private Boolean cancelMailChange;
    private Boolean manualVerification;

    public AccountTransactionRequest() {
    }

    public Integer getId() {
        return id;
    }

    public Boolean getCancelMailChange() {
        return cancelMailChange;
    }

    public Boolean getManualVerification() {
        return manualVerification;
    }

}
