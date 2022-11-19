const docTitulo = document.getElementById("titulo")
const docLinguagem = document.getElementById("linguagem")
const docCategoria = document.getElementById("categoria")
const docDescricao = document.getElementById("descricao")
const docVideo = document.getElementById("video")
const btnSalvar = document.getElementById("btnSalvar")
const btnLimpar = document.getElementById("btnLimpar")
const quadroDicas = document.getElementById("quadroDicas")
const pesquisa = document.getElementById("pesquisar")
const btnBuscar = document.getElementById("lupa")
const btnLimparBusca = document.getElementById("fechar")
const tipoBusca = document.getElementById("tipoBusca")
const ulNumeros = document.getElementById("numeros")
let listaDicas = []
let editandoItens = false
let indiceEditado = null

carregarDicas()

function validarFormulario() {

    if (docTitulo.value === "") {
        alert("Preencha o campo título!")
    }
    else if (docLinguagem.value === "") {
        alert("Preencha o campo linguagem!")
    }
    else if (docCategoria.value === "") {
        alert("Escolha uma categoria!")
    }
    else if (docDescricao.value === "") {
        alert("Preencha o campo descrição!")
    }
    else if (docVideo.value !== "" && !docVideo.value.includes("https://www.youtube.com")) {
        alert("O link deve levar ao YouTube!")
    }

    else {
        atualizarFormulario()
    }

}

function atualizarFormulario() {
    const linha = {
        objTitulo: docTitulo.value,
        objLinguagem: docLinguagem.value,
        objCategoria: docCategoria.value,
        objDescricao: docDescricao.value,
        objVideo: docVideo.value
    }

    if (editandoItens === false) {
        listaDicas.push(linha)
        montarLista(listaDicas)
        setTimeout(() => alert("Cartão salvo com sucesso!"), 100)
    }

    else {
        salvarEditado(indiceEditado)
    }


    limparCampos()
}

function montarLista(lista) {

    quadroDicas.innerHTML = " "

    lista.forEach((item, i) => {
        const cartao = document.createElement("li")
        cartao.classList.add('cartao')

        const novoTitulo = document.createElement("h3")
        novoTitulo.innerText = item.objTitulo

        const novaLinguagem = document.createElement("p")
        novaLinguagem.innerHTML = `<strong>Linguagem/Skill:</strong> ${item.objLinguagem}`

        const novaCategoria = document.createElement("p")
        novaCategoria.innerHTML = `<strong>Categoria: </strong>${item.objCategoria}`

        const novaDescricao = document.createElement("p")
        novaDescricao.innerHTML = item.objDescricao

        const novoVideo = document.createElement("button")
        const btnVideo = document.createElement("img")
        btnVideo.src = "img/youtube.png"
        btnVideo.classList.add("btnVideo")

        const editar = document.createElement("button")
        editar.innerText = "Editar"
        editar.classList.add("btnEditar")

        const deletar = document.createElement("button")
        const lixeira = document.createElement("img")
        lixeira.src = "img/trash.png"
        deletar.classList.add("btnDeletar")

        const destacar = document.createElement("button")
        destacar.innerText = "Para o topo"
        destacar.classList.add("btnDestacar")

        cartao.appendChild(novoTitulo)
        cartao.appendChild(novaLinguagem)
        cartao.appendChild(novaCategoria)
        cartao.appendChild(novaDescricao)
        cartao.appendChild(deletar)
        deletar.appendChild(lixeira)
        cartao.appendChild(editar)
        cartao.appendChild(destacar)
        quadroDicas.append(cartao)
        if (item.objVideo !== "") {
            cartao.appendChild(novoVideo)
            novoVideo.appendChild(btnVideo)
        }

        deletar.addEventListener("click", (() => { removerCartao(item) }))
        editar.addEventListener("click", (() => { editarCartao(item, i) }))
        destacar.addEventListener("click", (() => { destaque(item) }))
        novoVideo.addEventListener("click", () => window.open(item.objVideo))
    })

    estatisticas()
    salvarDicas()
}

