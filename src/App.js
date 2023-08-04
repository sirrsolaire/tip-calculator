import { useReducer } from "react";

const initialState = {
  bill: 0,
  percentage: 0,
  percentageFriend: 0,
};

function reducer(state, action) {
  switch (action.type) {
    case "bill":
      return { ...state, bill: action.payload };
    case "setUser":
      return { ...state, percentage: action.payload };
    case "setFriend":
      return { ...state, percentageFriend: action.payload };
    case "reset":
      return initialState;
    default:
      throw new Error("Unknown error");
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { bill, percentage, percentageFriend } = state;

  const tip = bill * ((percentage + percentageFriend).toFixed(2) / 2);

  function setBill(e) {
    dispatch({ type: "bill", payload: Number(e.target.value) });
  }

  function setPercentage(e) {
    dispatch({ type: "setUser", payload: Number(e.target.value) });
  }
  function setPercentageFriend(e) {
    dispatch({ type: "setFriend", payload: Number(e.target.value) });
  }

  function resetAll() {
    dispatch({ type: "reset" });
  }

  return (
    <div
      style={{
        marginLeft: 20,
        marginTop: 20,
        display: "flex",
        flexDirection: "column",
        gap: 5,
      }}
    >
      <Bill onSetBill={setBill} onBill={bill} />
      <Percentage onSetPercentage={setPercentage} setPercentage={percentage}>
        <p>How did you like the service</p>
      </Percentage>
      <Percentage
        onSetPercentage={setPercentageFriend}
        setPercentage={percentageFriend}
      >
        <p>How did your friend like the service</p>
      </Percentage>
      {bill > 0 && (
        <>
          <Message onBill={bill} tip={tip} />
          <Reset onReset={resetAll} onBill={bill} />
        </>
      )}
    </div>
  );
}

function Bill({ onSetBill, onBill }) {
  return (
    <div className="bill">
      <p>How much was the bill?</p>
      <input
        placeholder="Bill value"
        type="text"
        value={onBill}
        onChange={onSetBill}
        style={{ height: 20, width: 200 }}
      />
    </div>
  );
}

function Percentage({ children, onSetPercentage, setPercentage }) {
  return (
    <div className="bill">
      {children}
      <select value={setPercentage} onChange={onSetPercentage}>
        <option value={0}>Dissatisfied (0%)</option>
        <option value={0.05}>It was okay (5%)</option>
        <option value={0.1}>It was good (10%)</option>
        <option value={0.2}>Absolutely amazing! (20%)</option>
      </select>
    </div>
  );
}

function Message({ onBill, tip }) {
  return (
    <h3>
      You pay ${onBill + tip} (${onBill} + ${tip} tip)
    </h3>
  );
}

function Reset({ onReset, onBill }) {
  return (
    <button style={{ width: 100, height: 30, marginTop: 30 }} onClick={onReset}>
      Reset
    </button>
  );
}

export default App;
