package de.sb85.eapp.server.services.mail;

import de.sb85.eapp.server.services.ComponentBasics;
import de.sb85.eapp.server.services.booking.exceptions.BookingNotValidException;
import de.sb85.eapp.server.services.mail.data.MailQueue;
import de.sb85.eapp.server.services.slot.data.Slot;
import de.sb85.eapp.server.services.user.UserToolsComponent;
import de.sb85.eapp.server.services.user.data.User;
import org.springframework.stereotype.Component;

import javax.mail.MessagingException;
import java.util.HashMap;
import java.util.Map;

@Component
public class MailGeneratorComponent extends ComponentBasics {

    private final static String SUBJECT_PREFIX = "E-APP - ";
    private final static String SUBJECT_BOOKING_CONFORMATION = SUBJECT_PREFIX + "Buchungsbestätigung";
    private final static String SUBJECT_BOOKING_INFORMATION = SUBJECT_PREFIX + "Buchungsinformation";
    private final static String SUBJECT_BOOKING_STORNO = SUBJECT_PREFIX + "Termin-Stornierung";
    private final static String SUBJECT_APPOINTMENT_MOVE = SUBJECT_PREFIX + "Termin-Verschiebung";
    private final static String SUBJECT_MAIL_VERIFICATION = SUBJECT_PREFIX + "Änderung der E-Mail-Adresse";
    private final static String SUBJECT_ACCOUNT_VERIFICATION = SUBJECT_PREFIX + "Account-Verifizierung";
    private final static String SUBJECT_REMINDER = SUBJECT_PREFIX + "Termin-Erinnerung";
    private final static String SUBJECT_RESET_PASSWORD = SUBJECT_PREFIX + "Passwort zurücksetzen";

    private final static String TEMPLATE_BOOKING_CONFORMATION = "booking_confirmation.html";
    private final static String TEMPLATE_BOOKING_INFORMATION = "booking_information.html";
    private final static String TEMPLATE_STORNO_INFORMATION = "storno_information.html";
    private final static String TEMPLATE_APPOINTMENT_MOVE = "appointment_move.html";
    private final static String TEMPLATE_APPOINTMENT_DELETE = "appointment_delete.html";
    private final static String TEMPLATE_MAIL_VERIFICATION = "mail_verification.html";
    private final static String TEMPLATE_ACCOUNT_VERIFICATION = "account_verification.html";
    private final static String TEMPLATE_REMINDER_CLIENT = "appointment_reminder_client.html";
    private final static String TEMPLATE_REMINDER_PLANNER = "appointment_reminder_planner.html";
    private final static String TEMPLATE_RESET_PASSWORD = "password_reset.html";

    private final MailQueueRepository mailQueueRepository;
    private final UserToolsComponent userToolsComponent;
    private final MailComponent mailComponent;
    private final ThymeleafComponent thymeleafComponent;

    public MailGeneratorComponent(MailQueueRepository mailQueueRepository, UserToolsComponent userToolsComponent,
                                  MailComponent mailComponent, ThymeleafComponent thymeleafComponent) {
        this.mailQueueRepository = mailQueueRepository;
        this.userToolsComponent = userToolsComponent;
        this.mailComponent = mailComponent;
        this.thymeleafComponent = thymeleafComponent;
    }

    public void bookingConfirmation(Slot slot, String iCal) throws BookingNotValidException {
        Map<String, Object> templateModel = new HashMap<>();
        thymeleafComponent.setSlotData(slot, userToolsComponent.getPlannerName(slot), userToolsComponent.getClientName(slot), templateModel);
        thymeleafComponent.setClientLink(slot, templateModel);
        addToMailQueue(userToolsComponent.getClientMail(slot), SUBJECT_BOOKING_CONFORMATION,
                thymeleafComponent.createHtml(templateModel, TEMPLATE_BOOKING_CONFORMATION), iCal);
    }

    public void bookingInformation(Slot slot, String iCal) throws BookingNotValidException {
        Map<String, Object> templateModel = new HashMap<>();
        thymeleafComponent.setSlotData(slot, userToolsComponent.getPlannerName(slot), userToolsComponent.getClientName(slot), templateModel);
        thymeleafComponent.setPlannerLink(slot, templateModel);
        addToMailQueue(userToolsComponent.getPlannerMail(slot), SUBJECT_BOOKING_INFORMATION,
                thymeleafComponent.createHtml(templateModel, TEMPLATE_BOOKING_INFORMATION), iCal);
    }

    public void stornoInformation(Slot slot, String clientName) {
        Map<String, Object> templateModel = new HashMap<>();
        thymeleafComponent.setSlotData(slot, userToolsComponent.getPlannerName(slot), clientName, templateModel);
        thymeleafComponent.setClientName(clientName, templateModel);
        thymeleafComponent.setPlannerLink(slot, templateModel);
        addToMailQueue(userToolsComponent.getPlannerMail(slot), SUBJECT_BOOKING_STORNO,
                thymeleafComponent.createHtml(templateModel, TEMPLATE_STORNO_INFORMATION));
    }

