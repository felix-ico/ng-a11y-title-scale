import { Injectable, ApplicationRef } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { delay, map, catchError } from 'rxjs//operators';
import { Observable } from "rxjs";

@Injectable()
export class I18nService {

    public data: {};
    public currentLanguage: any;
    public configs: any;

    constructor(
        private http: HttpClient,
        private ref: ApplicationRef) {
        this.setLanguage(localStorage.getItem('lang') || "en-US");
    }

    public setLanguage(language) {
        localStorage.setItem('lang', language);
        this.currentLanguage = language;
        this.fetch(language)
    }

    public getTranslation(phrase: string, variableData: any=null): string {
        if(this.data && this.data[phrase]){
            if(!variableData){
                return this.data[phrase];
            }
            let str = this.data[phrase];
            Object.keys(variableData).forEach((value)=>{
                let replacevaule = "{"+value+"}";
                str = str.replace( new RegExp(replacevaule, 'g'), variableData[value]);
            })
            return str;
        }
        else 
            return phrase;
    }

    private fetch(locale: any) {
        let langFilePath = `assets/langs/${locale}.json`;
        this.fetchLangFile(langFilePath)
            .subscribe((data: any) => {
                this.data = data;
                this.ref.tick();
            })
    }

    private fetchLangFile(url): Observable<any> {
        let baseurl=location.protocol+'//'+location.hostname+(location.port? ':'+location.port:'')+'/';
        return this.http.get(baseurl+ url)
            .pipe(
                map((data: any) => (data.data || data))
            );
    }

}
