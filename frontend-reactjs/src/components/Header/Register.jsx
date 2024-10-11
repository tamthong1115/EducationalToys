// src/components/Header/Register.jsx
import PropTypes from 'prop-types'

const Register = ({ handleRegister, handleSubmit }) => {
    return (
        <>
            <div
                className="fixed z-9998 w-[100%] h-[100%] bg-black opacity-[0.4] top-0 left-0"
                onClick={handleRegister}
            ></div>
            <div className="flex justify-center items-center relative z-9999">
                <form className="bg-[#FFFFFF] rounded-[6px] border-[1px] border-solid border-[#ddd] w-[550px] h-auto fixed p-[40px] top-[150px] z-99999">
                    <h2 className="mb-[20px] text-[36px] font-[700]">
                        Register
                    </h2>
                    <div className="">
                        <input
                            type="email"
                            name="email"
                            placeholder="Enter yours email...."
                            className="h-[60px] py-[10px] px-[20px] outline-none w-[100%] bg-[#F5F5F5] mb-[20px] rounded-[10px]"
                        />
                    </div>
                    <div className="">
                        <input
                            type="password"
                            name="password"
                            placeholder="Enter yours password"
                            className="h-[60px] py-[10px] px-[20px] outline-none w-[100%] bg-[#F5F5F5] mb-[20px] rounded-[10px]"
                        />
                    </div>
                    <button
                        className="h-[60px] bg-[#818CF8] text-[white] font-[500] w-[100%] rounded-[10px] hover:bg-[#231F40]"
                        onClick={handleSubmit}
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
    handleSubmit: PropTypes.func.isRequired,
}

export default Register
