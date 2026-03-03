import { SetMetadata } from '@nestjs/common';
import { Actions } from '../../../consts/actions';
import { Resources } from '../../../consts/resources';

export type AuthorizationDecoratorArgs = {
    resource: typeof Resources[keyof typeof Resources],
    actions: typeof Actions[keyof typeof Actions][]
}

export const KEY_AUTHORIZATION = Symbol('authorization')

export const Authorization = (...args:AuthorizationDecoratorArgs[]) => SetMetadata(KEY_AUTHORIZATION, args);