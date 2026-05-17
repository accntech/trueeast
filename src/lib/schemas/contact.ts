import { z } from 'zod';

export const contactSchema = z.object({
	name: z.string().min(1, 'Name is required'),
	email: z.string().email('Please enter a valid email address'),
	phone: z.string().optional().default(''),
	kind: z.string().min(1, 'Please choose what you are considering'),
	message: z.string().min(1, 'Message is required'),
	botcheck: z.boolean().optional().default(false)
});

export type ContactForm = z.infer<typeof contactSchema>;
