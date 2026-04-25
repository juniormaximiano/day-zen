import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../services/firebase"
import "./Login.css"

function Login() {

    const navigate = useNavigate()

    const [senha, setSenha] = useState("")
    const [email, setEmail] = useState("")

    async function submitLogin(e) {
        e.preventDefault()

        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, senha)

            console.log("Login realizado:", userCredential.user)
            navigate("/home")

        } catch (error) {
            console.log("Erro ao fazer login:", error.message)
            alert("Usuário não cadastrado ou dados incorretos.")
        }
    }

    return (
        <form className="login-form" onSubmit={submitLogin}>
            <h1>DayZen</h1>
            <h2>Entre na sua conta</h2>

            <label htmlFor="inputEmail">Email</label>
            <input id="inputEmail" onChange={(e) => setEmail(e.target.value)} value={email} type="email" />

            <label htmlFor="inputSenha">Senha</label>
            <input id="inputSenha" onChange={(e) => setSenha(e.target.value)} value={senha} type="password" />

            <button id="btnLogin" type="submit">Login</button>

            <p onClick={() => navigate("/cadastro")}>Não tem conta? cadastre-se</p>

        </form>
    )
}

export default Login