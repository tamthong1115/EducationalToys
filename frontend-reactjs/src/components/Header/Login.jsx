// src/components/Header/Login.jsx
import PropTypes from 'prop-types'
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {useLocation, useNavigate} from "react-router-dom";
import {useForm} from "react-hook-form";
import {login} from '../../API/AuthAPI.js'
import {toast} from "react-hot-toast";


const Login = ({
                   handleLogin,
                   handleForgotPassword,
                   handleHaveNotAccount,
               }) => {

    const navigate = useNavigate();
    const location = useLocation();
    const queryClient = useQueryClient();

    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm({
        mode: 'onBlur',
    });

    const mutation = useMutation({
        mutationFn: login,
        onSuccess: async (data) => {
            localStorage.setItem('token', data.token);
            // Refetch or invalidate the query to re-validate the token
            await queryClient.invalidateQueries({queryKey: ['validateToken']});
            await queryClient.invalidateQueries({queryKey: ['roles']});
            handleLogin()
            toast.success('Login successfully');

            console.log(`data: ${JSON.stringify(data)}`);
            if (data.admin) {
                await navigate('/dashboard')
            } else {
                navigate(location?.state?.from?.pathname || '/');
            }
        },
        onError: (error) => {
            toast.error(error.message || 'Login failed');
        },
    });

    const onSubmit = handleSubmit(async (data) => {
        try {
            await mutation.mutateAsync(data);
        } catch (error) {
            console.error('Login failed', error);
        }
    });

    return (
        <>
            <div
                className="fixed z-9998 w-[100%] h-[100%] bg-black opacity-[0.4] top-0 left-0"
                onClick={handleLogin}
            ></div>
            <div className="flex justify-center items-center relative z-9999">
                <form onSubmit={onSubmit}
                      className="bg-[#FFFFFF] rounded-[6px] border-[1px] border-solid border-[#ddd] w-[550px] h-auto fixed p-[40px] top-[150px]">
                    <h2 className="mb-[20px] text-[36px] font-[700]">Login</h2>
                    <div>
                        <label className="flex-1 text-sm font-bold text-gray-700">
                            {errors.email && <span className="text-red-600">{errors.email.message}</span>}
                            <input
                                type="email"
                                name="email"
                                placeholder="Enter your email..."
                                className="h-[60px] py-[10px] px-[20px] outline-none w-[100%] bg-[#F5F5F5] mb-[20px] rounded-[10px]"
                                {...register('email', {required: 'Email is required'})}
                            />
                        </label>

                    </div>
                    <div className="">
                        <label className="flex-1 text-sm font-bold text-gray-700">
                            {errors.password && <span className="text-red-600">{errors.password.message}</span>}
                            <input
                                type="password"
                                name="password"
                                placeholder="Enter your password"
                                className="h-[60px] py-[10px] px-[20px] outline-none w-[100%] bg-[#F5F5F5] mb-[20px] rounded-[10px]"
                                {...register('password', {required: 'Password is required'})}
                            />
                        </label>
                    </div>
                    <button
                        className="h-[60px] bg-[#818CF8] text-[white] font-[500] w-[100%] rounded-[10px] hover:bg-[#231F40]"
                        type={'submit'}
                    >
                        Login
                    </button>
                    <a
                        className="absolute hover:bg-[#231F40] top-[-15px] right-[-18px] text-[16px] bg-[#818CF8] text-white h-[38px] w-[38px] flex items-center justify-center rounded-full font-[700] cursor-pointer"
                        onClick={handleLogin}
                    >
                        X
                    </a>
                    <div className="flex justify-between items-center cursor-pointer mt-[10px]">
                        <span
                            className="hover:italic hover:underline"
                            onClick={handleForgotPassword}
                        >
                            You forgot password?
                        </span>
                        <span
                            className="hover:italic hover:underline"
                            onClick={handleHaveNotAccount}
                        >
                            You have not account?
                        </span>
                    </div>
                </form>
            </div>
        </>
    )
}
Login.propTypes = {
    handleLogin: PropTypes.func.isRequired,
    handleForgotPassword: PropTypes.func.isRequired,
    handleHaveNotAccount: PropTypes.func.isRequired,
}

export default Login
