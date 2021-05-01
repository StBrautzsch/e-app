package de.sb85.eapp.server.api.v1.planner.slot;

import java.util.Date;

public class SlotMoveRequest {

    private Integer id;
    private Date start;
    private Integer duration;
    private Boolean notify;

    SlotMoveRequest() {
    }

    public Integer getId() {
        return id;
    }

    public Date getStart() {
        return start;
    }

    public Integer getDuration() {
        return duration;
    }

    public Boolean getNotify() {
        return notify;
    }

}
