import { Request, Response } from 'express';
import Contact, { IContact } from '../models/Contact';
import { sendEmail } from '../utils/emailService';

export const createContact = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, subject, message } = req.body;

    // Create new contact
    const contact = new Contact({
      name,
      email,
      subject,
      message
    });

    await contact.save();

    // Send email notification
    try {
      await sendEmail({
        to: process.env.EMAIL_USER || 'meena@example.com',
        subject: `New Contact Form Submission: ${subject}`,
        html: `
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Subject:</strong> ${subject}</p>
          <p><strong>Message:</strong></p>
          <p>${message.replace(/\n/g, '<br>')}</p>
        `
      });

      // Send auto-reply to user
      await sendEmail({
        to: email,
        subject: 'Thank you for contacting Meena Kannan',
        html: `
          <h2>Thank you for reaching out!</h2>
          <p>Hi ${name},</p>
          <p>Thank you for your message. I've received your email and will get back to you as soon as possible.</p>
          <p>Best regards,<br>Meena Kannan</p>
        `
      });
    } catch (emailError) {
      console.error('Email sending failed:', emailError);
      // Don't fail the request if email fails
    }

    res.status(201).json({
      status: 'success',
      message: 'Message sent successfully',
      data: {
        id: contact._id,
        name: contact.name,
        email: contact.email,
        subject: contact.subject
      }
    });
  } catch (error: any) {
    console.error('Contact creation error:', error);
    res.status(400).json({
      status: 'error',
      message: error.message || 'Failed to send message'
    });
  }
};

export const getContacts = async (req: Request, res: Response): Promise<void> => {
  try {
    const { page = 1, limit = 10, status } = req.query;
    const skip = (Number(page) - 1) * Number(limit);

    const filter: any = {};
    if (status) {
      filter.status = status;
    }

    const contacts = await Contact.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit))
      .select('-__v');

    const total = await Contact.countDocuments(filter);

    res.status(200).json({
      status: 'success',
      data: {
        contacts,
        pagination: {
          current: Number(page),
          pages: Math.ceil(total / Number(limit)),
          total
        }
      }
    });
  } catch (error: any) {
    console.error('Get contacts error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch contacts'
    });
  }
};

export const updateContactStatus = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const contact = await Contact.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true }
    );

    if (!contact) {
      res.status(404).json({
        status: 'error',
        message: 'Contact not found'
      });
      return;
    }

    res.status(200).json({
      status: 'success',
      message: 'Contact status updated',
      data: contact
    });
  } catch (error: any) {
    console.error('Update contact status error:', error);
    res.status(400).json({
      status: 'error',
      message: error.message || 'Failed to update contact status'
    });
  }
};
