import React from "react";

export const useCustomHook = (id) => {
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(false);
  const [value, setValue] = React.useState();

  React.useEffect(() => {
    fetch('https://dog.ceo/api/breeds/image/random')
      .then((res) => {
        if (res.status === 200) return res.json()
        throw new Error();
      })
      .then((data) => {
        setValue(data.message);
      }).catch((err) => {
        setError(true)
      }).finally(() => {
        setLoading(false);
      })
  }, [id]);

  return [loading, error, value];
};

const App = () => {
  const [num, setNum] = React.useState(1);
  const [loading, error, value] = useCustomHook(num);

  if (loading) { return <div>Loading...</div>; }
  if (error) { return <div>Error</div>; }
  return <div><input value={num} onChange={(e) => setNum(e.target.value)} /><img src={value} alt="dog" /></div>;
};

export default App;
