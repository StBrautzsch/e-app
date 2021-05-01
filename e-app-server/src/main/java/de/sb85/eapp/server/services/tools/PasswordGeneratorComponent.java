package de.sb85.eapp.server.services.tools;

import org.springframework.stereotype.Component;

import java.security.SecureRandom;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

@Component
public class PasswordGeneratorComponent {

    private static final String CHAR_LOWERCASE = "abcdefghijklmnopqrstuvwxyz";
    private static final String CHAR_UPPERCASE = CHAR_LOWERCASE.toUpperCase();
    private static final String DIGIT = "0123456789";
    private static final String OTHER_SPECIAL = "!$-_#+";

    private static final int COUNT_PER_CLASS = 2;
    private static final int PASSWORD_LENGTH = 20;
    private static final String PASSWORD_ALLOW = CHAR_LOWERCASE + CHAR_UPPERCASE + DIGIT + OTHER_SPECIAL;

    private static final SecureRandom random = new SecureRandom();

    public String generatePassword() {
        StringBuilder result = new StringBuilder(PASSWORD_LENGTH);
        generateRandomStrings(result);
        return shuffleString(result.toString());
    }

    private void generateRandomStrings(StringBuilder result) {
        result.append(generateRandomString(CHAR_LOWERCASE, COUNT_PER_CLASS));
        result.append(generateRandomString(CHAR_UPPERCASE, COUNT_PER_CLASS));
        result.append(generateRandomString(DIGIT, COUNT_PER_CLASS));
        result.append(generateRandomString(OTHER_SPECIAL, COUNT_PER_CLASS));
        result.append(generateRandomString(PASSWORD_ALLOW, PASSWORD_LENGTH - result.toString().length()));
    }

    private String generateRandomString(String input, int size) {
        StringBuilder result = new StringBuilder(size);
        for (int i = 0; i < size; i++) {
            result.append(input.charAt(random.nextInt(input.length())));
        }
        return result.toString();
    }

    private String shuffleString(String input) {
        List<String> result = Arrays.asList(input.split(""));
        Collections.shuffle(result);
        return String.join("", result);
    }

}
