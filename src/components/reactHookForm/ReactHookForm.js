import { useForm } from 'react-hook-form'


let renderCount = 0;
const ReactHookForm = () => {
    const { register,
        handleSubmit,
        // watch,
        formState: { errors }
    } = useForm();
    renderCount++;
    // console.log(watch());
    return (

        <>
            <h2>renderCount: {renderCount}</h2>
            <form onSubmit={handleSubmit((data) => {
                console.log(data);
            })}>
                <input type="text" {...register("name", {
                    required: 'this is required',
                    minLength: {
                        value: 4,
                        message: 'Min length 4 symbols'
                    }
                })} placeholder='name' />
                <p>{errors.name?.message}</p>

                <input type="number" {...register("tel", { required: 'this is required' })} placeholder='telephone' />
                <p>{errors.tel?.message}</p>
                <input type="submit" />
            </form>
        </>
    )
}

export default ReactHookForm