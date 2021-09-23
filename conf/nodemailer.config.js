require("dotenv").config();
const nodemailer = require("nodemailer");
const path = require('path');

const user = process.env.user;
const pass = process.env.pass;

const transport = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: user,
        pass: pass,
    },
});


module.exports.sendNotiyArrivalEmail = (Username, Email, ProductName, ModeleName, BrandName) => {
    transport.sendMail({
        from: '<Green Repack>',
        to: "mustafa.idoufkir@gmail.com",
        subject: `Arrival Product: ${ProductName}`,
        html: ` 
        <h2>Hello ${Username}</h2>
        <p>Your Product: <b>${ProductName}</b>, Under Modele : <b>${ModeleName}</b>, Brand : <b>${BrandName}</b>. Arrival-Test</p> `,
    }).catch(err => console.log(err));

}

module.exports.sendDemandeAccept = (Username, Email, Password) => {
    transport.sendMail({
        from: '<Green Repack>',
        to: Email,
        subject: `Inscription accepté`,
        html: ` 
        <h2>Bonjour ${Username}</h2>
        <p>Votre demande d'inscription est accepté chez green repack. 
        
        Votre mote de passe est : <b>${Password}</b>. `,
    }).catch(err => console.log(err));

}


module.exports.sendAcceptResall = (username, firstname, lastname, email) => {
    transport.sendMail({
        from: '<Green Repack>',
        to: email,
        subject: "Accept Resall",
        attachments: [
            {
                filename: 'doc.pdf', // <= Here: made sure file name match
                path: path.join(__dirname, '../docs/doc.pdf'), // <= Here
                contentType: 'application/pdf'
            }
        ],
        html: ` 
        <h2>Hello ${firstname} ${lastname}</h2>
        <h3>Test Accept Resall notify User : ${username}</h3> `,
    }).catch(err => console.log(err));
}

module.exports.sendContreOffreEmail = (username, email) => {
    transport.sendMail({
        from: '<Green Repack>',
        to: email,
        subject: "Contre Offre",
        html: ` 
        <h2>Hello ${username}</h2>
        <h3>Test Contre Offre notify</h3> `,
    }).catch(err => console.log(err));
}

