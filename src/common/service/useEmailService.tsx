import { EmailBuilder } from "../core/services/EmailBuilder";

export interface IEmailProps {
    from: string;
    to: string[];
    cc: string[];
    bcc: string[];
    subject: string
    body: string
}

export const useEmailService = () => {
    (async () => { })(); 

    const sendTestEmail = async (emailPros : IEmailProps) => {
        try { 

            let email = EmailBuilder.createNewEmail();

            email.addToEmails([...emailPros.to])
                .addCCEmails([...emailPros.cc])
                .addSubject(emailPros?.subject)
                .addBody(emailPros?.body);

            await email.send();
            
        } catch (error) {
            console.error("sendTestEmail -> error", error);
            throw error;
        }
    };

    return {
        sendTestEmail 
    };
}