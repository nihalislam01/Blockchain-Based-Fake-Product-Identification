# Hexis - Blockchain Based Fake Product Identification

## Environment Configuration
Configure the following environment variables in the /server/.env file
```
PORT = 8080
NODE_ENV = DEVELOPMENT
CLIENT_DOMAIN = "http://localhost:3000"
COOKIE_EXPIRE = 7

#MongoDB Configuration Setup
DB_URI =(Your MongoDB URL)

#SMTP Confifuration Setup
SMPT_HOST = smtp.gmail.com
SMPT_PORT = 587
SMPT_SERVICE = gmail
SMPT_MAIL =(Your EMAIL)
SMPT_PASSWORD =(Your PASSWORD)

#Google OAuth Configuration Setup
GOOGLE_CLIENT_ID=(Your CLIENT ID)
GOOGLE_CLIENT_SECRET=(Your CLIENT SECRRET)

#JWT Configuration Setup
JWT_SECRET = 12345
JWT_EXPIRE = 7d

#Cloudinary Configuration Setup
CLOUDINARY_CLOUD_NAME=(Your CLOUD NAME)
CLOUDINARY_API_KEY=(Your API KEY)
CLOUDINARY_API_SECRET=(Your API SECRET)
```
