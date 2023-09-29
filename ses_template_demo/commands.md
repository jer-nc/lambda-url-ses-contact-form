# Commands

> Replace <YOUR_REGION> with the AWS Region you're using for Amazon SES.

## Create Template

```bash
PS D:\personal-projects\ses_form_demo> aws configure set default.region <YOUR_REGION>
PS D:\personal-projects\ses_form_demo\ses_template_demo> aws ses create-template --cli-input-json file://SES_TemplateDemo.json
```

## Update Template

```bash
PS D:\personal-projects\ses_form_demo\ses_template_demo> aws ses update-template --cli-input-json file://SES_TemplateDemo.json
```


