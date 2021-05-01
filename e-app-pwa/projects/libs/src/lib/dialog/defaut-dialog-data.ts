export enum DefaultDialogType {ERROR, SUCCESS, WARN}

export interface DefaultDialogData {
  title: string;
  msg: string;
  type: DefaultDialogType;
}
