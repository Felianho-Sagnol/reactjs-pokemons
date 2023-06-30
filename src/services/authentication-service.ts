import { resolve } from "path"

export default class AuthenticationService {
    static isAuthenticated: boolean = false

    static login = (username: string, password: string) => {
        const isAuth: boolean = username === "pikachu" && password === "pikachu"
        return new Promise(resolve => {
            setTimeout(() => {
                this.isAuthenticated = isAuth
                resolve(isAuth)
            },1000)
        })
    }
}

