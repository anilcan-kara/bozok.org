import { ReCaptchaProvider } from 'next-recaptcha-v3';
import PropTypes from 'prop-types';

export default async function Layout({ children }) {
    return (
        <ReCaptchaProvider reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}>
            {children}
        </ReCaptchaProvider>
    );
}

Layout.propTypes = {
    children: PropTypes.node.isRequired,
};
