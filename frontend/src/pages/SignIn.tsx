import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useNavigate } from "react-router-dom";

import type { LoginFormData } from "@/config/types";
import { useAppDispatch } from "@/hooks";
import { LoginUser } from "@/store/auth";
import { toast } from "sonner";

export function SignIn() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      console.log(formData);
    dispatch(LoginUser(formData)).then((data  :any)=>{
      if(data?.payload){
          toast("Login successfully..")
          sessionStorage.setItem("token" , data?.payload?.token)

      }
    })
    } catch (error) {
      console.error("Login failed", error);
      toast.error(`${error}`)
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
          <CardAction>
            <Button
              variant="link"
              className="cursor-pointer"
              onClick={() => navigate("/signup")}
            >
              Sign Up
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  required
                  placeholder="enter password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
            </div>
            <CardFooter className="flex-col gap-2 mt-6 p-0">
              <Button type="submit" className="w-full">
                Login
              </Button>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
