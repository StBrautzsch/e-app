export class PlannerPerson {
  readonly id: number;
  readonly preName: string;
  readonly name: string;
  readonly mail: string;
  readonly tel: string;

  constructor(raw: PlannerPersonRaw) {
    this.id = raw.id;
    this.preName = raw.preName;
    this.name = raw.name;
    this.mail = raw.mail;
    this.tel = raw.tel;
  }

  public mergeName(): string {
    if (this.preName !== '') {
      return this.preName + ' ' + this.name;
    }
    return this.name;
  }

}

export interface PlannerPersonRaw {
  readonly id: number;
  readonly preName: string;
  readonly name: string;
  readonly mail: string;
  readonly tel: string;
}
