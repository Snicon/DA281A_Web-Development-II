/* Sixten Peterson - aq9300 */
/**
 * React-komponent med knappar för dialogrutor. Består av en knapp för att avbryta (handleCancel) och en knapp för att
 * spara ändringar med typ av "submit" för att skicka iväg formulär.
 *
 * @param {Object} props
 * @param {function} props.handleCancel - Funktion som anropas då avbrytknappen klickas.
 * @returns {React.JSX.Element}
 */
function DialogButtonArea({ handleCancel }) {
    return (
        <div className="flex justify-between mt-12 text-lg mx-6"> {/* Använder flexbox för layouten, sätter så att de hamnar i varsin kant av dialogen */}
            <button type="button" className="text-red-400 hover:underline hover:cursor-pointer" onClick={handleCancel}>Avbryt</button>
            <button type="submit" className="text-emerald-400 hover:underline hover:cursor-pointer">Spara</button>
        </div>
    );
}

export default DialogButtonArea;