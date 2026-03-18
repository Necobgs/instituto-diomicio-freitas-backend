import { iAction } from "../../domain/action/interfaces/action.interface";

export const Actions: iAction[] = [
    {
        name: 'Criar',
        identifier: 'create',
    },
    {
        name: 'Ler',
        identifier: 'read',
    },
    {
        name: 'Atualizar',
        identifier: 'update',
    },
    {
        name: 'Deletar',
        identifier: 'delete',
    },
    {
        name: 'Todas as ações',
        identifier: 'all',
    },
]
