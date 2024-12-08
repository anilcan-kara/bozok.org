import PropTypes from 'prop-types';

import { Input } from '../ui/input';
import { Label } from '../ui/label';

export function AuthForm({ action, children, defaultEmail = '', ...props }) {
    return (
        <form action={action} className="flex flex-col gap-4 px-4 sm:px-16" {...props}>
            <div className="flex flex-col gap-2">
                <Label htmlFor="email" className="text-zinc-600 font-normal dark:text-zinc-400">
                    E-posta Adresi
                </Label>

                <Input
                    id="email"
                    name="email"
                    className="bg-muted text-md md:text-sm"
                    type="email"
                    placeholder="kullanici@ornek.com"
                    autoComplete="email"
                    required
                    defaultValue={defaultEmail}
                />

                <Label htmlFor="password" className="text-zinc-600 font-normal dark:text-zinc-400">
                    Şifre
                </Label>

                <Input id="password" name="password" className="bg-muted text-md md:text-sm" type="password" required />
            </div>

            {children}
        </form>
    );
}

AuthForm.propTypes = {
    action: PropTypes.string.isRequired,
    children: PropTypes.node,
    defaultEmail: PropTypes.string,
};
