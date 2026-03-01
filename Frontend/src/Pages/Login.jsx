import React from 'react'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const Login = () => {
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [loading,setLoading] = useState(false);

    const navigate=useNavigate();

    const sendData=async(e)=>{
        e.preventDefault();
        setLoading(true);

        try {
            const res=await fetch("http://localhost:8081/api/auth/login",{
                method:'POST',
                headers:{
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({email,password})
            })
            const data=await res.json();
            if(res.ok){
                localStorage.setItem("token", data.token);
                toast.success("Login successful");
                navigate("/");
                window.location.reload();
            }
            else{
                toast.error("Invalid Credentials");
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally{
            setLoading(false);
        }
        
    }
    
    return (
        <div className='flex justify-center'>
            <Card className="relative w-[400px] overflow-hidden gap-4 shadow-2xl">
                <CardHeader>
                    <CardTitle>Login</CardTitle>
                    <CardDescription>
                        Please Enter your credentials to access your account.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form>
                        <div className="grid w-full items-center gap-2">
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="email">{email}</Label>
                                <Input value={email} onChange={(e)=>setEmail(e.target.value)} id="email" type="email" placeholder="Enter your email" />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="password">{password}</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    placeholder="Enter your password"
                                    onChange={(e)=>setPassword(e.target.value)}
                                />
                            </div>
                        </div>
                    </form>
                </CardContent>
                <CardFooter className="flex justify-between">
                    <h1 className='hover:cursor-pointer hover:text-orange-400 text-blue-800 underline'>Forgot Password?</h1>
                    <Button disabled={loading} onClick={sendData}>{loading?"Logging in..":"Login"}</Button>
                </CardFooter>
            </Card>
        </div>
    )
}

export default Login