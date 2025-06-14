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
import { useAppDispatch } from "@/hooks";
import { useNavigate } from "react-router-dom";
import { type SignUpData } from "@/config/types";
import { Registeruser } from "@/store/auth";
import { toast } from "sonner";
// import { Signup } from "@/store/auth"; // Uncomment if using redux

const SignUp = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [formData, setFormData] = useState<SignUpData>({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      dispatch(Registeruser(formData)).then((data : any) => {
                   if(data?.payload?.sucess){
                       navigate('/login')
                       toast("Register sucessfully...")
                   }
    });
    } catch (error) {
      console.error("Signup failed", error);
    }
  };

  return (
    <div className="flex h-screen justify-center items-center">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Sign up to your account</CardTitle>
          <CardDescription>
            Enter your email below to create your account
          </CardDescription>
          <CardAction>
            <Button
              variant="link"
              className="cursor-pointer"
              onClick={() => navigate("/login")}
            >
              Sign in
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSignUp}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter your name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
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
                  placeholder="Enter password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
            </div>
            <CardFooter className="flex-col gap-2 mt-6 p-0">
              <Button type="submit" className="w-full">
                Sign up
              </Button>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignUp;
