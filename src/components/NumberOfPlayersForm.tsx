type NumberOfPlayersFormProps = {
  numPlayers: number;
  setNumPlayers: (num: number) => void;
  setShowNumPlayersForm: (show: boolean) => void;
};

const NumberOfPlayersForm = ({
  numPlayers,
  setNumPlayers,
  setShowNumPlayersForm
}: NumberOfPlayersFormProps) => {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (numPlayers && numPlayers > 0) setNumPlayers(numPlayers);
        setShowNumPlayersForm(false);
      }}
    >
      <label className="block mb-2">
        Choisissez le nombre de joueurs :
        <input
          type="number"
          min={1}
          max={4}
          value={numPlayers ?? ""}
          onChange={(e) => setNumPlayers(Number(e.target.value))}
          className="ml-2 border rounded px-2 py-1"
          required
        />
      </label>
      <button
        type="submit"
        className="bg-indigo-600 text-white px-4 py-2 rounded"
      >
        Valider
      </button>
    </form>
  );
};

export default NumberOfPlayersForm;
