/* Sixten Peterson - aq9300 */
/**
 * React-komponent för en mycket enkel header med webbsidans namn och väldigt kort introduktion till hur användaren kan lägga till ett ord till hemsidan.
 * @returns {React.JSX.Element}
 */
function Header() {
    return (
        <header
            className="mt-32"
        >
            <h1
                className="text-4xl md:text-6xl font-bold text-center text-emerald-400"
            > {/* Huvudtitel */}
                Den enkla ordboken
            </h1>
            <p
                className="text-zinc-400 text-center mt-1 font-medium"
            > {/* Kort instruktion om hur användaren kan lägga till ett nytt ord */}
                Lägg till ett ord genom att klicka på knappen längst ner i det högra hörnet.
            </p>
        </header>
    )
}

export default Header