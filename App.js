import { FlatList, SafeAreaView, StatusBar, StyleSheet, Text, View } from "react-native"
import NotaEditor from "./src/components/NotaEditor"
import { useEffect, useState } from "react"
import { Nota } from "./src/components/Nota"
import { buscaNotas, criaTabela } from "./src/services/notas"
import LottieView from 'lottie-react-native'


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
      {notas.length == 0 ?
      <View style={{alignItems: "center", justifyContent: 'center', flex: 1, marginBottom: '30%'}}>
        <LottieView 
        source={require('./assets/astronaut.json')} 
        style={{
          width: '80%',
          aspectRatio: 1,
        }} 
        loop
        autoPlay
        />
        <Text>Sem nada por aqui</Text>
      </View>
      :
      <FlatList 
        data={notas}
        renderItem={(nota) => <Nota {...nota} setNotaSelecionada={setNotaSelecionada}/>}
        keyExtractor={nota => nota.id}
        style={{paddingTop: 10}}
      />
      }
      <NotaEditor mostraNotas={mostraNotas} 
        notaSelecionada={notaSelecionada} 
        setNotaSelecionada={setNotaSelecionada}/>
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

