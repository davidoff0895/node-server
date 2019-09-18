# node-server
Mail sender and pdf printer. Project supports ```en``` and ```ru``` locale.

### start project

- install dependencies: ```npm install```
- start on localhost:9000 ```npm start```

### send mail
- enter to ```scripts/server/mails/config.js``` your SMTP configs
- write your email to param ```to``` into ```sendMail.sh``` script
- run ```sendMail.sh``` script
- check your post

### create pdf
- run ```getPDF.sh```
- check for file in project folder after process is completed

# Examples:
## mail
![vue-chat-interface](https://user-images.githubusercontent.com/29586170/65173098-d52c3e80-da56-11e9-9b44-69d36f904d0c.png)
## PDF
![vue-chat-interface](https://user-images.githubusercontent.com/29586170/65173162-ef661c80-da56-11e9-9459-ec734ddecf25.png)
