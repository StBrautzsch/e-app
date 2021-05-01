import {EventEmitter, Injectable} from '@angular/core';
import {Slot, SlotCreateRaw, SlotMoveRaw} from '../../../../../libs/src/lib/data/slot';
import {ApiService} from '../../../../../libs/src/lib/api/api-service/api.service';
import {ApiPlannerService} from '../../../../../libs/src/lib/api/api-service/api-planner.service';
import {Observable, Observer} from 'rxjs';
import {BaseAppService} from '../../../../../libs/src/lib/base-app/base-app.service';
import {observerNextAndComplete} from '../../../../../libs/src/lib/tools';

export const BACKGROUND_UPDATE_INTERVALL = 5000;

@Injectable({
  providedIn: 'root'
})
export class SlotPlannerService {

  slots: Slot[] = [];
  private _lastUpdate = new Date(0);
  plannerApi: ApiPlannerService;

  moveSlotEvent = new EventEmitter<SlotMoveEventData>();
  addSlotEvent = new EventEmitter<Slot>();

  private _start = new Date(0);
  private _stop = new Date(0);
  private _updateRequired = false;

  constructor(private api: ApiService, private app: BaseAppService) {
    console.log('SlotPlannerService');
    this.plannerApi = api.castPlanner();
    this.initBackgroundUpdate();
  }

  private initBackgroundUpdate(): void {
    setInterval(() => this.checkForUpdateSlots(), BACKGROUND_UPDATE_INTERVALL);
  }

  deleteSlot(slot: Slot, notify: boolean): Observable<boolean> {
    return this.plannerApi.slotDelete(slot.id, notify);
  }

  removeSlotFromSlots(id: number): void {
    for (let i = 0; i < this.slots.length; i++) {
      if (this.slots[i].id === id) {
        this.slots.splice(i, 1);
        return;
      }
    }
  }

  createSlots(slots: SlotCreateRaw[]): Observable<Slot[]> {
    return this.plannerApi.slotCreate(slots);
  }

  moveSlot(slot: Slot, startNew: Date, durationNew: number, notify: boolean): Observable<boolean> {
    const newSlot: SlotMoveRaw = {id: slot.id, start: startNew, duration: durationNew, notify};
    return this.plannerApi.slotMove(newSlot);
  }

  checkForUpdateSlots(): void {
    if (((this.app.page === this.app.titles.calendar) || (this.app.page === this.app.titles.agenda)) &&
      this.api.isAuth() && this._lastUpdate.getTime() !== (new Date(0)).getTime()) {
      this.plannerApi.slotGetSilent(this._start, this._stop).subscribe(
        (data: Slot[]) => this.receiveCheckForUpdate(data));
    }
  }

  private receiveCheckForUpdate(data: Slot[]): void {
    for (const s of data) {
      const oldSlot = this.getSlotById(s.id);
      if (oldSlot) {
        this.updateSlot(oldSlot, s);
      } else {
        this.addSlot(s);
      }
    }
  }

  private addSlot(slot: Slot): void {
    this.slots.push(slot);
    this.addSlotEvent.emit(slot);
  }

  private updateSlot(oldSlot: Slot, newSlot: Slot): void {
    if (!oldSlot.isEqual(newSlot) && !oldSlot.changing) {
      oldSlot.updateBooking(newSlot);
      if ((oldSlot.start.getTime() !== newSlot.start.getTime()) || (oldSlot.duration !== newSlot.duration)) {
        this.moveSlotEvent.emit({slot: oldSlot, newStart: newSlot.start, newDuration: newSlot.duration});
      }
    }
  }

  updateSlots(start: Date, stop: Date): Observable<number> {
    this._start = start;
    this._stop = stop;
    return new Observable((observer: Observer<number>) => {
      this.plannerApi.slotGet(start, stop).subscribe(
        (data: Slot[]) => this.receiveSlots(data, observer));
    });
  }

  private receiveSlots(data: Slot[], observer: Observer<number>): void {
    this._lastUpdate = new Date();
    this.slots = data;
    console.log('updateSlots', data.length);
    observerNextAndComplete(observer, this.slots.length);
  }

  get lastUpdate(): Date {
    return this._lastUpdate;
  }

  sortSlots(): void {
    this.slots.sort((a, b) => this.sort(a, b));
  }

  private sort(a: Slot, b: Slot): number {
    if (a.start.getTime() < b.start.getTime()) {
      return -1;
    }
    if (a.start.getTime() > b.start.getTime()) {
      return 1;
    }
    return 0;
  }

  get updateRequired(): boolean {
    return this._updateRequired;
  }

  getSlotById(id: number): Slot {
    for (const s of this.slots) {
      if (s.id === id) {
        return s;
      }
    }
    return null;
  }

}

export interface SlotMoveEventData {
  slot: Slot;
  newStart: Date;
  newDuration: number;
}
