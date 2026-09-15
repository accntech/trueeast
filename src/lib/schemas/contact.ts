import { z } from 'zod';

export const contactSchema = z.object({
	name: z.string().trim().min(1, 'Please enter your name.'),
	email: z.string()
		.trim()
		.min(1, 'Please enter your email address.')
		.pipe(z.email('Please enter a valid email address.')),
	phone: z.string().optional().default(''),
	kind: z.string().min(1, 'Please choose what you are considering'),
	message: z.string().trim().min(1, 'Please tell us about the building.'),
	botcheck: z.boolean().optional().default(false)
});

export type ContactForm = z.infer<typeof contactSchema>;
