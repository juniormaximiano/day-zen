import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { onAuthStateChanged, signOut } from "firebase/auth"
import { doc, getDoc } from "firebase/firestore"
import { auth, db } from "../../services/firebase"
import "./Home.css"

function Home() {
    const navigate = useNavigate()
    const [usuario, setUsuario] = useState(null)
    const [sugestoesDoDia, setSugestoesDoDia] = useState([])
    const [feitas, setFeitas] = useState([])

    const sugestoes = [
        "Treinar",
        "Correr 20 minutos",
        "Estudar programação",
        "Fazer um projeto pessoal",
        "Ler 10 páginas",
        "Ver um filme novo",
        "Conhecer um lugar novo",
        "Organizar o quarto",
        "Planejar a semana",
        "Revisar objetivos",
        "Praticar inglês",
        "Fazer alongamento",
        "Beber mais água",
        "Caminhar ao ar livre",
        "Ouvir um álbum novo",
        "Dormir mais cedo"
    ]

    useEffect(() => {
        const sugestoesAleatorias = [...sugestoes]
            .sort(() => Math.random() - 0.5)
            .slice(0, 4)

        setSugestoesDoDia(sugestoesAleatorias)
    }, [])

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (!user) {
                navigate("/")
                return
            }

            const docRef = doc(db, "usuarios", user.uid)
            const docSnap = await getDoc(docRef)

            if (docSnap.exists()) {
                setUsuario(docSnap.data())
            }
        })

        return () => unsubscribe()
    }, [navigate])

    function marcarComoFeita(index) {
        if (feitas.includes(index)) {
            setFeitas(feitas.filter((item) => item !== index))
        } else {
            setFeitas([...feitas, index])
        }
    }

    async function sair() {
        await signOut(auth)
        navigate("/")
    }

    if (!usuario) return <p className="loading">Carregando...</p>

    return (
        <div className="home-container">

            <section className="profile-card">
                <h1>DayZen</h1>
                <h2>Olá, {usuario.nome} 👋</h2>

                <div className="user-info">
                    <p><span>Nome</span>{usuario.nome}</p>
                    <p><span>Sobrenome</span>{usuario.sobrenome}</p>
                    <p><span>Nascimento</span>{usuario.dataNascimento}</p>
                </div>

                <button className="logout-btn" onClick={sair}>
                    Sair
                </button>
            </section>

            <section className="suggestions-area">
                <h2>Sugestões de hoje</h2>
                <p className="subtitle">Escolha pequenas ações para melhorar seu dia.</p>

                <div className="suggestions-list">
                    {sugestoesDoDia.map((sugestao, index) => (
                        <div
                            key={index}
                            className={`suggestion-card ${feitas.includes(index) ? "done" : ""}`}
                            onClick={() => marcarComoFeita(index)}
                        >
                            <span>{sugestao}</span>
                            <small>{feitas.includes(index) ? "Feito" : "Marcar como feito"}</small>
                        </div>
                    ))}
                </div>
            </section>

            <div className="progress-card">
                <div className="progress-header">
                    <span>Progresso de hoje</span>
                    <strong>{feitas.length} de {sugestoesDoDia.length}</strong>
                </div>

                <div className="progress-bar">
                    <div
                        className="progress-fill"
                        style={{ width: `${(feitas.length / sugestoesDoDia.length) * 100}%` }}
                    ></div>
                </div>

                <p>
                    {feitas.length === sugestoesDoDia.length
                        ? "Boa! Você concluiu todas as sugestões de hoje."
                        : "Marque as sugestões como feitas ao longo do dia."}
                </p>
            </div>

            <footer className="footer">
                <div className="footer-inner">
                    <span>DayZen © 2026</span>
                    <span className="dot">•</span>
                    <span>Evolua 1% por dia</span>
                </div>
            </footer>

        </div>



    )
}

export default Home