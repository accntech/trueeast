import type { ContactForm } from '$lib/schemas/contact';

export function generate(data: ContactForm): string {
	const preheader = `${data.name} — ${data.kind}`;

	const row = (label: string, value: string) => `
								<tr>
									<td style="padding: 0 0 22px 0;">
										<p style="margin: 0 0 5px 0; font-size: 11px; color: #7e8675; text-transform: uppercase; letter-spacing: 0.16em; font-weight: 700;">${label}</p>
										<p style="margin: 0; font-size: 16px; color: #22302a; line-height: 1.5;">${value}</p>
									</td>
								</tr>`;

	const phoneRow = data.phone
		? row(
				'Phone',
				`<a href="tel:${escapeHtml(data.phone.replace(/\s/g, ''))}" style="color: #bc5e12; text-decoration: none;">${escapeHtml(data.phone)}</a>`
			)
		: '';

	return `<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
	<meta name="color-scheme" content="light only" />
</head>
<body style="margin: 0; padding: 0; background-color: #f4efe3; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif;">
	<div style="display: none; max-height: 0; overflow: hidden; mso-hide: all; font-size: 1px; line-height: 1px; color: #f4efe3;">
		New solar enquiry — ${escapeHtml(preheader)}&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;
	</div>
	<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #f4efe3; padding: 36px 16px;">
		<tr>
			<td align="center">
				<table role="presentation" width="600" cellpadding="0" cellspacing="0" style="width: 600px; max-width: 600px; background-color: #fcfaf4; border: 1px solid #dad2c2; border-radius: 12px; overflow: hidden;">
					<tr>
						<td style="background-color: #1f2b23; padding: 30px 36px 26px 36px;">
							<p style="margin: 0 0 12px 0; font-size: 10px; color: #8e9582; text-transform: uppercase; letter-spacing: 0.24em; font-weight: 700;">Bongabong, Oriental Mindoro &middot; Est. 2024</p>
							<p style="margin: 0; font-size: 27px; color: #e9a23c; text-transform: uppercase; letter-spacing: 0.005em; font-weight: 800; line-height: 1;">True East</p>
							<p style="margin: 6px 0 0 0; font-size: 11px; color: #b7c0a9; text-transform: uppercase; letter-spacing: 0.34em; font-weight: 700;">Energy Corp.</p>
						</td>
					</tr>
					<tr>
						<td style="height: 4px; background-color: #d98a1f; line-height: 4px; font-size: 0;">&nbsp;</td>
					</tr>
					<tr>
						<td style="padding: 30px 36px 6px 36px;">
							<p style="margin: 0; font-size: 13px; color: #586259; text-transform: uppercase; letter-spacing: 0.18em; font-weight: 700;">New solar enquiry</p>
							<p style="margin: 8px 0 0 0; font-size: 15px; color: #7e8675; line-height: 1.55;">Submitted through the website contact form.</p>
						</td>
					</tr>
					<tr>
						<td style="padding: 26px 36px 12px 36px;">
							<table role="presentation" width="100%" cellpadding="0" cellspacing="0">
${row('Name', escapeHtml(data.name))}
${row('Email', `<a href="mailto:${escapeHtml(data.email)}" style="color: #bc5e12; text-decoration: none;">${escapeHtml(data.email)}</a>`)}
${phoneRow}
								<tr>
									<td style="padding: 0 0 22px 0;">
										<p style="margin: 0 0 7px 0; font-size: 11px; color: #7e8675; text-transform: uppercase; letter-spacing: 0.16em; font-weight: 700;">Interested in</p>
										<span style="display: inline-block; font-size: 14px; font-weight: 600; color: #22302a; background-color: #eee8d9; border: 1px solid #dad2c2; padding: 7px 14px; border-radius: 999px;">${escapeHtml(data.kind)}</span>
									</td>
								</tr>
								<tr>
									<td style="padding: 0;">
										<p style="margin: 0 0 7px 0; font-size: 11px; color: #7e8675; text-transform: uppercase; letter-spacing: 0.16em; font-weight: 700;">Message</p>
										<div style="margin: 0; font-size: 16px; color: #22302a; line-height: 1.65; background-color: #eee8d9; padding: 18px 20px; border-radius: 8px; border: 1px solid #dad2c2;">
											${escapeHtml(data.message).replace(/\n/g, '<br />')}
										</div>
									</td>
								</tr>
							</table>
						</td>
					</tr>
					<tr>
						<td style="padding: 22px 36px 24px 36px;">
							<p style="margin: 0; font-size: 13px; color: #586259; line-height: 1.6;">
								Reply directly to this email to reach
								<strong style="color: #22302a;">${escapeHtml(data.name)}</strong> &mdash; the reply-to is set to their address.
							</p>
						</td>
					</tr>
					<tr>
						<td style="padding: 16px 36px; background-color: #eee8d9; border-top: 1px solid #dad2c2;">
							<p style="margin: 0; font-size: 12px; color: #8e9582; letter-spacing: 0.02em;">
								Sent from the True East Energy Corp. website &middot; trueeastenergy.com
							</p>
						</td>
					</tr>
				</table>
			</td>
		</tr>
	</table>
</body>
</html>`;
}

function escapeHtml(text: string): string {
	return text
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&#039;');
}
