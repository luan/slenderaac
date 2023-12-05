<script lang="ts">
	import {
		Button,
		Container,
		Head,
		Heading,
		Hr,
		Html,
		Img,
		Link,
		Preview,
		Section,
		Text,
	} from 'svelte-email';

	import { theme } from '$lib/config';

	import {
		EMAIL_BACKGROUND_COLOR,
		EMAIL_BUTTON_COLOR,
		EMAIL_BUTTON_TEXT,
	} from '$env/static/private';
	import { PUBLIC_BASE_URL, PUBLIC_TITLE } from '$env/static/public';

	const baseUrl = PUBLIC_BASE_URL;

	export let title: string;
	export let previewText: string;
	export let buttonText: string;
	export let href: string;
	export let paragraphs: string[];

	const fontFamily =
		'-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif';

	const main = {
		backgroundColor: '#ffffff',
	};

	const container = {
		margin: '0 auto',
		backgroundColor: EMAIL_BACKGROUND_COLOR,
		padding: '10px 20px',
		width: '580px',
		borderRadius: '8px',
		boxShadow: '0 0 4px rgba(0, 0, 0, 0.7)',
	};

	const heading = {
		fontFamily,
		fontSize: '32px',
		lineHeight: '1.3',
		fontWeight: '700',
		color: '#484848',
		verticalAlign: 'middle',
		height: '96px',
	};

	const paragraphStyle = {
		fontFamily,
		fontSize: '18px',
		lineHeight: '1.4',
		color: '#484848',
	};

	const button = {
		fontFamily,
		backgroundColor: EMAIL_BUTTON_COLOR,
		borderRadius: '8px',
		color: EMAIL_BUTTON_TEXT,
		fontSize: '18px',
		textDecoration: 'none',
		textAlign: 'center' as const,
		display: 'block',
		width: '100%',
	};

	const hr = {
		borderColor: '#cccccc',
		margin: '20px 0',
	};

	const footer = {
		fontFamily,
		color: '#9ca299',
		fontSize: '14px',
		marginBottom: '10px',
	};
</script>

<Html>
	<Head />
	<Preview preview={previewText} />
	<Section style={main}>
		<Container style={container}>
			<Heading style={heading}>
				<Img
					style={{ float: 'left', verticalAlign: 'middle', marginRight: '8px' }}
					src={`${baseUrl}/images/logo-${theme}.png`}
					width="96"
					height="96"
					alt={PUBLIC_TITLE} />
				{title}
			</Heading>
			{#each paragraphs as paragraph}
				<Text style={paragraphStyle}>{paragraph}</Text>
			{/each}
			<Button pY={8} style={button} href="{baseUrl}{href}">
				{buttonText}
			</Button>
			<Hr style={hr} />
			<Text style={footer}>
				{PUBLIC_TITLE} · <Link href={baseUrl}>{baseUrl}</Link>
			</Text>
		</Container>
	</Section>
</Html>
