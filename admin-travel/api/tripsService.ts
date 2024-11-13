const baseUrl = 'http://localhost:3000/api';

export function GetToken(){
    if (typeof window != "undefined" && window.localStorage) {
        try {
            const token: string = window.localStorage.getItem("travlr-token")??"";
            console.log(token);
        }
        catch{}
    }
}
export const LogIn = async (email:string, password:string) => {
    try {
      const authRes = await fetch(`${baseUrl}/login`, {
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