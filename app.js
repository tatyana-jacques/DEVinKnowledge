

const docTitulo = document.getElementById("titulo")
const docLinguagem = document.getElementById("linguagem")
const docCategoria = document.getElementById("categoria")
const docDescricao = document.getElementById("descricao")
const docVideo = document.getElementById("video")
const btnSalvar = document.getElementById("btnSalvar")
const btnLimpar = document.getElementById ("btnLimpar")
const quadroDicas = document.getElementById("quadroDicas")



let listaDicas = []
//carregarDicas()




function validarFormulario () {

//     if (docTitulo.value ===""){
//         alert("Preencha o campo título!")
//     }
//     else if (docLinguagem.value ===""){
//         alert ("Preencha o campo linguagem!")
//     }
//     else if (docCategoria.value ===""){
//         alert ("Escolha uma categoria!")
//     }
//     else if (docDescricao.value ===""){
//         alert ("Preencha o campo descrição!")
//     }
//     else if (docVideo.value !=="" && !verificarVideo()){
//     alert ("O link deve levar ao YouTube!")
//     }
       
// else {
//     atualizarFormulario()
// }
atualizarFormulario()

}
      
    function atualizarFormulario() {
    
    quadroDicas.innerHTML = ""
    
    montarFormulario()
    limparCampos()
    setTimeout(()=> alert ("Cartão salvo com sucesso!"), 600)

    //console.log(listaDicas)

}
function montarFormulario (){
    const formulario = { 
        objTitulo: docTitulo.value, 
        objLinguagem: docLinguagem.value, 
        objCategoria: docCategoria.value, 
        objDescricao: docDescricao.value,
        objVideo: docVideo.value}
    listaDicas.push(formulario)
    salvarDicas()

    listaDicas.forEach((item, index) => {
        const cartao = document.createElement("li")
        cartao.classList.add('cartao')
        
        const novoTitulo = document.createElement("h3")
        novoTitulo.innerText = listaDicas[index].objTitulo
                
        const novaLinguagem = document.createElement("p")
        novaLinguagem.innerHTML =  `<strong>Linguagem/Skill:</strong> ${listaDicas[index].objLinguagem}`
       
        const novaCategoria = document.createElement("p")
        novaCategoria.innerHTML = `<strong>Categoria: </strong>${listaDicas[index].objCategoria}`
       

        const novaDescricao = document.createElement("p")
        novaDescricao.innerHTML = listaDicas[index].objDescricao

        // const novoVideo = document.createElement("a")
        // novoVideo.innerText= "clique"
        // novoVideo.href= listaDicas[index].objVideo

        const novoVideo = document.createElement ("button")
        const btnVideo = document.createElement ("img")
        btnVideo.src = "img/youtube.png"
        btnVideo.classList.add("btnVideo")
        novoVideo.addEventListener ("click",()=>window.open(listaDicas[index].objVideo))
        
        const editar = document.createElement("button")
        editar.innerText = "Editar"
        editar.classList.add("btnEditar")

        const deletar = document.createElement("button")
        const lixeira = document.createElement ("img")
        lixeira.src = "img/trash.png"
        deletar.classList.add("btnDeletar")
        
        const destacar = document.createElement("button")
        destacar.innerText = "Destacar"
        destacar.classList.add("btnDestacar")
        
        cartao.appendChild(novoTitulo)
        cartao.appendChild(novaLinguagem)
        cartao.appendChild(novaCategoria)
        cartao.appendChild(novaDescricao)
        
        cartao.appendChild (deletar)
        deletar.appendChild (lixeira)
        cartao.appendChild(editar)
        cartao.appendChild(destacar)
        
        if(listaDicas[index].objVideo!=="")
        {
        cartao.appendChild (novoVideo)
        novoVideo.appendChild(btnVideo)
        }
        
        quadroDicas.append(cartao)
   
    }) 
   
}

function limparCampos (){
    docTitulo.value = null
    docLinguagem.value = null
    docCategoria.value = null
    docDescricao.value = null
    docVideo.value= null
}

function verificarVideo (){
    const verificar = docVideo.value.includes ("https://www.youtube.com")
    return verificar
}





// function editarFormulario(){
//     listaDicas.filter((item, index) => {
//         docTitulo.innerText = listaDicas[index].objTitulo
//        //ver lógica de limpar lista


//     })

// }


// btnSalvar.addEventListener("click", (event) =>{
// event.preventDefault()})


btnSalvar.addEventListener("click", (event) =>{event.preventDefault() 
    validarFormulario()})
btnLimpar.addEventListener ("click", limparCampos)

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


//tArea.readonly=true