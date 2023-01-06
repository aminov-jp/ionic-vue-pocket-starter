import client from "../db/pocketbase";
import { reactive, toRefs } from "vue";

const state = reactive<{ token: string; valid: boolean }>({
  token: "",
  valid: false,
});

export function authService() {
  const print = () => {
    console.log(client);
    console.log(client?.authStore);
    console.log(client?.authStore.isValid);
  };

  const applyReset =  async(token:string,password:string) =>{
    try {
      await client?.collection('users').confirmPasswordReset(token,password,password);
      return true;
    } catch (error) {
      return false;
    }
  };
  /**
   * 
   * @param email 
   * @returns 
   */
  const reset = async(email:string) =>{
    try {
      await client?.collection('users').requestPasswordReset(email);
      return true;
    } catch (error) {
      return false;
    }
  };


  const logOut = () => {
    client?.authStore.clear();
    state.valid = false;
  };

  /**
   * Verify if the user is already authenticated
   */
  const authCheck = async () => {
    try {
      await client?.collection("users").authRefresh();
    } catch (error) {
      return;
    }
    state.token = client?.authStore.token;
    state.valid = client?.authStore.isValid;
  };

  /**
   * Sign In the user
   * @param email
   * @param password
   */
  const signIn = async (email: string, password: string) => {
    const authResult = await client
      ?.collection("users")
      .authWithPassword(email, password);
    state.token = authResult.token;
    state.valid = client?.authStore.isValid;
  };
  /**
   *
   * @param email
   * @param password
   * @returns
   */
  const signup = async (email: string, password: string) => {
    const data = {
      email: email,
      emailVisibility: true,
      password: password,
      passwordConfirm: password,
    };
    let user = null;
    try {
      user = await client?.collection("users").create(data);
    } catch (error) {
      return false;
    }
    if(user){
      await client?.collection("users").requestVerification(email);
      return true;
    }
    
    return false;
  };
  /**
   *
   * @param token
   * @returns
   */
  const confirmToken = async (token: string) => {
    try {
      const response = await client
        ?.collection("users")
        .confirmVerification(token);
      if (response == true) return true;
      else return false;
    } catch (error) {
      return false;
    }
  };

  return {
    ...toRefs(state),
    confirmToken,
    signup,
    signIn,
    authCheck,
    logOut,
    reset,
    applyReset,
    print,
  };
}
