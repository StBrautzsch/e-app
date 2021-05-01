package de.sb85.eapp.server.services.mail;

import de.sb85.eapp.server.ApplicationConfig;
import de.sb85.eapp.server.services.ComponentBasics;
import de.sb85.eapp.server.services.mail.data.MailQueue;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.MailException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import javax.activation.DataSource;
import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import javax.mail.util.ByteArrayDataSource;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.stream.StreamSupport;

@Component
public class MailComponent extends ComponentBasics {

    private final static int MAX_MAIL_ERROR = 10;
    private static final String ICAL_FILE = "e-app.ics";

    @Value("${mail.from}")
    private String from;

    @Value("${demo.active}")
    private boolean demoMode;

    private final JavaMailSender javaMailSender;
    private final MailQueueRepository mailQueueRepository;

    public MailComponent(JavaMailSender javaMailSender, MailQueueRepository mailQueueRepository) {
        this.javaMailSender = javaMailSender;
        this.mailQueueRepository = mailQueueRepository;
    }

    @Scheduled(fixedDelay = ApplicationConfig.SEND_MAIL_INTERVAL)
    public void sendMail() {
        Iterable<MailQueue> mails = mailQueueRepository.findAllBySendFalseAndErrorFalse();
        long count = StreamSupport.stream(mails.spliterator(), false).count();
        if (count > 0) {
            sendMailsFromQueue(mails, count);
        }
    }

    private void sendMailsFromQueue(Iterable<MailQueue> mails, long count) {
        logger.info("MailService: " + count);
        mails.forEach(mail -> {
            try {
                sendMailFromQueue(mail);
            } catch (Exception e) {
                sendMailError(mail, e);
            }
        });
    }

    private void sendMailFromQueue(MailQueue mail) throws MessagingException {
        sendMail(mail);
        mail.setSend();
        mailQueueRepository.save(mail);
    }

    private void sendMailError(MailQueue mail, Exception e) {
        mail.addErrorCounter(e.getMessage());
        if (mail.getErrorCounter() >= MAX_MAIL_ERROR) {
            mail.setError();
        }
        mailQueueRepository.save(mail);
        logger.error(mail.getId().toString() + ": " + e.getMessage());
    }

    public void sendMail(MailQueue mail) throws MessagingException {
        if (!demoMode) {
            sendHtmlMail(mail.getTo(), mail.getSubject(), mail.getHtml(), mail.getICal());
        }
    }

    public void sendHtmlMail(String to, String subject, String htmlBody, String iCal) throws MessagingException, MailException {
        javaMailSender.send(createMessage(to, subject, htmlBody, iCal));
    }

    public MimeMessage createMessage(String to, String subject, String htmlBody, String iCal) throws MessagingException {
        MimeMessage message = javaMailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true, ApplicationConfig.DEFAULT_CHARSET.displayName());
        helper.setTo(to);
        helper.setSubject(subject);
        helper.setText(htmlBody, true);
        helper.setFrom(from);
        addICal(iCal, helper);
        return message;
    }

    private void addICal(String iCal, MimeMessageHelper helper) throws MessagingException {
        if (iCal != null) {
            try {
                final ByteArrayOutputStream document = createInMemoryDocument(iCal);
                final InputStream inputStream = new ByteArrayInputStream(document.toByteArray());
                final DataSource attachment = new ByteArrayDataSource(inputStream, ApplicationConfig.ICAL_MEDIA_TYPE.toString());
                helper.addAttachment(ICAL_FILE, attachment);
            } catch (IOException e) {
                throw new MessagingException(e.getMessage(), e);
            }
        }
    }

    private ByteArrayOutputStream createInMemoryDocument(String documentBody) throws IOException {
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        outputStream.write(documentBody.getBytes());
        return outputStream;
    }

}
