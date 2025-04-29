const nodemailer = require('nodemailer');

// En dev, crea cuenta de prueba automática
let transporterPromise = nodemailer.createTestAccount().then(testAcc => {
  return nodemailer.createTransport({
    host: testAcc.smtp.host,
    port: testAcc.smtp.port,
    secure: testAcc.smtp.secure,
    auth: {
      user: testAcc.user,
      pass: testAcc.pass
    }
  });
});

async function sendPurchaseConfirmation(to, ticket) {
  const transporter = await transporterPromise;
  let info = await transporter.sendMail({
    from: `"E-Commerce" <${transporter.options.auth.user}>`,
    to,
    subject: `Confirmación de compra – Código ${ticket.code}`,
    html: `<h1>¡Gracias por tu compra!</h1>…`
  });
  console.log('Preview URL:', nodemailer.getTestMessageUrl(info));
}

module.exports = { sendPurchaseConfirmation };

