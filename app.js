const docTitulo = document.getElementById("titulo")
const docLinguagem = document.getElementById("linguagem")
const docCategoria = document.getElementById("categoria")
const docDescricao = document.getElementById("descricao")
const docVideo = document.getElementById("video")
const btnSalvar = document.getElementById("btnSalvar")
const btnLimpar = document.getElementById("btnLimpar")
const quadroDicas = document.getElementById("quadroDicas")
const ulNumeros = document.getElementById("numeros")
const btnBuscar = document.getElementById("lupa")
const btnLimparBusca = document.getElementById("fechar")

let listaDicas = []

carregarDicas()


function validarFormulario() {

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
    setTimeout(() => alert("Cartão salvo com sucesso!"), 600)
}


function atualizarFormulario() {

    const linha = {
        objTitulo: docTitulo.value,
        objLinguagem: docLinguagem.value,
        objCategoria: docCategoria.value,
        objDescricao: docDescricao.value,
        objVideo: docVideo.value
    }

    listaDicas.push(linha)

    montarLista()
    limparCampos()
}


function montarLista() {

    quadroDicas.innerHTML = " "

    listaDicas.forEach((item, index) => {
        const cartao = document.createElement("li")
        cartao.classList.add('cartao')

        const novoTitulo = document.createElement("h3")
        novoTitulo.innerText = listaDicas[index].objTitulo

        const novaLinguagem = document.createElement("p")
        novaLinguagem.innerHTML = `<strong>Linguagem/Skill:</strong> ${listaDicas[index].objLinguagem}`

        const novaCategoria = document.createElement("p")
        novaCategoria.innerHTML = `<strong>Categoria: </strong>${listaDicas[index].objCategoria}`

        const novaDescricao = document.createElement("p")
        novaDescricao.innerHTML = listaDicas[index].objDescricao

        const novoVideo = document.createElement("button")
        const btnVideo = document.createElement("img")
        btnVideo.src = "img/youtube.png"
        btnVideo.classList.add("btnVideo")
        novoVideo.addEventListener("click", () => window.open(listaDicas[index].objVideo))

        const editar = document.createElement("button")
        editar.innerText = "Editar"
        editar.classList.add("btnEditar")
        editar.addEventListener("click", (() => editarCartao(index)))

        const deletar = document.createElement("button")
        const lixeira = document.createElement("img")
        lixeira.src = "img/trash.png"
        deletar.classList.add("btnDeletar")
        deletar.addEventListener("click", (() => {
            removerCartao(index)
        }))

        const destacar = document.createElement("button")
        destacar.innerText = "Destacar"
        destacar.classList.add("btnDestacar")

        cartao.appendChild(novoTitulo)
        cartao.appendChild(novaLinguagem)
        cartao.appendChild(novaCategoria)
        cartao.appendChild(novaDescricao)

        cartao.appendChild(deletar)
        deletar.appendChild(lixeira)
        cartao.appendChild(editar)
        cartao.appendChild(destacar)

        if (listaDicas[index].objVideo !== "") {
            cartao.appendChild(novoVideo)
            novoVideo.appendChild(btnVideo)
        }

        quadroDicas.append(cartao)
    })

    estatisticas()
    salvarDicas()
}

