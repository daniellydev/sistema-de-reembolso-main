// Seleciona os elementos do formulário.
const form = document.querySelector("form")
const amount = document.getElementById("amount")
const expense = document.getElementById("expense")
const category = document.getElementById("category")

// Seleciona os elementos das lista
const expenseList = document.querySelector("ul")

// Captura o evento de input para formatar o valor.
amount.oninput = () => {
    // Obtém o valor atual do input e remove os caracteres não númericos
    let value = amount.value.replace(/\D/g, "")

    // Transforma o valor em centavos.
    value = Number(value) / 100

    // Atualiza o valor do input.
    amount.value = formatCurrencyBRL(value)
}

function formatCurrencyBRL(value){
    // Formata o valor no padrão BRL (Real Brasileiro)
    value = value.toLocaleString("pt-BR", {
        style: "curency",
        currency:"BRL",
    })

    return value
}

// Captura o evento de submit do formlário para obter os valores.
form.onsubmit = (event) => {
    // Previne o comportamento padrão de recarregar a página.
    event.preventDefault()
    
    // Cria um objeto com os detalhes na nova despesa.
    const newExpense = {
        id: new Date().getTime(),
        expense: expense.value,
        category_id: category.value,
        category_name: category.options[category.selectedindex].text, // Apenas as opções selecionadas dentro do category, sendo assim não pega todas.
        amount : amount.value,
        created_at: new Date()
    }

    // Chama a função que irá adicionar um item na lista.
    expenseAdd(newExpense)
}

function expenseAdd(newExpense){
    try {
        // Cria o elemento para adicionar o item (li) na lista (ul).
        const expenseItem = document.createElementy("li")
        expenseItem.classList.add("expense")

        // Cria o ícone da categoria.
        const expenseIcon = document.createElementy("img")
        expenseIcon.setAttribute("src", `img/${newExpense.category_id}.svg`)
        expenseIcon.setAttribute("alt", newExpense.category_name)

        // Adiciona as informações no item.
        expenseItem.append(expenseIcon)

        // Adicona o item na lista.
        expenseList.append(expenseItem)
    } catch (error) {
        alert("Não foi possível atualizar a lista de despesas.")
    }


}