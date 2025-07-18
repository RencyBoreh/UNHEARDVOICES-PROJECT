const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

exports.submitContactForm = async (req, res) => {
  const { name, email, message } = req.body;

const emailData = {
  to: process.env.ADMIN_EMAIL, // ✅ receiver (your Gmail)
  from: 'no-reply@sendgrid.net', // ✅ neutral sender to avoid domain issues
  replyTo: email, // 👈 user who filled the form (so you can reply directly)
  subject: `New Contact Form Submission from ${name}`,
  text: `
Name: ${name}
Email: ${email}

Message:
${message}
  `,
};


  try {
    await sgMail.send(emailData);
    res.status(200).json({ message: 'Message sent successfully.' });
  } catch (err) {
    console.error('SendGrid error:', err.response?.body || err.message);
    res.status(500).json({ error: 'Failed to send message.' });
  }
};
