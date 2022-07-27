import { SPFI } from "@pnp/sp";
import { IEmailProperties } from "@pnp/sp/sputilities";
import { getSP } from "../../config/pnpjs.config";

interface TypedHash<T> {
    [key: string]: T;
}

export class EmailBuilder implements IEmailProperties { 
    To: string[];
    CC?: string[];
    BCC?: string[];
    Subject: string;
    Body: string;
    AdditionalHeaders?: TypedHash<string>;
    From?: string;

    private constructor() {
        this.To = [];
        this.CC = [];
        this.BCC = [];
        this.Subject = '';
        this.Body = '';
    }

    static createNewEmail = (): EmailBuilder => {
        return new EmailBuilder()
    }

    addFromEmail = (emailAddress: string): EmailBuilder => {
        this.From = emailAddress;
        return this;
    }

    addToEmails = (emailAddress: string[]): EmailBuilder => {
        this.To = [...this.To, ...emailAddress];
        return this;
    }

    addCCEmails = (emailAddress: string[]): EmailBuilder => {
        this.CC = [...this.CC, ...emailAddress];
        return this;
    }

    addBCCEmails = (emailAddress: string[]): EmailBuilder => {
        this.BCC = [...this.BCC, ...emailAddress];
        return this;
    }

    addSubject = (subject: string): EmailBuilder => {
        this.Subject = subject;
        return this;
    }

    addBody = (body: string): EmailBuilder => {
        this.Body = body;
        return this;
    }

    addHeaders = (additionalHeaders: TypedHash<string>): EmailBuilder => {
        this.AdditionalHeaders = additionalHeaders;
        return this;
    }

    send = async () => {
        try {
            if (!this) throw "Email Configuration is not created.";
            else if (!this.To) throw "Email Receiver is not added."

            // get setting 
            const sp = await getSP(); 
            // send email
            await sp.utility.sendEmail(this as IEmailProperties);
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}