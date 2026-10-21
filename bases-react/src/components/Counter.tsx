import { useCounter } from '../hooks/useCounter';

export const Counter = () => {
  const { count, increaseBy } = useCounter();

  return (
    <>
      <h3 className="text-2xl">
        Contador: <small className="font-bold">{count}</small>
      </h3>

      <div>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
          onClick={() => increaseBy(1)}
        >
          +1
        </button>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
          onClick={() => increaseBy(-1)}
        >
          -1
        </button>
      </div>
    </>
  );
};
