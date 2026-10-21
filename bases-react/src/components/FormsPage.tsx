import { useForm } from 'react-hook-form';

// Definimos qué campos tendrá el formulario.
type FormInputs = {
  email: string;
  password: string;
};

export const FormsPage = () => {
  // useForm nos ayuda a manejar el estado del formulario y la validación.
  const { register, handleSubmit } = useForm<FormInputs>({
    defaultValues: {
      email: 'susana@google.com',
      password: '123456',
    },
  });

  // Esta función se ejecuta cuando el formulario se envía correctamente.
  const onSubmit = (myForm: FormInputs) => {
    console.log(myForm);
    alert(`Formulario enviado para ${myForm.email}`);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h3>Formularios</h3>

      <div className="flex flex-col space-y-2 w-[500px]">
        <input
          type="email"
          placeholder="email"
          className="border border-gray-300 p-2 rounded-xl"
          {...register('email', { required: true })}
        />

        <input
          type="password"
          placeholder="password"
          className="border border-gray-300 p-2 rounded-xl"
          {...register('password', { required: true })}
        />

        <button type="submit" className="bg-blue-500 text-white p-2 rounded-xl">
          Ingresar
        </button>
      </div>
    </form>
  );
};
