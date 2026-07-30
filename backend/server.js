require('dotenv').config();
const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();
const PORT = process.env.PORT || 5000;

// ==========================================
// 1. CORS & Middleware Configuration
// ==========================================

// Configure Cross-Origin Resource Sharing (CORS)
app.use(
  cors({
    origin: ['http://127.0.0.1:5500', 'http://localhost:5500', 'http://localhost:3000'],
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
  })
);

// Payload Parsing Middleware
app.use(express.json());

// Helper check to determine if SMTP environment variables are fully present
const hasSmtpConfig = () => {
  return (
    process.env.SMTP_HOST &&
    process.env.SMTP_PORT &&
    process.env.SMTP_USER &&
    process.env.SMTP_PASS
  );
};

// Initialize Transporter conditionally
let transporter = null;
if (hasSmtpConfig()) {
  transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT, 10),
    secure: parseInt(process.env.SMTP_PORT, 10) === 465,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  transporter.verify((error) => {
    if (error) {
      console.error('❌ Nodemailer Transporter Error:', error.message);
    } else {
      console.log('⚡ Nodemailer is ready to send emails.');
    }
  });
} else {
  console.log('⚠️ SMTP environment variables missing. Running contact endpoint in Local Dev Mode.');
}

// ==========================================
// 2. Routes
// ==========================================

/**
 * @route   GET /api/health
 * @desc    Health check endpoint
 * @access  Public
 */
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

/**
 * @route   POST /api/contact
 * @desc    Process contact form submissions
 * @access  Public
 */
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    // Field Validation
    const errors = [];
    if (!name || typeof name !== 'string' || !name.trim()) {
      errors.push('Name is required.');
    }
    if (!email || typeof email !== 'string' || !email.includes('@')) {
      errors.push('A valid email address is required.');
    }
    if (!subject || typeof subject !== 'string' || !subject.trim()) {
      errors.push('Subject is required.');
    }
    if (!message || typeof message !== 'string' || !message.trim()) {
      errors.push('Message is required.');
    }

    if (errors.length > 0) {
      return res.status(400).json({
        success: false,
        status: 'fail',
        message: 'Validation failed.',
        errors,
      });
    }

    // Dynamic Fallback Test Mode: If SMTP credentials are missing
    if (!hasSmtpConfig() || !transporter) {
      console.log('\n==========================================');
      console.log('📩 [LOCAL DEV MODE] Contact Form Payload Received:');
      console.log(`Name:    ${name}`);
      console.log(`Email:   ${email}`);
      console.log(`Subject: ${subject}`);
      console.log(`Message: ${message}`);
      console.log('==========================================\n');

      return res.status(200).json({
        success: true,
        status: 'success',
        message: 'Message received in local dev mode!',
      });
    }

    // Email Dispatch via Nodemailer
    const mailOptions = {
      from: `"Portfolio Contact" <${process.env.SMTP_USER}>`,
      to: process.env.RECEIVER_EMAIL || process.env.SMTP_USER,
      replyTo: email,
      subject: `[Portfolio Contact] ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
          <h2 style="color: #5D1E33;">New Portfolio Contact Message</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
          <p><strong>Subject:</strong> ${subject}</p>
          <div style="margin-top: 15px; padding: 15px; background: #f4f4f4; border-left: 4px solid #5D1E33;">
            <p style="margin: 0; white-space: pre-wrap;">${message}</p>
          </div>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    return res.status(200).json({
      success: true,
      status: 'success',
      message: 'Email sent successfully!',
    });
  } catch (error) {
    console.error('❌ Error processing contact form submission:', error);
    return res.status(500).json({
      success: false,
      status: 'error',
      message: error.message || 'An internal server error occurred while processing your request.',
    });
  }
});

// ==========================================
// 3. Error & 404 Handlers
// ==========================================

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Cannot find ${req.originalUrl} on this server.`,
  });
});

app.use((err, req, res, next) => {
  console.error('💥 Server Error:', err);
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || 'Internal server error occurred.',
  });
});

// ==========================================
// 4. Initialization
// ==========================================

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});