package de.sb85.eapp.server.services.user.data;

import de.sb85.eapp.server.services.DataBasics;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;

@Entity
public class Planner extends DataBasics {

    @OneToOne(targetEntity = PlannerSettings.class, cascade = CascadeType.ALL)
    @JoinColumn(unique = true)
    private PlannerSettings settings;

    public Planner() {
        super();
        settings = new PlannerSettings();
    }

    public PlannerSettings getSettings() {
        return settings;
    }

}
