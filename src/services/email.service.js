const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '587', 10),
  secure: false,
  auth: {
    user: process.env.SMTP_USER || 'flenbarhussain4448@gmail.com',
    pass: process.env.SMTP_PASS || process.env.SMTP_APP_PASSWORD || '',
  },
});

/**
 * Send a password-reset email with a one-time token link.
 * @param {string} to       – recipient email
 * @param {string} resetUrl – full URL containing the raw token
 * @param {string} [name]   – recipient display name
 */
async function sendResetEmail(to, resetUrl, name) {
  const info = await transporter.sendMail({
    from: `"ASTU MSJ Bootcamp" <${process.env.SMTP_USER || 'flenbarhussain4448@gmail.com'}>`,
    to,
    subject: 'Reset your password – ASTU MSJ Bootcamp',
    html: `
      <div style="font-family:Arial,sans-serif;max-width:520px;margin:0 auto;padding:32px 24px;">
        <h2 style="color:#065f46;margin-bottom:8px;">Password Reset Request</h2>
        <p style="color:#475569;font-size:15px;line-height:1.6;">
          Hi ${name || 'there'},
        </p>
        <p style="color:#475569;font-size:15px;line-height:1.6;">
          We received a request to reset your password for your ASTU MSJ Bootcamp account.
          Click the button below to set a new password. This link expires in <b>10 minutes</b>.
        </p>
        <div style="text-align:center;margin:32px 0;">
          <a href="${resetUrl}"
             style="background:#065f46;color:#fff;padding:14px 32px;border-radius:8px;text-decoration:none;font-weight:600;font-size:15px;display:inline-block;">
            Reset Password
          </a>
        </div>
        <p style="color:#94a3b8;font-size:13px;line-height:1.6;">
          If the button doesn't work, copy and paste this link into your browser:<br/>
          <a href="${resetUrl}" style="color:#065f46;word-break:break-all;">${resetUrl}</a>
        </p>
        <hr style="border:none;border-top:1px solid #e2e8f0;margin:24px 0;" />
        <p style="color:#94a3b8;font-size:12px;text-align:center;">
          ASTU MSJ Summer Bootcamp · If you didn't request this, you can safely ignore this email.
        </p>
      </div>
    `,
  });

  console.log(`[Email] Reset email sent to ${to} (messageId: ${info.messageId})`);
  return info;
}

module.exports = { sendResetEmail };
