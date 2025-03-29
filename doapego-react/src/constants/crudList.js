export const crudList = {
    'administradores': {
        titulo: 'Administradores',
        apiEndpoint: 'administradores',
        colunas: [
            { key: 'id', label: '#' },
            { key: 'nome', label: 'Nome' },
            { key: 'tipo', label: 'Tipo' }
        ],
        acoes: [
            { type: 'view', label: 'Ver', path: '/detalhes/' },
            { type: 'edit', label: 'Editar', path: '/editar/' },
            { type: 'delete', label: 'Excluir' }
        ]
    },
    'usuarios': {
        titulo: 'Usuários',
        apiEndpoint: 'usuarios',
        colunas: [
            { key: 'id', label: '#' },
            { key: 'nome', label: 'Nome' },
            { key: 'status', label: 'Status' }
        ],
        acoes: [
            { type: 'view', label: 'Ver', path: '/detalhes/' },
            { type: 'edit', label: 'Editar', path: '/editar/' },
            { type: 'disable', label: 'Desativar' }
        ]
    },
    
    'enderecos-ong': {
        titulo: 'Endereços',
        apiEndpoint: 'enderecos-ong',
        colunas: [
            { key: 'id', label: '#' },
            { key: 'logradouro', label: 'Endereço' },
            { key: 'cidade', label: 'Cidade' }
        ],
        acoes: [
            { type: 'view', label: 'Ver', path: '/detalhes/' },
            { type: 'edit', label: 'Editar', path: '/editar/' },
            { type: 'delete', label: 'Excluir' }
        ]
    }
};

// export const crudFoto = {
//     categorias: {
//         titulo: 'Categorias',
//         apiEndpoint: 'categorias-doacao',
//         colunas: [
//             { key: 'id', label: '#' },
//             { key: 'foto', label: 'Foto', temImagem: true },
//             { key: 'nome', label: 'Nome' }
//         ],
//         acoes: [
//             { type: 'view', label: 'Ver', path: '/detalhes/' },
//             { type: 'edit', label: 'Editar', path: '/editar/' },
//             { type: 'delete', label: 'Excluir' }
//         ]
//     },
//     ongs: {
//         titulo: 'ONGs',
//         apiEndpoint: 'ongs',
//         colunas: [
//             { key: 'id', label: '#' },
//             { key: 'foto', label: 'Foto', temImagem: true },
//             { key: 'nome', label: 'Nome' }
//         ],
//         acoes: [
//             { type: 'view', label: 'Ver', path: '/detalhes/' },
//             { type: 'edit', label: 'Editar', path: '/editar/' },
//             { type: 'delete', label: 'Excluir' }
//         ]
//     }
// };
