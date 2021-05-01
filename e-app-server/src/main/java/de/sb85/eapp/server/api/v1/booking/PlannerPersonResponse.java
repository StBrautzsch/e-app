package de.sb85.eapp.server.api.v1.booking;

import de.sb85.eapp.server.services.user.data.User;

import java.util.ArrayList;

public class PlannerPersonResponse {

    private Integer id;
    private String preName = "";
    private String name = "";
    private String mail = "";
    private String tel = "";

    public static ArrayList<PlannerPersonResponse> transfer(Iterable<User> input) {
        ArrayList<PlannerPersonResponse> ret = new ArrayList<>();
        input.forEach(user -> ret.add(new PlannerPersonResponse(user)));
        return ret;
    }

    public PlannerPersonResponse() {

    }

    public PlannerPersonResponse(User user) {
        id = user.getId();
        preName = user.getPreName();
        name = user.getName();
        mail = user.getMail();
        tel = user.getTel();
    }

    public Integer getId() {
        return id;
    }

    public String getPreName() {
        return preName;
    }

    public String getName() {
        return name;
    }

    public String getMail() {
        return mail;
    }

    public String getTel() {
        return tel;
    }

}
