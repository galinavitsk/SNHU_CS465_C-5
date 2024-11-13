import { BASE_URL } from "./utils";


export function GetToken(){
    if (typeof window != "undefined" && window.localStorage) {
        try {
            const token: string = window.localStorage.getItem("travlr-token")??"";
            return token;
        }
        catch{
          return null;
        }
    }
    return null;
}
export const LogIn = async (email:string, password:string) => {
    try {
      const authRes = await fetch(`${BASE_URL}/login`, {
        method: "POST",
        body:JSON.stringify({ email:email, password:password }),
        headers: {
            "Content-Type": "application/json",
          },
      });
      const j=await authRes.json();
      if (!authRes.ok){
        return j.message;
      }
      window.localStorage.setItem("travlr-token", j.token);
    } catch {
      return "An error occurred on login. Please try again.";
    }
    return 200;
  };