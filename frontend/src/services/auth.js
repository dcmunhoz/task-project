const methods = {

    authenticate(token){

        sessionStorage.setItem("token", token);

    },

    isAuthenticates(){

        let token = sessionStorage.getItem("token");

        if(token){
            return true;
        }

        return false;

    },

    getToken(){
        return sessionStorage.getItem("token");
    }

}

export default methods;