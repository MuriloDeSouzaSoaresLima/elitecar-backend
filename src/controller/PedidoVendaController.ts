import { Request, Response } from "express";
import { PedidoVenda } from "../model/PedidoVenda";

interface PedidoVendaDTO {
    dataPedido: Date,
    valorPedido: number,
    id_cliente: number,
    id_carro: number
}

/**
 * A classe `CarroController` estende a classe `Pedidos` e é responsável por controlar as requisições relacionadas aos pedidos.
 * 
 * - Esta classe atua como um controlador dentro de uma API REST, gerenciando as operações relacionadas ao recurso "pedidos".
 * - Herdando de `Pedidos`, ela pode acessar métodos e propriedades da classe base.
 */
export class PedidoVendaController extends PedidoVenda {

    /**
    * Lista todos os pedidos.
    * @param req Objeto de requisição HTTP.
    * @param res Objeto de resposta HTTP.
    * @returns Lista de pedidos em formato JSON com status 200 em caso de sucesso.
    * @throws Retorna um status 400 com uma mensagem de erro caso ocorra uma falha ao acessar a listagem de pedidos.
    */
    static async todos(req: Request, res: Response): Promise<Response> {
        try {
            // acessa a função de listar os pedidos e armazena o resultado
            const listaDePedidos = await PedidoVenda.listagemPedidos();

            // retorna a lista de pedidos há quem fez a requisição web
            return res.status(200).json(listaDePedidos);
        } catch (error) {
            // lança uma mensagem de erro no console
            console.log('Erro ao acessar listagem de pedidos');

            // retorna uma mensagem de erro há quem chamou a mensagem
            return res.status(400).json({ mensagem: "Não foi possível acessar a listagem de pedidos" });
        }
    }

    /**
    * Método controller para cadastrar um novo pedidos.
    * 
    * Esta função recebe uma requisição HTTP contendo os dados de um pedidos no corpo da requisição
    * e tenta cadastrar este pedidos no banco de dados utilizando a função `cadastroCliente`. Caso o cadastro 
    * seja bem-sucedido, retorna uma resposta HTTP 200 com uma mensagem de sucesso. Caso contrário, retorna
    * uma resposta HTTP 400 com uma mensagem de erro.
    * 
    * @param {Request} req - Objeto de requisição HTTP, contendo o corpo com os dados do pedidos no formato `CarroDTO`.
    * @param {Response} res - Objeto de resposta HTTP usado para retornar o status e a mensagem ao pedidos.
    * @returns {Promise<Response>} - Retorna uma resposta HTTP com o status 200 em caso de sucesso, ou 400 em caso de erro.
    * 
    * @throws {Error} - Se ocorrer um erro durante o processo de cadastro, uma mensagem é exibida no console e uma 
    *                   resposta HTTP 400 com uma mensagem de erro é enviada ao pedidos.
    */
    static async novo(req: Request, res: Response): Promise<Response> {
        try {
            // recuperando informações do corpo da requisição e colocando em um objeto da interface CarroDTO
            const pedidoRecebido: PedidoVendaDTO = req.body;

            // instanciando um objeto do tipo pedidos com as informações recebidas
            const novoPedido = new PedidoVenda(
                                        pedidoRecebido.id_carro,
                                        pedidoRecebido.id_cliente,
                                        pedidoRecebido.dataPedido, 
                                        pedidoRecebido.valorPedido);

            // Chama a função de cadastro passando o objeto como parâmetro
            const repostaClasse = await PedidoVenda.cadastroPedido(novoPedido);

            // verifica a resposta da função
            if(repostaClasse) {
                // retornar uma mensagem de sucesso
                return res.status(200).json({ mensagem: "Pedidos cadastrado com sucesso!" });
            } else {
                // retorno uma mensagem de erro
                return res.status(400).json({ mensagem: "Erro ao cadastra o pedidos. Entre em contato com o administrador do sistema."})
            } 
        } catch (error) {
            // lança uma mensagem de erro no console
            console.log(`Erro ao cadastrar um pedidos. ${error}`);

            // retorna uma mensagem de erro há quem chamou a mensagem
            return res.status(400).json({ mensagem: "Não foi possível cadastrar o pedidos. Entre em contato com o administrador do sistema." });
        }
    }
}