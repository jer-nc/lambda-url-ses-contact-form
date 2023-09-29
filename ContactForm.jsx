import React, { useState } from 'react';

// Form component example, SES Lambda function contact simplified

function ContactForm() {
    // State for form inputs
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });

    // Handle form input changes
    function handleChange(event) {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    }

    // Handle form submission

    function handleSubmit(event) {
        event.preventDefault();

        console.log(formData);

        // Your environment variable is defined in .env.local file
        const lambdUrl = process.env.NEXT_PUBLIC_LAMBDA_URL;

        // Send form data to Lambda function
        if (lambdUrl) {
            fetch(lambdUrl, {
                method: 'POST',
                body: JSON.stringify(formData),
            })
                .then((res) => res.json())
                .then((data) => console.log(data))
                .catch((err) => console.log(err));
        } else {
            console.log('Lambda URL is not defined');
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="text-black dark:text-white">Name</label>
                    <input
                        type="text"
                        name="name"
                        placeholder="Enter your name"
                        value={formData.name}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label className="text-black dark:text-white">Email</label>
                    <input
                        type="email"
                        name="email"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label className="text-black dark:text-white">Message</label>
                    <textarea
                        name="message"
                        className="h-24 resize-none"
                        placeholder="Enter your message"
                        value={formData.message}
                        onChange={handleChange}
                    ></textarea>
                </div>
                <button className="w-full dark:text-white" type="submit">
                    Send
                </button>
            </form>
        </div>
    );
}

export default ContactForm;
