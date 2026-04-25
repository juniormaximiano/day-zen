import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { createUserWithEmailAndPassword } from "firebase/auth"
import { auth, db } from "../../services/firebase"
import { doc, setDoc } from "firebase/firestore"
import "./Cadastro.css"

function Cadastro() {

    const [nome, setNome] = useState("")
    const [email, setEmail] = useState("")
    const [sobrenome, setSobrenome] = useState("")
    const [senha, setSenha] = useState("")
    const [data, setData] = useState("")

    const navigate = useNavigate()

    async function submitForm(e) {
        e.preventDefault()

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, senha)

            const uid = userCredential.user.uid

            await setDoc(doc(db, "usuarios", uid), {
                uid: uid,
                nome: nome,
                sobrenome: sobrenome,
                dataNascimento: data,
                email: email
            })

            console.log("Usuário cadastrado com sucesso!")
            navigate("/")

        } catch (error) {
            console.log("Erro ao cadastrar:", error.message)
        }
    }

    return (

        <form className="cadastro-form" onSubmit={submitForm}>

            <h1>DayZen</h1>
            <h2>Crie sua conta</h2>

            <label htmlFor="inputNome">Nome</label>
            <input value={nome} onChange={(e) => setNome(e.target.value)} type="text" id="inputNome" />

            <label htmlFor="inputSobrenome">Sobrenome</label>
            <input value={sobrenome} onChange={(e) => setSobrenome(e.target.value)} type="text" id="inputSobrenome" />

            <label htmlFor="inputData">Data De Nascimento</label>
            <input value={data} onChange={(e) => setData(e.target.value)} type="date" id="inputData" />

            <label htmlFor="inputEmail">Email</label>
            <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" id="inputEmail" />

            <label htmlFor="inputSenha">Senha</label>
            <input value={senha} onChange={(e) => setSenha(e.target.value)} type="password" id="inputSenha" />

            <button type="submit">Cadastre-se</button>

            <p onClick={() => navigate("/")}>
                Já tem conta? entrar
            </p>

        </form>
    )
}

export default Cadastro