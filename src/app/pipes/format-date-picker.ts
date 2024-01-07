import { Platform } from '@angular/cdk/platform';
import { Inject, Injectable, Optional } from '@angular/core';
import { MAT_DATE_LOCALE, MatDateFormats, NativeDateAdapter } from '@angular/material/core';
import * as moment from 'moment';

@Injectable()
export class AppDateAdapter extends NativeDateAdapter {
    constructor(@Optional() @Inject(MAT_DATE_LOCALE) matDateLocale: string, platform: Platform) {
      super(matDateLocale, platform);
    }
    
    override useUtcForDisplay = true;

    override parse(value: any): any {
        let date_regex : RegExp = /()/;
        let format = '';

        date_regex = /(((0[1-9]|[12][0-9]|3[01])([/])(0[13578]|10|12)([/])(\d{4}))|(([0][1-9]|[12][0-9]|30)([/])(0[469]|11)([/])(\d{4}))|((0[1-9]|1[0-9]|2[0-8])([/])(02)([/])(\d{4}))|((29)(\.|-|\/)(02)([/])([02468][048]00))|((29)([/])(02)([/])([13579][26]00))|((29)([/])(02)([/])([0-9][0-9][0][48]))|((29)([/])(02)([/])([0-9][0-9][2468][048]))|((29)([/])(02)([/])([0-9][0-9][13579][26])))/
        format = 'DD/MM/YYYY';

        if (value) {
            const timestamp = Number(moment(value, format).format('X'));
            if (date_regex.test(value)) {
                return isNaN(timestamp) ? null : moment(value, format).toDate();
            } else {
                return new Date();
            }
        }
        else {
            return;
        }
    }

    override format(date: Date, displayFormat: Object): string {
        if (displayFormat == "input") {
            let day = date.getDate();
            let month = date.getMonth() + 1;
            let year = date.getFullYear();
            let finalDate = `${this._to2digit(day)}/${this._to2digit(month)}/${year}`;
            return finalDate;
        } else {
            const options = { year: 'numeric', month: 'long' } as Intl.DateTimeFormatOptions;
            var language = "es";

            return date.toLocaleDateString(language, options);
        }
    }

    private _to2digit(n: number) {
        return ('00' + n).slice(-2);
    }

}

export const APP_DATE_FORMATS: MatDateFormats = {
    parse: {
        dateInput: { month: 'short', year: 'numeric', day: 'numeric' },
    },
    display: {
        dateInput: 'input',
        monthYearLabel: { year: 'numeric', month: 'numeric' },
        dateA11yLabel: {
            year: 'numeric', month: 'long', day: 'numeric'
        },
        monthYearA11yLabel: { year: 'numeric', month: 'long' },
    }
};