function estatisticas() {

    ulNumeros.innerHTML = " "
    let totalEstatisticas = 0
    let totalFrontEnd = 0
    let totalBackEnd = 0
    let totalFullStack = 0
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

    listaDicas.forEach((item) => {
        totalEstatisticas++
        switch (item.objCategoria) {
            case "FrontEnd":
                totalFrontEnd++
                break
            case "BackEnd":
                totalBackEnd++
                break
            case "FullStack":
                totalFullStack++
                break
            default:
                totalSoftSkills++
                break
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
    if (response) {
        listaDicas = listaDicas.filter((item) => item !== indice)
        salvarDicas()
        montarLista(listaDicas)
    }
}

function limparCampos() {
    docTitulo.value = null
    docLinguagem.value = null
    docCategoria.value = null
    docDescricao.value = null
    docVideo.value = null
}

function editarCartao(indice, i) {

    const resposta = confirm("Você tem certeza que deseja editar essa dica?")
    editandoItens = true

    if (resposta) {

        const itemEditar = listaDicas.find((item) => (item === indice))
        document.getElementById("titulo").value = itemEditar.objTitulo
        document.getElementById("linguagem").value = itemEditar.objLinguagem
        document.getElementById("categoria").value = itemEditar.objCategoria
        document.getElementById("descricao").value = itemEditar.objDescricao
        document.getElementById("video").value = itemEditar.objVideo
        indiceEditado = i
        return indiceEditado
    }
}

function salvarEditado(indice) {
    listaDicas[indice].objTitulo = document.getElementById("titulo").value
    listaDicas[indice].objLinguagem = document.getElementById("linguagem").value
    listaDicas[indice].objCategoria = document.getElementById("categoria").value
    listaDicas[indice].objDescricao = document.getElementById("descricao").value
    listaDicas[indice].objVideo = document.getElementById("video").value
    montarLista(listaDicas)
    setTimeout(() => alert("Cartão editado com sucesso!"), 100)
    editandoItens = false

}

function buscarDica() {

    const listaBuscaTitulo = listaDicas.filter((item) => item.objTitulo
        .toLocaleLowerCase()
        .includes(pesquisa.value.toLocaleLowerCase()))

    const listaBuscaLinguagem = listaDicas.filter((item) => item.objLinguagem
        .toLocaleLowerCase()
        .includes(pesquisa.value.toLocaleLowerCase()))

    const listaBuscaCategoria = listaDicas.filter((item) => item.objCategoria
        .toLocaleLowerCase()
        .includes(pesquisa.value.toLocaleLowerCase()))

    const listaBuscaDescricao = listaDicas.filter((item) => item.objDescricao
        .toLocaleLowerCase()
        .includes(pesquisa.value.toLocaleLowerCase()))

    const listaTodosOsCampos = [...listaBuscaTitulo, ...listaBuscaLinguagem, ...listaBuscaCategoria, ...listaBuscaDescricao]
    const listaDefault = [... new Set (listaTodosOsCampos)]

    switch (tipoBusca.value) {
        case "buscarTitulo":
            quadroDicas.innerHTML = ""
            montarLista(listaBuscaTitulo)
            break
        case "buscarLinguagem":
            quadroDicas.innerHTML = ""
            montarLista(listaBuscaLinguagem)
            break
        case "buscarCategoria":
            quadroDicas.innerHTML = ""
            montarLista(listaBuscaCategoria)
            break
        case "buscarDescricao":
            quadroDicas.innerHTML = ""
            montarLista(listaBuscaDescricao)
            break
        default:
            quadroDicas.innerHTML = ""
            montarLista(listaDefault)
            break;
    }

}

function fecharBusca() {
    quadroDicas.innerHTML = ""
    tipoBusca.value = null
    pesquisa.value = null
    montarLista(listaDicas)
}

function destaque(indice) {
    const dicaDestaque = listaDicas.filter((item) => item === indice)
    const outrasDicas = listaDicas.filter((item) => item !== indice)
    listaDicas = [...dicaDestaque, ...outrasDicas]
    montarLista(listaDicas)
}

function salvarDicas() {
    const listaDicasJSON = JSON.stringify(listaDicas)
    localStorage.setItem("listaDicas", listaDicasJSON)
}

function carregarDicas() {
    const listaSalvaJSON = localStorage.getItem("listaDicas")

    if (listaSalvaJSON !== null) {
        listaDicas = JSON.parse(listaSalvaJSON)
        montarLista(listaDicas)
    }
}

btnLimpar.addEventListener("click", limparCampos)
btnSalvar.addEventListener("click", ((event) => {
    event.preventDefault()
    validarFormulario()
}))
btnBuscar.addEventListener("click", buscarDica)
btnLimparBusca.addEventListener("click", fecharBusca)
