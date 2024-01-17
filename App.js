import { FlatList, SafeAreaView, StatusBar, StyleSheet } from "react-native"
import NotaEditor from "./src/components/NotaEditor"
import { useEffect, useState } from "react"
import { Nota } from "./src/components/Nota"
import { buscaNotas, criaTabela } from "./src/services/notas"

export default function App() {
  useEffect(() => {
    criaTabela()
    mostraNotas()  
  }, [])

  const [notas, setNotas] = useState([])
  const[notaSelecionada, setNotaSelecionada] = useState({})
  
  async function mostraNotas() {
    const todasNotas = await buscaNotas()
    setNotas(todasNotas)
  }

  return (
    <SafeAreaView style={estilos.container}>
      <FlatList 
        data={notas}
        renderItem={(nota) => <Nota {...nota} setNotaSelecionada={setNotaSelecionada}/>}
        keyExtractor={nota => nota.id}
      />
      <NotaEditor mostraNotas={mostraNotas} notaSelecionada={notaSelecionada} setNotaSelecionada={setNotaSelecionada}/>
      <StatusBar/>
    </SafeAreaView>
  )
}

const estilos = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "stretch",
		justifyContent: "flex-start",
	},
})

