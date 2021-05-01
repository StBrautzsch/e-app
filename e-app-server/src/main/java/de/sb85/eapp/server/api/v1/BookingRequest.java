package de.sb85.eapp.server.api.v1;

import java.util.Date;

public class BookingRequest {

    private Integer userId;
    private Integer slotId;
    private Date start;
    private Integer duration;
    private String remark;

    public BookingRequest() {

    }

    public Integer getUserId() {
        return userId;
    }

    public Integer getSlotId() {
        return slotId;
    }

    public Date getStart() {
        return start;
    }

    public Integer getDuration() {
        return duration;
    }

    public String getRemark() {
        return remark;
    }

}
