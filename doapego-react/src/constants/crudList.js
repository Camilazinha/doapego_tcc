import deleteIcon from "../img/delete-icon.svg"
import desativarIcon from "../img/desativar-icon.svg"

import editIcon from "../img/edit-icon.svg"
import viewIcon from "../img/view-icon.svg"

export const crudList = {
    'administradores': {
        titulo: 'ADMINISTRADORES',
        apiEndpoint: 'administradores',
        colunas: [
            { key: 'id', label: '#' },
            { key: 'nome', label: 'Nome' },
            { key: 'email', label: 'E-mail' },
            { key: 'tipo', label: 'Tipo' },

        ],
        acoes: [
            { type: 'view', label: 'Ver', path: 'detalhes/', classname: 'btn btn-sm btn-custom-view', icon: viewIcon },
            { type: 'edit', label: 'Editar', path: 'editar/', classname: 'btn btn-sm btn-custom-edit mx-2', icon: editIcon },
            { type: 'delete', label: 'Excluir', icon: deleteIcon}
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
            { type: 'view', label: 'Ver', path: 'detalhes/', classname: 'btn btn-sm btn-custom-view', icon: viewIcon },
            { type: 'edit', label: 'Editar', path: 'editar/', classname: 'btn btn-sm btn-custom-edit mx-2', icon: editIcon },
            { type: 'disable', label: 'Desativar', icon: desativarIcon}
        ]
    },

    'enderecos-ong': {
        titulo: 'ENDEREÇOS (ONGS)',
        apiEndpoint: 'enderecos-ong',
        colunas: [
            { key: 'id', label: '#' },
            { key: 'estado', label: 'Estado' },
            { key: 'cidade', label: 'Cidade' },
            { key: 'bairro', label: 'Bairro' }
        ],
        acoes: [
            { type: 'view', label: 'Ver', path: 'detalhes/', classname: 'btn btn-sm btn-custom-view', icon: viewIcon },
            { type: 'edit', label: 'Editar', path: 'editar/', classname: 'btn btn-sm btn-custom-edit mx-2', icon: editIcon },
            { type: 'delete', label: 'Excluir', icon: deleteIcon}
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
            { type: 'edit', label: 'Editar', path: 'editar/', classname: 'btn btn-sm btn-custom-edit mx-2', icon: editIcon },
            { type: 'delete', label: 'Excluir', icon: deleteIcon}
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
            { type: 'view', label: 'Ver', path: 'detalhes/', classname: 'btn btn-sm btn-custom-view', icon: viewIcon },
            { type: 'edit', label: 'Editar', path: 'editar/', classname: 'btn btn-sm btn-custom-edit mx-2', icon: editIcon },
            { type: 'delete', label: 'Excluir', icon: deleteIcon}   
        ]
    }
};
