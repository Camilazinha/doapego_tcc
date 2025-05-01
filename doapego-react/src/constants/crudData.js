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
            {
                key: 'fotoPerfil', label: 'Foto', temImagem: true, opcional: true    // ← campo opcional
            },
            { key: 'nome', label: 'Nome', required: true },
            { key: 'email', label: 'E-mail', required: true },
            { key: 'tipo', label: 'Tipo', required: true },
            { key: 'ong.id', label: 'Código da ONG' }
        ],
        colunasExtras: [
            { key: 'ativo', label: 'Status', tipoBooleano: 'ativo-inativo', required: true },

        ],
        colunasFormulario: [
            { key: 'senha', label: 'Senha', tipo: 'password', required: true },
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
            { key: 'telefone', label: 'Telefone', mask: 'telefone' },
            { key: 'cep', label: 'CEP', mask: 'cep' },
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
            { key: 'estado', label: 'Estado', required: true },
            { key: 'cidade', label: 'Cidade', required: true },
            { key: 'bairro', label: 'Bairro', required: true },
            { key: 'ong.id', label: 'Código da ONG', required: true },
        ],
        colunasExtras: [
            { key: 'logradouro', label: 'Logradouro', required: true },
            { key: 'numero', label: 'Número', required: true },
            { key: 'complemento', label: 'Complemento' },
            { key: 'latitude', label: 'Latitude' },
            { key: 'longitude', label: 'Longitude' },
            { key: 'cep', label: 'CEP', required: true, mask: 'cep' },
            { key: 'principal', label: 'Principal', tipoBooleano: 'sim-nao' },
            { key: 'ativo', label: 'Status', tipoBooleano: 'ativo-inativo', required: true },
        ],
        acoes: [
            { type: 'view', label: 'Ver', path: 'detalhes/', classname: 'btn btn-sm btn-custom-view mx-1', icon: viewIcon },
            { type: 'edit', label: 'Editar', path: 'editar/', classname: 'btn btn-sm btn-custom-edit mx-1', icon: editIcon },
            { type: 'delete', label: 'Excluir', icon: deleteIcon }
        ]
    },
    'categorias-doacao': {
        titulo: 'CATEGORIAS',
        apiEndpoint: 'categorias-doacao',
        colunas: [
            { key: 'id', label: 'Código' },
            { key: 'foto', label: 'Foto', temImagem: true },
            { key: 'nome', label: 'Nome', required: true },
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
            { key: 'nome', label: 'Nome', required: true },
            { key: 'email', label: 'E-mail', required: true },
        ],
        colunasExtras: [
            { key: 'telefone', label: 'Telefone', mask: 'telefone' },
            { key: 'whatsapp', label: 'WhatsApp', mask: 'telefone' },
            { key: 'descricao', label: 'Descrição', tipo: 'textarea' },
            { key: 'fundacao', label: 'Data de fundação', tipo: 'date' },
            { key: 'statusOng', label: 'Status', required: true },
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
