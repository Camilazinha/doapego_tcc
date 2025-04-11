import deleteIcon from "../img/delete-icon.svg"
import editIcon from "../img/edit-icon.svg"
import viewIcon from "../img/view-icon.svg"

export const crudList = {
    'administradores': {
        titulo: 'ADMINISTRADORES',
        apiEndpoint: 'administradores',
        colunas: [
            { key: 'id', label: '#' },
            { key: 'nome', label: 'Nome' },
            { key: 'tipo', label: 'Tipo', selectOptions: ['MASTER', 'STAFF', 'FUNCIONARIO'] }
        ],
        acoes: [
            { type: 'view', label: 'Ver', path: 'detalhes/' },
            { type: 'edit', label: 'Editar', path: 'editar/' },
            { type: 'delete', label: 'Excluir' }
        ]
    },
    'usuarios': {
        titulo: 'USUÁRIOS',
        apiEndpoint: 'usuarios',
        colunas: [
            { key: 'id', label: '#' },
            { key: 'nome', label: 'Nome' },
            { key: 'status', label: 'Status' }
        ],
        acoes: [
            { type: 'view', label: 'Ver', path: 'detalhes/' },
            { type: 'edit', label: 'Editar', path: 'editar/' },
            { type: 'disable', label: 'Desativar' }
        ]
    },

    'enderecos-ong': {
        titulo: 'ENDEREÇOS (ONGS)',
        apiEndpoint: 'enderecos-ong',
        colunas: [
            { key: 'id', label: '#' },
            { key: 'logradouro', label: 'Endereço' },
            { key: 'cidade', label: 'Cidade' }
        ],
        acoes: [
            { type: 'view', label: 'Ver', path: 'detalhes/' },
            { type: 'edit', label: 'Editar', path: 'editar/' },
            { type: 'delete', label: 'Excluir' }
        ]
    },
    'categorias-doacao': {
        titulo: 'CATEGORIAS',
        apiEndpoint: 'categorias-doacao',
        colunas: [
            { key: 'id', label: '#' },
            { key: 'foto', label: 'Foto', temImagem: true },
            { key: 'nome', label: 'Nome' }
        ],
        acoes: [
            { type: 'view', label: 'Ver', path: 'detalhes/', classname: 'btn btn-sm btn-custom-view', icon: viewIcon },
            { type: 'edit', label: 'Editar', path: 'editar/', classname: 'btn btn-sm btn-info mx-2', icon: editIcon },
            { type: 'delete', label: 'Excluir', icon: 'deleteIcon', icon: deleteIcon}
        ]
    },
    'ongs': {
        titulo: 'ONGS',
        apiEndpoint: 'ongs',
        colunas: [
            { key: 'id', label: '#' },
            { key: 'foto', label: 'Foto', temImagem: true },
            { key: 'nome', label: 'Nome' }
        ],
        acoes: [
            { type: 'view', label: 'Ver', path: 'detalhes/' },
            { type: 'edit', label: 'Editar', path: 'editar/' },
            { type: 'delete', label: 'Excluir' }
        ]
    }
};
