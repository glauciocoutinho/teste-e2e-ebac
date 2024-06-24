/// <reference types="cypress" />
import produtosPage from "../support/page_objects/produtos.page";

context('Exercicio - Testes End-to-end - Fluxo de pedido', () => {
    /*  Como cliente 
        Quero acessar a Loja EBAC 
        Para fazer um pedido de 4 produtos 
        Fazendo a escolha dos produtos
        Adicionando ao carrinho
        Preenchendo todas opções no checkout
        E validando minha compra ao final */

    beforeEach(() => {
        produtosPage.visitarUrl();
    });

    afterEach(() => {
        cy.screenshot();
    });


    it.only('Deve fazer um pedido na loja Ebac Shop de ponta a ponta', () => {
        //TODO: Coloque todo o fluxo de teste aqui, considerando as boas práticas e otimizações

        //Selecionando um Produto da Lista
        produtosPage.buscarProdutoLista('Abominable Hoodie')
        cy.get('#tab-title-description > a').should('contain', 'Descrição')

        //Buscando um produto
        let produto = 'Teton Pullover Hoodie'
        produtosPage.buscarProduto(produto);
        cy.get('.product_title').should('contain', produto)

        //Visitando a página do produto
        produtosPage.visitarProduto('Aether Gym Pant')
        cy.get('.product_title').should('contain', 'Aether Gym Pant')

        //Adicionando produtos ao carrinho
        let qtd = 4
        produtosPage.buscarProduto('Ajax Full-Zip Sweatshirt')
        produtosPage.addProdutoCarrinho('XL', "Blue", qtd)

        cy.get('.woocommerce-message').should('contain', qtd + ' × “Ajax Full-Zip Sweatshirt” foram adicionados no seu carrinho.')

        //Adicionando produto ao carrinho buscando da massa de dados
        cy.fixture('produtos').then(dados => {
            produtosPage.buscarProduto(dados[3].nomeProduto)
            produtosPage.addProdutoCarrinho(
                dados[3].tamanho,
                dados[3].cor,
                dados[3].quantidade)

            cy.get('.woocommerce-message').should('contain', dados[3].nomeProduto)

        })



    });
});

