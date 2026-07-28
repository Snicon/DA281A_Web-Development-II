/* Sixten Peterson - aq9300 */
import {ExclamationCircleIcon} from "@heroicons/react/24/outline"; // Importerar varningsikon från HeroIcons-biblioteket

/**
 * React-komponent för att visa felmeddelanden i formulär.
 *
 * @param {Object} props
 * @param {string} props.message - Meddelandet som ska visas för användaren.
 * @returns {React.JSX.Element}
 */
function ErrorMessage({message}) {
    return (
        <div className="flex space-x-4 mx-4 bg-red-50 rounded-md px-4 py-2">
            <ExclamationCircleIcon className="w-20 h-auto text-red-900"/>
            <p className="text-red-900 text-wrap">Hoppsan! {message}</p>
        </div>
    )
}

export default ErrorMessage;