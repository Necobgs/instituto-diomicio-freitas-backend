import { iResource } from "../../domain/resource/interfaces/resource.interface";

export const Resources: iResource[] = [
    {
        name: 'Empresa',
        identifier: 'enterprise',
    },
    {
        name: 'Acompanhamento',
        identifier: 'monitoring',
    },
    {
        name: 'Usuários',
        identifier: 'user',
    },
    {
        name: 'Estudantes',
        identifier: 'student',
    },
    {
        name: 'Permissões',
        identifier: 'permission',
    },
    {
        name: 'Cargos',
        identifier: 'job',
    },
    {
        name: 'Avaliação',
        identifier: 'evaluation',
    },
    {
        name: 'Encaminhamento',
        identifier: 'referral',
    },
]