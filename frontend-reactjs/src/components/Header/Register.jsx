// src/components/Header/Register.jsx
import PropTypes from 'prop-types'
import {useMutation} from "@tanstack/react-query";
import {useForm} from "react-hook-form";
import {register as registerAPI} from '../../API/AuthAPI.js'
import {toast} from "react-hot-toast";

const Register = ({handleRegister}) => {

    const {register, watch, handleSubmit, formState: {errors}} = useForm({
        mode: 'onBlur',
    });

    const mutation = useMutation({
        mutationFn: registerAPI,
        onSuccess: () => {
            toast.success('Confirm your email to activate your account');
            handleRegister();
        },
        onError: (error) => {
            toast.error(error.message || 'Registration failed');
        },
    });

    const onSubmit = handleSubmit(async (data) => {
        try {
            await mutation.mutateAsync(data);
        } catch (error) {
            console.error('Registration failed', error);
        }
    });

    const password = watch('password');

    return (
        <>
            <div
                className="fixed z-9998 w-[100%] h-[100%] bg-black opacity-[0.4] top-0 left-0"
                onClick={handleRegister}
            ></div>
            <div className="flex justify-center items-center relative z-9999">
                <form onSubmit={onSubmit}
                      className="bg-[#FFFFFF] rounded-[6px] border-[1px] border-solid border-[#ddd] w-[550px] h-auto fixed p-[40px] top-[150px] z-99999">
                    <h2 className="mb-[20px] text-[36px] font-[700]">
                        Register
                    </h2>
                    <div className="">
                        {errors.name && <span className="text-red-600">{errors.name.message}</span>}
                        <input
                            type="name"
                            name="name"
                            placeholder="Enter yours name...."
                            className="h-[60px] py-[10px] px-[20px] outline-none w-[100%] bg-[#F5F5F5] mb-[20px] rounded-[10px]"
                            {...register('name', {required: 'Name is required'})}
                        />
                    </div>


                    <div className="">
                        {errors.email && <span className="text-red-600">{errors.email.message}</span>}
                        <input
                            type="email"
                            name="email"
                            placeholder="Enter yours email...."
                            className="h-[60px] py-[10px] px-[20px] outline-none w-[100%] bg-[#F5F5F5] mb-[20px] rounded-[10px]"
                            {...register('email', {required: 'Email is required'})}
                        />
                    </div>
                    <div className="">
                        {errors.password && <span className="text-red-600">{errors.password.message}</span>}
                        <input
                            type="password"
                            name="password"
                            placeholder="Enter yours password"
                            className="h-[60px] py-[10px] px-[20px] outline-none w-[100%] bg-[#F5F5F5] mb-[20px] rounded-[10px]"
                            {...register('password', {required: 'Password is required'})}
                        />
                    </div>
                    <div className="">
                        {errors.confirmPassword &&
                            <span className="text-red-600">{errors.confirmPassword.message}</span>}
                        <input
                            type="password"
                            name="confirmPassword"
                            placeholder="Confirm your password"
                            className="h-[60px] py-[10px] px-[20px] outline-none w-[100%] bg-[#F5F5F5] mb-[20px] rounded-[10px]"
                            {...register('confirmPassword', {
                                required: 'Confirm Password is required',
                                validate: value => value === password || 'Passwords do not match'
                            })}
                        />
                    </div>
                    <button
                        className="h-[60px] bg-[#818CF8] text-[white] font-[500] w-[100%] rounded-[10px] hover:bg-[#231F40]"
                        type={'submit'}
                    >
                        Register
                    </button>
                    <a
                        className="absolute hover:bg-[#231F40] top-[-15px] right-[-18px] text-[16px] bg-[#818CF8] text-white h-[38px] w-[38px] flex items-center justify-center rounded-full font-[700] cursor-pointer"
                        onClick={handleRegister}
                    >
                        X
                    </a>
                </form>
            </div>
        </>
    )
}

Register.propTypes = {
    handleRegister: PropTypes.func.isRequired,
}

export default Register
