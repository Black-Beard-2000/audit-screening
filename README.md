# Overview:
WHO has an alcohol screening tool called AUDIT. Clincians use it to determine the severity of the alcohol abuse disorder in the testee.
It asks 10 questions related to their daily lives and the testee has to answer it by selecting the correct alternative for each question.
Based on the total score, the testee is then categorized into various categories which indicate the severity of the disorder.

# About the project:
In my attempt at simplifying the psychological scales, while retaining their authenticity, I tried it with the simplest scale I can think of. Which was AUDIT.
It has only 10 items, with each question from 1 to 8 has 5 possible responses, each alternative was assigned a particular score. I designed the AUDIT app in such a way that the users have to response to the questions with chatbuttons in order to reduce the anticipation of the possiblity of a correct response entered by the user.
The app first takes the name of the user and their email id, then asks them questions from the scale, and then stores their responses into a secure database.
From there, the report is generated through ChatGPT API by preprogrammed standardized categories given in the AUDIT scoring manual.
That generated report is then mailed to the email id entered by the user. 

#What problem it solves:
It generally doesn't solve any problem as such at large. However, it is one of many coming scales to be digitized in a way to create more and more tools for the mental health professionals to solve their problems.
