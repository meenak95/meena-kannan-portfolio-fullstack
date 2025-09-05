import nodemailer from 'nodemailer';

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST || 'smtp.gmail.com',
    port: Number(process.env.EMAIL_PORT) || 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });
};

export const sendEmail = async (options: EmailOptions): Promise<void> => {
  try {
    const transporter = createTransporter();

    const mailOptions = {
      from: `"Meena Kannan Portfolio" <${process.env.EMAIL_USER}>`,
      to: options.to,
      subject: options.subject,
      html: options.html,
      text: options.text
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', info.messageId);
  } catch (error) {
    console.error('Email sending failed:', error);
    throw new Error('Failed to send email');
  }
};

export const sendContactFormEmail = async (contactData: {
  name: string;
  email: string;
  subject: string;
  message: string;
}): Promise<void> => {
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #333; border-bottom: 2px solid #3b82f6; padding-bottom: 10px;">
        New Contact Form Submission
      </h2>
      
      <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <p><strong>Name:</strong> ${contactData.name}</p>
        <p><strong>Email:</strong> ${contactData.email}</p>
        <p><strong>Subject:</strong> ${contactData.subject}</p>
      </div>
      
      <div style="background: white; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px;">
        <h3 style="color: #333; margin-top: 0;">Message:</h3>
        <p style="line-height: 1.6; color: #555;">${contactData.message.replace(/\n/g, '<br>')}</p>
      </div>
      
      <div style="margin-top: 20px; padding: 15px; background: #3b82f6; color: white; border-radius: 8px; text-align: center;">
        <p style="margin: 0;">Reply directly to this email to respond to ${contactData.name}</p>
      </div>
    </div>
  `;

  await sendEmail({
    to: process.env.EMAIL_USER || 'meena@example.com',
    subject: `Portfolio Contact: ${contactData.subject}`,
    html
  });
};

export const sendAutoReplyEmail = async (contactData: {
  name: string;
  email: string;
}): Promise<void> => {
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="text-align: center; margin-bottom: 30px;">
        <h1 style="color: #3b82f6; margin-bottom: 10px;">Thank You!</h1>
        <p style="color: #666; font-size: 18px;">Your message has been received</p>
      </div>
      
      <div style="background: #f8fafc; padding: 30px; border-radius: 12px; margin: 20px 0;">
        <p style="font-size: 16px; line-height: 1.6; color: #333; margin: 0;">
          Hi <strong>${contactData.name}</strong>,
        </p>
        <br>
        <p style="font-size: 16px; line-height: 1.6; color: #555; margin: 0;">
          Thank you for reaching out through my portfolio website! I've received your message 
          and will get back to you as soon as possible, typically within 24 hours.
        </p>
        <br>
        <p style="font-size: 16px; line-height: 1.6; color: #555; margin: 0;">
          In the meantime, feel free to check out my latest projects and blog posts on my website.
        </p>
      </div>
      
      <div style="text-align: center; margin-top: 30px; padding: 20px; background: #3b82f6; color: white; border-radius: 8px;">
        <p style="margin: 0; font-size: 16px;">
          Best regards,<br>
          <strong>Meena Kannan</strong><br>
          <span style="font-size: 14px; opacity: 0.9;">Full-Stack Developer</span>
        </p>
      </div>
    </div>
  `;

  await sendEmail({
    to: contactData.email,
    subject: 'Thank you for contacting Meena Kannan',
    html
  });
};
