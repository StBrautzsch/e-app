export const DEFAULT_ERROR_MSG = 'Bei der Transaktion ist ein Fehler aufgetreten!';

export const REPLACE_STRING = '_DATA_';
export const REPLACE_STRING_DATE = '_DATE_';
export const REPLACE_STRING_TIME = '_TIME_';

export const EXCEPTION_REF_NOT_FOUND = 'ReferenceNotFoundException';

export function translateException(msg: string): string {
  msg = msg.toString();
  if ((msg === null) || (msg === '')) {
    return DEFAULT_ERROR_MSG;
  }
  if (msg === 'VerificationNotInProgressException') {
    return 'Es ist kein Verifikations-Prozess ausstehend!';
  }
  if (msg === 'MailNotUniqueException') {
    return 'Die angegebene E-Mail-Adresse ' + REPLACE_STRING + ' wird im System bereits verwendet!';
  }
  if (msg === 'UserNotFoundException') {
    return 'Zur angegebenen E-Mail-Adresse ' + REPLACE_STRING + ' existiert im System kein Account!';
  }
  if (msg === 'HttpErrorResponse') {
    return 'Der Server ist aktuell nicht verfügbar. Bitte versuchen Sie es später wieder.';
  }
  if (msg === EXCEPTION_REF_NOT_FOUND) {
    return 'Das gesuchte Objekt wurde nicht gefunden!';
  }
  if (msg === 'SlotNotBookableException') {
    return 'Der ausgewählte Termin steht mittlerweile nicht mehr zur Verfügung!';
  }
  if (msg === 'DataIntegrityViolationException') {
    return 'Bei der Transaktion ist bezüglich der Datenintegrität ein Fehler aufgetreten!';
  }

  if (msg.includes('Exception')) {
    return DEFAULT_ERROR_MSG;
  }
  return msg;
}

export const SB_MSG = {
  ERROR_SPEED_CREATE: 'Der Zeitbereich ist nicht frei für einen Slot von ' + REPLACE_STRING + ' Min!',
  ERROR_CREATE_SLOT_PAST: 'In der Vergangenheit können keine Slots angelegt werden!',
  ERROR_CALENDAR_NAV: 'Das Datum liegt außerhalb des gültigen Zeitbereiches!',
  NEW_LOGIN_REQUIRED: 'Eine neue Anmeldung ist erforderlich!',
  AUTH_MOODLE: 'Die Authentifizierung über Moodle war erfolgreich!',
  SENDING_MAIL: 'Sie erhalten in kürze eine E-Mail an ' + REPLACE_STRING + '!',
  ACCOUNT_VERIFICATION: 'Sie können sich ab jetzt mit Ihren Zugangsdaten anmelden!',
  MAIL_VERIFICATION: 'Sie können sich ab jetzt mit der neuen E-Mail-Adresse anmelden!',
  PASSWORD_RESET: 'Sie können sich ab jetzt mit dem neuen Passwort anmelden!',
  BOOKING: 'Der Termin mit ' + REPLACE_STRING + ' am ' + REPLACE_STRING_DATE + ' um ' + REPLACE_STRING_TIME + ' Uhr wurde erfolgreich gebucht!',
  STORNO: 'Der Termin mit ' + REPLACE_STRING + ' am ' + REPLACE_STRING_DATE + ' um ' + REPLACE_STRING_TIME + ' Uhr wurde storniert!'
};

export const SHARE_TEXT = {
  PLANNER: 'Ich empfehle Ihnen zur Termin-Vergabe das E-APP-System.',
  CLIENT_FROM_CLIENT: 'Ich empfehle Ihnen für Termin-Vereinbarungen E-APP-Client.',
  CLIENT_FROM_PLANNER: 'Bitte nutzen Sie für Termin-Vereinbarungen mit mir E-APP-Client.',
  GREETINGS: '\n\nViele Grüße\n',
};
