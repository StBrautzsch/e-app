package de.sb85.eapp.server.api.v1.client;

import de.sb85.eapp.server.api.v1.UserResponseRequestBasics;
import de.sb85.eapp.server.services.user.data.ClientSettings;
import de.sb85.eapp.server.services.user.data.User;
import de.sb85.eapp.server.services.user.exeptions.UserNotClientException;

public class UserClientResponse extends UserResponseRequestBasics {

    protected final Integer clientId;
    protected final ClientSettings settings;

    public UserClientResponse(User user) throws UserNotClientException {
        super(user);
        if (user.isClient()) {
            this.clientId = user.getClient().getId();
            this.settings = user.getClient().getSettings();
        } else {
            throw new UserNotClientException();
        }
    }

    public Integer getClientId() {
        return clientId;
    }

    public ClientSettings getSettings() {
        return settings;
    }

}
