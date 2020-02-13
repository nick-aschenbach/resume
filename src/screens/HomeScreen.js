import React from 'react'
import Container from '@material-ui/core/Container'
import { Remarkable } from 'remarkable'

import resume from '../assets/aschenbach-resume-2020.pdf'
import pdf from '../assets/pdf.png'

const md = new Remarkable()

const input = `
*Background*

A full stack web development software engineer with a multidisciplinary background. I specialize in developing AWS cloud 
enabled back-end APIs in NodeJS. I have experience dealing with PII/HIPAA/PHI data and payments in a variety of 
environments. I worked in new product development most of my career. I am passionate about doing the right thing for 
users and working on products with a clear value proposition.

*Lead Software Development Engineer*

Cambia Health Solutions  
Apr 2016 – Nov 2019 (3 yrs 8 mos)  
Portland, Oregon 

Full stack developer for Project Health Pass [[link](https://play.google.com/store/apps/details?id=com.cambiahealth.ProjectHealthPass)]

I lead my team to develop a medical bill payment application that provided insights for how users can save money. 
Instead of going to multiple provider portals, we enabled claims/bills to flow into the app. This allowed 
users to pay all of their medical bills in one place. The app was supported by our talented billing specialists, who 
advocated for and helped users to understand their medical bills. Predominantly, I focused on the back-end part of the 
app on writing multiple microservices.

- Developed insights for bills employing medical expert knowledge and data science techniques
- Engineered RESTful APIs using Node.js on the back-end (express, sequelize, Cognito/JWT-based auth, jest)
- Developed React-Native front-end app to support iOS and Android devices
- Constructed Extract-Transform-Load (ETL) pipelines using AWS technologies: S3, Lambda, SQS, ECS and RDS (Postgres/MySQL)
- Employed AWS technologies: EC2, IAM, load balancers, Route53, ACM and CloudWatch Logs/Events
- Assisted with CI/CD pipeline development with GitLab CI and Jenkins
- Developed and led agile rituals including scrum, sprint planning, demo and grooming
- Practiced Test Driven Development (TDD)
- Developed API documentation and enabled four front-end teams to integrate with our back-end
- Set up monitoring and alerting both via email and Slack using New Relic, Datadog and custom code
- Debugged, reproduced locally and fixed multiple production issues
- Processed HL7 FHIR-based explanation of benefit resources

*Software Development Engineer*

Hewlett-Packard  
Jan 2014 – Apr 2016 (2 yrs 4 mos)  
Vancouver, Washington  

Ruby on Rails developer for Instant Ink Subscription Service [[link](https://instantink.hpconnected.com)]

- Increased customer base by over 50x from 30K to 1M users
- Delivered back-end fulfillment and point-of-sale activation (card redemption) services for Instant Ink
- Developed multiple bill payment systems to support US and overseas customers
- Developed back-end to communicate with over 1M printer embedded systems
- Created rails engines for tax calculation and prepaid cards
- Investigated and fixed production issues with monitoring tools including New Relic and Splunk
- Prototyped new applications using Rails and Sinatra
- Analyzed and improved application performance
- Used agile methodologies including test driven development and pair programming

*Software Development Engineer*

Mentor Graphics  
Jun 2012 – Jan 2014 (1 yr 8 mos)  
Wilsonville, Oregon  

C# developer for SystemVision Cloud [[link](https://www.systemvision.com/)]

- Developed web based multi-physics simulator on Windows Azure
- Implemented REST web API using ASP .NET MVC
- Trained client developers and prototyped javascript / HTML5 tools
- Employed Agile development practices including test-driven development and pair programming
- Exercised code with with RestSharp, Fiddler and POSTman

Previous roles:

- Mathematical Modeling Associate - *Physiome Sciences*
- Software Development Intern - *Thetus*
- General Manager - *Plastic Supply*
- Product Development - *Ultra Poly*

Training:

- M.S. Computer Science - *Portland State University*
- B.S. Computer Science - *University of Washington*
- B.A. Computational Biology - *Claremont Colleges* 
`

export default function HomeScreen () {
  return (
    <div>
      <Container maxWidth='md'>
        <div dangerouslySetInnerHTML={{ __html: md.render(input) }}/>
        <a href={resume}><img src={pdf} style={{width: '70px', left: '10px'}}/></a>
      </Container>
    </div>
  )
}
