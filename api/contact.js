const nodemailer = require('nodemailer');

export default async function handler(req, res) {
  // Sirf POST request allow karein
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ status: 'error', message: `Method ${req.method} Not Allowed` });
  }

  const { name, email, subject, message } = req.body;

  // Form validations
  if (!name || !email || !subject || !message) {
    return res.status(400).json({ 
      status: 'error', 
      errors: ['Please complete all form fields before submitting.'] 
    });
  }

  // Nodemailer Transporter setup using Gmail
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });

  try {
    // Email send configuration
    await transporter.sendMail({
      from: `"${name}" <${email}>`,
      to: process.env.EMAIL_USER,
      subject: `Portfolio Contact: ${subject}`,
      text: `You have received a new message from your portfolio contact form.\n\nName: ${name}\nEmail: ${email}\nSubject: ${subject}\n\nMessage:\n${message}`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #180C14; color: #fff; border-radius: 8px;">
          <h2 style="color: #F4E07B; border-bottom: 2px solid #7A1C3E; padding-bottom: 10px;">New Portfolio Message</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Subject:</strong> ${subject}</p>
          <div style="background: #26121E; padding: 15px; margin-top: 15px; border-radius: 6px; border-left: 4px solid #7BD0F4;">
            <p style="margin: 0; color: #ddd;"><strong>Message:</strong></p>
            <p style="margin-top: 5px; color: #fff;">${message.replace(/\n/g, '<br>')}</p>
          </div>
        </div>
      `
    });

    return res.status(200).json({ 
      status: 'success', 
      message: 'Message transmitted successfully!' 
    });

  } catch (error) {
    console.error('Email transmission error:', error);
    return res.status(500).json({ 
      status: 'error', 
      message: 'Failed to send message. Please try again later.' 
    });
  }
}