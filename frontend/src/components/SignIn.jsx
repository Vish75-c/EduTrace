import React from 'react'
import Bottom from '../parts/Bottom';
import Top from '../parts/Top';
import { useForm } from 'react-hook-form';
const SignIn = () => {
    const { register, handleSubmit, watch, formState: { errors,isSubmitting } } = useForm({mode:"onSubmit",reValidateMode:"onSubmit"});
    const onSubmit=(data)=>{

        console.log(data);
    }
  return (
    <>
    <Top/>
    <section className='h-screen  bg-violet-100 bg-cover bg-no-repeat bg-center' style={{backgroundImage:"url(/SignUp.png)"}}>
            <div className='absolute w-130 text-gray-600 bg-violet-200 ml-235 mt-25 flex flex-col items-center p-4 rounded-lg shadow-lg'>
                <img src="/logo.png" alt="logo.alt" className='h-20 w-20'/>
                <h1 className='text-2xl font-extrabold text-blue-600'>SignIn Form</h1>

                <form  className='flex flex-col w-full items-center mt-8' onSubmit={handleSubmit(onSubmit)}>
                    
                    <input className="hover:shadow-lg transition duration-200 outline-none rounded-lg cursor-pointer p-2 py-3 bg-violet-100 w-[80%]" type="text" placeholder='Email*'
                    {...register('email',{
                        required:true,
                    })}/>
                    <div className='h-5 text-red-700 text-sm'>{errors.email&&<p className='text-xm'>*{errors.email.message}</p>}</div>
                    
                    
                    <input className="hover:shadow-lg transition duration-200 outline-none rounded-lg cursor-pointer p-2 py-3 bg-violet-100 w-[80%]" type="text" placeholder='Password*'
                    {...register("password",{
                        required:true,
                        minLength:{value:3,message:"min length is 4"}
                    })} />
                    <div className='h-5 text-red-700 text-sm'>{errors.password&&<p className='text-xm'>*{errors.password.message}</p>}</div>
                    <input className=" px-5 py-2 bg-blue-600 text-white rounded-4xl shadow hover:bg-blue-700 hover:scale-105 transition-transform duration-300" type="Submit" 
                    {...register('submit')} value={isSubmitting?"Submitting":"Submit"}/>
                </form>
            </div>
    </section>
    <Bottom/>
    </>
  )
}

export default SignIn
