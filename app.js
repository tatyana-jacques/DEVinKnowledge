

const docTitulo = document.getElementById("titulo")
const docLinguagem = document.getElementById("linguagem")
const docCategoria = document.getElementById("categoria")
const docDescricao = document.getElementById("descricao")
const docVideo = document.getElementById("video")
const btnSalvar = document.getElementById("btnSalvar")
const tituloDicas = document.getElementById("tituloDicas")

const dicas = document.querySelector(".dicas")
const quadroDicas = document.getElementById("quadroDicas")



let listaDicas = []
//carregarDicas()



function atualizarFormulario() {
    quadroDicas.innerHTML = ""
    const formulario = { objTitulo: docTitulo.value, linguagem: docLinguagem.value }
    listaDicas.push(formulario)
    salvarDicas()
    
    listaDicas.forEach((item, index)=>{
        const cartao = document.createElement("div")
        cartao.classList.add('cartao')
        
        cartao.innerText = `${listaDicas[index].objTitulo}
    ${listaDicas[index].linguagem}`
        quadroDicas.append(cartao)
        
   
    })
    docTitulo.value = " "
    docLinguagem.value = " " 
    console.log(listaDicas)

}


btnSalvar.addEventListener("click", atualizarFormulario)

function salvarDicas() {
    const listaDicasJSON = JSON.stringify(listaDicas)
    localStorage.setItem("listaDicas", listaDicasJSON)
}

function carregarDicas() {
    const listaSalvaJSON = localStorage.getItem("listaDicas")

    if (listaSalvaJSON !== null) {
        listaDicas = JSON.parse(listaSalvaJSON)
        atualizarFormulario()
    }
}


