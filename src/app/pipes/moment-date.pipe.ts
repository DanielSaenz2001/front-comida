import { Inject, LOCALE_ID, Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

import * as mtz from 'moment-timezone';
import { WINDOWS_TO_IANA } from './timezone-windows-to-iana';

@Pipe({
  name: 'momentDate'
})
export class MomentDatePipe extends DatePipe implements PipeTransform {
  private timezoneEstablishment!: string;

  constructor(
    @Inject(LOCALE_ID) locale: string,
  ) {
    super(locale);
    this.timezoneEstablishment = 'America/Bogota';
  }

  override transform(value: Date | string | number, format?: string, timezone?: string): string | null;
  override transform(value: null | undefined, format?: string, timezone?: string): null;
  override transform(value: Date | string | number | null | undefined, format: string = '', timezone: string = ''): string | null {
    if (!value && !format) {
      return value as string;
    } else {
      if (!timezone) {
        timezone = this.timezoneEstablishment ? Object(WINDOWS_TO_IANA)[this.timezoneEstablishment] : mtz.tz.guess(true);
      }

      const t = mtz(value).tz(timezone);
      const timezoneOffset = t.format('Z');

      return super.transform(value, format, timezoneOffset);
    }
  }
}