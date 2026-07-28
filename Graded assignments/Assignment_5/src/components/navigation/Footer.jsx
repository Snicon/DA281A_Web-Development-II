/* Sixten Peterson - aq9300 */
/**
 * React-komponent för en mycket enkel footer.
 * @returns {React.JSX.Element}
 */
function Footer() {
    return (
        <footer
            className="flex justify-center text-lg mt-12 bg-zinc-700/40 border border-zinc-300/20 py-6 text-zinc-300 bottom-0 w-full fixed backdrop-blur-md"
        >
            {/* Det finns tveklöst ett bättre sätt att formatera koden på men när jag körde igenom koden i en automatisk JSX formaterare så försvann kritiska mellanrum för anchor-taggarna så detta får vara godtyckligt. Tipsa mig gärna om alternativa bättre lösningar i scenarion som dessa!:) */}
            <p>
                Hemsidan är skapad av <a href="https://snicon.rip" className="hover:underline text-emerald-400 hover:text-emerald-600">Sixten Peterson</a> för kursen <a className="hover:underline text-emerald-400 hover:text-emerald-600" href="https://mau.se/sok-utbildning/kurser/da281a">DA281A</a> på <a className="hover:underline text-red-400 hover:text-red-600" href="https://mau.se/">Malmö Universitet</a>. Källkoden finns tillgänglig på <a className="hover:underline text-emerald-400 hover:text-emerald-600" href="https://github.com/Snicon/DA281A_Web-Development-II">GitHub</a>.
            </p>
        </footer>
    )
}

export default Footer;