    public void appointmentMove(Slot slotOld, Slot slot, String iCal) throws BookingNotValidException {
        Map<String, Object> templateModel = new HashMap<>();
        thymeleafComponent.setSlotData(slotOld, userToolsComponent.getPlannerName(slot), userToolsComponent.getClientName(slot), templateModel);
        thymeleafComponent.setNewSlotData(slot, templateModel);
        thymeleafComponent.setClientLink(slot, templateModel);
        addToMailQueue(userToolsComponent.getClientMail(slot), SUBJECT_APPOINTMENT_MOVE,
                thymeleafComponent.createHtml(templateModel, TEMPLATE_APPOINTMENT_MOVE), iCal);
    }

    public void appointmentDelete(Slot slot) throws BookingNotValidException {
        Map<String, Object> templateModel = new HashMap<>();
        thymeleafComponent.setSlotData(slot, userToolsComponent.getPlannerName(slot), userToolsComponent.getClientName(slot), templateModel);
        thymeleafComponent.setClientLink(templateModel);
        addToMailQueue(userToolsComponent.getClientMail(slot), SUBJECT_BOOKING_STORNO,
                thymeleafComponent.createHtml(templateModel, TEMPLATE_APPOINTMENT_DELETE));
    }

    public void mailVerification(User user) {
        Map<String, Object> templateModel = new HashMap<>();
        thymeleafComponent.setMailVerificationLink(user, templateModel);
        thymeleafComponent.setMailChange(user, templateModel);
        addToMailQueue(user.getMailChange(), SUBJECT_MAIL_VERIFICATION,
                thymeleafComponent.createHtml(templateModel, TEMPLATE_MAIL_VERIFICATION));
    }

    public void accountVerification(User user) {
        Map<String, Object> templateModel = new HashMap<>();
        thymeleafComponent.setAccountVerificationLink(user, templateModel);
        thymeleafComponent.setMailChange(user, templateModel);
        addToMailQueue(user.getMail(), SUBJECT_ACCOUNT_VERIFICATION,
                thymeleafComponent.createHtml(templateModel, TEMPLATE_ACCOUNT_VERIFICATION));
    }

    public void resetPassword(User user, String password) {
        Map<String, Object> templateModel = new HashMap<>();
        thymeleafComponent.setPasswordResetLink(user, password, templateModel);
        addToMailQueue(user.getMail(), SUBJECT_RESET_PASSWORD,
                thymeleafComponent.createHtml(templateModel, TEMPLATE_RESET_PASSWORD));
    }

    public void mailReminderClient(Slot slot) throws BookingNotValidException {
        Map<String, Object> templateModel = new HashMap<>();
        thymeleafComponent.setSlotData(slot, userToolsComponent.getPlannerName(slot), userToolsComponent.getClientName(slot), templateModel);
        thymeleafComponent.setClientData(slot.getBooking(), userToolsComponent.getClientName(slot), templateModel);
        thymeleafComponent.setClientLink(slot, templateModel);
        addToMailQueue(userToolsComponent.getClientMail(slot), SUBJECT_REMINDER,
                thymeleafComponent.createHtml(templateModel, TEMPLATE_REMINDER_CLIENT));
    }

    public void mailReminderPlanner(Slot slot) throws BookingNotValidException {
        Map<String, Object> templateModel = new HashMap<>();
        thymeleafComponent.setSlotData(slot, userToolsComponent.getPlannerName(slot), userToolsComponent.getClientName(slot), templateModel);
        thymeleafComponent.setClientData(slot.getBooking(), userToolsComponent.getClientName(slot), templateModel);
        thymeleafComponent.setPlannerLink(slot, templateModel);
        addToMailQueue(userToolsComponent.getPlannerMail(slot), SUBJECT_REMINDER,
                thymeleafComponent.createHtml(templateModel, TEMPLATE_REMINDER_PLANNER));
    }

    private void addToMailQueue(User user, String subject, String html) {
        addToMailQueue(user.getMail(), subject, html, null);
    }

    private void addToMailQueue(String mail, String subject, String html) {
        addToMailQueue(mail, subject, html, null);
    }

    private void addToMailQueue(String mail, String subject, String html, String iCal) {
        try {
            mailComponent.createMessage(mail, subject, html, iCal);
            mailQueueRepository.save(new MailQueue(mail, subject, html, iCal));
        } catch (MessagingException e) {
            mailQueueRepository.save(new MailQueue(mail, subject, html, true));
            logger.warn(e.getMessage() + ":");
        }
    }

}
