import { SESClient, SendTemplatedEmailCommand } from "@aws-sdk/client-ses";

// SES example using the AWS SDK for JavaScript v3 , Template format

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
            ToAddresses: ["<YOUR_VERIFIED_EMAIL_ADDRESS>"],
        },
        Source: "<YOUR_VERIFIED_EMAIL_ADDRESS>",
        Template: "<YOUR_TEMPLATE_NAME>",
        TemplateData: JSON.stringify({
            name: name,
            message: message,
            email: email,
        }),
    };

    try {
        const data = await ses.send(new SendTemplatedEmailCommand(params));
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