module.exports.sendConfirmationEmail = (name, email, confirmationCode) => {
    transport.sendMail({
        from: '<Green Repack>',
        to: email,
        subject: "Veuillez confirmer votre compte",
        html: `
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office">

<head>
    <meta charset="UTF-8">
    <meta content="width=device-width, initial-scale=1" name="viewport">
    <meta name="x-apple-disable-message-reformatting">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta content="telephone=no" name="format-detection">
    <title></title>
    <!--[if (mso 16)]>
    <style type="text/css">
    a {text-decoration: none;}
    </style>
    <style>
/* IMPORTANT THIS STYLES MUST BE ON FINAL EMAIL */
#outlook a {
    padding: 0;
}

.es-button {
    mso-style-priority: 100 !important;
    text-decoration: none !important;
}

a[x-apple-data-detectors] {
    color: inherit !important;
    text-decoration: none !important;
    font-size: inherit !important;
    font-family: inherit !important;
    font-weight: inherit !important;
    line-height: inherit !important;
}

.es-desk-hidden {
    display: none;
    float: left;
    overflow: hidden;
    width: 0;
    max-height: 0;
    line-height: 0;
    mso-hide: all;
}

[data-ogsb] .es-button {
    border-width: 0 !important;
    padding: 10px 30px 10px 30px !important;
}

/*
END OF IMPORTANT
*/
body {
    width: 100%;
    font-family: arial, 'helvetica neue', helvetica, sans-serif;
    -webkit-text-size-adjust: 100%;
    -ms-text-size-adjust: 100%;
}

table {
    mso-table-lspace: 0pt;
    mso-table-rspace: 0pt;
    border-collapse: collapse;
    border-spacing: 0px;
}

table td,
body,
.es-wrapper {
    padding: 0;
    Margin: 0;
}

.es-content,
.es-header,
.es-footer {
    table-layout: fixed !important;
    width: 100%;
}

img {
    display: block;
    border: 0;
    outline: none;
    text-decoration: none;
    -ms-interpolation-mode: bicubic;
}

p,
hr {
    Margin: 0;
}

h1,
h2,
h3,
h4,
h5 {
    Margin: 0;
    line-height: 120%;
    mso-line-height-rule: exactly;
    font-family: Montserrat, sans-serif;
}

p,
ul li,
ol li,
a {
    -webkit-text-size-adjust: none;
    -ms-text-size-adjust: none;
    mso-line-height-rule: exactly;
}

.es-left {
    float: left;
}

.es-right {
    float: right;
}

.es-p5 {
    padding: 5px;
}

.es-p5t {
    padding-top: 5px;
}

.es-p5b {
    padding-bottom: 5px;
}

.es-p5l {
    padding-left: 5px;
}

.es-p5r {
    padding-right: 5px;
}

.es-p10 {
    padding: 10px;
}

.es-p10t {
    padding-top: 10px;
}

.es-p10b {
    padding-bottom: 10px;
}

.es-p10l {
    padding-left: 10px;
}

.es-p10r {
    padding-right: 10px;
}

.es-p15 {
    padding: 15px;
}

.es-p15t {
    padding-top: 15px;
}

.es-p15b {
    padding-bottom: 15px;
}

.es-p15l {
    padding-left: 15px;
}

.es-p15r {
    padding-right: 15px;
}

.es-p20 {
    padding: 20px;
}

.es-p20t {
    padding-top: 20px;
}

.es-p20b {
    padding-bottom: 20px;
}

.es-p20l {
    padding-left: 20px;
}

.es-p20r {
    padding-right: 20px;
}

.es-p25 {
    padding: 25px;
}

.es-p25t {
    padding-top: 25px;
}

.es-p25b {
    padding-bottom: 25px;
}

.es-p25l {
    padding-left: 25px;
}

.es-p25r {
    padding-right: 25px;
}

.es-p30 {
    padding: 30px;
}

.es-p30t {
    padding-top: 30px;
}

.es-p30b {
    padding-bottom: 30px;
}

.es-p30l {
    padding-left: 30px;
}

.es-p30r {
    padding-right: 30px;
}

.es-p35 {
    padding: 35px;
}

.es-p35t {
    padding-top: 35px;
}

.es-p35b {
    padding-bottom: 35px;
}

.es-p35l {
    padding-left: 35px;
}

.es-p35r {
    padding-right: 35px;
}

.es-p40 {
    padding: 40px;
}

.es-p40t {
    padding-top: 40px;
}

.es-p40b {
    padding-bottom: 40px;
}

.es-p40l {
    padding-left: 40px;
}

.es-p40r {
    padding-right: 40px;
}

.es-menu td {
    border: 0;
}

.es-menu td a img {
    display: inline-block !important;
    vertical-align: middle;
}

/*
END CONFIG STYLES
*/
s {
    text-decoration: line-through;
}

p,
ul li,
ol li {
    font-family: Montserrat, sans-serif;
    line-height: 150%;
}

ul li,
ol li {
    Margin-bottom: 15px;
}

a {
    text-decoration: underline;
}

.es-menu td a {
    text-decoration: none;
    display: block;
    font-family: Montserrat, sans-serif;
}

.es-wrapper {
    width: 100%;
    height: 100%;
    background-image: ;
    background-repeat: repeat;
    background-position: center top;
    background-color: #ffffff;
}

.es-wrapper-color {
    background-color: #ffffff;
}

.es-header {
    background-color: transparent;
    background-image: ;
    background-repeat: repeat;
    background-position: center top;
}

.es-header-body {
    background-color: #ffffff;
}

.es-header-body p,
.es-header-body ul li,
.es-header-body ol li {
    color: #333333;
    font-size: 14px;
}

.es-header-body a {
    color: #134f5c;
    font-size: 14px;
}

.es-content-body {
    background-color: #ffffff;
}

.es-content-body p,
.es-content-body ul li,
.es-content-body ol li {
    color: #333333;
    font-size: 16px;
}

.es-content-body a {
    color: #134f5c;
    font-size: 16px;
}

.es-footer {
    background-color: transparent;
    background-image: ;
    background-repeat: repeat;
    background-position: center top;
}

.es-footer-body {
    background-color: #ffffff;
}

.es-footer-body p,
.es-footer-body ul li,
.es-footer-body ol li {
    color: #333333;
    font-size: 12px;
}

.es-footer-body a {
    color: #134f5c;
    font-size: 12px;
}

.es-infoblock,
.es-infoblock p,
.es-infoblock ul li,
.es-infoblock ol li {
    line-height: 120%;
    font-size: 12px;
    color: #cccccc;
}

.es-infoblock a {
    font-size: 12px;
    color: #cccccc;
}

h1 {
    font-size: 70px;
    font-style: normal;
    font-weight: normal;
    color: #333333;
}

h2 {
    font-size: 36px;
    font-style: normal;
    font-weight: normal;
    color: #333333;
}

h3 {
    font-size: 20px;
    font-style: normal;
    font-weight: normal;
    color: #333333;
}

.es-header-body h1 a,
.es-content-body h1 a,
.es-footer-body h1 a {
    font-size: 70px;
}

.es-header-body h2 a,
.es-content-body h2 a,
.es-footer-body h2 a {
    font-size: 36px;
}

.es-header-body h3 a,
.es-content-body h3 a,
.es-footer-body h3 a {
    font-size: 20px;
}

a.es-button,
button.es-button {
    border-style: solid;
    border-color: #fef3e6;
    border-width: 10px 30px 10px 30px;
    display: inline-block;
    background: #fef3e6;
    border-radius: 0px;
    font-size: 16px;
    font-family: Montserrat, sans-serif;
    font-weight: normal;
    font-style: normal;
    line-height: 120%;
    color: #666666;
    text-decoration: none;
    width: auto;
    text-align: center;
}

.es-button-border {
    border-style: solid solid solid solid;
    border-color: #999999 #999999 #999999 #999999;
    background: #fef3e6;
    border-width: 1px 1px 1px 1px;
    display: inline-block;
    border-radius: 0px;
    width: auto;
}

/* RESPONSIVE STYLES Please do not delete and edit CSS styles below. If you don't need responsive layout, please delete this section. */
@media only screen and (max-width: 600px) {

    p,
    ul li,
    ol li,
    a {
        line-height: 150% !important;
    }

    h1,
    h2,
    h3,
    h1 a,
    h2 a,
    h3 a {
        line-height: 120%;
    }

    h1 {
        font-size: 42px !important;
        text-align: center;
    }

    h2 {
        font-size: 26px !important;
        text-align: center;
    }

    h3 {
        font-size: 20px !important;
        text-align: center;
    }

    .es-header-body h1 a,
    .es-content-body h1 a,
    .es-footer-body h1 a {
        font-size: 42px !important;
    }

    .es-header-body h2 a,
    .es-content-body h2 a,
    .es-footer-body h2 a {
        font-size: 26px !important;
    }

    .es-header-body h3 a,
    .es-content-body h3 a,
    .es-footer-body h3 a {
        font-size: 20px !important;
    }

    .es-menu td a {
        font-size: 14px !important;
    }

    .es-header-body p,
    .es-header-body ul li,
    .es-header-body ol li,
    .es-header-body a {
        font-size: 16px !important;
    }

    .es-content-body p,
    .es-content-body ul li,
    .es-content-body ol li,
    .es-content-body a {
        font-size: 16px !important;
    }

    .es-footer-body p,
    .es-footer-body ul li,
    .es-footer-body ol li,
    .es-footer-body a {
        font-size: 16px !important;
    }

    .es-infoblock p,
    .es-infoblock ul li,
    .es-infoblock ol li,
    .es-infoblock a {
        font-size: 12px !important;
    }

    *[class="gmail-fix"] {
        display: none !important;
    }

    .es-m-txt-c,
    .es-m-txt-c h1,
    .es-m-txt-c h2,
    .es-m-txt-c h3 {
        text-align: center !important;
    }

    .es-m-txt-r,
    .es-m-txt-r h1,
    .es-m-txt-r h2,
    .es-m-txt-r h3 {
        text-align: right !important;
    }

    .es-m-txt-l,
    .es-m-txt-l h1,
    .es-m-txt-l h2,
    .es-m-txt-l h3 {
        text-align: left !important;
    }

    .es-m-txt-r img,
    .es-m-txt-c img,
    .es-m-txt-l img {
        display: inline !important;
    }

    .es-button-border {
        display: block !important;
    }

    a.es-button,
    button.es-button {
        font-size: 16px !important;
        display: block !important;
        border-right-width: 0px !important;
        border-left-width: 0px !important;
        border-bottom-width: 15px !important;
        border-top-width: 15px !important;
    }

    .es-adaptive table,
    .es-left,
    .es-right {
        width: 100% !important;
    }

    .es-content table,
    .es-header table,
    .es-footer table,
    .es-content,
    .es-footer,
    .es-header {
        width: 100% !important;
        max-width: 600px !important;
    }

    .es-adapt-td {
        display: block !important;
        width: 100% !important;
    }

    .adapt-img {
        width: 100% !important;
        height: auto !important;
    }

    .es-m-p0 {
        padding: 0 !important;
    }

    .es-m-p0r {
        padding-right: 0 !important;
    }

    .es-m-p0l {
        padding-left: 0 !important;
    }

    .es-m-p0t {
        padding-top: 0 !important;
    }

    .es-m-p0b {
        padding-bottom: 0 !important;
    }

    .es-m-p20b {
        padding-bottom: 20px !important;
    }

    .es-mobile-hidden,
    .es-hidden {
        display: none !important;
    }

    tr.es-desk-hidden,
    td.es-desk-hidden,
    table.es-desk-hidden {
        width: auto !important;
        overflow: visible !important;
        float: none !important;
        max-height: inherit !important;
        line-height: inherit !important;
    }

    tr.es-desk-hidden {
        display: table-row !important;
    }

    table.es-desk-hidden {
        display: table !important;
    }

    td.es-desk-menu-hidden {
        display: table-cell !important;
    }

    .es-menu td {
        width: 1% !important;
    }

    table.es-table-not-adapt,
    .esd-block-html table {
        width: auto !important;
    }

    table.es-social {
        display: inline-block !important;
    }

    table.es-social td {
        display: inline-block !important;
    }

    .es-m-p5 {
        padding: 5px !important;
    }

    .es-m-p5t {
        padding-top: 5px !important;
    }

    .es-m-p5b {
        padding-bottom: 5px !important;
    }

    .es-m-p5r {
        padding-right: 5px !important;
    }

    .es-m-p5l {
        padding-left: 5px !important;
    }

    .es-m-p10 {
        padding: 10px !important;
    }

    .es-m-p10t {
        padding-top: 10px !important;
    }

    .es-m-p10b {
        padding-bottom: 10px !important;
    }

    .es-m-p10r {
        padding-right: 10px !important;
    }

    .es-m-p10l {
        padding-left: 10px !important;
    }

    .es-m-p15 {
        padding: 15px !important;
    }

    .es-m-p15t {
        padding-top: 15px !important;
    }

    .es-m-p15b {
        padding-bottom: 15px !important;
    }

    .es-m-p15r {
        padding-right: 15px !important;
    }

    .es-m-p15l {
        padding-left: 15px !important;
    }

    .es-m-p20 {
        padding: 20px !important;
    }

    .es-m-p20t {
        padding-top: 20px !important;
    }

    .es-m-p20r {
        padding-right: 20px !important;
    }

    .es-m-p20l {
        padding-left: 20px !important;
    }

    .es-m-p25 {
        padding: 25px !important;
    }

    .es-m-p25t {
        padding-top: 25px !important;
    }

    .es-m-p25b {
        padding-bottom: 25px !important;
    }

    .es-m-p25r {
        padding-right: 25px !important;
    }

    .es-m-p25l {
        padding-left: 25px !important;
    }

    .es-m-p30 {
        padding: 30px !important;
    }

    .es-m-p30t {
        padding-top: 30px !important;
    }

    .es-m-p30b {
        padding-bottom: 30px !important;
    }

    .es-m-p30r {
        padding-right: 30px !important;
    }

    .es-m-p30l {
        padding-left: 30px !important;
    }

    .es-m-p35 {
        padding: 35px !important;
    }

    .es-m-p35t {
        padding-top: 35px !important;
    }

    .es-m-p35b {
        padding-bottom: 35px !important;
    }

    .es-m-p35r {
        padding-right: 35px !important;
    }

    .es-m-p35l {
        padding-left: 35px !important;
    }

    .es-m-p40 {
        padding: 40px !important;
    }

    .es-m-p40t {
        padding-top: 40px !important;
    }

    .es-m-p40b {
        padding-bottom: 40px !important;
    }

    .es-m-p40r {
        padding-right: 40px !important;
    }

    .es-m-p40l {
        padding-left: 40px !important;
    }
}

/* END RESPONSIVE STYLES */
html,
body {
    font-family: Montserrat, sans-serif;
}
    </style>

</head>

<body>
    <div class="es-wrapper-color">
        
        <table class="es-wrapper" width="100%" cellspacing="0" cellpadding="0">
            <tbody>
                <tr>
                    <td class="esd-email-paddings" valign="top">
                        <table cellpadding="0" cellspacing="0" class="es-content esd-footer-popover" align="center">
                            <tbody>
                                <tr>
                                    <td class="esd-stripe" align="center">
                                        <table bgcolor="#ffffff" class="es-content-body" align="center" cellpadding="0" cellspacing="0" width="700">
                                            <tbody>
                                                <tr>
                                                    <td class="esd-structure es-p40t es-p20b es-p20r es-p20l" align="left" esd-custom-block-id="334499">
                                                        <table cellpadding="0" cellspacing="0" width="100%">
                                                            <tbody>
                                                                <tr>
                                                                    <td width="660" class="esd-container-frame" align="center" valign="top">
                                                                        <table cellpadding="0" cellspacing="0" width="100%">
                                                                            <tbody>
                                                                                <tr>
                                                                                    <td align="center" class="esd-block-image" style="font-size: 0px;"><a target="_blank"><img src="https://tlr.stripocdn.email/content/guids/CABINET_2663efe83689b9bda1312f85374f56d2/images/10381620386430630.png" alt style="display: block;" width="100"></a></td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td align="center" class="esd-block-text">
                                                                                        <h2>Verify your email to finish signing up</h2>
                                                                                    </td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td align="center" class="esd-block-spacer es-p10t es-p10b es-m-txt-c" style="font-size:0">
                                                                                        <table border="0" width="40%" height="100%" cellpadding="0" cellspacing="0" style="width: 40% !important; display: inline-table;">
                                                                                            <tbody>
                                                                                                <tr>
                                                                                                    <td style="border-bottom: 1px solid #cccccc; background:none; height:1px; width:100%; margin:0px 0px 0px 0px;"></td>
                                                                                                </tr>
                                                                                            </tbody>
                                                                                        </table>
                                                                                    </td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td align="center" class="esd-block-text es-p5t es-p5b es-p40r es-m-p0r" esd-links-underline="none">
                                                                                        <p>Thank you for choosing <strong>Green Repack</strong>.</p>
                                                                                        <p><br></p>
                                                                                        <p>Please confirm that <strong><a target="_blank" href="mailto:${email}" style="text-decoration: none;">${email}</a></strong>&nbsp;is your email address by clicking on the button below or use this link <a target="_blank" href="http://localhost:3000/api/auth/validate/${confirmationCode}" style="text-decoration: none; word-break: break-all;">https://greenrepack.com/confirm-email</a> within <strong>24 hours</strong>.</p>
                                                                                    </td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td align="center" class="esd-block-spacer es-p10t es-p10b es-m-txt-c" style="font-size:0">
                                                                                        <table border="0" width="40%" height="100%" cellpadding="0" cellspacing="0" style="width: 40% !important; display: inline-table;">
                                                                                            <tbody>
                                                                                                <tr>
                                                                                                    <td style="border-bottom: 1px solid #cccccc; background:none; height:1px; width:100%; margin:0px 0px 0px 0px;"></td>
                                                                                                </tr>
                                                                                            </tbody>
                                                                                        </table>
                                                                                    </td>
                                                                                </tr>
                                                                            </tbody>
                                                                        </table>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</body>

</html>
    `,
    }).catch(err => console.log(err));
};
