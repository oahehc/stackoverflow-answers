import React, { useState } from "react";
import "./App.css";

function CheckBox({ value, label, isChecked }) {
  return (
    <label>
      <input type="checkbox" checked={isChecked} value={value} />
      <span>{label}</span>
    </label>
  );
}

function App() {
  // list of checkbox, `value` should be the format we want to save, label is something we want to display to the users
  const list = [
    { value: "1100", label: "11:00" },
    { value: "1200", label: "12:00" },
    { value: "1300", label: "13:00" }
  ];
  // every item default is un-checked
  const [data, setData] = useState(() =>
    list.map(item => ({
      ...item,
      isChecked: false
    }))
  );

  // update the check status in the parent component
  function handleToggleCheckbox(value) {
    setData(list =>
      list.map(item => {
        if (item.value === value) {
          return {
            ...item,
            isChecked: !item.isChecked
          };
        }
        return item;
      })
    );
  }

  return (
    <div className="App">
      {data.map(({ value, label, isChecked }) => (
        <CheckBox
          key={value}
          checked={isChecked}
          value={value}
          label={label}
          onClick={() => handleToggleCheckbox(value)}
        />
      ))}
    </div>
  );
}

export default App;
