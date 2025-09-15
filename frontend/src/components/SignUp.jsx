import React, { useRef, useState } from 'react'
import Bottom from '../parts/Bottom';
import Top from '../parts/Top';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import Webcam from "react-webcam";

const SignUp = () => {
    const Navigate = useNavigate();
    const webcamRef = useRef(null);
    const [showCam, setShowCam] = useState(false);

    const { register, handleSubmit, setValue, watch, formState: { errors, isSubmitting } } =
        useForm({ mode: "onSubmit", reValidateMode: "onSubmit" });

    const onSubmit = async (data) => {
        try{
            // const res=await fetch("http://localhost:3000/SignUp",{
            //     method:"POST",
            //      headers:{
            //         "Context-Type":"application/json",
            //     },
            //     credentials:"include",
               
            //     body:JSON.stringify(data)
            // })
            const res=await fetch('http://localhost:3000/SignUp',{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials:"include",
        body: JSON.stringify(data), // data comes directly from react-hook-form

      });
            console.log(data);
            const result=await res.json();
            console.log(result); 
            if(result.success==="true"){
             Navigate('/section')
            }
        }catch(err){
            console.log(err);
        }
        
    };

    const videoConstraints = {
        facingMode: "user"
    };

    const capture = () => {
        const screenshot = webcamRef.current.getScreenshot();
        setValue("faceImage", screenshot); // save in form
        setShowCam(false); // close modal
    };

    return (
        <>
            <Top />
            <section
                className='h-screen bg-violet-100 bg-cover bg-no-repeat bg-center flex justify-end items-center'
                style={{ backgroundImage: "url(/SignUp.png)" }}
            >
                <div className='absolute w-130 text-gray-600 bg-violet-200 flex flex-col items-center m-15 p-4 rounded-lg shadow-lg'>
                    <img src="/logo.png" alt="logo.alt" className='h-20 w-20' />
                    <h1 className='text-2xl font-extrabold text-blue-600'>Registration Form</h1>
                    <h1 className='text-xs'>
                        Already have an account?
                        <Link to="/SignIn" className="text-blue-600"> SignIn here</Link>
                    </h1>

                    <form className='flex flex-col w-full items-center mt-8' onSubmit={handleSubmit(onSubmit)}>
                       
                        <input
                            className="hover:shadow-lg transition duration-200 outline-none rounded-lg cursor-pointer p-2 py-3 bg-violet-100  w-[80%] "
                            type="text"
                            placeholder='Username*'
                            {...register('username', { required: true, minLength: { value: 4, message: "Min Length is 4" } })}
                        />
                        <div className='h-5 text-red-700 text-sm'>{errors.username && <p className='text-xs'>*{errors.username.message}</p>}</div>

                    
                        <input
                            className="hover:shadow-lg transition duration-200 outline-none rounded-lg cursor-pointer p-2 py-3 bg-violet-100 w-[80%]"
                            type="text"
                            placeholder='Email*'
                            {...register('email', { required: true })}
                        />
                        <div className='h-5 text-red-700 text-sm'>{errors.email && <p className='text-xs'>*{errors.email.message}</p>}</div>

                       
                        <input
                            className="hover:shadow-lg transition duration-200 outline-none rounded-lg cursor-pointer p-2 py-3 bg-violet-100 w-[80%]"
                            type="text"
                            placeholder='College ID*'
                            {...register('collegeid', { required: true, minLength: { value: 8, message: "min length is 8" } })}
                        />
                        <div className='h-5 text-red-700 text-sm'>{errors.collegeid && <p className='text-xs'>*{errors.collegeid.message}</p>}</div>

                       
                        <input
                            className="hover:shadow-lg transition duration-200 outline-none rounded-lg cursor-pointer p-2 py-3 bg-violet-100 w-[80%]"
                            type="text"
                            placeholder='Phone Number*'
                            {...register("phonenumber", { required: true, minLength: { value: 10, message: "min length is 10" } })}
                        />
                        <div className='h-5 text-red-700 text-sm'>{errors.phonenumber && <p className='text-xs'>*{errors.phonenumber.message}</p>}</div>

                       
                        <input
                            className="hover:shadow-lg transition duration-200 outline-none rounded-lg cursor-pointer p-2 py-3 bg-violet-100 w-[80%]"
                            type="text"
                            placeholder='Password*'
                            {...register("password", { required: true, minLength: { value: 4, message: "min length is 4" } })}
                        />
                        <div className='h-5 text-red-700 text-sm'>{errors.password && <p className='text-xs'>*{errors.password.message}</p>}</div>

                        <button
                            type="button"
                            className="mb-3 px-4 py-2 w-[80%] bg-green-600 text-white rounded-lg hover:bg-green-700"
                            onClick={() => setShowCam(true)}
                        >
                            {watch("faceImage")?"Image SuccessFully Taken":"Take Photo"}
                        </button>
                        <input type="hidden" {...register("faceImage")} />

                        
                        
                        {/* Submit */}
                        <input
                            className="px-5 py-2 bg-blue-600 text-white rounded-4xl shadow hover:bg-blue-700 hover:scale-105 transition-transform duration-300"
                            type="Submit"
                            {...register('submit')}
                            value={isSubmitting ? "Submitting" : "Submit"}
                        />
                    </form>
                </div>
            </section>

            {/* Webcam Modal */}
            {showCam && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
                    <div className="bg-white p-6 rounded-xl shadow-lg text-center">
                        <Webcam
                            audio={false}
                            ref={webcamRef}
                            screenshotFormat="image/jpeg"
                            videoConstraints={videoConstraints}
                            style={{ width: "300px", height: "auto" }}
                        />
                        <div className="mt-4 flex gap-3 justify-center">
                            <button
                                type="button"
                                onClick={capture}
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                            >
                                Capture
                            </button>
                            <button
                                type="button"
                                onClick={() => setShowCam(false)}
                                className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <Bottom />
        </>
    )
}

export default SignUp
