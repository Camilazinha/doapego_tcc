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
            { key: 'fotoPerfil', label: 'Foto', temImagem: true },
            { key: 'nome', label: 'Nome' },
            { key: 'email', label: 'E-mail' },
            { key: 'tipo', label: 'Tipo' },
        ],
        colunasExtras: [
            { key: 'ongNome', label: 'ONG', tipo: 'foreignKey' },
            { key: 'ativo', label: 'Status', tipoBooleano: 'ativo-inativo' },

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
    },
    'usuarios': {
        titulo: 'USUÁRIOS',
        apiEndpoint: 'usuarios',
        colunas: [
            { key: 'id', label: 'Código' },
            { key: 'fotoPerfil', label: 'Foto', temImagem: true },
            { key: 'nome', label: 'Nome' },
            { key: 'email', label: 'E-mail' },
            { key: 'ativo', label: 'Status', tipoBooleano: 'ativo-inativo' },
        ],
        colunasExtras: [
            { key: 'telefone', label: 'Telefone' },
            { key: 'cep', label: 'CEP' },
            { key: 'estado', label: 'Estado' },
            { key: 'cidade', label: 'Cidade' },
            { key: 'bairro', label: 'Bairro' },
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
            { key: 'ongId', label: 'ID da ONG', tipo: 'foreignKey' }
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
            { key: 'fotoPerfil', label: 'Foto', temImagem: true },
            { key: 'nome', label: 'Nome' },
            { key: 'email', label: 'E-mail' },
            { key: 'telefone', label: 'Telefone' }
        ],
        colunasExtras: [
            { key: 'whatsapp', label: 'WhatsApp' },
            { key: 'descricao', label: 'Descrição' },
            { key: 'fundacao', label: 'Data de fundação' },
            { key: 'statusOng', label: 'Status' },
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
