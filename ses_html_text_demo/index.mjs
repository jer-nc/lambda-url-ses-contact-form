import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";

// SES example using the AWS SDK for JavaScript v3 , HTML format & Text format

// Explanation: 
// 1. Create a SESClient with the region you want to use
// 2. Create a params object with the email details
// 3. Send the email using the send method on the SESClient object


export const handler = async (event) => {

    console.log(event)

    const { email, name, message } = JSON.parse(event.body);

    console.log({ email, name, message });

    // Replace <YOUR_REGION> with the AWS Region you're using for Amazon SES.
    const ses = new SESClient({ region: "<YOUR_REGION>" });

    const params = {
        Destination: {
            // Replace email with your email address.
            ToAddresses: ["<TO_EMAIL>"],
        },
        Message: {
            Body: {
                // Html Format
                Html: {
                    Charset: "UTF-8",
                    Data: `<html><body><h1>Test email: </h1><p>Message: ${message} <br>Name: ${name} <br>Email: ${email}</p></body></html>`
                },
                /* Text Format 
                 Text: {
                     Charset: 'UTF-8',
                     Data: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
                 }
                */
            },
            Subject: {
                Charset: 'UTF-8',
                Data: 'Test email'
            }
        },
        // Replace email with your "From" address. This address must be verified.
        Source: "<FROM_EMAIL>",

    };

    try {
        const data = await ses.send(new SendEmailCommand(params));
        console.log("Success", data);
        return {
            statusCode: 200,
            body: JSON.stringify(`Success`),
        };
    } catch (err) {
        console.log("Error", err);
        return err;
    }
};
