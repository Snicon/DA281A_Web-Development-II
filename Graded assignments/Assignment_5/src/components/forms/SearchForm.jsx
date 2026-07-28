/* Sixten Peterson - aq9300 */
/**
 * Reactkomponent bestående av ett sökformulär för att söka efter ord i ordboken.
 *
 * @param {Object} props
 * @param {string} term - Sökordet
 * @param {function} setTerm - Sätter sökordet
 * @returns {React.JSX.Element}
 */
function SearchForm({term, setTerm}) {
    /**
     * Hanterar förändring av sökord (sätter state när värdet i inputen ändras)
     * @param e - Händelsen/eventet från inputen (fältet?)
     */
    const handleChange = (e) => {
        setTerm(e.target.value);
    }

    return (
        <div>
            <form className="flex flex-row text-lg mx-auto mt-24 mb-2 space-x-4">
                <input
                    name="search"
                    id="search"
                    type="text"
                    value={term}
                    onChange={handleChange}
                    className="text-zinc-200 placeholder-zinc-400 border-2 border-zinc-700/40 rounded-full px-4 py-2 w-full"
                    placeholder="Sök efter ett ord..."
                    aria-label="Sök efter ett ord"
                /> {/* aria-label ökar tillgängligheten då jag valt att inte använda en label för detta fält. */}
            </form>
        </div>
    )
}

export default SearchForm