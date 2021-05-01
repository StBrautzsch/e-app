package de.sb85.eapp.server.api.v1.planner.slot;

import java.util.Date;

public class SlotCreateRequest {

    private Date start;
    private Integer duration;

    SlotCreateRequest() {
    }

    public Date getStart() {
        return start;
    }

    public Integer getDuration() {
        return duration;
    }

}
