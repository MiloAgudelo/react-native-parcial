export const BasicTypes = () => {
  const name: string = 'susana';
  const age: number = 39;
  const isActive: boolean = false;

  const powers: string[] = ['React', 'ReactNative', 'Astro'];

  return (
    <>
      <h3>Tipos Básicos</h3>
      {name} - {age} - {isActive ? 'Activo' : 'No Activo'}
      <p>{powers.join(', ')}</p>
    </>
  );
};
