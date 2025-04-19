import deleteIcon from "../img/delete-icon.svg"
import desativarIcon from "../img/desativar-icon.svg"

import editIcon from "../img/edit-icon.svg"
import viewIcon from "../img/view-icon.svg"

export const crudData = {
    'administradores': {
        titulo: 'ADMINISTRADORES',
        apiEndpoint: 'administradores',
        colunas: [
            { key: 'id', label: 'Código' },
            { key: 'nome', label: 'Nome' },
            { key: 'email', label: 'E-mail' },
            { key: 'tipo', label: 'Tipo' },
        ],
        acoes: [
            { type: 'view', label: 'Ver', path: 'detalhes/', classname: 'btn btn-sm btn-custom-view mx-1', icon: viewIcon },
            { type: 'delete', label: 'Excluir', icon: deleteIcon }
        ]
    },
    'usuarios': {
        titulo: 'USUÁRIOS',
        apiEndpoint: 'usuarios',
        colunas: [
            { key: 'id', label: 'Código' },
            { key: 'nome', label: 'Nome' },
            { key: 'ativo', label: 'Status' }
        ],
        acoes: [
            { type: 'view', label: 'Ver', path: 'detalhes/', classname: 'btn btn-sm btn-custom-view mx-1', icon: viewIcon },
            {
                type: 'disable',
                label: 'Desativar',
                icon: desativarIcon,
                activeLabel: 'Desativar',
                inactiveLabel: 'Reativar'
            }
        ]
    },

    'enderecos-ong': {
        titulo: 'ENDEREÇOS (ONGS)',
        apiEndpoint: 'enderecos-ong',
        colunas: [
            { key: 'id', label: 'Código' },
            { key: 'estado', label: 'Estado' },
            { key: 'cidade', label: 'Cidade' },
            { key: 'bairro', label: 'Bairro' }
        ],
        colunasExtras: [
            { key: 'logradouro', label: 'Logradouro' },
            { key: 'numero', label: 'Número' },
            { key: 'complemento', label: 'Complemento' },
            { key: 'latitude', label: 'Latitude' },
            { key: 'longitude', label: 'Longitude' },
            { key: 'cep', label: 'CEP' },
            { key: 'principal', label: 'Principal', tipoBooleano: 'sim-nao' },
            { key: 'ativo', label: 'Status', tipoBooleano: 'ativo-inativo' },
            {
                key: 'ong', label: 'ID da ONG', tipo: 'foreignKey' // 👈 Define como chave estrangeira (para tratamento especial)
            }
        ],
        acoes: [
            { type: 'view', label: 'Ver', path: 'detalhes/', classname: 'btn btn-sm btn-custom-view mx-1', icon: viewIcon },
        ]
    },
    'categorias-doacao': {
        titulo: 'CATEGORIAS',
        apiEndpoint: 'categorias-doacao',
        colunas: [
            { key: 'id', label: 'Código' },
            { key: 'foto', label: 'Foto', temImagem: true },
            { key: 'nome', label: 'Nome' }
        ],
        acoes: [
            { type: 'view', label: 'Ver', path: 'detalhes/', classname: 'btn btn-sm btn-custom-view mx-1', icon: viewIcon },
            { type: 'edit', label: 'Editar', path: 'editar/', classname: 'btn btn-sm btn-custom-edit mx-1', icon: editIcon },
            { type: 'delete', label: 'Excluir', icon: deleteIcon }
        ]
    },
    'ongs': {
        titulo: 'ONGS',
        apiEndpoint: 'ongs',
        colunas: [
            { key: 'id', label: 'Código' },
            { key: 'foto', label: 'Foto', temImagem: true },
            { key: 'nome', label: 'Nome' }
        ],
        acoes: [
            { type: 'view', label: 'Ver', path: 'detalhes/', classname: 'btn btn-sm btn-custom-view mx-1', icon: viewIcon },
            {
                type: 'disable',
                label: 'Desativar',
                icon: desativarIcon,
                activeLabel: 'Desativar',  // Novo
                inactiveLabel: 'Reativar'  // Novo
            }
        ]
    }
};
