package de.sb85.eapp.server.api.v1.planner;

import de.sb85.eapp.server.api.v1.UserResponseRequestBasics;
import de.sb85.eapp.server.services.user.data.PlannerSettings;
import de.sb85.eapp.server.services.user.data.User;
import de.sb85.eapp.server.services.user.exeptions.UserNotPlannerException;

public class UserPlannerResponse extends UserResponseRequestBasics {

    protected final Integer plannerId;
    protected final PlannerSettings settings;

    public UserPlannerResponse(User user) throws UserNotPlannerException {
        super(user);
        if (user.isPlanner()) {
            this.plannerId = user.getPlanner().getId();
            this.settings = user.getPlanner().getSettings();
        } else {
            throw new UserNotPlannerException();
        }
    }

    public Integer getPlannerId() {
        return plannerId;
    }

    public PlannerSettings getSettings() {
        return settings;
    }

}
