package de.sb85.eapp.server.services.mail;

import de.sb85.eapp.server.services.ComponentBasics;
import de.sb85.eapp.server.services.booking.data.Booking;
import de.sb85.eapp.server.services.slot.data.Slot;
import de.sb85.eapp.server.services.user.data.User;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.thymeleaf.context.Context;
import org.thymeleaf.spring5.SpringTemplateEngine;

import java.text.SimpleDateFormat;
import java.util.Base64;
import java.util.Map;

@Component
public class ThymeleafComponent extends ComponentBasics {

    public final static String FILED_LINK = "link";
    public final static String FILED_DATE = "date";
    public final static String FILED_DATE_NEW = "dateNew";
    public final static String FILED_TIME = "time";
    public final static String FILED_TIME_NEW = "timeNew";
    public final static String FILED_DURATION = "duration";
    public final static String FILED_DURATION_NEW = "durationNew";
    public final static String FILED_PLANNER = "planner";
    public final static String FILED_CLIENT = "client";
    public final static String FILED_COMMENT = "comment";
    public final static String FILED_MAIL_NEW = "mailNew";
    public final static String FILED_MAIL_OLD = "mailOld";

    public final static String VERIFICATION_TYPE_MAIL = "1";
    public final static String VERIFICATION_TYPE_ACCOUNT = "2";
    public final static String VERIFICATION_TYPE_PASSWORD = "3";

    @Value("${url.planner}")
    private String urlPlanner;

    @Value("${url.client}")
    private String urlClient;

    @Value("${url.agenda}")
    private String urlAgenda;

    @Value("${url.booking_anonym}")
    private String urlAnonym;

    @Value("${url.verification}")
    private String urlVerification;

    private final static SimpleDateFormat DATE = new SimpleDateFormat("EEEEE, d. MMMMM  YYYY");
    private final static SimpleDateFormat TIME = new SimpleDateFormat("HH:mm");

    private final SpringTemplateEngine thymeleafTemplateEngine;

    public ThymeleafComponent(SpringTemplateEngine thymeleafTemplateEngine) {
        this.thymeleafTemplateEngine = thymeleafTemplateEngine;
    }

    public String createHtml(Map<String, Object> templateModel, String template) {
        Context thymeleafContext = new Context();
        thymeleafContext.setVariables(templateModel);
        return thymeleafTemplateEngine.process(template, thymeleafContext);
    }

    public void setMailVerificationLink(User user, Map<String, Object> templateModel) {
        final String url = urlVerification
                .replace("_ID_", user.getId().toString())
                .replace("_CODE_", user.getMailVerificationCode())
                .replace("_TYPE_", VERIFICATION_TYPE_MAIL);
        if (user.isPlanner()) {
            templateModel.put(FILED_LINK, urlPlanner + url);
        } else {
            templateModel.put(FILED_LINK, urlClient + url);
        }
    }

    public void setAccountVerificationLink(User user, Map<String, Object> templateModel) {
        final String url = urlVerification
                .replace("_ID_", user.getId().toString())
                .replace("_CODE_", user.getAccountVerificationCode())
                .replace("_TYPE_", VERIFICATION_TYPE_ACCOUNT);
        if (user.isPlanner()) {
            templateModel.put(FILED_LINK, urlPlanner + url);
        } else {
            templateModel.put(FILED_LINK, urlClient + url);
        }
    }

    public void setPasswordResetLink(User user, String password, Map<String, Object> templateModel) {
        final String url = urlVerification
                .replace("_ID_", user.getId().toString())
                .replace("_CODE_", Base64.getEncoder().encodeToString(password.getBytes()))
                .replace("_TYPE_", VERIFICATION_TYPE_PASSWORD);
        if (user.isPlanner()) {
            templateModel.put(FILED_LINK, urlPlanner + url);
        } else {
            templateModel.put(FILED_LINK, urlClient + url);
        }
    }

    public void setPlannerLink(Slot slot, Map<String, Object> templateModel) {
        templateModel.put(FILED_LINK, getPlannerLink(slot));
    }

    public String getPlannerLink(Slot slot) {
        return urlPlanner + urlAgenda + slot.getId();
    }

    public void setClientLink(Map<String, Object> templateModel) {
        templateModel.put(FILED_LINK, urlClient);
    }

    public void setClientLink(Slot slot, Map<String, Object> templateModel) {
        templateModel.put(FILED_LINK, getClientLink(slot));
    }

    public String getClientLink(Slot slot) {
        if (slot.getBooking().isClientAuth()) {
            return urlClient + urlAgenda + slot.getId();
        }
        if (slot.getBooking().isClientAnonym()) {
            return urlClient + urlAnonym + slot.getBooking().getReference();
        }
        return "";
    }

    public void setSlotData(Slot slot, String plannerName, String clientName, Map<String, Object> templateModel) {
        templateModel.put(FILED_DATE, DATE.format(slot.getStart()));
        templateModel.put(FILED_TIME, TIME.format(slot.getStart()));
        templateModel.put(FILED_DURATION, slot.getDuration());
        templateModel.put(FILED_PLANNER, plannerName);
        if (!slot.isFree()) {
            setClientData(slot.getBooking(), clientName, templateModel);
            templateModel.put(FILED_COMMENT, slot.getBooking().getRemark());
        }
    }

    public void setNewSlotData(Slot slot, Map<String, Object> templateModel) {
        templateModel.put(FILED_DATE_NEW, DATE.format(slot.getStart()));
        templateModel.put(FILED_TIME_NEW, TIME.format(slot.getStart()));
        templateModel.put(FILED_DURATION_NEW, slot.getDuration());
    }

    public void setClientData(Booking booking, String clientName, Map<String, Object> templateModel) {
        templateModel.put(FILED_CLIENT, clientName);
    }

    public void setClientName(String clientName, Map<String, Object> templateModel) {
        templateModel.put(FILED_CLIENT, clientName);
    }

    public void setMailChange(User user, Map<String, Object> templateModel) {
        templateModel.put(FILED_MAIL_NEW, user.getMailChange());
        templateModel.put(FILED_MAIL_OLD, user.getMail());
    }

}
