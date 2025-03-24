export const crudList = {
    categorias: {
        titulo: 'Categorias',
        apiEndpoint: 'categorias-doacao',
        colunas: [
            { key: 'id', label: '#' },
            { key: 'foto', label: 'Foto', temImagem: true },
            { key: 'nome', label: 'Nome' }
        ],
        acoes: [
            { type: 'view', label: 'Ver', path: '/detalhes/' },
            { type: 'edit', label: 'Editar', path: '/editar/' },
            { type: 'delete', label: 'Excluir' }
        ]
    },
    brinquedos: {
        titulo: 'Brinquedos',
        apiEndpoint: 'brinquedos',
        colunas: [
            { key: 'id', label: '#' },
            { key: 'imagem', label: 'Imagem', temImagem: true },
            { key: 'descricao', label: 'Descrição' }
        ],
        acoes: [
            { type: 'view', label: 'Ver', path: '/detalhes/' },
            { type: 'edit', label: 'Editar', path: '/editar/' },
            { type: 'delete', label: 'Excluir' }
        ]
    }
};
