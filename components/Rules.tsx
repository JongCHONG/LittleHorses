const Rules = () => {
  return (
    <div className="max-w-lg rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-4 text-center">
        Déroulement d’une partie
      </h2>
      <section className="mb-6">
        <h3 className="text-lg font-semibold mb-2 text-blue-700">
          Mise en jeu des pions
        </h3>
        <ul className="list-disc list-inside space-y-1">
          <li>
            Pour sortir un pion de l’écurie et le placer sur la première case de
            parcours, il faut faire un <strong>6</strong> au dé.
          </li>
          <li>
            Si on fait un 6, on peut ressortir un pion <strong>et</strong>{" "}
            relancer le dé.
          </li>
          <li>Tant que le joueur a encore des 6, il peut continuer à jouer.</li>
        </ul>
      </section>
      <section className="mb-6">
        <h3 className="text-lg font-semibold mb-2 text-green-700">
          Déplacements classiques
        </h3>
        <ul className="list-disc list-inside space-y-1">
          <li>
            À chaque tour, le joueur lance le dé et avance un de ses pions du
            nombre de cases indiqué.
          </li>
          <li>
            Les pions avancent dans le sens indiqué par le parcours de couleur :
            chaque joueur a sa case de départ et suit le tracé extérieur commun
            à tous (dans le sens horaire ou anti-horaire selon les règles
            locales).
          </li>
        </ul>
      </section>
      <section className="mb-6">
        <h3 className="text-lg font-semibold mb-2 text-red-700">
          Manger un pion adverse
        </h3>
        <ul className="list-disc list-inside space-y-1">
          <li>
            Si un pion termine sur la même case qu’un autre (hors cases
            d'arrivée ou d’écurie), le pion déjà présent est « mangé » et
            retourne à son écurie d’origine : il devra refaire un 6 pour sortir.
          </li>
        </ul>
      </section>
      <section className="mb-6">
        <h3 className="text-lg font-semibold mb-2 text-yellow-700">
          Rampe d’arrivée
        </h3>
        <ul className="list-disc list-inside space-y-1">
          <li>
            Quand un pion a fait tout le tour, il bifurque sur sa « rampe
            d’arrivée » (le chemin coloré qui pointe vers le centre). Là, il
            avance case par case grâce aux lancers de dés.
          </li>
          <li>
            Pour aller sur la dernière case d’arrivée, il faut obtenir
            exactement le nombre de points restants au dé : trop, le pion ne
            bouge pas.
          </li>
        </ul>
      </section>
      <section>
        <h3 className="text-lg font-semibold mb-2 text-purple-700">
          Gagner la partie
        </h3>
        <ul className="list-disc list-inside space-y-1">
          <li>
            Le vainqueur est le premier à amener tous ses pions sur la case
            centrale d’arrivée de sa couleur.
          </li>
        </ul>
      </section>
    </div>
  );
};

export default Rules;