function estatisticas() {

    ulNumeros.innerHTML = " "
    let totalEstatisticas = 0
    let totalFrontEnd = 0
    let totalBackEnd = 0
    let totalFullStack=0
    let totalSoftSkills = 0

    const totalLinha = document.createElement("li")
    const totalTitulo = document.createElement("h3")
    totalTitulo.innerHTML = "Total"
    const total = document.createElement("p")

    const frontEndLinha = document.createElement("li")
    const frontEndTitulo = document.createElement("h3")
    frontEndTitulo.innerHTML = "FrontEnd"
    const frontEnd = document.createElement("p")

    const backEndLinha = document.createElement("li")
    const backEndTitulo = document.createElement("h3")
    backEndTitulo.innerHTML = "BackEnd"
    const backEnd = document.createElement("p")

    const fullStackLinha = document.createElement("li")
    const fullStackTitulo = document.createElement("h3")
    fullStackTitulo.innerHTML = "FullStack"
    const fullStack = document.createElement("p")

    const softSkillsLinha = document.createElement("li")
    const softSkillsTitulo = document.createElement("h3")
    softSkillsTitulo.innerHTML = "SoftSkills"
    const softSkills = document.createElement("p")


    listaDicas.forEach((item, index) => {
        totalEstatisticas++

        if (listaDicas[index].objCategoria === "FrontEnd") {
            totalFrontEnd++
        }

        else if (listaDicas[index].objCategoria === "BackEnd") {
            totalBackEnd++
        }

        else if (listaDicas[index].objCategoria==="FullStack")
        {
            totalFullStack++
        }

        else 
        {
            totalSoftSkills ++
        }
    })


    if (totalEstatisticas !== 0) {
        total.innerHTML = totalEstatisticas
        ulNumeros.appendChild(totalLinha)
        totalLinha.appendChild(totalTitulo)
        totalLinha.appendChild(total)
    }

    if (totalFrontEnd !== 0) {
        frontEnd.innerHTML = totalFrontEnd
        ulNumeros.appendChild(frontEndLinha)
        frontEndLinha.appendChild(frontEndTitulo)
        frontEndLinha.appendChild(frontEnd)
    }

    if (totalBackEnd !== 0) {
        backEnd.innerHTML = totalBackEnd
        ulNumeros.appendChild(backEndLinha)
        backEndLinha.appendChild(backEndTitulo)
        backEndLinha.appendChild(backEnd)
    }

    if (totalFullStack !== 0) {
        fullStack.innerHTML = totalFullStack
        ulNumeros.appendChild(fullStackLinha)
        fullStackLinha.appendChild(fullStackTitulo)
        fullStackLinha.appendChild(fullStack)
    }

    if (totalSoftSkills !== 0) {
        softSkills.innerHTML = totalSoftSkills
        ulNumeros.appendChild(softSkillsLinha)
        softSkillsLinha.appendChild(softSkillsTitulo)
        softSkillsLinha.appendChild(softSkills)
    }



    

}


function removerCartao(indice) {
    const response = confirm("Você tem certeza que deseja deletar essa dica?")

    
    if (response)
    {
    const novaLista = listaDicas.filter((i, index) => index !== indice)
    listaDicas = novaLista
    salvarDicas()
    montarLista()
    }

}


function limparCampos() {
    docTitulo.value = null
    docLinguagem.value = null
    docCategoria.value = null
    docDescricao.value = null
    docVideo.value = null
}

function verificarVideo() {
    const verificar = docVideo.value.includes("https://www.youtube.com")
    return verificar
}


function editarCartao(indice) {
    const cartaoEditar = listaDicas.find((index) => index === indice)
    
    document.getElementById("titulo").value = listaDicas[indice].objTitulo
    console.log("editou")

    const novaLista = listaDicas.filter((i, index) => index !== indice)
    listaDicas = novaLista
    salvarDicas()
    montarLista()

    
        //     //listaDicas[index].objTitulo

        // function atualizarTela(){
        //     quadroDicas.innerHTML = ""
        //     listaDicas.filter ((item) => listaDicas.objTitulo)
        //     .toLocaleLowerCase()
        //     .includes()


        //}

    }
   



function salvarDicas() {
    const listaDicasJSON = JSON.stringify(listaDicas)
    localStorage.setItem("listaDicas", listaDicasJSON)
}

function carregarDicas() {
    const listaSalvaJSON = localStorage.getItem("listaDicas")

    if (listaSalvaJSON !== null) {
        listaDicas = JSON.parse(listaSalvaJSON)
        montarLista()
    }
}

btnSalvar.addEventListener("click", (event) => {
    event.preventDefault()
    validarFormulario()
})
btnLimpar.addEventListener("click", limparCampos)
//btnLimpar.addEventListener ("click", estatisticas)
